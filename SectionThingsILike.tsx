import React, { useState } from 'react';
import { WashiTape, StampBadge, HandDrawnHeart, HandDrawnStar } from './CustomDoodles';
import { soundManager } from '../utils/audio';
import { fireConfetti } from '../utils/confetti';
import { Trophy, Sparkles, Heart, Eye, Smile, Award } from 'lucide-react';

import { ScrapbookPhotoCard } from './ScrapbookPhotoCard';

interface SectionThingsILikeProps {
  onTriggerEasterEgg: (msg: string) => void;
  photoUrl?: string;
  onOpenEditor?: () => void;
}

export const SectionThingsILike: React.FC<SectionThingsILikeProps> = ({
  onTriggerEasterEgg,
  photoUrl,
  onOpenEditor,
}) => {
  const [stage1Choice, setStage1Choice] = useState<string | null>(null);
  const [showRealAnswer, setShowRealAnswer] = useState(false);

  const handleStage1Click = (option: string) => {
    soundManager.playPop();
    setStage1Choice(option);
  };

  const handleRevealReal = () => {
    soundManager.playSparkle();
    fireConfetti({ particleCount: 45 });
    setShowRealAnswer(true);
  };

  return (
    <section id="things-i-like" className="py-20 px-4 max-w-4xl mx-auto scroll-mt-20">
      {/* Chapter Marker */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-xs font-heading font-bold text-[#EBA8BC] uppercase tracking-widest bg-[#F8DDE5]/60 px-3 py-1 rounded-full border border-[#EBA8BC]/40">
          Chapter 04 • Unbiased Review
        </span>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#352D32]">
          WHAT DO I LIKE ABOUT YOU? ❤️
        </h2>
        <p className="mt-2 text-base sm:text-lg font-heading text-[#786B73]">
          Please prepare yourself for a completely unbiased review.
        </p>
      </div>

      <div className="relative bg-[#FFF9F2] border-2 border-[#EBA8BC] rounded-3xl p-6 sm:p-10 shadow-lg">
        {/* Top Washi Tapes */}
        <div className="absolute -top-3 left-8">
          <WashiTape color="pink" />
        </div>
        <div className="absolute -top-3 right-8">
          <WashiTape color="peach" />
        </div>

        {/* ================= STAGE 1: AISE HI ================= */}
        <div className="bg-white/80 border border-[#F8DDE5] rounded-2xl p-6 mb-8 text-center shadow-xs">
          <div className="inline-block px-3 py-1 bg-[#F8DDE5] text-rose-700 text-xs font-heading font-bold rounded-full mb-3">
            STAGE 1: PICK THE OBVIOUS ANSWER 💅
          </div>
          <p className="font-heading font-medium text-sm text-[#786B73] mb-4">
            Select what you think makes you so remarkably toleratable:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleStage1Click('eyes')}
              className={`px-4 py-2.5 rounded-xl border-2 font-heading font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                stage1Choice === 'eyes'
                  ? 'bg-rose-500 border-rose-600 text-white scale-105'
                  : 'bg-[#FFF9F2] border-[#EBA8BC] text-[#352D32] hover:bg-[#F8DDE5]'
              }`}
            >
              <Eye className="w-4 h-4 text-rose-400" />
              <span>YOUR PRETTY EYES 👀</span>
            </button>

            <button
              onClick={() => handleStage1Click('face')}
              className={`px-4 py-2.5 rounded-xl border-2 font-heading font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                stage1Choice === 'face'
                  ? 'bg-rose-500 border-rose-600 text-white scale-105'
                  : 'bg-[#FFF9F2] border-[#EBA8BC] text-[#352D32] hover:bg-[#F8DDE5]'
              }`}
            >
              <Smile className="w-4 h-4 text-amber-400" />
              <span>YOUR PRETTY FACE ✨</span>
            </button>

            <button
              onClick={() => handleStage1Click('beauty')}
              className={`px-4 py-2.5 rounded-xl border-2 font-heading font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                stage1Choice === 'beauty'
                  ? 'bg-rose-500 border-rose-600 text-white scale-105'
                  : 'bg-[#FFF9F2] border-[#EBA8BC] text-[#352D32] hover:bg-[#F8DDE5]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>YOUR AMAZING BEAUTY 💅</span>
            </button>
          </div>

          {/* Stage 1 Playful Reveal */}
          {stage1Choice && (
            <div className="mt-5 p-4 bg-[#F8DDE5]/70 border border-rose-300 rounded-2xl animate-in fade-in zoom-in-95 max-w-lg mx-auto">
              <p className="font-heading font-extrabold text-base sm:text-lg text-rose-600">
                ABEY CHAL BHAI. 💀🙏 AISA KUCH NAHI HAI.
              </p>
              <p className="text-xs sm:text-sm font-heading font-medium text-[#786B73] mt-1">
                Okay, maybe thoda sa. BUT THAT'S NOT THE POINT.
              </p>
              {!showRealAnswer && (
                <button
                  onClick={handleRevealReal}
                  className="mt-3 px-5 py-2 rounded-xl bg-[#352D32] text-white hover:bg-[#4A3F46] font-heading font-bold text-xs shadow-md transition-all cursor-pointer hover:scale-105"
                >
                  CLICK HERE FOR THE REAL ANSWER →
                </button>
              )}
            </div>
          )}
        </div>

        {/* ================= STAGE 2: THE REAL ANSWER ================= */}
        {showRealAnswer && (
          <div className="bg-gradient-to-br from-[#FFF9F2] via-white to-[#F8DDE5]/30 border-2 border-rose-300 rounded-3xl p-6 sm:p-8 paper-shadow animate-in fade-in slide-in-from-bottom-4 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#F8DDE5]">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
                <HandDrawnHeart className="w-4 h-4 text-rose-500" />
                The Real, Unfiltered Reason
              </span>
              <StampBadge text="SINCERE TRUTH" subtext="NO BAKWAAS" rotate="rotate-1" />
            </div>

            {/* Stage 2 Content: Grid with Story Text and PHOTO 4 Solo Portrait */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-7 text-sm sm:text-base text-[#352D32] leading-relaxed space-y-3 font-body">
                <p>
                  Jab hum sab saath hote hain na, kabhi-kabhi mujhe samajh nahi aata ki main grp mein properly include kyun nahi ho paata.
                </p>
                <p className="italic text-[#786B73]">
                  Aur honestly, yeh baat maine shayad kisi ko batayi bhi nahi hai.
                </p>

                <div className="py-2">
                  <p className="text-2xl sm:text-3xl font-heading font-black text-rose-600 tracking-tight">
                    But TU.
                  </p>
                </div>

                <p>
                  Tu mujhe include feel karwati hai.
                </p>
                <p>
                  Tu mujhse baat karti hai, mujhe conversations mein laati hai, aur somehow mujhe aisa feel nahi hone deti ki main bas wahaan khada hua extra character hoon. 😭
                </p>

                <p className="font-heading font-bold text-base text-rose-600 bg-rose-50 border-l-4 border-rose-400 p-3 rounded-r-xl">
                  AND THAT MEANS A LOT TO ME.
                </p>
              </div>

              {/* PHOTO 4: Appreciation Portrait Card */}
              <div className="md:col-span-5 flex justify-center">
                <div className="w-full max-w-[280px]">
                  <ScrapbookPhotoCard
                    photoUrl={photoUrl}
                    slotLabel="Appreciation Section — Meitrii"
                    caption="The One Who Includes Everyone ✨"
                    subcaption="Unbiased Review • Gold Standard"
                    rotation="rotate-1"
                    tapeColor="pink"
                    aspectRatio="4/5"
                    onOpenEditor={onOpenEditor}
                  />
                </div>
              </div>
            </div>

              <p>
                Because including someone might seem like a small thing to you, but for the person who feels left out, it can mean everything.
              </p>
              <p className="text-[#786B73]">
                You probably do it without even thinking about it.
              </p>
              <p className="font-semibold text-[#352D32]">
                But that's exactly what makes you special.
              </p>

              {/* CRITICAL MEMORABLE LINE TO EMPHASISE */}
              <div className="my-6 p-6 sm:p-8 bg-gradient-to-r from-[#F8DDE5] via-[#FFF9F2] to-[#E8E1FA] border-2 border-[#EBA8BC] rounded-3xl text-center shadow-md relative overflow-hidden group">
                <div className="absolute top-2 left-3">
                  <HandDrawnStar className="w-5 h-5 text-amber-400" />
                </div>
                <div className="absolute bottom-2 right-3">
                  <HandDrawnHeart className="w-5 h-5 text-rose-400" />
                </div>
                <span className="text-[11px] font-heading uppercase tracking-widest text-rose-500 font-bold block mb-2">
                  ✨ The Superpower You Have ✨
                </span>
                <p className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-[#352D32] tracking-tight leading-snug drop-shadow-xs">
                  "YOU MAKE PEOPLE FEEL LIKE THEY BELONG."
                </p>
                <span className="mt-2 text-xs font-note text-rose-600 font-bold block">
                  (And you don't even realise how rare that is)
                </span>
              </div>

              <p>
                And yaar, that's genuinely one of the nicest qualities a person can have.
              </p>

              {/* Achievement Card */}
              <div className="mt-6 p-5 bg-[#FFF9F2] border-2 border-dashed border-amber-300 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="p-3 bg-amber-100 rounded-2xl text-amber-600 shrink-0 shadow-xs">
                  <Trophy className="w-8 h-8 animate-bounce" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-heading font-bold uppercase tracking-wider text-amber-700">
                    🏆 Achievement Officially Unlocked
                  </div>
                  <h4 className="text-base sm:text-lg font-heading font-extrabold text-[#352D32]">
                    'MAKES PEOPLE FEEL INCLUDED WITHOUT EVEN REALISING IT.'
                  </h4>
                  <p className="text-xs text-[#786B73] font-medium">
                    Reward: One emotionally attached idiot who will probably keep annoying you for the foreseeable future.
                  </p>
                  <p className="text-[11px] font-heading font-bold text-rose-500">
                    Non-refundable. No cancellation policy. 💀❤️
                  </p>
                </div>
              </div>
            </div>
        )}
      </div>
    </section>
  );
};
