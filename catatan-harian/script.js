(() => {
  const storageKey = 'moorasa-daily-notes';
  const defaultNotes = [
    {
      id: 'note-1',
      title: 'Hari yang cerah',
      content: 'Hari ini saya merasa senang karena dapat menyelesaikan tugas tepat waktu dan berbincang dengan teman-teman yang selalu mendukung.',
      date: '16/06/2026'
    },
    {
      id: 'note-2',
      title: 'Belajar tenang',
      content: 'Saya belajar untuk memberi jeda saat merasa lelah. Berjalan sebentar dan menarik napas membuat pikiran terasa lebih ringan.',
      date: '17/06/2026'
    }
  ];

  const getNotes = () => {
    const savedNotes = localStorage.getItem(storageKey);

    if (!savedNotes) {
      localStorage.setItem(storageKey, JSON.stringify(defaultNotes));
      return defaultNotes;
    }

    try {
      return JSON.parse(savedNotes);
    } catch {
      return defaultNotes;
    }
  };

  const saveNotes = (notes) => {
    localStorage.setItem(storageKey, JSON.stringify(notes));
  };

  const formatDate = () => {
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date()).replaceAll('.', '/');
  };

  const escapeHtml = (value) => {
    const characters = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#039;',
      '"': '&quot;'
    };

    return value.replace(/[&<>'"]/g, (character) => characters[character]);
  };

  const notesGrid = document.getElementById('notes-grid');

  if (notesGrid) {
    const deleteModal = document.getElementById('delete-modal');
    const cancelDeleteButton = document.getElementById('cancel-delete');
    const confirmDeleteButton = document.getElementById('confirm-delete');
    let selectedNoteId = null;

    const renderNotes = () => {
      notesGrid.innerHTML = getNotes().map((note) => `
        <article class="note-card" data-id="${note.id}" tabindex="0" role="button" aria-label="Edit catatan ${escapeHtml(note.title)}">
          <h3>${escapeHtml(note.title)}</h3>
          <p>${escapeHtml(note.content)}</p>
          <div class="card-footer">
            <span class="card-date">${escapeHtml(note.date)}</span>
            <span class="card-controls">
              <button class="card-control edit-note" type="button" aria-label="Edit ${escapeHtml(note.title)}">✎</button>
              <button class="card-control delete-note" type="button" aria-label="Hapus ${escapeHtml(note.title)}">⌫</button>
            </span>
          </div>
        </article>
      `).join('');
    };

    const openEditPage = (noteId) => {
      window.location.href = `tambah-catatan.html?id=${encodeURIComponent(noteId)}`;
    };

    notesGrid.addEventListener('click', (event) => {
      const noteCard = event.target.closest('.note-card');

      if (!noteCard) return;

      if (event.target.closest('.delete-note')) {
        event.stopPropagation();
        selectedNoteId = noteCard.dataset.id;
        deleteModal.classList.remove('hidden');
        return;
      }

      openEditPage(noteCard.dataset.id);
    });

    notesGrid.addEventListener('keydown', (event) => {
      const isCardFocused = event.target.classList.contains('note-card');
      const isActivationKey = event.key === 'Enter' || event.key === ' ';

      if (isCardFocused && isActivationKey) {
        event.preventDefault();
        openEditPage(event.target.dataset.id);
      }
    });

    cancelDeleteButton.addEventListener('click', () => {
      deleteModal.classList.add('hidden');
    });

    deleteModal.addEventListener('click', (event) => {
      if (event.target === deleteModal) {
        deleteModal.classList.add('hidden');
      }
    });

    confirmDeleteButton.addEventListener('click', () => {
      const remainingNotes = getNotes().filter((note) => note.id !== selectedNoteId);

      saveNotes(remainingNotes);
      deleteModal.classList.add('hidden');
      selectedNoteId = null;
      renderNotes();
    });

    renderNotes();
  }

  const noteForm = document.getElementById('note-form');

  if (noteForm) {
    const titleInput = document.getElementById('note-title');
    const contentInput = document.getElementById('note-content');
    const saveButton = document.getElementById('save-button');
    const noteId = new URLSearchParams(window.location.search).get('id');
    const currentNote = noteId
      ? getNotes().find((note) => note.id === noteId)
      : null;

    if (currentNote) {
      titleInput.value = currentNote.title;
      contentInput.value = currentNote.content;
    }

    const toggleSaveButton = () => {
      saveButton.disabled = !(titleInput.value.trim() && contentInput.value.trim());
    };

    titleInput.addEventListener('input', toggleSaveButton);
    contentInput.addEventListener('input', toggleSaveButton);
    toggleSaveButton();

    saveButton.addEventListener('click', () => {
      if (saveButton.disabled) return;

      const notes = getNotes();
      const savedNote = {
        id: currentNote?.id || `note-${Date.now()}`,
        title: titleInput.value.trim(),
        content: contentInput.value.trim(),
        date: currentNote?.date || formatDate()
      };

      const updatedNotes = currentNote
        ? notes.map((note) => note.id === savedNote.id ? savedNote : note)
        : [...notes, savedNote];

      saveNotes(updatedNotes);
      window.location.href = 'catatan-harian.html';
    });
  }
})();
