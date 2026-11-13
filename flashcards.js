/**
 * MusicTheory101 - Interactive Note Flashcards Engine
 * Displays musical notes on stave on front, note name + position + piano guide on back.
 * Supports Treble, Bass, Alto, and Tenor clefs, filtering, audio playback, and progress tracking.
 */

class NoteFlashcardsEngine {
  constructor() {
    this.deck = [];
    this.currentIndex = 0;
    this.isFlipped = false;
    this.selectedClef = 'all'; // 'all', 'treble', 'bass', 'alto', 'tenor'
    this.selectedDifficulty = 'all'; // 'all', 'natural', 'ledger', 'accidental'
    this.knownCount = 0;
    this.reviewCount = 0;

    this.allCards = [
      // === TREBLE CLEF ===
      {
        id: 'tc-c4',
        clef: 'treble',
        pitch: 'C',
        octave: 4,
        accidental: null,
        fullName: 'C4',
        name: 'Middle C (C4)',
        position: '1st ledger line below the stave',
        hint: 'The central anchor of the grand staff; sits between treble and bass.',
        type: 'ledger',
        grade: 1
      },
      {
        id: 'tc-d4',
        clef: 'treble',
        pitch: 'D',
        octave: 4,
        accidental: null,
        fullName: 'D4',
        name: 'D4',
        position: 'Space sitting directly below line 1',
        hint: 'Hangs right underneath the bottom line of the treble stave.',
        type: 'natural',
        grade: 1
      },
      {
        id: 'tc-e4',
        clef: 'treble',
        pitch: 'E',
        octave: 4,
        accidental: null,
        fullName: 'E4',
        name: 'E4',
        position: 'Line 1 (Bottom line)',
        hint: 'Mnemonic: "Every" in Every Good Boy Does Fine.',
        type: 'natural',
        grade: 1
      },
      {
        id: 'tc-f4',
        clef: 'treble',
        pitch: 'F',
        octave: 4,
        accidental: null,
        fullName: 'F4',
        name: 'F4',
        position: 'Space 1',
        hint: 'Mnemonic: "F" in F-A-C-E spaces.',
        type: 'natural',
        grade: 1
      },
      {
        id: 'tc-g4',
        clef: 'treble',
        pitch: 'G',
        octave: 4,
        accidental: null,
        fullName: 'G4',
        name: 'G4',
        position: 'Line 2',
        hint: 'The G Clef circle wraps directly around this line!',
        type: 'natural',
        grade: 1
      },
      {
        id: 'tc-a4',
        clef: 'treble',
        pitch: 'A',
        octave: 4,
        accidental: null,
        fullName: 'A4',
        name: 'A4 (Concert Pitch 440 Hz)',
        position: 'Space 2',
        hint: 'Mnemonic: "A" in F-A-C-E spaces.',
        type: 'natural',
        grade: 1
      },
      {
        id: 'tc-b4',
        clef: 'treble',
        pitch: 'B',
        octave: 4,
        accidental: null,
        fullName: 'B4',
        name: 'B4',
        position: 'Line 3 (Middle line)',
        hint: 'Mnemonic: "Boy" in Every Good Boy Does Fine.',
        type: 'natural',
        grade: 1
      },
      {
        id: 'tc-c5',
        clef: 'treble',
        pitch: 'C',
        octave: 5,
        accidental: null,
        fullName: 'C5',
        name: 'C5 (Treble C)',
        position: 'Space 3',
        hint: 'Mnemonic: "C" in F-A-C-E spaces. One octave above Middle C.',
        type: 'natural',
        grade: 1
      },
      {
        id: 'tc-d5',
        clef: 'treble',
        pitch: 'D',
        octave: 5,
        accidental: null,
        fullName: 'D5',
        name: 'D5',
        position: 'Line 4',
        hint: 'Mnemonic: "Does" in Every Good Boy Does Fine.',
        type: 'natural',
        grade: 1
      },
      {
        id: 'tc-e5',
        clef: 'treble',
        pitch: 'E',
        octave: 5,
        accidental: null,
        fullName: 'E5',
        name: 'E5',
        position: 'Space 4 (Top space)',
        hint: 'Mnemonic: "E" in F-A-C-E spaces.',
        type: 'natural',
        grade: 1
      },
      {
        id: 'tc-f5',
        clef: 'treble',
        pitch: 'F',
        octave: 5,
        accidental: null,
        fullName: 'F5',
        name: 'F5',
        position: 'Line 5 (Top line)',
        hint: 'Mnemonic: "Fine" in Every Good Boy Does Fine.',
        type: 'natural',
        grade: 1
      },
      {
        id: 'tc-g5',
        clef: 'treble',
        pitch: 'G',
        octave: 5,
        accidental: null,
        fullName: 'G5',
        name: 'G5',
        position: 'Space sitting on top of line 5',
        hint: 'Rests right above the top line of the treble stave.',
        type: 'natural',
        grade: 1
      },
      {
        id: 'tc-a5',
        clef: 'treble',
        pitch: 'A',
        octave: 5,
        accidental: null,
        fullName: 'A5',
        name: 'A5',
        position: '1st ledger line above the stave',
        hint: 'Common violin & flute register note.',
        type: 'ledger',
        grade: 2
      },
      {
        id: 'tc-c6',
        clef: 'treble',
        pitch: 'C',
        octave: 6,
        accidental: null,
        fullName: 'C6',
        name: 'C6 (High C)',
        position: '2 ledger lines above the stave',
        hint: 'Two full octaves above Middle C.',
        type: 'ledger',
        grade: 3
      },
      {
        id: 'tc-fs4',
        clef: 'treble',
        pitch: 'F',
        octave: 4,
        accidental: '#',
        fullName: 'F#4',
        name: 'F♯4 (F sharp)',
        position: 'Space 1 with a sharp (♯) sign',
        hint: 'The key accidental of G Major and D Major.',
        type: 'accidental',
        grade: 1
      },
      {
        id: 'tc-bb4',
        clef: 'treble',
        pitch: 'B',
        octave: 4,
        accidental: 'b',
        fullName: 'Bb4',
        name: 'B♭4 (B flat)',
        position: 'Line 3 with a flat (♭) sign',
        hint: 'The key accidental of F Major and B♭ Major.',
        type: 'accidental',
        grade: 1
      },

      // === BASS CLEF ===
      {
        id: 'bc-c4',
        clef: 'bass',
        pitch: 'C',
        octave: 4,
        accidental: null,
        fullName: 'C4',
        name: 'Middle C (C4)',
        position: '1st ledger line above the stave',
        hint: 'The exact same Middle C pitch as on the treble stave!',
        type: 'ledger',
        grade: 1
      },
      {
        id: 'bc-b3',
        clef: 'bass',
        pitch: 'B',
        octave: 3,
        accidental: null,
        fullName: 'B3',
        name: 'B3',
        position: 'Space sitting on top of line 5',
        hint: 'Sits right on top of the bass stave line 5.',
        type: 'natural',
        grade: 1
      },
      {
        id: 'bc-a3',
        clef: 'bass',
        pitch: 'A',
        octave: 3,
        accidental: null,
        fullName: 'A3',
        name: 'A3',
        position: 'Line 5 (Top line)',
        hint: 'Mnemonic: "Always" in Good Boys Do Fine Always.',
        type: 'natural',
        grade: 1
      },
      {
        id: 'bc-g3',
        clef: 'bass',
        pitch: 'G',
        octave: 3,
        accidental: null,
        fullName: 'G3',
        name: 'G3',
        position: 'Space 4 (Top space)',
        hint: 'Mnemonic: "Grass" in All Cows Eat Grass.',
        type: 'natural',
        grade: 1
      },
      {
        id: 'bc-f3',
        clef: 'bass',
        pitch: 'F',
        octave: 3,
        accidental: null,
        fullName: 'F3',
        name: 'F3',
        position: 'Line 4',
        hint: 'The F Clef two dots enclose this line (F-line)!',
        type: 'natural',
        grade: 1
      },
      {
        id: 'bc-e3',
        clef: 'bass',
        pitch: 'E',
        octave: 3,
        accidental: null,
        fullName: 'E3',
        name: 'E3',
        position: 'Space 3',
        hint: 'Mnemonic: "Eat" in All Cows Eat Grass.',
        type: 'natural',
        grade: 1
      },
      {
        id: 'bc-d3',
        clef: 'bass',
        pitch: 'D',
        octave: 3,
        accidental: null,
        fullName: 'D3',
        name: 'D3',
        position: 'Line 3 (Middle line)',
        hint: 'Mnemonic: "Do" in Good Boys Do Fine Always.',
        type: 'natural',
        grade: 1
      },
      {
        id: 'bc-c3',
        clef: 'bass',
        pitch: 'C',
        octave: 3,
        accidental: null,
        fullName: 'C3',
        name: 'C3 (Low C)',
        position: 'Space 2',
        hint: 'Mnemonic: "Cows" in All Cows Eat Grass.',
        type: 'natural',
        grade: 1
      },
      {
        id: 'bc-b2',
        clef: 'bass',
        pitch: 'B',
        octave: 2,
        accidental: null,
        fullName: 'B2',
        name: 'B2',
        position: 'Line 2',
        hint: 'Mnemonic: "Boys" in Good Boys Do Fine Always.',
        type: 'natural',
        grade: 1
      },
      {
        id: 'bc-a2',
        clef: 'bass',
        pitch: 'A',
        octave: 2,
        accidental: null,
        fullName: 'A2',
        name: 'A2',
        position: 'Space 1 (Bottom space)',
        hint: 'Mnemonic: "All" in All Cows Eat Grass.',
        type: 'natural',
        grade: 1
      },
      {
        id: 'bc-g2',
        clef: 'bass',
        pitch: 'G',
        octave: 2,
        accidental: null,
        fullName: 'G2',
        name: 'G2',
        position: 'Line 1 (Bottom line)',
        hint: 'Mnemonic: "Good" in Good Boys Do Fine Always.',
        type: 'natural',
        grade: 1
      },
      {
        id: 'bc-e2',
        clef: 'bass',
        pitch: 'E',
        octave: 2,
        accidental: null,
        fullName: 'E2',
        name: 'E2',
        position: '1st ledger line below the stave',
        hint: 'Low open string on string bass & cello.',
        type: 'ledger',
        grade: 2
      },
      {
        id: 'bc-c2',
        clef: 'bass',
        pitch: 'C',
        octave: 2,
        accidental: null,
        fullName: 'C2',
        name: 'C2 (Deep Bass C)',
        position: '2 ledger lines below the stave',
        hint: 'Two octaves below Middle C.',
        type: 'ledger',
        grade: 3
      },

      // === ALTO CLEF (Grade 4) ===
      {
        id: 'ac-c4',
        clef: 'alto',
        pitch: 'C',
        octave: 4,
        accidental: null,
        fullName: 'C4',
        name: 'Middle C (C4)',
        position: 'Line 3 (Middle line)',
        hint: 'The Alto C-clef center points right at Line 3 = Middle C!',
        type: 'natural',
        grade: 4
      },
      {
        id: 'ac-f3',
        clef: 'alto',
        pitch: 'F',
        octave: 3,
        accidental: null,
        fullName: 'F3',
        name: 'F3',
        position: 'Line 1 (Bottom line)',
        hint: 'The bottom line in the Alto clef.',
        type: 'natural',
        grade: 4
      },
      {
        id: 'ac-g4',
        clef: 'alto',
        pitch: 'G',
        octave: 4,
        accidental: null,
        fullName: 'G4',
        name: 'G4',
        position: 'Line 5 (Top line)',
        hint: 'The top line in the Alto clef.',
        type: 'natural',
        grade: 4
      },
      {
        id: 'ac-a4',
        clef: 'alto',
        pitch: 'A',
        octave: 4,
        accidental: null,
        fullName: 'A4',
        name: 'A4',
        position: 'Space sitting above Line 5',
        hint: 'Common open A string on Viola.',
        type: 'natural',
        grade: 4
      },

      // === TENOR CLEF (Grade 5) ===
      {
        id: 'tc-c4-tenor',
        clef: 'tenor',
        pitch: 'C',
        octave: 4,
        accidental: null,
        fullName: 'C4',
        name: 'Middle C (C4)',
        position: 'Line 4',
        hint: 'The Tenor C-clef center points directly at Line 4 = Middle C!',
        type: 'natural',
        grade: 5
      },
      {
        id: 'tc-d3-tenor',
        clef: 'tenor',
        pitch: 'D',
        octave: 3,
        accidental: null,
        fullName: 'D3',
        name: 'D3',
        position: 'Line 1 (Bottom line)',
        hint: 'The bottom line in the Tenor clef.',
        type: 'natural',
        grade: 5
      },
      {
        id: 'tc-e4-tenor',
        clef: 'tenor',
        pitch: 'E',
        octave: 4,
        accidental: null,
        fullName: 'E4',
        name: 'E4',
        position: 'Line 5 (Top line)',
        hint: 'The top line in the Tenor clef.',
        type: 'natural',
        grade: 5
      }
    ];

    this.init();
  }

  init() {
    this.filterDeck();
    this.bindEvents();
  }

  bindEvents() {
    // Keyboard shortcuts: Space/Enter = flip, Arrows = prev/next, P = play audio
    window.addEventListener('keydown', (e) => {
      // Only trigger if flashcards tab is active and not typing in an input
      const tabEl = document.getElementById('tab-flashcards');
      if (!tabEl || !tabEl.classList.contains('active')) return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        this.flipCard();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        this.nextCard();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        this.prevCard();
      } else if (e.code === 'KeyP') {
        e.preventDefault();
        this.playCurrentCardSound();
      }
    });
  }

  filterDeck() {
    this.deck = this.allCards.filter(card => {
      const matchClef = this.selectedClef === 'all' || card.clef === this.selectedClef;
      const matchDiff = this.selectedDifficulty === 'all' || card.type === this.selectedDifficulty;
      return matchClef && matchDiff;
    });

    this.currentIndex = 0;
    this.isFlipped = false;
    this.renderCurrentCard();
  }

  setClefFilter(clef) {
    this.selectedClef = clef;
    this.filterDeck();
  }

  setDifficultyFilter(diff) {
    this.selectedDifficulty = diff;
    this.filterDeck();
  }

  shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
    this.currentIndex = 0;
    this.isFlipped = false;
    this.renderCurrentCard();
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
    const cardEl = document.getElementById('flashcard-card-element');
    if (cardEl) {
      cardEl.classList.toggle('flipped', this.isFlipped);
    }
    if (this.isFlipped) {
      // Highlight on piano and play audio softly on reveal
      const card = this.deck[this.currentIndex];
      if (card && window.mainPiano) {
        window.mainPiano.setHighlights({
          [card.fullName]: { color: '#b8432f', badge: card.pitch, root: true }
        });
      }
      this.playCurrentCardSound();
    }
  }

  nextCard() {
    if (this.deck.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.deck.length;
    this.isFlipped = false;
    this.renderCurrentCard();
  }

  prevCard() {
    if (this.deck.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.deck.length) % this.deck.length;
    this.isFlipped = false;
    this.renderCurrentCard();
  }

  markKnown() {
    this.knownCount++;
    this.nextCard();
    this.updateStats();
  }

  markReview() {
    this.reviewCount++;
    this.nextCard();
    this.updateStats();
  }

  updateStats() {
    const knownEl = document.getElementById('flashcard-known-count');
    const reviewEl = document.getElementById('flashcard-review-count');
    if (knownEl) knownEl.textContent = this.knownCount;
    if (reviewEl) reviewEl.textContent = this.reviewCount;
  }

  playCurrentCardSound() {
    const card = this.deck[this.currentIndex];
    if (card && window.soundEngine) {
      window.soundEngine.playNote(card.fullName, 0.7);
    }
  }

  renderCurrentCard() {
    const cardEl = document.getElementById('flashcard-card-element');
    const counterEl = document.getElementById('flashcard-counter');
    const clefBadgeEl = document.getElementById('flashcard-clef-badge');

    if (this.deck.length === 0) {
      if (cardEl) {
        cardEl.innerHTML = `
          <div class="flashcard-face flashcard-front" style="display: grid; place-items: center; text-align: center; padding: 2rem;">
            <p style="color: var(--color-muted);">No flashcards match the selected filters. Try choosing "All Clefs" or "All Types".</p>
          </div>
        `;
      }
      return;
    }

    const card = this.deck[this.currentIndex];
    if (counterEl) {
      counterEl.textContent = `${this.currentIndex + 1} of ${this.deck.length}`;
    }

    if (cardEl) {
      cardEl.classList.remove('flipped');

      const clefNameCap = card.clef.charAt(0).toUpperCase() + card.clef.slice(1);

      cardEl.innerHTML = `
        <!-- FRONT: Musical Stave Note -->
        <div class="flashcard-face flashcard-front">
          <div class="flashcard-meta-top">
            <span class="tag" style="background: var(--color-accent-soft); color: var(--color-accent); font-weight: 700;">
              ${clefNameCap} Clef • Grade ${card.grade}
            </span>
            <span style="font-size: var(--text-xs); color: var(--color-muted); letter-spacing: .04em;">
              [Press Space to Flip]
            </span>
          </div>

          <div class="flashcard-stave-wrapper" id="flashcard-stave-container">
            <!-- Render SVG Stave for this card -->
          </div>

          <div class="flashcard-footer-prompt">
            <button class="btn outline small" onclick="event.stopPropagation(); window.flashcardsEngine.playCurrentCardSound();" title="Press P to hear sound">
              🔊 Hear Pitch
            </button>
            <span style="font-size: var(--text-xs); color: var(--color-muted);">
              What is this note? Tap card to reveal ➔
            </span>
          </div>
        </div>

        <!-- BACK: Note Name, Position & Piano Reference -->
        <div class="flashcard-face flashcard-back">
          <div class="flashcard-meta-top">
            <span class="tag" style="background: var(--color-answer-soft); color: var(--color-answer); font-weight: 700;">
              Answer Revealed
            </span>
            <span style="font-size: var(--text-xs); color: var(--color-muted);">
              ${clefNameCap} Clef
            </span>
          </div>

          <div class="flashcard-back-body">
            <h2 class="flashcard-note-name">${card.name}</h2>
            <p class="flashcard-position-text">
              <strong>Stave Position:</strong> ${card.position}
            </p>
            <p class="flashcard-hint-text">
              💡 <em>${card.hint}</em>
            </p>
          </div>

          <div class="flashcard-footer-prompt">
            <button class="btn outline small" onclick="event.stopPropagation(); window.flashcardsEngine.playCurrentCardSound();">
              🔊 Replay Note
            </button>
            <span style="font-size: var(--text-xs); color: var(--color-muted);">
              Shown highlighted on virtual piano below
            </span>
          </div>
        </div>
      `;

      // Render the SVG note on the front stave container
      this.renderStaveForCard(card, 'flashcard-stave-container');
    }
  }

  renderStaveForCard(card, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const width = 500;
    const height = 185;
    const startX = 46;
    const endX = width - 24;
    const lineSpacing = 11;

    // Treble stave lines (Top)
    const trebleTopY = 22; // Lines at Y = 22, 33, 44, 55, 66 (Line 5 to Line 1)
    const trebleBottomLineY = trebleTopY + 4 * lineSpacing; // 66 (Line 1 = E4)

    // Bass stave lines (Bottom)
    const bassTopY = 104; // Lines at Y = 104, 115, 126, 137, 148 (Line 5 to Line 1)
    const bassBottomLineY = bassTopY + 4 * lineSpacing; // 148 (Line 1 = G2)

    // Middle C line
    const middleCY = 85;

    let svg = `<svg viewBox="0 0 ${width} ${height}" class="flashcard-stave-svg grand-staff-card" xmlns="http://www.w3.org/2000/svg">`;

    // 1. Classical Grand Staff Curly Brace {
    svg += `
      <path d="M 40 20 C 31 20, 27 38, 27 65 C 27 78, 20 85, 14 85 C 20 85, 27 92, 27 105 C 27 132, 31 150, 40 150 C 35 150, 30 132, 30 105 C 30 90, 23 87, 18 85 C 23 83, 30 80, 30 65 C 30 38, 35 20, 40 20 Z" fill="var(--color-ink)" />
    `;

    // 2. Left and Right Connecting Barlines
    svg += `<line x1="${startX}" y1="${trebleTopY}" x2="${startX}" y2="${bassBottomLineY}" stroke="var(--color-ink)" stroke-width="2" />`;
    svg += `<line x1="${endX}" y1="${trebleTopY}" x2="${endX}" y2="${bassBottomLineY}" stroke="var(--color-ink)" stroke-width="1.2" />`;

    // 3. Treble Stave 5 Lines
    for (let i = 0; i < 5; i++) {
      const y = trebleTopY + i * lineSpacing;
      svg += `<line x1="${startX}" y1="${y}" x2="${endX}" y2="${y}" stroke="var(--color-ink)" stroke-width="1.2" />`;
    }

    // 4. Bass Stave 5 Lines
    for (let i = 0; i < 5; i++) {
      const y = bassTopY + i * lineSpacing;
      svg += `<line x1="${startX}" y1="${y}" x2="${endX}" y2="${y}" stroke="var(--color-ink)" stroke-width="1.2" />`;
    }

    // 5. Clef Glyphs on Grand Staff
    const isTrebleCard = card.clef === 'treble';
    const isBassCard = card.clef === 'bass';
    const isAltoCard = card.clef === 'alto';
    const isTenorCard = card.clef === 'tenor';

    // Highlight active clef in accent color
    const trebleColor = isTrebleCard ? 'var(--color-accent)' : 'var(--color-ink)';
    const bassColor = isBassCard ? 'var(--color-accent)' : 'var(--color-ink)';

    svg += `<text x="${startX + 8}" y="${trebleTopY + 38}" font-family="'Century Gothic', sans-serif" font-size="50" fill="${trebleColor}" user-select="none">𝄞</text>`;
    svg += `<text x="${startX + 8}" y="${bassTopY + 33}" font-family="'Century Gothic', sans-serif" font-size="38" fill="${bassColor}" user-select="none">𝄢</text>`;

    // If Alto or Tenor Clef card, display the C-clef indicator prominently
    if (isAltoCard || isTenorCard) {
      const cClefY = isAltoCard ? middleCY + 14 : middleCY + 22;
      svg += `<text x="${startX + 50}" y="${cClefY}" font-family="'Century Gothic', sans-serif" font-size="36" fill="var(--color-accent)">𝄡</text>`;
      svg += `<text x="${startX + 75}" y="${middleCY + 4}" font-size="10" fill="var(--color-accent)" font-weight="700">${isAltoCard ? 'Alto Clef (Line 3 = Middle C)' : 'Tenor Clef (Line 4 = Middle C)'}</text>`;
    }

    // 6. Calculate Note Position on Grand Staff
    const letters = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const p = card.pitch.charAt(0).toUpperCase();
    const letterIdx = letters.indexOf(p);
    const step = (card.octave - 4) * 7 + letterIdx; // Step 0 = C4

    const noteX = width / 2 + 35;
    let noteY = middleCY;
    let isStemUp = true;
    let ledgerLines = '';

    const halfStep = lineSpacing / 2; // 5.5px

    if (isBassCard || (!isTrebleCard && step < 0)) {
      // Position on Bass stave
      if (step === 0) {
        // Middle C in bass clef (1 ledger line above bass stave)
        noteY = middleCY;
        isStemUp = true;
        ledgerLines += `<line x1="${noteX - 15}" y1="${middleCY}" x2="${noteX + 15}" y2="${middleCY}" stroke="var(--color-ink)" stroke-width="1.8" />`;
      } else {
        // A3 is step -2 (Top line of bass = bassTopY)
        // G2 is step -10 (Bottom line of bass = bassBottomLineY)
        const stepsFromBottom = step - (-10);
        noteY = bassBottomLineY - (stepsFromBottom * halfStep);
        isStemUp = step < -6;

        // Ledger lines below bass line 1 (step -10)
        if (step < -10) {
          for (let s = -12; s >= step; s -= 2) {
            const ly = bassBottomLineY - ((s - (-10)) * halfStep);
            ledgerLines += `<line x1="${noteX - 14}" y1="${ly}" x2="${noteX + 14}" y2="${ly}" stroke="var(--color-ink)" stroke-width="1.5" />`;
          }
        }
      }
    } else {
      // Position on Treble stave
      if (step === 0) {
        // Middle C in treble clef (1 ledger line below treble stave)
        noteY = middleCY;
        isStemUp = true;
        ledgerLines += `<line x1="${noteX - 15}" y1="${middleCY}" x2="${noteX + 15}" y2="${middleCY}" stroke="var(--color-ink)" stroke-width="1.8" />`;
      } else {
        // E4 is step 2 (Bottom line of treble = trebleBottomLineY)
        // F5 is step 10 (Top line of treble = trebleTopY)
        const stepsFromBottom = step - 2;
        noteY = trebleBottomLineY - (stepsFromBottom * halfStep);
        isStemUp = step < 6;

        // Ledger lines above treble line 5 (step 10)
        if (step > 10) {
          for (let s = 12; s <= step; s += 2) {
            const ly = trebleBottomLineY - ((s - 2) * halfStep);
            ledgerLines += `<line x1="${noteX - 14}" y1="${ly}" x2="${noteX + 14}" y2="${ly}" stroke="var(--color-ink)" stroke-width="1.5" />`;
          }
        }
      }
    }

    // Render ledger lines
    svg += ledgerLines;

    // Accidental (sharp / flat)
    if (card.accidental) {
      const sym = card.accidental === '#' ? '♯' : '♭';
      svg += `<text x="${noteX - 18}" y="${noteY + 5}" font-size="20" fill="var(--color-accent)" text-anchor="middle" font-weight="bold">${sym}</text>`;
    }

    // Notehead and stem
    svg += `
      <g>
        <ellipse cx="${noteX}" cy="${noteY}" rx="8" ry="5.5" transform="rotate(-20 ${noteX} ${noteY})" fill="var(--color-ink)" />
        <line x1="${isStemUp ? noteX + 7.5 : noteX - 7.5}" y1="${noteY}" x2="${isStemUp ? noteX + 7.5 : noteX - 7.5}" y2="${isStemUp ? noteY - 34 : noteY + 34}" stroke="var(--color-ink)" stroke-width="2" />
      </g>
    `;

    svg += '</svg>';
    container.innerHTML = svg;
  }
}

window.NoteFlashcardsEngine = NoteFlashcardsEngine;
