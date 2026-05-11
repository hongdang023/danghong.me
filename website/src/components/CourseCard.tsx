"use client";

import React, { useState, useEffect } from "react";
import { Course } from "@/data/courseData";
import { Heart, MessageSquare, ExternalLink, BookOpen, Send } from "lucide-react";

interface Comment {
  id: string;
  text: string;
  timestamp: number;
}

export function CourseCard({ course }: { course: Course }) {
  const [votes, setVotes] = useState<number>(0);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedVotes = localStorage.getItem(`course_votes_${course.id}`);
    const savedHasVoted = localStorage.getItem(`course_hasVoted_${course.id}`);
    const savedComments = localStorage.getItem(`course_comments_${course.id}`);

    if (savedVotes) setVotes(parseInt(savedVotes, 10));
    if (savedHasVoted) setHasVoted(savedHasVoted === "true");
    if (savedComments) setComments(JSON.parse(savedComments));
  }, [course.id]);

  const handleVote = () => {
    const newHasVoted = !hasVoted;
    const newVotes = hasVoted ? Math.max(0, votes - 1) : votes + 1;
    
    setHasVoted(newHasVoted);
    setVotes(newVotes);
    
    localStorage.setItem(`course_hasVoted_${course.id}`, String(newHasVoted));
    localStorage.setItem(`course_votes_${course.id}`, String(newVotes));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentObj: Comment = {
      id: Date.now().toString(),
      text: newComment.trim(),
      timestamp: Date.now(),
    };

    const updatedComments = [...comments, commentObj];
    setComments(updatedComments);
    setNewComment("");
    
    localStorage.setItem(`course_comments_${course.id}`, JSON.stringify(updatedComments));
  };

  return (
    <div className="bg-background border-thin border-border-custom rounded-xl p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
        <div className="flex-grow">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent opacity-80">
              {course.provider}
            </span>
          </div>
          <h3 className="text-xl font-bold tracking-tight mb-3">
            {course.name}
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {course.tags.map(tag => (
              <span 
                key={tag} 
                className="px-2.5 py-1 bg-secondary/50 rounded-md text-[11px] font-mono font-medium opacity-80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Vote Button - YC Style / Heart */}
        <button 
          onClick={handleVote}
          className={`flex-shrink-0 flex flex-col items-center justify-center w-12 h-14 rounded-lg border-thin transition-all ${
            hasVoted 
              ? 'bg-accent/10 border-accent text-accent' 
              : 'bg-secondary/30 border-border-custom hover:bg-secondary'
          }`}
        >
          <Heart 
            size={16} 
            strokeWidth={2.5} 
            className={hasVoted ? 'text-accent fill-accent' : 'opacity-50'} 
          />
          <span className="text-xs font-bold mt-1">{votes}</span>
        </button>
      </div>

      <div className="flex items-center justify-between pt-4 border-t-thin border-border-custom">
        <div className="flex space-x-3">
          {course.reviewUrl && (
            <a 
              href={course.reviewUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-xs font-bold opacity-60 hover:opacity-100 hover:text-accent transition-colors"
            >
              <BookOpen size={14} />
              <span>Đọc Review</span>
            </a>
          )}
          {course.courseUrl && (
            <a 
              href={course.courseUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-xs font-bold opacity-60 hover:opacity-100 hover:text-accent transition-colors"
            >
              <ExternalLink size={14} />
              <span>Khóa học</span>
            </a>
          )}
        </div>

        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-1.5 text-xs font-bold opacity-60 hover:opacity-100 transition-colors"
        >
          <MessageSquare size={14} />
          <span>{comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-6 pt-6 border-t-thin border-border-custom animate-in fade-in slide-in-from-top-2">
          <h4 className="text-sm font-bold mb-4 tracking-tight">Thảo luận</h4>
          
          <div className="space-y-4 mb-4 max-h-[300px] overflow-y-auto pr-2">
            {comments.length === 0 ? (
              <p className="text-sm italic opacity-40 text-center py-4">Chưa có bình luận nào. Hãy là người đầu tiên!</p>
            ) : (
              comments.map(comment => (
                <div key={comment.id} className="bg-secondary/20 rounded-lg p-3 border-thin border-border-custom">
                  <p className="text-sm opacity-80">{comment.text}</p>
                  <span className="text-[10px] opacity-40 mt-2 block">
                    {new Date(comment.timestamp).toLocaleString('vi-VN')}
                  </span>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleAddComment} className="flex space-x-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Thêm bình luận của bạn..."
              className="flex-grow bg-secondary/30 border-thin border-border-custom rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
            />
            <button 
              type="submit"
              disabled={!newComment.trim()}
              className="bg-foreground text-background p-2 rounded-lg disabled:opacity-50 transition-opacity hover:bg-accent"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
