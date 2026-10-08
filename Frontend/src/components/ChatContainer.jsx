import { useState } from 'react';
import axios from 'axios';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setIsTyping(true);

    try {
      const response = await axios.post('http://localhost:3000/ask', {
        question: text,
      });
      const result = response.data?.answer ?? response.data?.result;
      const judge = result?.judge;

      if (
        typeof result?.solution_1 !== 'string' ||
        typeof result?.solution_2 !== 'string' ||
        !judge
      ) {
        throw new Error('The server returned an unexpected response.');
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          data: {
            solution_1: result.solution_1,
            solution_2: result.solution_2,
            judge: {
              solution_1_score: judge.solution_1_score,
              solution_2_score: judge.solution_2_score,
              both_solution_feedback:
                judge.solution_FeedBack ?? judge.both_solution_feedback ?? '',
            },
          },
        },
      ]);
    } catch (error) {
      console.error('Error getting response from the server:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Could not get a valid response from the server. Check that the backend is running and try again.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-100 font-sans">
      <header className="px-6 py-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-lg sticky top-0 z-10 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="font-bold text-white text-lg leading-none">A</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">AI Battle Arena</h1>
            <p className="text-xs text-slate-400 font-medium tracking-wide">Compare Solutions & Judge Recommendations</p>
          </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden relative flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        <MessageList messages={messages} isTyping={isTyping} />
      </main>

      <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800/60 z-10">
        <div className="max-w-4xl mx-auto">
          <MessageInput onSendMessage={handleSendMessage} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
