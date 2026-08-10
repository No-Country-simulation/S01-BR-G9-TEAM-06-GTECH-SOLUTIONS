import { HistoryTimeline } from "./history/HistoryTimeline";

type Props = {
  limit?: number;

  search?: string;

  filter?: "Todos" | "Eficiente" | "Moderado" | "Ineficiente";
};

export function HistoryTable({
  limit,
  search,
  filter,
}: Props) {
  return (
    <HistoryTimeline
      limit={limit}
      search={search}
      filter={filter}
    />
  );
}