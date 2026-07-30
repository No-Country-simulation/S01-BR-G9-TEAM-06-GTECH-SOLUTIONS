export type TipoImovel =
  | "Casa"
  | "Apartamento"
  | "Comércio";

export type CategoriaAnalise =
  | "Eficiente"
  | "Moderado"
  | "Ineficiente";

export type AnaliseEnergeticaRequest = {
  consumo_kwh: number;
  uso_horario_pico: boolean;
  quantidade_equipamentos: number;
  tipo_imovel: TipoImovel;
  horas_alto_consumo: number;
};

export type AnaliseEnergeticaResponse = {
  categoria: CategoriaAnalise;
  probabilidade: number;
  recomendacoes: string[];
  custo_estimado_mensal: number;
};

export type ApiErrorResponse = {
  timestamp: string;
  status: number;
  codigo: string;
  mensagem: string;
  caminho: string;
  erros: Record<string, string>;
};