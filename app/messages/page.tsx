"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MessageSquare, Search, ShieldCheck, Users, ArrowLeft } from "lucide-react";
import { Conversation, MessageItem } from "@/lib/types";
import { getStoredConversations, saveStoredConversations } from "@/lib/mockStorage";
import { ChatWindow } from "@/components/chat/ChatWindow";

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string>("");
  const [searchQ, setSearchQ] = useState("");
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  useEffect(() => {
    const list = getStoredConversations();
    setConversations(list);
    if (list.length > 0 && !activeConvId) {
      setActiveConvId(list[0].id);
    }
  }, []);

  const activeConv = conversations.find((c) => c.id === activeConvId);

  const handleSendMessage = (newMsg: MessageItem) => {
    if (!activeConv) return;
    const updated = conversations.map((c) => {
      if (c.id === activeConv.id) {
        return {
          ...c,
          lastMessage: newMsg.text,
          lastMessageTime: newMsg.timestamp,
          messages: [...c.messages, newMsg],
        };
      }
      return c;
    });
    setConversations(updated);
    saveStoredConversations(updated);
  };

  const handleFamilyConnectActivated = () => {
    const list = getStoredConversations();
    setConversations(list);
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.participantName.toLowerCase().includes(searchQ.toLowerCase()) ||
      c.participantCity.toLowerCase().includes(searchQ.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-140px)] flex flex-col space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-bmBorder dark:border-charcoal-border">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal dark:text-ivory">
            Messages & Conversations
          </h1>
          <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary">
            Respectful direct dialogues with mutual interest matches.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 min-h-0">
        {/* Left Column: Conversations List */}
        <div
          className={`md:col-span-4 lg:col-span-4 bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border flex flex-col overflow-hidden shadow-subtle ${
            isMobileChatOpen ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Search Bar */}
          <div className="p-3 border-b border-bmBorder dark:border-charcoal-border bg-sand/30 dark:bg-charcoal-muted">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-bmText-muted" />
              <input
                type="text"
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-9 pr-3 py-2 rounded-full text-xs bg-white dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border focus:outline-none focus:border-burgundy text-charcoal dark:text-ivory"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto divide-y divide-bmBorder/60 dark:divide-charcoal-border/60">
            {filteredConversations.map((conv) => {
              const isSelected = conv.id === activeConvId;
              return (
                <button
                  key={conv.id}
                  onClick={() => {
                    setActiveConvId(conv.id);
                    setIsMobileChatOpen(true);
                  }}
                  className={`w-full p-4 text-left flex items-start gap-3 transition-colors ${
                    isSelected
                      ? "bg-sand/60 dark:bg-charcoal-muted border-l-4 border-burgundy dark:border-gold"
                      : "hover:bg-sand/30 dark:hover:bg-charcoal-muted/40"
                  }`}
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-sand shrink-0 border border-bmBorder dark:border-charcoal-border">
                    <Image
                      src={conv.participantAvatar}
                      alt={conv.participantName}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-1">
                      <span className="font-serif font-bold text-sm text-charcoal dark:text-ivory truncate">
                        {conv.participantName}
                      </span>
                      <span className="text-[10px] text-bmText-muted shrink-0">
                        {conv.lastMessageTime}
                      </span>
                    </div>

                    <div className="text-[11px] text-bmText-secondary dark:text-bmText-darkSecondary truncate">
                      {conv.participantProfession} • {conv.participantCity}
                    </div>

                    <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary truncate mt-1">
                      {conv.lastMessage}
                    </p>

                    {conv.isFamilyConnected && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-gold font-medium mt-1">
                        <Users className="w-3 h-3" /> Family Connected
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Chat Window */}
        <div
          className={`md:col-span-8 lg:col-span-8 h-full flex flex-col ${
            !isMobileChatOpen ? "hidden md:flex" : "flex"
          }`}
        >
          {isMobileChatOpen && (
            <button
              onClick={() => setIsMobileChatOpen(false)}
              className="md:hidden flex items-center gap-1.5 text-xs text-burgundy dark:text-gold mb-2 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Conversations</span>
            </button>
          )}

          {activeConv ? (
            <ChatWindow
              conversation={activeConv}
              onSendMessage={handleSendMessage}
              onFamilyConnectActivated={handleFamilyConnectActivated}
            />
          ) : (
            <div className="h-full bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border p-12 text-center flex flex-col items-center justify-center space-y-3">
              <MessageSquare className="w-10 h-10 text-gold" />
              <h3 className="font-serif text-lg font-bold text-charcoal dark:text-ivory">
                Select a conversation
              </h3>
              <p className="text-xs text-bmText-secondary max-w-sm">
                Connect directly with accepted matches or participate in respectful family discussions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
