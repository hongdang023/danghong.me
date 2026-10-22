// Website content, stored in Cloudflare D1 and edited at https://media.danghong.me/admin/.
// Pages are a static export, so this runs at build time only: every getter fetches
// <CONTENT_API_URL>/<name>.json once per build. Import only types from client components.

const CONTENT_API_URL = (process.env.CONTENT_API_URL ?? "https://media.danghong.me/api/website").replace(/\/$/, "");

export interface Product {
  slug: string;
  category: string;
  title: string;
  description: string;
  longDescription: string;
  jtbd: {
    functional: string;
    emotional: string;
    social: string;
  };
  dreamState: string;
  humanStory: string;
  image: string;
  link: string;
  outcome: string;
  tags: string[];
  testCode?: string;
}
export interface Course {
  id: string;
  name: string;
  provider: string;
  tags: string[];
  reviewUrl: string | null;
  courseUrl: string | null;
}
export interface SubSection {
  id: string;
  title: string;
  description: string;
}
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}
export interface ABCDObjectives {
  audience: string;
  behavior: string;
  condition: string;
  degree: string;
}
export interface Term {
  word: string;
  definition: string;
}
export interface Quiz3Layer {
  id: string;
  layer1: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
  layer2: {
    prompt: string;
    expectedLogic: string;
  };
  layer3: {
    question: string;
    expectedLogic: string;
  };
}
export interface LDChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  pdfPath: string;
  outcomes: ABCDObjectives;
  sections: SubSection[];
  glossary: Term[];
  quiz3Layer: Quiz3Layer[];
  quiz: QuizQuestion[]; // Legacy/Simple quiz
}
export interface MasterOrganization {
  id: string;
  name: string;
  link: string;
  philosophy: string;
  lessons: string;
  image: string;
}
export interface LifeMentor {
  id: string;
  name: string;
  badge: string;
  relationship: string;
  subtitle: string;
  summary: string;
  iconName: string; // Lucide icon identifier
  story: string;
  lessons: string[];
  quotes?: string[];
  quotesTitle?: string;
}
export interface FamilyMember {
  id: string;
  name: string;
  role: string;
  job: string;
  birthYear?: number;
  coverImage: string;
  images: string[];
  admirations?: string[];
  lessons?: string[];
  hobbies?: string[];
  favoriteGames?: string[];
  favoriteArtists?: string[];
  quotes?: string[];
  quotesTitle?: string;
  storySections?: { title: string; content: string }[];
}
export interface Community {
  id: string;
  name: string;
  stats: string; // e.g., "Tháng 8/2025 • 45 thành viên"
  description: string;
  cover_image: string;
  images: string[]; // for the gallery modal
}
export interface Tool {
  name: string;
  description: string;
  iconName: string;
  link?: string;
  tagline?: string;
}
export interface ToolsCategory {
  title: string;
  subtitle: string;
  tools: Tool[];
}
export interface UpdateItem {
  id: string;
  title: string;
  content: string;
  type: "feature" | "course_update" | "bugfix" | "general";
  created_at: string;
  link?: string;
}

export interface WebsiteSettings {
  familyStories: { loveStory: string; habits: string[] };
  toolsPhilosophy: { quote: string; context: string };
  /** Filter group of Hồng's List → course tags in that group. */
  courseCategories: Record<string, string[]>;
  /** Product category → group title in /api/showcase.json. */
  showcaseCategories: Record<string, string>;
  /** Served as-is at /api/profile.json. */
  apiProfile: Record<string, unknown>;
}

async function load<T>(name: string): Promise<T> {
  const url = `${CONTENT_API_URL}/${name}.json`;
  const res = await fetch(url, { cache: "force-cache" });
  if (!res.ok) throw new Error(`Không tải được nội dung ${url}: ${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

export const getProducts = () => load<Product[]>("products");
export const getCourses = () => load<Course[]>("courses");
export const getBooks = () => load<LDChapter[]>("books");
export const getMasters = () => load<MasterOrganization[]>("masters");
export const getMentors = () => load<LifeMentor[]>("mentors");
export const getFamily = () => load<FamilyMember[]>("family");
export const getCommunities = () => load<Community[]>("communities");
export const getTools = () => load<ToolsCategory[]>("tools");
export const getUpdates = () => load<UpdateItem[]>("updates");
export const getSettings = () => load<WebsiteSettings>("settings");
