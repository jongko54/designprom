export type SavedRoughDraft = {
  colorDirection: string;
  createdAt: string;
  dnaLabel: string;
  id: string;
  imageHeight: number;
  imageUrl: string;
  imageWidth: number;
  medium: string;
  model: string;
  motionLevel: string;
  pageType: string;
  prompt: string;
  seed?: string | null;
  styleLabel: string;
  title: string;
  tone: string;
};

const STORAGE_KEY = "designprom.saved-rough-drafts";
const UPDATE_EVENT = "designprom:rough-drafts-updated";
const EPHEMERAL_FLAG = "designprom.saved-rough-drafts.ephemeral";

function isBrowser() {
  return typeof window !== "undefined";
}

function ensureEphemeralStore() {
  if (!isBrowser()) {
    return;
  }

  if (!window.sessionStorage.getItem(EPHEMERAL_FLAG)) {
    window.localStorage.removeItem(STORAGE_KEY);
    window.sessionStorage.setItem(EPHEMERAL_FLAG, "true");
  }
}

function readDrafts() {
  ensureEphemeralStore();

  try {
    const value = window.sessionStorage.getItem(STORAGE_KEY);

    if (!value) {
      return [];
    }

    const parsed = JSON.parse(value) as SavedRoughDraft[];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeDrafts(items: SavedRoughDraft[]) {
  ensureEphemeralStore();
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
}

export function readSavedRoughDrafts(): SavedRoughDraft[] {
  if (!isBrowser()) {
    return [];
  }

  return readDrafts();
}

export function saveRoughDraft(draft: SavedRoughDraft) {
  if (!isBrowser()) {
    return;
  }

  const current = readDrafts();
  const next = [draft, ...current.filter((entry) => entry.id !== draft.id)].slice(0, 24);

  writeDrafts(next);
}

export function removeSavedRoughDraft(id: string) {
  if (!isBrowser()) {
    return;
  }

  const next = readDrafts().filter((entry) => entry.id !== id);
  writeDrafts(next);
}

export function clearSavedRoughDrafts() {
  if (!isBrowser()) {
    return;
  }

  ensureEphemeralStore();
  window.sessionStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
}

export function subscribeToSavedRoughDrafts(callback: () => void) {
  if (!isBrowser()) {
    return () => {};
  }

  ensureEphemeralStore();

  const handleUpdate = () => callback();
  const handleBeforeUnload = () => {
    window.sessionStorage.removeItem(STORAGE_KEY);
  };

  window.addEventListener("storage", handleUpdate);
  window.addEventListener(UPDATE_EVENT, handleUpdate);
  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("storage", handleUpdate);
    window.removeEventListener(UPDATE_EVENT, handleUpdate);
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}
