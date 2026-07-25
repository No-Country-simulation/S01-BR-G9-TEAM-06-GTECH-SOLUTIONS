import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type { HistoryItem } from "../context/DashboardContext";
import { generateAnalytics } from "./analyticsService";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportToPDF(history: HistoryItem[]) {

  const analytics = generateAnalytics(history);

  const doc = new jsPDF();

  //---------------------------------

  // Cabeçalho

  //---------------------------------

  doc.setFillColor(250, 204, 21);

  doc.rect(0, 0, 210, 30, "F");

  doc.setTextColor(0);

  doc.setFontSize(22);

  doc.text("IntelliWatts", 14, 15);

  doc.setFontSize(10);

  doc.text(
    "Sistema Inteligente de Monitoramento Energético",
    14,
    23
  );

  //---------------------------------

  // Título

  //---------------------------------

  doc.setFontSize(18);

  doc.text("Relatório de Consumo Energético", 14, 42);

  doc.setFontSize(11);

  doc.text(
    `Emitido em: ${new Date().toLocaleDateString("pt-BR")}`,
    14,
    50
  );

  //---------------------------------

  // Resumo

  //---------------------------------

  doc.setFontSize(15);

  doc.text("Resumo", 14, 65);

  doc.setFontSize(11);

  doc.text(
    `Total de análises: ${analytics.totalAnalises}`,
    14,
    74
  );

  doc.text(
    `Consumo médio: ${analytics.consumoMedio.toFixed(0)} kWh`,
    14,
    82
  );

  doc.text(
    `Perfil predominante: ${analytics.perfilPredominante}`,
    14,
    90
  );

  doc.text(
    `Economia estimada: R$ ${analytics.economiaTotal}`,
    14,
    98
  );

  //---------------------------------

  // Insights

  //---------------------------------

  doc.setFontSize(15);

  doc.text("Insights da IA", 14, 114);

  doc.setFontSize(11);

  let y = 123;

  analytics.insights.forEach((insight) => {

    doc.text(`• ${insight}`, 18, y);

    y += 8;

  });

  //---------------------------------

  // Tabela

  //---------------------------------

  autoTable(doc, {

    startY: y + 10,

    head: [["Data", "Categoria", "Consumo"]],

    body: history.map(item => [

      item.data,

      item.categoria,

      item.consumo

    ])

  });

  //---------------------------------

  // Rodapé

  //---------------------------------

  const pageHeight = doc.internal.pageSize.height;

  doc.setFontSize(9);

  doc.setTextColor(120);

  doc.text(
    "Relatório gerado automaticamente pelo IntelliWatts",
    14,
    pageHeight - 10
  );

  doc.save("Relatorio_IntelliWatts.pdf");

}

export function exportToExcel(history: HistoryItem[]) {

  const data = history.map((item) => ({
    Data: item.data,
    Categoria: item.categoria,
    Consumo: item.consumo,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Histórico"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob(
    [excelBuffer],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }
  );

  saveAs(file, "Relatorio_IntelliWatts.xlsx");
}


