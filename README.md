
# ⚡ Documentação Oficial IntelliWatts: Uma API REST Inteligente 
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Python](https://img.shields.io/badge/python-%233670A0.svg?style=for-the-badge&logo=python&logoColor=ffdd54)
![scikit-learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![FastAPI](https://img.shields.io/badge/fastapi-%23009688.svg?style=for-the-badge&logo=fastapi&logoColor=white)

## 🎯 Objetivo:
* O objetivo do hackathon é desenvolver uma solução inteligente capaz de analisar
  o consumo de energia de um imóvel e classificá-lo em três categorias:
  Eficiente, Moderado e Ineficiente.
* A partir dessa classificação, o sistema deve gerar recomendações para diminuir
  o consumo de energia.
***
## 📌 O que é o nosso MVP?
* API REST responsável por validar dados de consumo energético, integrar o sistema com o serviço Python de Data Science e calcular o custo mensal estimado.
* O IntelliWatts é uma solução criada a partir das áreas de Backend trazendo a parte base(API REST);
* Tem a área de Data Science que acrescenta com a base de dados a partir de análises inteligentes desenvolvidas a partir da linguagem de Python;
* Integração com OCI na parte de Object Storage, onde armazenamos nosso modelo treinado usando os datasets
  e persistindo os dados já criados, fazendo com que nossa aplicação seja válida.
* Juntando tudo isso, montamos um site com a área de Frontend onde demonstramos melhor a nossa solução.
***
## 💡 Qual a Proposta da Solução:
* Nossa solução segue uma razão lógica onde buscamos resolver o problema de consumo de energia oferecendo para o cliente um serviço que vai ajudar muito na hora de verificar e monitorar os gastos.

* Trazendo uma oportunidade única de otimizar o consumo energético, promover economia financeira e trazer dicas para práticas mais sustentáveis.

***
## 🔨 Como essa API foi construída:

## 🏗️ Arquitetura IntelliWatts:
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

## 🖥️ Parte Backend:
*  O Backend começou seu desenvolvimento a partir dos dados fornecidos pela ciência de dados além de também ter fornecido dados para o Data Science onde conseguiu encaixar todos os pontos obrigatórios do projeto.
* Pontos como:
> _Receber os dados de consumo;
> Executar a análise;
> Retornar classificação, probabilidade e recomendações;
> Disponibilizar respostas em formato JSON;
> Implementar validações e tratamento de erros._

* O Backend Java desenvolvido com Spring Boot possui:
- endpoint público do MVP;
- validação dos dados recebidos;
- integração preparada para o serviço Python;
- cálculo financeiro no Backend;
- tratamento de erros;
- cadastro e login por sessão;
- persistência de usuários no MySQL;
- migrations de banco com Flyway;
- proteção CSRF nas operações de autenticação;
- testes automatizados.

* Ou seja, essa área determina a base do nosso projeto. Montamos toda a estrutura do nosso MVP dentro do backend com linguagem Java, onde cada integração, teste, resolução, cálculo e processo é muito bem feito.
* Fazendo com que, a API REST seja robusta e atenda às necessidades do cliente.

## 📈 Parte Data Science:
>_Como não existia um banco de dados específico contendo exatamente essas informações,
> foi necessário criar um dataset único que representasse situações reais de consumo energético._
 
* Nosso Data Science foi desenvolvido passando por 6 partes:
* Criação de dataset(consumo energético);
* Exploração dos dados (EDA);
* Engenharia de Atributos;
* Treinamento dos modelos;
* Avaliação;
* Criação de um código responsável apenas pela inferência.

* **Cumprimos as responsabilidades dessa área que são:**
* Classificar automaticamente o perfil energético do imóvel;
* Estimar a confiança da previsão realizada;
* Gerar recomendações personalizadas para redução do consumo;
*  Disponibilizar um endpoint HTTP para integração com o Backend.
>_Em resumo, a ideia central do projeto foi transformar os requisitos do hackathon em um
> conjunto consistente de variáveis, criar um dataset representativo para treinar um modelo de classificação,
> enriquecer os dados com engenharia de atributos, comparar diferentes algoritmos e, por fim,
> encapsular todo o processo de inferência no energia.py, permitindo que o backend apenas envie os dados do usuário
> e receba como resposta a categoria prevista, a probabilidade da classificação e recomendações de economia de energia._
***
## ☁️ Integração com OCI:
*  Como parte fundamental do projeto, fizemos o seguinte:
* Integramos nosso modelo treinado no serviço de Object Storage da OCI;
* Deixando o IntelliWatts mais forte e amplo.
***

## 😎 Parte Frontend:
* Nosso Frontend foi criado do zero. Revelamos o nosso trabalho de maneira acessível, diferente e exclusiva.
* Implementamos nessa parte justamente a interface onde o cliente se cadastra e se torna usuário do IntelliWatts,
  tendo com esse cadastro um acesso direto à tudo que foi desenvolvido.
* A partir do cadastro feito, nossa API Inteligente analisa o cenário em que a pessoa vive,
  sua categoria, sua probabilidade, custo e tempo, retornando recomendações sustentáveis fazendo
  com que o cliente se torne consciente do que tem feito e como tem usado a energia elétrica.
*** 
## 🕹️ Tecnologias Utilizadas:
* Java;
* Python;
* Spring Boot;
* Pandas;
* MySQL;
* FastAPI;
* Maven;
* Scikit-Learn;
* Docker;
* NumPy;
* Banco de dados;
* Joblib;
* Flyway - controlador de dados;
* Pydantic;
* Spring Security;
* Uvicorn;
* React;
* Vite;
* TypeScript;
* Random Forest.
***
## ⭐ Conexão entre as partes:
* Conectamos o Backend, o Data Sciense, a OCI e o Frontend de maneira leve e objetiva,
  resultando em uma API completa com todos os requisitos obrigatórios implementados.
***
## 👥 Equipe:
* Tem 4 pessoas por trás da nossa equipe GTech Solutions e criação do IntelliWatts:
* No desenvolvimento do Backend temos Mykael Salmar;
* No desenvolvimento do DataScience e Fronted temos Matheus Cunha;
* No desevolvimento e integração com a OCI temos Vivianne Ferreira;
* E na liderança e gestão de tudo temos Isis Senario. 
* Colaboraram para uma solução incrível.

# 💻 Conheça nosso projeto:
* Abra o link:
  https://intelliwatts.duckdns.org/

***
# 📜 Licença:
* Este projeto foi desenvolvido para fins acadêmicos e de inovação tecnológica,
  como parte do HACKATHON BRASIL 2026 realizado na plataforma da
  No Country em colaboração com Alura + Oracle dentro do programa ONE.

> **_Nosso principal objetivo com essa solução foi deixar a questão de gasto de energia
o mais clara possível, para que o usuário esteja sempre consciente._** 💯



