<template>
  <div class="min-h-screen py-24 px-6 flex justify-center bg-bg-main font-inter selection:bg-accent/10">
    <div v-if="note" class="w-full max-w-[720px] animate-fade-in">
      <header class="flex justify-between items-center mb-16 pb-6 border-b border-slate-100">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
            <span class="text-white text-sm font-black">B</span>
          </div>
          <span class="text-[11px] font-black uppercase tracking-[0.3em] text-primary">SecondBrain</span>
        </div>
        <div class="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-300">
          <span>{{ note.type }}</span>
          <span class="text-slate-100 font-normal">/</span>
          <span>{{ formattedDate }}</span>
        </div>
      </header>

      <main class="flex flex-col">
        <h1 class="text-5xl lg:text-7xl font-black tracking-tightest leading-[0.9] mb-14 text-primary leading-tight">{{ note.title }}</h1>
        
        <div v-if="isYouTube" class="mb-14 rounded-[32px] overflow-hidden shadow-premium border border-slate-50">
          <div class="aspect-video">
            <iframe :src="embedUrl" frameborder="0" allowfullscreen class="w-full h-full"></iframe>
          </div>
        </div>

        <div v-else-if="note.url" class="mb-14 p-6 bg-slate-50 rounded-2xl flex items-center gap-4 group">
          <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition-transform">🔗</div>
          <a :href="note.url" target="_blank" class="text-sm font-bold text-accent hover:underline truncate">{{ note.url }}</a>
        </div>

        <div class="text-[19px] leading-[1.7] text-slate-600 font-medium mb-20 space-y-8">
          <p v-for="(p, i) in paragraphs" :key="i">{{ p }}</p>
        </div>

        <div class="flex flex-wrap gap-4 mb-24">
          <span v-for="tag in note.tags" :key="tag" class="text-[11px] font-black uppercase tracking-widest text-slate-300">#{{ tag }}</span>
        </div>
      </main>

      <footer class="text-center pt-20 border-t border-slate-100">
        <p class="mb-10 text-slate-400 text-sm font-medium leading-relaxed">This knowledge entry was curated and shared from a personal <br> <span class="text-primary font-bold">Second Brain</span> repository.</p>
        <BaseButton @click="router.push('/')" class="inline-flex items-center gap-3 shadow-xl transform transition-all active:scale-95 no-underline">
          <span>Get Your Own</span>
          <span class="text-lg">✨</span>
        </BaseButton>
      </footer>
    </div>
    
    <div v-else class="flex flex-col items-center justify-center py-40">
      <div class="text-6xl mb-10 opacity-20">🌫️</div>
      <h1 class="text-3xl font-black tracking-tight text-primary uppercase">Entry not found</h1>
      <p class="mt-4 text-slate-400 font-medium">This knowledge may have been pruned from the garden.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNotesStore } from '../stores/notes'
import BaseButton from '../components/common/BaseButton.vue'
import { format } from 'date-fns'

const route = useRoute()
const router = useRouter()
const notesStore = useNotesStore()

const noteId = computed(() => {
  const id = route.params.id
  return (Array.isArray(id) ? id[0] : id) as string
})

const note = computed(() => notesStore.notes.find(n => n.id === noteId.value))

const formattedDate = computed(() => {
  if (!note.value) return ''
  return format(note.value.createdAt, 'MMM d, yyyy')
})

const paragraphs = computed(() => {
  const content = note.value?.content
  if (!content) return []
  return content.split('\n').filter((p: string) => p.trim())
})

const isYouTube = computed(() => {
  if (!note.value?.url) return false
  return note.value.url.includes('youtube.com') || note.value.url.includes('youtu.be')
})

const embedUrl = computed(() => {
  const n = note.value
  if (!n || !n.url) return ''
  const url = n.url
  let id = ''
  if (url.includes('v=')) {
    id = url.split('v=')[1]?.split('&')[0] ?? ''
  } else if (url.includes('youtu.be/')) {
    id = url.split('youtu.be/')[1]?.split('?')[0] ?? ''
  }
  return `https://www.youtube.com/embed/${id}`
})
</script>

<style scoped>
.tracking-tightest { letter-spacing: -0.06em; }
</style>
