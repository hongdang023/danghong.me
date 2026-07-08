"use client";

import React, { useState, useEffect, useRef } from "react";
import * as motion from "framer-motion/client";
import { RotateCcw, ArrowRight, Trophy, Sparkles, Volume2, VolumeX, ArrowLeft, ArrowUp } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  answer: number;
}

const ROUNDS: { name: string; world: string; questions: Question[] }[] = [
  {
    name: "Mushroom Kingdom",
    world: "1-1",
    questions: [
      {
        question: "Em út Minh Châu cách chị gái (chủ nhân trang web) bao nhiêu tuổi?",
        options: ["5 tuổi", "10 tuổi", "15 tuổi", "20 tuổi"],
        answer: 3
      },
      {
        question: "Món ăn nào luôn xuất hiện trong các bữa tiệc sinh nhật của gia đình?",
        options: ["Nướng BBQ", "Sushi", "Lẩu", "Phở"],
        answer: 2
      },
      {
        question: "Em trai Huy đang theo học ngành gì tại Đại học Ngoại thương?",
        options: ["Kinh tế đối ngoại", "Tiếng Anh thương mại", "Tài chính quốc tế", "Quản trị kinh doanh"],
        answer: 1
      },
      {
        question: "Sở thích của cô em út 2 tuổi Đặng Minh Châu là gì?",
        options: ["Xem ipad, vẽ tranh, ăn kẹo", "Chạy, ngủ, tuti mẹ", "Đọc sách, tô màu, xếp hình", "Ca hát, nhảy múa, nghịch nước"],
        answer: 1
      },
      {
        question: "Thói quen ăn uống đặc biệt nào được gia đình duy trì mỗi ngày?",
        options: [
          "Vừa ăn vừa xem TV ở phòng khách",
          "Phòng ăn tách biệt, không bật TV để tập trung nói chuyện",
          "Mỗi người ăn một giờ tự do",
          "Ra ngoài ăn nhà hàng"
        ],
        answer: 1
      }
    ]
  },
  {
    name: "Flower Land",
    world: "1-2",
    questions: [
      {
        question: "Huy đã đạt điểm số IELTS bao nhiêu ngay trong lần thi đầu tiên?",
        options: ["7.0", "7.5", "8.0", "8.5"],
        answer: 2
      },
      {
        question: "Nghệ sĩ âm nhạc yêu thích của em trai Huy là những ai?",
        options: ["Kendrick Lamar & MCK", "Eminem & Đen Vâu", "Drake & HIEUTHUHAI", "Kanye West & Suboi"],
        answer: 0
      },
      {
        question: "Bố Đặng Trần Mạnh sinh năm bao nhiêu và làm nghề gì?",
        options: ["1979 - Công chức nhà nước", "1979 - Kinh doanh tự do", "1975 - Kỹ sư công nghệ", "1982 - Bác sĩ"],
        answer: 1
      },
      {
        question: "Bố và mẹ đã quen nhau như thế nào thời đại học?",
        options: [
          "Đi làm thêm chung một nhà hàng",
          "Học chung trường ĐH khác lớp, quen qua một tín chỉ và được bạn bè gán ghép",
          "Quen nhau tại một buổi cắm trại của câu lạc bộ",
          "Là bạn thanh mai trúc mã từ nhỏ ở quê"
        ],
        answer: 1
      },
      {
        question: "Điều gì là động lực khiến chủ nhân trang web quyết định hàn gắn với gia đình sau 3 năm xa cách dẫu sống chung một nhà?",
        options: [
          "Sự chào đời và quan sát em gái Minh Châu lớn lên từng ngày",
          "Lời khuyên của một người bạn thân",
          "Chuyến đi du lịch gia đình vào dịp Tết",
          "Sau khi đọc xong một cuốn sách về gia đình"
        ],
        answer: 0
      }
    ]
  },
  {
    name: "Star World",
    world: "1-3",
    questions: [
      {
        question: "Bố Đặng Trần Mạnh đã hoàn thành chặng bơi bao nhiêu km ở eo biển English Channel (Anh)?",
        options: ["Gần 30km", "Gần 45km", "Gần 60km", "Gần 75km"],
        answer: 2
      },
      {
        question: "03 điều mẹ dạy khi đứng bếp cùng con gái ('Những câu chuyện đứng bếp') là gì?",
        options: [
          "Khéo léo, cẩn thận, sạch sẽ",
          "Tốc độ suy nghĩ, tốc độ thực thi, tốc độ thích nghi điều chỉnh",
          "Nêm nếm chuẩn, canh lửa vừa, bày biện đẹp",
          "Tiết kiệm nguyên liệu, chuẩn bị trước, dọn dẹp sau"
        ],
        answer: 1
      },
      {
        question: "Thói quen rèn luyện sức khỏe đáng nể của bố là gì?",
        options: [
          "Đi tập gym 3 buổi một tuần sau giờ làm",
          "Chạy bộ 21km vào mỗi dịp cuối tuần",
          "Dậy 5h00 sáng 365 ngày đi bơi sông Hồng/bể hoặc chạy bộ 10km",
          "Đạp xe quanh hồ Tây mỗi buổi chiều"
        ],
        answer: 2
      },
      {
        question: "Theo lời bố kể, tại sao mẹ lại đổ bố trước dù bố 'rõ là xấu giai'?",
        options: [
          "Do bố viết thư tình rất hay gửi mẹ",
          "Do bố học giỏi và hay chở mẹ cùng các em của mẹ đi học 10 cây số",
          "Do bố là người nấu ăn ngon nhất lớp",
          "Do bố đã tặng mẹ một món quà đặc biệt"
        ],
        answer: 1
      },
      {
        question: "Trò game nào em trai Huy đã chơi từ hồi cấp 1 và học cách 'đổi tab chơi game với học bài' từ chị gái?",
        options: ["League of Legends & CS:GO", "Minecraft & Roblox", "Liên Quân & PUBG Mobile", "FIFA & GTA V"],
        answer: 1
      }
    ]
  }
];

interface PlatformBlock {
  id: string;
  type: "question" | "brick";
  x: number;
  y: number; 
  triggered: boolean;
  questionIdx?: number;
}

function PixelCat({ state }: { state: "idle" | "run" | "jump" }) {
  const [frame, setFrame] = useState(0);
  
  useEffect(() => {
    if (state !== "run") return;
    const timer = setInterval(() => setFrame((f) => (f + 1) % 2), 150);
    return () => clearInterval(timer);
  }, [state]);

  const sprite = [
    "....k.....k.....",
    "...kbk...kbk....",
    "..kwwbk.kwwbk...",
    ".kwwpwbkkwwpwb..",
    "kwwwwwwwwwwwwwk.",
    "kwwwwwwwwwwwwwk.",
    "kwwkwwwwwkwwwwk.", 
    "kwwwwkwwkwwwwwk.", 
    "kwdwwwwwkwwwwdk.", 
    ".kwwwwwwwwwwwk..",
    "..kwwwwwwwwwk...",
    "..kwwwwwwwwwk...",
    ".kwwbbwwwbbwk...",
    "kbbkwwwwwkwwk...", 
    ".kkkwwwwwkwwk...",
    frame === 0 
      ? "..kkkwwkkwwk...." 
      : "...kkwwkkwwk...." 
  ];

  return (
    <svg width="40" height="40" viewBox="0 0 16 16" shapeRendering="crispEdges">
      {sprite.map((row, rIdx) => 
        row.split("").map((pixel, cIdx) => {
          if (pixel === ".") return null;
          let fill = "#000000";
          if (pixel === "w") fill = "#ffffff";
          if (pixel === "b") fill = "#a67c52"; 
          if (pixel === "p") fill = "#ffd3d3"; 
          if (pixel === "d") fill = "#ff9e9e"; 
          return <rect key={`${rIdx}-${cIdx}`} x={cIdx} y={rIdx} width="1" height="1" fill={fill} />;
        })
      )}
    </svg>
  );
}

export default function MarioKartQuiz() {
  const [activeRound, setActiveRound] = useState<number | null>(null);
  const [gameState, setGameState] = useState<"menu" | "playing" | "quiz" | "finished">("menu");
  const [score, setScore] = useState(0);
  const [coinsCount, setCoinsCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(999);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Mario Physics
  const [marioX, setMarioX] = useState(60); 
  const [marioY, setMarioY] = useState(0); 
  const [marioDirection, setMarioDirection] = useState<"left" | "right">("right");
  const [marioState, setMarioState] = useState<"idle" | "run" | "jump">("idle");
  const [blocks, setBlocks] = useState<PlatformBlock[]>([]);
  
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const physicsRef = useRef<{ yVelocity: number; isJumping: boolean }>({ yVelocity: 0, isJumping: false });
  const gameLoopRef = useRef<number | null>(null);
  const levelWidth = 2400; // Wider level
  const viewportWidth = 800; // Wider viewport for 7xl layout

  // Play retro sound effects
  const playSound = (type: "jump" | "correct" | "coin" | "finish" | "click" | "incorrect") => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;

      if (type === "jump") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === "coin") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(987.77, now);
        osc.frequency.setValueAtTime(1318.51, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === "correct") {
        osc.type = "square";
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        osc.frequency.setValueAtTime(1046.50, now + 0.24);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === "incorrect") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(110, now + 0.25);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === "click") {
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === "finish") {
        osc.type = "triangle";
        const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        });
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);
        osc.start(now);
        osc.stop(now + 0.7);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const startRound = (idx: number) => {
    setActiveRound(idx);
    setGameState("playing");
    setScore(0);
    setCoinsCount(0);
    setTimeRemaining(999);
    setMarioX(60);
    setMarioY(0);
    setMarioDirection("right");
    setMarioState("idle");
    physicsRef.current = { yVelocity: 0, isJumping: false };

    // Layout the blocks along X = 0 to X = 2400
    const levelBlocks: PlatformBlock[] = [
      { id: "b1", type: "question", x: 400, y: 100, triggered: false, questionIdx: 0 },
      { id: "b2", type: "question", x: 800, y: 100, triggered: false, questionIdx: 1 },
      { id: "b3", type: "question", x: 1200, y: 100, triggered: false, questionIdx: 2 },
      { id: "b4", type: "question", x: 1600, y: 100, triggered: false, questionIdx: 3 },
      { id: "b5", type: "question", x: 2000, y: 100, triggered: false, questionIdx: 4 },
      
      // Decorative bricks scattered around question blocks
      { id: "d1", type: "brick", x: 360, y: 100, triggered: false },
      { id: "d2", type: "brick", x: 440, y: 100, triggered: false },
      { id: "d3", type: "brick", x: 760, y: 100, triggered: false },
      { id: "d4", type: "brick", x: 840, y: 100, triggered: false },
      { id: "d5", type: "brick", x: 1160, y: 100, triggered: false },
      { id: "d6", type: "brick", x: 1240, y: 100, triggered: false },
      { id: "d7", type: "brick", x: 1560, y: 100, triggered: false },
      { id: "d8", type: "brick", x: 1640, y: 100, triggered: false },
      { id: "d9", type: "brick", x: 1960, y: 100, triggered: false },
      { id: "d10", type: "brick", x: 2040, y: 100, triggered: false }
    ];

    setBlocks(levelBlocks);
    playSound("click");
  };

  const jump = () => {
    if (!physicsRef.current.isJumping) {
      physicsRef.current.yVelocity = 12; // Upward force
      physicsRef.current.isJumping = true;
      setMarioState("jump");
      playSound("jump");
    }
  };

  const moveLeft = () => {
    setMarioDirection("left");
    setMarioState("run");
    setMarioX((prev) => Math.max(20, prev - 20));
  };

  const moveRight = () => {
    setMarioDirection("right");
    setMarioState("run");
    setMarioX((prev) => {
      const nextX = Math.min(levelWidth - 40, prev + 20);
      // If reached the final green pipe
      if (nextX >= 2300) {
        setGameState("finished");
        playSound("finish");
      }
      return nextX;
    });
  };

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== "playing") return;
      
      // Prevent browser default scroll actions when playing
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " ", "w", "W", "a", "A", "s", "S", "d", "D"].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        moveLeft();
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        moveRight();
      } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W" || e.key === " ") {
        jump();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (gameState !== "playing") return;
      
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " ", "w", "W", "a", "A", "s", "S", "d", "D"].includes(e.key)) {
        e.preventDefault();
      }

      if (["ArrowLeft", "a", "A", "ArrowRight", "d", "D"].includes(e.key)) {
        setMarioState("idle");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState]);

  // Main game physics loop
  useEffect(() => {
    if (gameState !== "playing") {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    const physicsLoop = () => {
      setMarioY((y) => {
        let nextY = y + physicsRef.current.yVelocity;
        
        // Gravity pull
        physicsRef.current.yVelocity -= 0.65; 

        // Land on ground
        if (nextY <= 0) {
          nextY = 0;
          physicsRef.current.yVelocity = 0;
          physicsRef.current.isJumping = false;
          setMarioState((prev) => (prev === "jump" ? "idle" : prev));
        }

        // Check head hit against platforms/question blocks
        if (physicsRef.current.yVelocity > 0) {
          setBlocks((currentBlocks) => {
            let updated = [...currentBlocks];
            let triggeredIdx: number | null = null;

            updated = updated.map((block) => {
              if (block.triggered) return block;

              // Check if Mario is aligned with block horizontally
              const isAlignedX = Math.abs(marioX - block.x) < 24;
              
              // Check if Mario's head hits the bottom of the block (around block height)
              const isHeadHit = nextY >= block.y - 12 && nextY <= block.y + 12;

              if (isAlignedX && isHeadHit) {
                // Bounce down
                physicsRef.current.yVelocity = -1;
                
                if (block.type === "question") {
                  triggeredIdx = block.questionIdx!;
                  return { ...block, triggered: true };
                }
              }
              return block;
            });

            if (triggeredIdx !== null) {
              // Pause game and open quiz screen
              setCurrentQuestionIdx(triggeredIdx);
              setSelectedOption(null);
              setIsAnswered(false);
              setGameState("quiz");
            }

            return updated;
          });
        }

        return nextY;
      });

      // Countdown time
      setTimeRemaining((t) => Math.max(0, t - 1));

      gameLoopRef.current = requestAnimationFrame(physicsLoop);
    };

    gameLoopRef.current = requestAnimationFrame(physicsLoop);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameState, marioX]);

  // Answer quiz handler
  const handleAnswer = () => {
    if (selectedOption === null || isAnswered) return;
    const round = ROUNDS[activeRound!];
    const question = round.questions[currentQuestionIdx];
    const isCorrect = selectedOption === question.answer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setCoinsCount((prev) => prev + 1);
      playSound("coin");
    } else {
      playSound("incorrect");
    }
    setIsAnswered(true);
  };

  const resumeGame = () => {
    setGameState("playing");
    // Knock Mario slightly forward to avoid double collision
    setMarioX((prev) => Math.min(levelWidth - 40, prev + 40));
  };

  const resetGame = () => {
    playSound("click");
    setActiveRound(null);
    setGameState("menu");
  };

  // Camera scroll tracking Mario
  const cameraX = Math.max(0, Math.min(levelWidth - viewportWidth, marioX - viewportWidth / 2));

  return (
    <div className="bg-[#5c94fc] border-4 border-zinc-700 rounded-3xl p-6 shadow-2xl relative w-full max-w-7xl mx-auto overflow-hidden text-white font-mono select-none">
      
      {/* Nintendo Style Header HUD */}
      <div className="grid grid-cols-4 text-center text-xs tracking-wider mb-6 drop-shadow-[0_2px_0_rgba(0,0,0,1)]">
        <div>
          <div className="text-zinc-200">MARIO</div>
          <div className="font-bold text-lg">{(score * 1000).toString().padStart(6, "0")}</div>
        </div>
        <div>
          <div className="text-zinc-200">COINS</div>
          <div className="font-bold text-lg">🪙x{coinsCount.toString().padStart(2, "0")}</div>
        </div>
        <div>
          <div className="text-zinc-200">WORLD</div>
          <div className="font-bold text-lg">{activeRound !== null ? ROUNDS[activeRound].world : "1-1"}</div>
        </div>
        <div>
          <div className="text-zinc-200">TIME</div>
          <div className="font-bold text-lg">{timeRemaining.toString().padStart(3, "0")}</div>
        </div>
      </div>

      {gameState === "menu" ? (
        /* Level Select Menu */
        <div className="flex flex-col gap-6 py-6 text-center">
          <div>
            <h3 className="text-4xl font-extrabold tracking-wider text-orange-400 drop-shadow-[0_2px_0_rgba(0,0,0,1)] uppercase">
              SELECT WORLD
            </h3>
            <p className="text-xs text-zinc-200 mt-2">
              Bấm nút di chuyển và Nhảy để đập các khối câu hỏi "?" tìm hiểu về gia đình tôi!
            </p>
          </div>

          <div className="flex flex-col gap-3 max-w-md mx-auto w-full">
            {ROUNDS.map((round, idx) => (
              <button
                key={idx}
                onClick={() => startRound(idx)}
                className="group flex items-center justify-between bg-orange-600/40 border-2 border-orange-500 hover:border-yellow-400 hover:bg-orange-600/60 p-4 rounded-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{round.world === "1-1" ? "🍄" : round.world === "1-2" ? "🌸" : "⭐️"}</span>
                  <div className="text-left">
                    <h4 className="font-black text-sm text-white uppercase group-hover:text-yellow-400">
                      WORLD {round.world}: {round.name}
                    </h4>
                  </div>
                </div>
                <span className="text-yellow-400 font-extrabold group-hover:translate-x-1 transition-transform">GO &rarr;</span>
              </button>
            ))}
          </div>

          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="text-xs text-zinc-300 hover:text-white uppercase font-bold border border-white/20 px-6 py-2.5 rounded-full self-center"
          >
            {soundEnabled ? "Tắt Âm Thanh" : "Bật Âm Thanh"}
          </button>
        </div>
      ) : (
        /* Super Mario Gameplay Viewport */
        <div className="flex flex-col gap-6">
          
          {/* VIEWPORT BOX */}
          <div className="relative w-full h-[320px] md:h-[420px] bg-[#5c94fc] rounded-2xl overflow-hidden border-2 border-zinc-700 shadow-inner">
            {/* Moving clouds & background hills */}
            <div 
              className="absolute inset-y-0 flex items-end w-[250%] transition-transform duration-75"
              style={{ transform: `translateX(${-cameraX * 0.3}px)` }}
            >
              {/* Hills */}
              <div className="absolute bottom-[32px] left-[100px] w-48 h-28 bg-emerald-600 rounded-t-[100%]"></div>
              <div className="absolute bottom-[32px] left-[600px] w-64 h-36 bg-emerald-500 rounded-t-[100%]"></div>
              <div className="absolute bottom-[32px] left-[1200px] w-48 h-28 bg-emerald-600 rounded-t-[100%]"></div>
              <div className="absolute bottom-[32px] left-[1800px] w-64 h-36 bg-emerald-500 rounded-t-[100%]"></div>
              
              {/* Clouds */}
              <div className="absolute top-[15%] left-[100px] text-5xl opacity-70">☁️</div>
              <div className="absolute top-[25%] left-[800px] text-6xl opacity-80">☁️</div>
              <div className="absolute top-[10%] left-[1500px] text-5xl opacity-70">☁️</div>
              <div className="absolute top-[20%] left-[2000px] text-6xl opacity-80">☁️</div>
            </div>

            {/* Level Layer */}
            <div 
              className="absolute inset-0 transition-transform duration-75"
              style={{ transform: `translateX(${-cameraX}px)` }}
            >
              {/* Brick Floor (2400px wide) */}
              <div className="absolute bottom-0 left-0 w-[2400px] h-[32px] bg-amber-850 border-t-4 border-amber-600 flex">
                {Array.from({ length: 76 }).map((_, i) => (
                  <div key={i} className="w-[32px] h-[32px] border-r border-black/40 bg-orange-700 flex-shrink-0"></div>
                ))}
              </div>

              {/* Green Pipe (Exit portal at the end X=2300) */}
              <div className="absolute bottom-[32px] left-[2250px] w-20 h-28 flex flex-col items-center">
                <div className="w-20 h-8 bg-green-500 border-2 border-black rounded-t flex items-center justify-between px-1.5">
                  <div className="w-2 h-full bg-green-400"></div>
                  <div className="w-2 h-full bg-green-400"></div>
                </div>
                <div className="w-16 h-20 bg-green-600 border-x-2 border-b-2 border-black flex items-center justify-between px-1.5">
                  <div className="w-1.5 h-full bg-green-500"></div>
                  <div className="w-1.5 h-full bg-green-500"></div>
                </div>
              </div>

              {/* Spawning Blocks */}
              {blocks.map((block) => (
                <div
                  key={block.id}
                  className={`absolute w-10 h-10 border-2 border-black flex items-center justify-center text-sm font-black shadow-md rounded-md ${
                    block.triggered 
                      ? "bg-amber-900 text-amber-700" 
                      : block.type === "question"
                        ? "bg-orange-500 text-yellow-200 animate-pulse" 
                        : "bg-orange-700 text-orange-400" 
                  }`}
                  style={{ left: `${block.x}px`, bottom: `${block.y + 32}px` }}
                >
                  {block.triggered ? "" : block.type === "question" ? "?" : "🧱"}
                </div>
              ))}

              {/* Mario Character (Pixel Cat) */}
              <div 
                className="absolute w-12 h-12 transition-all duration-75 flex flex-col justify-end items-center"
                style={{ 
                  left: `${marioX}px`, 
                  bottom: `${marioY + 32}px`,
                  transform: marioDirection === "left" ? "scaleX(-1)" : "scaleX(1)"
                }}
              >
                <PixelCat state={marioState} />
              </div>
            </div>
          </div>

          {/* GAME CONTROLS */}
          {gameState === "playing" && (
            <div className="flex flex-col gap-4 bg-zinc-800/80 p-5 rounded-2xl border border-zinc-700">
              <div className="grid grid-cols-3 gap-4 items-center">
                {/* D-Pad Left/Right */}
                <div className="flex gap-3">
                  <button
                    onClick={moveLeft}
                    className="flex-1 bg-zinc-700 hover:bg-zinc-650 active:scale-95 text-white p-4 rounded-xl border-2 border-zinc-600 font-extrabold text-lg flex items-center justify-center"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    onClick={moveRight}
                    className="flex-1 bg-zinc-700 hover:bg-zinc-650 active:scale-95 text-white p-4 rounded-xl border-2 border-zinc-600 font-extrabold text-lg flex items-center justify-center"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>

                <div className="text-[10px] text-zinc-400 text-center leading-normal">
                  Dùng phím [A / D / Mũi tên trái / phải] để di chuyển.<br />
                  Dùng phím [Cách / Mũi tên lên] để Nhảy.
                </div>

                {/* Jump Action Button */}
                <button
                  onClick={jump}
                  className="bg-red-600 hover:bg-red-500 active:scale-90 text-white p-4 rounded-full border-4 border-red-700 font-black uppercase text-xs tracking-widest shadow-lg flex items-center justify-center gap-1.5 h-16 w-16 mx-auto"
                >
                  JUMP
                </button>
              </div>
            </div>
          )}

          {gameState === "quiz" && (
            /* Question Modal overlay at the bottom */
            <div className="bg-zinc-800 border-4 border-yellow-400 p-6 rounded-2xl flex flex-col gap-4 shadow-xl">
              <div>
                <span className="text-[10px] font-black text-yellow-400 tracking-widest block mb-1">
                  ĐẬP TRÚNG HỘP CÂU HỎI {currentQuestionIdx + 1} / 5!
                </span>
                <h5 className="text-sm md:text-base font-bold text-white leading-relaxed">
                  {ROUNDS[activeRound!].questions[currentQuestionIdx].question}
                </h5>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
                {ROUNDS[activeRound!].questions[currentQuestionIdx].options.map((option, optIdx) => {
                  const isCorrectAnswer = optIdx === ROUNDS[activeRound!].questions[currentQuestionIdx].answer;
                  const isSelected = optIdx === selectedOption;

                  let optionStyle = "border-zinc-700 hover:border-yellow-400 bg-zinc-850 text-white";
                  if (isAnswered) {
                    if (isCorrectAnswer) {
                      optionStyle = "border-green-500 bg-green-950/40 text-green-400 font-extrabold";
                    } else if (isSelected) {
                      optionStyle = "border-red-500 bg-red-955/40 text-red-400";
                    } else {
                      optionStyle = "border-zinc-800 opacity-40 bg-zinc-900";
                    }
                  } else if (isSelected) {
                    optionStyle = "border-yellow-400 bg-yellow-400/5 ring-1 ring-yellow-400";
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => setSelectedOption(optIdx)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 rounded-xl border-2 font-bold flex items-center justify-between transition-all duration-200 ${optionStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswered && isCorrectAnswer && <span className="text-green-400 font-black">✓</span>}
                      {isAnswered && isSelected && !isCorrectAnswer && <span className="text-red-500 font-black">✗</span>}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end gap-3 mt-2">
                {!isAnswered ? (
                  <button
                    onClick={handleAnswer}
                    disabled={selectedOption === null}
                    className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded text-xs font-black uppercase tracking-wider disabled:opacity-40"
                  >
                    Đập Khối
                  </button>
                ) : (
                  <button
                    onClick={resumeGame}
                    className="bg-white hover:bg-zinc-200 text-zinc-900 px-6 py-3 rounded text-xs font-black uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <span>Chạy Tiếp</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          )}

          {gameState === "finished" && (
            /* Finished screen */
            <div className="flex flex-col items-center text-center py-6 gap-6 bg-zinc-800 border-2 border-zinc-700 p-6 rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-yellow-400/10 text-yellow-400 flex items-center justify-center border-2 border-yellow-400/30 animate-pulse">
                <Trophy size={32} />
              </div>
              <div>
                <h4 className="text-2xl font-black italic uppercase tracking-wider text-yellow-400">
                  WORLD CLEAR!
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Chúc mừng bạn đã hoàn thành chặng đua và vượt qua 5 câu hỏi!
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 max-w-sm w-full flex flex-col gap-3">
                <div className="flex justify-between items-center border-b border-zinc-700 pb-2 text-xs">
                  <span className="text-zinc-400 uppercase font-bold">WORLD</span>
                  <span className="font-black text-yellow-400 flex items-center gap-1">
                    <Sparkles size={12} />
                    {ROUNDS[activeRound!].world}: {ROUNDS[activeRound!].name.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 uppercase font-bold">COINS COLLECTED</span>
                  <span className="font-black text-white text-lg">
                    {coinsCount} 🪙
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 uppercase font-bold">SCORE</span>
                  <span className="font-black text-white text-lg">
                    {(score * 1000).toLocaleString()} PTS
                  </span>
                </div>
              </div>

              <div className="flex gap-4 w-full text-xs">
                <button
                  onClick={resetGame}
                  className="flex-1 bg-zinc-750 border border-zinc-650 hover:bg-zinc-700 text-white py-3 rounded font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                >
                  Chọn World Khác
                </button>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
