import { createContext } from "react";

import type { NotificationItem } from "./notification.types";

export type NotificationContextType = {
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
};

export const NotificationContext =
  createContext<NotificationContextType | null>(null);
