<template>
  <div 
    class="group bg-white border border-gray-100 p-8 rounded-[32px] hover:border-black/20 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 flex flex-col h-full"
  >
    <div class="flex justify-between items-start mb-6">
      <span class="text-[10px] uppercase tracking-widest text-gray-400 font-black">
        {{ timeLabel(note.updatedAt) }}
      </span>
      <div class="flex gap-1 transition-opacity">
        <button 
          @click="shareNote(note)" 
          class="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-all"
          title="Share Note"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
        </button>
        <button 
          @click="removeNote(note.id)" 
          class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
          title="Delete Note"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </div>
    </div>

    <input 
      v-model="internalTitle" 
      @input="onInput" 
      placeholder="Untitled" 
      class="block w-full text-2xl font-bold bg-transparent border-none outline-none mb-4 placeholder:text-gray-200"
    />
    <textarea 
      v-model="internalBody" 
      @input="onInput" 
      placeholder="Start writing..." 
      rows="6" 
      class="block w-full text-lg bg-transparent border-none outline-none resize-none text-gray-600 leading-relaxed placeholder:text-gray-200 flex-grow"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { removeNote, shareNote, updateNote } from '../store';

const props = defineProps<{
  note: {
    id: string;
    title: string;
    body: string;
    updatedAt: number;
  }
}>();

const internalTitle = ref(props.note.title);
const internalBody = ref(props.note.body);

// Sync internal state with props if they change externally (though unlikely in this simple app)
watch(() => props.note.title, (newVal) => internalTitle.value = newVal);
watch(() => props.note.body, (newVal) => internalBody.value = newVal);

let timeout: ReturnType<typeof setTimeout> | null = null;

const onInput = () => {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    updateNote(props.note.id, {
      title: internalTitle.value,
      body: internalBody.value
    });
  }, 500);
};

const timeLabel = (ts: number) => {
  const date = new Date(ts);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  
  if (isToday) {
    return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
};
</script>
