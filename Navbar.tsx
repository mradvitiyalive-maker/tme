import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Sparkles, BookOpen, Camera } from 'lucide-react';
import { CHAPTERS, Chapter } from '../types';
import { soundManager } from '../utils/audio';
import { fireConfetti } from '../utils/confetti';

interface NavbarProps {
  currentChapterId: string;
  onNavigateChapter: (id: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  musicPlaying: boolean;
  onToggleMusic: () => void;
  onOpenPhotoCustomizer: () => void;
  onTriggerEasterEgg: (msg: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentChapterId,
  onNavigateChapter,
  soundEnabled,
  onToggleSound,
  musicPlaying,
  onToggleMusic,
  onOpenPhotoCustomizer,
  onTriggerEasterEgg,
}) => {
  const [navOpen, setNavOpen] = useState(false);
  const currentChapter = CHAPTERS.find((c) => c.id === currentChapterId) || CHAPTERS[0];
  const progressPercent = Math.round((currentChapter.number / CHAPTERS.length) * 100);

  const handleConfettiClick = () => {
    soundManager.playSparkle();
    fireConfetti();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFF9F2]/90 backdrop-blur-md border-b border-[#F8DDE5] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Left: Brand & Chapter Indicator */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onNavigateChapter('welcome');
              soundManager.playPop();
            }}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <span className="text-2xl group-hover:rotate-12 transition-transform">🎂</span>
            <div className="hidden sm:block">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EBA8BC] block font-heading">
                Special Edition
              </span>
              <span className="text-sm font-heading font-bold text-[#352D32]">
                THE MEITRII EXPERIENCE
              </span>
            </div>
          </button>

          {/* Chapter badge */}
          <div className="flex items-center gap-2 bg-[#F8DDE5]/60 border border-[#EBA8BC]/40 px-2.5 py-1 rounded-full text-xs font-heading font-semibold text-[#352D32]">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <span>
              CH. {currentChapter.number}/{CHAPTERS.length}
            </span>
            <span className="hidden md:inline text-[#786B73] font-normal">
              — {currentChapter.shortTitle}
            </span>
          </div>
        </div>

        {/* Center: Interactive action controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Confetti button */}
          <button
            onClick={handleConfettiClick}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-heading font-semibold bg-[#E8E1FA]/80 hover:bg-[#E8E1FA] border border-[#D4C7F5] text-[#352D32] flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
            title="Throw celebratory confetti!"
          >
            <span>🎉</span>
            <span className="hidden sm:inline">Confetti</span>
          </button>

          {/* Sound FX toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-full border text-xs font-heading transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-[#FFDCC5] border-[#FBC5A8] text-[#352D32]'
                : 'bg-white/80 border-[#E5E7EB] text-[#786B73]'
            }`}
            title={soundEnabled ? 'Sound Effects Enabled (Click to mute)' : 'Sound Effects Muted (Click to enable)'}
            aria-label="Toggle Sound Effects"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-rose-600" /> : <VolumeX className="w-4 h-4 text-[#786B73]" />}
          </button>

          {/* Background cozy lofi music toggle */}
          <button
            onClick={onToggleMusic}
            className={`p-2 rounded-full border text-xs font-heading transition-all cursor-pointer ${
              musicPlaying
                ? 'bg-[#F8DDE5] border-[#EBA8BC] text-[#352D32] ring-2 ring-rose-200'
                : 'bg-white/80 border-[#E5E7EB] text-[#786B73]'
            }`}
            title={musicPlaying ? 'Cozy Lo-fi Tune Playing (Click to pause)' : 'Play Gentle Ambient Melody'}
            aria-label="Toggle Music"
          >
            <Music className={`w-4 h-4 ${musicPlaying ? 'text-rose-500 animate-bounce' : 'text-[#786B73]'}`} />
          </button>

          {/* Photo Customizer Modal Trigger: 'Edit Photos' */}
          <button
            onClick={onOpenPhotoCustomizer}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full border border-rose-300 bg-[#F8DDE5]/60 hover:bg-[#F8DDE5] text-xs font-heading font-extrabold text-[#352D32] flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
            title="Upload and edit 5 personal photographs from your Mac"
          >
            <Camera className="w-4 h-4 text-rose-500" />
            <span>Edit Photos</span>
          </button>

          {/* Chapter Table of Contents Drawer toggle */}
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full border border-[#352D32]/20 bg-[#352D32] text-white hover:bg-[#4A3F46] text-xs font-heading font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            aria-label="Open Chapter Menu"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#FFDCC5]" />
            <span className="hidden sm:inline">Chapters</span>
          </button>
        </div>
      </div>

      {/* Progress Bar under navbar */}
      <div className="w-full h-1 bg-[#F8DDE5]/40 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#EBA8BC] via-[#E8E1FA] to-[#f43f5e] transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Chapter Drawer / Dropdown */}
      {navOpen && (
        <div className="absolute top-17 right-4 w-72 sm:w-80 bg-[#FFF9F2] border-2 border-[#EBA8BC] rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F8DDE5]">
            <span className="text-xs font-heading font-bold text-[#786B73] uppercase tracking-wider">
              Friendship Scrapbook Index
            </span>
            <button
              onClick={() => setNavOpen(false)}
              className="text-xs font-heading text-[#786B73] hover:text-[#352D32]"
            >
              Close ✕
            </button>
          </div>
          <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            {CHAPTERS.map((ch) => {
              const isActive = ch.id === currentChapterId;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    onNavigateChapter(ch.id);
                    setNavOpen(false);
                    soundManager.playPop();
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-heading flex items-center justify-between transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#F8DDE5] text-[#352D32] font-bold border border-[#EBA8BC]'
                      : 'hover:bg-white text-[#786B73] hover:text-[#352D32]'
                  }`}
                >
                  <span className="truncate">
                    <span className="font-mono text-xs opacity-60 mr-1.5">0{ch.number}.</span>
                    {ch.title}
                  </span>
                  {isActive && <span className="text-rose-500 text-xs">●</span>}
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#F8DDE5] text-center">
            <button
              onClick={() => {
                onTriggerEasterEgg('AB KITNA EXPLORE KAREGI, MADAM? 😭');
                soundManager.playPop();
              }}
              className="text-[11px] font-heading text-[#786B73] hover:text-rose-500 transition-colors"
            >
              ✨ Click here for free friendship advice
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
