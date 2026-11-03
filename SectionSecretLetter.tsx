import React, { useState } from 'react';
import { Mail, MailOpen, Sparkles, Heart } from 'lucide-react';
import { WashiTape, HandDrawnHeart, HandDrawnStar } from './CustomDoodles';
import { soundManager } from '../utils/audio';
import { fireCelebrationRain, fireHearts } from '../utils/confetti';

interface SectionSecretLetterProps {
  onNextChapter: () => void;
}

export const SectionSecretLetter: React.FC<SectionSecretLetterProps> = ({
  onNextChapter,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSecretLetter = () => {
    soundManager.playSparkle();
    fireCelebrationRain();
    fireHearts();
    setIsOpen(!isOpen);
  };

  return (
    <section id="secret-message" className="py-20 px-4 max-w-4xl mx-auto scroll-mt-20">
      {/* Chapter Marker */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-xs font-heading font-bold text-rose-600 uppercase tracking-widest bg-[#F8DDE5] px-3 py-1 rounded-full border border-[#EBA8BC]">
          Chapter 06 • The Emotional Climax
        </span>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#352D32]">
          YOU'VE UNLOCKED A SECRET MESSAGE. 🤫
        </h2>
        <p className="mt-2 text-base sm:text-lg font-heading text-rose-600 font-semibold">
          Warning: The sender has temporarily stopped being an idiot.
        </p>
      </div>

      {/* Secret Wax-Seal Letter Box */}
      <div className="relative bg-gradient-to-b from-[#F8DDE5]/40 via-[#FFF9F2] to-[#F8DDE5]/60 border-2 border-[#EBA8BC] rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden">
        {/* Washi tapes */}
        <div className="absolute -top-3 left-8">
          <WashiTape color="pink" />
        </div>
        <div className="absolute -top-3 right-8">
          <WashiTape color="peach" />
        </div>

        {/* Ambient floating sparkles/hearts */}
        <div className="absolute top-8 left-4 text-rose-300 opacity-60 animate-float-slow">
          <HandDrawnHeart className="w-6 h-6" />
        </div>
        <div className="absolute bottom-8 right-4 text-amber-300 opacity-60 animate-float-slow" style={{ animationDelay: '1.5s' }}>
          <HandDrawnStar className="w-6 h-6" />
        </div>

        {/* Envelope Graphic & Button */}
        <div className="text-center py-6">
          <div
            onClick={handleOpenSecretLetter}
            className="inline-flex flex-col items-center cursor-pointer group select-none"
          >
            {/* Glowing Envelope Container */}
            <div className="relative w-48 sm:w-60 h-36 sm:h-44 bg-[#FFF9F2] border-2 border-[#EBA8BC] rounded-3xl shadow-lg p-4 flex flex-col items-center justify-center transition-all group-hover:scale-105 group-hover:shadow-2xl ring-4 ring-rose-200/50">
              {/* Triangular flap with wax seal */}
              <div
                className="absolute top-0 left-0 right-0 h-20 bg-[#F8DDE5] border-b-2 border-[#EBA8BC] rounded-t-3xl"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                }}
              />

              {/* Red Wax Seal with Heart */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 border-2 border-rose-300 shadow-md flex items-center justify-center text-white font-heading font-black text-xs">
                ❤️
              </div>

              <div className="relative z-10 mt-3 text-center">
                <span className="text-xs font-heading font-extrabold text-[#352D32] block">
                  {isOpen ? 'Sealed Wax Broken' : 'Strictly Confidential'}
                </span>
                <span className="text-[10px] font-note text-rose-500 font-bold block">
                  For Meitrii's Eyes Only
                </span>
              </div>
            </div>

            {/* Button */}
            <button
              type="button"
              className="mt-6 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-heading font-extrabold text-base sm:text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>{isOpen ? 'FOLD SECRET LETTER 💌' : 'OPEN MY LETTER 💌'}</span>
            </button>
          </div>
        </div>

        {/* Unfolded Secret Letter Content */}
        {isOpen && (
          <div className="mt-8 pt-6 border-t-2 border-dashed border-[#EBA8BC] animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-[#FFF9F2] rounded-3xl p-6 sm:p-10 border-2 border-[#EBA8BC] paper-shadow text-left max-w-2xl mx-auto space-y-4 text-sm sm:text-base text-[#352D32] leading-relaxed font-body">
              <div className="pb-3 border-b border-[#F8DDE5] flex items-center justify-between">
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-rose-600">
                  💌 Personal Letter
                </span>
                <span className="text-xs font-note text-[#786B73] font-bold">
                  Class 7th to Infinity
                </span>
              </div>

              <p className="font-heading font-black text-2xl text-rose-600 tracking-tight">
                PSSST... MEITRII.
              </p>

              <p>
                Achha, ab jab tu yahaan tak aa hi gayi hai, toh ek baat bolni hai.
              </p>
              <p className="font-heading font-bold text-lg text-[#352D32]">
                Yrr, tu genuinely bahut achhi dost hai.
              </p>
              <p>
                Tere jaisi dost mujhe pehle kabhi nahi mili, and I'm honestly so grateful ki tu mere saath mein hai.
              </p>
              <p>
                Kabhi-kabhi sochta hoon ki koi itna achha kaise ho sakta hai without even realising it.
              </p>

              <p className="text-[#786B73]">
                Tu shayad notice bhi nahi karti hogi ki teri chhoti-chhoti baatein kitna matter karti hain.
              </p>

              <div className="p-4 bg-white/80 rounded-2xl border border-[#F8DDE5] space-y-1.5 font-medium text-[#352D32]">
                <p>• The way you listen.</p>
                <p>• The way you include people.</p>
                <p>• The way you make baat karna feel easy.</p>
                <p>• And the way you can make someone feel a little less alone just by being there.</p>
              </div>

              <div className="py-2 text-center">
                <p className="font-heading font-black text-xl sm:text-2xl text-rose-600 bg-rose-50 border-2 border-rose-200 py-3 px-4 rounded-2xl inline-block shadow-xs">
                  I don't think I say this enough, but THANK YOU FOR BEING YOU.
                </p>
              </div>

              <p className="font-heading font-semibold text-base text-[#352D32] pt-2">
                Aur haan, ek baat aur.
              </p>
              <p>
                I don't know ki agar tu mere saath mein nahi hoti toh main kitna different hota, ya cheezein kaise hoti.
              </p>
              <p className="font-bold text-[#352D32]">
                But I do know that I'm glad you are here.
              </p>

              <div className="space-y-1 text-sm font-medium text-[#786B73] bg-[#E8E1FA]/40 p-4 rounded-2xl border border-[#D4C7F5]">
                <p>🌸 I'm glad we met in 7th.</p>
                <p>🎒 I'm glad we sat on that last bench.</p>
                <p>😂 I'm glad ki tu meri bakwaas sunti rahi.</p>
                <p>✨ And I'm glad ki itne time ke baad bhi hum baat karte hain.</p>
              </div>

              <p>
                I know everything gets busy. Sabki apne kaam hote hai, apne problems hote hain, apne kaam hote hain.
              </p>
              <p>
                And I'm not asking you to be available every second of every day.
              </p>
              <p className="font-semibold text-[#352D32]">
                Bas itna chahta hoon ki hum aise hi baat karte rahein.
              </p>
              <p className="italic text-[#786B73]">
                Chahe random bakwaas ho, padhai ki tension ho, ya bas bina kisi reason ke conversation start karni ho.
              </p>

              {/* Humorous priority note */}
              <div className="p-4 bg-[#FFDCC5]/70 rounded-2xl border border-amber-300 text-center my-3">
                <p className="font-heading font-black text-base sm:text-lg text-amber-900">
                  PLEASE MERI BAATEIN SUN LIYA KAR, THODA TIME NIKAAL KE. 😭🙏
                </p>
                <p className="text-xs font-heading font-medium text-amber-800 mt-1">
                  Itna emotional paragraph likhne ke baad bhi meri primary demand wahi hai.
                </p>
                <p className="text-[11px] font-heading font-bold text-amber-900 mt-0.5">
                  Priorities, you see. 🤡
                </p>
              </div>

              <p className="font-heading font-bold text-lg text-[#352D32] pt-2">
                But seriously, Meitrii...
              </p>
              <p>
                You're one of those people I'm genuinely thankful to have met.
              </p>
              <p>
                And I hope this birthday of brings you the kind of happiness you deserve, people who care for you the way you care for others, and moments that make you feel as loved as you make other people feel.
              </p>
              <p>
                I hope you get to do things you're proud of.
              </p>
              <p>
                I hope you find reasons to laugh on the days when laughing feels difficult.
              </p>
              <p>
                And I hope that, no matter how much things changes, you never forget how special you are to the people who know you.
              </p>
              <p className="font-semibold text-rose-600">
                Including this idiot.
              </p>

              <div className="my-6 p-6 bg-gradient-to-r from-[#F8DDE5] via-white to-[#FFDCC5] rounded-3xl border-2 border-rose-300 text-center shadow-md">
                <p className="text-2xl sm:text-3xl font-heading font-black text-rose-600 tracking-tight leading-snug">
                  HAPPY BIRTHDAY, MEITRII. ❤️
                </p>
                <div className="mt-3 space-y-1 text-xs sm:text-sm font-heading font-bold text-[#352D32]">
                  <p>Thank you for being my bestie.</p>
                  <p>Thank you for listening to me.</p>
                  <p>Thank you for making me feel included.</p>
                  <p className="text-rose-500">
                    And thank you for being the same girl who laughed at my nonsense in 7th and, somehow, still hasn't learned her lesson.
                  </p>
                </div>
              </div>

              <p className="font-note text-3xl text-rose-600 font-bold text-right pt-2">
                Love you, yyr. 🫂
              </p>

              {/* Handwritten Postscript */}
              <div className="mt-6 pt-4 border-t border-[#F8DDE5] bg-rose-50/50 p-4 rounded-2xl">
                <span className="text-base sm:text-lg font-note font-bold text-rose-700 block">
                  P.S. Yes, I actually mean every word. Now go smile and eat some cake. 🍰✨
                </span>
              </div>

              {/* Move to Finale Button */}
              <div className="pt-4 text-center">
                <button
                  onClick={() => {
                    soundManager.playFanfare();
                    onNextChapter();
                  }}
                  className="px-6 py-3 rounded-2xl bg-[#352D32] hover:bg-[#4A3F46] text-white font-heading font-bold text-sm shadow-md transition-all cursor-pointer hover:scale-105"
                >
                  GO TO THE FINAL BIRTHDAY SURPRISE 🎉 →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
