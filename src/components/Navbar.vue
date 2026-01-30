<template>
  <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5 px-6 py-4">
    <div class="max-w-4xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="bg-black text-white w-10 h-10 flex items-center justify-center rounded-xl text-xl font-black shadow-lg shadow-black/10">N</div>
        <h1 class="text-xl font-bold tracking-tight">Studio</h1>
      </div>
      
      <div class="flex items-center gap-6">
        <div class="relative hidden sm:block">
          <input 
            v-model="state.search" 
            type="text" 
            placeholder="Filter notes..." 
            class="bg-gray-50 border border-transparent rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-black/10 transition-all outline-none w-48"
          />
          <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
        </div>
        <button 
          @click="addNote" 
          class="bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition-all transform active:scale-95 shadow-xl shadow-black/10 flex items-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { state, addNote } from '../store';
</script>
