# IntelliWatts – Documentação da API de Inferência

## Visão Geral

Este diretório contém a implementação da API de Ciência de Dados do projeto **IntelliWatts**.

Seu objetivo é disponibilizar o modelo de Machine Learning por meio de um serviço HTTP utilizando **FastAPI**, permitindo que aplicações externas (Backend Java) enviem dados de consumo energético e recebam uma classificação automática do perfil de eficiência energética.

A API realiza apenas inferências, ou seja, **não realiza treinamento do modelo** durante sua execução.

---

# Estrutura dos Arquivos

```
.
datascience/
├── __init__.py
├── app.py
├── energia_engine.py
├── README.md
├── requirements.txt
├── datasets/
│   ├── README.md
│   ├── consumo_energetico.csv
│   └── consumo_energetico_processado.csv
├── docs/
│   └── API.md
└── training/
    └── energia.py
```

---

# app.py

## Finalidade

Arquivo principal da aplicação FastAPI.

É responsável por iniciar o servidor HTTP e disponibilizar o endpoint utilizado pelo Backend.

Também realiza:

- validação dos dados recebidos;
- conversão do JSON em objetos Python;
- chamada do motor de inferência;
- retorno da resposta em formato JSON.

---

## Endpoint disponível

```
POST /v1/inferencias
```

---

## Entrada esperada

```json
{
  "consumo_kwh": 420,
  "uso_horario_pico": true,
  "quantidade_equipamentos": 10,
  "tipo_imovel": "Casa",
  "horas_alto_consumo": 8
}
```

---

## Saída

```json
{
  "categoria": "Moderado",
  "probabilidade": 0.985,
  "recomendacoes": [
    "Monitorar o consumo e redistribuir atividades ao longo do dia.",
    "Reduzir o uso de equipamentos durante horários de pico."
  ]
}
```

---

# training/energia.py

## Finalidade

Script utilizado para análise exploratória, engenharia de atributos,
treinamento, avaliação e serialização do modelo.

Esse arquivo não é executado pela API durante as inferências. O modelo
Pydantic utilizado para validar as requisições está definido em `app.py`.
---

## Campos validados

| Campo | Tipo |
|--------|------|
| consumo_kwh | float |
| uso_horario_pico | bool |
| quantidade_equipamentos | int |
| tipo_imovel | str |
| horas_alto_consumo | int |

Caso algum campo esteja ausente ou possua tipo incompatível, a API retorna automaticamente um erro HTTP 422.

---

# energia_engine.py

## Finalidade

Este arquivo implementa o motor de inferência da aplicação.

É responsável por realizar todas as etapas necessárias antes da previsão do modelo.

---

## Responsabilidades

### Carregamento do modelo

Ao iniciar a aplicação, o arquivo carrega automaticamente:

```
modelo_energiAI.pkl
```

utilizando a biblioteca **Joblib**.

---

### Pré-processamento

Antes da inferência são geradas as mesmas variáveis utilizadas durante o treinamento.

As features produzidas são:

- consumo_por_equipamento
- intensidade_consumo
- equipamentos_por_hora
- uso_horario_pico_num

Este processo garante que os dados enviados ao modelo possuam exatamente a mesma estrutura utilizada durante o treinamento.

---

### Inferência

Após o pré-processamento são executadas duas operações:

- classificação da categoria energética;
- cálculo da probabilidade da previsão.

---

### Recomendações

Além da classificação, o motor gera recomendações de economia de energia com base na categoria prevista.

As recomendações são produzidas pela função:

```
gerar_recomendacoes()
```

---

# modelo_energiAI.pkl

## Finalidade

Arquivo contendo o modelo de Machine Learning treinado.

Este arquivo foi gerado utilizando **Scikit-Learn** e posteriormente serializado através da biblioteca **Joblib**.

---

## Objetivo

Receber os dados preparados pela API e prever automaticamente o perfil energético do imóvel.

---

## Categorias previstas

- Eficiente
- Moderado
- Ineficiente

---

## Features utilizadas

O modelo foi treinado utilizando exatamente nove variáveis:

- consumo_kwh
- uso_horario_pico
- quantidade_equipamentos
- tipo_imovel
- horas_alto_consumo
- consumo_por_equipamento
- intensidade_consumo
- equipamentos_por_hora
- uso_horario_pico_num

Nenhuma outra variável é utilizada durante a inferência.

---

## Observação

O modelo **não realiza aprendizado online**.

Novas previsões **não alteram** o modelo treinado.

Qualquer melhoria futura exige novo treinamento e geração de um novo arquivo `.pkl`.

---

# requirements.txt

## Finalidade

Arquivo responsável por listar todas as dependências necessárias para execução da API.

---

## Instalação

Criar um ambiente virtual:

```
python -m venv .venv
```

Ativar:

Windows

```
.venv\Scripts\activate
```

Linux/macOS

```
source .venv/bin/activate
```

Instalar as dependências:

```
python -m pip install -r datascience/requirements.txt

---

## Principais bibliotecas

- FastAPI
- Uvicorn
- Pandas
- NumPy
- Scikit-Learn
- Joblib
- Pydantic

---

# Fluxo da API

```
Cliente (Backend Java)
            │
            ▼
POST /v1/inferencias
            │
            ▼
Validação (energia.py)
            │
            ▼
Pré-processamento (energia_engine.py)
            │
            ▼
modelo_energiAI.pkl
            │
            ▼
Predição
            │
            ▼
Geração de recomendações
            │
            ▼
Resposta JSON
```

---

# Execução

Iniciar o servidor:

```
python -m pip install -r datascience/requirements.txt
```

Servidor disponível em:

```
http://localhost:8000
```

---

## Documentação automática

Swagger UI

```
http://localhost:8000/docs
```

ReDoc

```
http://localhost:8000/redoc
```

---

# Observações

- A API foi desenvolvida para integração com o Backend do projeto IntelliWatts.
- O cálculo de custos financeiros (tarifa por kWh) é responsabilidade do Backend.
- O módulo de Ciência de Dados é responsável apenas pela classificação do perfil energético e geração de recomendações.
- Todas as inferências utilizam um modelo previamente treinado, garantindo previsões rápidas e consistentes.
