export type Note = {
  id: string
  title: string
  content: string
  tags: string[]
  updatedAt: number
  createdAt: number
}

export type NotesState = {
  notes: Note[]
  tags: string[]
  selectedId: string | null
  version: number
}

const STORAGE_KEY = 'notes.ocean.v1'
const STORAGE_VERSION = 1

const seed: NotesState = {
  version: STORAGE_VERSION,
  tags: ['Work', 'Personal', 'Ideas'],
  selectedId: null,
  notes: [
    {
      id: cryptoRandomId(),
      title: 'Welcome to Simple Notes',
      content:
        'This is your new notes space. Use the sidebar to filter by tags, the list to select a note, and the editor to update content.\n\n- Create notes with the New Note button\n- Add tags to organize\n- Your notes are saved automatically to your browser (localStorage)',
      tags: ['Personal'],
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
      updatedAt: Date.now() - 1000 * 60 * 60 * 2
    },
    {
      id: cryptoRandomId(),
      title: 'Project Ideas',
      content: '• Build a markdown notes app\n• Explore Vue 3 + Vite\n• Add keyboard shortcuts',
      tags: ['Ideas', 'Work'],
      createdAt: Date.now() - 1000 * 60 * 60 * 24,
      updatedAt: Date.now() - 1000 * 60 * 30
    }
  ]
}

// PUBLIC_INTERFACE
export function loadState(): NotesState {
  /** Loads notes state from localStorage, with basic versioning and seeded defaults. */
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      saveState(seed)
      // Clone seed to avoid external mutation
      const cloned = JSON.parse(JSON.stringify(seed)) as NotesState
      return cloned
    }
    const data = JSON.parse(raw) as NotesState
    if (!data.version || data.version !== STORAGE_VERSION) {
      const upgraded = upgrade(data)
      saveState(upgraded)
      return upgraded
    }
    return data
  } catch {
    saveState(seed)
    return JSON.parse(JSON.stringify(seed)) as NotesState
  }
}

// PUBLIC_INTERFACE
export function saveState(state: NotesState): void {
  /** Persists notes state to localStorage. */
  const safe: NotesState = {
    ...state,
    version: STORAGE_VERSION
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(safe))
}

// PUBLIC_INTERFACE
export function cryptoRandomId(): string {
  /** Generates a reasonably unique id string. */
  type GlobalCrypto = { crypto?: { randomUUID?: () => string } }
  const g = globalThis as GlobalCrypto
  const maybeUUID = g.crypto?.randomUUID
  if (typeof maybeUUID === 'function') {
    return maybeUUID()
  }
  return 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function upgrade(): NotesState {
  // For future migrations. For now, if unknown, fallback to seed.
  return seed
}
