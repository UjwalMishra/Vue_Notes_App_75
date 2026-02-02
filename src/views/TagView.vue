<template>
  <div class="flex flex-col gap-20">
    <header class="flex flex-col animate-fade-in">
      <router-link to="/" class="group no-underline flex items-center gap-3 text-[11px] font-black uppercase text-slate-300 tracking-[0.4em] mb-10 hover:text-primary transition-all duration-500 block w-fit">
        <span class="group-hover:-translate-x-1 transition-transform duration-500">←</span> 
        Dashboard
      </router-link>
      
      <div class="flex items-baseline gap-4">
        <span class="text-4xl font-black text-slate-100 flex items-center justify-center w-14 h-14 bg-slate-50 rounded-2xl border border-slate-100 italic">#</span>
        <h1 class="text-6xl lg:text-8xl font-black tracking-tightest leading-none text-primary uppercase">{{ route.params.tag }}</h1>
      </div>
      
      <div class="flex items-center gap-6 mt-10">
        <div class="px-5 py-2.5 bg-primary rounded-xl text-white text-[11px] font-black uppercase tracking-widest shadow-xl">
          {{ tagNotes.length }} Entries
        </div>
        <p class="text-[15px] text-slate-400 font-bold uppercase tracking-wider">Knowledge Fragment Collection</p>
      </div>
    </header>

    <div v-if="tagNotes.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      <NoteCard 
        v-for="(note, index) in tagNotes" 
        :key="note.id" 
        :note="note" 
        :index="index"
      />
    </div>

    <div v-else class="py-32 border-t border-slate-50 text-center flex flex-col items-center">
      <div class="text-5xl mb-6 opacity-30 italic">∅</div>
      <p class="text-xl font-bold text-slate-300 uppercase tracking-widest">No knowledge synthesized for this tag.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useNotesStore } from '../stores/notes'
import NoteCard from '../components/NoteCard.vue'

const route = useRoute()
const notesStore = useNotesStore()

const tagNotes = computed(() => {
  const tag = route.params.tag
  const currentTag = (Array.isArray(tag) ? tag[0] : tag) as string
  return notesStore.notes.filter(note => note.tags.includes(currentTag))
})
</script>

<style scoped>
.tracking-tightest { letter-spacing: -0.06em; }
</style>
