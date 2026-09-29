import { Conversation, MessageItem } from "@/lib/types";
import { getStoredConversations, saveStoredConversations } from "@/lib/mockStorage";

// TODO: Connect to backend WebSockets / WebRTC infrastructure
export const messageService = {
  async getConversations(): Promise<Conversation[]> {
    return Promise.resolve(getStoredConversations());
  },

  async getConversationById(id: string): Promise<Conversation | null> {
    const list = getStoredConversations();
    const found = list.find((c) => c.id === id);
    return Promise.resolve(found || null);
  },

  async sendMessage(conversationId: string, text: string, isFamilyMessage: boolean = false): Promise<MessageItem> {
    const list = getStoredConversations();
    const convIndex = list.findIndex((c) => c.id === conversationId);
    
    const newMsg: MessageItem = {
      id: `m-${Date.now()}`,
      senderId: "current-user",
      senderName: "Riya",
      text,
      timestamp: "Just now",
      isFamilyMessage
    };

    if (convIndex >= 0) {
      list[convIndex].messages.push(newMsg);
      list[convIndex].lastMessage = text;
      list[convIndex].lastMessageTime = "Just now";
      saveStoredConversations(list);
    }

    return Promise.resolve(newMsg);
  },

  async requestFamilyConnect(conversationId: string): Promise<void> {
    const list = getStoredConversations();
    const convIndex = list.findIndex((c) => c.id === conversationId);
    if (convIndex >= 0) {
      list[convIndex].isFamilyConnected = true;
      list[convIndex].messages.push({
        id: `m-fam-${Date.now()}`,
        senderId: "system",
        senderName: "Family Connect Bot",
        text: "Family Connect has been activated. Parents are now invited to join respectful conversations.",
        timestamp: "Just now",
        isFamilyMessage: true
      });
      saveStoredConversations(list);
    }
  }
};
