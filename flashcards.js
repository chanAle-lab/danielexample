/**
 * MusicTheory101 - Comprehensive ABRSM Grade 1 Syllabus Flashcards
 * Covers all 5 sections of the official Grade 1 syllabus checklist:
 * 1. Note Values, Rests, Tied & Single-Dotted Notes
 * 2. Simple Time Signatures (2/4, 3/4, 4/4), Bar-lines & Grouping
 * 3. The Stave, Clefs (Treble & Bass), Middle C, Accidentals (♯, ♭, ♮)
 * 4. Major Scales, Key Signatures & Tonic Triads (C, G, D, F Major)
 * 5. Frequently Used Italian Terms, Dynamics, Tempo & Articulation Signs
 */

class NoteFlashcardsEngine {
  constructor() {
    this.deck = [];
    this.currentIndex = 0;
    this.isFlipped = false;
    this.selectedCategory = 'all'; // 'all', 'notes', 'values', 'time', 'scales', 'terms'
    this.knownCount = 0;
    this.reviewCount = 0;

    this.allCards = [
      // =========================================================================
      // CHECKLIST 1: NOTE VALUES, RESTS, TIED & SINGLE-DOTTED NOTES
      // =========================================================================
      {
        id: 'val-semibreve',
        category: 'values',
        tag: 'Grade 1 • Note Values',
        type: 'rhythm',
        symbolType: 'note',
        name: 'Semibreve (Whole Note)',
        beats: '4 Crotchet Beats',
        description: 'An open oval notehead with no stem. It is the longest standard note value in Grade 1.',
        hint: 'In 4/4 time, one semibreve fills an entire measure.',
        audioNote: 'C4',
        duration: 2.0,
        renderFront: (w, h) => `
          <svg viewBox="0 0 ${w} ${h}" class="flashcard-symbol-svg">
            <ellipse cx="${w / 2}" cy="${h / 2}" rx="22" ry="15" transform="rotate(-20 ${w / 2} ${h / 2})" fill="none" stroke="var(--color-ink)" stroke-width="4.5" />
          </svg>
        `
      },
      {
        id: 'val-semibreve-rest',
        category: 'values',
        tag: 'Grade 1 • Rests',
        type: 'rhythm',
        symbolType: 'rest',
        name: 'Semibreve Rest (Whole Measure Rest)',
        beats: '4 Beats (or 1 full bar in any simple time)',
        description: 'A solid rectangular block that hangs DOWN from the 4th line of the stave.',
        hint: 'Memory hook: "Semibreve hangs from the ceiling (line 4)."',
        audioNote: null,
        renderFront: (w, h) => `
          <svg viewBox="0 0 ${w} ${h}" class="flashcard-symbol-svg">
            <line x1="${w / 2 - 60}" y1="${h / 2 - 10}" x2="${w / 2 + 60}" y2="${h / 2 - 10}" stroke="var(--color-ink)" stroke-width="2" />
            <rect x="${w / 2 - 18}" y="${h / 2 - 10}" width="36" height="14" fill="var(--color-ink)" />
          </svg>
        `
      },
      {
        id: 'val-minim',
        category: 'values',
        tag: 'Grade 1 • Note Values',
        type: 'rhythm',
        symbolType: 'note',
        name: 'Minim (Half Note)',
        beats: '2 Crotchet Beats',
        description: 'An open oval notehead with a vertical stem. Worth exactly half of a semibreve.',
        hint: 'Two minims equal one semibreve (2 + 2 = 4 beats).',
        audioNote: 'C4',
        duration: 1.0,
        renderFront: (w, h) => `
          <svg viewBox="0 0 ${w} ${h}" class="flashcard-symbol-svg">
            <ellipse cx="${w / 2 - 8}" cy="${h / 2 + 15}" rx="18" ry="12" transform="rotate(-20 ${w / 2 - 8} ${h / 2 + 15})" fill="none" stroke="var(--color-ink)" stroke-width="4" />
            <line x1="${w / 2 + 8}" y1="${h / 2 + 15}" x2="${w / 2 + 8}" y2="${h / 2 - 40}" stroke="var(--color-ink)" stroke-width="3" />
          </svg>
        `
      },
      {
        id: 'val-minim-rest',
        category: 'values',
        tag: 'Grade 1 • Rests',
        type: 'rhythm',
        symbolType: 'rest',
        name: 'Minim Rest (Half Rest)',
        beats: '2 Crotchet Beats of Silence',
        description: 'A solid rectangular block that sits ON TOP of the 3rd line of the stave.',
        hint: 'Memory hook: "Minim sits like a man on a bench (line 3)."',
        audioNote: null,
        renderFront: (w, h) => `
          <svg viewBox="0 0 ${w} ${h}" class="flashcard-symbol-svg">
            <line x1="${w / 2 - 60}" y1="${h / 2 + 10}" x2="${w / 2 + 60}" y2="${h / 2 + 10}" stroke="var(--color-ink)" stroke-width="2" />
            <rect x="${w / 2 - 18}" y="${h / 2 - 4}" width="36" height="14" fill="var(--color-ink)" />
          </svg>
        `
      },
      {
        id: 'val-crotchet',
        category: 'values',
        tag: 'Grade 1 • Note Values',
        type: 'rhythm',
        symbolType: 'note',
        name: 'Crotchet (Quarter Note)',
        beats: '1 Beat (The standard pulse in 2/4, 3/4, 4/4)',
        description: 'A solid black oval notehead with a vertical stem.',
        hint: 'Four crotchets make up a whole measure of 4/4 time.',
        audioNote: 'C4',
        duration: 0.5,
        renderFront: (w, h) => `
          <svg viewBox="0 0 ${w} ${h}" class="flashcard-symbol-svg">
            <ellipse cx="${w / 2 - 8}" cy="${h / 2 + 15}" rx="18" ry="12" transform="rotate(-20 ${w / 2 - 8} ${h / 2 + 15})" fill="var(--color-ink)" />
            <line x1="${w / 2 + 8}" y1="${h / 2 + 15}" x2="${w / 2 + 8}" y2="${h / 2 - 40}" stroke="var(--color-ink)" stroke-width="3" />
          </svg>
        `
      },
      {
        id: 'val-crotchet-rest',
        category: 'values',
        tag: 'Grade 1 • Rests',
        type: 'rhythm',
        symbolType: 'rest',
        name: 'Crotchet Rest (Quarter Rest)',
        beats: '1 Beat of Silence',
        description: 'A distinctive zigzag squiggly rest symbol worth 1 beat.',
        hint: 'Silence for one crotchet beat.',
        audioNote: null,
        renderFront: (w, h) => `
          <svg viewBox="0 0 ${w} ${h}" class="flashcard-symbol-svg">
            <text x="${w / 2}" y="${h / 2 + 25}" font-family="'Century Gothic', serif" font-size="70" text-anchor="middle" fill="var(--color-ink)">𝄽</text>
          </svg>
        `
      },
      {
        id: 'val-quaver',
        category: 'values',
        tag: 'Grade 1 • Note Values',
        type: 'rhythm',
        symbolType: 'note',
        name: 'Quaver (Eighth Note)',
        beats: '1/2 Beat (Two quavers equal 1 crotchet)',
        description: 'A solid black notehead, stem, and 1 curved flag (or beamed in groups).',
        hint: 'Two quavers beamed together equal one crotchet pulse: 1 & 2 &.',
        audioNote: 'C4',
        duration: 0.25,
        renderFront: (w, h) => `
          <svg viewBox="0 0 ${w} ${h}" class="flashcard-symbol-svg">
            <ellipse cx="${w / 2 - 12}" cy="${h / 2 + 15}" rx="16" ry="11" transform="rotate(-20 ${w / 2 - 12} ${h / 2 + 15})" fill="var(--color-ink)" />
            <line x1="${w / 2 + 2}" y1="${h / 2 + 15}" x2="${w / 2 + 2}" y2="${h / 2 - 38}" stroke="var(--color-ink)" stroke-width="3" />
            <path d="M ${w / 2 + 2} ${h / 2 - 38} C ${w / 2 + 18} ${h / 2 - 30}, ${w / 2 + 24} ${h / 2 - 10}, ${w / 2 + 12} ${h / 2}" fill="none" stroke="var(--color-ink)" stroke-width="3" stroke-linecap="round" />
          </svg>
        `
      },
      {
        id: 'val-quaver-rest',
        category: 'values',
        tag: 'Grade 1 • Rests',
        type: 'rhythm',
        symbolType: 'rest',
        name: 'Quaver Rest (Eighth Rest)',
        beats: '1/2 Beat of Silence',
        description: 'A rest symbol featuring a single hook on the left.',
        hint: 'Silence for half a crotchet beat.',
        audioNote: null,
        renderFront: (w, h) => `
          <svg viewBox="0 0 ${w} ${h}" class="flashcard-symbol-svg">
            <text x="${w / 2}" y="${h / 2 + 20}" font-family="'Century Gothic', serif" font-size="64" text-anchor="middle" fill="var(--color-ink)">𝄾</text>
          </svg>
        `
      },
      {
        id: 'val-semiquaver',
        category: 'values',
        tag: 'Grade 1 • Note Values',
        type: 'rhythm',
        symbolType: 'note',
        name: 'Semiquaver (Sixteenth Note)',
        beats: '1/4 Beat (Four semiquavers equal 1 crotchet)',
        description: 'A solid black notehead with a stem and TWO flags (or two beams).',
        hint: 'Count: 1-e-&-a, 2-e-&-a. Four semiquavers fit into one crotchet beat.',
        audioNote: 'C4',
        duration: 0.15,
        renderFront: (w, h) => `
          <svg viewBox="0 0 ${w} ${h}" class="flashcard-symbol-svg">
            <ellipse cx="${w / 2 - 12}" cy="${h / 2 + 20}" rx="16" ry="11" transform="rotate(-20 ${w / 2 - 12} ${h / 2 + 20})" fill="var(--color-ink)" />
            <line x1="${w / 2 + 2}" y1="${h / 2 + 20}" x2="${w / 2 + 2}" y2="${h / 2 - 38}" stroke="var(--color-ink)" stroke-width="3" />
            <path d="M ${w / 2 + 2} ${h / 2 - 38} C ${w / 2 + 18} ${h / 2 - 30}, ${w / 2 + 22} ${h / 2 - 16}, ${w / 2 + 12} ${h / 2 - 10}" fill="none" stroke="var(--color-ink)" stroke-width="3" />
            <path d="M ${w / 2 + 2} ${h / 2 - 24} C ${w / 2 + 18} ${h / 2 - 16}, ${w / 2 + 22} ${h / 2 - 2}, ${w / 2 + 12} ${h / 2 + 4}" fill="none" stroke="var(--color-ink)" stroke-width="3" />
          </svg>
        `
      },
      {
        id: 'val-dotted-minim',
        category: 'values',
        tag: 'Grade 1 • Dotted Notes',
        type: 'rhythm',
        symbolType: 'note',
        name: 'Dotted Minim (Dotted Half Note)',
        beats: '3 Crotchet Beats (2 + 1 = 3)',
        description: 'A dot placed after any note adds HALF of that note’s original value.',
        hint: 'A minim = 2 beats. The dot = 1 beat (half of 2). Total = 3 beats. Fills a 3/4 bar!',
        audioNote: 'C4',
        duration: 1.5,
        renderFront: (w, h) => `
          <svg viewBox="0 0 ${w} ${h}" class="flashcard-symbol-svg">
            <ellipse cx="${w / 2 - 18}" cy="${h / 2 + 15}" rx="18" ry="12" transform="rotate(-20 ${w / 2 - 18} ${h / 2 + 15})" fill="none" stroke="var(--color-ink)" stroke-width="4" />
            <line x1="${w / 2 - 2}" y1="${h / 2 + 15}" x2="${w / 2 - 2}" y2="${h / 2 - 40}" stroke="var(--color-ink)" stroke-width="3" />
            <circle cx="${w / 2 + 18}" cy="${h / 2 + 15}" r="5" fill="var(--color-accent)" />
          </svg>
        `
      },
      {
        id: 'val-dotted-crotchet',
        category: 'values',
        tag: 'Grade 1 • Dotted Notes',
        type: 'rhythm',
        symbolType: 'note',
        name: 'Dotted Crotchet (Dotted Quarter Note)',
        beats: '1.5 Beats (Equal to 3 Quavers)',
        description: 'A crotchet (1 beat) + dot (0.5 beat). Commonly followed by a single quaver.',
        hint: '1 crotchet + 1 quaver = 3 quavers total duration.',
        audioNote: 'C4',
        duration: 0.75,
        renderFront: (w, h) => `
          <svg viewBox="0 0 ${w} ${h}" class="flashcard-symbol-svg">
            <ellipse cx="${w / 2 - 18}" cy="${h / 2 + 15}" rx="18" ry="12" transform="rotate(-20 ${w / 2 - 18} ${h / 2 + 15})" fill="var(--color-ink)" />
            <line x1="${w / 2 - 2}" y1="${h / 2 + 15}" x2="${w / 2 - 2}" y2="${h / 2 - 40}" stroke="var(--color-ink)" stroke-width="3" />
            <circle cx="${w / 2 + 18}" cy="${h / 2 + 15}" r="5" fill="var(--color-accent)" />
          </svg>
        `
      },
      {
        id: 'val-tied-notes',
        category: 'values',
        tag: 'Grade 1 • Tied Notes',
        type: 'rhythm',
        symbolType: 'tie',
        name: 'The Tie (Tied Notes)',
        beats: 'Combined duration of both notes held together',
        description: 'A curved line connecting two notes of the SAME pitch. The second note is NOT struck again; its value is added to the first.',
        hint: 'Do not confuse with a slur (which connects notes of DIFFERENT pitches).',
        audioNote: 'C4',
        duration: 1.5,
        renderFront: (w, h) => `
          <svg viewBox="0 0 ${w} ${h}" class="flashcard-symbol-svg">
            <!-- Note 1 -->
            <ellipse cx="${w / 2 - 45}" cy="${h / 2}" rx="14" ry="10" transform="rotate(-20 ${w / 2 - 45} ${h / 2})" fill="var(--color-ink)" />
            <line x1="${w / 2 - 33}" y1="${h / 2}" x2="${w / 2 - 33}" y2="${h / 2 - 35}" stroke="var(--color-ink)" stroke-width="2.5" />
            <!-- Note 2 -->
            <ellipse cx="${w / 2 + 45}" cy="${h / 2}" rx="14" ry="10" transform="rotate(-20 ${w / 2 + 45} ${h / 2})" fill="var(--color-ink)" />
            <line x1="${w / 2 + 57}" y1="${h / 2}" x2="${w / 2 + 57}" y2="${h / 2 - 35}" stroke="var(--color-ink)" stroke-width="2.5" />
            <!-- Tie arc underneath -->
            <path d="M ${w / 2 - 40} ${h / 2 + 14} Q ${w / 2} ${h / 2 + 34} ${w / 2 + 40} ${h / 2 + 14}" fill="none" stroke="var(--color-accent)" stroke-width="3.5" stroke-linecap="round" />
          </svg>
        `
      },

      // =========================================================================
      // CHECKLIST 2: SIMPLE TIME SIGNATURES & GROUPING (2/4, 3/4, 4/4, C)
      // =========================================================================
      {
        id: 'time-24',
        category: 'time',
        tag: 'Grade 1 • Time Signatures',
        type: 'time',
        name: '2/4 Time Signature (Simple Duple)',
        beats: '2 Crotchet (Quarter Note) Beats in a bar',
        description: 'Top number 2 = two beats per bar. Bottom number 4 = crotchet beat unit.',
        hint: 'Count: 1, 2 | 1, 2. Used in marches and duple dance rhythms.',
        renderFront: (w, h) => `
          <svg viewBox="0 0 ${w} ${h}" class="flashcard-symbol-svg">
            <text x="${w / 2}" y="${h / 2 - 5}" font-family="'Century Gothic', sans-serif" font-size="64" font-weight="bold" text-anchor="middle" fill="var(--color-ink)">2</text>
            <text x="${w / 2}" y="${h / 2 + 55}" font-family="'Century Gothic', sans-serif" font-size="64" font-weight="bold" text-anchor="middle" fill="var(--color-ink)">4</text>
          </svg>
        `
      },
      {
        id: 'time-34',
        category: 'time',
        tag: 'Grade 1 • Time Signatures',
        type: 'time',
        name: '3/4 Time Signature (Simple Triple)',
        beats: '3 Crotchet (Quarter Note) Beats in a bar',
        description: 'Top number 3 = three beats per bar. Bottom number 4 = crotchet beat unit.',
        hint: 'Count: 1, 2, 3 | 1, 2, 3. The universal signature for waltzes and minuets.',
        renderFront: (w, h) => `
          <svg viewBox="0 0 ${w} ${h}" class="flashcard-symbol-svg">
            <text x="${w / 2}" y="${h / 2 - 5}" font-family="'Century Gothic', sans-serif" font-size="64" font-weight="bold" text-anchor="middle" fill="var(--color-ink)">3</text>
            <text x="${w / 2}" y="${h / 2 + 55}" font-family="'Century Gothic', sans-serif" font-size="64" font-weight="bold" text-anchor="middle" fill="var(--color-ink)">4</text>
          </svg>
        `
      },
      {
        id: 'time-44',
        category: 'time',
        tag: 'Grade 1 • Time Signatures',
        type: 'time',
        name: '4/4 Time Signature (Simple Quadruple)',
        beats: '4 Crotchet (Quarter Note) Beats in a bar',
        description: 'Top number 4 = four beats per bar. Bottom number 4 = crotchet beat unit.',
        hint: 'The most common time signature in Western music. Also symbolized by "C".',
        renderFront: (w, h) => `
          <svg viewBox="0 0 ${w} ${h}" class="flashcard-symbol-svg">
            <text x="${w / 2}" y="${h / 2 - 5}" font-family="'Century Gothic', sans-serif" font-size="64" font-weight="bold" text-anchor="middle" fill="var(--color-ink)">4</text>
            <text x="${w / 2}" y="${h / 2 + 55}" font-family="'Century Gothic', sans-serif" font-size="64" font-weight="bold" text-anchor="middle" fill="var(--color-ink)">4</text>
          </svg>
        `
      },
      {
        id: 'time-common-c',
        category: 'time',
        tag: 'Grade 1 • Time Signatures',
        type: 'time',
        name: 'Common Time Symbol (C)',
        beats: 'Equivalent to 4/4 Time (4 crotchet beats per bar)',
        description: 'A large capital "C" printed at the start of the stave. Represents "Common Time".',
        hint: 'Historical origin: derived from a broken circle indicating imperfect (duple) meter.',
        renderFront: (w, h) => `
          <svg viewBox="0 0 ${w} ${h}" class="flashcard-symbol-svg">
            <text x="${w / 2}" y="${h / 2 + 25}" font-family="'Century Gothic', sans-serif" font-size="80" font-weight="bold" text-anchor="middle" fill="var(--color-accent)">C</text>
          </svg>
        `
      },

      // =========================================================================
      // =========================================================================
      // CHECKLIST 3: THE STAVE, CLEFS & NOTES (GRAND STAFF) & ACCIDENTALS
      // Note: In Grade 1 flashcards, answer strictly displays only the note name.
      // =========================================================================
      {
        id: 'stave-middle-c',
        category: 'notes',
        tag: 'Grade 1 • Grand Staff Notes',
        type: 'note-grand',
        clef: 'treble',
        pitch: 'C',
        octave: 4,
        accidental: null,
        name: 'Middle C',
        audioNote: 'C4'
      },
      {
        id: 'stave-treble-d4',
        category: 'notes',
        tag: 'Grade 1 • Grand Staff Notes',
        type: 'note-grand',
        clef: 'treble',
        pitch: 'D',
        octave: 4,
        accidental: null,
        name: 'D',
        audioNote: 'D4'
      },
      {
        id: 'stave-treble-e4',
        category: 'notes',
        tag: 'Grade 1 • Grand Staff Notes',
        type: 'note-grand',
        clef: 'treble',
        pitch: 'E',
        octave: 4,
        accidental: null,
        name: 'E',
        audioNote: 'E4'
      },
      {
        id: 'stave-treble-f4',
        category: 'notes',
        tag: 'Grade 1 • Grand Staff Notes',
        type: 'note-grand',
        clef: 'treble',
        pitch: 'F',
        octave: 4,
        accidental: null,
        name: 'F',
        audioNote: 'F4'
      },
      {
        id: 'stave-treble-g4',
        category: 'notes',
        tag: 'Grade 1 • Grand Staff Notes',
        type: 'note-grand',
        clef: 'treble',
        pitch: 'G',
        octave: 4,
        accidental: null,
        name: 'G',
        audioNote: 'G4'
      },
      {
        id: 'stave-treble-a4',
        category: 'notes',
        tag: 'Grade 1 • Grand Staff Notes',
        type: 'note-grand',
        clef: 'treble',
        pitch: 'A',
        octave: 4,
        accidental: null,
        name: 'A',
        audioNote: 'A4'
      },
      {
        id: 'stave-treble-b4',
        category: 'notes',
        tag: 'Grade 1 • Grand Staff Notes',
        type: 'note-grand',
        clef: 'treble',
        pitch: 'B',
        octave: 4,
        accidental: null,
        name: 'B',
        audioNote: 'B4'
      },
      {
        id: 'stave-treble-c5',
        category: 'notes',
        tag: 'Grade 1 • Grand Staff Notes',
        type: 'note-grand',
        clef: 'treble',
        pitch: 'C',
        octave: 5,
        accidental: null,
        name: 'C',
        audioNote: 'C5'
      },
      {
        id: 'stave-treble-d5',
        category: 'notes',
        tag: 'Grade 1 • Grand Staff Notes',
        type: 'note-grand',
        clef: 'treble',
        pitch: 'D',
        octave: 5,
        accidental: null,
        name: 'D',
        audioNote: 'D5'
      },
      {
        id: 'stave-treble-e5',
        category: 'notes',
        tag: 'Grade 1 • Grand Staff Notes',
        type: 'note-grand',
        clef: 'treble',
        pitch: 'E',
        octave: 5,
        accidental: null,
        name: 'E',
        audioNote: 'E5'
      },
      {
        id: 'stave-treble-f5',
        category: 'notes',
        tag: 'Grade 1 • Grand Staff Notes',
        type: 'note-grand',
        clef: 'treble',
        pitch: 'F',
        octave: 5,
        accidental: null,
        name: 'F',
        audioNote: 'F5'
      },
      {
        id: 'stave-treble-g5',
        category: 'notes',
        tag: 'Grade 1 • Grand Staff Notes',
        type: 'note-grand',
        clef: 'treble',
        pitch: 'G',
        octave: 5,
        accidental: null,
        name: 'G',
        audioNote: 'G5'
      },
      {
        id: 'stave-bass-f2',
        category: 'notes',
        tag: 'Grade 1 • Grand Staff Notes',
        type: 'note-grand',
        clef: 'bass',
        pitch: 'F',
        octave: 2,
        accidental: null,
        name: 'F',
        audioNote: 'F2'
      },
      {
        id: 'stave-bass-g2',
        category: 'notes',
        tag: 'Grade 1 • Grand Staff Notes',
        type: 'note-grand',
        clef: 'bass',
        pitch: 'G',
        octave: 2,
        accidental: null,
        name: 'G',
        audioNote: 'G2'
      },
      {
        id: 'stave-bass-a2',
        category: 'notes',
        tag: 'Grade 1 • Grand Staff Notes',
        type: 'note-grand',
        clef: 'bass',
        pitch: 'A',
        octave: 2,
        accidental: null,
        name: 'A',
        audioNote: 'A2'
      },
      {
        id: 'stave-bass-b2',
        category: 'notes',
        tag: 'Grade 1 • Grand Staff Notes',
        type: 'note-grand',
        clef: 'bass',
        pitch: 'B',
        octave: 2,
        accidental: null,
        name: 'B',
        audioNote: 'B2'
      },
      {
        id: 'stave-bass-c3',
        category: 'notes',
        tag: 'Grade 1 • Grand Staff Notes',
        type: 'note-grand',
        clef: 'bass',
        pitch: 'C',
        octave: 3,
        accidental: null,
        name: 'C',
        audioNote: 'C3'
      },
      {
        id: 'stave-bass-d3',
        category: 'notes',
        tag: 'Grade 1 • Grand Staff Notes',
        type: 'note-grand',
        clef: 'bass',
        pitch: 'D',
        octave: 3,
        accidental: null,
        name: 'D',
        audioNote: 'D3'
      },
      {
        id: 'stave-bass-e3',
        category: 'notes',
        tag: 'Grade 1 • Grand Staff Notes',
        type: 'note-grand',
        clef: 'bass',
        pitch: 'E',
        octave: 3,
        accidental: null,
        name: 'E',
        audioNote: 'E3'
      },
      {
        id: 'stave-bass-f3',
        category: 'notes',
        tag: 'Grade 1 • Grand Staff Notes',
        type: 'note-grand',
        clef: 'bass',
        pitch: 'F',
        octave: 3,
        accidental: null,
        name: 'F',
        audioNote: 'F3'
      },
      {
        id: 'stave-bass-g3',
        category: 'notes',
        tag: 'Grade 1 • Grand Staff Notes',
        type: 'note-grand',
        clef: 'bass',
        pitch: 'G',
        octave: 3,
        accidental: null,
        name: 'G',
        audioNote: 'G3'
      },
      {
        id: 'stave-bass-a3',
        category: 'notes',
        tag: 'Grade 1 • Grand Staff Notes',
        type: 'note-grand',
        clef: 'bass',
        pitch: 'A',
        octave: 3,
        accidental: null,
        name: 'A',
        audioNote: 'A3'
      },
      {
        id: 'stave-bass-b3',
        category: 'notes',
        tag: 'Grade 1 • Grand Staff Notes',
        type: 'note-grand',
        clef: 'bass',
        pitch: 'B',
        octave: 3,
        accidental: null,
        name: 'B',
        audioNote: 'B3'
      },
      {
        id: 'stave-sharp-sign',
        category: 'notes',
        tag: 'Grade 1 • Accidentals',
        type: 'symbol',
        name: 'Sharp (♯)',
        audioNote: 'C#4',
        renderFront: (w, h) => `
          <svg viewBox="0 0 ${w} ${h}" class="flashcard-symbol-svg">
            <text x="${w / 2}" y="${h / 2 + 25}" font-size="80" font-weight="bold" text-anchor="middle" fill="var(--color-accent)">♯</text>
          </svg>
        `
      },
      {
        id: 'stave-flat-sign',
        category: 'notes',
        tag: 'Grade 1 • Accidentals',
        type: 'symbol',
        name: 'Flat (♭)',
        audioNote: 'Bb4',
        renderFront: (w, h) => `
          <svg viewBox="0 0 ${w} ${h}" class="flashcard-symbol-svg">
            <text x="${w / 2}" y="${h / 2 + 25}" font-size="80" font-weight="bold" text-anchor="middle" fill="var(--color-accent)">♭</text>
          </svg>
        `
      },
      {
        id: 'stave-natural-sign',
        category: 'notes',
        tag: 'Grade 1 • Accidentals',
        type: 'symbol',
        name: 'Natural (♮)',
        audioNote: 'C4',
        renderFront: (w, h) => `
          <svg viewBox="0 0 ${w} ${h}" class="flashcard-symbol-svg">
            <text x="${w / 2}" y="${h / 2 + 25}" font-size="80" font-weight="bold" text-anchor="middle" fill="var(--color-ink)">♮</text>
          </svg>
        `
      },

      // =========================================================================
      // CHECKLIST 4: MAJOR SCALES, KEY SIGNATURES & TONIC TRIADS (C, G, D, F)
      // =========================================================================
      {
        id: 'scale-major-formula',
        category: 'scales',
        tag: 'Grade 1 • Major Scales',
        type: 'concept',
        name: 'Major Scale Step Formula',
        beats: 'Tone - Tone - Semitone - Tone - Tone - Tone - Semitone',
        description: 'T - T - S - T - T - T - S (or W - W - H - W - W - W - H). The semitones always occur between degrees 3-4 and 7-8.',
        hint: 'Learn this pattern: Two tones, one semitone, three tones, one semitone.',
        renderFront: (w, h) => `
          <div style="text-align: center; padding: 2rem;">
            <span style="font-size: var(--text-xs); color: var(--color-muted); text-transform: uppercase;">Universal Rule</span>
            <h3 style="font-family: var(--font-display); font-size: clamp(1.4rem, 2vw, 2rem); margin-block: 0.5rem; color: var(--color-accent);">
              T - T - S - T - T - T - S
            </h3>
            <p style="font-size: var(--text-sm); color: var(--color-muted);">What scale does this pattern construct?</p>
          </div>
        `
      },
      {
        id: 'scale-c-major',
        category: 'scales',
        tag: 'Grade 1 • Major Scales',
        type: 'concept',
        name: 'C Major Scale & Key Signature',
        beats: 'Zero Sharps, Zero Flats (Purely Natural Notes)',
        description: 'Scale: C - D - E - F - G - A - B - C. Tonic Triad: C - E - G (Root, 3rd, 5th).',
        hint: 'The only major scale played entirely on white keys with no key signature.',
        audioChord: ['C4', 'E4', 'G4'],
        renderFront: (w, h) => `
          <div style="text-align: center; padding: 2rem;">
            <span class="tag">Grade 1 Key</span>
            <h3 style="font-size: clamp(1.8rem, 3vw, 2.4rem); margin-block: 0.5rem; color: var(--color-ink);">C Major</h3>
            <p style="color: var(--color-muted); font-size: var(--text-sm);">How many sharps or flats are in the key signature of C Major?</p>
          </div>
        `
      },
      {
        id: 'scale-g-major',
        category: 'scales',
        tag: 'Grade 1 • Major Scales',
        type: 'concept',
        name: 'G Major Scale & Key Signature',
        beats: '1 Sharp: F♯ (placed on line 5 in treble, line 4 in bass)',
        description: 'Scale: G - A - B - C - D - E - F♯ - G. Tonic Triad: G - B - D.',
        hint: 'F is raised to F♯ so the semitone falls correctly between degrees 7 and 8 (F♯ to G).',
        audioChord: ['G3', 'B3', 'D4'],
        renderFront: (w, h) => `
          <div style="text-align: center; padding: 2rem;">
            <span class="tag">Grade 1 Key</span>
            <h3 style="font-size: clamp(1.8rem, 3vw, 2.4rem); margin-block: 0.5rem; color: var(--color-ink);">G Major</h3>
            <p style="color: var(--color-muted); font-size: var(--text-sm);">What is the key signature and tonic triad of G Major?</p>
          </div>
        `
      },
      {
        id: 'scale-d-major',
        category: 'scales',
        tag: 'Grade 1 • Major Scales',
        type: 'concept',
        name: 'D Major Scale & Key Signature',
        beats: '2 Sharps: F♯ and C♯',
        description: 'Scale: D - E - F♯ - G - A - B - C♯ - D. Tonic Triad: D - F♯ - A.',
        hint: 'Always write sharps in order: F♯ first, then C♯.',
        audioChord: ['D4', 'F#4', 'A4'],
        renderFront: (w, h) => `
          <div style="text-align: center; padding: 2rem;">
            <span class="tag">Grade 1 Key</span>
            <h3 style="font-size: clamp(1.8rem, 3vw, 2.4rem); margin-block: 0.5rem; color: var(--color-ink);">D Major</h3>
            <p style="color: var(--color-muted); font-size: var(--text-sm);">What is the key signature and tonic triad of D Major?</p>
          </div>
        `
      },
      {
        id: 'scale-f-major',
        category: 'scales',
        tag: 'Grade 1 • Major Scales',
        type: 'concept',
        name: 'F Major Scale & Key Signature',
        beats: '1 Flat: B♭ (placed on line 3 in treble, line 2 in bass)',
        description: 'Scale: F - G - A - B♭ - C - D - E - F. Tonic Triad: F - A - C.',
        hint: 'B is lowered to B♭ so the semitone falls correctly between degrees 3 and 4 (A to B♭).',
        audioChord: ['F3', 'A3', 'C4'],
        renderFront: (w, h) => `
          <div style="text-align: center; padding: 2rem;">
            <span class="tag">Grade 1 Key</span>
            <h3 style="font-size: clamp(1.8rem, 3vw, 2.4rem); margin-block: 0.5rem; color: var(--color-ink);">F Major</h3>
            <p style="color: var(--color-muted); font-size: var(--text-sm);">What is the key signature and tonic triad of F Major?</p>
          </div>
        `
      },
      {
        id: 'scale-degrees-numbers',
        category: 'scales',
        tag: 'Grade 1 • Degrees & Intervals',
        type: 'concept',
        name: 'Scale Degrees (1 to 7) & Intervals',
        beats: 'Numbered 1st (Tonic), 2nd, 3rd, 4th, 5th, 6th, 7th, 8ve',
        description: 'In Grade 1, scale degrees and intervals above the tonic are identified by NUMBER ONLY.',
        hint: 'Example in C Major: C=1 (Tonic), D=2nd, E=3rd, F=4th, G=5th, A=6th, B=7th, C=8ve.',
        renderFront: (w, h) => `
          <div style="text-align: center; padding: 2rem;">
            <span class="tag">Scale Degrees</span>
            <h3 style="font-size: clamp(1.4rem, 2.5vw, 1.8rem); margin-block: 0.5rem; color: var(--color-ink);">Intervals Above the Tonic</h3>
            <p style="color: var(--color-muted); font-size: var(--text-sm);">In C Major, what interval above the tonic is the note G?</p>
          </div>
        `
      },

      // =========================================================================
      // CHECKLIST 5: FREQUENTLY USED ITALIAN TERMS, TEMPO, DYNAMICS & SIGNS
      // =========================================================================
      {
        id: 'term-allegro',
        category: 'terms',
        tag: 'Grade 1 • Tempo Terms',
        type: 'term',
        name: 'Allegro',
        beats: 'Quick, lively, cheerful',
        description: 'One of the most frequent tempo markings in classical music.',
        hint: 'From the Italian word for cheerful or lively.',
        renderFront: (w, h) => `
          <div style="text-align: center; padding: 2rem;">
            <span class="tag">Italian Tempo Term</span>
            <h2 style="font-family: var(--font-display); font-size: 2.5rem; margin-block: 0.5rem; color: var(--color-ink);">Allegro</h2>
            <p style="color: var(--color-muted); font-size: var(--text-sm);">What does this tempo direction mean?</p>
          </div>
        `
      },
      {
        id: 'term-andante',
        category: 'terms',
        tag: 'Grade 1 • Tempo Terms',
        type: 'term',
        name: 'Andante',
        beats: 'At a walking pace (moderately slow)',
        description: 'Derived from the Italian verb "andare" (to walk).',
        hint: 'A relaxed, flowing walking speed.',
        renderFront: (w, h) => `
          <div style="text-align: center; padding: 2rem;">
            <span class="tag">Italian Tempo Term</span>
            <h2 style="font-family: var(--font-display); font-size: 2.5rem; margin-block: 0.5rem; color: var(--color-ink);">Andante</h2>
            <p style="color: var(--color-muted); font-size: var(--text-sm);">What does this tempo direction mean?</p>
          </div>
        `
      },
      {
        id: 'term-adagio',
        category: 'terms',
        tag: 'Grade 1 • Tempo Terms',
        type: 'term',
        name: 'Adagio',
        beats: 'Slow',
        description: 'A slow tempo direction indicating calm, relaxed performance.',
        hint: 'Slower than andante.',
        renderFront: (w, h) => `
          <div style="text-align: center; padding: 2rem;">
            <span class="tag">Italian Tempo Term</span>
            <h2 style="font-family: var(--font-display); font-size: 2.5rem; margin-block: 0.5rem; color: var(--color-ink);">Adagio</h2>
            <p style="color: var(--color-muted); font-size: var(--text-sm);">What does this tempo direction mean?</p>
          </div>
        `
      },
      {
        id: 'term-accelerando',
        category: 'terms',
        tag: 'Grade 1 • Tempo Changes',
        type: 'term',
        name: 'Accelerando (accel.)',
        beats: 'Gradually getting quicker',
        description: 'Gradually increase the tempo of the music.',
        hint: 'Opposite of rallentando / ritardando.',
        renderFront: (w, h) => `
          <div style="text-align: center; padding: 2rem;">
            <span class="tag">Tempo Direction</span>
            <h2 style="font-family: var(--font-display); font-size: 2.5rem; margin-block: 0.5rem; color: var(--color-ink);">Accelerando</h2>
            <p style="color: var(--color-muted); font-size: var(--text-sm);">Abbreviated as: accel. What does it mean?</p>
          </div>
        `
      },
      {
        id: 'term-rallentando',
        category: 'terms',
        tag: 'Grade 1 • Tempo Changes',
        type: 'term',
        name: 'Rallentando (rall.) / Ritardando (rit.)',
        beats: 'Gradually getting slower',
        description: 'Gradually ease back the speed, often at the end of a phrase or piece.',
        hint: 'Followed by "a tempo" to return to the original speed.',
        renderFront: (w, h) => `
          <div style="text-align: center; padding: 2rem;">
            <span class="tag">Tempo Direction</span>
            <h2 style="font-family: var(--font-display); font-size: 2.2rem; margin-block: 0.5rem; color: var(--color-ink);">Rallentando</h2>
            <p style="color: var(--color-muted); font-size: var(--text-sm);">Abbreviated as: rall. (or rit.). What does it mean?</p>
          </div>
        `
      },
      {
        id: 'term-dynamics-scale',
        category: 'terms',
        tag: 'Grade 1 • Dynamics',
        type: 'term',
        name: 'Grade 1 Dynamics (pp to ff)',
        beats: 'pp < p < mp < mf < f < ff',
        description: 'pp = pianissimo (very quiet), p = piano (quiet), mp = mezzo piano (moderately quiet), mf = mezzo forte (moderately loud), f = forte (loud), ff = fortissimo (very loud).',
        hint: 'From quietest to loudest: pp ➔ p ➔ mp ➔ mf ➔ f ➔ ff.',
        renderFront: (w, h) => `
          <div style="text-align: center; padding: 2rem;">
            <span class="tag">Italian Dynamics</span>
            <h3 style="font-family: var(--font-display); font-size: clamp(1.4rem, 2.5vw, 2rem); margin-block: 0.5rem; color: var(--color-accent);">
              pp — p — mp — mf — f — ff
            </h3>
            <p style="color: var(--color-muted); font-size: var(--text-sm);">Arrange and translate these 6 dynamic levels from softest to loudest.</p>
          </div>
        `
      },
      {
        id: 'term-crescendo-decrescendo',
        category: 'terms',
        tag: 'Grade 1 • Dynamic Hairpins',
        type: 'term',
        name: 'Crescendo (<) & Decrescendo (>)',
        beats: 'Gradually getting louder (<) and softer (>)',
        description: 'Crescendo (cresc.) = gradually louder. Decrescendo / Diminuendo (dim.) = gradually softer.',
        hint: 'Also written as "hairpin" symbols underneath the stave.',
        renderFront: (w, h) => `
          <svg viewBox="0 0 ${w} ${h}" class="flashcard-symbol-svg">
            <!-- Crescendo hairpin -->
            <line x1="${w / 2 - 80}" y1="${h / 2 - 15}" x2="${w / 2 - 10}" y2="${h / 2 - 30}" stroke="var(--color-accent)" stroke-width="3" />
            <line x1="${w / 2 - 80}" y1="${h / 2 - 15}" x2="${w / 2 - 10}" y2="${h / 2}" stroke="var(--color-accent)" stroke-width="3" />
            <!-- Decrescendo hairpin -->
            <line x1="${w / 2 + 10}" y1="${h / 2 - 30}" x2="${w / 2 + 80}" y2="${h / 2 - 15}" stroke="var(--color-ink)" stroke-width="3" />
            <line x1="${w / 2 + 10}" y1="${h / 2}" x2="${w / 2 + 80}" y2="${h / 2 - 15}" stroke="var(--color-ink)" stroke-width="3" />
          </svg>
        `
      },
      {
        id: 'term-fermata',
        category: 'terms',
        tag: 'Grade 1 • Signs',
        type: 'term',
        name: 'Fermata / Pause Sign (𝄐)',
        beats: 'Hold the note or rest longer than its written value',
        description: 'A semi-circle with a dot in the center. Gives expressive freedom to pause on a note.',
        hint: 'Also nicknamed "the eye" or bird’s eye.',
        renderFront: (w, h) => `
          <svg viewBox="0 0 ${w} ${h}" class="flashcard-symbol-svg">
            <text x="${w / 2}" y="${h / 2 + 25}" font-family="'Century Gothic', serif" font-size="75" text-anchor="middle" fill="var(--color-accent)">𝄐</text>
          </svg>
        `
      },
      {
        id: 'term-staccato-legato',
        category: 'terms',
        tag: 'Grade 1 • Articulation',
        type: 'term',
        name: 'Staccato & Legato',
        beats: 'Staccato = Detached, short • Legato = Smoothly',
        description: 'Staccato is marked with a dot directly above or below the notehead. Legato is indicated by a slur or the word "legato".',
        hint: 'A staccato dot is placed vertically at the notehead (unlike a rhythmic dot placed beside it).',
        renderFront: (w, h) => `
          <div style="text-align: center; padding: 2rem;">
            <span class="tag">Articulation Signs</span>
            <h2 style="font-family: var(--font-display); font-size: 2.2rem; margin-block: 0.5rem; color: var(--color-ink);">Staccato vs. Legato</h2>
            <p style="color: var(--color-muted); font-size: var(--text-sm);">How is staccato notated and how does it differ from legato?</p>
          </div>
        `
      },
      {
        id: 'term-dc-fine',
        category: 'terms',
        tag: 'Grade 1 • Directions',
        type: 'term',
        name: 'Da Capo (D.C.) & Fine',
        beats: 'D.C. = From the beginning • Fine = The end',
        description: 'D.C. al Fine instructs the player to repeat from the beginning and stop at the word "Fine".',
        hint: '"Capo" in Italian means head / top. Repeat from the top.',
        renderFront: (w, h) => `
          <div style="text-align: center; padding: 2rem;">
            <span class="tag">Navigation Directions</span>
            <h2 style="font-family: var(--font-display); font-size: 2.2rem; margin-block: 0.5rem; color: var(--color-accent);">D.C. al Fine</h2>
            <p style="color: var(--color-muted); font-size: var(--text-sm);">What do the terms "Da Capo" and "Fine" direct the musician to do?</p>
          </div>
        `
      }
    ];

    this.init();
  }

  init() {
    this.filterDeck();
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('keydown', (e) => {
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
    if (this.selectedCategory === 'all') {
      this.deck = [...this.allCards];
    } else {
      this.deck = this.allCards.filter(card => card.category === this.selectedCategory);
    }

    this.currentIndex = 0;
    this.isFlipped = false;
    this.renderCurrentCard();
  }

  setCategoryFilter(cat) {
    this.selectedCategory = cat;
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
      const card = this.deck[this.currentIndex];
      if (card && card.audioNote && window.mainPiano) {
        window.mainPiano.setHighlights({
          [card.audioNote]: { color: '#b8432f', badge: card.pitch || 'Note', root: true }
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
    if (!card || !window.soundEngine) return;

    if (card.audioChord) {
      window.soundEngine.playChord(card.audioChord, 1.4);
    } else if (card.audioNote) {
      window.soundEngine.playNote(card.audioNote, card.duration || 0.7);
    }
  }

  renderCurrentCard() {
    const cardEl = document.getElementById('flashcard-card-element');
    const counterEl = document.getElementById('flashcard-counter');

    if (this.deck.length === 0) {
      if (cardEl) {
        cardEl.innerHTML = `
          <div class="flashcard-face flashcard-front" style="display: grid; place-items: center; text-align: center; padding: 2rem;">
            <p style="color: var(--color-muted);">No flashcards found for this checklist section.</p>
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

      const hasSound = Boolean(card.audioNote || card.audioChord);

      cardEl.innerHTML = `
        <!-- FRONT FACE -->
        <div class="flashcard-face flashcard-front">
          <div class="flashcard-meta-top">
            <span class="tag" style="background: var(--color-accent-soft); color: var(--color-accent); font-weight: 700;">
              ${card.tag}
            </span>
            <span style="font-size: var(--text-xs); color: var(--color-muted); letter-spacing: .04em;">
              [Press Space to Flip]
            </span>
          </div>

          <div class="flashcard-stave-wrapper" id="flashcard-front-display">
            <!-- Injected by custom front renderer or Grand Staff -->
          </div>

          <div class="flashcard-footer-prompt">
            ${hasSound ? `
              <button class="btn outline small" onclick="event.stopPropagation(); window.flashcardsEngine.playCurrentCardSound();" title="Press P to hear sound">
                🔊 Hear Sound
              </button>
            ` : `<span style="font-size: var(--text-xs); color: var(--color-muted);">ABRSM Syllabus Card</span>`}
            <span style="font-size: var(--text-xs); color: var(--color-muted);">
              Tap card to reveal answer ➔
            </span>
          </div>
        </div>

        <!-- BACK FACE -->
        <div class="flashcard-face flashcard-back">
          ${card.category === 'notes' ? `
            <div class="flashcard-note-only-wrap">
              <div class="flashcard-note-only-name">${card.name}</div>
            </div>

            <div class="flashcard-footer-prompt">
              ${hasSound ? `
                <button class="btn outline small" onclick="event.stopPropagation(); window.flashcardsEngine.playCurrentCardSound();" title="Press P to replay sound">
                  🔊 Replay Note
                </button>
              ` : `<span></span>`}
              <span style="font-size: var(--text-xs); color: var(--color-muted);">
                Card ${this.currentIndex + 1} of ${this.deck.length}
              </span>
            </div>
          ` : `
            <div class="flashcard-meta-top">
              <span class="tag" style="background: var(--color-answer-soft); color: var(--color-answer); font-weight: 700;">
                ✓ Checklist Answer
              </span>
              <span style="font-size: var(--text-xs); color: var(--color-muted);">
                ${card.tag}
              </span>
            </div>

            <div class="flashcard-back-body">
              <h2 class="flashcard-note-name">${card.name}</h2>
              <p class="flashcard-position-text">
                <strong>Value / Meaning:</strong> ${card.beats}
              </p>
              <p style="font-size: var(--text-sm); color: var(--color-ink); margin-bottom: var(--space-2);">
                ${card.description}
              </p>
              <p class="flashcard-hint-text">
                💡 <em>${card.hint}</em>
              </p>
            </div>

            <div class="flashcard-footer-prompt">
              ${hasSound ? `
                <button class="btn outline small" onclick="event.stopPropagation(); window.flashcardsEngine.playCurrentCardSound();">
                  🔊 Replay Audio
                </button>
              ` : `<span></span>`}
              <span style="font-size: var(--text-xs); color: var(--color-muted);">
                Card ${this.currentIndex + 1} of ${this.deck.length}
              </span>
            </div>
          `}
        </div>
      `;

      // Render the front graphic
      const frontContainer = document.getElementById('flashcard-front-display');
      if (frontContainer) {
        if (card.type === 'note-grand') {
          this.renderGrandStaffNote(card, frontContainer);
        } else if (typeof card.renderFront === 'function') {
          frontContainer.innerHTML = card.renderFront(480, 180);
        }
      }
    }
  }

  // Draw Grand Staff for note cards
  renderGrandStaffNote(card, container) {
    const width = 500;
    const height = 185;
    const startX = 46;
    const endX = width - 24;
    const lineSpacing = 11;

    const trebleTopY = 22;
    const trebleBottomLineY = trebleTopY + 4 * lineSpacing; // 66 (E4)
    const bassTopY = 104;
    const bassBottomLineY = bassTopY + 4 * lineSpacing; // 148 (G2)
    const middleCY = 85;

    let svg = `<svg viewBox="0 0 ${width} ${height}" class="flashcard-stave-svg grand-staff-card" xmlns="http://www.w3.org/2000/svg">`;

    // 1. Classical Curly Brace
    svg += `
      <path d="M 40 20 C 31 20, 27 38, 27 65 C 27 78, 20 85, 14 85 C 20 85, 27 92, 27 105 C 27 132, 31 150, 40 150 C 35 150, 30 132, 30 105 C 30 90, 23 87, 18 85 C 23 83, 30 80, 30 65 C 30 38, 35 20, 40 20 Z" fill="var(--color-ink)" />
    `;

    // 2. Connecting barlines
    svg += `<line x1="${startX}" y1="${trebleTopY}" x2="${startX}" y2="${bassBottomLineY}" stroke="var(--color-ink)" stroke-width="2" />`;
    svg += `<line x1="${endX}" y1="${trebleTopY}" x2="${endX}" y2="${bassBottomLineY}" stroke="var(--color-ink)" stroke-width="1.2" />`;

    // 3. Stave lines
    for (let i = 0; i < 5; i++) {
      svg += `<line x1="${startX}" y1="${trebleTopY + i * lineSpacing}" x2="${endX}" y2="${trebleTopY + i * lineSpacing}" stroke="var(--color-ink)" stroke-width="1.2" />`;
      svg += `<line x1="${startX}" y1="${bassTopY + i * lineSpacing}" x2="${endX}" y2="${bassTopY + i * lineSpacing}" stroke="var(--color-ink)" stroke-width="1.2" />`;
    }

    // 4. Clefs
    const isTreble = card.clef === 'treble';
    svg += `<text x="${startX + 8}" y="${trebleTopY + 38}" font-family="'Century Gothic', sans-serif" font-size="50" fill="${isTreble ? 'var(--color-accent)' : 'var(--color-ink)'}">𝄞</text>`;
    svg += `<text x="${startX + 8}" y="${bassTopY + 33}" font-family="'Century Gothic', sans-serif" font-size="38" fill="${!isTreble ? 'var(--color-accent)' : 'var(--color-ink)'}">𝄢</text>`;

    // 5. Calculate Notehead position
    const letters = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const p = card.pitch.charAt(0).toUpperCase();
    const letterIdx = letters.indexOf(p);
    const step = (card.octave - 4) * 7 + letterIdx;

    const noteX = width / 2 + 35;
    let noteY = middleCY;
    let isStemUp = true;
    let ledgerLines = '';
    const halfStep = lineSpacing / 2;

    if (step === 0) {
      noteY = middleCY;
      isStemUp = true;
      ledgerLines += `<line x1="${noteX - 15}" y1="${middleCY}" x2="${noteX + 15}" y2="${middleCY}" stroke="var(--color-ink)" stroke-width="1.8" />`;
    } else if (card.clef === 'bass' || step < 0) {
      const stepsFromBottom = step - (-10);
      noteY = bassBottomLineY - (stepsFromBottom * halfStep);
      isStemUp = step < -6;
      if (step < -10) {
        for (let s = -12; s >= step; s -= 2) {
          const ly = bassBottomLineY - ((s - (-10)) * halfStep);
          ledgerLines += `<line x1="${noteX - 14}" y1="${ly}" x2="${noteX + 14}" y2="${ly}" stroke="var(--color-ink)" stroke-width="1.5" />`;
        }
      }
    } else {
      const stepsFromBottom = step - 2;
      noteY = trebleBottomLineY - (stepsFromBottom * halfStep);
      isStemUp = step < 6;
      if (step > 10) {
        for (let s = 12; s <= step; s += 2) {
          const ly = trebleBottomLineY - ((s - 2) * halfStep);
          ledgerLines += `<line x1="${noteX - 14}" y1="${ly}" x2="${noteX + 14}" y2="${ly}" stroke="var(--color-ink)" stroke-width="1.5" />`;
        }
      }
    }

    svg += ledgerLines;

    if (card.accidental) {
      const sym = card.accidental === '#' ? '♯' : '♭';
      svg += `<text x="${noteX - 18}" y="${noteY + 5}" font-size="20" fill="var(--color-accent)" text-anchor="middle" font-weight="bold">${sym}</text>`;
    }

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
