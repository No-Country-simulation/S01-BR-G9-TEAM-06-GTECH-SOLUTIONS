package br.com.gtechsolutions.intelliwatts.modules.autenticacao.security;

import java.io.Serial;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.gtechsolutions.intelliwatts.modules.usuario.domain.Usuario;

public final class UsuarioAutenticado
        implements UserDetails, CredentialsContainer, Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private final UUID id;
    private final String nome;
    private final String email;
    private final boolean ativo;
    private final List<GrantedAuthority> autoridades;
    private String senhaHash;

    private UsuarioAutenticado(
            UUID id,
            String nome,
            String email,
            String senhaHash,
            boolean ativo,
            List<GrantedAuthority> autoridades) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senhaHash = senhaHash;
        this.ativo = ativo;
        this.autoridades = List.copyOf(autoridades);
    }

    public static UsuarioAutenticado de(Usuario usuario) {
        GrantedAuthority autoridade = new SimpleGrantedAuthority(
                "ROLE_" + usuario.getPapel().name());

        return new UsuarioAutenticado(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getSenhaHash(),
                usuario.isAtivo(),
                List.of(autoridade));
    }

    public UUID id() {
        return id;
    }

    public String nome() {
        return nome;
    }

    public String email() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return autoridades;
    }

    @Override
    public String getPassword() {
        return senhaHash;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isEnabled() {
        return ativo;
    }

    @Override
    public boolean equals(Object outro) {
        if (this == outro) {
            return true;
        }
        if (!(outro instanceof UsuarioAutenticado usuario)) {
            return false;
        }
        return id.equals(usuario.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

    @Override
    public void eraseCredentials() {
        senhaHash = null;
    }
}
