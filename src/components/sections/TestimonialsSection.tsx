import { testimonialsData } from "@/data/testimonials";
import { Testimonials } from "./Testimonials";

export async function TestimonialsSection() {
  const rows = testimonialsData
    .filter(t => t.status === "approved")
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.order - b.order;
    });

  return <Testimonials items={rows} />;
}
