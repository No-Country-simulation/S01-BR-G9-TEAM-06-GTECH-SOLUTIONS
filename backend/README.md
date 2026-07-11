# IntelliWatts Backend

API REST responsável por validar indicadores de consumo energético e orquestrar a análise realizada pelo serviço Python de Data Science.

## Escopo do MVP

O fluxo atual é stateless:

```text
Cliente → Backend Java → Data Science Python → Backend → JSON
```

- O Java valida a entrada, acrescenta a tarifa de referência e controla o contrato HTTP.
- O Python classifica o consumo, calcula a probabilidade, gera recomendações e estima o custo.
- Autenticação, banco de dados, usuários e histórico estão fora do MVP.
- O modelo treinado será carregado pelo serviço Python a partir do OCI Object Storage.

## Requisitos

- Java 21 ou superior compatível com o Spring Boot 4.1
- Maven 3.6.3 ou superior
- Serviço Python disponível, por padrão, em `http://localhost:8000`

## Executar

Na raiz do monorepo:

```powershell
mvn -f backend/pom.xml spring-boot:run
```

A API ficará disponível em `http://localhost:8080`.

## Testar

```powershell
mvn -f backend/pom.xml test
```

## Variáveis de ambiente

| Variável | Padrão | Finalidade |
|---|---|---|
| `SERVER_PORT` | `8080` | Porta do backend |
| `TARIFA_REFERENCIA` | `0.75` | Tarifa em R$/kWh enviada ao Python |
| `DATASCIENCE_BASE_URL` | `http://localhost:8000` | Endereço do serviço Python |
| `DATASCIENCE_CAMINHO_INFERENCIA` | `/v1/inferencias` | Rota interna de inferência |
| `DATASCIENCE_TEMPO_CONEXAO` | `300ms` | Limite para estabelecer conexão |
| `DATASCIENCE_TEMPO_RESPOSTA` | `1500ms` | Limite para receber a resposta |

## API pública

```http
POST /api/v1/analises-energeticas
Content-Type: application/json
```

```json
{
  "consumoKwh": 305,
  "usoHorarioPico": false,
  "quantidadeEquipamentos": 13,
  "tipoImovel": "Comércio",
  "horasAltoConsumo": 2
}
```

Resposta `200 OK`:

```json
{
  "categoria": "Moderado",
  "probabilidade": 0.78,
  "recomendacoes": [
    {
      "causa": "uso_horario_pico",
      "descricao": "Reduzir o uso de equipamentos no horário de pico."
    }
  ],
  "estimativaFinanceira": {
    "consumoKwh": 305,
    "tarifaReferencia": 0.75,
    "custoEstimado": 228.75
  },
  "modeloVersao": "random-forest-v1"
}
```

## Contrato interno com Data Science

O contrato formal e compartilhável está em [`docs/contratos/datascience-api-v1.yaml`](../docs/contratos/datascience-api-v1.yaml).

O backend chama:

```http
POST /v1/inferencias
Content-Type: application/json
```

```json
{
  "consumo_kwh": 305,
  "uso_horario_pico": false,
  "quantidade_equipamentos": 13,
  "tipo_imovel": "Comércio",
  "horas_alto_consumo": 2,
  "tarifa_referencia": 0.75
}
```

O serviço Python deve retornar `categoria`, `probabilidade`, `recomendacoes`, `estimativa_financeira` e `modelo_versao` conforme o exemplo da API pública, usando `snake_case`.

## Erros públicos

- `400 ENTRADA_INVALIDA`: campos ausentes ou fora dos limites.
- `400 JSON_INVALIDO`: corpo que não pode ser lido como JSON.
- `503 SERVICO_INFERENCIA_INDISPONIVEL`: timeout, falha HTTP ou resposta inválida do Python.
- `500 ERRO_INTERNO`: falha inesperada no backend.

## Tipos de imóvel

Os valores canônicos de `tipoImovel` são `Casa`, `Apartamento` e `Comércio`. O backend rejeita outros valores e repassa ao Python exatamente o texto validado.
