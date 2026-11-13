/**
 * ABRSM Music Theory 101 - Master Application Coordinator
 * Matching N1Mandarin Editorial Design: Rice Paper + Ink + Vermilion Seal
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
      notes: [{ pitch: 'C', octave: 4, accidental: null }] // Middle C
    });
    window.staveEngine = this;

    // 2. Initialize Interactive Piano Keyboard
    this.piano = new InteractivePiano('main-piano-container', {
      startOctave: 3,
      octaves: 2,
      includeHighC: true,
      onNoteOn: (note) => {
        this.displayPianoNoteOnStave(note);
      }
    });
    window.mainPiano = this.piano;

    // 3. Render Grade 1 Syllabus
    this.loadGrade(1);

    // 4. Render All Syllabus Sections
    this.renderCadences();
    this.renderOrnaments();
    this.renderTechnicalDegrees();
    this.renderOrchestralInstruments();
    this.renderGlossary();

    // 5. Initialize Exam Practice Simulator
    this.initExamTrainer();

    // 6. Bind Global Navigation Events
    this.bindEvents();
  }

  bindEvents() {
    // Top Navigation Links
    document.querySelectorAll('.site-header nav a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = e.currentTarget.dataset.tab;
        this.switchTab(tab);
      });
    });

    // Grade Switcher Pills
    document.querySelectorAll('.grade-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const grade = parseInt(e.currentTarget.dataset.grade, 10);
        this.loadGrade(grade);
      });
    });

    // Clef Switchers (Centerpiece)
    document.querySelectorAll('.clef-tab-btn').forEach(btn => {
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

    // Glossary Filter Events
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

    // Update Header Nav Links
    document.querySelectorAll('.site-header nav a').forEach(link => {
      link.classList.toggle('active', link.dataset.tab === tabId);
    });

    // Update Tab Views
    document.querySelectorAll('.tab-view').forEach(view => {
      view.classList.toggle('active', view.id === `tab-${tabId}`);
    });

    // Trigger first question if switching to exam
    if (tabId === 'exam' && !window.abrsmQuizEngine.currentQuestion) {
      this.nextExamQuestion();
    }

    // Scroll to main content smoothly
    const mainEl = document.getElementById('main');
    if (mainEl && window.scrollY > 300) {
      mainEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  loadGrade(gradeNum) {
    this.currentGrade = gradeNum;

    // Update pill states
    document.querySelectorAll('.grade-pill').forEach(btn => {
      const g = parseInt(btn.dataset.grade, 10);
      btn.classList.toggle('active', g === gradeNum);
    });

    const data = window.ABRSM_SYLLABUS[gradeNum];
    if (!data) return;

    // Render Syllabus Overview Card (Paper card style)
    const container = document.getElementById('syllabus-content-area');
    if (container) {
      container.innerHTML = `
        <div class="paper-card">
          <div class="card-head">
            <div>
              <span class="tag">${data.badge}</span>
              <h2 style="font-size: var(--text-2xl); margin-top: var(--space-2);">${data.title}</h2>
            </div>
            <div style="text-align: right;">
              <span style="font-size: var(--text-xs); color: var(--color-muted); text-transform: uppercase; letter-spacing: .08em; display: block;">Required Keys</span>
              <div style="display: flex; gap: var(--space-1); flex-wrap: wrap; justify-content: flex-end; margin-top: var(--space-1);">
                ${data.keys.map(k => `<span class="tag" style="background: var(--color-surface); border: 1px solid var(--color-line); color: var(--color-ink);">${k}</span>`).join('')}
              </div>
            </div>
          </div>

          <p style="color: var(--color-muted); font-size: var(--text-base); margin-block: var(--space-3) var(--space-5); max-width: 65ch;">
            ${data.summary}
          </p>

          <h3 style="font-size: var(--text-sm); text-transform: uppercase; letter-spacing: .08em; color: var(--color-accent); margin-bottom: var(--space-3);">
            Official Syllabus Checklist:
          </h3>
          <div class="checklist-list">
            ${data.checklist.map(item => `
              <div class="checklist-row">
                <span class="checklist-icon">✓</span>
                <span>${item}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Update available clefs for that grade
    document.querySelectorAll('.clef-tab-btn').forEach(btn => {
      const clef = btn.dataset.clef;
      const isAllowed = data.clefs.includes(clef);
      btn.style.opacity = isAllowed ? '1' : '0.4';
      btn.title = isAllowed ? `${clef} clef` : `Introduced in Grade ${clef === 'alto' ? 4 : 5}`;
    });
  }

  setClef(clef) {
    this.currentClef = clef;
    document.querySelectorAll('.clef-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.clef === clef);
    });
    if (this.stave) {
      this.stave.setClef(clef);
    }
  }

  handleNoteClick(noteString) {
    if (window.soundEngine) {
      window.soundEngine.playNote(noteString, 0.6);
    }
    if (this.piano) {
      this.piano.pressKey(noteString);
      setTimeout(() => this.piano.releaseKey(noteString), 400);
    }
  }

  displayPianoNoteOnStave(noteString) {
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
      <div class="paper-card">
        <div class="card-head">
          <h3>${cadence.name}</h3>
          <span class="tag">${cadence.effect}</span>
        </div>
        <div class="cadence-badge">${cadence.progression}</div>
        <p style="color: var(--color-muted); font-size: var(--text-sm); margin-block: var(--space-2) var(--space-4);">
          ${cadence.description}
        </p>

        <span style="font-size: var(--text-xs); color: var(--color-muted); text-transform: uppercase; letter-spacing: .06em; font-weight: 700; display: block; margin-bottom: var(--space-2);">Audition in Key:</span>
        <div style="display: flex; gap: var(--space-2); flex-wrap: wrap;">
          ${Object.keys(cadence.keys).map(key => `
            <button class="btn outline small" onclick="window.app.playCadenceAudio('${cadence.id}', '${key}')">
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

    const h1 = {};
    kData.chord1.forEach(n => h1[n] = { color: '#b8432f', badge: cad.name1 });
    this.piano.setHighlights(h1);

    setTimeout(() => {
      const h2 = {};
      kData.chord2.forEach(n => h2[n] = { color: '#2e7d5e', badge: cad.name2 });
      this.piano.setHighlights(h2);
    }, 1200);
  }

  // --- Ornaments Section ---
  renderOrnaments() {
    const container = document.getElementById('ornaments-container');
    if (!container || !window.ABRSM_ORNAMENTS) return;

    container.innerHTML = window.ABRSM_ORNAMENTS.map(orn => `
      <div class="ornament-box">
        <div>
          <div class="ornament-glyph">${orn.symbol}</div>
          <div class="card-head">
            <h4 style="font-size: var(--text-base);">${orn.name}</h4>
            <span class="tag">Grade ${orn.grade}</span>
          </div>
          <p style="color: var(--color-muted); font-size: var(--text-xs); margin-top: var(--space-2);">
            ${orn.description}
          </p>
        </div>
        <button class="btn outline small" style="margin-top: var(--space-4);" onclick="window.soundEngine.playOrnament('${orn.id}')">
          ▶ Play Sound Demo
        </button>
      </div>
    `).join('');
  }

  // --- Technical Degrees Section ---
  renderTechnicalDegrees() {
    const container = document.getElementById('technical-degrees-container');
    if (!container || !window.TECHNICAL_SCALE_DEGREES) return;

    container.innerHTML = window.TECHNICAL_SCALE_DEGREES.map(deg => `
      <div class="paper-card" style="padding: var(--space-4);">
        <span style="font-size: var(--text-xs); color: var(--color-accent); font-weight: 700;">Degree ${deg.degree} (${deg.roman})</span>
        <h4 style="font-size: var(--text-base); margin-block: var(--space-1);">${deg.name}</h4>
        <p style="color: var(--color-muted); font-size: var(--text-xs);">${deg.role}</p>
      </div>
    `).join('');
  }

  // --- Orchestral Instruments Section ---
  renderOrchestralInstruments() {
    const container = document.getElementById('orchestra-container');
    if (!container || !window.ORCHESTRAL_INSTRUMENTS) return;

    container.innerHTML = window.ORCHESTRAL_INSTRUMENTS.map(inst => `
      <div class="paper-card">
        <div class="card-head">
          <span class="tag">${inst.family}</span>
          <span style="font-size: var(--text-xs); color: var(--color-muted);">Grade ${inst.grade}</span>
        </div>
        <h4 style="font-size: var(--text-lg); margin-block: var(--space-2);">${inst.name}</h4>
        <p style="font-size: var(--text-xs); color: var(--color-muted); margin-bottom: 2px;">
          <strong>Clef:</strong> ${inst.clef}
        </p>
        <p style="font-size: var(--text-xs); color: var(--color-muted); margin-bottom: 2px;">
          <strong>Transposition:</strong> ${inst.transposing}
        </p>
        <p style="font-size: var(--text-xs); color: var(--color-muted);">
          <strong>Sound:</strong> ${inst.sound}
        </p>
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
        <td><strong>${t.term}</strong></td>
        <td>${t.translation}</td>
        <td><span style="color: var(--color-muted); font-size: var(--text-xs);">${t.category}</span></td>
        <td><span class="tag">Grade ${t.grade}</span></td>
      </tr>
    `).join('');
  }

  filterGlossary() {
    const searchVal = document.getElementById('glossary-search').value;
    const gradeVal = document.getElementById('glossary-grade-filter').value;
    this.renderGlossary(searchVal, gradeVal);
  }

  // --- Exam Practice Simulator ---
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
        <button class="exam-choice-button" data-choice="${opt.replace(/"/g, '&quot;')}">
          ${opt}
        </button>
      `).join('');

      optionsGrid.querySelectorAll('.exam-choice-button').forEach(btn => {
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

    document.querySelectorAll('.exam-choice-button').forEach(btn => {
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
        <strong style="color: ${result.isCorrect ? 'var(--color-answer)' : 'var(--color-accent)'};">
          ${result.isCorrect ? '✓ Correct' : '✗ Incorrect'}
        </strong>
        <p style="margin-top: var(--space-1);">${result.explanation}</p>
      `;
    }

    if (nextBtn) nextBtn.style.display = 'block';
  }
}

// Bootstrap on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.app = new AbrsmApp();
  window.app.init();
});
