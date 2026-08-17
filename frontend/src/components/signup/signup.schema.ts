import { z } from "zod";

export function createSignupSchema(
  t: (key: string) => string
) {
  const passwordSchema = z
    .string()
    .min(15, t("passwordMin15"))
    .max(64, t("passwordMaxLength"))
    .refine(
      (password) =>
        new TextEncoder().encode(password).length <= 72,
      t("passwordMaxBytes"),
    );

  return z
    .object({
      name: z
        .string()
        .trim()
        .min(1, t("nameRequired"))
        .max(120, t("nameMaxLength")),

      email: z
        .email(t("invalidEmail"))
        .max(254, t("emailMaxLength")),

      password: passwordSchema,

      passwordConfirmation: z.string(),
    })
    .refine(
      (data) =>
        data.password === data.passwordConfirmation,
      {
        message: t("passwordsDoNotMatch"),
        path: ["passwordConfirmation"],
      },
    );
}

export type SignupFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};
