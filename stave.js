/**
 * MusicTheory101 - Interactive Musical Stave & Multi-Clef Engine
 * Supports Treble (G), Bass (F), Alto (C on line 3), and Tenor (C on line 4) clefs.
 * Draws SVG staff lines, clef glyphs, notes, accidentals, and ledger lines.
 */

class MusicalStave {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.currentClef = options.clef || 'treble'; // 'treble', 'bass', 'alto', 'tenor'
    this.keySignature = options.keySignature || 'C';
    this.notes = []; // Array of { pitch: 'C', octave: 4, accidental: null, duration: 1 }
    this.onNoteClick = options.onNoteClick || null;

    // Line spacing constants
    this.lineSpacing = 12; // pixels between stave lines
    this.topLineY = 50; // Y coordinate of line 5 (top line)
    // 5 lines: Y = 50, 62, 74, 86, 98 (lines 5, 4, 3, 2, 1)

    // Reference pitches for the bottom line (line 1) in each clef
    // line 1 step index (where middle C is 0):
    // C4 = 0. Step indices: C=0, D=1, E=2, F=3, G=4, A=5, B=6, C=7...
    this.clefBottomLineStep = {
      treble: 2,   // E4 (2 steps above C4)
      bass: -10,  // G2 (10 steps below C4: C3 is -7, G2 is -10)
      alto: -4,   // F3 (C4 is on line 3 = step -4 + 4 = 0)
      tenor: -6   // D3 (C4 is on line 4 = step -6 + 6 = 0)
    };

    this.render();
  }

  setClef(clef) {
    this.currentClef = clef;
    this.render();
  }

  setNotes(notesArray) {
    this.notes = notesArray;
    this.render();
  }

  addNote(pitch, octave, accidental = null) {
    this.notes = [{ pitch, octave, accidental }];
    this.render();
  }

  // Convert note (e.g. pitch 'G', octave 4) to diatonic step relative to C4 (C4 = 0)
  noteToDiatonicStep(pitch, octave) {
    const letters = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const p = pitch.charAt(0).toUpperCase();
    const letterIdx = letters.indexOf(p);
    return (octave - 4) * 7 + letterIdx;
  }

  // Get Y position on SVG for a given diatonic step
  stepToY(step) {
    const bottomLineStep = this.clefBottomLineStep[this.currentClef];
    const stepsFromBottomLine = step - bottomLineStep;
    const bottomLineY = this.topLineY + 4 * this.lineSpacing; // line 1 Y
    // Each diatonic step is half the line spacing
    return bottomLineY - (stepsFromBottomLine * (this.lineSpacing / 2));
  }

  render() {
    if (!this.container) return;

    const width = 600;
    const height = 180;
    const startX = 20;
    const endX = width - 20;

    let svg = `<svg viewBox="0 0 ${width} ${height}" class="stave-svg" xmlns="http://www.w3.org/2000/svg">`;

    // 1. Draw 5 Stave Lines
    for (let i = 0; i < 5; i++) {
      const y = this.topLineY + i * this.lineSpacing;
      svg += `<line x1="${startX}" y1="${y}" x2="${endX}" y2="${y}" stroke="currentColor" stroke-width="1.5" class="stave-line" />`;
    }

    // 2. Draw Clef Symbol
    svg += this.renderClefSymbol();

    // 3. Middle C reference guide (subtle dashed indicator when empty)
    const middleCStep = 0;
    const middleCY = this.stepToY(middleCStep);
    
    // 4. Render Notes
    const noteStartX = 140;
    const noteSpacing = 65;

    this.notes.forEach((note, index) => {
      const x = noteStartX + index * noteSpacing;
      const step = this.noteToDiatonicStep(note.pitch, note.octave);
      const y = this.stepToY(step);

      // Ledger lines
      svg += this.renderLedgerLines(x, step);

      // Accidental (sharp / flat / natural / double sharp / double flat)
      if (note.accidental) {
        svg += this.renderAccidental(x - 16, y, note.accidental);
      }

      // Notehead (tilted oval)
      const isStemUp = step < (this.clefBottomLineStep[this.currentClef] + 4);
      svg += `
        <g class="stave-note-group" data-note="${note.pitch}${note.accidental || ''}${note.octave}" onclick="window.staveEngine && window.staveEngine.handleNoteClick('${note.pitch}${note.accidental || ''}${note.octave}')">
          <ellipse cx="${x}" cy="${y}" rx="8" ry="5.5" transform="rotate(-20 ${x} ${y})" fill="currentColor" class="notehead" />
          <line x1="${isStemUp ? x + 7 : x - 7}" y1="${y}" x2="${isStemUp ? x + 7 : x - 7}" y2="${isStemUp ? y - 36 : y + 36}" stroke="currentColor" stroke-width="2" class="notestem" />
        </g>
      `;

      // Pitch label below
      svg += `<text x="${x}" y="${this.topLineY + 65}" class="stave-note-label" text-anchor="middle">${note.pitch}${note.accidental || ''}${note.octave}</text>`;
    });

    svg += '</svg>';
    this.container.innerHTML = svg;
  }

  renderClefSymbol() {
    const bottomLineY = this.topLineY + 4 * this.lineSpacing; // Y = 98

    if (this.currentClef === 'treble') {
      // G Clef curls on line 2 (G4)
      return `
        <g class="clef-glyph" transform="translate(30, ${this.topLineY - 14})">
          <text x="0" y="58" font-family="'Century Gothic', sans-serif" font-size="64" fill="currentColor" font-weight="normal">𝄞</text>
          <text x="45" y="50" font-size="11" fill="var(--text-muted)" class="clef-desc">Treble (G4 on line 2)</text>
        </g>
      `;
    } else if (this.currentClef === 'bass') {
      // F Clef dots around line 4 (F3)
      return `
        <g class="clef-glyph" transform="translate(30, ${this.topLineY - 5})">
          <text x="0" y="44" font-family="'Century Gothic', sans-serif" font-size="52" fill="currentColor">𝄢</text>
          <text x="45" y="40" font-size="11" fill="var(--text-muted)" class="clef-desc">Bass (F3 on line 4)</text>
        </g>
      `;
    } else if (this.currentClef === 'alto') {
      // C Clef centred on line 3 (C4)
      return `
        <g class="clef-glyph" transform="translate(30, ${this.topLineY - 4})">
          <text x="0" y="46" font-family="'Century Gothic', sans-serif" font-size="52" fill="currentColor">𝄡</text>
          <text x="45" y="42" font-size="11" fill="var(--accent-cyan)" font-weight="600" class="clef-desc">Alto (Middle C on line 3)</text>
        </g>
      `;
    } else if (this.currentClef === 'tenor') {
      // C Clef centred on line 4 (C4)
      return `
        <g class="clef-glyph" transform="translate(30, ${this.topLineY - 16})">
          <text x="0" y="46" font-family="'Century Gothic', sans-serif" font-size="52" fill="currentColor">𝄡</text>
          <text x="45" y="30" font-size="11" fill="var(--accent-purple)" font-weight="600" class="clef-desc">Tenor (Middle C on line 4)</text>
        </g>
      `;
    }
    return '';
  }

  renderLedgerLines(noteX, step) {
    const bottomLineStep = this.clefBottomLineStep[this.currentClef];
    const topLineStep = bottomLineStep + 8; // 5 lines = 8 diatonic steps (lines 1, 2, 3, 4, 5)
    let lines = '';

    // Below stave
    if (step < bottomLineStep) {
      for (let s = bottomLineStep - 2; s >= step; s -= 2) {
        const y = this.stepToY(s);
        lines += `<line x1="${noteX - 14}" y1="${y}" x2="${noteX + 14}" y2="${y}" stroke="currentColor" stroke-width="1.5" class="ledger-line" />`;
      }
    }

    // Above stave
    if (step > topLineStep) {
      for (let s = topLineStep + 2; s <= step; s += 2) {
        const y = this.stepToY(s);
        lines += `<line x1="${noteX - 14}" y1="${y}" x2="${noteX + 14}" y2="${y}" stroke="currentColor" stroke-width="1.5" class="ledger-line" />`;
      }
    }

    return lines;
  }

  renderAccidental(x, y, accidental) {
    let symbol = '♯';
    if (accidental === 'b' || accidental === '♭') symbol = '♭';
    else if (accidental === 'n' || accidental === '♮') symbol = '♮';
    else if (accidental === '##' || accidental === 'x' || accidental === '𝄪') symbol = '𝄪';
    else if (accidental === 'bb' || accidental === '𝄫') symbol = '𝄫';

    return `<text x="${x}" y="${y + 5}" font-size="18" fill="currentColor" text-anchor="middle" class="stave-accidental">${symbol}</text>`;
  }
}

window.MusicalStave = MusicalStave;
