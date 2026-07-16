
import joblib
import pandas as pd

# ============================================
# Carrega o modelo treinado
# ============================================

modelo = joblib.load("modelo_energiAI.pkl")


# ============================================
# Prepara os dados para inferência
# ============================================

def preparar_dados(dados):

    df = pd.DataFrame([dados])
    df["uso_horario_pico_num"] = df["uso_horario_pico"].astype(int)

    # Engenharia de atributos
    df["consumo_por_equipamento"] = (
        df["consumo_kwh"] /
        df["quantidade_equipamentos"]
    )

    df["intensidade_consumo"] = (
        df["consumo_kwh"] /
        df["horas_alto_consumo"]
    )

    df["equipamentos_por_hora"] = (
        df["quantidade_equipamentos"] /
        df["horas_alto_consumo"]
    )


    return df


# ============================================
# Recomendações
# ============================================

def gerar_recomendacoes(dados, categoria):

    recomendacoes = []

    if categoria == "Ineficiente":

        recomendacoes.append(
            "Priorizar a redução do consumo em horários de pico."
        )

        recomendacoes.append(
            "Avaliar aparelhos com alto consumo energético."
        )

    elif categoria == "Moderado":

        recomendacoes.append(
            "Monitorar o consumo e redistribuir atividades ao longo do dia."
        )

    else:

        recomendacoes.append(
            "Manter os bons hábitos de consumo energético."
        )

    if dados["uso_horario_pico"]:

        recomendacoes.append(
            "Reduzir o uso de equipamentos durante horários de pico."
        )

    if dados["quantidade_equipamentos"] > 15:

        recomendacoes.append(
            "Verificar equipamentos que permanecem ligados sem necessidade."
        )

    return recomendacoes


# ============================================
# Motor de inferência
# ============================================

def analisar(dados):

    entrada = preparar_dados(dados)

    categoria = modelo.predict(entrada)[0]

    probabilidade = float(
        modelo.predict_proba(entrada).max()
    )

    return {

        "categoria": categoria,

        "probabilidade": round(probabilidade, 4),

        "recomendacoes": gerar_recomendacoes(
            dados,
            categoria
        )

    }
