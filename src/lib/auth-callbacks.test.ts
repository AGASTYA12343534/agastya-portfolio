import { describe, expect, it } from "vitest";
import { isAllowedLogin } from "./auth-callbacks";

describe("isAllowedLogin", () => {
  it("allows the configured admin login (case-insensitive)", () => {
    expect(isAllowedLogin("AGASTYA12343534", "AGASTYA12343534")).toBe(true);
    expect(isAllowedLogin("AGASTYA12343534", "AGASTYA12343534")).toBe(true);
  });
  it("rejects any other login", () => {
    expect(isAllowedLogin("someone-else", "AGASTYA12343534")).toBe(false);
  });
  it("rejects null/undefined login", () => {
    expect(isAllowedLogin(null, "AGASTYA12343534")).toBe(false);
    expect(isAllowedLogin(undefined, "AGASTYA12343534")).toBe(false);
  });
  it("rejects everyone when admin login is unset", () => {
    expect(isAllowedLogin("AGASTYA12343534", undefined)).toBe(false);
  });
});
