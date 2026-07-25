package br.com.gtechsolutions.intelliwatts.modules.autenticacao.security;

import java.util.Locale;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.gtechsolutions.intelliwatts.modules.usuario.persistence.UsuarioRepository;

@Service
public class UsuarioDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioDetailsService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) {
        if (email == null || email.isBlank()) {
            throw new UsernameNotFoundException("Credenciais inválidas");
        }

        String emailNormalizado = email
                .strip()
                .toLowerCase(Locale.ROOT);

        return usuarioRepository.findByEmail(emailNormalizado)
                .map(UsuarioAutenticado::de)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Credenciais inválidas"));
    }
}
