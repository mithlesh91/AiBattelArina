import React, { useState, useRef, useEffect } from 'react';
import { initialMessages, quickPrompts } from './data/initialData';
import { generateArenaResponse } from './services/aiSimulator';
import { ChatMessageTurn } from './components/ChatMessageTurn';
import { ChatInput } from './components/ChatInput';
import { TopNav } from './components/TopNav';
import { 
  Code2, 
  X, 
  Copy, 
  Check, 
  Sparkles, 
  Layers
} from 'lucide-react';

export const App = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (problemText) => {
    if (!problemText || isLoading) return;

    setIsLoading(true);

    try {
      const responseData = await generateArenaResponse(problemText);
      const newTurn = {
        id: `msg-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ...responseData
      };

      setMessages((prev) => [...prev, newTurn]);
    } catch (error) {
      console.error('Failed to generate response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages(initialMessages);
  };

  const handleExportJson = () => {
    const exportData = messages.map((m) => ({
      problem: m.problem,
      solution_1: m.solution_1,
      solution_2: m.solution_2,
      judge: {
        solution_1_score: m.judge.solution_1_score,
        solution_2_score: m.judge.solution_2_score,
        solution_1_FeedBack: m.judge.solution_1_FeedBack,
        solution_2_FeedBack: m.judge.solution_2_FeedBack
      }
    }));

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-arena-evaluations-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyJson = () => {
    const exportData = messages.map((m) => ({
      problem: m.problem,
      solution_1: m.solution_1,
      solution_2: m.solution_2,
      judge: {
        solution_1_score: m.judge.solution_1_score,
        solution_2_score: m.judge.solution_2_score,
        solution_1_FeedBack: m.judge.solution_1_FeedBack,
        solution_2_FeedBack: m.judge.solution_2_FeedBack
      }
    }));
    navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 selection:bg-violet-500/30 selection:text-violet-200">
      {/* Background Ambient Radial Glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.12),rgba(255,255,255,0))]" />

      {/* Top Header */}
      <TopNav />

      {/* Main Content Workspace */}
      <main className="relative flex-1 w-full max-w-6xl mx-auto px-6 pt-8 pb-44">
        {/* Intro / Banner Strip with ample breathing room */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08]">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2.5">
              Dual Solution AI Evaluation
              <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300">
                v2.0
              </span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
              Explore two concurrent architectural solutions evaluated with score differentials and judge recommendations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500 hidden sm:inline">
              Desktop Arena • High Precision
            </span>
          </div>
        </div>

        {/* Conversation Thread */}
        <div className="space-y-6">
          {messages.map((message, index) => (
            <ChatMessageTurn
              key={message.id || index}
              message={message}
              index={index}
            />
          ))}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Docked High-End Search Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        quickPrompts={quickPrompts}
        onSelectQuickPrompt={handleSendMessage}
      />

      {/* Raw Schema Inspector Modal */}
      {showJsonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0e1422] rounded-2xl border border-white/10 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-violet-400" />
                <h3 className="font-semibold text-slate-100 text-sm">
                  Active Conversation Data Schema
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyJson}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-xs flex items-center gap-1 font-mono"
                >
                  {copiedJson ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowJsonModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 overflow-y-auto flex-1 font-mono text-xs text-slate-300 bg-[#070a12]/80">
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(
                  messages.map((m) => ({
                    problem: m.problem,
                    solution_1: m.solution_1,
                    solution_2: m.solution_2,
                    judge: {
                      solution_1_score: m.judge.solution_1_score,
                      solution_2_score: m.judge.solution_2_score,
                      solution_1_FeedBack: m.judge.solution_1_FeedBack,
                      solution_2_FeedBack: m.judge.solution_2_FeedBack
                    }
                  })),
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
