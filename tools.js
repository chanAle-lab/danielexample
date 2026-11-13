/**
 * MusicTheory101 Interactive Tools Suite
 * - Scale Explorer
 * - Chord Builder
 * - Interactive Metronome
 * - Ear Training & Practice Quizzes
 */

class MusicTools {
  constructor() {
    this.metronomeTimer = null;
    this.bpm = 100;
    this.isPlayingMetronome = false;
    this.currentBeat = 0;
    this.beatsPerMeasure = 4;
    this.tapTimes = [];

    // Quiz State
    this.currentQuizType = 'interval';
    this.quizScore = 0;
    this.quizStreak = 0;
    this.quizQuestion = null;

    this.scaleFormulas = {
      'major': { name: 'Major (Ionian)', steps: [2, 2, 1, 2, 2, 2, 1], degrees: ['1', '2', '3', '4', '5', '6', '7'] },
      'minor': { name: 'Natural Minor (Aeolian)', steps: [2, 1, 2, 2, 1, 2, 2], degrees: ['1', '2', '♭3', '4', '5', '♭6', '♭7'] },
      'harmonic_minor': { name: 'Harmonic Minor', steps: [2, 1, 2, 2, 1, 3, 1], degrees: ['1', '2', '♭3', '4', '5', '♭6', '7'] },
      'melodic_minor': { name: 'Melodic Minor', steps: [2, 1, 2, 2, 2, 2, 1], degrees: ['1', '2', '♭3', '4', '5', '6', '7'] },
      'dorian': { name: 'Dorian Mode', steps: [2, 1, 2, 2, 2, 1, 2], degrees: ['1', '2', '♭3', '4', '5', '6', '♭7'] },
      'phrygian': { name: 'Phrygian Mode', steps: [1, 2, 2, 2, 1, 2, 2], degrees: ['1', '♭2', '♭3', '4', '5', '♭6', '♭7'] },
      'lydian': { name: 'Lydian Mode', steps: [2, 2, 2, 1, 2, 2, 1], degrees: ['1', '2', '3', '♯4', '5', '6', '7'] },
      'mixolydian': { name: 'Mixolydian Mode', steps: [2, 2, 1, 2, 2, 1, 2], degrees: ['1', '2', '3', '4', '5', '6', '♭7'] },
      'pentatonic_major': { name: 'Major Pentatonic', steps: [2, 2, 3, 2, 3], degrees: ['1', '2', '3', '5', '6'] },
      'pentatonic_minor': { name: 'Minor Pentatonic', steps: [3, 2, 2, 3, 2], degrees: ['1', '♭3', '4', '5', '♭7'] },
      'blues': { name: 'Blues Scale', steps: [3, 2, 1, 1, 3, 2], degrees: ['1', '♭3', '4', '♭5', '5', '♭7'] }
    };

    this.chordFormulas = {
      'major': { name: 'Major Triad', semitones: [0, 4, 7], degrees: ['Root', '3rd', '5th'] },
      'minor': { name: 'Minor Triad', semitones: [0, 3, 7], degrees: ['Root', '♭3rd', '5th'] },
      'diminished': { name: 'Diminished Triad', semitones: [0, 3, 6], degrees: ['Root', '♭3rd', '♭5th'] },
      'augmented': { name: 'Augmented Triad', semitones: [0, 4, 8], degrees: ['Root', '3rd', '♯5th'] },
      'sus2': { name: 'Suspended 2nd (Sus2)', semitones: [0, 2, 7], degrees: ['Root', '2nd', '5th'] },
      'sus4': { name: 'Suspended 4th (Sus4)', semitones: [0, 5, 7], degrees: ['Root', '4th', '5th'] },
      'dom7': { name: 'Dominant 7th (7)', semitones: [0, 4, 7, 10], degrees: ['Root', '3rd', '5th', '♭7th'] },
      'maj7': { name: 'Major 7th (Maj7)', semitones: [0, 4, 7, 11], degrees: ['Root', '3rd', '5th', '7th'] },
      'min7': { name: 'Minor 7th (m7)', semitones: [0, 3, 7, 10], degrees: ['Root', '♭3rd', '5th', '♭7th'] },
      'm7b5': { name: 'Half-Diminished (m7♭5)', semitones: [0, 3, 6, 10], degrees: ['Root', '♭3rd', '♭5th', '♭7th'] },
      'dim7': { name: 'Full Diminished 7th (dim7)', semitones: [0, 3, 6, 9], degrees: ['Root', '♭3rd', '♭5th', '𝄫7th'] }
    };

    this.intervalsList = [
      { id: 'm2', name: 'Minor 2nd (1 semitone)', semitones: 1, mnemonic: 'Jaws Theme' },
      { id: 'M2', name: 'Major 2nd (2 semitones)', semitones: 2, mnemonic: 'Happy Birthday' },
      { id: 'm3', name: 'Minor 3rd (3 semitones)', semitones: 3, mnemonic: 'Greensleeves' },
      { id: 'M3', name: 'Major 3rd (4 semitones)', semitones: 4, mnemonic: 'When The Saints' },
      { id: 'P4', name: 'Perfect 4th (5 semitones)', semitones: 5, mnemonic: 'Here Comes the Bride' },
      { id: 'TT', name: 'Tritone / Dim 5th (6 semitones)', semitones: 6, mnemonic: 'The Simpsons' },
      { id: 'P5', name: 'Perfect 5th (7 semitones)', semitones: 7, mnemonic: 'Star Wars Theme' },
      { id: 'm6', name: 'Minor 6th (8 semitones)', semitones: 8, mnemonic: 'The Entertainer' },
      { id: 'M6', name: 'Major 6th (9 semitones)', semitones: 9, mnemonic: 'NBC Chimes' },
      { id: 'm7', name: 'Minor 7th (10 semitones)', semitones: 10, mnemonic: 'The Winner Takes It All' },
      { id: 'M7', name: 'Major 7th (11 semitones)', semitones: 11, mnemonic: 'Take On Me' },
      { id: 'P8', name: 'Octave (12 semitones)', semitones: 12, mnemonic: 'Somewhere Over the Rainbow' }
    ];
  }

  // --- Scale Logic ---
  buildScale(root, scaleType, octave = 4) {
    const chromatic = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const rootIndex = chromatic.indexOf(root);
    if (rootIndex === -1) return [];

    const formula = this.scaleFormulas[scaleType];
    if (!formula) return [];

    const notes = [];
    let currentIndex = rootIndex;
    let curOctave = octave;

    notes.push({ note: chromatic[currentIndex], octave: curOctave, fullName: `${chromatic[currentIndex]}${curOctave}`, degree: formula.degrees[0] });

    for (let i = 0; i < formula.steps.length; i++) {
      const step = formula.steps[i];
      const nextIndex = (currentIndex + step) % 12;
      if (currentIndex + step >= 12) {
        curOctave++;
      }
      currentIndex = nextIndex;
      const deg = formula.degrees[(i + 1) % formula.degrees.length] || '';
      notes.push({ note: chromatic[currentIndex], octave: curOctave, fullName: `${chromatic[currentIndex]}${curOctave}`, degree: deg });
    }

    return notes;
  }

  // --- Chord Logic ---
  buildChord(root, chordType, octave = 4, inversion = 0) {
    const chromatic = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const rootIndex = chromatic.indexOf(root);
    if (rootIndex === -1) return [];

    const formula = this.chordFormulas[chordType];
    if (!formula) return [];

    let chordNotes = formula.semitones.map((semi, idx) => {
      const totalSemi = rootIndex + semi;
      const pitchClass = chromatic[totalSemi % 12];
      const oct = octave + Math.floor(totalSemi / 12);
      return {
        note: pitchClass,
        octave: oct,
        fullName: `${pitchClass}${oct}`,
        degree: formula.degrees[idx]
      };
    });

    // Inversions
    if (inversion === 1 && chordNotes.length >= 2) {
      // First inversion: raise root by an octave
      chordNotes[0].octave++;
      chordNotes[0].fullName = `${chordNotes[0].note}${chordNotes[0].octave}`;
      chordNotes.push(chordNotes.shift());
    } else if (inversion === 2 && chordNotes.length >= 3) {
      // Second inversion: raise root and 3rd by an octave
      chordNotes[0].octave++;
      chordNotes[0].fullName = `${chordNotes[0].note}${chordNotes[0].octave}`;
      chordNotes[1].octave++;
      chordNotes[1].fullName = `${chordNotes[1].note}${chordNotes[1].octave}`;
      chordNotes.push(chordNotes.shift());
      chordNotes.push(chordNotes.shift());
    }

    return chordNotes;
  }

  // --- Metronome Logic ---
  toggleMetronome(bpmInput = 100, meter = 4) {
    if (this.isPlayingMetronome) {
      this.stopMetronome();
    } else {
      this.startMetronome(bpmInput, meter);
    }
    return this.isPlayingMetronome;
  }

  startMetronome(bpmInput, meter = 4) {
    this.bpm = bpmInput || this.bpm;
    this.beatsPerMeasure = meter;
    this.isPlayingMetronome = true;
    this.currentBeat = 0;

    const intervalMs = (60 / this.bpm) * 1000;
    this.tick();
    this.metronomeTimer = setInterval(() => this.tick(), intervalMs);
  }

  stopMetronome() {
    this.isPlayingMetronome = false;
    clearInterval(this.metronomeTimer);
    this.metronomeTimer = null;
    const indicator = document.getElementById('metronome-beat-indicator');
    if (indicator) indicator.classList.remove('pulse-downbeat', 'pulse-beat');
  }

  setMetronomeBpm(newBpm) {
    this.bpm = newBpm;
    if (this.isPlayingMetronome) {
      clearInterval(this.metronomeTimer);
      const intervalMs = (60 / this.bpm) * 1000;
      this.metronomeTimer = setInterval(() => this.tick(), intervalMs);
    }
  }

  tick() {
    const isDownbeat = this.currentBeat === 0;
    if (window.soundEngine) {
      window.soundEngine.playClick(isDownbeat);
    }

    // Visual pulse
    const indicator = document.getElementById('metronome-beat-indicator');
    const beatCounter = document.getElementById('metronome-beat-counter');
    if (indicator) {
      indicator.classList.remove('pulse-downbeat', 'pulse-beat');
      void indicator.offsetWidth; // force reflow
      indicator.classList.add(isDownbeat ? 'pulse-downbeat' : 'pulse-beat');
    }
    if (beatCounter) {
      beatCounter.textContent = `Beat ${this.currentBeat + 1} of ${this.beatsPerMeasure}`;
    }

    this.currentBeat = (this.currentBeat + 1) % this.beatsPerMeasure;
  }

  tapTempo() {
    const now = Date.now();
    this.tapTimes.push(now);
    if (this.tapTimes.length > 4) this.tapTimes.shift();

    if (this.tapTimes.length >= 2) {
      const intervals = [];
      for (let i = 1; i < this.tapTimes.length; i++) {
        intervals.push(this.tapTimes[i] - this.tapTimes[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const computedBpm = Math.round(60000 / avgInterval);
      if (computedBpm >= 40 && computedBpm <= 240) {
        this.setMetronomeBpm(computedBpm);
        const bpmSlider = document.getElementById('metronome-bpm');
        const bpmDisplay = document.getElementById('bpm-val');
        if (bpmSlider) bpmSlider.value = computedBpm;
        if (bpmDisplay) bpmDisplay.textContent = computedBpm;
      }
    }
  }

  // --- Quiz & Ear Training Logic ---
  generateQuizQuestion(type = 'interval') {
    this.currentQuizType = type;

    if (type === 'interval') {
      const baseMidi = 60; // C4
      const intervalObj = this.intervalsList[Math.floor(Math.random() * this.intervalsList.length)];
      const targetMidi = baseMidi + intervalObj.semitones;

      const note1 = window.soundEngine.midiToNote(baseMidi);
      const note2 = window.soundEngine.midiToNote(targetMidi);

      // 4 choices
      const incorrectChoices = this.intervalsList.filter(i => i.id !== intervalObj.id);
      const shuffledIncorrect = incorrectChoices.sort(() => 0.5 - Math.random()).slice(0, 3);
      const options = [intervalObj, ...shuffledIncorrect].sort(() => 0.5 - Math.random());

      this.quizQuestion = {
        type: 'interval',
        prompt: 'Listen to the interval and identify it:',
        notes: [note1, note2],
        correctAnswer: intervalObj.id,
        options: options.map(o => ({ id: o.id, label: o.name, sub: o.mnemonic }))
      };
    } else if (type === 'chord') {
      const rootPitches = ['C', 'D', 'E', 'F', 'G', 'A'];
      const root = rootPitches[Math.floor(Math.random() * rootPitches.length)];
      const chordTypes = ['major', 'minor', 'diminished', 'augmented'];
      const targetType = chordTypes[Math.floor(Math.random() * chordTypes.length)];
      const chordNotes = this.buildChord(root, targetType, 4).map(n => n.fullName);

      this.quizQuestion = {
        type: 'chord',
        prompt: `Identify the quality of this chord (Root: ${root}):`,
        notes: chordNotes,
        correctAnswer: targetType,
        options: [
          { id: 'major', label: 'Major Triad (Bright & Resolved)' },
          { id: 'minor', label: 'Minor Triad (Dark & Somber)' },
          { id: 'diminished', label: 'Diminished Triad (Tense & Suspenseful)' },
          { id: 'augmented', label: 'Augmented Triad (Dreamy & Floating)' }
        ]
      };
    } else if (type === 'note') {
      const chromatic = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];
      const targetNote = chromatic[Math.floor(Math.random() * chromatic.length)];
      const choices = chromatic.slice().sort(() => 0.5 - Math.random()).slice(0, 4);
      if (!choices.includes(targetNote)) choices[0] = targetNote;
      choices.sort();

      this.quizQuestion = {
        type: 'note',
        prompt: 'Listen to the pitch and identify the natural note:',
        notes: [targetNote],
        correctAnswer: targetNote.replace('4', ''),
        options: choices.map(n => ({ id: n.replace('4', ''), label: `Note ${n.replace('4', '')}` }))
      };
    }

    return this.quizQuestion;
  }

  playCurrentQuestionAudio() {
    if (!this.quizQuestion) return;
    if (this.quizQuestion.type === 'interval') {
      window.soundEngine.playArpeggio(this.quizQuestion.notes, 0.5, 0.45);
    } else if (this.quizQuestion.type === 'chord') {
      window.soundEngine.playChord(this.quizQuestion.notes, 1.2);
    } else if (this.quizQuestion.type === 'note') {
      window.soundEngine.playNote(this.quizQuestion.notes[0], 0.8);
    }
  }

  checkAnswer(answerId) {
    if (!this.quizQuestion) return null;
    const isCorrect = answerId === this.quizQuestion.correctAnswer;
    if (isCorrect) {
      this.quizScore += 10;
      this.quizStreak += 1;
    } else {
      this.quizStreak = 0;
    }
    return {
      isCorrect,
      correctAnswer: this.quizQuestion.correctAnswer,
      score: this.quizScore,
      streak: this.quizStreak
    };
  }
}

window.musicTools = new MusicTools();
