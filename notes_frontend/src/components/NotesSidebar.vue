<script setup lang="ts">
import { ref, computed } from 'vue'
import { useNotesStore } from '@/store/notes'

const store = useNotesStore()
const newTag = ref('')

const tags = computed(() => store.tags)
const active = computed(() => store.activeTag)

function addTag() {
  const value = newTag.value.trim()
  if (!value) return
  store.createTag(value)
  newTag.value = ''
}

function removeTag(tag: string) {
  if (confirm(`Delete tag "${tag}"? It will be removed from all notes.`)) {
    store.deleteTag(tag)
  }
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-inner">
      <header class="brand card">
        <div class="logo">📝</div>
        <div>
          <h1>Simple Notes</h1>
          <p class="helper">Organize with tags</p>
        </div>
      </header>

      <button class="button primary full" @click="store.createNote()">＋ New Note</button>

      <section class="section">
        <h3>Filters</h3>
        <div class="filters">
          <button
            class="button full"
            :class="{ active: !active }"
            @click="store.setActiveTag(null)"
          >
            All notes
          </button>
        </div>
      </section>

      <section class="section">
        <h3>Tags</h3>
        <div class="tag-input">
          <input
            v-model="newTag"
            class="input"
            type="text"
            placeholder="Create a tag e.g. Work"
            @keydown.enter="addTag"
          />
          <button class="button" @click="addTag">Add</button>
        </div>
        <ul class="tag-list">
          <li
            v-for="t in tags"
            :key="t"
            :class="{ selected: active === t }"
            @click="store.setActiveTag(t)"
          >
            <span class="dot" :style="{ background: 'var(--ocean-secondary)' }"></span>
            <span class="label">{{ t }}</span>
            <button class="x" title="Delete tag" @click.stop="removeTag(t)">✕</button>
          </li>
        </ul>
      </section>

      <footer class="helper footer">
        Ocean Professional • LocalStorage
      </footer>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  padding: var(--space-6);
}
.sidebar-inner {
  display: grid;
  gap: var(--space-6);
  height: 100%;
}

.brand {
  display: grid;
  grid-template-columns: 48px 1fr;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: var(--ocean-surface);
}
.brand .logo {
  width: 48px;
  height: 48px;
  background: var(--ocean-primary);
  color: white;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 22px;
  box-shadow: var(--ocean-shadow);
}
.brand h1 {
  margin: 0;
  font-size: 18px;
}
.section h3 {
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--ocean-muted);
}

.filters .button.active {
  border-color: var(--ocean-primary);
  color: var(--ocean-primary);
}

.tag-input {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
}

.tag-list {
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
  display: grid;
  gap: 6px;
}
.tag-list li {
  display: grid;
  grid-template-columns: 14px 1fr 24px;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border: 1px solid var(--ocean-border);
  background: var(--ocean-surface);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background .2s ease, border-color .2s ease;
}
.tag-list li:hover {
  background: #f8fafc;
  border-color: #dbeafe;
}
.tag-list li.selected {
  border-color: var(--ocean-primary);
  box-shadow: 0 0 0 3px rgba(37,99,235,.10) inset;
}
.tag-list .dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
}
.tag-list .label {
  font-size: 14px;
}
.tag-list .x {
  border: none;
  background: transparent;
  color: var(--ocean-muted);
  cursor: pointer;
}
.tag-list .x:hover {
  color: var(--ocean-error);
}

.button.full {
  width: 100%;
  justify-content: center;
}
.footer {
  margin-top: auto;
  text-align: center;
}
</style>
