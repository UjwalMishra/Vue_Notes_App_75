<template>
  <header class="sticky top-0 z-30 -mx-6 lg:-mx-14 px-6 lg:px-14 py-4 lg:py-6 bg-bg-main/80 backdrop-blur-md border-b border-slate-100/50 flex justify-between items-center mb-12 gap-6 animate-fade-in">
    <button 
      class="lg:hidden w-12 h-12 flex items-center justify-center bg-white border border-border rounded-xl shadow-premium hover:bg-slate-50 transition-all active:scale-95"
      @click="$emit('toggleSidebar')"
    >
      <span class="text-xl">☰</span>
    </button>
    
    <div class="flex-1 max-w-[700px]">
      <BaseInput 
        :model-value="notesStore.searchQuery"
        @update:model-value="(v) => notesStore.handleSearch(v || '')"
        placeholder="Search your collection..."
        icon="🔍"
      >
        <template #default>
          <div class="absolute right-5 inset-y-0 flex items-center gap-2 pointer-events-none">
            <span class="text-[10px] font-black text-slate-300 bg-white px-2 py-1 rounded-lg border border-slate-100 uppercase tracking-tighter">⌘K</span>
          </div>
        </template>
      </BaseInput>
    </div>
    
    <BaseButton @click="$emit('capture')">
      <div class="flex items-center gap-3">
        <span class="text-lg leading-none">+</span>
        <span class="hidden sm:inline">Capture</span>
      </div>
    </BaseButton>
  </header>
</template>

<script setup lang="ts">
import { useNotesStore } from '../../stores/notes'
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'

const notesStore = useNotesStore()

defineEmits(['toggleSidebar', 'capture'])
</script>
