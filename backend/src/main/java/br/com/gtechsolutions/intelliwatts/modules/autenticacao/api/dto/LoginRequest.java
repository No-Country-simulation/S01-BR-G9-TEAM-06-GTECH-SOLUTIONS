package br.com.gtechsolutions.intelliwatts.modules.autenticacao.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequest(
        @NotBlank(message = "email é obrigatório")
        @Email(message = "email deve possuir formato válido")
        @Size(max = 254, message = "email deve ter no máximo 254 caracteres")
        String email,

        @NotBlank(message = "senha é obrigatória")
        @Size(max = 64, message = "senha deve ter no máximo 64 caracteres")
        String senha
) {

    public LoginRequest {
        if (email != null) {
            email = email.strip();
        }
    }
}
