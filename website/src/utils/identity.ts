// Behavior-based Identity Archetype System
// Danh hiệu được tính tự động từ hành vi thực của user

export interface UserBehaviorStats {
  chaptersCompleted: number;
  quizzesPassed: number;
  productsFavourited: number;
  coursesFavourited: number;
  totalFavourited: number;
}

export interface UserIdentity {
  id: string;
  title: string;         // "Người Khám Phá"
  titleEn: string;       // "The Explorer"
  description: string;   // Mô tả ngắn có ý nghĩa
  emoji: string;
  color: string;         // Tailwind-compatible hex
  bgClass: string;
}

const IDENTITIES: UserIdentity[] = [
  {
    id: "pioneer",
    title: "Người Tiên Phong",
    titleEn: "The Pioneer",
    description: "Bạn đã đi xa hơn hầu hết mọi người. Không chỉ học — bạn đang kiến tạo.",
    emoji: "🚀",
    color: "#8E3A3A",
    bgClass: "bg-[#8E3A3A]",
  },
  {
    id: "builder",
    title: "Người Kiến Tạo",
    titleEn: "The Builder",
    description: "Bạn không chỉ tiêu thụ kiến thức — bạn đang biến nó thành kỹ năng thực.",
    emoji: "🔨",
    color: "#5C4033",
    bgClass: "bg-[#5C4033]",
  },
  {
    id: "practitioner",
    title: "Người Thực Hành",
    titleEn: "The Practitioner",
    description: "Bạn đã vượt qua điểm kiểm thử đầu tiên. Tư duy thực hành bắt đầu từ đây.",
    emoji: "⚡",
    color: "#2D5A8E",
    bgClass: "bg-[#2D5A8E]",
  },
  {
    id: "learner",
    title: "Người Học",
    titleEn: "The Learner",
    description: "Bạn đã bắt đầu hành trình học tập. Mỗi chương là một bước tiến quan trọng.",
    emoji: "📖",
    color: "#2E7D5E",
    bgClass: "bg-[#2E7D5E]",
  },
  {
    id: "explorer",
    title: "Người Khám Phá",
    titleEn: "The Explorer",
    description: "Bạn đang tìm kiếm những gì phù hợp với mình. Hành trình thực sự bắt đầu từ đây.",
    emoji: "🧭",
    color: "#5E6A7A",
    bgClass: "bg-[#5E6A7A]",
  },
  {
    id: "observer",
    title: "Người Quan Sát",
    titleEn: "The Observer",
    description: "Bạn vừa gia nhập cộng đồng. Chào mừng — câu chuyện của bạn bắt đầu từ hôm nay.",
    emoji: "👁️",
    color: "#6B7280",
    bgClass: "bg-[#6B7280]",
  },
];

export function getUserIdentity(stats: UserBehaviorStats): UserIdentity {
  const { chaptersCompleted, quizzesPassed, totalFavourited } = stats;

  // Check from highest to lowest
  if (chaptersCompleted >= 5 && quizzesPassed >= 3 && totalFavourited >= 3) {
    return IDENTITIES[0]; // Pioneer
  }
  if (chaptersCompleted >= 3 && quizzesPassed >= 2) {
    return IDENTITIES[1]; // Builder
  }
  if (quizzesPassed >= 1) {
    return IDENTITIES[2]; // Practitioner
  }
  if (chaptersCompleted >= 1) {
    return IDENTITIES[3]; // Learner
  }
  if (totalFavourited >= 1) {
    return IDENTITIES[4]; // Explorer
  }
  return IDENTITIES[5]; // Observer
}

export function getGreeting(firstName: string, identity: UserIdentity): string {
  const greetings: Record<string, string[]> = {
    pioneer:     [`Chào ${firstName}, ${identity.emoji}`, `Tiên phong như bạn thật hiếm.`],
    builder:     [`Xin chào, ${firstName} ${identity.emoji}`, `Bạn đang xây dựng điều gì đó có giá trị.`],
    practitioner:[`Chào ${firstName} ${identity.emoji}`, `Mỗi quiz bạn pass là một mốc quan trọng.`],
    learner:     [`Chào ${firstName} ${identity.emoji}`, `Tiếp tục học — bạn đang đi đúng hướng.`],
    explorer:    [`Chào ${firstName} ${identity.emoji}`, `Tò mò là điểm khởi đầu của mọi sự thay đổi.`],
    observer:    [`Chào mừng, ${firstName} ${identity.emoji}`, `Chúng tôi vui vì bạn ở đây.`],
  };
  return greetings[identity.id]?.[0] ?? `Chào ${firstName}`;
}
