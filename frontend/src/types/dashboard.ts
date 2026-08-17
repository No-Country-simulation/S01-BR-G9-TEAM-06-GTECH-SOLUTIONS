export interface DashboardData {
  consumoAtual: string;
  perfil: string;
  custoEstimadoMensal: number;
  precisao: string;
}

export interface WeeklyConsumption {
  day: string;
  consumo: number;
}