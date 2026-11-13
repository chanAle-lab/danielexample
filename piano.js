/**
 * MusicTheory101 Interactive Piano Keyboard
 */

class InteractivePiano {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.startOctave = options.startOctave || 3;
    this.octaves = options.octaves || 2; // Default 2 octaves (e.g. C3 to B4 or C5)
    this.includeHighC = options.includeHighC !== false;
    this.onNoteOn = options.onNoteOn || null;
    this.onNoteOff = options.onNoteOff || null;

    this.isMouseDown = false;
    this.activeKeys = new Set();
    this.labelsVisible = 'pitch'; // 'pitch', 'keyboard', 'none'
    this.highlights = new Map(); // note -> { color, badge }

    this.keyboardMap = {
      'KeyA': 'C4',
      'KeyW': 'C#4',
      'KeyS': 'D4',
      'KeyE': 'D#4',
      'KeyD': 'E4',
      'KeyF': 'F4',
      'KeyT': 'F#4',
      'KeyG': 'G4',
      'KeyY': 'G#4',
      'KeyH': 'A4',
      'KeyU': 'A#4',
      'KeyJ': 'B4',
      'KeyK': 'C5',
      'KeyO': 'C#5',
      'KeyL': 'D5',
      'KeyP': 'D#5',
      'Semicolon': 'E5'
    };

    this.render();
    this.bindEvents();
  }

  getNotes() {
    const noteNames = [
      { name: 'C', isBlack: false },
      { name: 'C#', isBlack: true, alt: 'Db' },
      { name: 'D', isBlack: false },
      { name: 'D#', isBlack: true, alt: 'Eb' },
      { name: 'E', isBlack: false },
      { name: 'F', isBlack: false },
      { name: 'F#', isBlack: true, alt: 'Gb' },
      { name: 'G', isBlack: false },
      { name: 'G#', isBlack: true, alt: 'Ab' },
      { name: 'A', isBlack: false },
      { name: 'A#', isBlack: true, alt: 'Bb' },
      { name: 'B', isBlack: false }
    ];

    const notes = [];
    for (let oct = this.startOctave; oct < this.startOctave + this.octaves; oct++) {
      for (const n of noteNames) {
        notes.push({ ...n, octave: oct, fullName: `${n.name}${oct}` });
      }
    }
    if (this.includeHighC) {
      const topOct = this.startOctave + this.octaves;
      notes.push({ name: 'C', isBlack: false, octave: topOct, fullName: `C${topOct}` });
    }
    return notes;
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'piano-keyboard';

    const notes = this.getNotes();

    notes.forEach(note => {
      const keyEl = document.createElement('button');
      keyEl.type = 'button';
      keyEl.className = `piano-key ${note.isBlack ? 'black-key' : 'white-key'}`;
      keyEl.dataset.note = note.fullName;

      // Label element
      const label = document.createElement('span');
      label.className = 'key-label';
      label.textContent = this.getKeyLabelText(note);
      keyEl.appendChild(label);

      // Badge for intervals/degrees
      const badge = document.createElement('span');
      badge.className = 'key-badge';
      keyEl.appendChild(badge);

      wrapper.appendChild(keyEl);
    });

    this.container.appendChild(wrapper);
    this.applyHighlights();
  }

  getKeyLabelText(note) {
    if (this.labelsVisible === 'none') return '';
    if (this.labelsVisible === 'keyboard') {
      for (const [code, mappedNote] of Object.entries(this.keyboardMap)) {
        if (mappedNote === note.fullName) {
          return code.replace('Key', '').replace('Semicolon', ';');
        }
      }
      return '';
    }
    return note.fullName;
  }

  setLabelMode(mode) {
    this.labelsVisible = mode;
    this.render();
  }

  bindEvents() {
    window.addEventListener('mousedown', () => { this.isMouseDown = true; });
    window.addEventListener('mouseup', () => {
      this.isMouseDown = false;
      this.releaseAll();
    });

    // Touch and mouse handling on container
    this.container.addEventListener('mousedown', (e) => {
      const keyEl = e.target.closest('.piano-key');
      if (keyEl) {
        this.pressKey(keyEl.dataset.note);
      }
    });

    this.container.addEventListener('mouseover', (e) => {
      if (this.isMouseDown) {
        const keyEl = e.target.closest('.piano-key');
        if (keyEl) {
          this.pressKey(keyEl.dataset.note);
        }
      }
    });

    this.container.addEventListener('mouseout', (e) => {
      if (this.isMouseDown) {
        const keyEl = e.target.closest('.piano-key');
        if (keyEl) {
          this.releaseKey(keyEl.dataset.note);
        }
      }
    });

    // Touch support
    this.container.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      const keyEl = target ? target.closest('.piano-key') : null;
      if (keyEl) {
        e.preventDefault();
        this.pressKey(keyEl.dataset.note);
      }
    }, { passive: false });

    this.container.addEventListener('touchend', (e) => {
      this.releaseAll();
    });

    // Computer keyboard mapping
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.repeat) return;
      const note = this.keyboardMap[e.code];
      if (note) {
        this.pressKey(note);
      }
    });

    window.addEventListener('keyup', (e) => {
      const note = this.keyboardMap[e.code];
      if (note) {
        this.releaseKey(note);
      }
    });
  }

  pressKey(note, triggerSound = true) {
    if (!this.activeKeys.has(note)) {
      this.activeKeys.add(note);
      const keyEl = this.container.querySelector(`.piano-key[data-note="${note}"]`);
      if (keyEl) {
        keyEl.classList.add('active');
      }
      if (triggerSound && window.soundEngine) {
        window.soundEngine.startNote(note);
      }
      if (this.onNoteOn) this.onNoteOn(note);
    }
  }

  releaseKey(note) {
    if (this.activeKeys.has(note)) {
      this.activeKeys.delete(note);
      const keyEl = this.container.querySelector(`.piano-key[data-note="${note}"]`);
      if (keyEl) {
        keyEl.classList.remove('active');
      }
      if (window.soundEngine) {
        window.soundEngine.stopNote(note);
      }
      if (this.onNoteOff) this.onNoteOff(note);
    }
  }

  releaseAll() {
    this.activeKeys.forEach(note => {
      this.releaseKey(note);
    });
    this.activeKeys.clear();
  }

  // Highlight a collection of notes (for scales, chords, intervals)
  // highlightsMap: Map or Object of noteName -> { color: '#...', badge: 'R', root: boolean }
  setHighlights(highlightsMap = {}) {
    this.highlights = new Map(Object.entries(highlightsMap));
    this.applyHighlights();
  }

  clearHighlights() {
    this.highlights.clear();
    this.applyHighlights();
  }

  applyHighlights() {
    if (!this.container) return;
    const keys = this.container.querySelectorAll('.piano-key');
    keys.forEach(keyEl => {
      const note = keyEl.dataset.note;
      const pitchWithoutOctave = note.replace(/\d+$/, '');
      // Check both exact note ("C4") or pitch class ("C")
      const config = this.highlights.get(note) || this.highlights.get(pitchWithoutOctave);
      const badge = keyEl.querySelector('.key-badge');

      keyEl.classList.remove('highlighted', 'root-note');
      keyEl.style.removeProperty('--highlight-color');

      if (config) {
        keyEl.classList.add('highlighted');
        if (config.root) keyEl.classList.add('root-note');
        if (config.color) keyEl.style.setProperty('--highlight-color', config.color);
        if (badge) {
          badge.textContent = config.badge || '';
          badge.style.display = config.badge ? 'block' : 'none';
        }
      } else {
        if (badge) {
          badge.textContent = '';
          badge.style.display = 'none';
        }
      }
    });
  }

  // Flash / pulse note
  pulseNote(note, duration = 300) {
    const keyEl = this.container.querySelector(`.piano-key[data-note="${note}"]`);
    if (keyEl) {
      keyEl.classList.add('pulse');
      setTimeout(() => keyEl.classList.remove('pulse'), duration);
    }
  }
}

window.InteractivePiano = InteractivePiano;
