<script setup lang="ts">
defineProps<{
  tags: string[]
  removable?: boolean
}>()
defineEmits<{
  (e: 'remove', tag: string): void
}>()
</script>

<template>
  <div class="tags" v-if="tags?.length">
    <span v-for="t in tags" :key="t" class="tag">
      <span>{{ t }}</span>
      <span
        v-if="removable"
        class="remove"
        title="Remove tag"
        @click="$emit('remove', t)"
        aria-label="remove tag"
      >✕</span>
    </span>
  </div>
</template>

<style scoped>
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
