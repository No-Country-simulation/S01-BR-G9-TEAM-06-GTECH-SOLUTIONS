# Escopo do MVP — IntelliWatts

**Status:** Rascunho para aprovação da equipe

**Versão:** 0.1

**Última atualização:** 13/07/2026

## 1. Objetivo

O IntelliWatts será uma solução capaz de receber indicadores de consumo energético de uma residência ou pequeno estabelecimento e classificar o perfil energético como Eficiente, Moderado ou Ineficiente.

A solução retornará a probabilidade da classificação, recomendações para redução do desperdício e o custo mensal estimado, auxiliando na adoção de hábitos mais sustentáveis.

## 2. Fonte de verdade

A definição do MVP segue esta prioridade:

1. Descrição oficial fornecida pela NoCountry.
2. Decisões aprovadas pela equipe atual.
3. Contratos técnicos aprovados pela equipe.
4. Implementação do sistema.

Os documentos anteriores de requisitos, arquitetura e API são considerados materiais legados não validados. Suas funcionalidades somente entrarão no MVP quando estiverem alinhadas à descrição oficial e aprovadas pela equipe.

## 3. Funcionalidades incluídas

### MVP-01 — Entrada

O sistema deverá receber:

- consumo em kWh;
- uso em horário de pico;
- quantidade de equipamentos;
- tipo do imóvel;
- horas de alto consumo.

### MVP-02 — Classificação

O sistema deverá classificar o perfil energético como Eficiente, Moderado ou Ineficiente.

### MVP-03 — Probabilidade

O sistema deverá retornar a probabilidade associada à classificação.

### MVP-04 — Recomendações

O sistema deverá gerar recomendações para auxiliar na redução do desperdício energético.

### MVP-05 — Estimativa financeira

O Backend deverá calcular o custo mensal multiplicando o consumo em kWh pela tarifa de referência fixa do MVP, de R$ 0,75/kWh.

O resultado deverá ser arredondado para duas casas decimais utilizando a regra `HALF_UP`.

```text
custo_estimado_mensal = consumo_kwh × 0,75
```

### MVP-06 — API REST

A solução deverá disponibilizar uma API REST com o endpoint:

```http
POST /analise-energetica
```

### MVP-07 — JSON

A API deverá receber as requisições e retornar as respostas em formato JSON.

### MVP-08 — Validação e erros

O sistema deverá validar os dados de entrada e retornar respostas de erro quando a requisição for inválida ou a análise não puder ser realizada.

### MVP-09 — OCI

A solução deverá utilizar o OCI Object Storage para armazenar o modelo treinado de Ciência de Dados.

### MVP-10 — Documentação

O endpoint, seus campos, respostas e possíveis erros deverão ser documentados.

## 4. Contrato da API pública

### 4.1 Requisição

```http
POST /analise-energetica
Content-Type: application/json
```

```json
{
  "consumo_kwh": 450,
  "uso_horario_pico": true,
  "quantidade_equipamentos": 11,
  "tipo_imovel": "Casa",
  "horas_alto_consumo": 7
}
```

### 4.2 Validações

| Campo | Tipo | Obrigatório | Regra provisória |
|---|---|---:|---|
| `consumo_kwh` | número decimal | sim | maior que `0`, menor ou igual a `700` e com no máximo 3 casas decimais |
| `uso_horario_pico` | booleano | sim | `true` ou `false` |
| `quantidade_equipamentos` | número inteiro | sim | entre `1` e `17` |
| `tipo_imovel` | texto | sim | `Casa`, `Apartamento` ou `Comércio` |
| `horas_alto_consumo` | número inteiro | sim | entre `1` e `24` |

O modelo atual foi treinado com:

- consumo entre 80 e 699 kWh;
- 3 a 17 equipamentos;
- 1 a 11 horas de alto consumo.

Para esta versão, `700 kWh` — valor arredondado e também usado no cenário de
demonstração do módulo de Data Science — e `17 equipamentos` foram adotados
como limites operacionais temporários. A API ainda aceita consumos abaixo de
`80 kWh`, imóveis com `1` ou `2` equipamentos e até `24` horas de alto consumo
por serem regras funcionais do domínio. Essas entradas fora da faixa de
treinamento deverão ser reavaliadas com Ciência de Dados.

### 4.3 Resposta de sucesso

**Status:** `200 OK`

```json
{
  "categoria": "Ineficiente",
  "probabilidade": 0.83,
  "recomendacoes": [
    "Avaliar aparelhos com alto consumo ao longo do dia"
  ],
  "custo_estimado_mensal": 337.50
}
```

| Campo | Tipo | Regra |
|---|---|---|
| `categoria` | texto | `Eficiente`, `Moderado` ou `Ineficiente` |
| `probabilidade` | número decimal | entre `0` e `1` |
| `recomendacoes` | lista de textos | pelo menos uma recomendação |
| `custo_estimado_mensal` | número decimal | consumo multiplicado por `0,75` |

A resposta pública não deverá conter IDs, período, versão do modelo, objeto financeiro aninhado ou causa separada da recomendação.

## 5. Respostas de erro

A estrutura de erro deverá conter:

```json
{
  "timestamp": "2026-07-12T14:30:00Z",
  "status": 400,
  "codigo": "ENTRADA_INVALIDA",
  "mensagem": "A requisição possui campos inválidos",
  "caminho": "/analise-energetica",
  "erros": {
    "consumo_kwh": "deve ser maior que zero"
  }
}
```

| Situação | Status | Código |
|---|---:|---|
| Entrada inválida | `400` | `ENTRADA_INVALIDA` |
| JSON inválido | `400` | `JSON_INVALIDO` |
| Corpo da requisição acima do limite | `413` | `CORPO_REQUISICAO_MUITO_GRANDE` |
| Serviço Python indisponível | `503` | `SERVICO_INFERENCIA_INDISPONIVEL` |
| Erro inesperado no backend | `500` | `ERRO_INTERNO` |

O Backend deverá rejeitar corpos HTTP maiores que o limite configurado antes
da desserialização. O valor padrão será de `16384` bytes e o máximo
configurável, de `1048576` bytes.

Os nomes dos campos dentro de `erros` deverão seguir `snake_case`.

## 6. Responsabilidades

### 6.1 Backend

O Backend deverá:

- disponibilizar o endpoint público;
- receber e validar os cinco indicadores;
- chamar o serviço de Data Science;
- controlar timeout e indisponibilidade;
- validar a resposta recebida;
- calcular o custo mensal utilizando a tarifa de referência;
- arredondar o custo para duas casas decimais;
- retornar o contrato público em JSON;
- tratar erros;
- manter testes e documentação.

O Backend não realizará autenticação ou persistência no MVP.

### 6.2 Data Science

A camada de Data Science deverá:

- preparar os dados para o modelo;
- carregar o modelo treinado;
- classificar o perfil energético;
- calcular a probabilidade;
- gerar recomendações;
- disponibilizar um endpoint de inferência;
- retornar categoria, probabilidade e recomendações conforme o contrato interno aprovado;
- tratar adequadamente os casos de divisão por zero.

### 6.3 OCI

A integração com OCI deverá:

- armazenar o modelo no Object Storage;
- manter o bucket privado;
- permitir que o serviço Python carregue o modelo;
- manter credenciais e segredos fora do repositório.

A implementação dessa integração ficou sob responsabilidade da equipe de
Data Science. O trabalho permanece pendente até o armazenamento e o
carregamento do modelo serem demonstrados.

## 7. Fora do escopo

Não fazem parte desta versão do MVP:

- cadastro, login e autenticação;
- onboarding e perfil do imóvel;
- banco de dados e persistência;
- análise baseada em `consumoId`;
- registro periódico e sobrescrita;
- histórico;
- dashboard;
- variáveis experimentais;
- gestão e versionamento de tarifas;
- frontend.

## 8. Recursos opcionais

Não são requisitos de aceite desta entrega:

- processamento em lote por CSV;
- Docker;
- alertas;
- gráficos;
- comparação entre períodos;
- ranking de eficiência;
- simulações.

## 9. Critérios de aceitação

### CA-01 — Requisição válida

Uma requisição válida deverá retornar `200 OK`.

### CA-02 — Resposta completa

A resposta deverá conter categoria, probabilidade, recomendações e custo estimado mensal.

### CA-03 — Cálculo financeiro

O Backend deverá calcular o custo multiplicando o consumo por R$ 0,75 e arredondar o resultado para duas casas decimais utilizando a regra `HALF_UP`.

### CA-04 — Entrada inválida

Campos ausentes, tipos incorretos ou valores inválidos deverão retornar `400 Bad Request`.

### CA-05 — Data Science indisponível

Se o serviço Python estiver indisponível ou exceder o timeout, o Backend deverá retornar `503 Service Unavailable`.

### CA-06 — Integração real

Deverá existir uma demonstração completa:

```text
Cliente → Java → Python → modelo → Java → JSON
```

### CA-07 — Cenários de demonstração

A equipe deverá documentar e executar ao menos três cenários:

- perfil eficiente;
- perfil moderado;
- perfil ineficiente.

### CA-08 — OCI

O modelo deverá estar armazenado no OCI Object Storage e ser carregado sem credenciais expostas no repositório.

### CA-09 — Testes

Todos os testes automatizados deverão passar após o alinhamento dos contratos.

### CA-10 — Documentação

O escopo, o README e o contrato Java–Python deverão corresponder ao comportamento real da aplicação.

## 10. Decisões pendentes

| ID | Decisão necessária |
|---|---|
| `PEND-02` | Reavaliar com Ciência de Dados as entradas fora da faixa de treinamento ainda aceitas pelo domínio: consumo abaixo de 80 kWh, 1 ou 2 equipamentos e de 12 a 24 horas de alto consumo. |
| `PEND-03` | Esclarecer se a consulta de resultados exige um endpoint `GET`. |
| `PEND-04` | Aprovar a rota e os timeouts do serviço Python. |

## 11. Aprovação

Este documento deverá ser revisado pela equipe. Após a resolução das decisões pendentes, sua versão será alterada para `1.0 — Aprovado`.
