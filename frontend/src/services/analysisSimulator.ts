export type AnalysisInput = {
  consumo_kwh: number;
  quantidade_equipamentos: number;
  tipo_imovel: "Casa" | "Apartamento" | "Comercial";
  horas_alto_consumo: number;
  uso_horario_pico: boolean;
};

export type AnalysisResult = {
  consumoAtual: string;
  perfil: "Eficiente" | "Moderado" | "Ineficiente";
  custoEstimadoMensal: number;
  precisao: string;
  mensagem: string;
  recomendacoes: string[];
};

export function simulateAnalysis(
  data: AnalysisInput
): AnalysisResult {

  let score = 0;

  // Consumo
  if (data.consumo_kwh > 600) score += 4;
  else if (data.consumo_kwh > 300) score += 2;

  // Equipamentos
  if (data.quantidade_equipamentos > 15) score += 2;
  else if (data.quantidade_equipamentos > 8) score += 1;

  // Horas de alto consumo
  if (data.horas_alto_consumo > 8) score += 2;
  else if (data.horas_alto_consumo > 5) score += 1;

  // Horário de pico
  if (data.uso_horario_pico) score += 2;

  let perfil: AnalysisResult["perfil"];
  let custoEstimadoMensal: number;
  let precisao: string;
  let mensagem: string;
  let recomendacoes: string[];

  if (score <= 3) {
    perfil = "Eficiente";
    custoEstimadoMensal = 90;
    precisao = "99,4%";
    mensagem =
      "Parabéns! Seu consumo está dentro do esperado.";

    recomendacoes = [
      "Continue monitorando seu consumo.",
      "Mantenha o uso consciente.",
      "Considere acompanhar sua evolução mensal."
    ];
  }

  else if (score <= 7) {
    perfil = "Moderado";
    custoEstimadoMensal = 315;
    precisao = "98,5%";
    mensagem =
      "Há oportunidades de economia. Confira as recomendações.";

    recomendacoes = [
      "Evite utilizar equipamentos simultaneamente.",
      "Reduza o consumo no horário de pico.",
      "Troque lâmpadas por LED."
    ];
  }

  else {
    perfil = "Ineficiente";
    custoEstimadoMensal = 620;
    precisao = "97,8%";
    mensagem =
      "Seu consumo está acima do ideal. Recomendamos atenção aos horários de pico.";

    recomendacoes = [
      "Revise equipamentos antigos.",
      "Redistribua o consumo ao longo do dia.",
      "Considere um diagnóstico energético."
    ];
  }

  return {
    consumoAtual: `${data.consumo_kwh} kWh`,
    perfil,
    custoEstimadoMensal,
    precisao,
    mensagem,
    recomendacoes,
  };
}