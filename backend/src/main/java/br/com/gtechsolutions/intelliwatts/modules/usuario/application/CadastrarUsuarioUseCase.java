package br.com.gtechsolutions.intelliwatts.modules.usuario.application;

import java.util.Locale;
import java.util.Objects;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.gtechsolutions.intelliwatts.core.exceptions.EmailJaCadastradoException;
import br.com.gtechsolutions.intelliwatts.modules.usuario.domain.Usuario;
import br.com.gtechsolutions.intelliwatts.modules.usuario.persistence.UsuarioRepository;

@Service
public class CadastrarUsuarioUseCase {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public CadastrarUsuarioUseCase(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public Usuario executar(String nome, String email, String senha) {
        String nomeNormalizado = normalizarNome(nome);
        String emailNormalizado = normalizarEmail(email);

        if (usuarioRepository.existsByEmail(emailNormalizado)) {
            throw new EmailJaCadastradoException();
        }

        String senhaHash = passwordEncoder.encode(
                Objects.requireNonNull(senha, "senha não pode ser nula"));

        Usuario usuario = Usuario.criar(
                nomeNormalizado,
                emailNormalizado,
                senhaHash);

        try {
            return usuarioRepository.saveAndFlush(usuario);
        } catch (DataIntegrityViolationException exception) {
            if (violouRestricaoDeEmailUnico(exception)) {
                throw new EmailJaCadastradoException(exception);
            }

            throw exception;
        }
    }

    private boolean violouRestricaoDeEmailUnico(
            DataIntegrityViolationException exception) {
        Throwable causa = exception;

        while (causa != null) {
            if (causa instanceof ConstraintViolationException violacao
                    && "uk_usuarios_email".equals(violacao.getConstraintName())) {
                return true;
            }

            causa = causa.getCause();
        }

        return false;
    }

    private String normalizarNome(String nome) {
        return Objects.requireNonNull(
                nome,
                "nome não pode ser nulo")
                .strip();
    }

    private String normalizarEmail(String email) {
        return Objects.requireNonNull(
                email,
                "email não pode ser nulo")
                .strip()
                .toLowerCase(Locale.ROOT);
    }
}
