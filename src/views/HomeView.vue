<template>
  <div class="flex flex-col gap-20">
    <header class="flex flex-col gap-6 animate-fade-in">
      <div class="flex items-center gap-4">
        <span class="w-12 h-[2px] bg-accent"></span>
        <div class="text-[11px] font-black uppercase text-slate-400 tracking-[0.4em]">Dashboard</div>
      </div>
      <h1 class="text-6xl lg:text-8xl font-black tracking-tightest text-primary leading-[0.9]">
        Your Intellectual <br> <span class="text-slate-200">Territory.</span>
      </h1>
      
      <div class="flex items-center gap-10 mt-8">
        <div class="flex flex-col">
          <span class="text-2xl font-black text-primary">{{ notesStore.notes.length }}</span>
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Ideas</span>
        </div>
        <div class="w-[1px] h-10 bg-slate-100"></div>
        <div class="flex flex-col">
          <span class="text-2xl font-black text-primary">{{ notesStore.allTags.length }}</span>
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Unique Tags</span>
        </div>
      </div>

      <p v-if="notesStore.debouncedSearchQuery" class="mt-12 text-xl font-medium text-slate-500">
        Discovering results for <span class="text-accent underline decoration-2 underline-offset-8">“{{ notesStore.debouncedSearchQuery }}”</span>
      </p>
    </header>

    <div v-if="notesStore.filteredNotes.length" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
      <NoteCard 
        v-for="(note, index) in notesStore.filteredNotes" 
        :key="note.id" 
        :note="note" 
        :index="index"
      />
    </div>

    <div v-else class="relative py-32 text-center bg-white rounded-huge border border-slate-100 shadow-premium overflow-hidden group">
      <div class="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
      <div class="relative z-10 flex flex-col items-center">
        <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-5xl mb-8 group-hover:scale-110 transition-transform duration-700">✨</div>
        <h2 class="text-3xl font-black text-primary mb-3">Quiet in the Library</h2>
        <p class="text-slate-400 max-w-md font-medium leading-relaxed">Your search didn't harvest any results. Try adjusting your keywords to uncover hidden knowledge.</p>
        <BaseButton class="mt-10" @click="notesStore.handleSearch('')">Clear Search</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotesStore } from '../stores/notes'
import NoteCard from '../components/NoteCard.vue'
import BaseButton from '../components/common/BaseButton.vue'

const notesStore = useNotesStore()
</script>

<style scoped>
.tracking-tightest { letter-spacing: -0.06em; }
</style>
