"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, Share2, BookOpen } from "lucide-react";
import { mockBlogs } from "@/data/blogs";

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || "";

  const post = mockBlogs.find((b) => b.slug === slug) || mockBlogs[0];

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Return link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-burgundy dark:text-gold hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Articles</span>
      </Link>

      {/* Header */}
      <header className="space-y-4 border-b border-bmBorder dark:border-charcoal-border pb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-gold uppercase tracking-wider">
          <span>{post.category}</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-bmText-muted">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal dark:text-ivory leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-between text-xs text-bmText-secondary dark:text-bmText-darkSecondary pt-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-sand dark:bg-charcoal-muted flex items-center justify-center font-bold text-xs text-charcoal dark:text-ivory">
              {post.author[0]}
            </div>
            <div>
              <span className="font-bold text-charcoal dark:text-ivory block">
                {post.author}
              </span>
              <span className="text-[11px] text-bmText-muted">
                {post.authorRole} • {post.date}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Lead Excerpt */}
      <p className="text-base sm:text-lg font-serif italic text-charcoal dark:text-ivory leading-relaxed p-4 rounded-2xl bg-sand/30 dark:bg-charcoal-muted border-l-4 border-gold">
        "{post.excerpt}"
      </p>

      {/* Article Content Paragraphs */}
      <div className="space-y-6 text-sm sm:text-base text-bmText-secondary dark:text-bmText-darkSecondary leading-relaxed">
        {post.content.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>

      {/* Footnote & CTA */}
      <footer className="pt-10 mt-12 border-t border-bmBorder dark:border-charcoal-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <span className="text-bmText-muted">
          Published by Baniya Match Editorial Staff
        </span>
        <Link
          href="/onboarding"
          className="px-6 py-2.5 rounded-full bg-burgundy hover:bg-burgundy-dark text-white font-semibold shadow-subtle"
        >
          Begin Your Journey
        </Link>
      </footer>
    </article>
  );
}
