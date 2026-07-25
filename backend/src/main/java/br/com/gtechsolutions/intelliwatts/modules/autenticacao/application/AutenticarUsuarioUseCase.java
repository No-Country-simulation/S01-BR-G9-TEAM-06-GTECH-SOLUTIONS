package br.com.gtechsolutions.intelliwatts.modules.autenticacao.application;

import java.util.Locale;

import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import br.com.gtechsolutions.intelliwatts.core.exceptions.CredenciaisInvalidasException;

@Service
public class AutenticarUsuarioUseCase {

    private final AuthenticationManager authenticationManager;

    public AutenticarUsuarioUseCase(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    public Authentication executar(String email, String senha) {
        String emailNormalizado = email
                .strip()
                .toLowerCase(Locale.ROOT);

        Authentication tentativa = UsernamePasswordAuthenticationToken
                .unauthenticated(emailNormalizado, senha);

        try {
            return authenticationManager.authenticate(tentativa);
        } catch (BadCredentialsException | AccountStatusException exception) {
            throw new CredenciaisInvalidasException(exception);
        }
    }
}
