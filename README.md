# ⚡ IntelliWatts – Data Science

<p align="center">

![Python](https://img.shields.io/badge/Python-3.12+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.116+-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-ML-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-Data%20Analysis-150458?style=for-the-badge&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-Numerical-013243?style=for-the-badge&logo=numpy&logoColor=white)

</p>

---

# 📖 Sobre o Projeto

O **IntelliWatts** é um sistema de apoio à análise do consumo energético de residências e pequenos estabelecimentos.

O módulo de **Data Science** é responsável por processar os dados recebidos pelo Backend, realizar inferências utilizando um modelo de Machine Learning previamente treinado e retornar uma classificação do perfil de eficiência energética juntamente com recomendações inteligentes de economia de energia.

Toda a comunicação é realizada através de uma API REST desenvolvida em **FastAPI**, permitindo integração simples com o Backend Java do projeto.

---

# 🎯 Objetivos

O módulo de Ciência de Dados possui como responsabilidades:

- Classificar automaticamente o perfil energético do imóvel;
- Estimar a confiança da previsão realizada;
- Gerar recomendações personalizadas para redução do consumo;
- Disponibilizar um endpoint HTTP para integração com o Backend.

**Observação:** o cálculo financeiro (tarifa por kWh) é responsabilidade do Backend conforme especificado nos requisitos funcionais do projeto.

---

# 🏗 Arquitetura

```text
                Backend Java
                      │
                      │ JSON
                      ▼
              FastAPI (app.py)
                      │
                      ▼
          energia_engine.py
                      │
     Pré-processamento dos dados
                      │
                      ▼
          modelo_energiAI.pkl
                      │
                      ▼
      Classificação + Probabilidade
                      │
                      ▼
      Geração de Recomendações
                      │
                      ▼
              Resposta JSON
```

---

# 📂 Estrutura da Branch

```
DataScience/
│
├── app.py
├── energia.py
├── energia_engine.py
├── modelo_energiAI.pkl
├── requirements.txt
├── README.md
│
├── datasets/
│   ├── consumo_energetico.csv
│   └── consumo_energetico_processado.csv
```

---

# 🧠 Machine Learning

O modelo foi desenvolvido utilizando **Scikit-Learn**.

Fluxo utilizado:

```
Dataset Original
        │
        ▼
Limpeza dos dados
        │
        ▼
Feature Engineering
        │
        ▼
Treinamento
        │
        ▼
Modelo Serializado (.pkl)
        │
        ▼
FastAPI
```

---

# 🔬 Engenharia de Atributos

Durante o treinamento foram criadas variáveis derivadas para melhorar o desempenho do modelo.

## consumo_por_equipamento

```
consumo_kwh / quantidade_equipamentos
```

Representa o consumo médio por equipamento.

---

## intensidade_consumo

```
consumo_kwh / horas_alto_consumo
```

Representa o consumo médio durante o período de maior utilização.

---

## equipamentos_por_hora

```
quantidade_equipamentos / horas_alto_consumo
```

Indica a concentração de equipamentos utilizados nas horas de maior consumo.

---

## uso_horario_pico_num

Conversão da variável booleana:

```
True → 1
False → 0
```

Necessária para utilização pelo algoritmo de Machine Learning.

---

# 📊 Features utilizadas

O modelo foi treinado utilizando exatamente as seguintes variáveis:

- consumo_kwh
- uso_horario_pico
- quantidade_equipamentos
- tipo_imovel
- horas_alto_consumo
- consumo_por_equipamento
- intensidade_consumo
- equipamentos_por_hora
- uso_horario_pico_num

---

# 🚀 API REST

## Endpoint

```
POST /v1/inferencias
```

---

## Exemplo de Requisição

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

## Exemplo de Resposta

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

# 🏷 Categorias

## 🟢 Eficiente

Imóveis que apresentam consumo equilibrado e boas práticas de utilização de energia.

---

## 🟡 Moderado

Consumo dentro de níveis aceitáveis, porém com oportunidades de otimização.

---

## 🔴 Ineficiente

Perfil com elevado potencial de desperdício energético, exigindo ações corretivas.

---

# ⚙️ Instalação

Clone o repositório.

Crie um ambiente virtual:

```bash
python -m venv .venv
```

Ative o ambiente.

Windows

```bash
.venv\Scripts\activate
```

Linux/macOS

```bash
source .venv/bin/activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

---

# ▶️ Executando a API

```bash
#Opção 1
cd DataScience
python -m uvicorn app:app --reload

#Opção 2 (a partir da raiz do repositório)
python -m uvicorn DataScience.app:app --reload
```

Servidor:

```
http://localhost:8000
```

Swagger:

```
http://localhost:8000/docs
```

ReDoc:

```
http://localhost:8000/redoc
```

---

# 🔄 Fluxo de Inferência

```
Receber JSON
      │
      ▼
Validação (Pydantic)
      │
      ▼
Pré-processamento
      │
      ▼
Criação das Features
      │
      ▼
Modelo de Machine Learning
      │
      ▼
Predição
      │
      ▼
Probabilidade
      │
      ▼
Recomendações
      │
      ▼
Resposta JSON
```

---

# 🤝 Integração com o Backend

A API foi desenvolvida para integração direta com o Backend Java através do endpoint:

```
POST /v1/inferencias
```

O Backend é responsável por:

- autenticação;
- persistência dos dados;
- histórico das análises;
- cálculo financeiro utilizando a tarifa vigente;
- regras de negócio.

O módulo de Data Science é responsável exclusivamente pela inferência do modelo.

---

# 📚 Tecnologias

- Python
- FastAPI
- Scikit-Learn
- Pandas
- NumPy
- Joblib
- Pydantic
- Uvicorn

---

# 👨‍💻 Equipe de Data Science

Este módulo foi desenvolvido como parte do projeto **IntelliWatts**, contemplando:

- exploração e preparação dos dados;
- engenharia de atributos;
- treinamento e validação do modelo de Machine Learning;
- serialização do modelo (`.pkl`);
- desenvolvimento da API REST em FastAPI;
- documentação técnica;
- integração com o Backend.

---

# 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos e de inovação tecnológica, como parte do programa No Country em colaboração com Alura + Oracle.
