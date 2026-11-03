import React, { useState } from 'react';
import { Sparkles, ArrowDown, Heart, Star, ShieldAlert } from 'lucide-react';
import {
  HandDrawnHeart,
  HandDrawnStar,
  WashiTape,
  InteractiveCake,
} from './CustomDoodles';
import { ScrapbookPhotoCard } from './ScrapbookPhotoCard';
import { soundManager } from '../utils/audio';
import { fireConfetti } from '../utils/confetti';

interface SectionWelcomeProps {
  onEnter: () => void;
  onTriggerEasterEgg: (msg: string) => void;
  photoUrl?: string;
  onOpenEditor?: () => void;
}

export const SectionWelcome: React.FC<SectionWelcomeProps> = ({
  onEnter,
  onTriggerEasterEgg,
  photoUrl,
  onOpenEditor,
}) => {
  const [starClickCount, setStarClickCount] = useState(0);
  const [cakeLit, setCakeLit] = useState(true);

  const handleStarClick = () => {
    soundManager.playSparkle();
    const nextCount = starClickCount + 1;
    setStarClickCount(nextCount);
    if (nextCount >= 3) {
      onTriggerEasterEgg('ITNA FREE TIME HAI TERE PAAS? 😭');
      setStarClickCount(0);
    } else {
      onTriggerEasterEgg(`✨ Star click count: ${nextCount}/3 (Keep poking!)`);
    }
  };

  const handleHeartClick = () => {
    soundManager.playPop();
    onTriggerEasterEgg('YEH HEART FREE HAI, EMOTIONAL ATTACHMENT ALAG CHIZ HAI. 💀');
  };

  const handleEnterClick = () => {
    soundManager.playSparkle();
    fireConfetti();
    onEnter();
  };

  const handleToggleCake = () => {
    if (cakeLit) {
      soundManager.playCandleBlow();
      setCakeLit(false);
      onTriggerEasterEgg('🎂 Candle blown! Make a birthday wish, Meitrii! ✨');
    } else {
      soundManager.playSparkle();
      setCakeLit(true);
      fireConfetti({ particleCount: 30 });
    }
  };

  return (
    <section
      id="welcome"
      className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 py-12 overflow-hidden bg-[#FFF9F2]"
    >
      {/* Decorative Floating Background Elements */}
      <div className="absolute top-10 left-6 sm:left-16 select-none animate-float-slow">
        <WashiTape color="pink" className="mb-2" />
        <button
          onClick={handleHeartClick}
          className="hover:scale-125 transition-transform cursor-pointer"
          title="Click me!"
        >
          <HandDrawnHeart className="w-10 h-10 text-rose-400 drop-shadow-sm" />
        </button>
      </div>

      <div className="absolute top-14 right-6 sm:right-20 select-none animate-float-slow" style={{ animationDelay: '1.2s' }}>
        <WashiTape color="lavender" className="mb-2" />
        <button
          onClick={handleStarClick}
          className="hover:scale-125 transition-transform cursor-pointer"
          title="Poke the star!"
        >
          <HandDrawnStar className="w-9 h-9 text-amber-300 drop-shadow-sm" />
        </button>
      </div>

      <div className="absolute bottom-16 left-8 sm:left-24 hidden md:block select-none opacity-80">
        <div className="border border-dashed border-[#EBA8BC] bg-[#F8DDE5]/40 rounded-xl p-3 -rotate-3 text-left max-w-[170px]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#786B73] block">Friendship Recipe</span>
          <span className="text-xs font-note text-[#352D32] leading-tight block mt-1">
            • 30% creativity<br />
            • 20% nostalgia<br />
            • 50% bakwaas 💀
          </span>
        </div>
      </div>


      {/* Main Container */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Tiny Official Label */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8E1FA]/80 border border-[#D4C7F5] text-[11px] font-heading font-bold uppercase tracking-wider text-[#352D32] mb-6 shadow-2xs">
          <span>🏷️</span>
          <span>Official Friendship Department™</span>
        </div>

        {/* Interactive Cake Illustration */}
        <div className="mb-6">
          <InteractiveCake lit={cakeLit} onToggleBlow={handleToggleCake} />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-[#352D32] tracking-tight leading-tight">
          HAPPY BIRTHDAY, <span className="text-rose-500 underline decoration-wavy decoration-[#EBA8BC] underline-offset-8">MEITRIII!</span> 🎂
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg md:text-xl font-heading font-medium text-[#786B73] max-w-2xl px-2">
          "An unnecessarily complicated website for an unnecessarily important person."
        </p>

        {/* Small Handwritten Note */}
        <div className="mt-3 relative inline-block">
          <span className="text-xl sm:text-2xl font-note text-rose-600 font-bold -rotate-1 inline-block bg-[#F8DDE5]/40 px-3 py-1 rounded-md">
            ~ Made by your favourite idiot. Hopefully. ✍️
          </span>
        </div>

        {/* PHOTO 1: Homepage Birthday Portrait of Meitrii */}
        <div className="mt-6 w-full max-w-xs sm:max-w-sm mx-auto">
          <ScrapbookPhotoCard
            photoUrl={photoUrl}
            slotLabel="Homepage — Meitrii"
            caption="The birthday girl herself. ✨"
            subcaption="Official Birthday Portrait"
            rotation="-rotate-2"
            tapeColor="pink"
            aspectRatio="4/5"
            onOpenEditor={onOpenEditor}
          />
        </div>

        {/* Prominent CTA Button */}
        <div className="mt-8 flex flex-col items-center">
          <button
            onClick={handleEnterClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#352D32] hover:bg-[#4A3F46] text-[#FFF9F2] text-base sm:text-lg font-heading font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <span>ENTER AT YOUR OWN RISK</span>
            <span className="text-xl group-hover:translate-x-1.5 transition-transform">→</span>
          </button>

          {/* Warning Disclaimer */}
          <div className="mt-4 flex items-center gap-2 text-xs font-heading text-[#786B73] max-w-md bg-white/60 border border-[#F8DDE5] px-3 py-2 rounded-xl">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              Warning: Contains memories, questionable humour, and unexpected emotional damage.
            </span>
          </div>
        </div>

        {/* Decorative Down Arrow */}
        <div className="mt-10 animate-bounce text-[#EBA8BC]">
          <ArrowDown className="w-5 h-5" />
        </div>
      </div>
    </section>
  );
};
