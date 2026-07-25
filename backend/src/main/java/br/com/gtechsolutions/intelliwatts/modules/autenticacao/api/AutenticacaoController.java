package br.com.gtechsolutions.intelliwatts.modules.autenticacao.api;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.gtechsolutions.intelliwatts.modules.autenticacao.api.dto.LoginRequest;
import br.com.gtechsolutions.intelliwatts.modules.autenticacao.api.dto.CsrfTokenResponse;
import br.com.gtechsolutions.intelliwatts.modules.autenticacao.application.AutenticarUsuarioUseCase;
import br.com.gtechsolutions.intelliwatts.modules.autenticacao.security.UsuarioAutenticado;
import br.com.gtechsolutions.intelliwatts.modules.usuario.api.dto.UsuarioResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AutenticacaoController {

    private final AutenticarUsuarioUseCase autenticarUsuarioUseCase;
    private final SessionAuthenticationStrategy sessionAuthenticationStrategy;
    private final SecurityContextRepository securityContextRepository;
    private final SecurityContextHolderStrategy securityContextHolderStrategy;

    public AutenticacaoController(
            AutenticarUsuarioUseCase autenticarUsuarioUseCase,
            SessionAuthenticationStrategy sessionAuthenticationStrategy,
            SecurityContextRepository securityContextRepository) {
        this.autenticarUsuarioUseCase = autenticarUsuarioUseCase;
        this.sessionAuthenticationStrategy = sessionAuthenticationStrategy;
        this.securityContextRepository = securityContextRepository;
        this.securityContextHolderStrategy = SecurityContextHolder
                .getContextHolderStrategy();
    }

    @GetMapping("/csrf")
    public CsrfTokenResponse csrf(CsrfToken csrfToken) {
        return CsrfTokenResponse.de(csrfToken);
    }

    @PostMapping("/login")
    public UsuarioResponse login(
            @Valid @RequestBody LoginRequest dados,
            HttpServletRequest request,
            HttpServletResponse response) {
        Authentication authentication = autenticarUsuarioUseCase.executar(
                dados.email(),
                dados.senha());

        sessionAuthenticationStrategy.onAuthentication(
                authentication,
                request,
                response);

        SecurityContext context = securityContextHolderStrategy
                .createEmptyContext();
        context.setAuthentication(authentication);
        securityContextHolderStrategy.setContext(context);
        securityContextRepository.saveContext(context, request, response);

        return usuarioResponse((UsuarioAutenticado) authentication.getPrincipal());
    }

    @GetMapping("/me")
    public UsuarioResponse me(
            @AuthenticationPrincipal UsuarioAutenticado usuario) {
        return usuarioResponse(usuario);
    }

    private UsuarioResponse usuarioResponse(UsuarioAutenticado usuario) {
        return new UsuarioResponse(
                usuario.id(),
                usuario.nome(),
                usuario.email());
    }
}
