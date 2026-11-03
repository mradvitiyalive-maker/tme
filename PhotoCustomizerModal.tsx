import React, { useState } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  RotateCcw,
  Check,
  Info,
  Download,
  UploadCloud,
  Trash2,
  Sparkles,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { PHOTO_SLOTS, PhotoSlotId, PhotoSlotConfig } from '../utils/photoStorage';
import { soundManager } from '../utils/audio';

interface PhotoCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: Record<PhotoSlotId, string>;
  onSavePhoto: (slotId: PhotoSlotId, dataUrl: string) => Promise<void>;
  onRemovePhoto: (slotId: PhotoSlotId) => Promise<void>;
  onResetAllPhotos: () => Promise<void>;
  onExportBackup: () => void;
  onImportBackup: (backupJson: string) => Promise<void>;
}

export const PhotoCustomizerModal: React.FC<PhotoCustomizerModalProps> = ({
  isOpen,
  onClose,
  photos,
  onSavePhoto,
  onRemovePhoto,
  onResetAllPhotos,
  onExportBackup,
  onImportBackup,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<PhotoSlotId>('homepage_meitrii');
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'slots' | 'backup' | 'guide'>('slots');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const currentSlotConfig = PHOTO_SLOTS.find((s) => s.id === selectedSlot) || PHOTO_SLOTS[0];

  const handleFileSelect = (slotId: PhotoSlotId, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate that it's an image file
    if (!file.type.startsWith('image/')) {
      setStatusMessage('⚠️ Please select a valid image file (JPG, PNG, WEBP, etc.)');
      return;
    }

    setIsProcessing(true);
    setStatusMessage('Reading photograph from Mac...');

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setPreviewDataUrl(dataUrl);
      try {
        await onSavePhoto(slotId, dataUrl);
        // Automatically sync to disk in dev environment
        fetch('/api/save-images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ [slotId]: dataUrl }),
        }).catch(() => {});

        soundManager.playSparkle();
        setStatusMessage(`✅ Saved to "${currentSlotConfig.label}" and updated assets!`);
      } catch (err) {
        setStatusMessage('❌ Error saving to browser storage.');
      } finally {
        setIsProcessing(false);
      }
    };
    reader.onerror = () => {
      setIsProcessing(false);
      setStatusMessage('❌ Could not read the selected file.');
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = async (slotId: PhotoSlotId) => {
    setIsProcessing(true);
    try {
      await onRemovePhoto(slotId);
      soundManager.playPop();
      setStatusMessage('🗑️ Photo removed from slot.');
      setPreviewDataUrl(null);
    } catch {
      setStatusMessage('❌ Error removing photo.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackupFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const text = reader.result as string;
        await onImportBackup(text);
        soundManager.playFanfare();
        setStatusMessage('🎉 Backup restored successfully! All photos updated.');
      } catch {
        setStatusMessage('❌ Invalid backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#FFF9F2] border-2 border-[#EBA8BC] rounded-3xl max-w-3xl w-full p-4 sm:p-6 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#F8DDE5]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#F8DDE5] rounded-xl text-rose-500 shadow-2xs">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-heading font-extrabold text-[#352D32]">
                Personal Photo Editor 📸
              </h3>
              <p className="text-xs text-[#786B73] font-medium">
                Upload 4 solo photos of Meitrii + 1 special memory photo directly from your Mac
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F8DDE5] text-[#786B73] hover:text-[#352D32] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 my-3 bg-white/70 p-1 rounded-xl border border-[#F8DDE5]">
          <button
            onClick={() => setActiveTab('slots')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
              activeTab === 'slots'
                ? 'bg-[#352D32] text-white shadow-xs'
                : 'text-[#786B73] hover:text-[#352D32]'
            }`}
          >
            5 Photo Slots (Upload from Mac)
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
              activeTab === 'backup'
                ? 'bg-[#352D32] text-white shadow-xs'
                : 'text-[#786B73] hover:text-[#352D32]'
            }`}
          >
            Export / Restore Backup
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-[#352D32] text-white shadow-xs'
                : 'text-[#786B73] hover:text-[#352D32]'
            }`}
          >
            Help & Guidelines
          </button>
        </div>

        {/* Feedback message banner */}
        {statusMessage && (
          <div className="mb-3 px-3 py-1.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-heading font-semibold text-rose-700 flex items-center justify-between animate-in fade-in">
            <span>{statusMessage}</span>
            <button onClick={() => setStatusMessage(null)} className="text-xs hover:text-rose-900 ml-2">
              ✕
            </button>
          </div>
        )}

        {/* Modal Main Content */}
        <div className="overflow-y-auto pr-1 flex-1 space-y-4">
          {activeTab === 'slots' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              {/* Left Column: 5 Slot Selector Buttons */}
              <div className="md:col-span-5 space-y-2">
                <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#786B73] block px-1">
                  Select Upload Slot:
                </span>
                {PHOTO_SLOTS.map((slot) => {
                  const isSelected = slot.id === selectedSlot;
                  const hasPhoto = Boolean(photos[slot.id]);
                  return (
                    <button
                      key={slot.id}
                      onClick={() => {
                        setSelectedSlot(slot.id);
                        setPreviewDataUrl(null);
                        soundManager.playPop();
                      }}
                      className={`w-full text-left p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#F8DDE5] border-rose-400 ring-2 ring-rose-200 shadow-xs'
                          : 'bg-white hover:bg-[#FFF9F2] border-[#F8DDE5]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold ${
                            slot.category === 'together'
                              ? 'bg-rose-100 text-rose-600'
                              : 'bg-purple-100 text-purple-700'
                          }`}
                        >
                          {slot.category === 'together' ? '❤️' : '👤'}
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-heading font-extrabold text-[#352D32] truncate">
                            {slot.label}
                          </p>
                          <span className="text-[10px] text-[#786B73] font-medium block">
                            {slot.sectionName}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 ml-2">
                        {hasPhoto ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-heading font-bold px-2 py-0.5 rounded-full">
                            <Check className="w-3 h-3" /> Set
                          </span>
                        ) : (
                          <span className="text-[10px] font-heading text-[#786B73] bg-gray-100 px-2 py-0.5 rounded-full">
                            Empty
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Selected Slot Details & Mac Upload Dropzone */}
              <div className="md:col-span-7 bg-white rounded-2xl border-2 border-[#EBA8BC] p-4 shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-2 border-b border-[#F8DDE5] pb-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm sm:text-base font-heading font-black text-[#352D32]">
                        {currentSlotConfig.label}
                      </h4>
                      <span
                        className={`text-[9px] font-heading font-bold uppercase px-2 py-0.5 rounded-full ${
                          currentSlotConfig.category === 'together'
                            ? 'bg-rose-100 text-rose-700 border border-rose-300'
                            : 'bg-purple-100 text-purple-700 border border-purple-300'
                        }`}
                      >
                        {currentSlotConfig.person}
                      </span>
                    </div>
                    <p className="text-xs text-[#786B73] mt-0.5">
                      {currentSlotConfig.description}
                    </p>
                  </div>
                </div>

                {/* Dimensions recommendation pill */}
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-heading bg-[#FFF9F2] p-2 rounded-xl border border-[#F8DDE5] text-[#786B73]">
                  <span>📐 Aspect: <strong className="text-[#352D32]">{currentSlotConfig.recommendedAspect}</strong></span>
                  <span>•</span>
                  <span>Recommended: <strong className="text-[#352D32]">{currentSlotConfig.recommendedDim}</strong></span>
                </div>

                {/* Photo Preview Frame */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#FFF9F2] to-[#F8DDE5]/30 border-2 border-dashed border-[#EBA8BC] flex items-center justify-center p-2">
                  {photos[selectedSlot] ? (
                    <img
                      src={photos[selectedSlot]}
                      alt="Uploaded slot preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <div className="w-12 h-12 rounded-full bg-[#F8DDE5] flex items-center justify-center text-rose-500 mx-auto mb-2 border border-[#EBA8BC]">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                      <p className="text-xs font-heading font-bold text-[#352D32]">
                        No picture uploaded yet
                      </p>
                      <p className="text-[11px] text-[#786B73] mt-0.5">
                        Click below to pick a photo from your Mac
                      </p>
                    </div>
                  )}
                </div>

                {/* Mac File Picker Actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#352D32] hover:bg-[#4A3F46] text-white text-xs font-heading font-bold shadow-md cursor-pointer transition-all hover:scale-105 active:scale-95">
                    <Upload className="w-4 h-4 text-rose-400" />
                    <span>Upload from Mac 📂</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileSelect(selectedSlot, e)}
                    />
                  </label>

                  {photos[selectedSlot] && (
                    <button
                      type="button"
                      onClick={() => handleRemove(selectedSlot)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-heading font-bold border border-rose-200 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="bg-white p-5 rounded-2xl border border-[#F8DDE5] space-y-4">
              <div>
                <h4 className="text-sm font-heading font-extrabold text-[#352D32]">
                  Export or Restore Photo Backup 💾
                </h4>
                <p className="text-xs text-[#786B73] mt-1 leading-relaxed">
                  Your uploaded photographs are stored safely in your browser’s IndexedDB storage.
                  Because browser storage belongs to this Mac and browser, you can export a single backup JSON file anytime.
                  If you switch computers, you can restore all 5 photos with one click!
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={async () => {
                    setIsProcessing(true);
                    setStatusMessage('Saving photographs to public/images/ on disk...');
                    try {
                      const res = await fetch('/api/save-images', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(photos),
                      });
                      const json = await res.json();
                      if (json.success) {
                        soundManager.playSparkle();
                        setStatusMessage('🎉 All photographs successfully saved to public/images/ directory!');
                      } else {
                        setStatusMessage('⚠️ Could not save images.');
                      }
                    } catch {
                      setStatusMessage('⚠️ Save request error.');
                    } finally {
                      setIsProcessing(false);
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-heading font-bold shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Bake Current Photos to Project Files (public/images/)</span>
                </button>

                <button
                  onClick={onExportBackup}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#352D32] text-white text-xs font-heading font-bold hover:bg-[#4A3F46] shadow-sm cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Export Photo Backup JSON</span>
                </button>

                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFF9F2] hover:bg-[#F8DDE5] border-2 border-[#EBA8BC] text-[#352D32] text-xs font-heading font-bold shadow-2xs cursor-pointer">
                  <UploadCloud className="w-4 h-4 text-purple-500" />
                  <span>Restore from Backup File</span>
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleBackupFileSelect}
                  />
                </label>
              </div>

              <div className="pt-3 border-t border-[#F8DDE5]">
                <button
                  onClick={async () => {
                    if (window.confirm('Are you sure you want to remove all 5 uploaded photos?')) {
                      await onResetAllPhotos();
                      soundManager.playPop();
                      setStatusMessage('Reset all photos to default handcrafted placeholders.');
                    }
                  }}
                  className="text-xs font-heading font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All 5 Slots</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="bg-white p-5 rounded-2xl border border-[#F8DDE5] space-y-3 text-xs leading-relaxed text-[#352D32]">
              <h4 className="text-sm font-heading font-bold text-rose-600">
                Visual Arrangement & Mac Upload Guidelines:
              </h4>
              <ul className="list-disc list-inside space-y-1.5 text-[#786B73]">
                <li>
                  <strong className="text-[#352D32]">Slot 1 (Homepage):</strong> Meitrii's main portrait placed on the scrapbook cover. Caption: <em>"The birthday girl herself. ✨"</em>
                </li>
                <li>
                  <strong className="text-[#352D32]">Slot 2 (Origin Story):</strong> Nostalgic solo photo placed in a scrapbook frame beside the Class 7th last bench story.
                </li>
                <li>
                  <strong className="text-[#352D32]">Slot 3 (Memory Museum):</strong> Solo portrait placed in the Class 10th polaroid card.
                </li>
                <li>
                  <strong className="text-[#352D32]">Slot 4 (Appreciation):</strong> Portrait card in the Things I Like About You section.
                </li>
                <li>
                  <strong className="text-[#352D32]">Slot 5 (Special Memory — Both of Us):</strong> Given its own dedicated section <em>"ONE FOR THE MEMORIES ❤️"</em> hidden behind a sealed envelope so it feels like a special moment.
                </li>
              </ul>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 mt-2 text-amber-800 space-y-1">
                <p className="font-heading font-bold text-[11px]">
                  💡 Public Vercel Deployment Note:
                </p>
                <p className="text-[11px] leading-relaxed">
                  The deployed website uses project-relative static assets bundled in <code>public/images/</code>. Any photographs saved via "Bake Current Photos to Project Files" become part of the public build, so anyone visiting your public Vercel link will see them without needing your local browser storage.
                </p>
                <p className="text-[11px] text-[#786B73]">
                  Note: Editing photos in a local browser session updates that device's preview immediately, but does not automatically re-deploy a live website.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-3 pt-3 border-t border-[#F8DDE5] flex items-center justify-between">
          <span className="text-[11px] font-heading text-[#786B73]">
            IndexedDB Offline Storage Active 🔒
          </span>

          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="px-6 py-2 rounded-xl bg-[#352D32] hover:bg-[#4A3F46] text-white text-xs font-heading font-bold shadow-xs cursor-pointer"
          >
            Done & Preview Website ✨
          </button>
        </div>
      </div>
    </div>
  );
};
