/**
 * MusicTheory101 Interactive Circle of Fifths
 */

class CircleOfFifthsWidget {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.onSelectKey = options.onSelectKey || null;
    this.selectedKeyIndex = 0; // 0 = C Major

    this.keys = [
      {
        name: 'C',
        minor: 'Am',
        sharpsFlats: 'No sharps / flats',
        accidentals: [],
        notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        chords: [
          { degree: 'I', name: 'C', notes: ['C4', 'E4', 'G4'] },
          { degree: 'ii', name: 'Dm', notes: ['D4', 'F4', 'A4'] },
          { degree: 'iii', name: 'Em', notes: ['E4', 'G4', 'B4'] },
          { degree: 'IV', name: 'F', notes: ['F4', 'A4', 'C5'] },
          { degree: 'V', name: 'G', notes: ['G4', 'B4', 'D5'] },
          { degree: 'vi', name: 'Am', notes: ['A4', 'C5', 'E5'] },
          { degree: 'vii°', name: 'Bdim', notes: ['B4', 'D5', 'F5'] }
        ]
      },
      {
        name: 'G',
        minor: 'Em',
        sharpsFlats: '1 Sharp (F♯)',
        accidentals: ['F#'],
        notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
        chords: [
          { degree: 'I', name: 'G', notes: ['G3', 'B3', 'D4'] },
          { degree: 'ii', name: 'Am', notes: ['A3', 'C4', 'E4'] },
          { degree: 'iii', name: 'Bm', notes: ['B3', 'D4', 'F#4'] },
          { degree: 'IV', name: 'C', notes: ['C4', 'E4', 'G4'] },
          { degree: 'V', name: 'D', notes: ['D4', 'F#4', 'A4'] },
          { degree: 'vi', name: 'Em', notes: ['E4', 'G4', 'B4'] },
          { degree: 'vii°', name: 'F#dim', notes: ['F#4', 'A4', 'C5'] }
        ]
      },
      {
        name: 'D',
        minor: 'Bm',
        sharpsFlats: '2 Sharps (F♯, C♯)',
        accidentals: ['F#', 'C#'],
        notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
        chords: [
          { degree: 'I', name: 'D', notes: ['D4', 'F#4', 'A4'] },
          { degree: 'ii', name: 'Em', notes: ['E4', 'G4', 'B4'] },
          { degree: 'iii', name: 'F#m', notes: ['F#4', 'A4', 'C#5'] },
          { degree: 'IV', name: 'G', notes: ['G4', 'B4', 'D5'] },
          { degree: 'V', name: 'A', notes: ['A4', 'C#5', 'E5'] },
          { degree: 'vi', name: 'Bm', notes: ['B4', 'D5', 'F#5'] },
          { degree: 'vii°', name: 'C#dim', notes: ['C#4', 'E4', 'G4'] }
        ]
      },
      {
        name: 'A',
        minor: 'F♯m',
        sharpsFlats: '3 Sharps (F♯, C♯, G♯)',
        accidentals: ['F#', 'C#', 'G#'],
        notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
        chords: [
          { degree: 'I', name: 'A', notes: ['A3', 'C#4', 'E4'] },
          { degree: 'ii', name: 'Bm', notes: ['B3', 'D4', 'F#4'] },
          { degree: 'iii', name: 'C#m', notes: ['C#4', 'E4', 'G#4'] },
          { degree: 'IV', name: 'D', notes: ['D4', 'F#4', 'A4'] },
          { degree: 'V', name: 'E', notes: ['E4', 'G#4', 'B4'] },
          { degree: 'vi', name: 'F#m', notes: ['F#4', 'A4', 'C#5'] },
          { degree: 'vii°', name: 'G#dim', notes: ['G#3', 'B3', 'D4'] }
        ]
      },
      {
        name: 'E',
        minor: 'C♯m',
        sharpsFlats: '4 Sharps (F♯, C♯, G♯, D♯)',
        accidentals: ['F#', 'C#', 'G#', 'D#'],
        notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
        chords: [
          { degree: 'I', name: 'E', notes: ['E3', 'G#3', 'B3'] },
          { degree: 'ii', name: 'F#m', notes: ['F#3', 'A3', 'C#4'] },
          { degree: 'iii', name: 'G#m', notes: ['G#3', 'B3', 'D#4'] },
          { degree: 'IV', name: 'A', notes: ['A3', 'C#4', 'E4'] },
          { degree: 'V', name: 'B', notes: ['B3', 'D#4', 'F#4'] },
          { degree: 'vi', name: 'C#m', notes: ['C#4', 'E4', 'G#4'] },
          { degree: 'vii°', name: 'D#dim', notes: ['D#4', 'F#4', 'A4'] }
        ]
      },
      {
        name: 'B',
        minor: 'G♯m',
        sharpsFlats: '5 Sharps (F♯, C♯, G♯, D♯, A♯)',
        accidentals: ['F#', 'C#', 'G#', 'D#', 'A#'],
        notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
        chords: [
          { degree: 'I', name: 'B', notes: ['B3', 'D#4', 'F#4'] },
          { degree: 'ii', name: 'C#m', notes: ['C#4', 'E4', 'G#4'] },
          { degree: 'iii', name: 'D#m', notes: ['D#4', 'F#4', 'A#4'] },
          { degree: 'IV', name: 'E', notes: ['E4', 'G#4', 'B4'] },
          { degree: 'V', name: 'F#', notes: ['F#4', 'A#4', 'C#5'] },
          { degree: 'vi', name: 'G#m', notes: ['G#4', 'B4', 'D#5'] },
          { degree: 'vii°', name: 'A#dim', notes: ['A#3', 'C#4', 'E4'] }
        ]
      },
      {
        name: 'F♯ / G♭',
        minor: 'D♯m',
        sharpsFlats: '6 Sharps / 6 Flats',
        accidentals: ['F#', 'C#', 'G#', 'D#', 'A#', 'E#'],
        notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
        chords: [
          { degree: 'I', name: 'F#', notes: ['F#3', 'A#3', 'C#4'] },
          { degree: 'ii', name: 'G#m', notes: ['G#3', 'B3', 'D#4'] },
          { degree: 'iii', name: 'A#m', notes: ['A#3', 'C#4', 'E#4'] },
          { degree: 'IV', name: 'B', notes: ['B3', 'D#4', 'F#4'] },
          { degree: 'V', name: 'C#', notes: ['C#4', 'E#4', 'G#4'] },
          { degree: 'vi', name: 'D#m', notes: ['D#4', 'F#4', 'A#4'] },
          { degree: 'vii°', name: 'E#dim', notes: ['F4', 'G#4', 'B4'] }
        ]
      },
      {
        name: 'D♭',
        minor: 'B♭m',
        sharpsFlats: '5 Flats (B♭, E♭, A♭, D♭, G♭)',
        accidentals: ['Bb', 'Eb', 'Ab', 'Db', 'Gb'],
        notes: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
        chords: [
          { degree: 'I', name: 'Db', notes: ['C#4', 'F4', 'G#4'] },
          { degree: 'ii', name: 'Ebm', notes: ['D#4', 'F#4', 'A#4'] },
          { degree: 'iii', name: 'Fm', notes: ['F4', 'G#4', 'C5'] },
          { degree: 'IV', name: 'Gb', notes: ['F#4', 'A#4', 'C#5'] },
          { degree: 'V', name: 'Ab', notes: ['G#4', 'C5', 'D#5'] },
          { degree: 'vi', name: 'Bbm', notes: ['A#4', 'C#5', 'F5'] },
          { degree: 'vii°', name: 'Cdim', notes: ['C4', 'D#4', 'F#4'] }
        ]
      },
      {
        name: 'A♭',
        minor: 'Fm',
        sharpsFlats: '4 Flats (B♭, E♭, A♭, D♭)',
        accidentals: ['Bb', 'Eb', 'Ab', 'Db'],
        notes: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
        chords: [
          { degree: 'I', name: 'Ab', notes: ['G#3', 'C4', 'D#4'] },
          { degree: 'ii', name: 'Bbm', notes: ['A#3', 'C#4', 'F4'] },
          { degree: 'iii', name: 'Cm', notes: ['C4', 'D#4', 'G4'] },
          { degree: 'IV', name: 'Db', notes: ['C#4', 'F4', 'G#4'] },
          { degree: 'V', name: 'Eb', notes: ['D#4', 'G4', 'A#4'] },
          { degree: 'vi', name: 'Fm', notes: ['F4', 'G#4', 'C5'] },
          { degree: 'vii°', name: 'Gdim', notes: ['G3', 'A#3', 'C#4'] }
        ]
      },
      {
        name: 'E♭',
        minor: 'Cm',
        sharpsFlats: '3 Flats (B♭, E♭, A♭)',
        accidentals: ['Bb', 'Eb', 'Ab'],
        notes: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
        chords: [
          { degree: 'I', name: 'Eb', notes: ['D#4', 'G4', 'A#4'] },
          { degree: 'ii', name: 'Fm', notes: ['F4', 'G#4', 'C5'] },
          { degree: 'iii', name: 'Gm', notes: ['G4', 'A#4', 'D5'] },
          { degree: 'IV', name: 'Ab', notes: ['G#4', 'C5', 'D#5'] },
          { degree: 'V', name: 'Bb', notes: ['A#4', 'D5', 'F5'] },
          { degree: 'vi', name: 'Cm', notes: ['C4', 'D#4', 'G4'] },
          { degree: 'vii°', name: 'Ddim', notes: ['D4', 'F4', 'G#4'] }
        ]
      },
      {
        name: 'B♭',
        minor: 'Gm',
        sharpsFlats: '2 Flats (B♭, E♭)',
        accidentals: ['Bb', 'Eb'],
        notes: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
        chords: [
          { degree: 'I', name: 'Bb', notes: ['A#3', 'D4', 'F4'] },
          { degree: 'ii', name: 'Cm', notes: ['C4', 'D#4', 'G4'] },
          { degree: 'iii', name: 'Dm', notes: ['D4', 'F4', 'A4'] },
          { degree: 'IV', name: 'Eb', notes: ['D#4', 'G4', 'A#4'] },
          { degree: 'V', name: 'F', notes: ['F4', 'A4', 'C5'] },
          { degree: 'vi', name: 'Gm', notes: ['G4', 'A#4', 'D5'] },
          { degree: 'vii°', name: 'Adim', notes: ['A3', 'C4', 'D#4'] }
        ]
      },
      {
        name: 'F',
        minor: 'Dm',
        sharpsFlats: '1 Flat (B♭)',
        accidentals: ['Bb'],
        notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
        chords: [
          { degree: 'I', name: 'F', notes: ['F3', 'A3', 'C4'] },
          { degree: 'ii', name: 'Gm', notes: ['G3', 'A#3', 'D4'] },
          { degree: 'iii', name: 'Am', notes: ['A3', 'C4', 'E4'] },
          { degree: 'IV', name: 'Bb', notes: ['A#3', 'D4', 'F4'] },
          { degree: 'V', name: 'C', notes: ['C4', 'E4', 'G4'] },
          { degree: 'vi', name: 'Dm', notes: ['D4', 'F4', 'A4'] },
          { degree: 'vii°', name: 'Edim', notes: ['E4', 'G4', 'A#4'] }
        ]
      }
    ];

    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="circle-widget-wrapper">
        <div class="circle-svg-container">
          <svg viewBox="0 0 400 400" class="circle-svg" id="circle-svg-wheel">
            <!-- Segments injected dynamically -->
          </svg>
        </div>
        <div class="circle-details-panel" id="circle-details">
          <!-- Key info injected dynamically -->
        </div>
      </div>
    `;

    this.renderSvgWheel();
    this.updateDetails();
  }

  renderSvgWheel() {
    const svg = document.getElementById('circle-svg-wheel');
    if (!svg) return;

    const cx = 200, cy = 200;
    const rOuter = 180, rMid = 125, rInner = 75;

    let pathsHtml = '';

    for (let i = 0; i < 12; i++) {
      // 12 segments = 30 deg each. Top is -90 deg
      const startAngle = (i * 30 - 15 - 90) * (Math.PI / 180);
      const endAngle = (i * 30 + 15 - 90) * (Math.PI / 180);
      const midAngle = (i * 30 - 90) * (Math.PI / 180);

      const isSelected = i === this.selectedKeyIndex;

      // Outer segment (Major key)
      const x1 = cx + rOuter * Math.cos(startAngle);
      const y1 = cy + rOuter * Math.sin(startAngle);
      const x2 = cx + rOuter * Math.cos(endAngle);
      const y2 = cy + rOuter * Math.sin(endAngle);
      const x3 = cx + rMid * Math.cos(endAngle);
      const y3 = cy + rMid * Math.sin(endAngle);
      const x4 = cx + rMid * Math.cos(startAngle);
      const y4 = cy + rMid * Math.sin(startAngle);

      const dOuter = `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rMid} ${rMid} 0 0 0 ${x4} ${y4} Z`;

      // Text position outer
      const textROuter = (rOuter + rMid) / 2;
      const txOuter = cx + textROuter * Math.cos(midAngle);
      const tyOuter = cy + textROuter * Math.sin(midAngle) + 5;

      // Inner segment (Relative minor)
      const ix1 = cx + rMid * Math.cos(startAngle);
      const iy1 = cy + rMid * Math.sin(startAngle);
      const ix2 = cx + rMid * Math.cos(endAngle);
      const iy2 = cy + rMid * Math.sin(endAngle);
      const ix3 = cx + rInner * Math.cos(endAngle);
      const iy3 = cy + rInner * Math.sin(endAngle);
      const ix4 = cx + rInner * Math.cos(startAngle);
      const iy4 = cy + rInner * Math.sin(startAngle);

      const dInner = `M ${ix1} ${iy1} A ${rMid} ${rMid} 0 0 1 ${ix2} ${iy2} L ${ix3} ${iy3} A ${rInner} ${rInner} 0 0 0 ${ix4} ${iy4} Z`;

      // Text position inner
      const textRInner = (rMid + rInner) / 2;
      const txInner = cx + textRInner * Math.cos(midAngle);
      const tyInner = cy + textRInner * Math.sin(midAngle) + 4;

      const keyData = this.keys[i];

      pathsHtml += `
        <g class="circle-slice ${isSelected ? 'active-slice' : ''}" data-index="${i}">
          <path d="${dOuter}" class="outer-segment" />
          <path d="${dInner}" class="inner-segment" />
          <text x="${txOuter}" y="${tyOuter}" class="slice-text outer-text">${keyData.name}</text>
          <text x="${txInner}" y="${tyInner}" class="slice-text inner-text">${keyData.minor}</text>
        </g>
      `;
    }

    // Center hub circle
    pathsHtml += `
      <circle cx="${cx}" cy="${cy}" r="${rInner - 5}" class="circle-center-hub" />
      <text x="${cx}" y="${cy - 8}" class="center-hub-title">Key of</text>
      <text x="${cx}" y="${cy + 18}" class="center-hub-key">${this.keys[this.selectedKeyIndex].name}</text>
    `;

    svg.innerHTML = pathsHtml;

    // Attach click listeners to slices
    svg.querySelectorAll('.circle-slice').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.index, 10);
        this.selectKey(idx);
      });
    });
  }

  selectKey(idx) {
    this.selectedKeyIndex = idx;
    this.renderSvgWheel();
    this.updateDetails();
    if (this.onSelectKey) {
      this.onSelectKey(this.keys[idx]);
    }
  }

  updateDetails() {
    const detailsEl = document.getElementById('circle-details');
    if (!detailsEl) return;
    const key = this.keys[this.selectedKeyIndex];

    detailsEl.innerHTML = `
      <div class="key-summary-header">
        <div>
          <h3>${key.name} Major <span class="relative-minor">/ ${key.minor}</span></h3>
          <p class="key-accidentals">${key.sharpsFlats}</p>
        </div>
        <div class="key-actions">
          <button class="btn btn-sm btn-primary" onclick="window.circleWidget.playTonicChord()">Play Tonic Chord</button>
          <button class="btn btn-sm btn-secondary" onclick="window.circleWidget.highlightOnPiano()">Show on Piano</button>
        </div>
      </div>

      <div class="scale-notes-row">
        <strong>Scale Notes:</strong>
        <div class="note-chips">
          ${key.notes.map((n, i) => `<span class="note-chip ${i === 0 ? 'root-chip' : ''}">${n}</span>`).join('')}
        </div>
      </div>

      <div class="diatonic-chords-section">
        <h4>Diatonic Chords in ${key.name} Major</h4>
        <div class="diatonic-chords-grid">
          ${key.chords.map(c => `
            <div class="chord-card" onclick="window.soundEngine.playChord(${JSON.stringify(c.notes).replace(/"/g, '&quot;')})">
              <span class="chord-degree">${c.degree}</span>
              <span class="chord-name">${c.name}</span>
              <span class="chord-listen">▶</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="progression-tip">
        <strong>Popular Progression:</strong> 
        <button class="btn-link" onclick="window.circleWidget.playProgression(['I', 'IV', 'V', 'I'])">I - IV - V - I</button> |
        <button class="btn-link" onclick="window.circleWidget.playProgression(['ii', 'V', 'I'])">ii - V - I (Jazz Standard)</button> |
        <button class="btn-link" onclick="window.circleWidget.playProgression(['I', 'V', 'vi', 'IV'])">I - V - vi - IV (Pop Anthem)</button>
      </div>
    `;
  }

  playTonicChord() {
    const key = this.keys[this.selectedKeyIndex];
    if (key.chords && key.chords[0]) {
      window.soundEngine.playChord(key.chords[0].notes, 1.2);
    }
  }

  highlightOnPiano() {
    const key = this.keys[this.selectedKeyIndex];
    if (!window.mainPiano) return;
    const highlights = {};
    key.notes.forEach((note, index) => {
      highlights[note] = {
        color: index === 0 ? '#ef4444' : '#3b82f6',
        badge: index === 0 ? 'Root' : `${index + 1}`,
        root: index === 0
      };
    });
    window.mainPiano.setHighlights(highlights);
  }

  playProgression(degreeList) {
    const key = this.keys[this.selectedKeyIndex];
    const chordsToPlay = degreeList.map(deg => key.chords.find(c => c.degree === deg)).filter(Boolean);

    chordsToPlay.forEach((c, index) => {
      setTimeout(() => {
        window.soundEngine.playChord(c.notes, 0.9);
      }, index * 950);
    });
  }
}

window.CircleOfFifthsWidget = CircleOfFifthsWidget;
