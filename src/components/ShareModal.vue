<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-white/60 backdrop-blur-xl animate-in fade-in duration-300">
    <div class="max-w-md w-full bg-white p-10 rounded-[40px] shadow-2xl shadow-black/5 animate-in zoom-in-95 duration-500">
      <div class="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-6">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
      </div>
      <h2 class="text-3xl font-black mb-4 tracking-tight">Share note.</h2>
      <p class="text-gray-500 mb-8 leading-relaxed">Anyone with this link can import a copy of this note into their own Studio workspace.</p>
      
      <div class="flex flex-col gap-4">
        <div class="relative">
          <input 
            :value="state.shareLink" 
            readonly 
            class="w-full bg-gray-50 border-none p-5 rounded-2xl text-[10px] font-mono text-gray-400 pr-12"
          />
          <button 
            @click="copyLink"
            class="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-black/5 rounded-lg transition-colors"
          >
            <svg v-if="!copied" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="text-green-500"><polyline points="20 6 9 17 4 12"/></svg>
          </button>
        </div>
        
        <button 
          @click="close"
          class="w-full bg-black text-white p-5 rounded-2xl font-bold hover:bg-gray-800 transition-all transform active:scale-[0.98] shadow-lg shadow-black/10"
        >
          Done
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { state, notify } from '../store';

const copied = ref(false);

const close = () => {
  state.shareLink = null;
};

const copyLink = async () => {
  if (!state.shareLink) return;
  try {
    await navigator.clipboard.writeText(state.shareLink);
    copied.value = true;
    notify("Link copied to clipboard");
    setTimeout(() => copied.value = false, 2000);
  } catch (e) {
    notify("Failed to copy link");
  }
};
</script>
