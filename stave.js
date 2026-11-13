/**
 * MusicTheory101 - Interactive Musical Stave & Grand Staff Engine
 * Supports Grand Staff (Treble + Bass connected by brace), as well as
 * individual Treble (G), Bass (F), Alto (C on line 3), and Tenor (C on line 4) clefs.
 */

class MusicalStave {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.currentClef = options.clef || 'grand'; // 'grand', 'treble', 'bass', 'alto', 'tenor'
    this.notes = options.notes || [{ pitch: 'C', octave: 4, accidental: null }]; // Middle C default
    this.onNoteClick = options.onNoteClick || null;

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

  noteToDiatonicStep(pitch, octave) {
    const letters = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const p = pitch.charAt(0).toUpperCase();
    const letterIdx = letters.indexOf(p);
    return (octave - 4) * 7 + letterIdx;
  }

  render() {
    if (!this.container) return;

    if (this.currentClef === 'grand') {
      this.renderGrandStaff();
    } else {
      this.renderSingleClefStaff();
    }
  }

  // --- GRAND STAFF RENDERING ---
  renderGrandStaff() {
    const width = 640;
    const height = 210;
    const startX = 52;
    const endX = width - 24;

    // Treble Stave (Top): Lines at Y = 28, 40, 52, 64, 76 (Line 5 down to Line 1)
    const trebleTopY = 28;
    const lineSpacing = 12;

    // Bass Stave (Bottom): Lines at Y = 118, 130, 142, 154, 166 (Line 5 down to Line 1)
    const bassTopY = 118;

    let svg = `<svg viewBox="0 0 ${width} ${height}" class="stave-svg grand-staff-svg" xmlns="http://www.w3.org/2000/svg">`;

    // 1. Classical Ornamental Curly Brace {
    svg += `
      <path d="M 46 26 C 36 26, 32 46, 32 76 C 32 90, 24 97, 18 97 C 24 97, 32 104, 32 118 C 32 148, 36 168, 46 168 C 40 168, 35 148, 35 118 C 35 101, 27 98, 22 97 C 27 96, 35 93, 35 76 C 35 46, 40 26, 46 26 Z" fill="var(--color-ink)" />
    `;

    // 2. Connecting Bar Lines
    svg += `<line x1="${startX}" y1="${trebleTopY}" x2="${startX}" y2="${bassTopY + 4 * lineSpacing}" stroke="var(--color-ink)" stroke-width="2" />`;
    svg += `<line x1="${endX}" y1="${trebleTopY}" x2="${endX}" y2="${bassTopY + 4 * lineSpacing}" stroke="var(--color-ink)" stroke-width="1.5" />`;

    // 3. Treble Stave 5 Lines
    for (let i = 0; i < 5; i++) {
      const y = trebleTopY + i * lineSpacing;
      svg += `<line x1="${startX}" y1="${y}" x2="${endX}" y2="${y}" stroke="var(--color-ink)" stroke-width="1.5" />`;
    }

    // 4. Bass Stave 5 Lines
    for (let i = 0; i < 5; i++) {
      const y = bassTopY + i * lineSpacing;
      svg += `<line x1="${startX}" y1="${y}" x2="${endX}" y2="${y}" stroke="var(--color-ink)" stroke-width="1.5" />`;
    }

    // 5. Clef Glyphs
    svg += `<text x="${startX + 10}" y="${trebleTopY + 42}" font-family="'Century Gothic', sans-serif" font-size="56" fill="var(--color-ink)" user-select="none">𝄞</text>`;
    svg += `<text x="${startX + 10}" y="${bassTopY + 36}" font-family="'Century Gothic', sans-serif" font-size="44" fill="var(--color-ink)" user-select="none">𝄢</text>`;

    // 6. Middle C Reference line guide
    const middleCY = 97;

    // 7. Render Notes
    const noteStartX = 180;
    const noteSpacing = 75;

    this.notes.forEach((note, index) => {
      const x = noteStartX + index * noteSpacing;
      const step = this.noteToDiatonicStep(note.pitch, note.octave);
      let y = middleCY;
      let isStemUp = true;
      let ledgerLines = '';

      // Route note to Treble or Bass stave
      if (step > 0) {
        // Treble stave note (D4 and above)
        // E4 is step 2, Y = 76
        const stepsFromE4 = step - 2;
        y = (trebleTopY + 4 * lineSpacing) - (stepsFromE4 * 6);
        isStemUp = step < 6; // stem down for B4 (step 6) and above

        // Treble ledger lines above line 5 (step 10 = F5, Y = 28)
        if (step > 10) {
          for (let s = 12; s <= step; s += 2) {
            const ly = (trebleTopY + 4 * lineSpacing) - ((s - 2) * 6);
            ledgerLines += `<line x1="${x - 14}" y1="${ly}" x2="${x + 14}" y2="${ly}" stroke="var(--color-ink)" stroke-width="1.5" />`;
          }
        }
      } else if (step < 0) {
        // Bass stave note (B3 and below)
        // G2 is step -10, Y = 166; A3 is step -2, Y = 118
        const stepsFromG2 = step - (-10);
        y = (bassTopY + 4 * lineSpacing) - (stepsFromG2 * 6);
        isStemUp = step < -6; // stem down for D3 (step -6) and above

        // Bass ledger lines below line 1 (step -10 = G2, Y = 166)
        if (step < -10) {
          for (let s = -12; s >= step; s -= 2) {
            const ly = (bassTopY + 4 * lineSpacing) - ((s - (-10)) * 6);
            ledgerLines += `<line x1="${x - 14}" y1="${ly}" x2="${x + 14}" y2="${ly}" stroke="var(--color-ink)" stroke-width="1.5" />`;
          }
        }
      } else {
        // Step 0 = Middle C (C4)
        y = middleCY;
        isStemUp = true;
        // Middle C ledger line
        ledgerLines += `<line x1="${x - 15}" y1="${middleCY}" x2="${x + 15}" y2="${middleCY}" stroke="var(--color-ink)" stroke-width="1.8" />`;
      }

      // Append ledger lines
      svg += ledgerLines;

      // Accidental
      if (note.accidental) {
        const sym = (note.accidental === '#' || note.accidental === '♯') ? '♯' : '♭';
        svg += `<text x="${x - 18}" y="${y + 5}" font-size="20" fill="var(--color-accent)" text-anchor="middle" font-weight="bold">${sym}</text>`;
      }

      // Notehead & Stem
      const noteStr = `${note.pitch}${note.accidental || ''}${note.octave}`;
      svg += `
        <g class="stave-note-group" onclick="window.staveEngine && window.staveEngine.handleNoteClick('${noteStr}')" style="cursor: pointer;">
          <ellipse cx="${x}" cy="${y}" rx="8.5" ry="5.8" transform="rotate(-20 ${x} ${y})" fill="var(--color-ink)" class="notehead" />
          <line x1="${isStemUp ? x + 7.5 : x - 7.5}" y1="${y}" x2="${isStemUp ? x + 7.5 : x - 7.5}" y2="${isStemUp ? y - 36 : y + 36}" stroke="var(--color-ink)" stroke-width="2" class="notestem" />
        </g>
      `;

      // Pitch label below grand staff
      svg += `<text x="${x}" y="${height - 10}" class="stave-note-label" text-anchor="middle" font-size="12" font-weight="700">${noteStr}</text>`;
    });

    svg += '</svg>';
    this.container.innerHTML = svg;
  }

  // --- SINGLE CLEF RENDERING (Treble, Bass, Alto, Tenor) ---
  renderSingleClefStaff() {
    const width = 640;
    const height = 150;
    const startX = 30;
    const endX = width - 24;
    const topLineY = 45;
    const lineSpacing = 12;

    const clefBottomLineStep = {
      treble: 2,   // E4
      bass: -10,  // G2
      alto: -4,   // F3
      tenor: -6   // D3
    };

    let svg = `<svg viewBox="0 0 ${width} ${height}" class="stave-svg" xmlns="http://www.w3.org/2000/svg">`;

    // 5 Lines
    for (let i = 0; i < 5; i++) {
      const y = topLineY + i * lineSpacing;
      svg += `<line x1="${startX}" y1="${y}" x2="${endX}" y2="${y}" stroke="var(--color-ink)" stroke-width="1.5" />`;
    }

    // Clef symbol
    if (this.currentClef === 'treble') {
      svg += `<text x="${startX + 10}" y="${topLineY + 42}" font-family="'Century Gothic', sans-serif" font-size="54" fill="var(--color-ink)">𝄞</text>`;
      svg += `<text x="${startX + 60}" y="${topLineY + 40}" font-size="11" fill="var(--color-muted)">Treble Clef (G4 on line 2)</text>`;
    } else if (this.currentClef === 'bass') {
      svg += `<text x="${startX + 10}" y="${topLineY + 36}" font-family="'Century Gothic', sans-serif" font-size="44" fill="var(--color-ink)">𝄢</text>`;
      svg += `<text x="${startX + 60}" y="${topLineY + 40}" font-size="11" fill="var(--color-muted)">Bass Clef (F3 on line 4)</text>`;
    } else if (this.currentClef === 'alto') {
      svg += `<text x="${startX + 10}" y="${topLineY + 38}" font-family="'Century Gothic', sans-serif" font-size="44" fill="var(--color-accent)">𝄡</text>`;
      svg += `<text x="${startX + 60}" y="${topLineY + 40}" font-size="11" fill="var(--color-accent)" font-weight="600">Alto Clef (Middle C on line 3)</text>`;
    } else if (this.currentClef === 'tenor') {
      svg += `<text x="${startX + 10}" y="${topLineY + 26}" font-family="'Century Gothic', sans-serif" font-size="44" fill="var(--color-accent)">𝄡</text>`;
      svg += `<text x="${startX + 60}" y="${topLineY + 40}" font-size="11" fill="var(--color-accent)" font-weight="600">Tenor Clef (Middle C on line 4)</text>`;
    }

    // Notes
    const bottomLineStep = clefBottomLineStep[this.currentClef];
    const bottomLineY = topLineY + 4 * lineSpacing;
    const noteStartX = 180;
    const noteSpacing = 75;

    this.notes.forEach((note, index) => {
      const x = noteStartX + index * noteSpacing;
      const step = this.noteToDiatonicStep(note.pitch, note.octave);
      const stepsFromBottom = step - bottomLineStep;
      const y = bottomLineY - (stepsFromBottom * 6);
      const isStemUp = stepsFromBottom < 4;

      // Ledger lines
      const topLineStep = bottomLineStep + 8;
      if (step < bottomLineStep) {
        for (let s = bottomLineStep - 2; s >= step; s -= 2) {
          const ly = bottomLineY - ((s - bottomLineStep) * 6);
          svg += `<line x1="${x - 14}" y1="${ly}" x2="${x + 14}" y2="${ly}" stroke="var(--color-ink)" stroke-width="1.5" />`;
        }
      }
      if (step > topLineStep) {
        for (let s = topLineStep + 2; s <= step; s += 2) {
          const ly = bottomLineY - ((s - bottomLineStep) * 6);
          svg += `<line x1="${x - 14}" y1="${ly}" x2="${x + 14}" y2="${ly}" stroke="var(--color-ink)" stroke-width="1.5" />`;
        }
      }

      // Accidental
      if (note.accidental) {
        const sym = (note.accidental === '#' || note.accidental === '♯') ? '♯' : '♭';
        svg += `<text x="${x - 18}" y="${y + 5}" font-size="20" fill="var(--color-accent)" text-anchor="middle" font-weight="bold">${sym}</text>`;
      }

      // Notehead
      const noteStr = `${note.pitch}${note.accidental || ''}${note.octave}`;
      svg += `
        <g class="stave-note-group" onclick="window.staveEngine && window.staveEngine.handleNoteClick('${noteStr}')" style="cursor: pointer;">
          <ellipse cx="${x}" cy="${y}" rx="8.5" ry="5.8" transform="rotate(-20 ${x} ${y})" fill="var(--color-ink)" class="notehead" />
          <line x1="${isStemUp ? x + 7.5 : x - 7.5}" y1="${y}" x2="${isStemUp ? x + 7.5 : x - 7.5}" y2="${isStemUp ? y - 36 : y + 36}" stroke="var(--color-ink)" stroke-width="2" class="notestem" />
        </g>
      `;

      svg += `<text x="${x}" y="${height - 12}" class="stave-note-label" text-anchor="middle" font-size="12" font-weight="700">${noteStr}</text>`;
    });

    svg += '</svg>';
    this.container.innerHTML = svg;
  }
}

window.MusicalStave = MusicalStave;
