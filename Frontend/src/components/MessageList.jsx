import { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';

const MessageList = ({ messages, isTyping }) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8 scroll-smooth">
      <div className="max-w-5xl mx-auto space-y-8 pb-4">
        {messages.map((msg, index) => (
          <MessageItem key={index} message={msg} />
        ))}
        {isTyping && (
          <div className="flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center border border-indigo-500/30 shadow-lg shadow-indigo-500/10 flex-shrink-0 mt-1">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium text-indigo-300">AI Judges are evaluating...</div>
              <div className="bg-slate-800/40 rounded-2xl rounded-tl-none p-4 w-64 h-24 border border-slate-700/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                <div className="space-y-3">
                  <div className="h-2 bg-slate-700/50 rounded w-3/4"></div>
                  <div className="h-2 bg-slate-700/50 rounded w-full"></div>
                  <div className="h-2 bg-slate-700/50 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
};

export default MessageList;
