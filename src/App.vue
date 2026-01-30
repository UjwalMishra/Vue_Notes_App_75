<template>
  <div class="min-h-screen bg-[#fafafa] text-black font-sans selection:bg-black selection:text-white pb-20">
    <Navbar />

    <main class="max-w-4xl mx-auto px-6 py-12">
      <!-- Search on mobile -->
      <div class="sm:hidden mb-8">
        <input 
          v-model="state.search" 
          type="text" 
          placeholder="Search your thoughts..." 
          class="w-full bg-white border border-black/5 rounded-[24px] px-6 py-4 text-base focus:ring-1 focus:ring-black outline-none shadow-sm"
        />
      </div>

      <!-- Grid -->
      <div v-if="filteredNotes.length" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <NoteCard 
          v-for="note in filteredNotes" 
          :key="note.id"
          :note="note"
          class="animate-in fade-in slide-in-from-bottom-2 duration-700"
        />
      </div>

      <!-- Empty -->
      <EmptyState 
        v-else 
        :title="state.search ? 'No matches found' : 'Studio is empty'"
        :description="state.search ? 'Try adjusting your search or create a new note.' : 'Capture your thoughts, ideas, and drafts in one minimalist space.'"
      />
    </main>

    <!-- Overlays -->
    <ShareModal v-if="state.shareLink" />
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { state, loadWorkspace, handleImport, filteredNotes } from './store';

import Navbar from './components/Navbar.vue';
import NoteCard from './components/NoteCard.vue';
import EmptyState from './components/EmptyState.vue';
import ShareModal from './components/ShareModal.vue';
import Toast from './components/Toast.vue';

onMounted(() => {
  loadWorkspace();
  handleImport();
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');

body {
  margin: 0;
  background-color: #fafafa;
  font-family: 'Inter', -apple-system, sans-serif;
  letter-spacing: -0.01em;
  -webkit-font-smoothing: antialiased;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.1);
}

/* Tailwind-style animation utilities if not present */
.animate-in {
  animation-duration: 500ms;
  animation-fill-mode: both;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.fade-in {
  animation-name: fadeIn;
}

@keyframes zoomIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.zoom-in-95 {
  animation-name: zoomIn;
}

@keyframes slideInBottom {
  from { transform: translateY(1rem); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.slide-in-from-bottom-2 {
  animation-name: slideInBottom;
}
.slide-in-from-bottom-4 {
  animation-name: slideInBottom;
  animation-duration: 800ms;
}
</style>
