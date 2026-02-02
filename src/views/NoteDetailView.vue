<template>
  <div v-if="note" class="max-w-[760px] mx-auto pt-10 pb-40 animate-fade-in px-4">
    <header class="flex justify-between items-center mb-24 lg:mb-32">
      <router-link to="/" class="group flex items-center justify-center no-underline transition-all">
        <div class="w-12 h-12 rounded-2xl border border-slate-100 flex items-center justify-center bg-white shadow-premium group-hover:bg-primary group-hover:border-primary transition-all duration-500">
          <span class="text-xl text-primary group-hover:text-white group-hover:-translate-x-1 transition-all duration-500">←</span>
        </div>
      </router-link>
      
      <div class="flex items-center gap-3">
        <BaseButton variant="secondary" @click="showEditModal = true">Edit</BaseButton>
        <BaseButton variant="secondary" @click="handleShare">Share</BaseButton>
        <BaseButton variant="danger" @click="handleDelete">Delete</BaseButton>
      </div>
    </header>

    <Modal 
      :show="showEditModal" 
      title="Update Your Thought" 
      icon="✎" 
      @close="showEditModal = false"
    >
      <NoteForm :initialData="note" @save="handleUpdateNote" />
    </Modal>

    <article class="card-premium !p-8 lg:!p-16 flex flex-col gap-0 shadow-huge bg-white/70 backdrop-blur-sm">
      <div class="flex items-center gap-4 mb-8">
        <div class="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-100 bg-slate-50/50">
          <span class="text-sm leading-none">{{ typeIcons[note.type] }}</span>
          <span class="text-[9px] font-black uppercase tracking-widest text-slate-400">{{ note.type }}</span>
        </div>
        <span class="text-slate-100 font-extralight text-xl">/</span>
        <span class="text-[10px] font-black uppercase tracking-widest text-slate-300">{{ formattedDate }}</span>
      </div>
      
      <h1 class="text-4xl lg:text-5xl font-black tracking-tightest leading-tight mb-8 text-primary">
        {{ note.title }}
      </h1>

      <div class="flex flex-wrap gap-2.5 mb-10" v-if="note.tags.length">
        <router-link 
          v-for="tag in note.tags" 
          :key="tag" 
          :to="`/tag/${tag}`"
          class="text-xs font-bold text-slate-400 hover:text-accent transition-colors no-underline flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg"
        >
          #{{ tag }}
        </router-link>
      </div>

      <div v-if="isYouTube" class="mb-12 rounded-3xl overflow-hidden shadow-premium border border-slate-50">
        <div class="aspect-video">
          <iframe :src="embedUrl" frameborder="0" allowfullscreen class="w-full h-full"></iframe>
        </div>
      </div>

      <div v-else-if="note.url" class="mb-12 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 group hover:bg-white transition-all duration-500">
        <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-lg shadow-sm">🔗</div>
        <div class="flex flex-col overflow-hidden">
          <span class="text-[9px] font-black uppercase text-slate-300 tracking-widest mb-0.5">Source URL</span>
          <a :href="note.url" target="_blank" class="text-sm font-bold text-accent no-underline hover:underline truncate">{{ note.url }}</a>
        </div>
      </div>

      <div class="text-[17px] lg:text-[18px] leading-relaxed text-slate-600 font-medium space-y-8 selection:bg-accent/10">
        <p v-for="(p, i) in paragraphs" :key="i" class="animate-fade-in" :style="{ animationDelay: `${i * 100}ms` }">{{ p }}</p>
      </div>
    </article>

    <transition name="up">
      <div v-if="sharedLink" class="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-[600px] z-[1000] animate-slide-up">
        <div class="bg-primary/95 backdrop-blur-xl p-3 px-6 rounded-[28px] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] flex items-center justify-between gap-6">
          <div class="flex-1 flex flex-col min-w-0">
            <span class="text-[9px] font-black uppercase text-white/40 tracking-[0.3em] mb-1">Public Access Link</span>
            <input readonly :value="sharedLink" @click="handleInputClick" class="border-none text-sm font-bold text-white outline-none w-full bg-transparent truncate selection:bg-white/20">
          </div>
          <button class="bg-white text-primary px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl" @click="copy">Copy Link</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNotesStore } from '../stores/notes'
import BaseButton from '../components/common/BaseButton.vue'
import Modal from '../components/common/Modal.vue'
import NoteForm from '../components/common/NoteForm.vue'
import { format } from 'date-fns'

const route = useRoute()
const router = useRouter()
const notesStore = useNotesStore()
const sharedLink = ref('')
const showEditModal = ref(false)

const noteId = computed(() => {
  const id = route.params.id
  return (Array.isArray(id) ? id[0] : id) as string
})

const note = computed(() => notesStore.notes.find(n => n.id === noteId.value))

const formattedDate = computed(() => {
  if (!note.value) return ''
  return format(note.value.createdAt, 'MMMM d, yyyy')
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

const typeIcons = {
  note: '🗒️',
  link: '🔗',
  video: '📺'
}

const handleShare = () => {
  if (note.value) {
    sharedLink.value = `${window.location.origin}/share/${note.value.id}`
  }
}

const handleInputClick = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (target) target.select()
}

const copy = () => {
  if (sharedLink.value) {
    navigator.clipboard.writeText(sharedLink.value)
    alert('Link Copied to Clipboard')
  }
}

const handleUpdateNote = (updatedData: any) => {
  if (note.value) {
    notesStore.updateNote(note.value.id, updatedData)
    showEditModal.value = false
  }
}

const handleDelete = () => {
  if (note.value && confirm('Permanently remove this entry?')) {
    notesStore.deleteNote(note.value.id)
    router.push('/')
  }
}
</script>

<style scoped>
.tracking-tightest { letter-spacing: -0.06em; }

.up-enter-active, .up-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.up-enter-from { opacity: 0; transform: translate(-50%, 40px) scale(0.9); }
.up-leave-to { opacity: 0; transform: translate(-50%, 40px) scale(0.9); }
</style>
