package br.com.gtechsolutions.intelliwatts.modules.usuario.api.dto;

import java.util.UUID;

import br.com.gtechsolutions.intelliwatts.modules.usuario.domain.Usuario;

public record UsuarioResponse(
        UUID id,
        String nome,
        String email
) {

    public static UsuarioResponse de(Usuario usuario) {
        return new UsuarioResponse(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail());
    }
}
