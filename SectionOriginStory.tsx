import React, { useState } from 'react';
import {
  WashiTape,
  StampBadge,
  ClassroomBenchIllustration,
  HandDrawnStar,
} from './CustomDoodles';
import { soundManager } from '../utils/audio';
import { BookMarked, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';

import { ScrapbookPhotoCard } from './ScrapbookPhotoCard';

interface SectionOriginStoryProps {
  onTriggerEasterEgg: (msg: string) => void;
  photoUrl?: string;
  onOpenEditor?: () => void;
}

export const SectionOriginStory: React.FC<SectionOriginStoryProps> = ({
  onTriggerEasterEgg,
  photoUrl,
  onOpenEditor,
}) => {
  const [showRememberFact, setShowRememberFact] = useState(false);
  const [showReceipts, setShowReceipts] = useState(false);

  const handleRememberClick = () => {
    soundManager.playPop();
    setShowRememberFact(!showRememberFact);
  };

  const handleReceiptsClick = () => {
    soundManager.playPop();
    setShowReceipts(!showReceipts);
  };

  const handleBookClick = () => {
    soundManager.playPop();
    onTriggerEasterEgg('PADHNE KE LIYE KHOLA THA YA GOSSIP KE LIYE? 📚💀');
  };

  return (
    <section id="origin" className="py-20 px-4 max-w-4xl mx-auto scroll-mt-20">
      {/* Chapter Marker */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-xs font-heading font-bold text-[#EBA8BC] uppercase tracking-widest bg-[#F8DDE5]/60 px-3 py-1 rounded-full border border-[#EBA8BC]/40">
          Chapter 02 • The Origin Story
        </span>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#352D32]">
          HOW DID WE GET HERE? 🏫
        </h2>
        <p className="mt-2 text-base sm:text-lg font-heading text-[#786B73]">
          The origin story nobody asked for, but somebody had to document.
        </p>
      </div>

      {/* Scrapbook Board Container */}
      <div className="relative bg-[#FFF9F2] border-2 border-[#EBA8BC] rounded-3xl p-6 sm:p-10 shadow-lg">
        {/* Top washi tape decorations */}
        <div className="absolute -top-3 left-10">
          <WashiTape color="pink" />
        </div>
        <div className="absolute -top-3 right-10">
          <WashiTape color="lavender" />
        </div>

        {/* Header badges in scrapbook style */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 bg-[#F8DDE5] border border-[#EBA8BC] px-3.5 py-1.5 rounded-xl font-heading font-bold text-sm text-[#352D32] shadow-2xs">
            <span className="text-rose-500">📅</span>
            <span>TIMELINE: 7TH</span>
          </div>

          <StampBadge
            text="VERIFIED HISTORICAL EVENT"
            subtext="CONFIDENTIAL BAKWAAS"
            rotate="rotate-2"
          />
        </div>

        {/* Illustrated Classroom with Two Students on Last Bench and Nostalgic Photo */}
        <div className="my-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 p-4 bg-white/70 rounded-2xl border border-[#F8DDE5] relative group">
            <div className="text-center mb-2">
              <span className="text-xs font-heading text-[#786B73] font-semibold">
                🎨 Reconstruction of the Crime Scene (7th)
              </span>
            </div>
            <ClassroomBenchIllustration />

            {/* Handwritten Annotation Arrow */}
            <div className="mt-2 text-center">
              <span className="text-xl sm:text-2xl font-note text-rose-600 font-bold -rotate-1 inline-block">
                ✍️ "THE BEGINNING OF THE NONSENSE."
              </span>
            </div>
          </div>

          {/* PHOTO 2: Origin Story Solo Photo Frame */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-full max-w-[270px]">
              <ScrapbookPhotoCard
                photoUrl={photoUrl}
                slotLabel="Origin Story — Meitrii"
                caption="Big Laughs 🎒"
                subcaption="Memory Archive"
                rotation="rotate-2"
                tapeColor="lavender"
                aspectRatio="4/5"
                onOpenEditor={onOpenEditor}
              />
            </div>
          </div>
        </div>

        {/* The Exact Story Text with Notebook Paper Style */}
        <div className="bg-notebook-pattern border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 paper-shadow text-[#352D32] text-sm sm:text-base leading-relaxed space-y-4">
          <p className="font-heading font-medium text-lg text-rose-600">
            Achha sunn. 🙄
          </p>

          <p>
            I know, I know. Main yeh story tujhe pehle bhi suna chuka hoon.{' '}
            <span className="font-semibold text-rose-500">
              BUT TERKO MERI BAATEIN DO BAAR SUNNI PADTI HAIN, TOH AB YEH BHI SUN LE. 😭🙏
            </span>
          </p>

          <p>
            Toh hua kuch aisa tha ki hum 7th mein last bench pe baithe the. Ab ma'am ne humein saath bithaya tha ya hum apni marzi se wahaan pahunch gaye the, yeh toh history ke syllabus mein nahi hai.
          </p>

          <p>
            But mujhe yaad hai ki main tujhe kuch na kuch bol raha tha, ya teri cheezon ke saath kuch kar raha tha. Basically, main apni usual harkatein kar raha tha. 💀
          </p>

          <div className="p-3 bg-[#F8DDE5]/40 rounded-xl border-l-4 border-rose-400 my-2">
            <p className="font-heading font-bold text-rose-600 tracking-wide text-base">
              AUR TU HASS RAHI THI.
            </p>
            <p className="italic text-[#786B73] text-sm mt-0.5">
              Like, genuinely hass rahi thi.
            </p>
          </div>

          <p>
            Aur pata hai sabse funny baat kya hai?
          </p>

          <p className="font-heading font-bold text-lg text-[#352D32] bg-[#FFDCC5]/50 px-3 py-1 rounded-lg inline-block">
            TU AAJ BHI MERI BAATON PE AISE HI HASTI HAI. 😭❤️
          </p>

          <p>
            Matlab 7th se ab tak humour improve hua hai ya nahi, woh toh debatable hai,{' '}
            <span className="font-semibold underline decoration-[#EBA8BC]">
              BUT TU ABHI BHI HAS RAHI HAI.
            </span>
          </p>

          <p className="text-rose-500 font-heading font-bold">
            Girl, you deserve an award for patience. 🏆
          </p>

          <p>
            Aur haan, mujhe pata hai maine yeh story tujhe pehle bhi sunayi hai aur tujhe phir bhi yaad nahi hogi.{' '}
            <span className="font-heading font-bold text-rose-500">ISILIYE DOBARA BATA DI. 🥰</span>
          </p>

          <p className="font-note text-2xl text-[#352D32] font-bold">
            You're welcome.
          </p>

          <p className="text-[#786B73]">
            Anyway, who knew that two kids sitting on the last bench would end up with so many memories?
          </p>

          <p className="font-semibold text-[#352D32]">
            Not me, obviously. Main toh bas aise hi baat kar raha tha. 🤡
          </p>
        </div>

        {/* Interactive Buttons Below Story */}
        <div className="mt-8 pt-6 border-t border-[#F8DDE5] space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRememberClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFF9F2] hover:bg-[#F8DDE5] border-2 border-[#EBA8BC] text-xs sm:text-sm font-heading font-bold text-[#352D32] shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-rose-500" />
              <span>WAIT... YOU ACTUALLY REMEMBER THIS? 🤨</span>
            </button>

            <button
              onClick={handleReceiptsClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFF9F2] hover:bg-[#E8E1FA] border-2 border-[#D4C7F5] text-xs sm:text-sm font-heading font-bold text-[#352D32] shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-purple-500" />
              <span>SHOW ME THE RECEIPTS 📂</span>
            </button>
          </div>

          {/* Reveal 1: You remember this */}
          {showRememberFact && (
            <div className="p-4 bg-[#F8DDE5] border border-rose-300 rounded-2xl animate-in fade-in zoom-in-95 text-center">
              <span className="text-xs font-heading uppercase tracking-wider text-rose-600 font-bold block mb-1">
                Answer from the Archives:
              </span>
              <p className="text-base sm:text-lg font-heading font-bold text-[#352D32]">
                "Of course I do. One of us has to preserve our shared brain cell. 💀"
              </p>
            </div>
          )}

          {/* Reveal 2: Receipts */}
          {showReceipts && (
            <div className="p-4 bg-[#E8E1FA] border border-purple-300 rounded-2xl animate-in fade-in zoom-in-95 text-center">
              <span className="text-xs font-heading uppercase tracking-wider text-purple-700 font-bold block mb-1">
                Evidence Status Report:
              </span>
              <p className="text-sm sm:text-base font-heading font-semibold text-[#352D32]">
                "Evidence is unavailable because the friendship began before either of us understood the importance of documentation." 📂🚫
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
