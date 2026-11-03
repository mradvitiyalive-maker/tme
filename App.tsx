import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SectionWelcome } from './components/SectionWelcome';
import { SectionOriginStory } from './components/SectionOriginStory';
import { SectionMemoryMuseum } from './components/SectionMemoryMuseum';
import { SectionThingsILike } from './components/SectionThingsILike';
import { SectionSpecialMemory } from './components/SectionSpecialMemory';
import { SectionOpenWhenSad } from './components/SectionOpenWhenSad';
import { SectionSecretLetter } from './components/SectionSecretLetter';
import { SectionFinalSurprise } from './components/SectionFinalSurprise';
import { EasterEggToast } from './components/EasterEggToast';
import { PhotoCustomizerModal } from './components/PhotoCustomizerModal';
import { FloatingBalloonsBackground } from './components/FloatingBalloonsBackground';
import { soundManager } from './utils/audio';
import { fireConfetti } from './utils/confetti';
import { CHAPTERS } from './types';
import { DEFAULT_PHOTO_ASSET_PATHS } from './utils/defaultPhotoPaths';
import {
  PhotoSlotId,
  getAllPhotosFromDB,
  savePhotoToDB,
  deletePhotoFromDB,
  clearAllPhotosFromDB,
} from './utils/photoStorage';

export function App() {
  const [currentChapterId, setCurrentChapterId] = useState<string>('welcome');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [musicPlaying, setMusicPlaying] = useState<boolean>(false);
  const [easterEggMessage, setEasterEggMessage] = useState<string | null>(null);
  const [toastTimeout, setToastTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState<boolean>(false);

  // 5 Slot Photos state with defaults pointing to /images/ static assets + IndexedDB overrides
  const [photos, setPhotos] = useState<Record<PhotoSlotId, string>>({
    homepage_meitrii: DEFAULT_PHOTO_ASSET_PATHS.homepage_meitrii,
    origin_meitrii: DEFAULT_PHOTO_ASSET_PATHS.origin_meitrii,
    museum_meitrii: DEFAULT_PHOTO_ASSET_PATHS.museum_meitrii,
    appreciation_meitrii: DEFAULT_PHOTO_ASSET_PATHS.appreciation_meitrii,
    special_together: DEFAULT_PHOTO_ASSET_PATHS.special_together,
  });

  // Load photos from IndexedDB on startup (if user uploaded overrides locally)
  useEffect(() => {
    async function loadStoredPhotos() {
      try {
        const stored = await getAllPhotosFromDB();
        if (stored && Object.keys(stored).length > 0) {
          // If stored contains photos, merge them and sync to /api/save-images so they get written to public/images
          setPhotos((prev) => ({ ...prev, ...stored }));

          // Proactively post to /api/save-images in dev so disk files are immediately created
          fetch('/api/save-images', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(stored),
          }).catch(() => {});
        }
      } catch {
        // Fallback gracefully
      }
    }
    loadStoredPhotos();
  }, []);

  // Track active chapter via IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentChapterId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    CHAPTERS.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigateChapter = (id: string) => {
    setCurrentChapterId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTriggerEasterEgg = (msg: string) => {
    if (toastTimeout) clearTimeout(toastTimeout);
    setEasterEggMessage(msg);
    const t = setTimeout(() => {
      setEasterEggMessage(null);
    }, 4500);
    setToastTimeout(t);
  };

  const handleToggleSound = () => {
    const next = soundManager.toggleSound();
    setSoundEnabled(next);
    if (next) {
      soundManager.playPop();
      handleTriggerEasterEgg('🔊 Sound effects activated! Enjoy the subtle chimes.');
    }
  };

  const handleToggleMusic = () => {
    const next = soundManager.toggleBackgroundMelody();
    setMusicPlaying(next);
    if (next) {
      setSoundEnabled(true);
      handleTriggerEasterEgg('🎵 Cozy background tune started.');
    } else {
      handleTriggerEasterEgg('⏸️ Background tune paused.');
    }
  };

  const handleSavePhoto = async (slotId: PhotoSlotId, dataUrl: string) => {
    setPhotos((prev) => ({ ...prev, [slotId]: dataUrl }));
    await savePhotoToDB(slotId, dataUrl);
  };

  const handleRemovePhoto = async (slotId: PhotoSlotId) => {
    setPhotos((prev) => ({ ...prev, [slotId]: '' }));
    await deletePhotoFromDB(slotId);
  };

  const handleResetAllPhotos = async () => {
    setPhotos({
      homepage_meitrii: '',
      origin_meitrii: '',
      museum_meitrii: '',
      appreciation_meitrii: '',
      special_together: '',
    });
    await clearAllPhotosFromDB();
    handleTriggerEasterEgg('🎨 Restored default scrapbook illustrations for all slots!');
  };

  const handleExportBackup = () => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(photos, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', 'meitrii_birthday_photos_backup.json');
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      handleTriggerEasterEgg('💾 Exported photo backup JSON successfully!');
    } catch {
      handleTriggerEasterEgg('❌ Could not export backup.');
    }
  };

  const handleImportBackup = async (backupJson: string) => {
    const parsed = JSON.parse(backupJson);
    const updated = { ...photos, ...parsed };
    setPhotos(updated);
    for (const key of Object.keys(parsed) as PhotoSlotId[]) {
      if (parsed[key]) {
        await savePhotoToDB(key, parsed[key]);
      }
    }
    handleTriggerEasterEgg('🎉 Restored all photos from backup file!');
  };

  return (
    <div className="min-h-screen bg-[#FFF9F2] text-[#352D32] selection:bg-[#F8DDE5] selection:text-[#352D32] font-body relative overflow-x-hidden">
      {/* Randomized Floating Festive Balloons Background */}
      <FloatingBalloonsBackground />

      {/* Scrapbook Navigation Bar */}
      <Navbar
        currentChapterId={currentChapterId}
        onNavigateChapter={handleNavigateChapter}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        musicPlaying={musicPlaying}
        onToggleMusic={handleToggleMusic}
        onOpenPhotoCustomizer={() => setIsPhotoModalOpen(true)}
        onTriggerEasterEgg={handleTriggerEasterEgg}
      />

      {/* Main Content: 8 Sequential Chapters */}
      <main className="relative z-10 space-y-12 sm:space-y-16 pb-24">
        {/* Section 1: The Birthday Welcome (Photo 1: Homepage Solo Portrait) */}
        <SectionWelcome
          onEnter={() => handleNavigateChapter('origin')}
          onTriggerEasterEgg={handleTriggerEasterEgg}
          photoUrl={photos.homepage_meitrii}
          onOpenEditor={() => setIsPhotoModalOpen(true)}
        />

        {/* Section 2: The Friendship Origin Story (Photo 2: Origin Story Solo) */}
        <SectionOriginStory
          onTriggerEasterEgg={handleTriggerEasterEgg}
          photoUrl={photos.origin_meitrii}
          onOpenEditor={() => setIsPhotoModalOpen(true)}
        />

        {/* Section 3: The Memory Museum (Photo 3: Memory Museum Solo) */}
        <SectionMemoryMuseum
          customPhotos={{}}
          photoUrl={photos.museum_meitrii}
          onOpenPhotoCustomizer={() => setIsPhotoModalOpen(true)}
          onTriggerEasterEgg={handleTriggerEasterEgg}
        />

        {/* Section 4: ONE FOR THE MEMORIES (Photo 5: Special Photograph of Both of Us Together) */}
        <SectionSpecialMemory
          photoUrl={photos.special_together}
          onOpenEditor={() => setIsPhotoModalOpen(true)}
          onTriggerEasterEgg={handleTriggerEasterEgg}
        />

        {/* Section 5: Things I Like About You (Photo 4: Appreciation Portrait) */}
        <SectionThingsILike
          onTriggerEasterEgg={handleTriggerEasterEgg}
          photoUrl={photos.appreciation_meitrii}
          onOpenEditor={() => setIsPhotoModalOpen(true)}
        />

        {/* Section 6: Open This When You're Sad */}
        <SectionOpenWhenSad onBackToBakwaas={() => handleNavigateChapter('special-memory')} />

        {/* Section 7: The Secret Message */}
        <SectionSecretLetter onNextChapter={() => handleNavigateChapter('final-surprise')} />

        {/* Section 8: The Final Birthday Surprise */}
        <SectionFinalSurprise
          onRestart={() => handleNavigateChapter('welcome')}
          onTriggerEasterEgg={handleTriggerEasterEgg}
        />
      </main>

      {/* Scrapbook Footer */}
      <footer className="border-t border-[#F8DDE5] bg-[#FFF9F2] py-8 text-center text-xs text-[#786B73] font-heading">
        <div className="max-w-xl mx-auto px-4 space-y-2">
          <p className="font-bold text-[#352D32]">
            THE MEITRII EXPERIENCE • SPECIAL BIRTHDAY EDITION 🎂
          </p>
          <p className="font-note text-lg text-rose-500 font-bold">
            "Made with 30% creativity, 20% nostalgia, and 50% bakwaas."
          </p>
          <p className="text-[11px] text-[#786B73]">
            Dedicated exclusively to Meitrii • Crafted by your favourite idiot. 🫂
          </p>
        </div>
      </footer>

      {/* Floating Easter Egg Toast Notification */}
      <EasterEggToast
        message={easterEggMessage}
        onClose={() => setEasterEggMessage(null)}
      />

      {/* Photo Customizer Modal with Mac Upload for 5 Slots */}
      <PhotoCustomizerModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        photos={photos}
        onSavePhoto={handleSavePhoto}
        onRemovePhoto={handleRemovePhoto}
        onResetAllPhotos={handleResetAllPhotos}
        onExportBackup={handleExportBackup}
        onImportBackup={handleImportBackup}
      />
    </div>
  );
}

export default App;
