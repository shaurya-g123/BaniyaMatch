"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, User } from "lucide-react";
import { mockBlogs } from "@/data/blogs";

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand dark:bg-charcoal-surface border border-bmBorder dark:border-charcoal-border text-xs font-semibold text-burgundy dark:text-gold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>The Baniya Match Journal</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal dark:text-ivory">
          Perspectives on Modern Marriage
        </h1>
        <p className="text-xs sm:text-sm text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
          Essays and practical field guides exploring relationships, career balance, family dialogue, and cultural identity.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockBlogs.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-white dark:bg-charcoal-surface rounded-3xl border border-bmBorder dark:border-charcoal-border p-6 shadow-subtle hover:shadow-card hover:border-gold/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[11px] text-bmText-muted">
                <span className="px-2.5 py-0.5 rounded-full bg-sand dark:bg-charcoal-muted text-gold font-semibold uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="font-serif text-xl font-bold text-charcoal dark:text-ivory group-hover:text-burgundy dark:group-hover:text-gold transition-colors leading-snug">
                {post.title}
              </h2>

              <p className="text-xs text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-bmBorder dark:border-charcoal-border flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-sand dark:bg-charcoal-muted flex items-center justify-center text-charcoal dark:text-ivory font-bold text-[10px]">
                  {post.author[0]}
                </div>
                <span className="text-charcoal dark:text-ivory font-medium">
                  {post.author}
                </span>
              </div>

              <span className="text-burgundy dark:text-gold font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>Read</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
