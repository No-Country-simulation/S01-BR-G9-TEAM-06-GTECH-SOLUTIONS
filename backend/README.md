# IntelliWatts Backend

API REST responsável por validar dados de consumo energético, integrar o sistema com o serviço Python de Data Science e calcular o custo mensal estimado.

## Estado atual

O Backend Java já possui:

- endpoint público do MVP;
- validação dos dados recebidos;
- integração preparada para o serviço Python;
- cálculo financeiro no Backend;
- tratamento de erros;
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
- serviço Python disponível, por padrão, em `http://localhost:8000`.

## Executar o Backend

Na raiz do monorepo:

```powershell
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
| `TARIFA_REFERENCIA` | `0.75` | Tarifa em R$/kWh usada pelo Backend |
| `DATASCIENCE_BASE_URL` | `http://localhost:8000` | Endereço do serviço Python |
| `DATASCIENCE_CAMINHO_INFERENCIA` | `/v1/inferencias` | Rota interna de inferência |
| `DATASCIENCE_TEMPO_CONEXAO` | `300ms` | Limite para estabelecer conexão |
| `DATASCIENCE_TEMPO_RESPOSTA` | `1500ms` | Limite para receber a resposta |

## API pública

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
| `consumo_kwh` | Número maior que zero |
| `uso_horario_pico` | Booleano: `true` ou `false` |
| `quantidade_equipamentos` | Número inteiro maior ou igual a 1 |
| `tipo_imovel` | `Casa`, `Apartamento` ou `Comércio` |
| `horas_alto_consumo` | Número inteiro entre 1 e 24 |

Os limites mínimos de equipamentos e horas ainda dependem de confirmação da equipe.

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
| `503` | `SERVICO_INFERENCIA_INDISPONIVEL` | Timeout, falha HTTP ou resposta inválida do Python |
| `500` | `ERRO_INTERNO` | Falha inesperada dentro do Backend |

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

## Documentação

- [Escopo do MVP](../docs/ESCOPO_MVP.md)
- [Contrato interno com Data Science](../docs/contratos/datascience-api-v1.yaml)
