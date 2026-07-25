package br.com.gtechsolutions.intelliwatts.modules.autenticacao.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.Authentication;

import br.com.gtechsolutions.intelliwatts.core.exceptions.CredenciaisInvalidasException;

@ExtendWith(MockitoExtension.class)
class AutenticarUsuarioUseCaseTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private Authentication autenticacaoConcluida;

    private AutenticarUsuarioUseCase useCase;

    @BeforeEach
    void setUp() {
        useCase = new AutenticarUsuarioUseCase(authenticationManager);
    }

    @Test
    void deveNormalizarEmailEPreservarSenhaAoAutenticar() {
        when(authenticationManager.authenticate(any(Authentication.class)))
                .thenReturn(autenticacaoConcluida);

        Authentication resultado = useCase.executar(
                "  MyKael@Example.com  ",
                " senha-com-espacos ");

        assertThat(resultado).isSameAs(autenticacaoConcluida);

        ArgumentCaptor<Authentication> captor = ArgumentCaptor.forClass(
                Authentication.class);
        verify(authenticationManager).authenticate(captor.capture());
        assertThat(captor.getValue().getPrincipal())
                .isEqualTo("mykael@example.com");
        assertThat(captor.getValue().getCredentials())
                .isEqualTo(" senha-com-espacos ");
    }

    @Test
    void deveConverterCredenciaisIncorretasEmErroSeguro() {
        BadCredentialsException causa = new BadCredentialsException(
                "mensagem interna do Spring");
        when(authenticationManager.authenticate(any(Authentication.class)))
                .thenThrow(causa);

        assertThatThrownBy(() -> useCase.executar(
                "usuario@example.com",
                "senha-incorreta"))
                .isInstanceOf(CredenciaisInvalidasException.class)
                .hasMessage("E-mail ou senha inválidos")
                .hasCause(causa);
    }

    @Test
    void devePreservarFalhaDeInfraestrutura() {
        InternalAuthenticationServiceException falha =
                new InternalAuthenticationServiceException(
                        "Banco de dados indisponível");
        when(authenticationManager.authenticate(any(Authentication.class)))
                .thenThrow(falha);

        assertThatThrownBy(() -> useCase.executar(
                "usuario@example.com",
                "senha-de-teste"))
                .isSameAs(falha);
    }
}
