import React, { useState } from 'react';
import { WashiTape, StampBadge, HandDrawnHeart } from './CustomDoodles';
import { soundManager } from '../utils/audio';
import { fireConfetti } from '../utils/confetti';
import { Sparkles, MessageCircle, HeartHandshake, GraduationCap, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';
import { MemoryPhoto } from '../types';

interface SectionMemoryMuseumProps {
  customPhotos: Record<string, string>;
  onOpenPhotoCustomizer: () => void;
  onTriggerEasterEgg: (msg: string) => void;
  photoUrl?: string;
}

export const SectionMemoryMuseum: React.FC<SectionMemoryMuseumProps> = ({
  customPhotos,
  onOpenPhotoCustomizer,
  onTriggerEasterEgg,
  photoUrl,
}) => {
  const [expandedCard, setExpandedCard] = useState<string | null>('card-10');

  const toggleCard = (cardId: string) => {
    soundManager.playChime();
    if (expandedCard === cardId) {
      setExpandedCard(null);
    } else {
      setExpandedCard(cardId);
      // Extra celebration if user opened all or 12th
      if (cardId === 'card-12') {
        fireConfetti({ particleCount: 40 });
      }
    }
  };

  return (
    <section id="museum" className="py-20 px-4 max-w-6xl mx-auto scroll-mt-20">
      {/* Chapter Marker */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-xs font-heading font-bold text-[#EBA8BC] uppercase tracking-widest bg-[#F8DDE5]/60 px-3 py-1 rounded-full border border-[#EBA8BC]/40">
          Chapter 03 • The Memory Museum
        </span>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#352D32]">
          THE MEITRII MEMORY MUSEUM 🏆
        </h2>
        <p className="mt-2 text-base sm:text-lg font-heading text-[#786B73] max-w-2xl mx-auto">
          Three academic years. Countless memories. Questionable academic productivity.
        </p>
        <p className="mt-1 text-xs font-heading text-rose-500 font-semibold">
          💡 Tap any polaroid card below to open its chapter story!
        </p>
      </div>

      {/* Cards Grid: 3 interactive cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* ================= CARD ONE: 10TH ================= */}
        <div
          className={`relative bg-[#FFF9F2] border-2 transition-all duration-300 rounded-3xl p-6 polaroid-shadow cursor-pointer ${
            expandedCard === 'card-10'
              ? 'border-rose-400 ring-4 ring-rose-100'
              : 'border-[#EBA8BC] hover:-translate-y-1'
          }`}
          onClick={() => toggleCard('card-10')}
        >
          {/* Top washi tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <WashiTape color="pink" />
          </div>

          {/* Polaroid Frame Container */}
          <div className="bg-white p-3 rounded-2xl border border-[#F8DDE5] shadow-xs mb-4">
            <div className="w-full h-44 rounded-xl overflow-hidden bg-gradient-to-br from-[#F8DDE5] to-[#FFDCC5] flex flex-col items-center justify-center text-center p-4 relative">
              {photoUrl || customPhotos['card-10'] ? (
                <img
                  src={photoUrl || customPhotos['card-10']}
                  alt="Class 10th memory"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <div className="text-4xl mb-1 animate-bounce">🗣️💬</div>
                  <span className="font-heading font-bold text-sm text-[#352D32]">
                    10th Headquarters
                  </span>
                  <span className="text-[11px] font-note text-rose-600 font-semibold">
                    "5 mins of studying, 45 mins of roasting everyone"
                  </span>
                </>
              )}
            </div>
            <div className="text-center pt-2">
              <span className="text-xs font-note font-bold text-[#786B73]">
                Polaroid #01 • Batch 10th
              </span>
            </div>
          </div>

          {/* Card Badges */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-heading font-bold px-2.5 py-1 rounded-lg bg-[#F8DDE5] text-rose-700">
              10TH
            </span>
            <span className="text-[11px] font-heading font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 border border-rose-300">
              GOSSIP LEVEL: 100/100
            </span>
          </div>

          <h3 className="text-xl font-heading font-extrabold text-[#352D32]">
            THE GOSSIP DEPARTMENT
          </h3>

          <p className="mt-2 text-xs sm:text-sm font-heading text-[#786B73] line-clamp-2">
            Classroom conversations, discussing everyone else, and occasionally remembering that school also involved studying.
          </p>

          {/* Expand/Collapse Toggle Button */}
          <div className="mt-4 pt-3 border-t border-[#F8DDE5] flex items-center justify-between text-xs font-heading font-bold text-rose-600">
            <span>{expandedCard === 'card-10' ? 'Hide Details' : 'Read 10th Memory Story'}</span>
            {expandedCard === 'card-10' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>

          {/* Expanded Content */}
          {expandedCard === 'card-10' && (
            <div
              className="mt-4 pt-4 border-t border-dashed border-[#EBA8BC] text-xs sm:text-sm text-[#352D32] leading-relaxed space-y-3 bg-[#FFF9F2] animate-in fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <p>
                Technically, meri favourite memory ek nahi hai.
              </p>
              <p>
                Meri problem hi yahi hai ki tere saath itni saari memories hain ki agar main sab likhne baith gaya na, toh tera birthday khatam ho jayega aur main abhi bhi bta hi rha hounga. 💀
              </p>
              <p className="font-heading font-semibold text-rose-600">
                But chalo, koi na
              </p>
              <p>
                10th mein tere saath baithna, baatein karna, aur baakiyon ke baare mein discuss karna. 😭
              </p>
              <p className="italic text-[#786B73]">
                Of course, padhai bhi hoti thi.<br />
                Kabhi-kabhi.
              </p>
              <p className="font-medium bg-[#F8DDE5]/50 p-2.5 rounded-xl border-l-2 border-rose-400">
                Lekin honestly, tere saath baithke baatein karna hi apne aap mein ek memory hai.
              </p>
              <p>
                Koi ek particular moment nahi hai jo main choose kar sakun. It's all those random conversations, chhoti-chhoti baatein, and moments that probably seemed ordinary at the time.
              </p>
              <p className="font-heading font-bold text-rose-600">
                But looking back, they're some of my favourite memories. ❤️
              </p>
            </div>
          )}
        </div>

        {/* ================= CARD TWO: CLASS 11TH ================= */}
        <div
          className={`relative bg-[#FFF9F2] border-2 transition-all duration-300 rounded-3xl p-6 polaroid-shadow cursor-pointer ${
            expandedCard === 'card-11'
              ? 'border-purple-400 ring-4 ring-purple-100'
              : 'border-[#D4C7F5] hover:-translate-y-1'
          }`}
          onClick={() => toggleCard('card-11')}
        >
          {/* Top washi tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <WashiTape color="lavender" />
          </div>

          {/* Polaroid Frame */}
          <div className="bg-white p-3 rounded-2xl border border-[#D4C7F5] shadow-xs mb-4">
            <div className="w-full h-44 rounded-xl overflow-hidden bg-gradient-to-br from-[#E8E1FA] to-[#F8DDE5] flex flex-col items-center justify-center text-center p-4 relative">
              {customPhotos['card-11'] ? (
                <img
                  src={customPhotos['card-11']}
                  alt="Class 11th memory"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <div className="text-4xl mb-1 animate-pulse">🫂☕</div>
                  <span className="font-heading font-bold text-sm text-[#352D32]">
                    The Safe Space Hotline
                  </span>
                  <span className="text-[11px] font-note text-purple-700 font-semibold">
                    "Unofficial therapists saving each other's sanity"
                  </span>
                </>
              )}
            </div>
            <div className="text-center pt-2">
              <span className="text-xs font-note font-bold text-[#786B73]">
                Polaroid #02 • Batch 11th
              </span>
            </div>
          </div>

          {/* Card Badges */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-heading font-bold px-2.5 py-1 rounded-lg bg-[#E8E1FA] text-purple-800">
              CLASS 11TH
            </span>
            <span className="text-[11px] font-heading font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-300">
              DIFFICULTY LEVEL: EXTREME
            </span>
          </div>

          <h3 className="text-xl font-heading font-extrabold text-[#352D32]">
            THE EMOTIONAL DAMAGE ARC
          </h3>

          <p className="mt-2 text-xs sm:text-sm font-heading text-[#786B73] line-clamp-2">
            "A difficult level, made a little easier by a dost joh mujhse baat karti thi"
          </p>

          <div className="mt-4 pt-3 border-t border-[#D4C7F5] flex items-center justify-between text-xs font-heading font-bold text-purple-700">
            <span>{expandedCard === 'card-11' ? 'Hide Details' : 'Read 11th Memory Story'}</span>
            {expandedCard === 'card-11' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>

          {/* Expanded Content */}
          {expandedCard === 'card-11' && (
            <div
              className="mt-4 pt-4 border-t border-dashed border-[#D4C7F5] text-xs sm:text-sm text-[#352D32] leading-relaxed space-y-3 bg-[#FFF9F2] animate-in fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <p>
                Yaar, 11th mere liye honestly kaafi difficult time tha.
              </p>
              <p>
                And even though I wasn't doing okay, tu mujhse achhe se baat karti thi.
              </p>
              <p className="font-semibold text-purple-900">
                Tu sunti thi.
              </p>
              <p>
                Aur kabhi-kabhi, jab mein sab kuch thoda messed up lag raha hota hai na, tab kisi ka normally baat kar lena bhi kaafi matter karta hai.
              </p>
              <p>
                Us time mere liye woh chhoti si cheez bhi important thi.
              </p>
              <p>
                Aur phir Srishtii apna dukh mujhe sunati thi, toh obviously main bhi apna dukh kahin toh sunata. 😭
              </p>
              <p className="font-heading font-bold text-purple-800 bg-[#E8E1FA]/80 p-2 rounded-xl text-center">
                MATLAB HUM SAB EK DOOSRE KE UNOFFICIAL THERAPISTS BANE HUE THE.
              </p>
              <p>
                But sb kuch apart, thank you for still being someone mein baat karu during a time when things weren't easy for me.
              </p>
              <p className="italic text-[#786B73]">
                You probably don't even realise how much that mattered.
              </p>
              {/* Handwritten note */}
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 mt-2">
                <span className="text-base sm:text-lg font-note font-bold text-purple-800 block">
                  "Some people make difficult days a little easier without even knowing it. ❤️"
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ================= CARD THREE: CLASS 12TH ================= */}
        <div
          className={`relative bg-[#FFF9F2] border-2 transition-all duration-300 rounded-3xl p-6 polaroid-shadow cursor-pointer ${
            expandedCard === 'card-12'
              ? 'border-amber-400 ring-4 ring-amber-100'
              : 'border-[#FFDCC5] hover:-translate-y-1'
          }`}
          onClick={() => toggleCard('card-12')}
        >
          {/* Top washi tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <WashiTape color="peach" />
          </div>

          {/* Polaroid Frame */}
          <div className="bg-white p-3 rounded-2xl border border-[#FFDCC5] shadow-xs mb-4">
            <div className="w-full h-44 rounded-xl overflow-hidden bg-gradient-to-br from-[#FFDCC5] to-[#F8DDE5] flex flex-col items-center justify-center text-center p-4 relative">
              {customPhotos['card-12'] ? (
                <img
                  src={customPhotos['card-12']}
                  alt="Class 12th memory"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <div className="text-4xl mb-1 animate-bounce">📚🤝</div>
                  <span className="font-heading font-bold text-sm text-[#352D32]">
                    The Study Syndicate
                  </span>
                  <span className="text-[11px] font-note text-amber-800 font-semibold">
                    "Together through board exam panic & laughs"
                  </span>
                </>
              )}
            </div>
            <div className="text-center pt-2">
              <span className="text-xs font-note font-bold text-[#786B73]">
                Polaroid #03 • Batch 12th
              </span>
            </div>
          </div>

          {/* Card Badges */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-heading font-bold px-2.5 py-1 rounded-lg bg-[#FFDCC5] text-amber-900">
              CLASS 12TH
            </span>
            <span className="text-[10px] font-heading font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
              STUDYING: UNDER INVESTIGATION
            </span>
          </div>

          <h3 className="text-xl font-heading font-extrabold text-[#352D32]">
            THE STUDY PARTNERSHIP
          </h3>

          <p className="mt-2 text-xs sm:text-sm font-heading text-[#786B73] line-clamp-2">
            Studying together, spending time together, and wishing there had been more of it.
          </p>

          <div className="mt-4 pt-3 border-t border-[#FFDCC5] flex items-center justify-between text-xs font-heading font-bold text-amber-800">
            <span>{expandedCard === 'card-12' ? 'Hide Details' : 'Read 12th Memory Story'}</span>
            {expandedCard === 'card-12' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>

          {/* Expanded Content */}
          {expandedCard === 'card-12' && (
            <div
              className="mt-4 pt-4 border-t border-dashed border-[#FFDCC5] text-xs sm:text-sm text-[#352D32] leading-relaxed space-y-3 bg-[#FFF9F2] animate-in fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <p>
                Ab 12th ki baat karein toh, saath baithke padhna was genuinely one of my favourite things.
              </p>
              <p>
                And honestly, I wish I could've spent more time with you guys.
              </p>
              <p className="font-heading font-semibold text-rose-600">
                Especially with you, yaar.
              </p>
              <p>
                Mujhe regret hai ki main 11th aur 12th mein tum logon ke saath nahi reh paaya the way I would've liked to.
              </p>
              <p>
                Kabhi-kabhi sochta hoon ki agar saath hote toh aur kitni memories hoti.
              </p>
              <p>
                But yeah, I would've loved to experience those time with you.
              </p>
              {/* Honourable mentions */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <p className="font-heading font-bold text-amber-900 text-sm mb-1">
                  AND , THE HONOURABLE MENTIONS. 🏅
                </p>
                <p className="text-xs leading-relaxed text-[#352D32]">
                  Tere saath ki aur bhi bahut saari memories hain jo main yahaan likh nahi sakta.
                  because kuch baatein likhne se zyada saath baithke yaad karne mein achhi lagti hain.
                </p>
              </div>
              <p>
                Toh baaki sab jab milenge tab.
              </p>
              <p className="font-semibold text-rose-500">
                Aur haan, milna padega.
              </p>
              <p className="italic text-[#786B73]">
                Yeh website bana di hai toh iska matlab yeh nahi ki birthday gift ke saath friendship ka subscription bhi online renew kar diya. 😭❤️
              </p>
              <div className="text-center pt-2">
                <span className="inline-block text-xs font-heading font-bold bg-[#352D32] text-[#FFF9F2] px-3 py-1 rounded-full animate-pulse">
                  MORE MEMORIES LOADING... WHEN JB HUM MILENGE. ⏳
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
