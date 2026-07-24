# IntelliWatts Backend

API REST responsável por validar dados de consumo energético, integrar o sistema com o serviço Python de Data Science, calcular o custo mensal estimado e autenticar usuários.

## Estado atual

O Backend Java já possui:

- endpoint público do MVP;
- validação dos dados recebidos;
- integração preparada para o serviço Python;
- cálculo financeiro no Backend;
- tratamento de erros;
- cadastro e login por sessão;
- persistência de usuários no PostgreSQL;
- migrations de banco com Flyway;
- proteção CSRF nas operações de autenticação;
- testes automatizados.

Ainda estão pendentes para a integração completa:

- disponibilização do endpoint HTTP pelo Data Science;
- integração real com o modelo treinado;
- armazenamento e carregamento do modelo pela OCI.

## Fluxo do MVP

```text
Cliente
  ↓
POST /analise-energetica
  ↓
Backend Java valida os dados
  ↓
POST /v1/inferencias
  ↓
Data Science classifica e gera recomendações
  ↓
Backend calcula o custo mensal
  ↓
Resposta JSON para o cliente
```

### Responsabilidades do Backend

- disponibilizar o endpoint público;
- validar os dados de entrada;
- enviar os dados validados ao Data Science;
- calcular o custo mensal estimado;
- montar a resposta pública;
- tratar falhas de validação, integração e execução.

### Responsabilidades do Data Science

- disponibilizar o endpoint interno de inferência;
- carregar o modelo treinado;
- classificar o perfil energético;
- calcular a probabilidade da classificação;
- gerar recomendações;
- retornar os resultados ao Backend.

## Requisitos

- Java 21;
- Maven 3.6.3 ou superior;
- Docker Desktop ou PostgreSQL 17 disponível localmente;
- serviço Python disponível, por padrão, em `http://localhost:8000`.

Para executar a suíte de testes, é necessário manter o Docker Desktop ou outro
engine compatível ativo. O Testcontainers cria bancos PostgreSQL temporários;
um PostgreSQL local isoladamente não substitui esse requisito.

## Executar o Backend

Na raiz do monorepo:

```powershell
docker compose up -d postgres
$env:SESSION_COOKIE_SECURE="false"
mvn -f backend/pom.xml spring-boot:run
```

Por padrão, a API ficará disponível em:

```text
http://localhost:8080
```

## Executar os testes

```powershell
mvn -f backend/pom.xml test
```

## Variáveis de ambiente

| Variável | Valor padrão | Finalidade |
|---|---:|---|
| `SERVER_PORT` | `8080` | Porta do Backend |
| `DB_HOST` | `localhost` | Host do PostgreSQL |
| `DB_PORT` | `5433` | Porta local publicada para o PostgreSQL do container |
| `DB_NAME` | `intelliwatts` | Nome do banco de dados |
| `DB_USER` | `intelliwatts` | Usuário do banco de dados |
| `DB_PASSWORD` | `intelliwatts_local` | Senha local do banco; deve ser configurada no deploy |
| `SESSION_TIMEOUT` | `30m` | Tempo máximo de inatividade da sessão |
| `SESSION_COOKIE_SECURE` | `true` | Use `false` somente no desenvolvimento local por HTTP |
| `HTTP_MAX_REQUEST_BODY_BYTES` | `16384` | Tamanho máximo aceito para o corpo de uma requisição HTTP; teto configurável de `1048576` |
| `RATE_LIMIT_JANELA` | `1m` | Duração da janela local de limitação |
| `RATE_LIMIT_ANALISES_POR_JANELA` | `30` | Análises permitidas por endereço remoto e janela |
| `RATE_LIMIT_LOGINS_POR_JANELA` | `10` | Logins permitidos por endereço remoto e janela |
| `RATE_LIMIT_CADASTROS_POR_JANELA` | `5` | Cadastros permitidos por endereço remoto e janela |
| `RATE_LIMIT_CSRF_POR_JANELA` | `60` | Obtenções de CSRF permitidas por endereço remoto e janela |
| `RATE_LIMIT_MAXIMO_CHAVES` | `10000` | Teto de chaves mantidas na memória pelo limitador local |
| `TARIFA_REFERENCIA` | `0.75` | Tarifa em R$/kWh usada pelo Backend |
| `DATASCIENCE_BASE_URL` | `http://localhost:8000` | Endereço do serviço Python |
| `DATASCIENCE_CAMINHO_INFERENCIA` | `/v1/inferencias` | Rota interna de inferência |
| `DATASCIENCE_TEMPO_CONEXAO` | `300ms` | Limite para estabelecer conexão |
| `DATASCIENCE_TEMPO_RESPOSTA` | `1500ms` | Limite para receber a resposta |
| `DATASCIENCE_TAMANHO_MAXIMO_RESPOSTA_BYTES` | `16384` | Tamanho máximo da resposta do serviço Python; teto configurável de `1048576` |
| `DATASCIENCE_SERVICE_TOKEN` | token apenas local | Segredo compartilhado enviado como Bearer; obrigatório e diferente do padrão em qualquer destino remoto |

## API pública

### Autenticação e sessão — evolução após o MVP

A autenticação utiliza sessão HTTP. O cliente deve preservar o cookie
`JSESSIONID` entre as requisições.

No frontend, as chamadas devem usar `credentials: "include"`. A configuração
atual pressupõe frontend e backend na mesma origem em produção e um proxy de
desenvolvimento local. CORS direto entre origens diferentes ainda não está
habilitado; a origem exata será definida junto da criação do frontend.

O cookie utiliza `HttpOnly`, `Secure` e `SameSite=Lax`. Em produção, o Backend
deve ser publicado com HTTPS. O valor `false` usado no comando de desenvolvimento
acima é apenas para permitir testes locais por HTTP. As sessões ficam na memória
da instância atual do Backend: reiniciar a aplicação encerra os logins e múltiplas
instâncias ainda exigiriam armazenamento compartilhado de sessões.

Cada usuário pode manter uma sessão autenticada por vez. Um novo login substitui
a sessão anterior. Quando o cliente antigo tentar utilizá-la novamente, receberá
`401 Unauthorized` com o código `SESSAO_EXPIRADA`.

Antes de enviar `POST /auth/cadastro`, `POST /auth/login` ou
`POST /auth/logout`, obtenha um token CSRF:

```http
GET /auth/csrf
```

Exemplo de resposta:

```json
{
  "token": "token-gerado-pelo-servidor",
  "header_name": "X-CSRF-TOKEN",
  "parameter_name": "_csrf"
}
```

Envie o valor de `token` no cabeçalho indicado por `header_name`, mantendo o
cookie recebido na mesma sessão.

#### Cadastrar usuário

```http
POST /auth/cadastro
Content-Type: application/json
X-CSRF-TOKEN: token-gerado-pelo-servidor
```

```json
{
  "nome": "Mykael Costa",
  "email": "mykael@example.com",
  "senha": "uma-senha-segura-123"
}
```

A senha deve ter entre 15 e 64 caracteres e, no máximo, 72 bytes em UTF-8.
A resposta `201 Created` contém
somente `id`, `nome` e `email`; a senha e seu hash nunca são retornados.

#### Entrar

```http
POST /auth/login
Content-Type: application/json
X-CSRF-TOKEN: token-gerado-pelo-servidor
```

```json
{
  "email": "mykael@example.com",
  "senha": "uma-senha-segura-123"
}
```

Em caso de sucesso, a resposta `200 OK` contém `id`, `nome` e `email`, e o
servidor troca o identificador da sessão. Após o login, chame novamente
`GET /auth/csrf`, pois o token anterior é invalidado.

#### Consultar sessão atual

```http
GET /auth/me
Cookie: JSESSIONID=identificador-da-sessao
```

Retorna `200 OK` com `id`, `nome` e `email`. Sem uma sessão autenticada,
retorna `401 Unauthorized`.

#### Sair

```http
POST /auth/logout
X-CSRF-TOKEN: token-gerado-pelo-servidor
Cookie: JSESSIONID=identificador-da-sessao
```

Invalida a sessão e retorna `204 No Content`.

Após o logout, obtenha outro token em `GET /auth/csrf` antes da próxima
operação `POST`.

### Analisar consumo energético

```http
POST /analise-energetica
Content-Type: application/json
```

### Entrada

```json
{
  "consumo_kwh": 305,
  "uso_horario_pico": false,
  "quantidade_equipamentos": 13,
  "tipo_imovel": "Comércio",
  "horas_alto_consumo": 2
}
```

### Validações atuais

| Campo | Regra |
|---|---|
| `consumo_kwh` | Número maior que zero e menor ou igual a 700 |
| `uso_horario_pico` | Booleano: `true` ou `false` |
| `quantidade_equipamentos` | Número inteiro entre 1 e 17 |
| `tipo_imovel` | `Casa`, `Apartamento` ou `Comércio` |
| `horas_alto_consumo` | Número inteiro entre 1 e 24 |

Os máximos de consumo e equipamentos são limites operacionais temporários,
definidos a partir da faixa de treinamento e do cenário de `700 kWh`
presente no módulo de Data Science.

Consumos abaixo de `80 kWh`, imóveis com `1` ou `2` equipamentos e valores
entre `12` e `24` horas são aceitos pelo domínio, mas estão fora da faixa de
treinamento atual e ainda precisam ser reavaliados com Ciência de Dados.

### Resposta de sucesso

Status: `200 OK`

```json
{
  "categoria": "Moderado",
  "probabilidade": 0.78,
  "recomendacoes": [
    "Reduzir o uso de equipamentos no horário de pico."
  ],
  "custo_estimado_mensal": 228.75
}
```

## Cálculo financeiro

O custo mensal é calculado exclusivamente pelo Backend:

```text
custo_estimado_mensal = consumo_kwh × tarifa_referencia
```

Exemplo:

```text
305 × 0,75 = R$ 228,75
```

O resultado é arredondado para duas casas decimais utilizando a regra `HALF_UP`.

## Contrato interno com Data Science

O contrato formal está documentado em:

[`docs/contratos/datascience-api-v1.yaml`](../docs/contratos/datascience-api-v1.yaml)

O Backend chama:

```http
POST /v1/inferencias
Content-Type: application/json
```

### Dados enviados ao Data Science

```json
{
  "consumo_kwh": 305,
  "uso_horario_pico": false,
  "quantidade_equipamentos": 13,
  "tipo_imovel": "Comércio",
  "horas_alto_consumo": 2
}
```

### Resposta esperada do Data Science

```json
{
  "categoria": "Moderado",
  "probabilidade": 0.78,
  "recomendacoes": [
    "Reduzir o uso de equipamentos no horário de pico."
  ]
}
```

O Data Science não recebe a tarifa e não calcula valores monetários.

## Tratamento de erros

| Status | Código | Situação |
|---:|---|---|
| `400` | `ENTRADA_INVALIDA` | Campo ausente ou fora das regras |
| `400` | `JSON_INVALIDO` | Corpo da requisição não é um JSON válido |
| `401` | `CREDENCIAIS_INVALIDAS` | E-mail inexistente, senha incorreta ou usuário inativo |
| `401` | `NAO_AUTENTICADO` | Rota protegida acessada sem uma sessão válida |
| `401` | `SESSAO_EXPIRADA` | Sessão anterior substituída por um novo login |
| `403` | `CSRF_INVALIDO` | Token CSRF ausente, expirado ou incorreto |
| `403` | `ACESSO_NEGADO` | Usuário autenticado sem permissão para o recurso |
| `409` | `EMAIL_JA_CADASTRADO` | Já existe um usuário com o e-mail informado |
| `413` | `CORPO_REQUISICAO_MUITO_GRANDE` | Corpo HTTP maior que o limite configurado |
| `429` | `LIMITE_REQUISICOES_EXCEDIDO` | Limite local de requisições excedido |
| `503` | `SERVICO_INFERENCIA_INDISPONIVEL` | Timeout, falha HTTP ou resposta inválida do Python |
| `500` | `ERRO_INTERNO` | Falha inesperada dentro do Backend |

Por padrão, o Backend interrompe corpos HTTP maiores que `16384` bytes antes
da desserialização. O limite pode ser ajustado por ambiente.

As respostas do Data Science também são limitadas a `16384` bytes antes da
desserialização. O contrato aceita de uma a dez recomendações, com no máximo
`500` bytes em UTF-8 por item.

O limitador local usa o endereço remoto observado pelo Java e mantém memória
limitada. Em produção, ele deve atuar como segunda camada: o gateway ou proxy
confiável continua responsável pelo rate limit baseado no IP público real.

O Backend envia `Authorization: Bearer <token>` em todas as chamadas ao Data
Science. O token padrão funciona somente com `localhost` ou loopback. Para
qualquer destino remoto, `DATASCIENCE_BASE_URL` deve usar HTTPS e
`DATASCIENCE_SERVICE_TOKEN` deve conter um segredo próprio de 32 a 256
caracteres ASCII sem espaços. O FastAPI deve validar o mesmo token antes de
executar o modelo.

## OCI

O MVP deverá utilizar pelo menos um serviço da Oracle Cloud Infrastructure.

A estratégia planejada é utilizar o OCI Object Storage para armazenar o modelo treinado. O serviço Python ficará responsável por carregar o modelo para realizar as inferências.

Essa integração ainda está pendente.

## Fora do escopo do MVP

Não fazem parte desta versão:

- autenticação;
- banco de dados;
- histórico de análises;
- onboarding;
- dashboard;
- consulta por `consumoId`;
- gestão dinâmica de tarifas;
- variáveis experimentais.

Autenticação e banco de dados permanecem fora da entrega original do MVP. As
seções anteriores documentam a evolução iniciada após o fechamento desse
escopo.

## Documentação

- [Escopo do MVP](../docs/ESCOPO_MVP.md)
- [Contrato interno com Data Science](../docs/contratos/datascience-api-v1.yaml)
