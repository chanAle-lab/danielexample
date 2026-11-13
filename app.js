/**
 * ABRSM Music Theory 101 - Master Application Coordinator
 * Matching N1Mandarin Editorial Design: Rice Paper + Ink + Vermilion Seal
 */

class AbrsmApp {
  constructor() {
    this.currentGrade = 1;
    this.currentClef = 'grand';
    this.currentTab = 'syllabus';

    this.stave = null;
    this.piano = null;
  }

  init() {
    // 1. Initialize Musical Stave Engine if container present
    const staveContainer = document.getElementById('main-stave-container');
    if (staveContainer) {
      this.stave = new MusicalStave('main-stave-container', {
        clef: this.currentClef,
        notes: [{ pitch: 'C', octave: 4, accidental: null }] // Middle C
      });
      window.staveEngine = this;
    }

    // 2. Initialize Interactive Piano Keyboard if container present
    const pianoContainer = document.getElementById('main-piano-container');
    if (pianoContainer && window.InteractivePiano) {
      this.piano = new InteractivePiano('main-piano-container', {
        startOctave: 3,
        octaves: 2,
        includeHighC: true,
        onNoteOn: (note) => {
          this.displayPianoNoteOnStave(note);
        }
      });
      window.mainPiano = this.piano;
    }

    // 3. Render All Syllabus Sub-Sections
    this.renderCadences();
    this.renderOrnaments();
    this.renderTechnicalDegrees();
    this.renderOrchestralInstruments();

    // 4. Initialize Exam Practice Simulator
    this.initExamTrainer();

    // 5. Initialize Flashcards Engine
    if (window.NoteFlashcardsEngine) {
      this.flashcards = new NoteFlashcardsEngine();
      window.flashcardsEngine = this.flashcards;

      const catSelect = document.getElementById('flashcard-category-select');
      if (catSelect) {
        catSelect.addEventListener('change', (e) => {
          this.flashcards.setCategoryFilter(e.target.value);
        });
      }
    }

    // 6. Bind Global Navigation Events
    this.bindEvents();

    // 7. Load Active Grade (Defaults strictly to Grade 1)
    const savedGrade = parseInt(localStorage.getItem('abrsm_current_grade'), 10) || 1;
    this.setGrade(savedGrade);
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
        this.setGrade(grade);
      });
    });

    // Header Grade Switcher Dropdown
    const headerGradeSelect = document.getElementById('header-grade-select');
    if (headerGradeSelect) {
      headerGradeSelect.addEventListener('change', (e) => {
        const grade = parseInt(e.target.value, 10);
        this.setGrade(grade);
      });
    }

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

    if (tabId === 'flashcards' && this.flashcards) {
      this.flashcards.renderCurrentCard();
    }

    // Scroll to main content smoothly
    const mainEl = document.getElementById('main');
    if (mainEl && window.scrollY > 300) {
      mainEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  setGrade(gradeNum) {
    gradeNum = parseInt(gradeNum, 10) || 1;
    this.currentGrade = gradeNum;
    localStorage.setItem('abrsm_current_grade', gradeNum);

    // 1. Update Header Brand Badge
    const brandBadge = document.getElementById('brand-grade-badge');
    if (brandBadge) brandBadge.textContent = `Grade ${gradeNum}`;

    // 2. Sync Header Grade Select Dropdown
    const headerSelect = document.getElementById('header-grade-select');
    if (headerSelect && headerSelect.value !== String(gradeNum)) {
      headerSelect.value = String(gradeNum);
    }

    // 3. Update Grade Switcher Pills & Status Banner
    document.querySelectorAll('.grade-pill').forEach(btn => {
      const g = parseInt(btn.dataset.grade, 10);
      btn.classList.toggle('active', g === gradeNum);
    });

    const progTitle = document.getElementById('progression-grade-title');
    const progDesc = document.getElementById('progression-grade-desc');
    const titles = {
      1: 'Currently Viewing: ABRSM Grade 1 (Foundation)',
      2: 'Currently Viewing: ABRSM Grade 2 (Simple & Compound Foundations)',
      3: 'Currently Viewing: ABRSM Grade 3 (Compound Time & 4 Sharps/Flats)',
      4: 'Currently Viewing: ABRSM Grade 4 (Alto Clef & Ornaments)',
      5: 'Currently Viewing: ABRSM Grade 5 (Capstone: Cadences & Transposition)'
    };
    const descs = {
      1: 'You are currently in Grade 1 mode. Focus on note values, simple time signatures, Grand Staff notes, scales (C, G, D, F), and Italian terms. Select Grade 2+ whenever you are ready.',
      2: 'Grade 2 builds on Grade 1 with 2/2, 3/2, 4/2, and 3/8 times, triplet rhythms, ledger lines, and relative minor keys (A, E, D harmonic minor).',
      3: 'Grade 3 introduces compound times (6/8, 9/8, 12/8), demisemiquavers, transposition at the octave, and keys up to 4 sharps/flats.',
      4: 'Grade 4 adds the Alto clef, double accidentals, technical degree names, orchestral instrument families, and ornaments.',
      5: 'Grade 5 capstone covers irregular times (5/4, 7/4), Tenor clef, transposing instruments in B♭, A, F, and harmonic cadences (V-I, IV-I, I-V).'
    };
    if (progTitle) progTitle.textContent = titles[gradeNum] || `Currently Viewing: ABRSM Grade ${gradeNum}`;
    if (progDesc) progDesc.textContent = descs[gradeNum] || 'Select any grade to view its curriculum.';

    // 4. Update Hero Eyebrow, Heading, Lede & Actions
    const heroEyebrow = document.getElementById('hero-eyebrow');
    const heroHeading = document.getElementById('hero-heading');
    const heroLede = document.getElementById('hero-lede');
    const heroActions = document.getElementById('hero-actions');
    const heroCardTag = document.getElementById('hero-card-tag');
    const heroCardDesc = document.getElementById('hero-card-desc');

    if (gradeNum === 1) {
      if (heroEyebrow) heroEyebrow.innerHTML = '<span>●</span> ABRSM Foundation • Grade 1 Curriculum';
      if (heroHeading) heroHeading.textContent = 'Master Grade 1 Music Theory.';
      if (heroLede) heroLede.textContent = 'Start your music theory journey with a complete Grade 1 foundation: note values, rests, simple time signatures, Grand Staff pitch, C/G/D/F major scales, tonic triads, and Italian terms.';
      if (heroActions) {
        heroActions.innerHTML = `
          <button class="btn primary" onclick="window.app.switchTab('flashcards');">🃏 Study Grade 1 Flashcards</button>
          <button class="btn outline" onclick="window.app.switchTab('exam');">📝 Grade 1 Practice Exam</button>
          <button class="btn outline" onclick="window.app.setGrade(2);">Advance to Grade 2 →</button>
        `;
      }
      if (heroCardTag) heroCardTag.textContent = 'Grade 1 Checklist';
      if (heroCardDesc) heroCardDesc.textContent = 'Interactive 3D flashcards featuring notes on the Grand Staff, note values & rests, simple time signatures, and Italian terms with audio.';
    } else {
      if (heroEyebrow) heroEyebrow.innerHTML = `<span>●</span> ABRSM Grade ${gradeNum} Curriculum`;
      if (heroHeading) heroHeading.textContent = `Master Grade ${gradeNum} Music Theory.`;
      if (heroLede) heroLede.textContent = descs[gradeNum];
      if (heroActions) {
        const nextGradeHtml = gradeNum < 5 
          ? `<button class="btn primary" onclick="window.app.setGrade(${gradeNum + 1});">Advance to Grade ${gradeNum + 1} →</button>`
          : `<span class="tag" style="padding: var(--space-2) var(--space-3); background: #2e7d5e; color: #fff;">🎓 Final Capstone Level</span>`;
        heroActions.innerHTML = `
          <button class="btn primary" onclick="window.app.switchTab('syllabus');">📋 Grade ${gradeNum} Checklist</button>
          <button class="btn outline" onclick="window.app.switchTab('exam');">📝 Grade ${gradeNum} Exam</button>
          <button class="btn outline" onclick="window.app.setGrade(1);">← Back to Grade 1</button>
          ${nextGradeHtml}
        `;
      }
      if (heroCardTag) heroCardTag.textContent = `Grade ${gradeNum} Active`;
      if (heroCardDesc) heroCardDesc.textContent = `Currently studying Grade ${gradeNum}. Practice questions and vocabulary are automatically tailored to this level.`;
    }

    // 5. Update Navigation Visibility for Advanced Grade Topics
    const navCadences = document.getElementById('nav-cadences');
    const navOrchestra = document.getElementById('nav-orchestra');
    if (navCadences) navCadences.style.display = gradeNum >= 4 ? 'inline-block' : 'none';
    if (navOrchestra) navOrchestra.style.display = gradeNum >= 4 ? 'inline-block' : 'none';

    // 6. Update Technical Scale Degrees Section (Grade 4 & 5 only)
    const techDegSection = document.getElementById('technical-degrees-section');
    if (techDegSection) {
      techDegSection.style.display = gradeNum >= 4 ? 'block' : 'none';
    }

    // 7. Update Ornaments Section in Terms Tab (Grade 4 & 5 only)
    const ornSection = document.getElementById('ornaments-section');
    if (ornSection) {
      ornSection.style.display = gradeNum >= 4 ? 'block' : 'none';
    }

    // 8. Render Syllabus Checklist for that grade
    this.renderSyllabus(gradeNum);

    // 9. Update Progression Callout Card at bottom of Syllabus
    this.renderProgressionCallout(gradeNum);

    // 10. Update Terms & Signs Filter
    const termsFilter = document.getElementById('glossary-grade-filter');
    const glossaryTitle = document.getElementById('glossary-title');
    if (termsFilter) {
      termsFilter.value = String(gradeNum);
      if (glossaryTitle) glossaryTitle.textContent = `Terms & Signs Glossary (Grade ${gradeNum})`;
      this.renderGlossary('', String(gradeNum));
    }

    // 11. Update Exam Practice Simulator Grade Filter
    const examFilter = document.getElementById('exam-grade-selector');
    if (examFilter) {
      examFilter.value = String(gradeNum);
    }
    if (window.abrsmQuizEngine) {
      window.abrsmQuizEngine.setGradeFilter(String(gradeNum));
      if (this.currentTab === 'exam') {
        this.nextExamQuestion();
      }
    }

    // 12. Update Piano Grade Presets Bar
    this.renderPianoPresets(gradeNum);
  }

  // Alias for backward compatibility
  loadGrade(gradeNum) {
    this.setGrade(gradeNum);
  }

  renderSyllabus(gradeNum) {
    const data = window.ABRSM_SYLLABUS[gradeNum];
    if (!data) return;

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
            Official Grade ${gradeNum} Syllabus Checklist:
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
      const isAllowed = clef === 'grand' || data.clefs.includes(clef);
      btn.style.opacity = isAllowed ? '1' : '0.4';
      btn.title = isAllowed ? `${clef} view` : `Introduced in Grade ${clef === 'alto' ? 4 : 5}`;
    });
  }

  renderProgressionCallout(gradeNum) {
    const callout = document.getElementById('syllabus-progression-callout');
    if (!callout) return;

    if (gradeNum === 1) {
      callout.innerHTML = `
        <div class="next-grade-card">
          <div>
            <div class="next-grade-title">🌟 Ready for the next stage? Advance to Grade 2</div>
            <p class="next-grade-text">
              Once you feel confident with the Grade 1 checklist above, you can advance to Grade 2 to learn 2/2 and 3/8 times, triplet rhythms, ledger lines, and relative minor keys (A, E, D harmonic minor).
            </p>
          </div>
          <button class="btn primary" onclick="window.app.setGrade(2); window.scrollTo({top: 400, behavior: 'smooth'});">
            Advance to Grade 2 Curriculum →
          </button>
        </div>
      `;
    } else if (gradeNum < 5) {
      callout.innerHTML = `
        <div class="next-grade-card">
          <div>
            <div class="next-grade-title">🌟 Progressing to Grade ${gradeNum + 1}</div>
            <p class="next-grade-text">
              Mastered the Grade ${gradeNum} requirements? Advance to Grade ${gradeNum + 1} to unlock new time signatures, clefs, and harmonic structures.
            </p>
          </div>
          <div style="display: flex; gap: var(--space-2); flex-wrap: wrap;">
            <button class="btn outline" onclick="window.app.setGrade(1); window.scrollTo({top: 400, behavior: 'smooth'});">
              ← Return to Grade 1
            </button>
            <button class="btn primary" onclick="window.app.setGrade(${gradeNum + 1}); window.scrollTo({top: 400, behavior: 'smooth'});">
              Advance to Grade ${gradeNum + 1} →
            </button>
          </div>
        </div>
      `;
    } else {
      callout.innerHTML = `
        <div class="next-grade-card" style="border-color: #2e7d5e;">
          <div>
            <div class="next-grade-title" style="color: #2e7d5e;">🎓 You are viewing the Capstone: Grade 5</div>
            <p class="next-grade-text">
              Grade 5 is the premier prerequisite level for higher music study. Review all cadences, inversions, transposing instruments, and irregular meters.
            </p>
          </div>
          <button class="btn outline" onclick="window.app.setGrade(1); window.scrollTo({top: 400, behavior: 'smooth'});">
            ← Return to Grade 1 Foundation
          </button>
        </div>
      `;
    }
  }

  renderPianoPresets(gradeNum) {
    const container = document.getElementById('piano-grade-presets');
    if (!container) return;

    if (gradeNum === 1) {
      container.innerHTML = `
        <span class="piano-preset-label">Grade 1 Keys & Benchmarks:</span>
        <button class="btn outline small" onclick="window.app.playBenchmark('C4')">Middle C (C4)</button>
        <button class="btn outline small" onclick="window.app.playScale('C')">C Major Scale</button>
        <button class="btn outline small" onclick="window.app.playScale('G')">G Major Scale (F♯)</button>
        <button class="btn outline small" onclick="window.app.playScale('D')">D Major Scale (F♯, C♯)</button>
        <button class="btn outline small" onclick="window.app.playScale('F')">F Major Scale (B♭)</button>
        <button class="btn outline small" onclick="window.app.playChord(['C4','E4','G4'])">C Tonic Triad</button>
      `;
    } else if (gradeNum === 2) {
      container.innerHTML = `
        <span class="piano-preset-label">Grade 2 Keys & Minors:</span>
        <button class="btn outline small" onclick="window.app.playScale('A_minor')">A Harmonic Minor (G♯)</button>
        <button class="btn outline small" onclick="window.app.playScale('E_minor')">E Harmonic Minor (D♯)</button>
        <button class="btn outline small" onclick="window.app.playScale('D_minor')">D Harmonic Minor (C♯)</button>
        <button class="btn outline small" onclick="window.app.playScale('Bb')">B♭ Major Scale</button>
        <button class="btn outline small" onclick="window.app.playChord(['A3','C4','E4'])">A Minor Triad</button>
      `;
    } else {
      container.innerHTML = `
        <span class="piano-preset-label">Grade ${gradeNum} Scales & Harmonies:</span>
        <button class="btn outline small" onclick="window.app.playScale('C')">C Major</button>
        <button class="btn outline small" onclick="window.app.playScale('G')">G Major</button>
        <button class="btn outline small" onclick="window.app.playScale('D')">D Major</button>
        <button class="btn outline small" onclick="window.app.playScale('A_minor')">A Minor</button>
        <button class="btn outline small" onclick="window.app.playChord(['C4','E4','G4'])">C Major Triad</button>
        <button class="btn outline small" onclick="window.app.playChord(['G3','B3','D4','F4'])">G7 Dominant 7th</button>
      `;
    }
  }

  playBenchmark(note) {
    if (window.soundEngine) {
      window.soundEngine.init();
      window.soundEngine.playNote(note, 1.2, 0.8);
    }
    if (this.piano) {
      this.piano.clearHighlights();
      this.piano.highlightKey(note, 'active');
      setTimeout(() => this.piano.clearHighlights(), 1200);
    }
  }

  playScale(key) {
    if (!window.soundEngine) return;
    window.soundEngine.init();

    const scaleMap = {
      'C': ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
      'G': ['G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F#4', 'G4'],
      'D': ['D4', 'E4', 'F#4', 'G4', 'A4', 'B4', 'C#5', 'D5'],
      'F': ['F3', 'G3', 'A3', 'Bb3', 'C4', 'D4', 'E4', 'F4'],
      'A_minor': ['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G#4', 'A4'],
      'E_minor': ['E3', 'F#3', 'G3', 'A3', 'B3', 'C4', 'D#4', 'E4'],
      'D_minor': ['D4', 'E4', 'F4', 'G4', 'A4', 'Bb4', 'C#5', 'D5'],
      'Bb': ['Bb3', 'C4', 'D4', 'Eb4', 'F4', 'G4', 'A4', 'Bb4']
    };

    const notes = scaleMap[key] || scaleMap['C'];
    if (this.piano) this.piano.clearHighlights();

    notes.forEach((note, idx) => {
      setTimeout(() => {
        window.soundEngine.playNote(note, 0.35, 0.75);
        if (this.piano) {
          this.piano.clearHighlights();
          this.piano.highlightKey(note, 'active');
        }
      }, idx * 240);
    });

    setTimeout(() => {
      if (this.piano) {
        this.piano.clearHighlights();
        this.piano.highlightKey(notes[0], 'correct');
      }
    }, notes.length * 240 + 400);
  }

  playChord(notes) {
    if (!window.soundEngine) return;
    window.soundEngine.init();
    window.soundEngine.playChord(notes, 1.4, 0.8);

    if (this.piano) {
      this.piano.clearHighlights();
      notes.forEach(n => this.piano.highlightKey(n, 'active'));
      setTimeout(() => this.piano.clearHighlights(), 1500);
    }
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
