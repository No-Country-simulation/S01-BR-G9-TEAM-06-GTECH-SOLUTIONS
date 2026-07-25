package br.com.gtechsolutions.intelliwatts.modules.usuario.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.sql.SQLException;

import org.hibernate.exception.ConstraintViolationException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

import br.com.gtechsolutions.intelliwatts.core.exceptions.EmailJaCadastradoException;
import br.com.gtechsolutions.intelliwatts.modules.usuario.domain.PapelUsuario;
import br.com.gtechsolutions.intelliwatts.modules.usuario.domain.Usuario;
import br.com.gtechsolutions.intelliwatts.modules.usuario.persistence.UsuarioRepository;

@ExtendWith(MockitoExtension.class)
class CadastrarUsuarioUseCaseTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    private PasswordEncoder passwordEncoder;
    private CadastrarUsuarioUseCase useCase;

    @BeforeEach
    void setUp() {
        passwordEncoder = PasswordEncoderFactories
                .createDelegatingPasswordEncoder();
        useCase = new CadastrarUsuarioUseCase(
                usuarioRepository,
                passwordEncoder);
    }

    @Test
    void deveNormalizarDadosEGerarHashDaSenhaAntesDeSalvar() {
        when(usuarioRepository.existsByEmail("mykael@example.com"))
                .thenReturn(false);
        when(usuarioRepository.saveAndFlush(any(Usuario.class)))
                .thenAnswer(invocacao -> invocacao.getArgument(0));

        Usuario usuario = useCase.executar(
                "  Mykael Costa  ",
                "  MyKael@Example.com  ",
                "senha-de-teste-123");

        ArgumentCaptor<Usuario> captor = ArgumentCaptor.forClass(
                Usuario.class);
        verify(usuarioRepository).saveAndFlush(captor.capture());

        Usuario usuarioSalvo = captor.getValue();
        assertThat(usuarioSalvo).isSameAs(usuario);
        assertThat(usuarioSalvo.getNome()).isEqualTo("Mykael Costa");
        assertThat(usuarioSalvo.getEmail()).isEqualTo("mykael@example.com");
        assertThat(usuarioSalvo.getSenhaHash())
                .isNotEqualTo("senha-de-teste-123")
                .startsWith("{bcrypt}");
        assertThat(passwordEncoder.matches(
                "senha-de-teste-123",
                usuarioSalvo.getSenhaHash()))
                .isTrue();
        assertThat(usuarioSalvo.getPapel()).isEqualTo(PapelUsuario.USUARIO);
        assertThat(usuarioSalvo.isAtivo()).isTrue();
    }

    @Test
    void deveRejeitarEmailJaCadastrado() {
        when(usuarioRepository.existsByEmail("mykael@example.com"))
                .thenReturn(true);

        assertThatThrownBy(() -> useCase.executar(
                "Mykael Costa",
                "Mykael@Example.com",
                "senha-de-teste-123"))
                .isInstanceOf(EmailJaCadastradoException.class)
                .hasMessage("E-mail já cadastrado");

        verify(usuarioRepository, never()).saveAndFlush(any(Usuario.class));
    }

    @Test
    void deveTraduzirColisaoDeEmailDetectadaPeloBanco() {
        when(usuarioRepository.existsByEmail("mykael@example.com"))
                .thenReturn(false);
        ConstraintViolationException violacao =
                new ConstraintViolationException(
                        "E-mail duplicado",
                        new SQLException(),
                        "uk_usuarios_email");
        when(usuarioRepository.saveAndFlush(any(Usuario.class)))
                .thenThrow(new DataIntegrityViolationException(
                        "Restrição única violada",
                        violacao));

        assertThatThrownBy(() -> useCase.executar(
                "Mykael Costa",
                "mykael@example.com",
                "senha-de-teste-123"))
                .isInstanceOf(EmailJaCadastradoException.class)
                .hasMessage("E-mail já cadastrado")
                .hasCauseInstanceOf(DataIntegrityViolationException.class);
    }
}
