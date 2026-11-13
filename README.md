# 🎹 MusicTheory101

> An interactive, audio-enabled, step-by-step music theory learning web application designed for students, musicians, and creators.

🌐 **Live Demo on GitHub Pages**: [https://chanale-lab.github.io/MusicTheory101/](https://chanale-lab.github.io/MusicTheory101/)

---

## ✨ Features

- **🎹 Interactive Virtual Piano Keyboard**:
  - Polyphonic sound engine using the browser's native **Web Audio API** (zero external dependencies).
  - Play with mouse click, touch drag, or computer keyboard (`A` through `K`).
  - Toggle key labels between pitch names (`C`, `D`, `E`), computer keys (`A`, `W`, `S`), or blank.
  - Dynamic scale degree and chord tone highlight overlays.

- **📖 8 Comprehensive Step-by-Step Lessons**:
  1. *The 12 Notes & The Musical Alphabet* (Naturals, Sharps, Flats, Enharmonics)
  2. *Half Steps & Whole Steps* (Interval distance, key layout)
  3. *The Major Scale & Formula* ($W-W-H-W-W-W-H$, Solfège)
  4. *Minor Scales* (Natural, Harmonic, and Melodic Minor)
  5. *Musical Intervals & Song Mnemonics* (From Minor 2nd to Octave with famous ear-training hooks)
  6. *Building Triads & Common Chords* (Major, Minor, Diminished, Augmented)
  7. *The Circle of Fifths & Progressions* (Key navigation, I-IV-V, ii-V-I)
  8. *Rhythm, Meter & Time Signatures* (Durations, 4/4, 3/4, 6/8, Tempo)

- **⭕ Interactive Circle of Fifths Tool**:
  - Full SVG 12-key circle wheel displaying Major keys and relative minors.
  - Click any key to inspect sharps/flats, scale tones, and full diatonic chords ($I, ii, iii, IV, V, vi, vii^\circ$).
  - One-click chord playback and popular progression player.

- **🛠️ Theory Explorers & Practice Tools**:
  - **Scale Explorer**: Select root and mode (Major, Minor, Harmonic Minor, Dorian, Phrygian, Lydian, Mixolydian, Pentatonic, Blues) to visualize and hear the scale.
  - **Chord Builder**: Audition triads, 7th chords, suspensions, and inversions (Root, 1st, 2nd).
  - **Metronome**: Precise Web Audio click metronome with adjustable BPM slider (40-220), Tap Tempo, visual flashing beat pulse, and multiple time signatures.

- **🎧 Ear Training & Quiz Mode**:
  - Test and sharpen musical ear across three training categories:
    - *Interval Recognition* (Minor 2nd up to Octave)
    - *Chord Quality Identification* (Major, Minor, Diminished, Augmented)
    - *Pitch Ear Test* (Natural notes)
  - Real-time score counter and streak tracker.

---

## 🚀 Running Locally

No build tools, bundlers, or package managers required! 

Simply open `index.html` in your favorite web browser:

```bash
# Optional: using Python's built-in web server
python -m http.server 8000
# Then open http://localhost:8000 in your browser
```

---

## 📦 Pushing to GitHub

To publish these changes to your GitHub repository and activate GitHub Pages:

```bash
git init
git remote add origin https://github.com/chanAle-lab/MusicTheory101.git
git branch -M main
git add .
git commit -m "feat: complete interactive MusicTheory101 application with Web Audio and lessons"
git push -u origin main
```

Once pushed, GitHub Pages will automatically host your live application at:
`https://chanale-lab.github.io/MusicTheory101/`
*(Make sure GitHub Pages is enabled under Repo Settings > Pages > Source: Deploy from branch `main` / root)*.
