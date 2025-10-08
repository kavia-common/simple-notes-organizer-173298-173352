<script setup lang="ts">
import NotesSidebar from '@/components/NotesSidebar.vue'
import NotesList from '@/components/NotesList.vue'
import NoteEditor from '@/components/NoteEditor.vue'
import './assets/theme.css'
</script>

<template>
  <div class="layout">
    <NotesSidebar />
    <main class="main">
      <NotesList />
      <NoteEditor />
    </main>
  </div>
</template>

<style scoped>
/* Root layout styles use theme.css variables */
</style>
