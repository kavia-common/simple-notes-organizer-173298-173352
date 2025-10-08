# Simple Notes Frontend (Vue 3 + Vite)

A simple, modern notes organizer that lets you create, edit, delete, and tag notes. This app follows the "Ocean Professional" theme (blue primary with amber accents) and persists data to localStorage. No backend required.

- Tech: Vue 3, Vite, TypeScript, Pinia
- Persistence: localStorage
- Port: 3000

## Quick Start

1) Install dependencies
```sh
npm install
```

2) Run in development (served on port 3000)
```sh
npm run dev
```

3) Build for production
```sh
npm run build
```

The Vite config is pre-set to:
- host 0.0.0.0
- port 3000 (strict)
- CORS enabled

## Features

- Ocean Professional theme with:
  - Primary: #2563EB
  - Secondary/Success: #F59E0B
  - Error: #EF4444
  - Background: #f9fafb
  - Surface: #ffffff
  - Text: #111827
- Layout:
  - Sidebar: brand, New Note, filters, tag manager
  - Main: notes list (left), editor (right)
- Notes:
  - Create, select, edit title/body
  - Delete selected note
  - Tagging: add/remove tags on a note, filter by tag
  - Search notes by title/body
  - Auto-save to localStorage
  - Seed data on first load
- Zero backend dependencies

## Manual Testing Checklist

- Launch the app: `npm run dev` and open the provided URL on port 3000.
- Sidebar:
  - Click "＋ New Note" creates and selects a new note.
  - Add a tag via input then "Add", see it appear in the tags list.
  - Click a tag to filter notes; click "All notes" to clear filter.
  - Delete a tag via ✕ and confirm; it removes from all notes.
- Notes List:
  - Use the search input to filter notes by title/body text.
  - Click a note to select it; it highlights as active.
- Editor:
  - Change the title and click elsewhere; it saves.
  - Type content and click elsewhere; it saves.
  - Add a tag in the editor; it shows as a chip and on the note list meta.
  - Remove a tag chip via ✕.
  - Click Delete to remove the selected note; confirm.
- Persistence:
  - Reload the page; notes, tags, and selection persist.

## Project Structure (key files)

- src/assets/theme.css — Ocean theme CSS variables and base UI tokens
- src/utils/storage.ts — localStorage load/save and seed
- src/store/notes.ts — Pinia store (notes, tags, filters, actions)
- src/components/Sidebar.vue — navigation, filters, tag manager, new note
- src/components/NotesList.vue — search and list of notes
- src/components/NoteEditor.vue — title/body editor and tag chips
- src/components/TagChips.vue — chip UI with optional remove
- src/components/EmptyState.vue — empty selection state (not currently used)
- src/App.vue — overall layout

## Notes

- No environment variables are required.
- No external APIs are called; this app works fully offline using your browser storage.
- Routing remains installed for template compatibility, but the app uses a single-page layout by default.
