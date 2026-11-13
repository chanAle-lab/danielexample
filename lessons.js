/**
 * MusicTheory101 Comprehensive Curriculum & Lesson Content
 */

const LESSONS_DATA = [
  {
    id: 'lesson-1',
    number: '01',
    title: 'The 12 Notes & The Musical Alphabet',
    tag: 'Fundamentals',
    icon: '🎵',
    summary: 'Discover the building blocks of all Western music: the 12 chromatic pitches and the octave.',
    content: `
      <h2>The Building Blocks: The 12 Notes</h2>
      <p>In Western music, almost everything you hear—from classical symphonies to modern hip hop—is constructed from just <strong>12 unique pitches</strong> repeated in higher and lower registers called <strong>octaves</strong>.</p>
      
      <div class="callout-box">
        <strong>The Musical Alphabet:</strong> Uses only letters <code>A, B, C, D, E, F, G</code>, plus their sharp (♯) and flat (♭) variations.
      </div>

      <h3>Natural Notes vs. Accidentals</h3>
      <p>On a piano keyboard:</p>
      <ul>
        <li><strong>White keys (Natural Notes):</strong> <code>C, D, E, F, G, A, B</code></li>
        <li><strong>Black keys (Accidentals):</strong> Altered pitches between natural notes.</li>
      </ul>

      <div class="theory-comparison-grid">
        <div class="theory-card">
          <h4>♯ Sharp ("Higher")</h4>
          <p>Raises a note by <strong>one half step</strong> (the very next adjacent key to the right).</p>
          <p class="example-badge">Example: C ➔ C♯</p>
        </div>
        <div class="theory-card">
          <h4>♭ Flat ("Lower")</h4>
          <p>Lowers a note by <strong>one half step</strong> (the very next adjacent key to the left).</p>
          <p class="example-badge">Example: D ➔ D♭</p>
        </div>
      </div>

      <h3>Enharmonic Equivalents</h3>
      <p>Notice that <strong>C♯</strong> and <strong>D♭</strong> are the exact same physical black key and produce the exact same frequency! When two different note names share the same pitch, they are called <strong>enharmonic equivalents</strong>.</p>

      <div class="interactive-demo-card">
        <h4>Try it on the Piano:</h4>
        <p>Click below to audition the 12 chromatic notes in sequence:</p>
        <div class="button-group">
          <button class="btn btn-primary" onclick="window.app.playChromaticDemo()">▶ Play Chromatic Scale</button>
          <button class="btn btn-secondary" onclick="window.app.highlightNaturals()">Highlight Natural Notes (White Keys)</button>
        </div>
      </div>
    `
  },
  {
    id: 'lesson-2',
    number: '02',
    title: 'Half Steps & Whole Steps',
    tag: 'Distance & Pitch',
    icon: '📏',
    summary: 'Understand the fundamental units of musical distance: semitones and whole tones.',
    content: `
      <h2>Measuring Musical Distance</h2>
      <p>Just like inches or centimeters measure physical distance, <strong>Half Steps (Semitones)</strong> and <strong>Whole Steps (Whole tones)</strong> measure musical distance between pitches.</p>

      <div class="theory-grid-2">
        <div class="theory-card highlight-border">
          <h3>Half Step (H) / Semitone</h3>
          <p>The smallest interval in standard Western music. It is the distance from any key to the <strong>immediate neighbor key</strong> (black or white).</p>
          <ul>
            <li><strong>C to C♯</strong> is a half step</li>
            <li><strong>E to F</strong> is a natural half step (no black key between them!)</li>
            <li><strong>B to C</strong> is also a natural half step</li>
          </ul>
        </div>

        <div class="theory-card highlight-border">
          <h3>Whole Step (W) / Whole Tone</h3>
          <p>Equal to <strong>two half steps</strong>. You skip exactly one key in between.</p>
          <ul>
            <li><strong>C to D</strong> is a whole step (skips C♯)</li>
            <li><strong>D to E</strong> is a whole step (skips D♯)</li>
            <li><strong>E to F♯</strong> is a whole step (skips F)</li>
          </ul>
        </div>
      </div>

      <div class="callout-box info-box">
        💡 <strong>Pro Tip:</strong> Look at the keyboard! Notice where there are NO black keys: between <strong>B-C</strong> and <strong>E-F</strong>. Remembering these two pairs is one of the biggest shortcuts in music theory!
      </div>

      <div class="interactive-demo-card">
        <h4>Interactive Demonstration</h4>
        <p>Hear the difference between a Half Step (tense, close) and a Whole Step (open, balanced):</p>
        <div class="button-group">
          <button class="btn btn-accent" onclick="window.app.playStepDemo('half')">▶ Audition Half Step (C4 to C♯4)</button>
          <button class="btn btn-accent" onclick="window.app.playStepDemo('whole')">▶ Audition Whole Step (C4 to D4)</button>
        </div>
      </div>
    `
  },
  {
    id: 'lesson-3',
    number: '03',
    title: 'The Major Scale & Formula',
    tag: 'Scales',
    icon: '☀️',
    summary: 'The happiest, most foundational scale in music: W-W-H-W-W-W-H.',
    content: `
      <h2>The Queen of Music: The Major Scale</h2>
      <p>The Major scale sounds bright, uplifting, resolved, and familiar. Most famous melodies (like "Do-Re-Mi", "Joy to the World", and "Happy Birthday") are based on it.</p>

      <h3>The Master Formula</h3>
      <p>You can start on <em>any note</em> on the piano. If you follow this universal sequence of steps, you will construct a perfect Major scale:</p>

      <div class="formula-banner">
        <span class="formula-step">W</span> -
        <span class="formula-step">W</span> -
        <span class="formula-step">H</span> -
        <span class="formula-step">W</span> -
        <span class="formula-step">W</span> -
        <span class="formula-step">W</span> -
        <span class="formula-step">H</span>
      </div>

      <h3>Example: The C Major Scale</h3>
      <p>Starting on <strong>C</strong>:</p>
      <ul>
        <li>Start on <strong>C</strong></li>
        <li>Whole step ➔ <strong>D</strong></li>
        <li>Whole step ➔ <strong>E</strong></li>
        <li>Half step ➔ <strong>F</strong></li>
        <li>Whole step ➔ <strong>G</strong></li>
        <li>Whole step ➔ <strong>A</strong></li>
        <li>Whole step ➔ <strong>B</strong></li>
        <li>Half step ➔ <strong>C</strong> (Octave)</li>
      </ul>
      <p>That is why <strong>C Major has zero sharps and zero flats</strong>—it is purely the white keys!</p>

      <div class="interactive-demo-card">
        <h4>Audition Major Scales</h4>
        <div class="button-group">
          <button class="btn btn-primary" onclick="window.app.playScale('C', 'major')">▶ Play C Major Scale</button>
          <button class="btn btn-secondary" onclick="window.app.playScale('G', 'major')">▶ Play G Major Scale (has F♯)</button>
          <button class="btn btn-secondary" onclick="window.app.playScale('F', 'major')">▶ Play F Major Scale (has B♭)</button>
        </div>
      </div>
    `
  },
  {
    id: 'lesson-4',
    number: '04',
    title: 'The Minor Scales: Natural, Harmonic & Melodic',
    tag: 'Scales',
    icon: '🌙',
    summary: 'Explore emotional, darker, and melancholic tonalities through minor scales.',
    content: `
      <h2>The World of Minor Scales</h2>
      <p>While major scales feel bright and heroic, minor scales often evoke sorrow, mystery, tension, or introspection. There are three primary forms of the minor scale:</p>

      <div class="theory-comparison-grid">
        <div class="theory-card">
          <h4>1. Natural Minor (Aeolian)</h4>
          <p class="formula-tag">W - H - W - W - H - W - W</p>
          <p>The standard relative minor. <strong>A Minor</strong> shares the exact same notes as C Major (no sharps/flats), but begins and resolves on A.</p>
        </div>

        <div class="theory-card">
          <h4>2. Harmonic Minor</h4>
          <p class="formula-tag">Raised 7th Degree</p>
          <p>Raises the 7th note by a half step to create a leading tone. Gives that distinctive dramatic, exotic or classical flavor (e.g. Beethoven, flamenco).</p>
        </div>

        <div class="theory-card">
          <h4>3. Melodic Minor</h4>
          <p class="formula-tag">Raised 6th & 7th</p>
          <p>Raises both the 6th and 7th notes ascending, and reverts to natural minor descending. Common in jazz and vocal music.</p>
        </div>
      </div>

      <div class="interactive-demo-card">
        <h4>Compare the 3 Flavors of A Minor:</h4>
        <div class="button-group">
          <button class="btn btn-accent" onclick="window.app.playScale('A', 'minor')">▶ A Natural Minor</button>
          <button class="btn btn-accent" onclick="window.app.playScale('A', 'harmonic_minor')">▶ A Harmonic Minor</button>
          <button class="btn btn-accent" onclick="window.app.playScale('A', 'melodic_minor')">▶ A Melodic Minor</button>
        </div>
      </div>
    `
  },
  {
    id: 'lesson-5',
    number: '05',
    title: 'Musical Intervals & Song Mnemonics',
    tag: 'Intervals',
    icon: '🎯',
    summary: 'Train your ear to recognize the distance between any two notes using famous songs.',
    content: `
      <h2>What is an Interval?</h2>
      <p>An <strong>interval</strong> is the distance in pitch between two notes. Intervals can be played sequentially (melodic interval) or at the same time (harmonic interval).</p>

      <h3>Complete Interval Cheat Sheet & Mnemonics:</h3>
      <div class="table-responsive">
        <table class="theory-table">
          <thead>
            <tr>
              <th>Interval</th>
              <th>Semitones</th>
              <th>Sound Quality</th>
              <th>Famous Song Memory Hook</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Minor 2nd (m2)</strong></td>
              <td>1</td>
              <td>Tense, suspenseful</td>
              <td><em>"Jaws" Theme</em> (Duh-dum...)</td>
            </tr>
            <tr>
              <td><strong>Major 2nd (M2)</strong></td>
              <td>2</td>
              <td>Stepping, natural</td>
              <td><em>"Happy Birthday"</em> (Happy - birth...)</td>
            </tr>
            <tr>
              <td><strong>Minor 3rd (m3)</strong></td>
              <td>3</td>
              <td>Somber, bluesy</td>
              <td><em>"Greensleeves"</em> / <em>"Seven Nation Army"</em></td>
            </tr>
            <tr>
              <td><strong>Major 3rd (M3)</strong></td>
              <td>4</td>
              <td>Bright, uplifting</td>
              <td><em>"When the Saints Go Marching In"</em></td>
            </tr>
            <tr>
              <td><strong>Perfect 4th (P4)</strong></td>
              <td>5</td>
              <td>Open, heraldic</td>
              <td><em>"Here Comes the Bride"</em> / <em>"Amazing Grace"</em></td>
            </tr>
            <tr>
              <td><strong>Tritone / Dim 5th</strong></td>
              <td>6</td>
              <td>Dissonant, unstable</td>
              <td><em>"The Simpsons" Theme</em> (The - Simp...)</td>
            </tr>
            <tr>
              <td><strong>Perfect 5th (P5)</strong></td>
              <td>7</td>
              <td>Power, strength, consonant</td>
              <td><em>"Star Wars" Main Theme</em> / <em>"Twinkle Twinkle"</em></td>
            </tr>
            <tr>
              <td><strong>Major 6th (M6)</strong></td>
              <td>9</td>
              <td>Warm, sweet</td>
              <td><em>"NBC Chimes"</em> / <em>"My Bonnie Lies Over the Ocean"</em></td>
            </tr>
            <tr>
              <td><strong>Major 7th (M7)</strong></td>
              <td>11</td>
              <td>Piercing, yearning</td>
              <td><em>"Take On Me"</em> (chorus leap)</td>
            </tr>
            <tr>
              <td><strong>Octave (P8)</strong></td>
              <td>12</td>
              <td>Pure, identical pitch class</td>
              <td><em>"Somewhere Over the Rainbow"</em></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="interactive-demo-card">
        <h4>Audition Key Intervals:</h4>
        <div class="button-group">
          <button class="btn btn-secondary" onclick="window.app.playIntervalDemo('m2')">Minor 2nd (Jaws)</button>
          <button class="btn btn-secondary" onclick="window.app.playIntervalDemo('M3')">Major 3rd (Saints)</button>
          <button class="btn btn-primary" onclick="window.app.playIntervalDemo('P5')">Perfect 5th (Star Wars)</button>
          <button class="btn btn-secondary" onclick="window.app.playIntervalDemo('P8')">Octave (Rainbow)</button>
        </div>
      </div>
    `
  },
  {
    id: 'lesson-6',
    number: '06',
    title: 'Building Triads & Common Chords',
    tag: 'Harmony',
    icon: '🎹',
    summary: 'Stack intervals in thirds to build Major, Minor, Diminished, and Augmented triads.',
    content: `
      <h2>The Anatomy of a Chord</h2>
      <p>A <strong>chord</strong> is any harmonic set of pitches consisting of multiple notes that sound simultaneously. The most common chord type is a <strong>triad</strong> (three notes stacked in thirds):</p>
      
      <p class="formula-banner"><strong>Root</strong> (1) + <strong>Third</strong> (3) + <strong>Fifth</strong> (5)</p>

      <h3>The 4 Core Triad Qualities</h3>
      <div class="theory-comparison-grid">
        <div class="theory-card">
          <h4>Major Triad</h4>
          <span class="formula-tag">Root + Major 3rd + Perfect 5th</span>
          <p><strong>Formula:</strong> 1 - 3 - 5 (0 - 4 - 7 semitones)</p>
          <p><em>Example:</em> C - E - G. Bright, grounded, happy.</p>
        </div>

        <div class="theory-card">
          <h4>Minor Triad</h4>
          <span class="formula-tag">Root + Minor 3rd + Perfect 5th</span>
          <p><strong>Formula:</strong> 1 - ♭3 - 5 (0 - 3 - 7 semitones)</p>
          <p><em>Example:</em> C - E♭ - G. Darker, sad, emotional.</p>
        </div>

        <div class="theory-card">
          <h4>Diminished Triad</h4>
          <span class="formula-tag">Root + Minor 3rd + Diminished 5th</span>
          <p><strong>Formula:</strong> 1 - ♭3 - ♭5 (0 - 3 - 6 semitones)</p>
          <p><em>Example:</em> C - E♭ - G♭. Tense, eerie, urgent.</p>
        </div>

        <div class="theory-card">
          <h4>Augmented Triad</h4>
          <span class="formula-tag">Root + Major 3rd + Augmented 5th</span>
          <p><strong>Formula:</strong> 1 - 3 - ♯5 (0 - 4 - 8 semitones)</p>
          <p><em>Example:</em> C - E - G♯. Dreamy, floating, unresolved.</p>
        </div>
      </div>

      <div class="interactive-demo-card">
        <h4>Audition C Triads:</h4>
        <div class="button-group">
          <button class="btn btn-primary" onclick="window.app.playChordDemo('C', 'major')">C Major Triad</button>
          <button class="btn btn-secondary" onclick="window.app.playChordDemo('C', 'minor')">C Minor Triad</button>
          <button class="btn btn-accent" onclick="window.app.playChordDemo('C', 'diminished')">C Diminished</button>
          <button class="btn btn-accent" onclick="window.app.playChordDemo('C', 'augmented')">C Augmented</button>
        </div>
      </div>
    `
  },
  {
    id: 'lesson-7',
    number: '07',
    title: 'The Circle of Fifths & Progressions',
    tag: 'Key Signatures',
    icon: '⭕',
    summary: 'The ultimate visual compass for navigating keys, signatures, and chord progressions.',
    content: `
      <h2>The Map of Music: Circle of Fifths</h2>
      <p>The <strong>Circle of Fifths</strong> arranges all 12 tones in a circle where each step clockwise is a <strong>Perfect Fifth up</strong> (7 semitones), and counter-clockwise is a <strong>Fourth up / Fifth down</strong>.</p>

      <h3>Why is it so powerful?</h3>
      <ul>
        <li><strong>Key Signatures:</strong> Moving clockwise adds 1 Sharp (♯). Moving counter-clockwise adds 1 Flat (♭).</li>
        <li><strong>Relative Minor:</strong> Inside each major key sits its relative minor (e.g. C Major ➔ A Minor).</li>
        <li><strong>Harmonic Neighbors:</strong> Chords adjacent on the wheel sound naturally harmonious together.</li>
      </ul>

      <h3>The Famous I - IV - V Progression</h3>
      <p>Look at <strong>C Major</strong> on the circle. Right next to it are <strong>F (IV)</strong> and <strong>G (V)</strong>! Together, <strong>I - IV - V</strong> (C, F, G) form the foundation of thousands of pop, rock, and folk hits.</p>

      <div class="interactive-demo-card">
        <h4>Explore the Interactive Wheel Tool</h4>
        <p>Switch over to the <strong>Circle of Fifths Tab</strong> at the top to interactively click any key, see its accidentals, and play its chords!</p>
        <button class="btn btn-primary" onclick="window.app.switchTab('circle')">Open Circle of Fifths Tool ➔</button>
      </div>
    `
  },
  {
    id: 'lesson-8',
    number: '08',
    title: 'Rhythm, Meter & Time Signatures',
    tag: 'Rhythm',
    icon: '⏳',
    summary: 'Music is pitch plus time. Master note values, beats, and time signatures.',
    content: `
      <h2>Rhythm: The Heartbeat of Music</h2>
      <p>Pitch gives music color, but rhythm gives music life and movement. Rhythm is organized by <strong>meter</strong> and <strong>tempo</strong> (beats per minute or BPM).</p>

      <h3>Note Durations</h3>
      <div class="theory-comparison-grid">
        <div class="theory-card">
          <h4>Whole Note (𝅝)</h4>
          <p>4 beats in 4/4 time</p>
        </div>
        <div class="theory-card">
          <h4>Half Note (𝅗𝅥)</h4>
          <p>2 beats in 4/4 time</p>
        </div>
        <div class="theory-card">
          <h4>Quarter Note (♩)</h4>
          <p>1 beat in 4/4 time</p>
        </div>
        <div class="theory-card">
          <h4>Eighth Note (♪)</h4>
          <p>1/2 beat in 4/4 time</p>
        </div>
      </div>

      <h3>Understanding Time Signatures</h3>
      <p>A time signature appears at the start of sheet music (e.g., <strong>4/4</strong>, <strong>3/4</strong>, <strong>6/8</strong>):</p>
      <ul>
        <li><strong>Top Number:</strong> How many beats per measure (e.g. 4 beats, 3 beats).</li>
        <li><strong>Bottom Number:</strong> Which note value gets one beat (4 = quarter note, 8 = eighth note).</li>
      </ul>

      <div class="interactive-demo-card">
        <h4>Practice with the Built-in Metronome</h4>
        <p>Use the integrated metronome in the Practice Tools section to lock in your internal clock at different BPMs!</p>
        <button class="btn btn-accent" onclick="window.app.switchTab('tools')">Open Metronome & Tools ➔</button>
      </div>
    `
  }
];

window.LESSONS_DATA = LESSONS_DATA;
