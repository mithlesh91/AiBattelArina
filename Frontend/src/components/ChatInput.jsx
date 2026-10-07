import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Loader2, Sparkles, CornerDownLeft, Search } from 'lucide-react';

export const ChatInput = ({ onSendMessage, isLoading, quickPrompts = [], onSelectQuickPrompt }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [input]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <footer className="fixed bottom-0 inset-x-0 pb-6 pointer-events-none z-30">
      <div className="max-w-4xl mx-auto px-5 pointer-events-auto space-y-3">
        {/* Quick Suggestion Chips */}
        {quickPrompts.length > 0 && !isLoading && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none [scrollbar-width:none]">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1.5 pl-1">
              <Sparkles className="w-3 h-3 text-violet-400" />
              Suggested:
            </span>
            {quickPrompts.slice(0, 3).map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onSelectQuickPrompt(prompt)}
                className="shrink-0 text-xs px-3.5 py-1.5 rounded-full bg-[#111726]/80 hover:bg-[#161f33] border border-white/10 hover:border-violet-500/40 text-slate-300 hover:text-white transition-all shadow-sm cursor-pointer truncate max-w-[320px] backdrop-blur-md active:scale-98"
                title={prompt}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Loading Telemetry Pill */}
        {isLoading && (
          <div className="flex items-center justify-center gap-2.5 py-2 px-4 rounded-xl bg-[#111726]/95 border border-violet-500/30 text-slate-200 text-xs font-mono shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-xl animate-in fade-in duration-200">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-violet-400" />
            <span className="text-violet-300">Generating Solution 1 & 2 • Evaluating with LLM Judge...</span>
          </div>
        )}

        {/* High-End Dark Search / Prompt Dock */}
        <div className="relative group">
          {/* Subtle Ambient Glow behind input dock */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600/20 to-cyan-500/20 rounded-2xl blur-sm opacity-60 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <form
            onSubmit={handleSubmit}
            className="relative bg-[#0d1322]/95 backdrop-blur-2xl rounded-2xl p-2.5 sm:p-3 border border-white/10 group-focus-within:border-violet-500/50 shadow-[0_16px_40px_rgba(0,0,0,0.6)] flex items-end gap-3 transition-all duration-200"
          >
            {/* Search / AI Glyph */}
            <div className="pl-2 pb-2 text-slate-500 group-focus-within:text-violet-400 transition-colors">
              <Search className="w-4 h-4" />
            </div>

            {/* Input Textarea */}
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder="Ask any technical or architectural question to generate dual solutions..."
                className="w-full bg-transparent border-0 resize-none outline-none text-slate-100 placeholder:text-slate-500 text-sm leading-relaxed py-1 px-1 focus:ring-0 max-h-[180px] disabled:opacity-50 caret-violet-400 font-sans"
              />
            </div>

            {/* Right Command Actions */}
            <div className="flex items-center gap-2 pb-0.5 pr-1 shrink-0">
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 select-none px-2 py-1 rounded bg-white/5 border border-white/5">
                <span>Enter</span>
                <CornerDownLeft className="w-3 h-3 text-slate-400" />
              </span>

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 disabled:from-slate-800 disabled:to-slate-800 text-white disabled:text-slate-600 flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed shadow-[0_0_16px_rgba(139,92,246,0.3)] disabled:shadow-none active:scale-95 shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <ArrowUp className="w-4 h-4 text-white" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default ChatInput;
