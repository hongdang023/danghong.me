"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, ArrowRight, BrainCircuit, ShieldCheck, Zap } from "lucide-react";
import { Quiz3Layer } from "@/data/bookData";

interface Quiz3LayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizData: Quiz3Layer;
  onComplete: () => void;
}

type QuizStep = "intro" | "layer1" | "layer1_grade" | "layer2" | "layer2_grade" | "layer3" | "layer3_grade" | "result";

export default function Quiz3LayerModal({ isOpen, onClose, quizData, onComplete }: Quiz3LayerModalProps) {
  const [currentStep, setCurrentStep] = useState<QuizStep>("intro");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [explanation, setExplanation] = useState("");
  const [stressResponse, setStressResponse] = useState("");
  const [isL1Correct, setIsL1Correct] = useState<boolean | null>(null);

  const resetQuiz = () => {
    setCurrentStep("intro");
    setSelectedOption(null);
    setExplanation("");
    setStressResponse("");
    setIsL1Correct(null);
  };

  const handleL1Submit = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === quizData.layer1.correctAnswer;
    setIsL1Correct(correct);
    setCurrentStep("layer1_grade");
  };

  const renderIntro = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
        <BrainCircuit size={40} className="text-accent" />
      </div>
      <h2 className="text-3xl font-bold mb-4">Thử thách 3 Lớp</h2>
      <p className="text-white/60 mb-10 max-w-md mx-auto leading-relaxed">
        Hệ thống xác thực sư phạm sẽ kiểm tra mức độ thấu hiểu của bạn thông qua: 
        <br/>
        <span className="text-white font-bold">Trực giác → Logic → Ứng biến.</span>
      </p>
      <div className="flex flex-col space-y-3">
        <button 
          onClick={() => setCurrentStep("layer1")}
          className="w-full py-4 bg-accent text-white rounded-xl font-bold uppercase text-[11px] tracking-widest hover:scale-[1.02] transition-all"
        >
          Bắt đầu thử thách
        </button>
        <button 
          onClick={onClose}
          className="w-full py-4 text-white/40 font-bold uppercase text-[11px] tracking-widest hover:text-white transition-colors"
        >
          Để sau
        </button>
      </div>
    </motion.div>
  );

  const renderLayer1 = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full"
    >
      <div className="flex items-center space-x-2 mb-8">
        <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest opacity-50">Lớp 1</div>
        <div className="h-px flex-grow bg-white/10"></div>
        <div className="text-[10px] font-bold uppercase tracking-widest opacity-30">Boundary Check</div>
      </div>
      <h3 className="text-xl font-bold mb-8 leading-snug">{quizData.layer1.question}</h3>
      <div className="space-y-3 mb-10">
        {quizData.layer1.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedOption(idx)}
            className={`w-full p-5 rounded-2xl text-left transition-all border ${
              selectedOption === idx 
                ? "bg-accent/20 border-accent text-white" 
                : "bg-white/5 border-white/5 hover:bg-white/10 text-white/60"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm leading-relaxed">{option}</span>
              {selectedOption === idx && <CheckCircle2 size={18} className="text-accent" />}
            </div>
          </button>
        ))}
      </div>
      <button 
        disabled={selectedOption === null}
        onClick={handleL1Submit}
        className="w-full py-5 bg-white text-black disabled:opacity-30 rounded-2xl font-bold uppercase text-[11px] tracking-widest flex items-center justify-center space-x-2"
      >
        <span>Xác nhận & Tiếp tục</span>
        <ArrowRight size={16} />
      </button>
    </motion.div>
  );

  const renderLayer1Grade = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full"
    >
      <div className={`p-8 rounded-3xl mb-8 ${isL1Correct ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"}`}>
        <div className="flex items-center space-x-4 mb-4">
          {isL1Correct ? <ShieldCheck size={32} className="text-green-500" /> : <AlertCircle size={32} className="text-red-500" />}
          <h3 className={`text-2xl font-bold ${isL1Correct ? "text-green-500" : "text-red-500"}`}>
            {isL1Correct ? "Trực giác chính xác!" : "Cần xem xét lại"}
          </h3>
        </div>
        <p className="text-sm leading-relaxed text-white/80">
          {quizData.layer1.explanation}
        </p>
      </div>

      {isL1Correct ? (
        <button 
          onClick={() => setCurrentStep("layer2")}
          className="w-full py-5 bg-accent text-white rounded-2xl font-bold uppercase text-[11px] tracking-widest flex items-center justify-center space-x-2 shadow-lg shadow-accent/20"
        >
          <span>Tiến vào Lớp 2 (Causal Logic)</span>
          <ArrowRight size={16} />
        </button>
      ) : (
        <button 
          onClick={() => {
            onClose();
            resetQuiz();
          }}
          className="w-full py-5 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold uppercase text-[11px] tracking-widest flex items-center justify-center space-x-2"
        >
          <span>Đóng và Đọc lại tài liệu</span>
          <X size={16} />
        </button>
      )}
    </motion.div>
  );

  const renderLayer2 = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full"
    >
      <div className="flex items-center space-x-2 mb-8">
        <div className="px-3 py-1 bg-accent/20 text-accent rounded-full text-[10px] font-bold uppercase tracking-widest">Lớp 2</div>
        <div className="h-px flex-grow bg-white/10"></div>
        <div className="text-[10px] font-bold uppercase tracking-widest opacity-30">Causal Logic</div>
      </div>
      <h3 className="text-xl font-bold mb-2 leading-snug">Giải thích lựa chọn của bạn</h3>
      <p className="text-sm text-white/40 mb-8">{quizData.layer2.prompt}</p>
      
      <textarea
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
        className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-sm leading-relaxed focus:ring-1 focus:ring-accent focus:border-accent outline-none mb-10 resize-none"
        placeholder="Viết logic của bạn tại đây (ít nhất 20 từ)..."
      />

      <button 
        disabled={explanation.length < 20}
        onClick={() => setCurrentStep("layer2_grade")}
        className="w-full py-5 bg-white text-black disabled:opacity-30 rounded-2xl font-bold uppercase text-[11px] tracking-widest flex items-center justify-center space-x-2"
      >
        <span>Phân tích Logic</span>
        <ArrowRight size={16} />
      </button>
    </motion.div>
  );

  const renderLayer2Grade = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full"
    >
      <h3 className="text-xl font-bold mb-6">Đối chiếu Logic (Self-Evaluation)</h3>
      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8">
        <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-2">Logic Kỳ Vọng (Chuyên gia)</h4>
        <p className="text-sm leading-relaxed mb-6 text-accent">{quizData.layer2.expectedLogic}</p>
        
        <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-2">Câu trả lời của bạn</h4>
        <p className="text-sm leading-relaxed text-white/60 italic border-l-2 border-white/20 pl-4">{explanation}</p>
      </div>

      <div className="text-center mb-6">
        <p className="text-sm mb-2">Tự đánh giá: Logic của bạn đã xác định đúng <strong className="text-white">Biến số quyết định</strong> chưa?</p>
      </div>

      <div className="flex space-x-4">
        <button 
          onClick={() => setCurrentStep("layer2")}
          className="w-1/2 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-bold uppercase text-[10px] tracking-widest text-white/60 hover:text-white"
        >
          Chưa đạt (Viết lại)
        </button>
        <button 
          onClick={() => setCurrentStep("layer3")}
          className="w-1/2 py-4 bg-accent text-white rounded-xl font-bold uppercase text-[10px] tracking-widest"
        >
          Đạt tiêu chuẩn
        </button>
      </div>
    </motion.div>
  );

  const renderLayer3 = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full"
    >
      <div className="flex items-center space-x-2 mb-8">
        <div className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-[10px] font-bold uppercase tracking-widest">Lớp 3</div>
        <div className="h-px flex-grow bg-white/10"></div>
        <div className="text-[10px] font-bold uppercase tracking-widest opacity-30">Dynamic Stress Test</div>
      </div>
      <h3 className="text-xl font-bold mb-8 leading-snug">{quizData.layer3.question}</h3>
      
      <textarea
        value={stressResponse}
        onChange={(e) => setStressResponse(e.target.value)}
        className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-sm leading-relaxed focus:ring-1 focus:ring-accent focus:border-accent outline-none mb-10 resize-none"
        placeholder="Phản ứng của bạn với kịch bản thay đổi này..."
      />

      <button 
        disabled={stressResponse.length < 20}
        onClick={() => setCurrentStep("layer3_grade")}
        className="w-full py-5 bg-white text-black disabled:opacity-30 rounded-2xl font-bold uppercase text-[11px] tracking-widest flex items-center justify-center space-x-2 shadow-lg shadow-accent/20"
      >
        <span>Phân tích Logic</span>
        <ArrowRight size={16} />
      </button>
    </motion.div>
  );

  const renderLayer3Grade = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full"
    >
      <h3 className="text-xl font-bold mb-6">Đối chiếu Logic (Self-Evaluation)</h3>
      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8">
        <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-2">Logic Kỳ Vọng (Chuyên gia)</h4>
        <p className="text-sm leading-relaxed mb-6 text-yellow-500">{quizData.layer3.expectedLogic}</p>
        
        <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-2">Câu trả lời của bạn</h4>
        <p className="text-sm leading-relaxed text-white/60 italic border-l-2 border-white/20 pl-4">{stressResponse}</p>
      </div>

      <div className="text-center mb-6">
        <p className="text-sm mb-2">Tự đánh giá: Bạn đã nhận diện được sự chuyển hóa (<strong className="text-white">Tipping point</strong>) chưa?</p>
      </div>

      <div className="flex space-x-4">
        <button 
          onClick={() => setCurrentStep("layer3")}
          className="w-1/2 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-bold uppercase text-[10px] tracking-widest text-white/60 hover:text-white"
        >
          Chưa đạt (Viết lại)
        </button>
        <button 
          onClick={() => setCurrentStep("result")}
          className="w-1/2 py-4 bg-yellow-500 text-black rounded-xl font-bold uppercase text-[10px] tracking-widest flex items-center justify-center space-x-2"
        >
          <span>Đạt & Hoàn tất</span>
          <Zap size={14} />
        </button>
      </div>
    </motion.div>
  );

  const renderResult = () => (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center"
    >
      <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ${isL1Correct ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
        {isL1Correct ? <ShieldCheck size={48} /> : <AlertCircle size={48} />}
      </div>
      <h2 className="text-3xl font-bold mb-4">{isL1Correct ? "Xác thực thành công!" : "Cần xem xét lại"}</h2>
      <p className="text-white/60 mb-10 max-w-sm mx-auto leading-relaxed">
        {isL1Correct 
          ? "Bạn đã thể hiện sự thấu hiểu sâu sắc về bản chất của lý thuyết. Hệ thống đã ghi nhận tiến trình của bạn."
          : "Mặc dù logic của bạn rất thú vị, nhưng trực giác ban đầu về Boundary chưa chính xác. Hãy thử đọc lại phần so sánh các thuyết."}
      </p>
      <button 
        onClick={() => {
          if (isL1Correct) onComplete();
          onClose();
          resetQuiz();
        }}
        className="w-full py-5 bg-white text-black rounded-2xl font-bold uppercase text-[11px] tracking-widest"
      >
        {isL1Correct ? "Tiếp tục hành trình" : "Về trang đọc sách"}
      </button>
    </motion.div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
      <div className="absolute top-8 right-8">
        <button 
          onClick={onClose}
          className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all"
        >
          <X size={24} />
        </button>
      </div>

      <div className="bg-[#1e1e1e] border border-white/10 rounded-[40px] p-8 md:p-16 max-w-2xl w-full relative overflow-hidden shadow-2xl">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 blur-[100px] -z-10" />
        
        <AnimatePresence mode="wait">
          {currentStep === "intro" && renderIntro()}
          {currentStep === "layer1" && renderLayer1()}
          {currentStep === "layer1_grade" && renderLayer1Grade()}
          {currentStep === "layer2" && renderLayer2()}
          {currentStep === "layer2_grade" && renderLayer2Grade()}
          {currentStep === "layer3" && renderLayer3()}
          {currentStep === "layer3_grade" && renderLayer3Grade()}
          {currentStep === "result" && renderResult()}
        </AnimatePresence>
      </div>
    </div>
  );
}
