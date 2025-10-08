<script setup lang="ts">
import { useNotesStore } from '@/store/notes'
import { computed } from 'vue'

const store = useNotesStore()
const notes = computed(() => store.filteredNotes)
const selectedId = computed(() => store.selectedId)
</script>

<template>
  <div class="card panel">
    <div class="panel-header">
      <input
        class="input"
        type="search"
        placeholder="Search notes..."
        :value="store.search"
        @input="store.setSearch(($event.target as HTMLInputElement).value)"
      />
    </div>
    <ul class="list">
      <li
        v-for="n in notes"
        :key="n.id"
        :class="{ active: n.id === selectedId }"
        @click="store.select(n.id)"
      >
        <div class="title">{{ n.title || 'Untitled' }}</div>
        <div class="meta">
          <span>{{ new Date(n.updatedAt).toLocaleString() }}</span>
          <span v-if="n.tags?.length">• {{ n.tags.join(', ') }}</span>
        </div>
        <p class="preview">{{ n.content?.slice(0, 120) }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.panel {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
}

.panel-header {
  padding: 12px;
  border-bottom: 1px solid var(--ocean-border);
  background: var(--ocean-surface);
  border-top-left-radius: var(--radius-md);
  border-top-right-radius: var(--radius-md);
}

.list {
  list-style: none;
  margin: 0;
  padding: 8px;
  overflow: auto;
  display: grid;
  gap: 8px;
}
.list li {
  border: 1px solid var(--ocean-border);
  background: white;
  border-radius: var(--radius-sm);
  padding: 10px 12px;
  cursor: pointer;
  transition: background .2s ease, border-color .2s ease, transform .05s ease;
}
.list li:hover {
  background: #f8fafc;
  border-color: #dbeafe;
}
.list li.active {
  border-color: var(--ocean-primary);
  box-shadow: 0 0 0 3px rgba(37,99,235,.10) inset;
}
.title {
  font-weight: 600;
}
.meta {
  color: var(--ocean-muted);
  font-size: 12px;
  margin-top: 2px;
}
.preview {
  color: var(--ocean-text);
  margin-top: 6px;
  font-size: 13px;
  white-space: pre-line;
}
</style>
