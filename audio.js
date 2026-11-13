/**
 * MusicTheory101 Audio Engine
 * Powered by Web Audio API for zero-dependency, low-latency, polyphonic sound synthesis.
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
    // Note format: "C4", "F#3", "Bb5"
    const noteMap = {
      'C': 0, 'C#': 1, 'DB': 1,
      'D': 2, 'D#': 3, 'EB': 3,
      'E': 4,
      'F': 5, 'F#': 6, 'GB': 6,
      'G': 7, 'G#': 8, 'AB': 8,
      'A': 9, 'A#': 10, 'BB': 10,
      'B': 11
    };

    const match = note.toUpperCase().match(/^([A-G][#B]?)(-?\d+)$/);
    if (!match) return 440; // Default fallback A4

    const pitch = match[1];
    const octave = parseInt(match[2], 10);
    const semitone = noteMap[pitch];
    if (semitone === undefined) return 440;

    // MIDI note number: C4 is 60, A4 is 69
    const midi = (octave + 1) * 12 + semitone;
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  midiToNote(midi) {
    const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const pitch = names[midi % 12];
    const octave = Math.floor(midi / 12) - 1;
    return `${pitch}${octave}`;
  }

  // Play a note with piano-like timbre
  startNote(note, velocity = 0.8) {
    this.init();
    const freq = typeof note === 'number' ? note : this.noteToFreq(note);
    const key = typeof note === 'number' ? note.toFixed(2) : note;

    if (this.activeVoices.has(key)) {
      this.stopNote(key);
    }

    const t = this.ctx.currentTime;

    // Voice setup: Main oscillator (triangle) + harmonic overtone (sine) + sub oscillator
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, t);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, t); // 2nd harmonic

    // Filter to soften brightness naturally over time
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(Math.min(freq * 4, 6000), t);
    filter.frequency.exponentialRampToValueAtTime(Math.max(freq * 1.5, 300), t + 1.2);

    // Dynamic gain envelope (percussive piano strike)
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

    // Auto cleanup after 2.6s
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

  // Play simultaneous chord
  playChord(notes, duration = 1.0, velocity = 0.7) {
    notes.forEach(note => {
      this.playNote(note, duration, velocity);
    });
  }

  // Play arpeggio / sequence of notes
  playArpeggio(notes, noteDuration = 0.25, gap = 0.2, callback = null) {
    notes.forEach((note, index) => {
      setTimeout(() => {
        this.playNote(note, noteDuration, 0.8);
        if (callback) callback(note, index);
      }, index * (gap * 1000));
    });
  }

  // Metronome tick
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

// Global singleton instance
window.soundEngine = new SoundEngine();
