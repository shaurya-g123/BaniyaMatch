"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Send,
  Mic,
  Video,
  Phone,
  Users,
  Smile,
  ShieldCheck,
  Sparkles,
  Paperclip,
  CheckCheck,
  Info
} from "lucide-react";
import { Conversation, MessageItem } from "@/lib/types";
import { messageService } from "@/lib/services/messageService";
import { VideoCallModal } from "./VideoCallModal";

interface ChatWindowProps {
  conversation: Conversation;
  onSendMessage: (newMsg: MessageItem) => void;
  onFamilyConnectActivated: () => void;
}

const ICEBREAKERS = [
  "What is your favorite weekend ritual when you are not working?",
  "How does your family usually celebrate Diwali or Rakhi?",
  "Are you more of a spontaneous road-tripper or a planned traveler?",
  "What is a book or podcast that recently shifted your perspective?"
];

export const ChatWindow: React.FC<ChatWindowProps> = ({
  conversation,
  onSendMessage,
  onFamilyConnectActivated,
}) => {
  const [inputText, setInputText] = useState("");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const sent = await messageService.sendMessage(conversation.id, inputText.trim(), false);
    onSendMessage(sent);
    setInputText("");
  };

  const handleSendVoiceNote = async () => {
    setIsVoiceRecording(false);
    const sent = await messageService.sendMessage(
      conversation.id,
      "Voice message (0:24) - Shared thoughts on family travel",
      false
    );
    onSendMessage(sent);
  };

  const handleTriggerFamilyConnect = async () => {
    await messageService.requestFamilyConnect(conversation.id);
    onFamilyConnectActivated();
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border overflow-hidden shadow-subtle">
      {/* Chat Header */}
      <div className="p-4 border-b border-bmBorder dark:border-charcoal-border flex items-center justify-between bg-sand/30 dark:bg-charcoal-muted">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full overflow-hidden bg-sand shrink-0 border border-bmBorder dark:border-charcoal-border">
            <Image
              src={conversation.participantAvatar}
              alt={conversation.participantName}
              fill
              className="object-cover object-top"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <Link
                href={`/profile/${conversation.participantId}`}
                className="font-serif text-base font-bold text-charcoal dark:text-ivory hover:text-burgundy dark:hover:text-gold transition-colors"
              >
                {conversation.participantName}
              </Link>
              <span title="Verified Member">
                <ShieldCheck className="w-4 h-4 text-bmSuccess" />
              </span>
            </div>
            <div className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary">
              {conversation.participantProfession} • {conversation.participantCity}
            </div>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          {conversation.isFamilyConnected ? (
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gold/15 text-charcoal dark:text-gold border border-gold/30">
              <Users className="w-3.5 h-3.5" />
              Family Connected
            </span>
          ) : (
            <button
              onClick={handleTriggerFamilyConnect}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-burgundy/10 text-burgundy dark:text-gold hover:bg-burgundy/20 transition-colors"
            >
              <Users className="w-3.5 h-3.5" />
              Request Family Connect
            </button>
          )}

          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="p-2 rounded-full border border-bmBorder dark:border-charcoal-border hover:bg-sand dark:hover:bg-charcoal text-bmText-secondary dark:text-bmText-darkSecondary hover:text-burgundy transition-colors"
            title="Start Private Video Introduction"
          >
            <Video className="w-4 h-4" />
          </button>

          <Link
            href={`/profile/${conversation.participantId}`}
            className="p-2 rounded-full border border-bmBorder dark:border-charcoal-border hover:bg-sand dark:hover:bg-charcoal text-bmText-secondary dark:text-bmText-darkSecondary hover:text-burgundy transition-colors"
            title="View Full Profile"
          >
            <Info className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-ivory/40 dark:bg-charcoal-surface">
        {/* Safe Conversation Notice */}
        <div className="text-center my-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] bg-sand dark:bg-charcoal-muted text-bmText-secondary dark:text-bmText-darkSecondary border border-bmBorder/60 dark:border-charcoal-border/60">
            <ShieldCheck className="w-3 h-3 text-bmSuccess" />
            <span>End-to-end encrypted • Keep personal contact numbers secure</span>
          </div>
        </div>

        {/* Messages List */}
        {conversation.messages.map((msg) => {
          const isMe = msg.senderId === "current-user";
          const isFamily = msg.isFamilyMessage;

          if (isFamily) {
            return (
              <div key={msg.id} className="flex justify-center my-3">
                <div className="max-w-md p-3 rounded-xl bg-gold/10 dark:bg-charcoal-muted border border-gold/30 text-center text-xs text-charcoal dark:text-ivory space-y-1">
                  <div className="flex items-center justify-center gap-1.5 font-semibold text-burgundy dark:text-gold">
                    <Users className="w-3.5 h-3.5" />
                    <span>{msg.senderName}</span>
                  </div>
                  <p className="leading-relaxed">{msg.text}</p>
                  <span className="text-[10px] text-bmText-muted block">{msg.timestamp}</span>
                </div>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-md sm:max-w-lg p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                  isMe
                    ? "bg-burgundy text-white rounded-br-xs"
                    : "bg-white dark:bg-charcoal-muted text-charcoal dark:text-ivory border border-bmBorder dark:border-charcoal-border rounded-bl-xs"
                }`}
              >
                <p>{msg.text}</p>
                <div
                  className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                    isMe ? "text-white/70" : "text-bmText-muted"
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {isMe && <CheckCheck className="w-3 h-3" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Icebreaker Suggestions */}
      <div className="px-4 py-2 bg-sand/20 dark:bg-charcoal-muted border-t border-bmBorder dark:border-charcoal-border">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="shrink-0 flex items-center gap-1 text-[11px] font-semibold text-gold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> Prompts:
          </span>
          {ICEBREAKERS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => setInputText(prompt)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border text-bmText-secondary dark:text-bmText-darkSecondary hover:border-gold hover:text-charcoal dark:hover:text-ivory text-xs transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Message Input Bar */}
      <div className="p-3 bg-white dark:bg-charcoal-surface border-t border-bmBorder dark:border-charcoal-border">
        {isVoiceRecording ? (
          <div className="flex items-center justify-between p-2 rounded-full bg-burgundy/10 border border-burgundy/30 text-burgundy dark:text-gold text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-burgundy animate-ping" />
              <span className="font-semibold">Recording voice note... (0:24)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsVoiceRecording(false)}
                className="text-bmText-secondary hover:underline px-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSendVoiceNote}
                className="px-3 py-1 rounded-full bg-burgundy text-white font-medium"
              >
                Send Audio
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsVoiceRecording(true)}
              className="p-2.5 rounded-full text-bmText-secondary dark:text-bmText-darkSecondary hover:bg-sand dark:hover:bg-charcoal hover:text-burgundy transition-colors"
              title="Record Voice Note"
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a respectful message..."
              className="flex-1 px-4 py-2.5 rounded-full bg-sand/40 dark:bg-charcoal-muted border border-bmBorder dark:border-charcoal-border text-sm text-charcoal dark:text-ivory focus:outline-none focus:border-burgundy dark:focus:border-gold transition-colors"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-full bg-burgundy hover:bg-burgundy-dark disabled:opacity-40 text-white shadow-subtle transition-all active:scale-95"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

      {/* Video Call Modal */}
      {isVideoModalOpen && (
        <VideoCallModal
          participantName={conversation.participantName}
          participantAvatar={conversation.participantAvatar}
          onClose={() => setIsVideoModalOpen(false)}
        />
      )}
    </div>
  );
};
