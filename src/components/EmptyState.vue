<template>
  <div class="text-center py-32 bg-gray-50/50 border-2 border-dashed border-gray-100 rounded-[48px] flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
    <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm mb-6">∅</div>
    <h3 class="text-xl font-bold text-black mb-2">{{ title }}</h3>
    <p class="text-gray-400 font-medium mb-8 max-w-xs">{{ description }}</p>
    <button 
      @click="addNote" 
      class="bg-black text-white px-8 py-3 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-black/10 transition-all active:scale-95"
    >
      Create your first note
    </button>
  </div>
</template>

<script setup lang="ts">
import { addNote } from '../store';

defineProps<{
  title: string;
  description: string;
}>();
</script>
