import { NotificationItem } from "@/lib/types";
import { getStoredNotifications, saveStoredNotifications } from "@/lib/mockStorage";

// TODO: Connect to backend notification service / WebPush / Firebase Cloud Messaging
export const notificationService = {
  async getNotifications(): Promise<NotificationItem[]> {
    return Promise.resolve(getStoredNotifications());
  },

  async markAsRead(id: string): Promise<void> {
    const list = getStoredNotifications();
    const item = list.find((n) => n.id === id);
    if (item) {
      item.read = true;
      saveStoredNotifications(list);
    }
  },

  async markAllAsRead(): Promise<void> {
    const list = getStoredNotifications().map((n) => ({ ...n, read: true }));
    saveStoredNotifications(list);
  }
};
