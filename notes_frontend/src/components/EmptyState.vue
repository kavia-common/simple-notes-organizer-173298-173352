<template>
  <div class="empty card">
    <div class="emoji">🌊</div>
    <h2>No note selected</h2>
    <p class="helper">
      Create a new note from the sidebar or select one from the list.
    </p>
  </div>
</template>

<style scoped>
.empty {
  height: 100%;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 24px;
}
.emoji {
  font-size: 42px;
  margin-bottom: 8px;
}
</style>
