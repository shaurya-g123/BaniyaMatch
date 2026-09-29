const fs = require('fs');
const path = require('path');

// Curated high-end, cosmopolitan, polished North Indian portraits with sleek international styling
const femalePhotos = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
];

const malePhotos = [
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=800&q=80"
];

// All 18 authentic traditional Gotras specified by the user
const ALL_18_GOTRAS = [
  "Garg (Gargeya)",
  "Goyal (Goel)",
  "Goyan",
  "Bansal",
  "Kansal",
  "Singhal",
  "Mangal",
  "Jindal",
  "Tingal",
  "Aeron (Airan)",
  "Dharan",
  "Madhukul",
  "Mittal",
  "Tayal",
  "Bhandal",
  "Kuchhal",
  "Nagal",
  "Bindal"
];

// Diverse North Indian Baniya Surnames mapped to community lineages
const BANIYA_SURNAMES_MAP = [
  { surname: "Agarwal", community: "Agarwal" },
  { surname: "Goel", community: "Agarwal" },
  { surname: "Goyal", community: "Agarwal" },
  { surname: "Bansal", community: "Bansal" },
  { surname: "Mittal", community: "Mittal" },
  { surname: "Singhal", community: "Singhal" },
  { surname: "Jindal", community: "Jindal" },
  { surname: "Kansal", community: "Agarwal" },
  { surname: "Garg", community: "Agarwal" },
  { surname: "Tayal", community: "Tayal" },
  { surname: "Mangal", community: "Agarwal" },
  { surname: "Airan", community: "Agarwal" },
  { surname: "Bindal", community: "Agarwal" },
  { surname: "Kuchhal", community: "Agarwal" },
  { surname: "Nagal", community: "Agarwal" },
  { surname: "Bhandal", community: "Agarwal" },
  { surname: "Tingal", community: "Maheshwari" },
  { surname: "Dharan", community: "Maheshwari" },
  { surname: "Khandelwal", community: "Khandelwal" },
  { surname: "Maheshwari", community: "Maheshwari" },
  { surname: "Oswal", community: "Oswal" },
  { surname: "Gupta", community: "Gupta" },
  { surname: "Porwal", community: "Porwal" },
  { surname: "Rastogi", community: "Rastogi" },
  { surname: "Lodha", community: "Lodha" },
  { surname: "Mahajan", community: "Mahajan" },
  { surname: "Jain", community: "Jain Baniya" }
];

const femaleFirstNames = [
  "Riya", "Ananya", "Meera", "Ishita", "Sanya", "Tanvi", "Tara", "Aarohi", "Aditi", "Avani",
  "Bhavna", "Charu", "Devanshi", "Disha", "Garima", "Isha", "Kavya", "Khushi", "Lavanya", "Muskan",
  "Navya", "Nehal", "Nidhi", "Palak", "Prachi", "Radhika", "Rashi", "Ritika", "Saloni", "Saumya",
  "Shikha", "Shivani", "Shreya", "Simran", "Sneha", "Sonakshi", "Swati", "Tanya", "Urvi", "Vanshika",
  "Vidhi", "Vrinda", "Yashvi", "Akanksha", "Chhavi", "Divya", "Juhi", "Kritika", "Mansi", "Pallavi", "Sakshi", "Natasha", "Reyna", "Zoya"
];

const maleFirstNames = [
  "Aarav", "Kunal", "Aditya", "Raghav", "Varun", "Rohan", "Siddharth", "Ayush", "Harsh", "Pranav",
  "Mayank", "Nikhil", "Akshat", "Gaurav", "Yash", "Dhruv", "Aniket", "Saurabh", "Kartik", "Shivam",
  "Abhishek", "Aman", "Arpit", "Devansh", "Hardik", "Ishaan", "Keshav", "Manish", "Naman", "Piyush",
  "Rajat", "Rishabh", "Samarth", "Shubham", "Tanmay", "Udit", "Vaibhav", "Vikram", "Vishal", "Vivek",
  "Anshul", "Chirag", "Deepak", "Hemant", "Mohit", "Paras", "Rohit", "Sachin", "Tushar", "Utkarsh", "Vipul", "Armaan", "Kabir", "Ziaan"
];

const eliteLocations = [
  { city: "Delhi (Golf Links)", state: "Delhi", country: "India", isNRI: false },
  { city: "Gurugram (Golf Course Rd)", state: "Haryana", country: "India", isNRI: false },
  { city: "South Mumbai (Malabar Hill)", state: "Maharashtra", country: "India", isNRI: false },
  { city: "Jaipur (Civil Lines)", state: "Rajasthan", country: "India", isNRI: false },
  { city: "London (Mayfair)", state: "Greater London", country: "United Kingdom", isNRI: true },
  { city: "Dubai (Downtown)", state: "Dubai", country: "United Arab Emirates", isNRI: true },
  { city: "New York (Manhattan)", state: "New York", country: "United States", isNRI: true },
  { city: "San Francisco (Bay Area)", state: "California", country: "United States", isNRI: true },
  { city: "Singapore (Marina Bay)", state: "Singapore", country: "Singapore", isNRI: true },
  { city: "Toronto (Yorkville)", state: "Ontario", country: "Canada", isNRI: true },
  { city: "Chandigarh (Sector 9)", state: "Punjab", country: "India", isNRI: false },
  { city: "Bengaluru (Indiranagar)", state: "Karnataka", country: "India", isNRI: false },
  { city: "Kolkata (Alipore)", state: "West Bengal", country: "India", isNRI: false },
  { city: "Ahmedabad (Bodakdev)", state: "Gujarat", country: "India", isNRI: false }
];

const eliteColleges = [
  "Columbia University & LSE", "Harvard Business School", "Oxford University", "Stanford University",
  "Imperial College London", "IIT Delhi & IIM Ahmedabad", "IIT Bombay & Wharton", "NYU Stern",
  "University of Cambridge", "SRCC, Delhi University", "LSE London", "Wharton School, Penn",
  "University of Toronto", "AIIMS New Delhi", "National Law School (NLSIU)", "BITS Pilani"
];

const eliteProfessions = [
  { profession: "Vice President, Private Equity", degree: "MBA, Wharton & B.Tech", level: "MBA", income: "₹60 LPA–₹1 Cr" },
  { profession: "Managing Partner, Family Office", degree: "MSc Finance, LSE", level: "Master's", income: "₹1 Cr+", isBiz: true },
  { profession: "Senior Director, Artificial Intelligence", degree: "MS, Stanford University", level: "Master's", income: "₹60 LPA–₹1 Cr" },
  { profession: "Strategy Consultant (Engagement Mgr)", degree: "MBA, INSEAD", level: "MBA", income: "₹40–60 LPA" },
  { profession: "Founder & CEO, Consumer Brand", degree: "B.Tech, IIT & MBA", level: "MBA", income: "₹1 Cr+", isBiz: true },
  { profession: "Corporate M&A Attorney", degree: "LLM, Columbia Law School", level: "Law", income: "₹40–60 LPA" },
  { profession: "Radiologist & Clinical Fellow", degree: "MD, AIIMS New Delhi", level: "MD", income: "₹40–60 LPA" },
  { profession: "Executive Director, Industrial Conglomerate", degree: "BBA, London Business School", level: "Bachelor's", income: "₹1 Cr+", isBiz: true },
  { profession: "Product Management Lead", degree: "B.Tech, IIT & MBA, IIM-A", level: "MBA", income: "₹40–60 LPA" },
  { profession: "Quantitative Portfolio Manager", degree: "MFE, Oxford University", level: "Master's", income: "₹60 LPA–₹1 Cr" },
  { profession: "Architect & Spatial Designer", degree: "M.Arch, Architectural Association London", level: "Master's", income: "₹25–40 LPA" },
  { profession: "Luxury Brand Director", degree: "MA, Central Saint Martins London", level: "Master's", income: "₹25–40 LPA" }
];

const diets = ["Pure Vegetarian", "Pure Vegetarian", "Jain Vegetarian", "Pure Vegetarian", "Vegan"];
const timelines = ["Within 6 months", "6-12 months", "1-2 years", "6-12 months"];
const familyValues = ["Moderate", "Liberal", "Moderate", "Traditional"];
const manglikStatuses = ["Non-Manglik", "Non-Manglik", "Anshik Manglik", "Doesn't Matter"];

const profiles = [];

// Generate exactly 108 profiles, cycling through all 18 Gotras exactly 6 times each!
for (let i = 0; i < 108; i++) {
  const isFemale = i < 54;
  const gender = isFemale ? "Female" : "Male";
  const firstName = isFemale ? femaleFirstNames[i % femaleFirstNames.length] : maleFirstNames[(i - 54) % maleFirstNames.length];
  
  // Guarantee every single one of the 18 Gotras is equally represented
  const gotra = ALL_18_GOTRAS[i % ALL_18_GOTRAS.length];
  const maternalGotra = ALL_18_GOTRAS[(i + 3) % ALL_18_GOTRAS.length];

  // Rotate surnames
  const surnameObj = BANIYA_SURNAMES_MAP[i % BANIYA_SURNAMES_MAP.length];
  const surname = surnameObj.surname;
  const fullName = `${firstName} ${surname}`;

  const loc = eliteLocations[i % eliteLocations.length];
  const prof = eliteProfessions[i % eliteProfessions.length];
  const college = eliteColleges[i % eliteColleges.length];
  const diet = diets[i % diets.length];
  const timeline = timelines[i % timelines.length];
  const famVal = familyValues[i % familyValues.length];
  const manglik = manglikStatuses[i % manglikStatuses.length];

  const age = 24 + (i % 14); // 24 to 37
  const heightFeet = isFemale ? 5 : 5;
  const heightInches = isFemale ? (4 + (i % 5)) : (9 + (i % 5));
  const heightStr = `${heightFeet}'${heightInches}"`;

  const overallComp = 88 + (i % 11); // 88% to 98%
  const lifestyleComp = 90 + (i % 9);
  const familyComp = 89 + (i % 10);
  const careerComp = 92 + (i % 7);
  const locComp = loc.isNRI ? 86 + (i % 10) : 92 + (i % 7);
  const interestComp = 90 + (i % 9);

  const photoList = isFemale
    ? [femalePhotos[i % femalePhotos.length], femalePhotos[(i + 2) % femalePhotos.length], femalePhotos[(i + 4) % femalePhotos.length]]
    : [malePhotos[(i - 54) % malePhotos.length], malePhotos[((i - 54) + 2) % malePhotos.length], malePhotos[((i - 54) + 4) % malePhotos.length]];

  const interestsList = [
    ["Classical Piano", "Alpine Skiing", "Specialty Coffee", "Contemporary Art", "Vipassana"],
    ["Equestrian", "Architectural Heritage", "Tennis & Squash", "Philosophy", "Tea Tasting"],
    ["Marathon Running", "Private Art Galleries", "Modernist Design", "Sailing", "Reading History"],
    ["Sunday Family Brunches", "Polo & Golf", "Photography", "Venture Investing", "Hiking in Alps"],
    ["Fine Dining Exploration", "Cordon Bleu Baking", "Bespoke Horology", "Jazz Music", "Pilates"]
  ][i % 5];

  const bios = [
    `Raised in a refined North Indian ${surnameObj.community} family where deep cultural heritage and a global worldview coexist seamlessly. Educated at ${college}, currently working as a ${prof.profession} in ${loc.city}. Grounded, well-traveled, and values thoughtful conversations, festive family dinners, and mutual intellectual growth.`,
    `A blend of classic Indian poise and modern international ambition. Graduated from ${college} and currently based in ${loc.city}. Passionate about building meaningful ventures, staying active with morning runs, and hosting warm family gatherings. Looking for a partner who cherishes shared cultural ethics and emotional connection.`,
    `Cosmopolitan outlook with strong roots in ${surnameObj.community} traditions. Living between ${loc.city} and Delhi. I appreciate high standards in personal and professional life, quiet luxury, literature, and weekend road trips. Seeking someone kind-hearted, ambitious, and family-oriented.`,
    `Brought up with timeless Baniya values emphasizing perseverance, integrity, and warmth. Serving as a ${prof.profession}. Enjoys architecture, international design exhibitions, and wholesome vegetarian dining. Looking for an equal partner to build a graceful, loving home.`,
    `Living and working in ${loc.city}. A believer in purposeful ambition, cultural rootedness, and understated elegance. Looking for a life partner who values family harmony, personal authenticity, and lifelong companionship.`
  ];

  const whyMatch = `Both embrace a ${diet.toLowerCase()} lifestyle, share an international educational pedigree in ${loc.city}, and prioritize a ${famVal.toLowerCase()} family outlook with strong cultural ties.`;

  const profile = {
    id: `bm-${1000 + i}`,
    name: fullName,
    age: age,
    gender: gender,
    height: heightStr,
    city: loc.city,
    state: loc.state,
    country: loc.country,
    isNRI: loc.isNRI,
    motherTongue: "Hindi",
    community: surnameObj.community,
    gotra: gotra,
    maternalGotra: maternalGotra,
    education: prof.degree,
    college: college,
    degreeLevel: prof.level,
    profession: prof.profession,
    income: prof.income,
    isBusiness: Boolean(prof.isBiz),
    businessDetails: prof.isBiz ? {
      type: "Family Office & Global Manufacturing Holdings",
      size: "250-1,000+ Employees",
      turnover: "₹50 Cr - ₹250 Cr Annual"
    } : undefined,
    diet: diet,
    religion: surnameObj.community.includes("Jain") ? "Jain" : "Hindu",
    lifestyle: {
      smoking: "Non-smoker",
      drinking: i % 8 === 0 ? "Occasional wine" : "Non-drinker",
      fitness: i % 2 === 0 ? "Reformer pilates & tennis" : "Daily marathon training & gym",
      spiritual: "Meditation, temple visits & mindfulness",
      social: "Cultured, loves private dinners and family reunions"
    },
    horoscope: {
      manglik: manglik,
      rashi: ["Mesh", "Vrishabh", "Mithun", "Kark", "Singh", "Kanya", "Tula", "Vrishchik", "Dhanu", "Makar", "Kumbh", "Meen"][i % 12],
      nakshatra: ["Rohini", "Ashwini", "Pushya", "Magha", "Swati", "Uttara Phalguni"][i % 6]
    },
    timeline: timeline,
    family: {
      fatherOccupation: i % 2 === 0 ? "Director in Multinational / Senior Bureaucrat" : "Established Family Conglomerate Chairman",
      motherOccupation: i % 3 === 0 ? "Philanthropist & Trust Trustee" : "Educator & Homemaker",
      siblings: i % 2 === 0 ? "1 younger sister (Corporate Lawyer in London)" : "1 elder brother (Managing Partner in Family Enterprise)",
      familyType: i % 2 === 0 ? "Nuclear" : "Joint",
      familyValues: famVal,
      familyIncome: "₹75 LPA - ₹2 Cr+",
      nativePlace: ["Jaipur, Rajasthan", "Shekhawati, Rajasthan", "Delhi NCR", "Mathura, UP", "Agra, UP", "Indore, MP"][i % 6],
      livingArrangement: "Independent residence in city center with family close by",
      familyInvolvement: "High - Warm, collaborative discussions between parents and candidate"
    },
    about: bios[i % bios.length],
    interests: interestsList,
    photos: photoList,
    verification: {
      mobile: true,
      email: true,
      identity: true,
      education: true,
      employment: true,
      selfie: true
    },
    isVerified: true,
    compatibility: {
      overall: overallComp,
      lifestyle: lifestyleComp,
      family: familyComp,
      career: careerComp,
      location: locComp,
      interests: interestComp,
      whyMatch: whyMatch
    },
    isPremium: true,
    isBoosted: i % 5 === 0,
    isNew: i % 7 === 0,
    lastActive: ["Active today", "Active 1 hour ago", "Active 3 hours ago", "Active yesterday"][i % 4]
  };

  profiles.push(profile);
}

const fileContent = `import { Profile } from "@/lib/types";

export const mockProfiles: Profile[] = ${JSON.stringify(profiles, null, 2)};
`;

// Verify no em-dash character exists
if (fileContent.includes("\u2014")) {
  console.error("ERROR: Em-dash found!");
  process.exit(1);
}

fs.writeFileSync(path.join(__dirname, '../data/profiles.ts'), fileContent, 'utf-8');
console.log(`Successfully generated ${profiles.length} profiles covering all 18 authentic Gotras.`);
