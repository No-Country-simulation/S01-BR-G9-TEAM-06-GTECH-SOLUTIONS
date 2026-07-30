package br.com.gtechsolutions.intelliwatts.modules.usuario.api.dto;

import br.com.gtechsolutions.intelliwatts.core.validation.MaxUtf8Bytes;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CadastroUsuarioRequest(
        @NotBlank(message = "nome é obrigatório")
        @Size(max = 120, message = "nome deve ter no máximo 120 caracteres")
        String nome,

        @NotBlank(message = "email é obrigatório")
        @Email(message = "email deve possuir formato válido")
        @Size(max = 254, message = "email deve ter no máximo 254 caracteres")
        String email,

        @NotBlank(message = "senha é obrigatória")
        @Size(
                min = 15,
                max = 64,
                message = "senha deve ter entre 15 e 64 caracteres")
        @MaxUtf8Bytes(
                value = 72,
                message = "senha deve ter no máximo 72 bytes em UTF-8")
        String senha
) {
}
