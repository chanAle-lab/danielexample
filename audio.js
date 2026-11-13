/**
 * MusicTheory101 Audio Engine
 * Powered by Web Audio API for zero-dependency, low-latency, polyphonic sound synthesis.
 * Supports Cadence playback, Ornaments (Trill, Turn, Mordent), Scales, and Chords.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.volume = 0.6;
    this.activeVoices = new Map();
    this.isMuted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  noteToFreq(note) {
    const noteMap = {
      'C': 0, 'C#': 1, 'DB': 1,
      'D': 2, 'D#': 3, 'EB': 3,
      'E': 4,
      'F': 5, 'F#': 6, 'GB': 6,
      'G': 7, 'G#': 8, 'AB': 8,
      'A': 9, 'A#': 10, 'BB': 10,
      'B': 11
    };

    const clean = note.toUpperCase().replace('♯', '#').replace('♭', 'B');
    const match = clean.match(/^([A-G][#B]?)(-?\d+)$/);
    if (!match) return 440;

    const pitch = match[1];
    const octave = parseInt(match[2], 10);
    const semitone = noteMap[pitch];
    if (semitone === undefined) return 440;

    const midi = (octave + 1) * 12 + semitone;
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  midiToNote(midi) {
    const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const pitch = names[midi % 12];
    const octave = Math.floor(midi / 12) - 1;
    return `${pitch}${octave}`;
  }

  startNote(note, velocity = 0.8) {
    this.init();
    const freq = typeof note === 'number' ? note : this.noteToFreq(note);
    const key = typeof note === 'number' ? note.toFixed(2) : note;

    if (this.activeVoices.has(key)) {
      this.stopNote(key);
    }

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, t);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, t);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(Math.min(freq * 4, 6000), t);
    filter.frequency.exponentialRampToValueAtTime(Math.max(freq * 1.5, 300), t + 1.2);

    const peakGain = 0.45 * velocity;
    gainNode.gain.setValueAtTime(0.0001, t);
    gainNode.gain.exponentialRampToValueAtTime(peakGain, t + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(peakGain * 0.45, t + 0.25);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, t + 2.5);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc1.start(t);
    osc2.start(t);

    const voice = { osc1, osc2, gainNode, filter, startTime: t };
    this.activeVoices.set(key, voice);

    setTimeout(() => {
      if (this.activeVoices.get(key) === voice) {
        this.stopNote(key);
      }
    }, 2600);
  }

  stopNote(note) {
    const key = typeof note === 'number' ? note.toFixed(2) : note;
    const voice = this.activeVoices.get(key);
    if (!voice || !this.ctx) return;

    const t = this.ctx.currentTime;
    try {
      voice.gainNode.gain.cancelScheduledValues(t);
      voice.gainNode.gain.setValueAtTime(voice.gainNode.gain.value, t);
      voice.gainNode.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
      setTimeout(() => {
        try {
          voice.osc1.stop();
          voice.osc2.stop();
          voice.osc1.disconnect();
          voice.osc2.disconnect();
          voice.filter.disconnect();
          voice.gainNode.disconnect();
        } catch (e) {}
      }, 160);
    } catch (e) {}
    this.activeVoices.delete(key);
  }

  playNote(note, duration = 0.5, velocity = 0.8) {
    this.startNote(note, velocity);
    setTimeout(() => {
      this.stopNote(note);
    }, duration * 1000);
  }

  playChord(notes, duration = 1.0, velocity = 0.7) {
    notes.forEach(note => {
      this.playNote(note, duration, velocity);
    });
  }

  playArpeggio(notes, noteDuration = 0.25, gap = 0.2, callback = null) {
    notes.forEach((note, index) => {
      setTimeout(() => {
        this.playNote(note, noteDuration, 0.8);
        if (callback) callback(note, index);
      }, index * (gap * 1000));
    });
  }

  // Play ABRSM Cadence (Chord 1 -> Pause -> Chord 2)
  playCadence(chord1, chord2) {
    this.playChord(chord1, 1.2, 0.75);
    setTimeout(() => {
      this.playChord(chord2, 1.8, 0.85);
    }, 1200);
  }

  // Play Ornament (Trill, Turn, Mordent)
  playOrnament(type, baseNote = 'C5') {
    const noteMap = {
      'C5': { base: 'C5', above: 'D5', below: 'B4' },
      'G4': { base: 'G4', above: 'A4', below: 'F#4' }
    };
    const set = noteMap[baseNote] || noteMap['C5'];

    if (type === 'trill') {
      const trillNotes = [set.base, set.above, set.base, set.above, set.base, set.above, set.base];
      this.playArpeggio(trillNotes, 0.12, 0.1);
    } else if (type === 'turn') {
      const turnNotes = [set.above, set.base, set.below, set.base];
      this.playArpeggio(turnNotes, 0.18, 0.16);
    } else if (type === 'upper_mordent') {
      const notes = [set.base, set.above, set.base];
      this.playArpeggio(notes, 0.14, 0.12);
    } else if (type === 'lower_mordent') {
      const notes = [set.base, set.below, set.base];
      this.playArpeggio(notes, 0.14, 0.12);
    } else if (type === 'acciaccatura') {
      this.playNote(set.above, 0.08, 0.6);
      setTimeout(() => this.playNote(set.base, 0.7, 0.9), 70);
    } else if (type === 'appoggiatura') {
      this.playNote(set.above, 0.4, 0.85);
      setTimeout(() => this.playNote(set.base, 0.5, 0.75), 380);
    }
  }

  playClick(isAccent = false) {
    this.init();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(isAccent ? 1200 : 800, t);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.06);
  }
}

window.soundEngine = new SoundEngine();
