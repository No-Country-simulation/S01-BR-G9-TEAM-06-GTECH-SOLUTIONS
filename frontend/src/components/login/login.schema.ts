import { z } from "zod";

export function createLoginSchema(
  t: (key: string) => string
) {
  return z.object({
    email: z
      .string()
      .min(1, t("emailRequired"))
      .email(t("invalidEmail")),

    password: z
      .string()
      .min(1, t("passwordRequired"))
      .min(8, t("passwordMinLength")),
  });
}

export type LoginFormData = {
  email: string;
  password: string;
};