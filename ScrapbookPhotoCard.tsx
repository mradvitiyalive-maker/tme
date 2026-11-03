import React, { useState } from 'react';
import { Camera, Sparkles, Heart, Eye, ArrowDown } from 'lucide-react';
import { WashiTape } from './CustomDoodles';
import { soundManager } from '../utils/audio';

interface PhotoCardProps {
  photoUrl?: string;
  slotLabel: string;
  caption: string;
  className?: string;
  rotation?: string;
  tapeColor?: 'pink' | 'lavender' | 'peach';
  aspectRatio?: '4/5' | '4/3' | '1/1' | 'auto';
  onOpenEditor?: () => void;
  objectPosition?: string;
  badge?: string;
  subcaption?: string;
}

export const ScrapbookPhotoCard: React.FC<PhotoCardProps> = ({
  photoUrl,
  slotLabel,
  caption,
  className = '',
  rotation = '-rotate-2',
  tapeColor = 'pink',
  aspectRatio = '4/5',
  onOpenEditor,
  objectPosition = 'center',
  badge,
  subcaption,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageError, setImageError] = useState(false);

  const aspectClass = {
    '4/5': 'aspect-[4/5]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    auto: 'min-h-[260px]',
  }[aspectRatio];

  return (
    <>
      <div
        className={`relative bg-white p-3 sm:p-4 rounded-2xl polaroid-shadow border border-[#F8DDE5] transition-all duration-300 hover:rotate-0 hover:scale-[1.02] group select-none ${rotation} ${className}`}
      >
        {/* Washi Tape at Top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <WashiTape color={tapeColor} />
        </div>

        {/* Photo Container Frame */}
        <div
          className={`relative w-full ${aspectClass} rounded-xl overflow-hidden bg-gradient-to-br from-[#FFF9F2] via-[#F8DDE5]/40 to-[#E8E1FA]/30 border border-[#E5E7EB] flex items-center justify-center`}
        >
          {photoUrl && !imageError ? (
            <div className="relative w-full h-full cursor-pointer" onClick={() => setIsZoomed(true)}>
              <img
                src={photoUrl}
                alt={caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ objectPosition }}
                loading="lazy"
                onError={() => setImageError(true)}
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white/90 text-[#352D32] px-2.5 py-1 rounded-full text-xs font-heading font-semibold shadow-xs flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> View Photo
                </span>
              </div>
            </div>
          ) : (
            /* Elegant Handcrafted Placeholder with direct upload trigger */
            <div
              onClick={() => {
                soundManager.playPop();
                if (onOpenEditor) onOpenEditor();
              }}
              className="w-full h-full flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-white/70 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-[#F8DDE5] flex items-center justify-center text-rose-500 mb-2 border border-[#EBA8BC]/60 group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6" />
              </div>
              <span className="text-xs font-heading font-bold text-[#352D32] block">
                {slotLabel}
              </span>
              <span className="text-[11px] font-note text-rose-600 font-semibold mt-1">
                Click to upload from Mac 📸
              </span>
              <span className="text-[9px] text-[#786B73] mt-1 font-body">
                (Recommended: 1200×1500)
              </span>
            </div>
          )}

          {badge && (
            <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] font-heading font-bold text-[#352D32] shadow-2xs border border-[#EBA8BC]/50">
              {badge}
            </div>
          )}
        </div>

        {/* Polaroid Bottom Caption Area */}
        <div className="mt-2.5 pt-1 text-center">
          <p className="font-note text-lg sm:text-xl text-[#352D32] font-bold leading-tight">
            {caption}
          </p>
          {subcaption && (
            <p className="text-[10px] font-heading text-[#786B73] mt-0.5">
              {subcaption}
            </p>
          )}

          {/* Quick upload / replace button */}
          {onOpenEditor && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playPop();
                onOpenEditor();
              }}
              className="mt-1 text-[10px] font-heading font-semibold text-rose-500 hover:text-rose-700 underline decoration-dotted cursor-pointer"
            >
              {photoUrl ? 'Replace Photo' : '+ Upload Photo'}
            </button>
          )}
        </div>
      </div>

      {/* Fullscreen Modal View if clicked */}
      {isZoomed && photoUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer animate-in fade-in"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-2xl max-h-[90vh] bg-white p-4 rounded-3xl polaroid-shadow border-2 border-[#EBA8BC] text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[75vh] overflow-hidden rounded-2xl flex items-center justify-center bg-[#FFF9F2]">
              <img
                src={photoUrl}
                alt={caption}
                className="max-h-[75vh] w-auto object-contain rounded-xl"
              />
            </div>
            <p className="font-note text-2xl font-bold text-[#352D32] mt-3">
              {caption}
            </p>
            <button
              onClick={() => setIsZoomed(false)}
              className="mt-2 px-4 py-1.5 rounded-xl bg-[#352D32] text-white text-xs font-heading font-bold hover:bg-[#4A3F46]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
