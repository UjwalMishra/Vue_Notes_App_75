<template>
  <div class="flex min-h-screen bg-bg-main font-inter selection:bg-accent/10">
    <Sidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />
    
    <main class="flex-1 ml-0 lg:ml-[300px] p-6 lg:p-14 transition-all duration-500">
      <Navbar @toggle-sidebar="isSidebarOpen = !isSidebarOpen" @capture="showAddModal = true" />

      <div class="max-w-[1200px] mx-auto">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>

    <Modal 
      :show="showAddModal" 
      title="New Knowledge Entry" 
      icon="✨" 
      @close="showAddModal = false"
    >
      <NoteForm @save="handleAddNote" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/common/Navbar.vue'
import Modal from './components/common/Modal.vue'
import NoteForm from './components/common/NoteForm.vue'
import { useNotesStore } from './stores/notes'

const notesStore = useNotesStore()
const isSidebarOpen = ref(false)
const showAddModal = ref(false)

const handleAddNote = (noteData: any) => {
  notesStore.addNote(noteData)
  showAddModal.value = false
}
</script>

<style scoped>
.page-enter-active, .page-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.page-enter-from { opacity: 0; transform: translateY(15px); }
.page-leave-to { opacity: 0; transform: translateY(-15px); }
</style>
