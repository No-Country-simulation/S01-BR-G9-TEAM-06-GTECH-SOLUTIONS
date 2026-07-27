import type { DashboardData } from "../context/dashboard-context";
import type {
    AnaliseEnergeticaRequest,
    AnaliseEnergeticaResponse,
    CategoriaAnalise,
} from "../types/analysis";

const currencyFormatter = new Intl.NumberFormat(
    "pt-BR",
    {
        style: "currency",
        currency: "BRL",
    },
);

const percentageFormatter = new Intl.NumberFormat(
    "pt-BR",
    {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    },
);

const consumptionFormatter = new Intl.NumberFormat(
    "pt-BR",{
        maximumFractionDigits: 3,
    }
)

const mensages: Record<CategoriaAnalise, string> = {
    Eficiente:
    "Seu perfil apresenta boas práticas de consumo energético.",
    Moderado:
    "Existem oportunidades para melhorar seu consumo energético.",
    Ineficiente:
    "Seu consumo requer atenção e pode ser melhorado com as recomendações.",
};

export function mapAnalysisToDashboard(
    request: AnaliseEnergeticaRequest,
    response: AnaliseEnergeticaResponse,
): DashboardData {
    return {
        consumoAtual:
        `${consumptionFormatter.format(request.consumo_kwh)} kWh`,
        perfil: response.categoria,
        economia: currencyFormatter.format(
            response.custo_estimado_mensal,
        ),
        precisao: percentageFormatter.format(
            response.probabilidade,
        ),
        mensagem: mensages[response.categoria],
        recomendacoes: response.recomendacoes
    };
}