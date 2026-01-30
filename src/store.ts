import { ref, reactive, computed } from 'vue';

interface Note {
    id: string;
    title: string;
    body: string;
    updatedAt: number;
}

const STORAGE_KEY = 'notes_db_v1';
const SHARES_KEY = 'shares_db_v1';

// Using ref for notes as it's more predictable for array replacements
export const notes = ref<Note[]>([]);
export const state = reactive({
    search: '',
    toast: '',
    shareLink: null as string | null,
});

// --- Actions ---

export const loadWorkspace = () => {
    console.log("Loading workspace...");
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            const parsed = JSON.parse(data);
            if (Array.isArray(parsed)) notes.value = parsed;
        }
    } catch (e) {
        console.error("Load failed", e);
    }
};

export const syncToStorage = () => {
    console.log("Syncing to storage...");
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes.value));
    } catch (e) {
        console.warn("Storage full or unavailable.");
    }
};

export const addNote = () => {
    console.log("Adding note...");
    const note: Note = {
        id: 'n_' + Date.now(),
        title: '',
        body: '',
        updatedAt: Date.now()
    };
    notes.value.unshift(note);
    syncToStorage();
    notify("Added.");
};

export const removeNote = (id: string) => {
    console.log("Removing note:", id);
    notes.value = notes.value.filter(n => n.id !== id);
    syncToStorage();
    notify("Removed.");
};

export const updateNote = (id: string, updates: Partial<Note>) => {
    const note = notes.value.find(n => n.id === id);
    if (note) {
        Object.assign(note, { ...updates, updatedAt: Date.now() });
        syncToStorage();
    }
};

export const shareNote = (note: Note) => {
    console.log("Sharing note:", note.id);
    const sid = 's_' + Date.now();
    try {
        const index = JSON.parse(localStorage.getItem(SHARES_KEY) || '{}');
        index[sid] = { ...note };
        localStorage.setItem(SHARES_KEY, JSON.stringify(index));

        state.shareLink = `${window.location.origin}${window.location.pathname}?import=${sid}`;
        console.log("Share link generated:", state.shareLink);
    } catch (e) {
        notify("Failed to share.");
    }
};

export const handleImport = () => {
    const params = new URLSearchParams(window.location.search);
    const sid = params.get('import');
    if (sid) {
        console.log("Importing note with SID:", sid);
        try {
            const index = JSON.parse(localStorage.getItem(SHARES_KEY) || '{}');
            const item = index[sid];
            if (item) {
                const imported = { ...item, id: 'i_' + Date.now(), updatedAt: Date.now() };
                notes.value.unshift(imported);
                syncToStorage();
                notify("Imported note.");
                console.log("Note imported successfully.");
            }
        } catch (e) {
            console.error("Import failed");
        }
        window.history.replaceState({}, '', window.location.pathname);
    }
};

export const notify = (msg: string) => {
    state.toast = msg;
    setTimeout(() => { if (state.toast === msg) state.toast = ''; }, 2500);
};

// --- Getters ---

export const filteredNotes = computed(() => {
    const q = state.search.trim().toLowerCase();
    const pool = notes.value;

    if (!q) return [...pool].sort((a, b) => b.updatedAt - a.updatedAt);

    return pool.filter(n =>
        (n.title || '').toLowerCase().includes(q) ||
        (n.body || '').toLowerCase().includes(q)
    ).sort((a, b) => b.updatedAt - a.updatedAt);
});
