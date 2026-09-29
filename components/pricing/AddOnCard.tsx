"use client";

import React, { useState } from "react";
import { Zap, Check, Sparkles } from "lucide-react";
import { AddOnItem, paymentService } from "@/lib/services/paymentService";

interface AddOnCardProps {
  item: AddOnItem;
  onPurchased?: (item: AddOnItem) => void;
}

export const AddOnCard: React.FC<AddOnCardProps> = ({ item, onPurchased }) => {
  const [loading, setLoading] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    await paymentService.simulatePurchase(item.id, item.price);
    setLoading(false);
    setPurchased(true);
    if (onPurchased) onPurchased(item);
    setTimeout(() => setPurchased(false), 3500);
  };

  return (
    <div className="bg-white dark:bg-charcoal-surface rounded-2xl border border-bmBorder dark:border-charcoal-border p-5 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <span className="font-serif text-lg font-bold text-charcoal dark:text-ivory">
            {item.name}
          </span>
          {item.duration && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-sand dark:bg-charcoal-muted text-bmText-secondary font-medium">
              {item.duration}
            </span>
          )}
        </div>
        <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary mt-2 leading-relaxed">
          {item.description}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-bmBorder dark:border-charcoal-border flex items-center justify-between">
        <div className="font-serif text-xl font-bold text-burgundy dark:text-gold">
          ₹{item.price}
        </div>

        <button
          onClick={handleBuy}
          disabled={loading || purchased}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
            purchased
              ? "bg-sage-soft text-bmSuccess border border-sage/30"
              : "bg-sand dark:bg-charcoal-muted hover:bg-burgundy hover:text-white dark:hover:bg-gold dark:hover:text-charcoal text-charcoal dark:text-ivory"
          }`}
        >
          {loading ? (
            "Processing..."
          ) : purchased ? (
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Added
            </span>
          ) : (
            "Activate"
          )}
        </button>
      </div>
    </div>
  );
};
