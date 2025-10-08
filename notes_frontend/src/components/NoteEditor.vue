<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useNotesStore } from '@/store/notes'
import TagChips from './TagChips.vue'

const store = useNotesStore()
const note = computed(() => store.selected)

const localTitle = ref(note.value?.title ?? '')
const localContent = ref(note.value?.content ?? '')
const newTag = ref('')

watch(
  note,
  (n) => {
    localTitle.value = n?.title ?? ''
    localContent.value = n?.content ?? ''
  },
  { immediate: true }
)

function saveTitle() {
  if (!note.value) return
  store.updateNote({ title: localTitle.value })
}

function saveContent() {
  if (!note.value) return
  store.updateNote({ content: localContent.value })
}

function addTag() {
  if (!note.value) return
  const t = newTag.value.trim()
  if (!t) return
  store.addTagToSelected(t)
  newTag.value = ''
}

function removeTag(tag: string) {
  if (!note.value) return
  store.removeTagFromSelected(tag)
}

function confirmDelete() {
  if (!note.value) return
  if (confirm('Delete this note? This action cannot be undone.')) {
    store.deleteSelected()
  }
}
</script>

<template>
  <div class="editor card" v-if="note">
    <div class="toolbar">
      <input
        v-model="localTitle"
        class="input title"
        placeholder="Note title"
        @change="saveTitle"
      />
      <div class="actions">
        <div class="tag-add">
          <input
            v-model="newTag"
            class="input"
            placeholder="Add tag"
            @keydown.enter="addTag"
          />
          <button class="button" @click="addTag">Add</button>
        </div>
        <button class="button danger" @click="confirmDelete">Delete</button>
      </div>
    </div>

    <div class="tags-row">
      <TagChips :tags="note.tags" removable @remove="removeTag" />
    </div>

    <textarea
      v-model="localContent"
      class="textarea area"
      placeholder="Write your note..."
      @change="saveContent"
    ></textarea>
  </div>

  <div v-else class="editor">
    <div class="placeholder">
      <h3 class="helper">Select or create a note to start writing.</h3>
    </div>
  </div>
</template>

<style scoped>
.editor {
  height: 100%;
  display: grid;
  grid-template-rows: auto auto 1fr;
}
.toolbar {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  padding: 12px;
  border-bottom: 1px solid var(--ocean-border);
}
.title {
  font-size: 18px;
  font-weight: 600;
}
.actions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.tag-add {
  display: grid;
  grid-template-columns: 180px auto;
  gap: 8px;
}
.tags-row {
  padding: 10px 12px;
  border-bottom: 1px solid var(--ocean-border);
  background: #fbfdff;
}
.area {
  width: 100%;
  padding: 14px;
  border: none;
  outline: none;
  resize: none;
  font: inherit;
  font-size: 14px;
}
.placeholder {
  display: grid;
  place-items: center;
  height: 100%;
}
</style>
