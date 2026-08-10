import {
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import { useDashboard } from "../../context";

import {
  NotificationContext,
  type NotificationContextType,
} from "./NotificationContext";

import type { NotificationItem } from "./notification.types";

const NOTIFICATIONS_KEY =
  "intelliwatts-notifications";

type NotificationAction =
  | {
      type: "SYNC_HISTORY";
      history: {
        id: string;
        createdAt: string;
      }[];
    }
  | {
      type: "MARK_AS_READ";
      id: string;
    }
  | {
      type: "MARK_ALL_AS_READ";
    };

function loadNotifications(): NotificationItem[] {
  try {
    const stored = localStorage.getItem(
      NOTIFICATIONS_KEY
    );

    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveNotifications(
  notifications: NotificationItem[]
) {
  localStorage.setItem(
    NOTIFICATIONS_KEY,
    JSON.stringify(notifications)
  );
}

function createNotificationsForAnalysis(
  analysis: {
    id: string;
    createdAt: string;
  }
): NotificationItem[] {
  return [
    {
      id: `${analysis.id}-analysis`,
      analysisId: analysis.id,
      type: "analysis",
      titleKey: "aiAlert",
      descriptionKey:
        "aiAlertDescription",
      read: false,
      createdAt: analysis.createdAt,
    },
    {
      id: `${analysis.id}-profile`,
      analysisId: analysis.id,
      type: "profile",
      titleKey: "consumptionAlert",
      descriptionKey:
        "consumptionAlertDescription",
      read: false,
      createdAt: analysis.createdAt,
    },
    {
      id: `${analysis.id}-recommendation`,
      analysisId: analysis.id,
      type: "recommendation",
      titleKey: "weeklyReport",
      descriptionKey:
        "weeklyReportDescription",
      read: false,
      createdAt: analysis.createdAt,
    },
  ];
}

function notificationReducer(
  current: NotificationItem[],
  action: NotificationAction
): NotificationItem[] {
  switch (action.type) {
    case "SYNC_HISTORY": {
      const historyIds = new Set(
        action.history.map(
          (item) => item.id
        )
      );

      const filtered = current.filter(
        (notification) =>
          historyIds.has(
            notification.analysisId
          )
      );

      const existingAnalysisIds =
        new Set(
          filtered.map(
            (notification) =>
              notification.analysisId
          )
        );

      const newNotifications: NotificationItem[] =
        [];

      action.history.forEach(
        (analysis) => {
          if (
            existingAnalysisIds.has(
              analysis.id
            )
          ) {
            return;
          }

          newNotifications.push(
            ...createNotificationsForAnalysis(
              analysis
            )
          );
        }
      );

      return [
        ...newNotifications,
        ...filtered,
      ];
    }

    case "MARK_AS_READ":
      return current.map(
        (notification) =>
          notification.id === action.id
            ? {
                ...notification,
                read: true,
              }
            : notification
      );

    case "MARK_ALL_AS_READ":
      return current.map(
        (notification) => ({
          ...notification,
          read: true,
        })
      );

    default:
      return current;
  }
}

export function NotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { history } = useDashboard();

  const [notifications, dispatch] =
    useReducer(
      notificationReducer,
      undefined,
      loadNotifications
    );

  /*
   * Sincroniza as notifica├º├Áes com o
   * hist├│rico de an├ílises.
   */
  useEffect(() => {
    dispatch({
      type: "SYNC_HISTORY",
      history: history.map((analysis) => ({
        id: analysis.id,
        createdAt: analysis.createdAt,
      })),
    });
  }, [history]);

  /*
   * Persiste as notifica├º├Áes no localStorage.
   */
  useEffect(() => {
    saveNotifications(notifications);
  }, [notifications]);

  function markAsRead(id: string) {
    dispatch({
      type: "MARK_AS_READ",
      id,
    });
  }

  function markAllAsRead() {
    dispatch({
      type: "MARK_ALL_AS_READ",
    });
  }

  const unreadCount = useMemo(
    () =>
      notifications.filter(
        (notification) =>
          !notification.read
      ).length,
    [notifications]
  );

  const contextValue: NotificationContextType =
    {
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
    };

  return (
    <NotificationContext.Provider
      value={contextValue}
    >
      {children}
    </NotificationContext.Provider>
  );
}
