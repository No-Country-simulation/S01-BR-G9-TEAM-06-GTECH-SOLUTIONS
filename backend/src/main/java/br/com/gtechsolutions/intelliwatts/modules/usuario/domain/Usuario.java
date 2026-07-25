package br.com.gtechsolutions.intelliwatts.modules.usuario.domain;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.Objects;
import java.util.UUID;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.TimeZoneStorage;
import org.hibernate.annotations.TimeZoneStorageType;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @JdbcTypeCode(SqlTypes.CHAR)
    @Column(nullable = false, updatable = false, length = 36)
    private UUID id;

    @Column(nullable = false, length = 120)
    private String nome;

    @Column(nullable = false, unique = true, length = 254)
    private String email;

    @Column(name = "senha_hash", nullable = false, length = 255)
    private String senhaHash;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.VARCHAR)
    @Column(nullable = false, length = 30)
    private PapelUsuario papel;

    @Column(nullable = false)
    private boolean ativo;

    @TimeZoneStorage(TimeZoneStorageType.NORMALIZE_UTC)
    @Column(name = "criado_em", nullable = false, updatable = false)
    private OffsetDateTime criadoEm;

    @TimeZoneStorage(TimeZoneStorageType.NORMALIZE_UTC)
    @Column(name = "atualizado_em", nullable = false)
    private OffsetDateTime atualizadoEm;

    protected Usuario() {
    }

    private Usuario(
            UUID id,
            String nome,
            String email,
            String senhaHash,
            PapelUsuario papel,
            boolean ativo,
            OffsetDateTime criadoEm,
            OffsetDateTime atualizadoEm) {
        this.id = Objects.requireNonNull(id);
        this.nome = Objects.requireNonNull(nome);
        this.email = Objects.requireNonNull(email);
        this.senhaHash = Objects.requireNonNull(senhaHash);
        this.papel = Objects.requireNonNull(papel);
        this.ativo = ativo;
        this.criadoEm = Objects.requireNonNull(criadoEm);
        this.atualizadoEm = Objects.requireNonNull(atualizadoEm);
    }

    public static Usuario criar(String nome, String email, String senhaHash) {
        OffsetDateTime agora = OffsetDateTime.now(ZoneOffset.UTC);

        return new Usuario(
                UUID.randomUUID(),
                nome,
                email,
                senhaHash,
                PapelUsuario.USUARIO,
                true,
                agora,
                agora);
    }

    public UUID getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getSenhaHash() {
        return senhaHash;
    }

    public PapelUsuario getPapel() {
        return papel;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public OffsetDateTime getCriadoEm() {
        return criadoEm;
    }

    public OffsetDateTime getAtualizadoEm() {
        return atualizadoEm;
    }
}
