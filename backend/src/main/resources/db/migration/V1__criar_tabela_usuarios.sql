CREATE TABLE usuarios (
    id UUID PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(254) NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    papel VARCHAR(30) NOT NULL DEFAULT 'USUARIO',
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uk_usuarios_email UNIQUE (email),
    CONSTRAINT ck_usuarios_nome_preenchido CHECK (BTRIM(nome) <> ''),
    CONSTRAINT ck_usuarios_email_normalizado CHECK (
        email = LOWER(email) AND BTRIM(email) <> ''
    ),
    CONSTRAINT ck_usuarios_senha_hash_preenchida CHECK (BTRIM(senha_hash) <> '')
);
