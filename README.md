# ⚡ IntelliWatts

### Inteligência Artificial aplicada à eficiência energética

> **Transformando dados de consumo de energia em decisões inteligentes, economia e sustentabilidade.**

O **IntelliWatts** é uma plataforma inteligente desenvolvida para analisar padrões de consumo energético de residências e pequenos estabelecimentos, utilizando **Machine Learning** para classificar o perfil de consumo e gerar recomendações personalizadas.

A solução transforma dados simples — como consumo em kWh, quantidade de equipamentos, tipo de imóvel e utilização em horários de pico — em **informações acionáveis**, permitindo que o usuário compreenda seu comportamento energético e identifique oportunidades de redução de custos.

---

## 🌱 O problema

O consumo de energia faz parte da rotina de praticamente todas as residências e estabelecimentos. Entretanto, muitos consumidores:

- não sabem quais padrões estão aumentando seu consumo;
- não conseguem identificar comportamentos ineficientes;
- têm dificuldade para interpretar seus próprios dados de consumo;
- utilizam equipamentos simultaneamente em horários de maior demanda;
- percebem o problema somente quando a conta de energia chega.

O desafio não é apenas **medir o consumo**, mas transformar os dados disponíveis em **informação útil para tomada de decisão**.

---

# 💡 Nossa solução

O IntelliWatts combina **dados + Inteligência Artificial + visualização** para transformar informações de consumo em recomendações práticas.

A plataforma permite:

### 📊 Análise de consumo
O usuário informa os principais dados relacionados ao seu consumo energético.

### 🤖 Classificação inteligente
Um modelo de Machine Learning classifica o perfil energético em:

- 🟢 **Eficiente**
- 🟡 **Moderado**
- 🔴 **Ineficiente**

### 💰 Estimativa de economia
A plataforma apresenta uma estimativa de economia potencial com base nos resultados das análises.

### 📈 Indicadores inteligentes
O dashboard apresenta informações como:

- consumo atual;
- consumo médio;
- maior e menor consumo;
- perfil predominante;
- economia estimada;
- quantidade de análises;
- confiança do modelo.

### 🧠 Recomendações personalizadas

A plataforma identifica tendências no histórico e apresenta recomendações relacionadas ao comportamento energético do usuário.

---

# 🔄 Como o IntelliWatts funciona

```text
                    ┌──────────────────────┐
                    │       USUÁRIO        │
                    │                      │
                    │ Dados de consumo     │
                    │ Equipamentos         │
                    │ Tipo de imóvel       │
                    │ Horário de pico      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      FRONT-END       │
                    │                      │
                    │ React + TypeScript   │
                    │ Dashboard            │
                    │ Formulários          │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       BACK-END       │
                    │                      │
                    │ Java / API           │
                    │ Integração           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    DATA SCIENCE      │
                    │                      │
                    │ Pré-processamento    │
                    │ Machine Learning     │
                    │ Classificação        │
                    └──────────┬───────────┘
                               │
                               ▼
              ┌────────────────────────────────┐
              │       RESULTADO DA ANÁLISE     │
              │                                │
              │ Perfil energético              │
              │ Confiança do modelo            │
              │ Indicadores                    │
              │ Recomendações                  │
              │ Economia estimada              │
              └────────────────────────────────┘
```

---

# 🧠 Inteligência Artificial

O núcleo inteligente do IntelliWatts utiliza **Machine Learning com Scikit-Learn** para classificação dos perfis de consumo.

O modelo utilizado no projeto é baseado em:

### 🌲 Random Forest

O Random Forest foi escolhido por sua capacidade de trabalhar com diferentes características simultaneamente e apresentar bom desempenho em problemas de classificação.

O modelo considera informações como:

| Variável | Descrição |
|---|---|
| `consumo_kwh` | Consumo energético |
| `uso_horario_pico` | Utilização durante horário de pico |
| `quantidade_equipamentos` | Quantidade de equipamentos |
| `tipo_imovel` | Tipo do imóvel |
| `horas_alto_consumo` | Horas de alto consumo |
| `consumo_por_equipamento` | Consumo proporcional por equipamento |
| `intensidade_consumo` | Intensidade do consumo |
| `equipamentos_por_hora` | Relação entre equipamentos e horas |
| `uso_horario_pico_num` | Representação numérica do uso em horário de pico |

O pipeline final de Machine Learning foi salvo em:

```text
modelo_energiAI.pkl
```

---

# 🧮 Engenharia de Features

Além dos dados informados diretamente pelo usuário, o IntelliWatts utiliza **feature engineering** para extrair informações adicionais.

Foram criadas características como:

```text
consumo_por_equipamento
intensidade_consumo
equipamentos_por_hora
uso_horario_pico_num
```

Essa etapa permite que o modelo trabalhe não apenas com os valores brutos, mas também com relações relevantes entre as variáveis.

---

# 🖥️ Interface da plataforma

O Front-end foi desenvolvido pensando em uma experiência moderna, intuitiva e orientada à visualização de dados.

A plataforma possui diferentes áreas:

### 🏠 Landing Page

Apresentação do IntelliWatts, explicando:

- proposta da plataforma;
- funcionamento;
- tecnologias utilizadas;
- benefícios da solução.

### 🔐 Login

Tela de autenticação com uma apresentação visual do propósito da plataforma.

### 📊 Dashboard

Área principal de acompanhamento dos indicadores energéticos.

Apresenta:

- consumo;
- perfil energético;
- economia;
- precisão/confiança da IA;
- evolução do consumo;
- histórico;
- recomendações.

### 🔎 Nova Análise

Formulário responsável por coletar os dados necessários para uma nova análise.

### 📈 Analytics

Área dedicada à análise histórica e indicadores de consumo.

### 🧾 Histórico

Permite acompanhar as análises realizadas anteriormente.

### 📑 Relatórios

Área destinada à visualização e exportação dos dados analisados.

### ⚙️ Configurações

Permite personalizar aspectos da experiência do usuário, incluindo:

- aparência;
- notificações;
- acessibilidade;
- preferências;
- informações do sistema.

---

# 🌎 Multilíngue

O IntelliWatts possui suporte a três idiomas:

🇧🇷 **Português**

🇺🇸 **English**

🇪🇸 **Español**

A internacionalização foi implementada através de um sistema próprio utilizando:

```text
translations.ts
I18nContext.tsx
useTranslation.ts
```

Os componentes utilizam:

```tsx
t("translationKey")
```

permitindo que o conteúdo seja alterado dinamicamente de acordo com o idioma selecionado pelo usuário.

---

# 🎨 Design e experiência

A interface utiliza uma identidade visual baseada em **eficiência, tecnologia e energia**.

Entre as características visuais estão:

- interface responsiva;
- cards informativos;
- gráficos;
- ícones com Lucide;
- suporte a modo claro e escuro;
- elementos com destaque em amarelo;
- feedback visual para estados de consumo;
- componentes reutilizáveis;
- hierarquia visual orientada à leitura de indicadores.

A escolha do amarelo como cor de destaque reforça a associação visual com **energia, eletricidade e inovação**.

---

# 🏗️ Arquitetura da solução

O projeto foi estruturado de forma modular, separando as principais responsabilidades da aplicação.

```text
S01-BR-G9-TEAM-06-GTECH-SOLUTIONS/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── analysis/
│   │   │   ├── analytics/
│   │   │   ├── dashboard/
│   │   │   ├── landing/
│   │   │   ├── layout/
│   │   │   └── ui/
│   │   │
│   │   ├── context/
│   │   ├── i18n/
│   │   ├── services/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   └── package.json
│
├── backend/
├── datascience/
├── README.md
└── ...
```

---

# 🧩 Stack tecnológica

## Front-end

| Tecnologia | Utilização |
|---|---|
| ⚛️ React | Construção da interface |
| 📘 TypeScript | Tipagem e segurança do código |
| ⚡ Vite | Ambiente de desenvolvimento e build |
| 🎨 Tailwind CSS | Estilização |
| 🧩 shadcn/ui / Base UI | Componentização da interface |
| 🖼️ Lucide React | Ícones |
| 🌎 Sistema i18n próprio | Internacionalização |

## Back-end

| Tecnologia | Utilização |
|---|---|
| ☕ Java | Camada principal de aplicação |
| 🌱 Spring | Estruturação da API e integração |
| 🔗 REST API | Comunicação entre os serviços |

## Data Science

| Tecnologia | Utilização |
|---|---|
| 🐍 Python | Desenvolvimento do modelo |
| 🐼 Pandas | Manipulação dos dados |
| 🔬 Scikit-Learn | Machine Learning |
| 💾 Joblib | Persistência do modelo |
| 🚀 FastAPI | Disponibilização das inferências |

---

# 🔗 Integração com Data Science

O Back-end possui um contrato de integração com o serviço de Data Science através do endpoint:

```http
POST /v1/inferencias
```

O fluxo de integração é:

```text
Front-end
    │
    │ dados da análise
    ▼
Back-end Java
    │
    │ POST /v1/inferencias
    ▼
FastAPI
    │
    ▼
Modelo Random Forest
    │
    ▼
Classificação
    │
    ▼
Resultado
    │
    ▼
Back-end
    │
    ▼
Front-end
```

---

# 📊 Histórico e análise de dados

O IntelliWatts trabalha com o histórico de análises para gerar indicadores e identificar tendências.

A partir desse histórico, o sistema calcula informações como:

```text
Consumo médio
Maior consumo
Menor consumo
Economia acumulada
Quantidade de análises
Perfil predominante
Tendência de consumo
Evolução do perfil
```

Essas informações alimentam o painel de Analytics e o mecanismo de recomendações.

---

# 🤖 Sistema de recomendações

Além da classificação realizada pelo modelo, o IntelliWatts possui uma camada responsável pela geração de recomendações.

O sistema analisa:

- tendência de consumo;
- perfil predominante;
- evolução do perfil;
- utilização em horários de pico;
- histórico de análises.

```text
             MODELO ML
                 │
                 ▼
       Classificação energética
                 │
                 ▼
        Análise do histórico
                 │
                 ▼
      Motor de recomendações
                 │
                 ▼
       Recomendação personalizada
```

---

# 🔒 Separação de responsabilidades

### Front-end

Responsável por:

- experiência do usuário;
- entrada de dados;
- visualização;
- navegação;
- internacionalização.

### Back-end

Responsável por:

- regras da aplicação;
- integração entre serviços;
- contratos da API;
- gerenciamento das informações da aplicação.

### Data Science

Responsável por:

- processamento dos dados;
- engenharia de características;
- treinamento;
- persistência;
- inferência do modelo.

---

# 🚀 Como executar o projeto

## Pré-requisitos

Certifique-se de possuir:

- Node.js
- npm
- Python
- Java
- Git

## Front-end

Entre na pasta principal:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute o ambiente de desenvolvimento:

```bash
npm run dev
```

O Vite disponibilizará a aplicação localmente, normalmente em:

```text
http://localhost:5173
```

> **Importante:** o `package.json` do Front-end está dentro da pasta `frontend/`. Portanto, o comando `npm run dev` deve ser executado a partir dessa pasta.

---

# 🧪 Fluxo completo de uma análise

```text
1. Usuário acessa a plataforma
             ↓
2. Informa dados de consumo
             ↓
3. Front-end valida os dados
             ↓
4. Back-end recebe a solicitação
             ↓
5. Data Science processa as características
             ↓
6. Random Forest realiza a classificação
             ↓
7. Resultado retorna para a aplicação
             ↓
8. Histórico é atualizado
             ↓
9. Indicadores são recalculados
             ↓
10. Sistema gera recomendações
             ↓
11. Dashboard apresenta os resultados
```

---

# 🏆 Contexto do Hackathon

O IntelliWatts foi desenvolvido no contexto do **Hackathon**, com o objetivo de utilizar tecnologia e Inteligência Artificial para propor uma solução relacionada à eficiência energética.

A proposta combina diferentes áreas:

```text
              INTELLIWATTS
                   │
        ┌──────────┼──────────┐
        │          │          │
        ▼          ▼          ▼
   Tecnologia   Dados       IA
        │          │          │
        └──────────┼──────────┘
                   │
                   ▼
          Eficiência energética
                   │
          ┌────────┴────────┐
          ▼                 ▼
       Economia        Sustentabilidade
```

Mais do que apresentar um modelo de Machine Learning, o projeto busca transformar o resultado do modelo em uma **experiência compreensível e útil para o usuário final**.

---

# 🎯 Objetivos do MVP

- [x] Coleta de dados de consumo
- [x] Classificação de perfis energéticos
- [x] Modelo de Machine Learning
- [x] Dashboard de indicadores
- [x] Histórico de análises
- [x] Sistema de recomendações
- [x] Analytics
- [x] Estimativa de economia
- [x] Internacionalização
- [x] Interface responsiva
- [x] Modo claro e escuro
- [x] Integração entre Front-end, Back-end e Data Science

---

# 🔮 Próximos passos

Entre as possibilidades futuras estão:

### 📱 Aplicativo mobile
Disponibilizar o IntelliWatts para Android e iOS.

### ⚡ Integração com dispositivos IoT
Coletar dados automaticamente de medidores e dispositivos inteligentes.

### 📈 Previsão de consumo
Utilizar modelos de séries temporais para prever o consumo futuro.

### 💰 Tarifação dinâmica
Considerar diferentes tarifas e horários para estimar custos com maior precisão.

### 🏠 Integração com Smart Home
Identificar automaticamente equipamentos e padrões de utilização.

### 🧠 Modelos mais avançados
Avaliar novos algoritmos e técnicas de Machine Learning conforme o volume de dados aumente.

### 🌎 Expansão da plataforma
Adaptar a solução para diferentes perfis de usuários, regiões e mercados.

---

# 👥 Equipe

**GTECH SOLUTIONS — S01-BR-G9-TEAM-06**

Projeto desenvolvido colaborativamente como solução de tecnologia aplicada à eficiência energética.

---

# 📌 Status do projeto

**🟢 MVP em desenvolvimento/apresentação**

| Módulo | Status |
|---|---|
| Front-end | 🟢 Concluído para MVP |
| Dashboard | 🟢 Concluído |
| Internacionalização | 🟢 Implementada |
| Analytics | 🟢 Implementado |
| Histórico | 🟢 Implementado |
| Recomendações | 🟢 Implementadas |
| Data Science | 🟢 Modelo desenvolvido |
| API de inferência | 🟢 Implementada |
| Integração Back-end | 🟢 Integrada |
| Expansões futuras | 🔵 Planejadas |

---

# ⚡ IntelliWatts

### **Dados que explicam. Inteligência que recomenda. Energia que economiza.**

O IntelliWatts nasceu da ideia de que **dados de consumo não devem apenas ser armazenados — eles devem ajudar as pessoas a tomar decisões melhores.**

Ao combinar **React, TypeScript, Java, FastAPI, Python e Machine Learning**, a plataforma transforma informações de consumo energético em uma experiência inteligente, visual e orientada à ação.

**Porque consumir melhor não significa apenas gastar menos. Significa utilizar tecnologia para construir um futuro mais eficiente e sustentável.** 🌱⚡

---

> **GTECH SOLUTIONS · Hackathon · IntelliWatts**
