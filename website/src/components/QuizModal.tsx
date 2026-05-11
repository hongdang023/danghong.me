"use client";

import React, { useState } from "react";
import { X, CheckCircle2, AlertCircle, ChevronRight, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LDChapter } from "@/data/bookData";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapter: LDChapter;
  onSuccess: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  chapter,
  onSuccess,
}) => {
  const [step, setStep] = useState<"outcomes" | "quiz" | "result">("outcomes");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  if (!isOpen) return null;

  const currentQuestion = chapter.quiz[currentQuestionIdx];

  const handleAnswer = (idx: number) => {
    setSelectedOption(idx);
    const correct = idx === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    setTimeout(() => {
      if (correct) {
        if (currentQuestionIdx < chapter.quiz.length - 1) {
          setCurrentQuestionIdx(prev => prev + 1);
          setSelectedOption(null);
          setIsCorrect(null);
        } else {
          setStep("result");
          onSuccess();
        }
      }
    }, 1000);
  };

  const reset = () => {
    setStep("outcomes");
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-xl bg-background border-thin border-border-custom rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b-thin border-border-custom flex justify-between items-center bg-secondary/30">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Chapter {chapter.chapterNumber}</span>
            <h3 className="text-sm font-black tracking-tight">{chapter.title}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {step === "outcomes" && (
              <motion.div
                key="outcomes"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3 text-accent mb-6">
                  <Target size={24} />
                  <h2 className="text-xl font-black tracking-tight">ABCD Learning Objectives</h2>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: "Audience (Người học)", val: chapter.outcomes.audience },
                    { label: "Behavior (Hành vi)", val: chapter.outcomes.behavior },
                    { label: "Condition (Điều kiện)", val: chapter.outcomes.condition },
                    { label: "Degree (Mức độ)", val: chapter.outcomes.degree },
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-secondary/50 rounded-2xl border-thin border-border-custom/50">
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 block mb-1">{item.label}</span>
                      <p className="text-sm font-bold tracking-tight">{item.val}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setStep("quiz")}
                  className="w-full py-4 bg-foreground text-background rounded-2xl font-black tracking-tight hover:scale-[1.02] transition-transform flex items-center justify-center space-x-2"
                >
                  <span>Bắt đầu Quiz</span>
                  <ChevronRight size={18} />
                </button>
              </motion.div>
            )}

            {step === "quiz" && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Câu hỏi {currentQuestionIdx + 1}/{chapter.quiz.length}</span>
                  <h2 className="text-xl font-bold tracking-tight leading-tight">{currentQuestion.question}</h2>
                </div>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={selectedOption !== null}
                      className={`w-full p-5 rounded-2xl border-thin text-left transition-all duration-300 flex justify-between items-center ${
                        selectedOption === idx
                          ? isCorrect 
                            ? "border-green-500 bg-green-500/10 text-green-700" 
                            : "border-red-500 bg-red-500/10 text-red-700"
                          : "border-border-custom hover:border-accent bg-secondary/30"
                      }`}
                    >
                      <span className="text-sm font-medium">{option}</span>
                      {selectedOption === idx && (
                        isCorrect ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="inline-flex p-6 bg-green-500/10 rounded-full text-green-600 mb-4">
                  <CheckCircle2 size={64} />
                </div>
                <h2 className="text-3xl font-black tracking-tight">Tuyệt vời!</h2>
                <p className="text-sm opacity-60 max-w-xs mx-auto">Bạn đã nắm vững kiến thức chương này và mở khóa thử thách tiếp theo.</p>
                
                <button
                  onClick={onClose}
                  className="px-8 py-4 bg-foreground text-background rounded-full font-black tracking-tight hover:scale-105 transition-transform"
                >
                  Tiếp tục hành trình
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
