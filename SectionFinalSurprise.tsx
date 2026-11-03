import React, { useState } from 'react';
import {
  Sparkles,
  Gift,
  RotateCcw,
  CheckCircle,
  XCircle,
  HelpCircle,
  Heart,
  Crown,
} from 'lucide-react';
import {
  WashiTape,
  StampBadge,
  HandDrawnHeart,
  HandDrawnStar,
  InteractiveCake,
} from './CustomDoodles';
import { soundManager } from '../utils/audio';
import { fireCelebrationRain, fireConfetti } from '../utils/confetti';

interface SectionFinalSurpriseProps {
  onRestart: () => void;
  onTriggerEasterEgg: (msg: string) => void;
}

export const SectionFinalSurprise: React.FC<SectionFinalSurpriseProps> = ({
  onRestart,
  onTriggerEasterEgg,
}) => {
  const [cakeLit, setCakeLit] = useState(true);
  const [showLastSurprise, setShowLastSurprise] = useState(false);

  const handleToggleCake = () => {
    if (cakeLit) {
      soundManager.playCandleBlow();
      setCakeLit(false);
      onTriggerEasterEgg('🎂 Candle blown! Wishing you infinite smiles this year! ✨');
    } else {
      soundManager.playSparkle();
      setCakeLit(true);
      fireConfetti({ particleCount: 35 });
    }
  };

  const handleLastSurpriseClick = () => {
    soundManager.playFanfare();
    fireCelebrationRain();
    setShowLastSurprise(true);
  };

  const handleRestartClick = () => {
    soundManager.playPop();
    onRestart();
  };

  return (
    <section id="final-surprise" className="py-20 px-4 max-w-4xl mx-auto scroll-mt-20">
      {/* Chapter Marker */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-xs font-heading font-bold text-rose-600 uppercase tracking-widest bg-[#F8DDE5] px-3 py-1 rounded-full border border-[#EBA8BC]">
          Chapter 07 • The Grand Finale 🎉
        </span>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#352D32]">
          HAPPY BIRTHDAY ONCE AGAIN, <span className="text-rose-500">MEITRIII!</span> ❤️
        </h2>
        <p className="mt-3 text-base sm:text-lg md:text-xl font-heading font-medium text-[#786B73] max-w-2xl mx-auto">
          "Here's to more conversations, more bakwaas, more memories, and many more to come”
        </p>
      </div>

      {/* Main Celebration Box */}
      <div className="relative bg-[#FFF9F2] border-2 border-[#EBA8BC] rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Top Washi Tape */}
        <div className="absolute -top-3 left-10">
          <WashiTape color="pink" />
        </div>
        <div className="absolute -top-3 right-10">
          <WashiTape color="peach" />
        </div>

        {/* Celebratory interactive Cake */}
        <div className="text-center my-4">
          <InteractiveCake lit={cakeLit} onToggleBlow={handleToggleCake} />
        </div>

        {/* ================= THE DOST SUBSCRIPTION CARD ================= */}
        <div className="mt-8 max-w-xl mx-auto bg-white rounded-3xl border-2 border-[#EBA8BC] p-6 sm:p-8 paper-shadow">
          <div className="flex items-center justify-between pb-4 border-b border-[#F8DDE5]">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#F8DDE5] rounded-xl text-rose-500">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-heading uppercase tracking-wider text-[#786B73] font-bold block">
                  Official Membership Card
                </span>
                <h3 className="text-base sm:text-lg font-heading font-extrabold text-[#352D32]">
                  YOUR DOST SUBSCRIPTION
                </h3>
              </div>
            </div>
            <StampBadge text="LIFETIME PASS" subtext="ACTIVE" rotate="rotate-3" />
          </div>

          {/* Subscription Details Table */}
          <div className="mt-5 space-y-3 font-heading text-xs sm:text-sm">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-[#786B73] font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> Status:
              </span>
              <span className="font-extrabold text-emerald-700 uppercase tracking-wide">ACTIVE</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFF9F2] border border-[#F8DDE5]">
              <span className="text-[#786B73] font-semibold flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-blue-500" /> Renewal:
              </span>
              <span className="font-bold text-[#352D32]">Hopefully automatic.</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-rose-50 border border-rose-200">
              <span className="text-[#786B73] font-semibold flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-500" /> Cancellation:
              </span>
              <span className="font-extrabold text-rose-700 uppercase tracking-wide">NOT AVAILABLE.</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-[#786B73] font-semibold flex items-center gap-2">
                <XCircle className="w-4 h-4 text-amber-500" /> Refund policy:
              </span>
              <span className="font-extrabold text-amber-800 uppercase tracking-wide">ABSOLUTELY NOT.</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl bg-[#FFF9F2] border border-[#F8DDE5] gap-1">
              <span className="text-[#786B73] font-semibold flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-500" /> Customer support:
              </span>
              <span className="font-bold text-purple-900">One idiot, available for bakwaas.</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl bg-[#F8DDE5]/40 border border-[#EBA8BC] gap-1">
              <span className="text-[#786B73] font-semibold">Terms and conditions:</span>
              <span className="font-bold text-rose-700">You have to tolerate my nonsense.</span>
            </div>
          </div>

          {/* ONE LAST SURPRISE BUTTON */}
          <div className="mt-6 pt-4 border-t border-[#F8DDE5] text-center">
            {!showLastSurprise ? (
              <button
                onClick={handleLastSurpriseClick}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-heading font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <Gift className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>ONE LAST SURPRISE 🎁</span>
              </button>
            ) : (
              <div className="p-6 bg-gradient-to-br from-[#F8DDE5] via-white to-[#FFDCC5] rounded-2xl border-2 border-rose-300 animate-in fade-in zoom-in-95 space-y-3">
                <p className="font-heading font-extrabold text-lg text-[#352D32] leading-snug">
                  "You're stuck with me, unfortunately.<br />
                  No refunds.<br />
                  No exchanges.<br />
                  <span className="text-rose-600">Unlimited subscription. ❤️</span>"
                </p>

                <div className="pt-2 border-t border-[#EBA8BC]/60">
                  <p className="text-xs font-heading font-semibold text-[#786B73]">
                    "Made with love, memories, and an unreasonable amount of bakwaas."
                  </p>
                  <p className="font-note text-2xl sm:text-3xl font-bold text-rose-600 mt-2">
                    — Your favourite idiot. 🫂
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Restart Button */}
        <div className="mt-12 text-center pt-6 border-t border-[#F8DDE5]">
          <button
            onClick={handleRestartClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#352D32] hover:bg-[#4A3F46] text-[#FFF9F2] text-xs sm:text-sm font-heading font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-amber-300" />
            <span>REVISIT OUR LITTLE STORY ↺</span>
          </button>
          <span className="block mt-2 text-[11px] font-heading text-[#786B73]">
            Take a stroll from the beginning whenever you want to smile.
          </span>
        </div>
      </div>
    </section>
  );
};
