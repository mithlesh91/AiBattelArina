import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';

const MessageInput = ({ onSendMessage, disabled }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [text]);

  const handleKeyDown = (e) => {


    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const question = text.trim();
    if (!question || disabled) return;

    onSendMessage(question);
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  return (
    <div className="relative group max-w-5xl mx-auto w-full">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/50 via-indigo-500/50 to-purple-500/50 rounded-2xl blur-lg opacity-20 group-focus-within:opacity-50 transition duration-500"></div>
      <div className="relative flex items-end gap-3 bg-slate-900/90 rounded-2xl border border-slate-700/80 p-2.5 shadow-2xl backdrop-blur-xl transition-all group-focus-within:border-indigo-500/50">
        <div className="p-3 pl-4 flex items-center justify-center text-slate-500 shrink-0">
          <Sparkles size={22} className="group-focus-within:text-indigo-400 transition-colors duration-300" />
        </div>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question to see competing solutions..."
          disabled={disabled}
          className="flex-1 max-h-[200px] bg-transparent text-slate-100 placeholder-slate-500 border-none outline-none resize-none py-3.5 px-1 text-[15px] md:text-base disabled:opacity-50 font-medium leading-relaxed"
          rows={1}
        />
        <button
          onClick={handleSubmit}
          disabled={!text.trim() || disabled}
          className="p-3.5 mb-1 mr-1 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:from-indigo-400 hover:to-purple-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 transition-all flex items-center justify-center shadow-lg shadow-indigo-500/20 disabled:shadow-none hover:shadow-indigo-500/40 shrink-0 transform active:scale-95 disabled:active:scale-100"
        >
          <Send size={18} className={text.trim() && !disabled ? "translate-x-0.5 -translate-y-0.5 transition-transform" : "transition-transform"} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
