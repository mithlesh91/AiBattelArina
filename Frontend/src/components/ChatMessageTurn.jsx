import React, { useState } from 'react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { Scale, Copy, Check, Sparkles } from 'lucide-react';

export const ChatMessageTurn = ({ message, index }) => {
  const [copiedSol1, setCopiedSol1] = useState(false);
  const [copiedSol2, setCopiedSol2] = useState(false);

  const { problem, solution_1, solution_2, judge } = message;

  const score1 = Number(judge?.solution_1_score || 0);
  const score2 = Number(judge?.solution_2_score || 0);

  let winnerName = 'Tie';
  if (score1 > score2) winnerName = 'Solution 1';
  else if (score2 > score1) winnerName = 'Solution 2';

  const handleCopySol1 = () => {
    navigator.clipboard.writeText(solution_1);
    setCopiedSol1(true);
    setTimeout(() => setCopiedSol1(false), 2000);
  };

  const handleCopySol2 = () => {
    navigator.clipboard.writeText(solution_2);
    setCopiedSol2(true);
    setTimeout(() => setCopiedSol2(false), 2000);
  };

  return (
    <div className="space-y-4 pt-1 pb-10 border-b border-white/[0.06] last:border-0">
      {/* 1. USER QUESTION / PROBLEM - RIGHT SIDE */}
      <div className="flex justify-end w-full">
        <div className="max-w-2xl bg-[#121929] border border-white/10 rounded-2xl rounded-tr-sm px-5 py-3.5 shadow-sm space-y-1.5">
          <div className="flex items-center justify-between gap-4 text-[11px] font-mono text-slate-400 pb-1 border-b border-white/5">
            <span>Question #{index + 1}</span>
            <span>{message.timestamp || 'Just now'}</span>
          </div>
          <p className="text-slate-100 text-sm sm:text-[15px] leading-relaxed font-normal">
            {problem}
          </p>
        </div>
      </div>

      {/* 2. SOLUTIONS SECTION - PURE SOLUTIONS ONLY (NO SCORES, NO FEEDBACK) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/[0.08] rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        {/* Solution 1 */}
        <article className="bg-[#0b101b] p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400"></span>
                <h3 className="font-semibold text-sm text-slate-100">Solution 1</h3>
                <span className="text-xs text-slate-500 font-mono">Approach A</span>
              </div>
              <button
                onClick={handleCopySol1}
                className="p-1 rounded text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
                title="Copy Solution 1"
              >
                {copiedSol1 ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <MarkdownRenderer content={solution_1} />
          </div>
        </article>

        {/* Solution 2 */}
        <article className="bg-[#0b101b] p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <h3 className="font-semibold text-sm text-slate-100">Solution 2</h3>
                <span className="text-xs text-slate-500 font-mono">Approach B</span>
              </div>
              <button
                onClick={handleCopySol2}
                className="p-1 rounded text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
                title="Copy Solution 2"
              >
                {copiedSol2 ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <MarkdownRenderer content={solution_2} />
          </div>
        </article>
      </div>

      {/* 3. JUDGE SECTION - CONTAINS ALL SCORES, FEEDBACK & RECOMMENDATION */}
      <section className="w-full rounded-2xl bg-[#0b101b] border border-white/[0.08] p-6 sm:p-7 space-y-5 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
        {/* Judge Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <Scale className="w-4 h-4 text-slate-400" />
            <h4 className="font-semibold text-sm text-slate-100">Judge Verdict</h4>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-slate-300 font-medium">
              Winner: <span className="text-emerald-400">{winnerName}</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">
              {score1} vs {score2}
            </span>
          </div>
        </div>

        {/* Overall Recommendation */}
        {judge?.recommendation && (
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-slate-400" />
              <span>Recommendation</span>
            </div>
            <p className="text-slate-200 text-sm sm:text-[15px] leading-relaxed">
              {judge.recommendation}
            </p>
          </div>
        )}

        {/* Scores & Feedback for Both Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3.5 border-t border-white/[0.05]">
          {/* Solution 1 Score & Feedback */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-violet-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400"></span>
                Solution 1 Feedback
              </span>
              <span className="text-xs font-mono font-semibold text-violet-300 px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20">
                Score: {score1} / 10
              </span>
            </div>
            <p className="text-xs sm:text-[13px] leading-relaxed text-slate-400">
              {judge?.solution_1_FeedBack || "Structured and architecturally sound."}
            </p>
          </div>

          {/* Solution 2 Score & Feedback */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-cyan-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                Solution 2 Feedback
              </span>
              <span className="text-xs font-mono font-semibold text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                Score: {score2} / 10
              </span>
            </div>
            <p className="text-xs sm:text-[13px] leading-relaxed text-slate-400">
              {judge?.solution_2_FeedBack || "Structured with clear trade-offs."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatMessageTurn;
