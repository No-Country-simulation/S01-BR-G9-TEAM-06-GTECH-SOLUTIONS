package br.com.gtechsolutions.intelliwatts.modules.usuario.persistence;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.within;

import java.time.temporal.ChronoUnit;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.dao.DataIntegrityViolationException;

import br.com.gtechsolutions.intelliwatts.MySqlTestConfiguration;
import br.com.gtechsolutions.intelliwatts.modules.usuario.domain.PapelUsuario;
import br.com.gtechsolutions.intelliwatts.modules.usuario.domain.Usuario;
import jakarta.persistence.EntityManager;

@DataJpaTest(showSql = false)
@Import(MySqlTestConfiguration.class)
class UsuarioRepositoryTest {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EntityManager entityManager;

    @Test
    void deveSalvarEBuscarUsuarioPorEmail() {
        Usuario usuario = Usuario.criar(
                "Mykael José ⚡",
                "mykael@example.com",
                "hash-de-teste");

        usuarioRepository.saveAndFlush(usuario);
        entityManager.clear();

        Usuario encontrado = usuarioRepository
                .findByEmail("mykael@example.com")
                .orElseThrow();

        assertThat(encontrado.getId()).isEqualTo(usuario.getId());
        assertThat(encontrado.getNome()).isEqualTo("Mykael José ⚡");
        assertThat(encontrado.getPapel()).isEqualTo(PapelUsuario.USUARIO);
        assertThat(encontrado.isAtivo()).isTrue();
        assertThat(encontrado.getCriadoEm().toInstant())
                .isCloseTo(usuario.getCriadoEm().toInstant(),
                        within(1, ChronoUnit.MICROS));
        assertThat(encontrado.getAtualizadoEm().toInstant())
                .isCloseTo(usuario.getAtualizadoEm().toInstant(),
                        within(1, ChronoUnit.MICROS));
    }

    @Test
    void deveInformarQuandoEmailJaExiste() {
        Usuario usuario = Usuario.criar(
                "Mykael Costa",
                "mykael@example.com",
                "hash-de-teste");

        usuarioRepository.saveAndFlush(usuario);

        assertThat(usuarioRepository.existsByEmail("mykael@example.com"))
                .isTrue();
        assertThat(usuarioRepository.existsByEmail("outro@example.com"))
                .isFalse();
    }

    @Test
    void deveRejeitarEmailDuplicadoNoBanco() {
        Usuario primeiroUsuario = Usuario.criar(
                "Primeiro Usuário",
                "duplicado@example.com",
                "hash-de-teste");
        Usuario segundoUsuario = Usuario.criar(
                "Segundo Usuário",
                "duplicado@example.com",
                "outro-hash-de-teste");

        usuarioRepository.saveAndFlush(primeiroUsuario);

        assertThatThrownBy(() -> usuarioRepository.saveAndFlush(segundoUsuario))
                .isInstanceOf(DataIntegrityViolationException.class);
    }

    @Test
    void deveRejeitarEmailNaoNormalizadoNoBanco() {
        Usuario usuario = Usuario.criar(
                "Usuário de Teste",
                "EmailComMaiusculas@example.com",
                "hash-de-teste");

        assertThatThrownBy(() -> usuarioRepository.saveAndFlush(usuario))
                .isInstanceOf(DataIntegrityViolationException.class);
    }
}
