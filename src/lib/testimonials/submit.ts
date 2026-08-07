import { submitTestimonialSchema } from "@/lib/validation/testimonial";
import { clientIpFromHeaders, testimonialRateLimit } from "@/lib/rate-limit";

export type SubmitResult = { ok: true } | { ok: false; status: number; error: string };

export async function submitTestimonial(
  formData: FormData,
  headers: Headers,
): Promise<SubmitResult> {
  // Step 1: Rate limit by IP
  const ip = clientIpFromHeaders(headers);
  const rl = testimonialRateLimit(ip);
  if (!rl.success) {
    return {
      ok: false,
      status: 429,
      error: "Too many submissions. Try again later.",
    };
  }

  // Step 2: Validate + honeypot check
  const parsed = submitTestimonialSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    relationship: formData.get("relationship"),
    content: formData.get("content"),
    website: formData.get("website") ?? "",
    linkedinUrl: (formData.get("linkedinUrl") as string) || undefined,
    githubUrl: (formData.get("githubUrl") as string) || undefined,
    xUrl: (formData.get("xUrl") as string) || undefined,
    instagramUrl: (formData.get("instagramUrl") as string) || undefined,
    websiteUrl: (formData.get("websiteUrl") as string) || undefined,
  });

  if (!parsed.success) {
    // If the honeypot field failed, silently accept-and-drop (bots won't know)
    const honeypotHit = parsed.error.issues.some((i) => i.path[0] === "website");
    if (honeypotHit) return { ok: true };
    return { ok: false, status: 400, error: parsed.error.issues[0]!.message };
  }

  // Step 3: Mock a delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // No DB insertion, just pretend it succeeded
  return { ok: true };
}
