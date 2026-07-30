
from fastapi import FastAPI
from pydantic import BaseModel

from .energia_engine import analisar

app = FastAPI(
    title="IntelliWatts API",
    version="1.0.0",
    description="API de Inferência do Projeto EnergiAI do Hackaton"
)


class EntradaEnergia(BaseModel):

    consumo_kwh: float

    uso_horario_pico: bool

    quantidade_equipamentos: int

    tipo_imovel: str

    horas_alto_consumo: int


@app.get("/")
def home():

    return {

        "mensagem": "IntelliWatts API Online"

    }


@app.post("/v1/inferencias")
def inferencia(dados: EntradaEnergia):

    resultado = analisar(

        dados.model_dump()

    )

    return resultado
