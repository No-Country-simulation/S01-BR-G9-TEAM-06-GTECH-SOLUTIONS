package br.com.gtechsolutions.intelliwatts.modules.autenticacao.security;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import br.com.gtechsolutions.intelliwatts.modules.usuario.domain.Usuario;
import br.com.gtechsolutions.intelliwatts.modules.usuario.persistence.UsuarioRepository;

@ExtendWith(MockitoExtension.class)
class UsuarioDetailsServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    private UsuarioDetailsService usuarioDetailsService;

    @BeforeEach
    void setUp() {
        usuarioDetailsService = new UsuarioDetailsService(usuarioRepository);
    }

    @Test
    void deveNormalizarEmailEConverterUsuarioEmPrincipal() {
        Usuario usuario = Usuario.criar(
                "Mykael Costa",
                "mykael@example.com",
                "{noop}senha-de-teste");
        when(usuarioRepository.findByEmail("mykael@example.com"))
                .thenReturn(Optional.of(usuario));

        UsuarioAutenticado resultado = (UsuarioAutenticado)
                usuarioDetailsService.loadUserByUsername(
                        "  MyKael@Example.com  ");

        assertThat(resultado.id()).isEqualTo(usuario.getId());
        assertThat(resultado.nome()).isEqualTo("Mykael Costa");
        assertThat(resultado.email()).isEqualTo("mykael@example.com");
        assertThat(resultado.getUsername()).isEqualTo("mykael@example.com");
        assertThat(resultado.getPassword()).isEqualTo("{noop}senha-de-teste");
        assertThat(resultado.isEnabled()).isTrue();
        assertThat(resultado.getAuthorities())
                .extracting("authority")
                .containsExactly("ROLE_USUARIO");

        resultado.eraseCredentials();
        assertThat(resultado.getPassword()).isNull();
        verify(usuarioRepository).findByEmail("mykael@example.com");
    }

    @Test
    void deveRejeitarEmailNaoCadastradoSemRevelarOEmail() {
        when(usuarioRepository.findByEmail("ausente@example.com"))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> usuarioDetailsService.loadUserByUsername(
                "ausente@example.com"))
                .isInstanceOf(UsernameNotFoundException.class)
                .hasMessage("Credenciais inválidas");
    }
}
