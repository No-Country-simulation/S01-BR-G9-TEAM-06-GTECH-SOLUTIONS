import {
  simulateAnalysis,
  type AnalysisInput,
} from "./analysisSimulator";

export async function analyzeConsumption(
  data: AnalysisInput
) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(simulateAnalysis(data));
    }, 1800);
  });
}