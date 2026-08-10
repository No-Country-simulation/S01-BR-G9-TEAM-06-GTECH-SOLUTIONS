export type NotificationItem = {
  id: string;
  analysisId: string;
  type:
    | "analysis"
    | "profile"
    | "recommendation";

  titleKey:
    | "aiAlert"
    | "consumptionAlert"
    | "weeklyReport";

  descriptionKey:
    | "aiAlertDescription"
    | "consumptionAlertDescription"
    | "weeklyReportDescription";

  read: boolean;
  createdAt: string;
};
