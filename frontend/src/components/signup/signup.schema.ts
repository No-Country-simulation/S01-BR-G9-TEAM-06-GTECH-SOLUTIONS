import { z } from "zod";

const passwordSchema = z
  .string()
  .min(15, "A senha deve ter pelo menos 15 caracteres.")
  .max(64, "A senha deve ter no máximo 64 caracteres.")
  .refine(
    (password) =>
      new TextEncoder().encode(password).length <= 72,
    "A senha deve ter no máximo 72 bytes.",
  );

export const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Informe seu nome.")
      .max(120, "O nome deve ter no máximo 120 caracteres."),

    email: z
      .email("Informe um e-mail válido.")
      .max(254, "O e-mail deve ter no máximo 254 caracteres."),

    password: passwordSchema,

    passwordConfirmation: z.string(),
  })
  .refine(
    (data) =>
      data.password === data.passwordConfirmation,
    {
      message: "As senhas não coincidem.",
      path: ["passwordConfirmation"],
    },
  );

export type SignupFormData =
  z.infer<typeof signupSchema>;