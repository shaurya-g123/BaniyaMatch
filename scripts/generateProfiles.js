const fs = require('fs');
const path = require('path');

// Exclusively Authentic, Refined North Indian Portraits
const femalePhotos = [
  "/portraits/female_1.jpg",
  "/portraits/female_2.jpg",
  "/portraits/female_3.jpg",
  "/portraits/female_4.jpg",
  "/portraits/female_5.jpg",
  "/portraits/female_6.jpg",
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1667053312811-6594186d37ca?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1663475928660-7afa0461b005?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1660733100681-ddeb2b81feee?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1621786030484-4c855ecd48d6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1597586124394-fbd6ef244026?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1605369572399-05d8d64a0f6e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?auto=format&fit=crop&w=800&q=80"
];

const malePhotos = [
  "/portraits/male_1.jpg",
  "/portraits/male_2.jpg",
  "/portraits/male_3.jpg",
  "/portraits/male_4.jpg",
  "/portraits/male_5.jpg",
  "/portraits/male_6.jpg",
  "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1615813967515-e1838c1c5116?auto=format&fit=crop&w=800&q=80"
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
  { city: "Delhi (Jor Bagh)", state: "Delhi", country: "India", isNRI: false },
  { city: "Delhi (Vasant Vihar)", state: "Delhi", country: "India", isNRI: false },
  { city: "Delhi (Greater Kailash)", state: "Delhi", country: "India", isNRI: false },
  { city: "Mumbai (Malabar Hill)", state: "Maharashtra", country: "India", isNRI: false },
  { city: "Mumbai (Bandra West)", state: "Maharashtra", country: "India", isNRI: false },
  { city: "Mumbai (Juhu)", state: "Maharashtra", country: "India", isNRI: false },
  { city: "Gurugram (Golf Course Rd)", state: "Haryana", country: "India", isNRI: false },
  { city: "Jaipur (Civil Lines)", state: "Rajasthan", country: "India", isNRI: false },
  { city: "Chandigarh (Sector 9)", state: "Punjab", country: "India", isNRI: false },
  { city: "London (Mayfair)", state: "England", country: "United Kingdom", isNRI: true },
  { city: "New York (Manhattan)", state: "New York", country: "United States", isNRI: true },
  { city: "San Francisco (Bay Area)", state: "California", country: "United States", isNRI: true },
  { city: "Dubai (DIFC)", state: "Dubai", country: "United Arab Emirates", isNRI: true },
  { city: "Singapore (Marina Bay)", state: "Singapore", country: "Singapore", isNRI: true },
  { city: "Zurich (Enge)", state: "Zurich", country: "Switzerland", isNRI: true }
];

const eliteColleges = [
  "Columbia University & LSE",
  "Oxford University & IIT Delhi",
  "Wharton (UPenn) & SRCC",
  "Harvard Business School & BITS Pilani",
  "Stanford University",
  "INSEAD & St. Stephen's College",
  "London School of Economics (LSE)",
  "IIM Ahmedabad & IIT Bombay",
  "Cambridge University",
  "ISB Hyderabad & SRCC",
  "AIIMS New Delhi",
  "National Law School (NLSIU Bangalore)"
];

const eliteProfessions = [
  { profession: "Vice President, Private Equity", degree: "MBA, Wharton & B.Tech", level: "MBA", income: "₹60 LPA - ₹1 Cr" },
  { profession: "Co-Founder & CEO, Series B Fintech", degree: "B.Tech, IIT & MS Stanford", level: "Master's", income: "₹1 Cr+" },
  { profession: "Partner, Corporate Law Firm", degree: "LL.M, Harvard Law", level: "Master's", income: "₹50-75 LPA" },
  { profession: "Executive Director, Family Conglomerate", degree: "B.Sc, Wharton & Family Office", level: "Bachelor's", income: "₹1 Cr+", isBiz: true },
  { profession: "Principal, Management Consulting", degree: "MBA, INSEAD", level: "MBA", income: "₹55-80 LPA" },
  { profession: "Director of AI Research", degree: "Ph.D, Stanford / Carnegie Mellon", level: "Doctorate", income: "₹80 LPA - ₹1.2 Cr" },
  { profession: "Managing Director, Family Textile Mills", degree: "B.Com (Hons), SRCC & MBA London", level: "MBA", income: "₹1 Cr+", isBiz: true },
  { profession: "Consultant Surgeon (Super-Specialist)", degree: "MD, M.Ch, AIIMS New Delhi", level: "Doctorate", income: "₹45-65 LPA" },
  { profession: "Product Management Lead", degree: "B.Tech, IIT & MBA, IIM-A", level: "MBA", income: "₹40-60 LPA" },
  { profession: "Quantitative Portfolio Manager", degree: "MFE, Oxford University", level: "Master's", income: "₹60 LPA - ₹1 Cr" },
  { profession: "Architect & Spatial Designer", degree: "M.Arch, Architectural Association London", level: "Master's", income: "₹25-40 LPA" },
  { profession: "Luxury Brand Director", degree: "MA, Central Saint Martins London", level: "Master's", income: "₹25-40 LPA" }
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
  const heightFeet = 5;
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
    religion: "Hindu",
    lifestyle: {
      smoking: "Non-smoker",
      drinking: "Occasional wine",
      fitness: "Reformer pilates & tennis",
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
