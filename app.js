/**
 * MusicTheory101 Main Application Coordinator
 */

class MusicTheoryApp {
  constructor() {
    this.currentTab = 'lessons';
    this.currentLessonIndex = 0;
    this.piano = null;
    this.circleWidget = null;
  }

  init() {
    // Initialize Piano Keyboard (C3 to C5, 2 full octaves + top C)
    this.piano = new InteractivePiano('main-piano-container', {
      startOctave: 3,
      octaves: 2,
      includeHighC: true,
      onNoteOn: (note) => {
        // Can add realtime staff or chord detector here
      }
    });
    window.mainPiano = this.piano;

    // Initialize Circle of Fifths
    this.circleWidget = new CircleOfFifthsWidget('circle-of-fifths-container', {
      onSelectKey: (keyData) => {
        // Automatically sync piano highlight when key selected
      }
    });
    window.circleWidget = this.circleWidget;

    // Build Lessons UI
    this.renderLessonSidebar();
    this.loadLesson(0);

    // Initialize Tools UI
    this.initToolsUI();

    // Initialize Quiz
    this.initQuizUI();

    // Bind Global Header Events
    this.bindGlobalEvents();
  }

  bindGlobalEvents() {
    // Navigation Tabs
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        this.switchTab(tab);
      });
    });

    // Volume Slider
    const volumeSlider = document.getElementById('master-volume');
    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        const vol = parseFloat(e.target.value);
        window.soundEngine.setVolume(vol);
      });
    }

    // Mute Button
    const muteBtn = document.getElementById('mute-btn');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        const isMuted = window.soundEngine.toggleMute();
        muteBtn.textContent = isMuted ? '🔇' : '🔊';
      });
    }

    // Piano Label Mode
    const labelSelect = document.getElementById('piano-label-mode');
    if (labelSelect) {
      labelSelect.addEventListener('change', (e) => {
        this.piano.setLabelMode(e.target.value);
      });
    }

    // Clear Piano Highlights
    const clearBtn = document.getElementById('clear-piano-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.piano.clearHighlights();
      });
    }
  }

  switchTab(tabId) {
    this.currentTab = tabId;

    // Update Tab Buttons
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    // Update Views
    document.querySelectorAll('.tab-view').forEach(view => {
      view.classList.toggle('active', view.id === `tab-${tabId}`);
    });

    // Sub-actions on view switch
    if (tabId === 'circle' && this.circleWidget) {
      this.circleWidget.updateDetails();
    } else if (tabId === 'quiz' && !window.musicTools.quizQuestion) {
      this.nextQuizQuestion();
    }
  }

  // --- Lessons Logic ---
  renderLessonSidebar() {
    const listEl = document.getElementById('lesson-nav-list');
    if (!listEl || !window.LESSONS_DATA) return;

    listEl.innerHTML = window.LESSONS_DATA.map((lesson, index) => `
      <button class="lesson-nav-item ${index === this.currentLessonIndex ? 'active' : ''}" data-index="${index}">
        <span class="lesson-num">${lesson.number}</span>
        <span class="lesson-title-text">${lesson.title}</span>
      </button>
    `).join('');

    listEl.querySelectorAll('.lesson-nav-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.index, 10);
        this.loadLesson(idx);
      });
    });
  }

  loadLesson(index) {
    const lesson = window.LESSONS_DATA[index];
    if (!lesson) return;

    this.currentLessonIndex = index;

    // Update sidebar active state
    document.querySelectorAll('.lesson-nav-item').forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });

    // Render content
    const tagEl = document.getElementById('lesson-current-tag');
    const bodyEl = document.getElementById('lesson-content-body');
    const prevBtn = document.getElementById('prev-lesson-btn');
    const nextBtn = document.getElementById('next-lesson-btn');

    if (tagEl) tagEl.textContent = lesson.tag;
    if (bodyEl) {
      bodyEl.innerHTML = lesson.content;
    }

    if (prevBtn) {
      prevBtn.disabled = index === 0;
      prevBtn.onclick = () => this.loadLesson(index - 1);
    }
    if (nextBtn) {
      nextBtn.disabled = index === window.LESSONS_DATA.length - 1;
      nextBtn.onclick = () => this.loadLesson(index + 1);
    }

    // Scroll smoothly to top of lesson content if on mobile
    const card = document.querySelector('.lesson-content-card');
    if (card && window.innerWidth < 900) {
      card.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // --- Interactive Lesson Actions ---
  playChromaticDemo() {
    const chromatic = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5'];
    const highlights = {};
    chromatic.forEach(n => {
      highlights[n] = { color: '#06b6d4' };
    });
    this.piano.setHighlights(highlights);
    window.soundEngine.playArpeggio(chromatic, 0.35, 0.28, (note) => {
      this.piano.pulseNote(note, 250);
    });
  }

  highlightNaturals() {
    const naturals = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const highlights = {};
    naturals.forEach(n => {
      highlights[n] = { color: '#38bdf8', badge: 'Nat' };
    });
    this.piano.setHighlights(highlights);
  }

  playStepDemo(type) {
    if (type === 'half') {
      const notes = ['C4', 'C#4'];
      this.piano.setHighlights({
        'C4': { color: '#ef4444', badge: 'Root' },
        'C#4': { color: '#f59e0b', badge: 'Half' }
      });
      window.soundEngine.playArpeggio(notes, 0.5, 0.45);
    } else {
      const notes = ['C4', 'D4'];
      this.piano.setHighlights({
        'C4': { color: '#ef4444', badge: 'Root' },
        'D4': { color: '#10b981', badge: 'Whole' }
      });
      window.soundEngine.playArpeggio(notes, 0.5, 0.45);
    }
  }

  playScale(root, scaleType) {
    const scaleNotes = window.musicTools.buildScale(root, scaleType, 4);
    const highlights = {};
    scaleNotes.forEach((n, idx) => {
      highlights[n.fullName] = {
        color: idx === 0 || idx === scaleNotes.length - 1 ? '#ef4444' : '#3b82f6',
        badge: n.degree,
        root: idx === 0
      };
    });
    this.piano.setHighlights(highlights);

    const noteNames = scaleNotes.map(n => n.fullName);
    window.soundEngine.playArpeggio(noteNames, 0.35, 0.28, (note) => {
      this.piano.pulseNote(note, 250);
    });
  }

  playIntervalDemo(intervalId) {
    const item = window.musicTools.intervalsList.find(i => i.id === intervalId);
    if (!item) return;

    const baseMidi = 60; // C4
    const note1 = 'C4';
    const note2 = window.soundEngine.midiToNote(baseMidi + item.semitones);

    this.piano.setHighlights({
      [note1]: { color: '#ef4444', badge: '1', root: true },
      [note2]: { color: '#a855f7', badge: item.id }
    });

    window.soundEngine.playArpeggio([note1, note2], 0.6, 0.55);
  }

  playChordDemo(root, chordType) {
    const chordNotes = window.musicTools.buildChord(root, chordType, 4);
    const highlights = {};
    chordNotes.forEach((n, idx) => {
      highlights[n.fullName] = {
        color: idx === 0 ? '#ef4444' : '#6366f1',
        badge: n.degree,
        root: idx === 0
      };
    });
    this.piano.setHighlights(highlights);

    const noteNames = chordNotes.map(n => n.fullName);
    // Arpeggiate then hit together
    window.soundEngine.playArpeggio(noteNames, 0.4, 0.3, () => {
      setTimeout(() => {
        window.soundEngine.playChord(noteNames, 1.2);
      }, noteNames.length * 300 + 200);
    });
  }

  // --- Tools UI Setup ---
  initToolsUI() {
    // Scale Explorer
    const scaleRoot = document.getElementById('scale-root-select');
    const scaleType = document.getElementById('scale-type-select');
    const playScaleBtn = document.getElementById('play-scale-btn');

    const updateScaleDisplay = () => {
      if (!scaleRoot || !scaleType) return;
      const root = scaleRoot.value;
      const type = scaleType.value;
      const notes = window.musicTools.buildScale(root, type, 4);

      const notesContainer = document.getElementById('scale-notes-display');
      if (notesContainer) {
        notesContainer.innerHTML = notes.map(n => `<span class="note-chip">${n.note} (${n.degree})</span>`).join('');
      }

      const highlights = {};
      notes.forEach((n, idx) => {
        highlights[n.fullName] = {
          color: idx === 0 ? '#ef4444' : '#06b6d4',
          badge: n.degree,
          root: idx === 0
        };
      });
      this.piano.setHighlights(highlights);
    };

    if (scaleRoot && scaleType) {
      scaleRoot.addEventListener('change', updateScaleDisplay);
      scaleType.addEventListener('change', updateScaleDisplay);
      if (playScaleBtn) {
        playScaleBtn.addEventListener('click', () => {
          this.playScale(scaleRoot.value, scaleType.value);
        });
      }
    }

    // Chord Explorer
    const chordRoot = document.getElementById('chord-root-select');
    const chordType = document.getElementById('chord-type-select');
    const chordInversion = document.getElementById('chord-inversion-select');
    const playChordBtn = document.getElementById('play-chord-btn');
    const playArpBtn = document.getElementById('play-chord-arp-btn');

    const updateChordDisplay = () => {
      if (!chordRoot || !chordType) return;
      const root = chordRoot.value;
      const type = chordType.value;
      const inv = parseInt(chordInversion.value, 10) || 0;
      const notes = window.musicTools.buildChord(root, type, 4, inv);

      const notesContainer = document.getElementById('chord-notes-display');
      if (notesContainer) {
        notesContainer.innerHTML = notes.map(n => `<span class="note-chip">${n.note} (${n.degree})</span>`).join('');
      }

      const highlights = {};
      notes.forEach((n, idx) => {
        highlights[n.fullName] = {
          color: idx === 0 ? '#ef4444' : '#a855f7',
          badge: n.degree,
          root: idx === 0
        };
      });
      this.piano.setHighlights(highlights);
    };

    if (chordRoot && chordType && chordInversion) {
      chordRoot.addEventListener('change', updateChordDisplay);
      chordType.addEventListener('change', updateChordDisplay);
      chordInversion.addEventListener('change', updateChordDisplay);

      if (playChordBtn) {
        playChordBtn.addEventListener('click', () => {
          const inv = parseInt(chordInversion.value, 10) || 0;
          const notes = window.musicTools.buildChord(chordRoot.value, chordType.value, 4, inv);
          window.soundEngine.playChord(notes.map(n => n.fullName), 1.2);
        });
      }

      if (playArpBtn) {
        playArpBtn.addEventListener('click', () => {
          const inv = parseInt(chordInversion.value, 10) || 0;
          const notes = window.musicTools.buildChord(chordRoot.value, chordType.value, 4, inv);
          window.soundEngine.playArpeggio(notes.map(n => n.fullName), 0.4, 0.3);
        });
      }
    }

    // Metronome
    const metronomeToggle = document.getElementById('metronome-toggle-btn');
    const bpmSlider = document.getElementById('metronome-bpm');
    const bpmDisplay = document.getElementById('bpm-val');
    const meterSelect = document.getElementById('metronome-meter');
    const tapTempoBtn = document.getElementById('tap-tempo-btn');

    if (bpmSlider && bpmDisplay) {
      bpmSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        bpmDisplay.textContent = val;
        window.musicTools.setMetronomeBpm(val);
      });
    }

    if (metronomeToggle) {
      metronomeToggle.addEventListener('click', () => {
        const meter = parseInt(meterSelect.value, 10) || 4;
        const isRunning = window.musicTools.toggleMetronome(parseInt(bpmSlider.value, 10), meter);
        metronomeToggle.textContent = isRunning ? '⏸ Stop Metronome' : '▶ Start Metronome';
        metronomeToggle.classList.toggle('btn-primary', !isRunning);
        metronomeToggle.classList.toggle('btn-secondary', isRunning);
      });
    }

    if (meterSelect) {
      meterSelect.addEventListener('change', (e) => {
        window.musicTools.beatsPerMeasure = parseInt(e.target.value, 10) || 4;
      });
    }

    if (tapTempoBtn) {
      tapTempoBtn.addEventListener('click', () => {
        window.musicTools.tapTempo();
      });
    }
  }

  // --- Quiz UI Setup ---
  initQuizUI() {
    const typeSelect = document.getElementById('quiz-type-select');
    const playAudioBtn = document.getElementById('quiz-play-audio-btn');
    const nextBtn = document.getElementById('quiz-next-btn');

    if (typeSelect) {
      typeSelect.addEventListener('change', () => {
        this.nextQuizQuestion();
      });
    }

    if (playAudioBtn) {
      playAudioBtn.addEventListener('click', () => {
        window.musicTools.playCurrentQuestionAudio();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.nextQuizQuestion();
      });
    }
  }

  nextQuizQuestion() {
    const typeSelect = document.getElementById('quiz-type-select');
    const type = typeSelect ? typeSelect.value : 'interval';
    const q = window.musicTools.generateQuizQuestion(type);

    const promptEl = document.getElementById('quiz-prompt');
    const optionsContainer = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('quiz-next-btn');

    if (promptEl) promptEl.textContent = q.prompt;
    if (feedbackEl) feedbackEl.innerHTML = '';
    if (nextBtn) nextBtn.style.display = 'none';

    if (optionsContainer) {
      optionsContainer.innerHTML = q.options.map(opt => `
        <button class="quiz-choice-btn" data-id="${opt.id}">
          <span>${opt.label}</span>
          ${opt.sub ? `<span class="choice-sub">${opt.sub}</span>` : ''}
        </button>
      `).join('');

      optionsContainer.querySelectorAll('.quiz-choice-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.handleQuizAnswer(e.currentTarget.dataset.id);
        });
      });
    }

    // Auto play question sound
    setTimeout(() => {
      window.musicTools.playCurrentQuestionAudio();
    }, 200);
  }

  handleQuizAnswer(answerId) {
    const result = window.musicTools.checkAnswer(answerId);
    if (!result) return;

    const feedbackEl = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('quiz-next-btn');
    const scoreVal = document.getElementById('quiz-score-val');
    const streakVal = document.getElementById('quiz-streak-val');

    if (scoreVal) scoreVal.textContent = result.score;
    if (streakVal) streakVal.textContent = result.streak;

    // Highlight buttons
    document.querySelectorAll('.quiz-choice-btn').forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.id === result.correctAnswer) {
        btn.classList.add('correct');
      } else if (btn.dataset.id === answerId && !result.isCorrect) {
        btn.classList.add('incorrect');
      }
    });

    if (feedbackEl) {
      feedbackEl.innerHTML = result.isCorrect 
        ? `<span style="color: #34d399">✨ Spot on! That's correct! (+10 pts)</span>`
        : `<span style="color: #fb7185">Not quite! The correct answer was highlighted in green.</span>`;
    }

    if (nextBtn) {
      nextBtn.style.display = 'inline-flex';
    }
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.app = new MusicTheoryApp();
  window.app.init();
});
