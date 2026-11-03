import React, { useState } from 'react';
import { Mail, MailOpen, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { WashiTape, HandDrawnHeart, HandDrawnStar } from './CustomDoodles';
import { soundManager } from '../utils/audio';

interface SectionOpenWhenSadProps {
  onBackToBakwaas: () => void;
}

export const SectionOpenWhenSad: React.FC<SectionOpenWhenSadProps> = ({
  onBackToBakwaas,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    soundManager.playPaperRustle();
    setIsOpen(!isOpen);
  };

  return (
    <section id="open-when-sad" className="py-20 px-4 max-w-3xl mx-auto scroll-mt-20">
      {/* Chapter Marker */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-xs font-heading font-bold text-purple-600 uppercase tracking-widest bg-[#E8E1FA] px-3 py-1 rounded-full border border-[#D4C7F5]">
          Chapter 05 • Gentle Comfort
        </span>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#352D32]">
          FOR THE TIMES WHEN YOU'RE NOT OKAY. 🌷
        </h2>
        <p className="mt-2 text-base sm:text-lg font-heading text-[#786B73]">
          You don't always have to be the strong one.
        </p>
      </div>

      {/* Main Container - Calmer Lavender Atmosphere */}
      <div className="relative bg-gradient-to-b from-[#E8E1FA]/40 via-[#FFF9F2] to-[#E8E1FA]/30 border-2 border-[#D4C7F5] rounded-3xl p-6 sm:p-10 shadow-lg">
        {/* Subtle washi tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <WashiTape color="lavender" />
        </div>

        {/* Envelope Trigger Area */}
        <div className="text-center py-6">
          <div
            onClick={handleOpenLetter}
            className="inline-flex flex-col items-center cursor-pointer group select-none"
          >
            {/* Hand-drawn styled envelope SVG */}
            <div className="relative w-44 sm:w-52 h-32 sm:h-36 bg-[#FFF9F2] border-2 border-[#D4C7F5] rounded-2xl shadow-md p-4 flex flex-col items-center justify-center transition-all group-hover:scale-105 group-hover:shadow-lg">
              {/* Envelope Flap Accent */}
              <div
                className="absolute top-0 left-0 right-0 h-16 bg-[#E8E1FA]/70 border-b-2 border-[#D4C7F5] rounded-t-2xl"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                }}
              />

              {/* Heart Stamp */}
              <div className="relative z-10 p-2 bg-[#FFF9F2] rounded-full border border-[#D4C7F5] shadow-xs">
                {isOpen ? (
                  <MailOpen className="w-8 h-8 text-purple-600" />
                ) : (
                  <Mail className="w-8 h-8 text-purple-500 animate-gentle-pulse" />
                )}
              </div>

              <div className="relative z-10 mt-2 text-center">
                <span className="text-[11px] font-heading font-bold text-[#786B73]">
                  {isOpen ? 'Letter Unfolded' : 'Confidential for Meitrii'}
                </span>
              </div>
            </div>

            {/* Button */}
            <button
              type="button"
              className="mt-6 px-6 py-3 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-heading font-bold text-sm sm:text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>{isOpen ? 'CLOSE LETTER 💌' : 'OPEN THIS WHEN YOU NEED IT 💌'}</span>
            </button>
          </div>
        </div>

        {/* The Letter Itself */}
        {isOpen && (
          <div className="mt-6 pt-6 border-t border-purple-200 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-white/95 rounded-2xl p-6 sm:p-10 border border-[#D4C7F5] paper-shadow text-left max-w-2xl mx-auto space-y-4 text-sm sm:text-base text-[#352D32] leading-relaxed font-body">
              <div className="pb-3 border-b border-purple-100 flex items-center justify-between">
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-purple-600">
                  A Safe Space Note 🕊️
                </span>
                <span className="text-xs font-note text-[#786B73] font-bold">
                  Always available for you
                </span>
              </div>

              <p className="font-heading font-bold text-lg text-purple-800">
                HEY, YOU. YES, YOU.
              </p>

              <p>
                Pata hai, tu bahut strong hai.
              </p>
              <p className="italic text-[#786B73]">
                Like, genuinely.
              </p>
              <p>
                Kabhi-kabhi mujhe samajh nahi aata ki tu itna sab kaise handle kar leti hai.
              </p>
              <p>
                Log tere paas aate hain, tujhe apni problems batate hain, apni baatein share karte hain, aur tu unki sunti hai.
              </p>

              <div className="py-2">
                <p className="font-heading font-bold text-base text-purple-900 bg-purple-50 p-3 rounded-xl border-l-4 border-purple-400">
                  But ek baat bata.<br />
                  TU APNI BAATEIN KISKO BATATI HAI?
                </p>
              </div>

              <p className="font-medium text-purple-700">
                Seriously, Apna toh bata. 🥹
              </p>

              <p>
                Maine notice kiya hai ki tu apni problems ko hamesha saamne nahi laati.
              </p>
              <p>
                And I know ki har kisi ki life mein kuch na kuch chal raha hota hai jo baaki log nahi samajh paate.
              </p>
              <p>
                Har koi apni problems openly share nahi kar pata.
              </p>
              <p className="font-semibold text-[#352D32]">
                And that's okay.
              </p>

              <p>
                Main yeh nahi keh raha ki tujhe mujhe sab kuch batana hi hai.
              </p>
              <p>
                Bas itna keh raha hoon ki agar kabhi lage ki kuch theek nahi hai, agar kabhi heavy ho, agar kabhi bas kisi se baat karne ko kare, toh you don't always have to deal with everything alone.
              </p>

              <div className="p-4 bg-[#F8DDE5]/60 rounded-2xl border border-rose-200 text-center my-3">
                <p className="font-heading font-extrabold text-base sm:text-lg text-rose-600">
                  TU BHI EK INSAAN HAI, KOI CUSTOMER SUPPORT HELPLINE NAHI. 😭
                </p>
              </div>

              <p>
                Tujhe bhi bura lag sakta hai.<br />
                Tujhe bhi rona aa sakta hai.<br />
                Tujhe bhi kabhi-kabhi kuch samajh nahi aa sakta.
              </p>

              <p className="font-medium text-[#352D32]">
                And you don't have to pretend that everything is okay just because you're usually the strong one.
              </p>
              <p className="italic text-[#786B73]">
                You deserve the same care that you give to everyone else.
              </p>

              <p className="font-heading font-semibold text-purple-900 pt-2">
                Aur sun.
              </p>
              <p>
                Tu kisi ko apni problems batane ke liye burden nahi hai.
              </p>
              <p className="font-bold text-[#352D32]">
                Teri feelings matter karti hain.<br />
                <span className="text-purple-700">TERI PROBLEMS BHI MATTER KARTI HAIN.</span>
              </p>

              <p>
                And even if you don't feel like explaining anything, even if you don't know how to put your feelings into words, that's okay too.
              </p>
              <p>
                You don't need to have everything figured out.<br />
                You don't need to be strong every single time.<br />
                And you definitely don't have to go through every difficult thing alone.
              </p>

              <p>
                Agar kabhi mujhse baat karne ka mann kare, toh kar liya kar.
              </p>
              <p>
                Main shayad har problem solve nahi kar paunga.<br />
                Main shayad kuch bakwaas sa bol bhi doon. 💀<br />
                But I'll try to listen.
              </p>

              <p className="text-[#786B73]">
                And if you ever need someone to remind you that things can get better, that you matter, and that you're allowed to have bad times too, then let this be that for you
              </p>

              <div className="my-4 p-5 bg-gradient-to-r from-[#E8E1FA] to-[#F8DDE5] rounded-2xl border-2 border-purple-300 text-center">
                <p className="font-heading font-black text-lg sm:text-xl text-[#352D32] leading-snug">
                  YOU ARE IMPORTANT, MEITRII. EVEN ON THE TIMES WHEN YOU DON'T FEEL LIKE IT. ❤️
                </p>
              </div>

              <p>
                And please, apna bhi dhyaan rakha kar.<br />
                Duniya ko sambhalte-sambhalte khud ko mat bhool jaana.
              </p>

              <p className="font-note text-2xl text-purple-800 font-bold pt-2">
                Love you, 🫂
              </p>

              {/* Gentle non-pressuring note */}
              <div className="mt-6 pt-4 border-t border-purple-100 text-center">
                <p className="text-xs font-heading font-semibold text-[#786B73]">
                  You don't need to reply to this letter. Just remember that you matter, too.
                </p>

                <div className="mt-4">
                  <button
                    onClick={() => {
                      soundManager.playPop();
                      onBackToBakwaas();
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFF9F2] hover:bg-[#F8DDE5] border-2 border-[#EBA8BC] text-xs font-heading font-bold text-[#352D32] shadow-xs transition-all cursor-pointer hover:scale-105"
                  >
                    <span>BACK TO THE BAKWAAS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
