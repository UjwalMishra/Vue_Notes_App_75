<template>
  <aside 
    class="fixed left-0 top-0 w-[300px] h-screen p-10 flex flex-col bg-white border-r border-slate-100 transition-transform duration-500 z-[100] overflow-y-auto"
    :class="isOpen ? 'translate-x-0 shadow-2xl lg:shadow-none' : '-translate-x-full lg:translate-x-0'"
  >
    <div class="mb-14 flex justify-between items-center">
      <div class="flex items-center gap-3.5 group cursor-default">
        <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg transition-colors duration-500">
          <span class="text-white text-xl font-black">B</span>
        </div>
        <div class="flex flex-col">
          <h1 class="text-[14px] font-black uppercase tracking-widest text-primary leading-none">SecondBrain</h1>
          <span class="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Knowledge Base</span>
        </div>
      </div>
      <button 
        class="lg:hidden text-lg p-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
        @click="$emit('close')"
      >✕</button>
    </div>

    <nav class="flex-1 flex flex-col gap-10">
      <div class="flex flex-col gap-1.5">
        <h2 class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2 px-2.5">Main</h2>
        <router-link 
          to="/" 
          @click="notesStore.handleSearch('')"
          class="flex items-center gap-4 text-sm font-bold no-underline transition-all p-3 -mx-3 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-primary"
          :class="{ '!bg-slate-100 !text-primary': !notesStore.searchQuery && route.path === '/' }"
        >
          <span class="text-lg">🏠</span>
          Overview
        </router-link>
      </div>
      
      <div class="flex flex-col gap-2">
        <h2 class="text-[10px] font-black uppercase text-gray-400 tracking-[0.1em] mb-2 px-2.5">Collection</h2>
        <button 
          v-for="type in collectionTypes" 
          :key="type.value"
          @click="setSearch(type.value)"
          class="flex items-center gap-3 text-sm font-bold bg-transparent border-none text-left cursor-pointer transition-all p-2.5 -mx-2.5 rounded-xl hover:bg-gray-50 text-text-muted hover:text-text-main"
          :class="{ '!bg-slate-100 !text-primary': notesStore.searchQuery === type.value }"
        >
          <span class="text-lg">{{ type.icon }}</span>
          {{ type.label }}
        </button>
      </div>

      <div class="flex flex-col gap-2" v-if="notesStore.allTags.length">
        <h2 class="text-[10px] font-black uppercase text-gray-400 tracking-[0.1em] mb-2 px-2.5">Tags</h2>
        <div class="flex flex-wrap gap-2 px-2.5">
          <router-link 
            v-for="tag in notesStore.allTags" 
            :key="tag" 
            :to="`/tag/${tag}`"
            class="text-[11px] font-bold no-underline bg-gray-50 text-text-muted px-2.5 py-1 rounded-md transition-all hover:bg-gray-200 hover:text-black"
            active-class="!bg-black !text-white"
          >
            #{{ tag }}
          </router-link>
        </div>
      </div>
    </nav>

    <div class="mt-auto pt-6">
      <div v-if="authStore.user" class="flex items-center gap-3.5 p-4 bg-gray-50 rounded-2xl">
        <img :src="authStore.user.avatar" alt="" class="w-9 h-9 rounded-xl shadow-sm">
        <div class="flex flex-col">
          <span class="text-sm font-bold leading-tight">{{ authStore.user.name }}</span>
          <button @click="authStore.logout" class="text-[10px] bg-transparent border-none p-0 text-text-muted cursor-pointer font-bold hover:text-red-500 transition-colors text-left uppercase tracking-wider">Sign out</button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { useNotesStore } from '../stores/notes'
import { useRouter, useRoute } from 'vue-router'

defineProps<{ isOpen: boolean }>()
defineEmits(['close'])

const authStore = useAuthStore()
const notesStore = useNotesStore()
const router = useRouter()
const route = useRoute()

const collectionTypes = [
  { label: 'Notes', value: 'note', icon: '📝' },
  { label: 'Links', value: 'link', icon: '🔗' },
  { label: 'Videos', value: 'video', icon: '📺' },
]

const setSearch = (type: string) => {
  notesStore.handleSearch(type)
  router.push('/')
}
</script>
