import { User, Cpu, Award, ThumbsUp, Zap, Lightbulb } from 'lucide-react';

const ScoreBadge = ({ score, label }) => {
  let color = "bg-green-500/10 text-green-400 border-green-500/20";
  if (score < 5) color = "bg-red-500/10 text-red-400 border-red-500/20";
  else if (score < 8) color = "bg-amber-500/10 text-amber-400 border-amber-500/20";

  return (
    <div className={`flex flex-col items-center justify-center py-2.5 px-4 rounded-xl border ${color} backdrop-blur-sm transition-all hover:scale-105 hover:shadow-lg`}>
      <span className="text-[10px] uppercase font-bold tracking-widest opacity-80 mb-0.5">{label}</span>
      <div className="flex items-baseline gap-0.5">
        <span className="text-3xl font-black tracking-tighter">{score}</span>
        <span className="text-xs font-medium opacity-60">/10</span>
      </div>
    </div>
  );
}

const MessageItem = ({ message }) => {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex items-start gap-4 flex-row-reverse group animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0 border border-blue-400/30">
          <User size={18} className="text-white" />
        </div>
        <div className="max-w-[85%] md:max-w-[75%]">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl rounded-tr-none px-6 py-4 shadow-md group-hover:shadow-blue-900/30 transition-all leading-relaxed text-[15px]">
            {message.content}
          </div>
        </div>
      </div>
    );
  }

  if (message.content) {
    return (
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700 flex-shrink-0 mt-1">
          <Cpu size={18} className="text-indigo-400" />
        </div>
        <div className="max-w-[85%] rounded-2xl rounded-tl-none bg-slate-900/80 border border-slate-700/60 px-6 py-4 text-slate-300 leading-relaxed">
          {message.content}
        </div>
      </div>
    );
  }

  const { data } = message;

  return (
    <div className="flex items-start gap-4 group animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700 shadow-lg shadow-slate-900/50 flex-shrink-0 mt-1">
        <Cpu size={18} className="text-indigo-400" />
      </div>
      <div className="w-full max-w-5xl space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Solution 1 */}
          <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700/60 hover:border-indigo-500/30 transition-colors shadow-sm relative overflow-hidden group/sol">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover/sol:bg-indigo-500/10 transition-colors"></div>
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-800/80">
              <div className="p-1.5 rounded-md bg-indigo-500/10 border border-indigo-500/20">
                <Lightbulb size={16} className="text-indigo-400" />
              </div>
              <h3 className="font-semibold text-slate-200 tracking-wide">Solution 1</h3>
            </div>
            <div className="text-slate-300 leading-relaxed text-[15px] whitespace-pre-wrap">
              {data.solution_1}
            </div>
          </div>

          {/* Solution 2 */}
          <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700/60 hover:border-purple-500/30 transition-colors shadow-sm relative overflow-hidden group/sol">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover/sol:bg-purple-500/10 transition-colors"></div>
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-800/80">
              <div className="p-1.5 rounded-md bg-purple-500/10 border border-purple-500/20">
                <Zap size={16} className="text-purple-400" />
              </div>
              <h3 className="font-semibold text-slate-200 tracking-wide">Solution 2</h3>
            </div>
            <div className="text-slate-300 leading-relaxed text-[15px] whitespace-pre-wrap">
              {data.solution_2}
            </div>
          </div>
        </div>

        {/* Judge Feedback */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-900 rounded-2xl p-1 relative overflow-hidden group/judge shadow-xl shadow-black/20">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-50 group-hover/judge:opacity-100 transition-opacity duration-500"></div>
          <div className="relative bg-slate-950/90 backdrop-blur-xl rounded-xl p-6 md:p-8 h-full border border-slate-800/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
                <Award size={22} className="text-indigo-400" />
              </div>
              <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 text-xl tracking-tight">Judge's Verdict</h3>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex gap-4 w-full md:w-auto shrink-0 justify-center">
                <ScoreBadge score={data.judge.solution_1_score} label="Score 1" />
                <ScoreBadge score={data.judge.solution_2_score} label="Score 2" />
              </div>
              
              <div className="flex-1 bg-slate-900/60 rounded-xl p-5 text-slate-300 border border-slate-800/80 text-[15px] leading-relaxed relative w-full group-hover/judge:border-indigo-500/20 transition-colors">
                <div className="absolute top-6 left-0 -ml-1.5 w-3 h-3 bg-slate-900 border-l border-b border-slate-800/80 rotate-45 hidden md:block group-hover/judge:border-indigo-500/20 transition-colors"></div>
                <div className="flex gap-3">
                  <ThumbsUp size={18} className="shrink-0 text-indigo-400 mt-0.5" />
                  <p>{data.judge.both_solution_feedback}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
