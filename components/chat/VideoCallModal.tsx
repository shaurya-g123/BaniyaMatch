"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mic, MicOff, Video, VideoOff, PhoneOff, ShieldCheck, Users } from "lucide-react";

interface VideoCallModalProps {
  participantName: string;
  participantAvatar: string;
  onClose: () => void;
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({
  participantName,
  participantAvatar,
  onClose,
}) => {
  const [micMuted, setMicMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl h-[70vh] bg-charcoal-surface rounded-3xl border border-charcoal-border overflow-hidden flex flex-col shadow-elevated">
        {/* Remote participant main frame */}
        <div className="relative flex-1 bg-charcoal flex items-center justify-center overflow-hidden">
          <Image
            src={participantAvatar}
            alt={participantName}
            fill
            className="object-cover opacity-90 blur-xs"
          />
          <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-xs" />

          {/* Centered avatar lockup */}
          <div className="relative z-10 flex flex-col items-center space-y-3">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gold shadow-card">
              <Image
                src={participantAvatar}
                alt={participantName}
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="text-center">
              <h4 className="font-serif text-xl font-bold text-white">
                {participantName}
              </h4>
              <p className="text-xs text-gold flex items-center justify-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Private Introduction (Encrypted)
              </p>
            </div>
          </div>

          {/* Small self-view overlay in corner */}
          <div className="absolute bottom-6 right-6 w-32 h-44 rounded-2xl bg-charcoal-muted border border-charcoal-border overflow-hidden shadow-card flex items-center justify-center">
            {camOff ? (
              <span className="text-xs text-bmText-darkSecondary">Camera Off</span>
            ) : (
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                alt="You"
                fill
                className="object-cover"
              />
            )}
            <span className="absolute bottom-2 left-2 text-[10px] text-white/80 bg-charcoal/60 px-2 py-0.5 rounded-md">
              You
            </span>
          </div>
        </div>

        {/* Bottom Call Controls */}
        <div className="p-4 bg-charcoal border-t border-charcoal-border flex items-center justify-between px-8">
          <div className="flex items-center gap-2 text-xs text-bmText-darkSecondary">
            <span className="w-2.5 h-2.5 rounded-full bg-bmSuccess animate-pulse" />
            <span>Connected: 04:12</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setMicMuted(!micMuted)}
              className={`p-3 rounded-full transition-colors ${
                micMuted ? "bg-bmError text-white" : "bg-charcoal-muted hover:bg-charcoal-border text-white"
              }`}
              title={micMuted ? "Unmute" : "Mute"}
            >
              {micMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setCamOff(!camOff)}
              className={`p-3 rounded-full transition-colors ${
                camOff ? "bg-bmError text-white" : "bg-charcoal-muted hover:bg-charcoal-border text-white"
              }`}
              title={camOff ? "Turn Video On" : "Turn Video Off"}
            >
              {camOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </button>

            <button
              onClick={onClose}
              className="p-3 rounded-full bg-bmError hover:bg-red-700 text-white transition-all shadow-card"
              title="End Call"
            >
              <PhoneOff className="w-5 h-5" />
            </button>
          </div>

          <div className="text-xs text-bmText-darkSecondary hidden sm:block">
            Family Connect Mode
          </div>
        </div>
      </div>
    </div>
  );
};
