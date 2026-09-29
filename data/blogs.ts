export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  date: string;
  author: string;
  authorRole: string;
  content: string[];
}

export const mockBlogs: BlogPost[] = [
  {
    slug: "modern-arranged-marriage-what-has-changed",
    title: "Modern Arranged Marriage: What Has Changed?",
    excerpt: "From biodatas to meaningful compatibility: how modern Baniya professionals and their families are redefining the journey of finding a life partner.",
    readTime: "5 min read",
    category: "Perspectives",
    date: "February 14, 2026",
    author: "Shubha Bansal",
    authorRole: "Relationship Anthropologist",
    content: [
      "Arranged marriage in India has never been static. Over the past decade, especially within the entrepreneurial and educated Baniya community, the dynamics have fundamentally shifted from family-dictated decisions to collaborative family partnerships.",
      "Young professionals today are unapologetic about their professional ambitions, dietary lifestyle, and emotional independence. Yet, contrary to the belief that youth want to discard tradition, our community observations show that most young people still deeply cherish family blessings and cultural kinship.",
      "The change is in the methodology: instead of hurried 20-minute tea meetings, couples now expect months of candid courtship, discussions around financial values, and alignment on how both partners will grow."
    ]
  },
  {
    slug: "how-to-build-a-matrimonial-profile-that-feels-like-you",
    title: "How to Build a Matrimonial Profile That Feels Like You",
    excerpt: "Tips on writing a bio that reflects your genuine voice, values, and humor without sounding like a generic corporate resume.",
    readTime: "4 min read",
    category: "Guides",
    date: "January 28, 2026",
    author: "Nikhil Goyal",
    authorRole: "Senior Editor, Baniya Match",
    content: [
      "Too many matrimonial profiles sound like either a LinkedIn resume or a 1990s biodata. When your profile reads 'Simple boy working in MNC, looking for homely girl', you are hiding everything that makes you unique.",
      "Instead, talk about what a typical Sunday looks like. Mention whether you prefer slow morning filter coffee or an early morning 10k run. Be explicit about your food preferences (pure vegetarian, Jain, or open to dining out).",
      "When discussing family, focus on your family culture rather than just titles. Are you a boisterous joint family that gathers every weekend, or a close-knit nuclear family that values quiet holidays? Honesty here saves months of misaligned expectations."
    ]
  },
  {
    slug: "talking-about-career-expectations-before-marriage",
    title: "Talking About Career Expectations Before Marriage",
    excerpt: "How ambitious couples in finance, technology, and family businesses can align on career relocations, long hours, and mutual ambitions early on.",
    readTime: "6 min read",
    category: "Relationship & Life",
    date: "January 15, 2026",
    author: "Pooja Singhal, CA",
    authorRole: "Career & Life Advisor",
    content: [
      "Career conversations should never be an afterthought. In business families and dual-income homes, understanding each other's work rhythm is foundational.",
      "Ask open-ended questions: If an international relocation opportunity arises in three years, how will we evaluate it? If one of us is scaling a startup or taking over family operations, how will we manage household responsibilities?",
      "When both partners feel heard and supported in their individual ambitions, marital harmony strengthens exponentially."
    ]
  },
  {
    slug: "nri-marriage-questions-families-should-discuss",
    title: "NRI Marriage: Questions Families Should Discuss",
    excerpt: "Bridging geographical and cultural nuances when one partner lives in London, Dubai, or New York and the other in India.",
    readTime: "5 min read",
    category: "NRI Corner",
    date: "December 22, 2025",
    author: "Rohan Agarwal",
    authorRole: "Cross-Border Community Specialist",
    content: [
      "Cross-border alliances bring incredible opportunities but also distinct practical considerations. Visa timelines, license transfers for doctors or lawyers, and proximity to aging parents in India require thoughtful dialogue.",
      "Couples who succeed in NRI marriages discuss family visits frequency, cultural celebrations abroad, and their 5-to-10 year location outlook before formalizing their engagement.",
      "Platforms like Baniya Match help bridge this by enabling family accounts where parents can talk openly while candidates build direct rapport."
    ]
  },
  {
    slug: "how-family-involvement-can-make-matchmaking-easier",
    title: "How Family Involvement Can Make Matchmaking Easier",
    excerpt: "Why the right kind of family participation reduces anxiety, ensures transparency, and creates a supportive environment for modern marriage.",
    readTime: "4 min read",
    category: "Family & Culture",
    date: "December 08, 2025",
    author: "Meenakshi Khandelwal",
    authorRole: "Family Mediator & Counselor",
    content: [
      "Dating app fatigue is real. Many young professionals find endless swiping without context exhausting. In contrast, when family is respectfully involved, background verification and long-term intentions are established upfront.",
      "The secret is maintaining clear boundaries: parents help evaluate structural alignment, while the candidate holds final consent over emotional and interpersonal connection.",
      "When done respectfully, family involvement is not an obstacle, it is the greatest support system a new couple can have."
    ]
  }
];
