import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { cryptoRandomId, loadState, saveState, type Note } from '@/utils/storage'

// PUBLIC_INTERFACE
export const useNotesStore = defineStore('notes', () => {
  /** Notes store managing notes, tags, selection, filters and persistence. */
  const state = ref(loadState())

  const search = ref('')
  const activeTag = ref<string | null>(null)

  const notes = computed(() => state.value.notes)
  const tags = computed(() => state.value.tags)
  const selectedId = computed(() => state.value.selectedId)
  const selected = computed<Note | null>(() => {
    return state.value.notes.find(n => n.id === state.value.selectedId) || null
  })

  const filteredNotes = computed(() => {
    let list = [...state.value.notes]
    if (activeTag.value) {
      list = list.filter(n => n.tags.includes(activeTag.value as string))
    }
    if (search.value.trim()) {
      const q = search.value.trim().toLowerCase()
      list = list.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q))
    }
    // sort by updated desc
    list.sort((a, b) => b.updatedAt - a.updatedAt)
    return list
  })

  // Persist on change
  watch(
    state,
    (s) => {
      saveState(s)
    },
    { deep: true }
  )

  // PUBLIC_INTERFACE
  function createNote(title = 'Untitled'): Note {
    /** Creates a new note and selects it. */
    const note: Note = {
      id: cryptoRandomId(),
      title,
      content: '',
      tags: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    state.value.notes.push(note)
    state.value.selectedId = note.id
    return note
  }

  // PUBLIC_INTERFACE
  function updateNote(patch: Partial<Note>) {
    /** Updates the currently selected note with a partial patch. */
    const n = state.value.notes.find(n => n.id === state.value.selectedId)
    if (!n) return
    Object.assign(n, patch)
    n.updatedAt = Date.now()
  }

  // PUBLIC_INTERFACE
  function deleteSelected() {
    /** Deletes the selected note and updates selection. */
    const id = state.value.selectedId
    if (!id) return
    const idx = state.value.notes.findIndex(n => n.id === id)
    if (idx >= 0) {
      state.value.notes.splice(idx, 1)
      state.value.selectedId = state.value.notes[0]?.id || null
    }
  }

  // PUBLIC_INTERFACE
  function select(id: string) {
    /** Selects a note by id. */
    state.value.selectedId = id
  }

  // PUBLIC_INTERFACE
  function addTagToSelected(tag: string) {
    /** Adds a tag to the selected note, creating it globally if missing. */
    const n = state.value.notes.find(n => n.id === state.value.selectedId)
    if (!n) return
    const t = tag.trim()
    if (!t) return
    if (!state.value.tags.includes(t)) state.value.tags.push(t)
    if (!n.tags.includes(t)) n.tags.push(t)
    n.updatedAt = Date.now()
  }

  // PUBLIC_INTERFACE
  function removeTagFromSelected(tag: string) {
    /** Removes a tag from the selected note (does not delete global tag). */
    const n = state.value.notes.find(n => n.id === state.value.selectedId)
    if (!n) return
    n.tags = n.tags.filter(t => t !== tag)
    n.updatedAt = Date.now()
  }

  // PUBLIC_INTERFACE
  function createTag(tag: string) {
    /** Creates a global tag if it does not exist. */
    const t = tag.trim()
    if (!t) return
    if (!state.value.tags.includes(t)) state.value.tags.push(t)
  }

  // PUBLIC_INTERFACE
  function deleteTag(tag: string) {
    /** Deletes a global tag and removes it from all notes. */
    state.value.tags = state.value.tags.filter(t => t !== tag)
    state.value.notes.forEach(n => {
      n.tags = n.tags.filter(t => t !== tag)
    })
    if (activeTag.value === tag) activeTag.value = null
  }

  // PUBLIC_INTERFACE
  function setSearch(q: string) {
    /** Sets the search query for filtering. */
    search.value = q
  }

  // PUBLIC_INTERFACE
  function setActiveTag(tag: string | null) {
    /** Sets the active tag filter. */
    activeTag.value = tag
  }

  return {
    // state/data
    notes,
    tags,
    selectedId,
    selected,
    filteredNotes,
    search,
    activeTag,

    // actions
    createNote,
    updateNote,
    deleteSelected,
    select,
    addTagToSelected,
    removeTagFromSelected,
    createTag,
    deleteTag,
    setSearch,
    setActiveTag
  }
})
