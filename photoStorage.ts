// IndexedDB helper for robust, persistent client-side photo storage without localStorage size limits

const DB_NAME = 'MeitriiBirthdayDB';
const DB_VERSION = 1;
const STORE_NAME = 'photos';

export interface PhotoSlotConfig {
  id: PhotoSlotId;
  label: string;
  category: 'solo' | 'together';
  person: string;
  recommendedAspect: string;
  recommendedDim: string;
  description: string;
  sectionName: string;
}

export type PhotoSlotId =
  | 'homepage_meitrii'
  | 'origin_meitrii'
  | 'museum_meitrii'
  | 'appreciation_meitrii'
  | 'special_together';

export const PHOTO_SLOTS: PhotoSlotConfig[] = [
  {
    id: 'homepage_meitrii',
    label: 'Homepage — Meitrii',
    category: 'solo',
    person: 'Meitrii Solo',
    recommendedAspect: '4:5',
    recommendedDim: '1200 × 1500 px',
    description: 'Main birthday portrait on the scrapbook cover. Visible immediately when she opens the website.',
    sectionName: 'Homepage (Welcome Screen)',
  },
  {
    id: 'origin_meitrii',
    label: 'Friendship Origin Story — Meitrii',
    category: 'solo',
    person: 'Meitrii Solo',
    recommendedAspect: '4:5',
    recommendedDim: '1200 × 1500 px',
    description: 'Nostalgic memory photo placed alongside the Class 7th last bench story.',
    sectionName: 'Origin Story (Class 7th)',
  },
  {
    id: 'museum_meitrii',
    label: 'Memory Museum — Meitrii',
    category: 'solo',
    person: 'Meitrii Solo',
    recommendedAspect: '4:5',
    recommendedDim: '1200 × 1500 px',
    description: 'Polaroid memory portrait placed in the Memory Museum.',
    sectionName: 'Memory Museum',
  },
  {
    id: 'appreciation_meitrii',
    label: 'Appreciation Section — Meitrii',
    category: 'solo',
    person: 'Meitrii Solo',
    recommendedAspect: '4:5',
    recommendedDim: '1200 × 1500 px',
    description: 'Elegant portrait card in the Things I Like About You appreciation section.',
    sectionName: 'Things I Like About You',
  },
  {
    id: 'special_together',
    label: 'Special Memory — Both of Us',
    category: 'together',
    person: 'Both of Us Together ❤️',
    recommendedAspect: '4:3 or 16:9',
    recommendedDim: '1600 × 1200 px',
    description: 'Special photograph clicked specially for this website. Hidden behind an interactive sealed memory envelope.',
    sectionName: 'One For The Memories Section',
  },
];

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllPhotosFromDB(): Promise<Record<PhotoSlotId, string>> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const result: Record<string, string> = {};

      const cursorRequest = store.openCursor();
      cursorRequest.onsuccess = (e) => {
        const cursor = (e.target as IDBRequest<IDBCursorWithValue | null>).result;
        if (cursor) {
          result[cursor.key as string] = cursor.value as string;
          cursor.continue();
        } else {
          resolve(result as Record<PhotoSlotId, string>);
        }
      };
      cursorRequest.onerror = () => {
        resolve({} as Record<PhotoSlotId, string>);
      };
    });
  } catch {
    return {} as Record<PhotoSlotId, string>;
  }
}

export async function savePhotoToDB(id: PhotoSlotId, dataUrl: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(dataUrl, id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function deletePhotoFromDB(id: PhotoSlotId): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function clearAllPhotosFromDB(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
