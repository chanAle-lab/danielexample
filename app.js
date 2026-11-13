/**
 * ABRSM Music Theory 101 - Master Application Coordinator
 * Integrates Stave Engine, Piano, Syllabus Data, Cadences, Ornaments, Glossary, and Exam Trainer.
 */

class AbrsmApp {
  constructor() {
    this.currentGrade = 1;
    this.currentClef = 'treble';
    this.currentTab = 'syllabus';

    this.stave = null;
    this.piano = null;
  }

  init() {
    // 1. Initialize Musical Stave Engine
    this.stave = new MusicalStave('main-stave-container', {
      clef: this.currentClef,
      notes: [{ pitch: 'C', octave: 4, accidental: null }] // Start on Middle C
    });
    window.staveEngine = this;

    // 2. Initialize Interactive Piano Keyboard
    this.piano = new InteractivePiano('main-piano-container', {
      startOctave: 3,
      octaves: 2,
      includeHighC: true,
      onNoteOn: (note) => {
        // Sync piano key press to Musical Stave
        this.displayPianoNoteOnStave(note);
      }
    });
    window.mainPiano = this.piano;

    // 3. Render Grade 1 Syllabus initially
    this.loadGrade(1);

    // 4. Render Cadences & Ornaments
    this.renderCadences();
    this.renderOrnaments();
    this.renderTechnicalDegrees();
    this.renderOrchestralInstruments();
    this.renderGlossary();

    // 5. Initialize Exam Practice
    this.initExamTrainer();

    // 6. Bind Global Navigation Events
    this.bindEvents();
  }

  bindEvents() {
    // Navigation Tabs
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        this.switchTab(tab);
      });
    });

    // Grade Switcher Pills (Top Banner)
    document.querySelectorAll('.grade-pill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const grade = parseInt(e.currentTarget.dataset.grade, 10);
        this.loadGrade(grade);
      });
    });

    // Clef Switcher (Stave Panel)
    document.querySelectorAll('.clef-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const clef = e.currentTarget.dataset.clef;
        this.setClef(clef);
      });
    });

    // Volume Slider & Mute
    const volSlider = document.getElementById('master-volume');
    if (volSlider) {
      volSlider.addEventListener('input', (e) => {
        window.soundEngine.setVolume(parseFloat(e.target.value));
      });
    }

    const muteBtn = document.getElementById('mute-btn');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        const isMuted = window.soundEngine.toggleMute();
        muteBtn.textContent = isMuted ? '🔇' : '🔊';
      });
    }

    // Glossary Search & Filter
    const searchInput = document.getElementById('glossary-search');
    const gradeSelect = document.getElementById('glossary-grade-filter');
    if (searchInput) {
      searchInput.addEventListener('input', () => this.filterGlossary());
    }
    if (gradeSelect) {
      gradeSelect.addEventListener('change', () => this.filterGlossary());
    }
  }

  switchTab(tabId) {
    this.currentTab = tabId;

    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    document.querySelectorAll('.tab-view').forEach(view => {
      view.classList.toggle('active', view.id === `tab-${tabId}`);
    });

    if (tabId === 'exam' && !window.abrsmQuizEngine.currentQuestion) {
      this.nextExamQuestion();
    }
  }

  loadGrade(gradeNum) {
    this.currentGrade = gradeNum;

    // Update pill states
    document.querySelectorAll('.grade-pill-btn').forEach(btn => {
      const g = parseInt(btn.dataset.grade, 10);
      btn.classList.toggle('active', g === gradeNum);
    });

    const data = window.ABRSM_SYLLABUS[gradeNum];
    if (!data) return;

    // Render Syllabus Overview Card
    const container = document.getElementById('syllabus-content-area');
    if (container) {
      container.innerHTML = `
        <div class="syllabus-overview-card">
          <div class="syllabus-header-row">
            <div>
              <h2 class="grade-title-lg">${data.title}</h2>
              <span class="grade-badge-tag">${data.badge}</span>
            </div>
            <div class="grade-quick-keys">
              <strong style="color: var(--text-muted); font-size: 0.8rem;">REQUIRED KEYS:</strong>
              <div style="display: flex; gap: 0.35rem; flex-wrap: wrap; margin-top: 0.35rem;">
                ${data.keys.map(k => `<span class="note-chip">${k}</span>`).join('')}
              </div>
            </div>
          </div>

          <p class="syllabus-summary-p">${data.summary}</p>

          <h3 style="font-size: 1.1rem; color: var(--abrsm-gold); margin-bottom: 0.85rem;">
            Official Syllabus Learning Checklist:
          </h3>
          <div class="checklist-grid">
            ${data.checklist.map((item, idx) => `
              <div class="checklist-item">
                <span class="checklist-check">✔</span>
                <span>${item}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Auto-update stave clef buttons available for that grade
    document.querySelectorAll('.clef-btn').forEach(btn => {
      const clef = btn.dataset.clef;
      const isAllowed = data.clefs.includes(clef);
      btn.style.opacity = isAllowed ? '1' : '0.4';
      btn.title = isAllowed ? `${clef} clef` : `Introduced in Grade ${clef === 'alto' ? 4 : 5}`;
    });
  }

  setClef(clef) {
    this.currentClef = clef;
    document.querySelectorAll('.clef-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.clef === clef);
    });
    if (this.stave) {
      this.stave.setClef(clef);
    }
  }

  // Handle note click from Stave
  handleNoteClick(noteString) {
    if (window.soundEngine) {
      window.soundEngine.playNote(noteString, 0.6);
    }
    if (this.piano) {
      this.piano.pressKey(noteString);
      setTimeout(() => this.piano.releaseKey(noteString), 400);
    }
  }

  // Display piano key press on Stave
  displayPianoNoteOnStave(noteString) {
    // Note format: "C4", "C#4", "Bb4"
    const match = noteString.match(/^([A-G])([#B]?)(\d+)$/);
    if (!match) return;

    const pitch = match[1];
    const accidental = match[2] || null;
    const octave = parseInt(match[3], 10);

    if (this.stave) {
      this.stave.addNote(pitch, octave, accidental);
    }
  }

  // --- Cadences Section ---
  renderCadences() {
    const container = document.getElementById('cadences-container');
    if (!container || !window.ABRSM_CADENCES) return;

    container.innerHTML = window.ABRSM_CADENCES.map(cadence => `
      <div class="cadence-card">
        <h3 style="font-size: 1.3rem; color: #fff;">${cadence.name}</h3>
        <span class="cadence-progression-badge">${cadence.progression}</span>
        <p style="color: var(--abrsm-gold); font-size: 0.85rem; font-weight: 700;">${cadence.effect}</p>
        <p style="color: var(--text-secondary); font-size: 0.875rem; margin: 0.5rem 0;">${cadence.description}</p>
        
        <strong style="font-size: 0.8rem; color: var(--text-muted);">Audition in Key:</strong>
        <div class="cadence-key-buttons">
          ${Object.keys(cadence.keys).map(key => `
            <button class="btn btn-sm btn-secondary" onclick="window.app.playCadenceAudio('${cadence.id}', '${key}')">
              ▶ Key of ${key}
            </button>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  playCadenceAudio(cadenceId, key) {
    const cad = window.ABRSM_CADENCES.find(c => c.id === cadenceId);
    if (!cad || !cad.keys[key]) return;

    const kData = cad.keys[key];
    window.soundEngine.playCadence(kData.chord1, kData.chord2);

    // Highlight chords sequentially on piano
    const h1 = {};
    kData.chord1.forEach(n => h1[n] = { color: '#6366f1', badge: cad.name1 });
    this.piano.setHighlights(h1);

    setTimeout(() => {
      const h2 = {};
      kData.chord2.forEach(n => h2[n] = { color: '#fbbf24', badge: cad.name2 });
      this.piano.setHighlights(h2);
    }, 1200);
  }

  // --- Ornaments Section ---
  renderOrnaments() {
    const container = document.getElementById('ornaments-container');
    if (!container || !window.ABRSM_ORNAMENTS) return;

    container.innerHTML = window.ABRSM_ORNAMENTS.map(orn => `
      <div class="ornament-card">
        <div>
          <div class="ornament-symbol">${orn.symbol}</div>
          <h4 style="color: #fff; font-size: 1.1rem; margin-bottom: 0.25rem;">${orn.name}</h4>
          <span class="glossary-grade-tag">Grade ${orn.grade}</span>
          <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">${orn.description}</p>
        </div>
        <button class="btn btn-sm btn-gold" style="margin-top: 1rem;" onclick="window.soundEngine.playOrnament('${orn.id}')">
          ▶ Play Audio Demo
        </button>
      </div>
    `).join('');
  }

  // --- Technical Degrees Section ---
  renderTechnicalDegrees() {
    const container = document.getElementById('technical-degrees-container');
    if (!container || !window.TECHNICAL_SCALE_DEGREES) return;

    container.innerHTML = window.TECHNICAL_SCALE_DEGREES.map(deg => `
      <div class="degree-card">
        <span class="degree-num">Degree ${deg.degree} (${deg.roman})</span>
        <h4 class="degree-name">${deg.name}</h4>
        <p class="degree-desc">${deg.role}</p>
      </div>
    `).join('');
  }

  // --- Orchestral Instruments Section ---
  renderOrchestralInstruments() {
    const container = document.getElementById('orchestra-container');
    if (!container || !window.ORCHESTRAL_INSTRUMENTS) return;

    container.innerHTML = window.ORCHESTRAL_INSTRUMENTS.map(inst => `
      <div class="instrument-card">
        <span class="instrument-family-tag">${inst.family}</span>
        <h4 class="instrument-title">${inst.name}</h4>
        <p class="instrument-meta-line"><strong>Primary Clef:</strong> ${inst.clef}</p>
        <p class="instrument-meta-line"><strong>Transposition:</strong> ${inst.transposing}</p>
        <p class="instrument-meta-line"><strong>Sound:</strong> ${inst.sound}</p>
        <span class="glossary-grade-tag">Grade ${inst.grade}</span>
      </div>
    `).join('');
  }

  // --- Terms & Signs Glossary ---
  renderGlossary(filterText = '', filterGrade = 'all') {
    const tbody = document.getElementById('glossary-table-body');
    if (!tbody || !window.ABRSM_TERMS) return;

    let terms = window.ABRSM_TERMS;
    if (filterGrade !== 'all') {
      const g = parseInt(filterGrade, 10);
      terms = terms.filter(t => t.grade === g);
    }
    if (filterText) {
      const txt = filterText.toLowerCase();
      terms = terms.filter(t => t.term.toLowerCase().includes(txt) || t.translation.toLowerCase().includes(txt) || t.category.toLowerCase().includes(txt));
    }

    tbody.innerHTML = terms.map(t => `
      <tr>
        <td class="glossary-term">${t.term}</td>
        <td>${t.translation}</td>
        <td><span style="color: var(--text-muted); font-size: 0.8rem;">${t.category}</span></td>
        <td><span class="glossary-grade-tag">Grade ${t.grade}</span></td>
      </tr>
    `).join('');
  }

  filterGlossary() {
    const searchVal = document.getElementById('glossary-search').value;
    const gradeVal = document.getElementById('glossary-grade-filter').value;
    this.renderGlossary(searchVal, gradeVal);
  }

  // --- Exam Practice Trainer ---
  initExamTrainer() {
    const gradeSelect = document.getElementById('exam-grade-selector');
    const nextBtn = document.getElementById('exam-next-btn');

    if (gradeSelect) {
      gradeSelect.addEventListener('change', (e) => {
        window.abrsmQuizEngine.setGradeFilter(e.target.value);
        this.nextExamQuestion();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.nextExamQuestion();
      });
    }
  }

  nextExamQuestion() {
    const q = window.abrsmQuizEngine.getNextQuestion();
    if (!q) return;

    const catBadge = document.getElementById('exam-question-category');
    const promptEl = document.getElementById('exam-question-prompt');
    const optionsGrid = document.getElementById('exam-options-container');
    const explanationBox = document.getElementById('exam-explanation');
    const nextBtn = document.getElementById('exam-next-btn');

    if (catBadge) catBadge.textContent = `Grade ${q.grade} • ${q.category}`;
    if (promptEl) promptEl.textContent = q.question;
    if (explanationBox) {
      explanationBox.style.display = 'none';
      explanationBox.innerHTML = '';
    }
    if (nextBtn) nextBtn.style.display = 'none';

    if (optionsGrid) {
      optionsGrid.innerHTML = q.options.map(opt => `
        <button class="exam-choice-btn" data-choice="${opt.replace(/"/g, '&quot;')}">
          ${opt}
        </button>
      `).join('');

      optionsGrid.querySelectorAll('.exam-choice-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.handleExamAnswer(e.currentTarget.dataset.choice);
        });
      });
    }
  }

  handleExamAnswer(selectedChoice) {
    const result = window.abrsmQuizEngine.checkAnswer(selectedChoice);
    if (!result) return;

    const scoreEl = document.getElementById('exam-score-val');
    const streakEl = document.getElementById('exam-streak-val');
    const explanationBox = document.getElementById('exam-explanation');
    const nextBtn = document.getElementById('exam-next-btn');

    if (scoreEl) scoreEl.textContent = result.score;
    if (streakEl) streakEl.textContent = `${result.streak} 🔥`;

    document.querySelectorAll('.exam-choice-btn').forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.choice === result.correctAnswer) {
        btn.classList.add('correct');
      } else if (btn.dataset.choice === selectedChoice && !result.isCorrect) {
        btn.classList.add('incorrect');
      }
    });

    if (explanationBox) {
      explanationBox.style.display = 'block';
      explanationBox.innerHTML = `
        <strong>${result.isCorrect ? '✨ Correct!' : '❌ Incorrect'}</strong>
        <p style="margin-top: 0.35rem;">${result.explanation}</p>
      `;
    }

    if (nextBtn) nextBtn.style.display = 'inline-flex';
  }
}

// Bootstrap on DOM ready
window.addEventListener('DOMContentLoaded', () => {
  window.app = new AbrsmApp();
  window.app.init();
});
