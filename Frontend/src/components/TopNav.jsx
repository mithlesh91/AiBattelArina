import React from 'react';

export const TopNav = () => {
  return (
    <header className="sticky top-0 z-40 bg-[#090d16]/80 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center">
        <span className="font-semibold text-slate-100 text-[15px] tracking-tight">
          Axiom AI
        </span>
      </div>
    </header>
  );
};

export default TopNav;
