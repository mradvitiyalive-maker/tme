import React, { useState } from 'react';
import { Camera, Sparkles, Heart, Eye, ArrowDown, Lock, Unlock } from 'lucide-react';
import { WashiTape, StampBadge, HandDrawnHeart, HandDrawnStar } from './CustomDoodles';
import { soundManager } from '../utils/audio';
import { fireCelebrationRain, fireHearts } from '../utils/confetti';

interface SectionSpecialMemoryProps {
  photoUrl?: string;
  onOpenEditor: () => void;
  onTriggerEasterEgg: (msg: string) => void;
}

export const SectionSpecialMemory: React.FC<SectionSpecialMemoryProps> = ({
  photoUrl,
  onOpenEditor,
  onTriggerEasterEgg,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleOpenMemory = () => {
    soundManager.playSparkle();
    fireCelebrationRain();
    fireHearts();
    setIsOpen(true);
  };

  return (
    <section id="special-memory" className="py-20 px-4 max-w-4xl mx-auto scroll-mt-20">
      {/* Chapter Marker */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-xs font-heading font-bold text-rose-600 uppercase tracking-widest bg-[#F8DDE5] px-3.5 py-1 rounded-full border border-[#EBA8BC]">
          Chapter 04 • Exclusive Memory ❤️
        </span>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#352D32]">
          ONE FOR THE MEMORIES ❤️
        </h2>
        <p className="mt-2 text-base sm:text-lg font-heading text-[#786B73]">
          Yeh pic saath mein bhi iss website ke liye hi click kari thi , mere saath pic click karwaliya kar yrr😭
        </p>
      </div>

      {/* Scrapbook Container */}
      <div className="relative bg-[#FFF9F2] border-2 border-[#EBA8BC] rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Top Washi Tape */}
        <div className="absolute -top-3 left-12">
          <WashiTape color="pink" />
        </div>
        <div className="absolute -top-3 right-12">
          <WashiTape color="peach" />
        </div>

        {/* Ambient floating doodles */}
        <div className="absolute top-6 left-6 text-rose-300 opacity-60 animate-float-slow">
          <HandDrawnHeart className="w-7 h-7" />
        </div>
        <div className="absolute bottom-6 right-6 text-amber-300 opacity-60 animate-float-slow" style={{ animationDelay: '1.5s' }}>
          <HandDrawnStar className="w-7 h-7" />
        </div>

        {/* State 1: Closed Envelope / Memory Box */}
        {!isOpen ? (
          <div className="text-center py-10 flex flex-col items-center">
            {/* Sealed Memory Card Envelope */}
            <div
              onClick={handleOpenMemory}
              className="relative w-64 sm:w-80 h-48 sm:h-56 bg-white border-2 border-[#EBA8BC] rounded-3xl polaroid-shadow p-6 flex flex-col items-center justify-center cursor-pointer group hover:scale-105 transition-all ring-4 ring-rose-200/50"
            >
              {/* Envelope Flap with Wax Seal */}
              <div
                className="absolute top-0 left-0 right-0 h-24 bg-[#F8DDE5] border-b-2 border-[#EBA8BC] rounded-t-3xl"
                style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}
              />

              <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 border-2 border-rose-300 shadow-lg flex items-center justify-center text-white text-xl animate-gentle-pulse">
                📸
              </div>

              <div className="relative z-10 mt-4 text-center">
                <span className="text-sm font-heading font-extrabold text-[#352D32] block">
                  Confidential Scrapbook Polaroid
                </span>
                <span className="text-xs font-note text-rose-600 font-bold block mt-0.5">
                  Both of Us Together • Specially Clicked
                </span>
              </div>
            </div>

            {/* Prominent Action Button */}
            <button
              onClick={handleOpenMemory}
              className="mt-8 group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-heading font-extrabold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <span>OPEN THIS MEMORY 📸</span>
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>

            <span className="mt-3 text-xs font-heading text-[#786B73]">
              Tap above to unveil our special picture
            </span>
          </div>
        ) : (
          /* State 2: Unveiled Memory Polaroid */
          <div className="animate-in fade-in zoom-in-95 duration-500 py-4 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 mb-4 bg-[#F8DDE5]/80 px-3 py-1 rounded-full border border-[#EBA8BC] text-xs font-heading font-bold text-[#352D32]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Special Moment Unlocked</span>
            </div>

            {/* The Special Large Polaroid Frame */}
            <div className="relative bg-white p-4 sm:p-6 rounded-3xl polaroid-shadow border-2 border-rose-300 max-w-2xl w-full">
              {/* Dual Washi Tapes */}
              <div className="absolute -top-3 left-6">
                <WashiTape color="pink" />
              </div>
              <div className="absolute -top-3 right-6">
                <WashiTape color="peach" />
              </div>

              {/* Photo Display: 4:3 Aspect, prioritize showing both people completely */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-[#FFF9F2] via-[#F8DDE5]/30 to-[#E8E1FA]/30 border border-[#F8DDE5] flex items-center justify-center">
                {photoUrl && !imageError ? (
                  <div
                    className="relative w-full h-full cursor-pointer group"
                    onClick={() => setIsZoomed(true)}
                  >
                    <img
                      src={photoUrl}
                      alt="Both of us together"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      style={{ objectPosition: 'center center' }}
                      onError={() => setImageError(true)}
                    />
                    <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/95 text-[#352D32] px-3.5 py-1.5 rounded-full text-xs font-heading font-bold shadow-md flex items-center gap-1.5">
                        <Eye className="w-4 h-4" /> Click to view full picture
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      soundManager.playPop();
                      onOpenEditor();
                    }}
                    className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-white/70 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#F8DDE5] flex items-center justify-center text-rose-500 mb-3 border-2 border-[#EBA8BC]">
                      <Camera className="w-8 h-8" />
                    </div>
                    <span className="text-base font-heading font-extrabold text-[#352D32]">
                      Upload Our Picture Together ❤️
                    </span>
                    <span className="text-xs font-note text-rose-600 font-bold mt-1 max-w-sm">
                      "Clicked this one specially for this little corner of the internet."
                    </span>
                    <button
                      type="button"
                      className="mt-3 px-4 py-2 rounded-xl bg-[#352D32] text-white text-xs font-heading font-bold shadow-sm hover:bg-[#4A3F46]"
                    >
                      Choose from Mac (1600 × 1200 px) 📂
                    </button>
                  </div>
                )}
              </div>

              {/* Exact Handwritten Caption */}
              <div className="mt-4 pt-2 text-center border-t border-[#F8DDE5]">
                <p className="font-note text-2xl sm:text-3xl text-rose-600 font-bold leading-tight">
                  "Clicked this one specially for this little corner of the internet. ❤️"
                </p>
                <p className="text-xs font-heading text-[#786B73] mt-1">
                  — Dedicated corner of our friendship scrapbook
                </p>

                <div className="mt-3 flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      soundManager.playPop();
                      onOpenEditor();
                    }}
                    className="text-xs font-heading font-semibold text-rose-500 hover:text-rose-700 underline decoration-dotted cursor-pointer"
                  >
                    {photoUrl ? 'Replace Special Picture' : '+ Upload Picture from Mac'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Zoom Lightbox */}
      {isZoomed && photoUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer animate-in fade-in"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-3xl max-h-[90vh] bg-white p-4 sm:p-6 rounded-3xl polaroid-shadow border-2 border-rose-300 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[75vh] overflow-hidden rounded-2xl flex items-center justify-center bg-[#FFF9F2]">
              <img
                src={photoUrl}
                alt="Both of us together"
                className="max-h-[75vh] w-auto object-contain rounded-xl"
              />
            </div>
            <p className="font-note text-2xl sm:text-3xl font-bold text-rose-600 mt-3">
              "Clicked this one specially for this little corner of the internet. ❤️"
            </p>
            <button
              onClick={() => setIsZoomed(false)}
              className="mt-3 px-5 py-2 rounded-xl bg-[#352D32] text-white text-xs font-heading font-bold hover:bg-[#4A3F46]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
