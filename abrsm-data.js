/**
 * ABRSM Music Theory Syllabus Data (Grades 1 to 5)
 * Official 2020+ Syllabus Specifications, Curriculum Modules, Terms Glossary,
 * Cadences, Ornaments, Clefs, Transposition, and Orchestral Instruments.
 */

const ABRSM_SYLLABUS = {
  1: {
    grade: 1,
    title: 'Grade 1: Fundamentals of Notation & Keys',
    badge: 'Beginner',
    summary: 'Master note values, simple time signatures (2/4, 3/4, 4/4), treble & bass clefs, and the major keys of C, G, D, and F.',
    checklist: [
      'Note values: Semibreve (whole note), Minim (half), Crotchet (quarter), Quaver (8th), Semiquaver (16th) & equivalent rests',
      'Tied notes and single-dotted notes',
      'Simple time signatures: 2/4, 3/4, 4/4 and bar-line note/rest groupings',
      'The stave, Treble (G) and Bass (F) clefs, Middle C in both clefs',
      'Accidentals: Sharp (♯), Flat (♭), Natural (♮) and their cancellation',
      'Major scales: C, G, D, F major with tone/semitone pattern (T-T-S-T-T-T-S)',
      'Tonic triads in root position for C, G, D, F major',
      'Scale degrees (1 to 7) & intervals above the tonic (by number only: 2nd, 3rd, 4th, 5th, etc.)',
      'Basic Italian terms and signs: tempo, dynamics, performance directions & articulation'
    ],
    keys: ['C Major', 'G Major', 'D Major', 'F Major'],
    timeSignatures: ['2/4', '3/4', '4/4'],
    clefs: ['treble', 'bass']
  },
  2: {
    grade: 2,
    title: 'Grade 2: Triplets, Ledger Lines & Relative Minors',
    badge: 'Elementary',
    summary: 'Expands into 2/2, 3/2, 4/2, 3/8, triplets, 2 ledger lines, relative minors, and harmonic minor scales of A, E, D.',
    checklist: [
      'Simple time signatures: 2/2, 3/2, 4/2 (minim beat) and 3/8 (quaver beat)',
      'Triplets and triplet note groups with rests',
      'Extension of the stave: two ledger lines above and below each stave',
      'Relative major and minor keys concept',
      'Construction of the minor scale (harmonic minor only for Grade 2)',
      'Major keys: A, B♭, E♭ major and their key signatures',
      'Minor keys: A, E, D harmonic minor and their key signatures',
      'Tonic triads in root position for all Grade 2 keys',
      'Scale degrees and intervals above the tonic (by number only)'
    ],
    keys: ['A Major', 'Bb Major', 'Eb Major', 'A Minor', 'E Minor', 'D Minor'],
    timeSignatures: ['2/2', '3/2', '4/2', '3/8'],
    clefs: ['treble', 'bass']
  },
  3: {
    grade: 3,
    title: 'Grade 3: Compound Time, Melodic Minor & Intervals',
    badge: 'Intermediate',
    summary: 'Introduces compound time (6/8, 9/8, 12/8), demisemiquavers, both harmonic & melodic minor forms, keys up to 4 sharps/flats, and interval qualities.',
    checklist: [
      'Compound time signatures: 6/8, 9/8, 12/8 and compound note/rest grouping',
      'Demisemiquaver (32nd note) and its equivalent rest',
      'Extension of the stave beyond two ledger lines',
      'Transposition at the octave between Treble and Bass clefs',
      'All major and minor keys up to 4 sharps and 4 flats (E, Ab major; B, F#, C#, c, f minor)',
      'Both Harmonic and Melodic forms of minor scales',
      'Tonic triads (root position) in all keys up to 4 sharps/flats',
      'Intervals above the tonic classified by number AND quality (Major, Minor, Perfect)'
    ],
    keys: ['E Major', 'Ab Major', 'B Minor', 'F# Minor', 'C# Minor', 'C Minor', 'F Minor'],
    timeSignatures: ['6/8', '9/8', '12/8'],
    clefs: ['treble', 'bass']
  },
  4: {
    grade: 4,
    title: 'Grade 4: Alto Clef, Technical Degrees, Ornaments & Orchestra',
    badge: 'Advanced Intermediate',
    summary: 'Features the Alto Clef, technical scale degrees (Tonic, Supertonic, etc.), chromatic scales, double sharps/flats, ornaments, and orchestral instruments.',
    checklist: [
      'All simple and compound duple, triple, and quadruple time signatures; the Breve (double whole note), double-dotted notes, and duplets',
      'Alto Clef (C clef centered on line 3, used by Viola); reading and octave transposition across treble, bass, and alto clefs',
      'Double sharp (𝄪) and double flat (𝄫) signs and cancellation; enharmonic equivalents',
      'Keys up to 5 sharps and 5 flats (B, Db major; G#, Bb minor)',
      'Technical names of diatonic degrees: Tonic, Supertonic, Mediant, Subdominant, Dominant, Submediant, Leading Note',
      'Construction of the chromatic scale',
      'All intervals (not exceeding an octave) between any two diatonic notes',
      'Triads and chords in root position on Tonic (I), Subdominant (IV), and Dominant (V)',
      'Recognition and naming of ornaments: Trill (tr), Turn, Upper/Lower Mordent, Acciaccatura, Appoggiatura',
      'Standard orchestral instruments and their instrument families'
    ],
    keys: ['B Major', 'Db Major', 'G# Minor', 'Bb Minor'],
    timeSignatures: ['All simple & compound', 'duplets', 'double-dotted'],
    clefs: ['treble', 'alto', 'bass']
  },
  5: {
    grade: 5,
    title: 'Grade 5: Tenor Clef, Inversions, Cadences & Transposition',
    badge: 'Pre-Diploma / Grade 5 Standard',
    summary: 'The capstone standard: Tenor Clef, transposing instruments (Bb, A, F), chord inversions (a, b, c), cadences (Perfect, Plagal, Imperfect), and irregular time signatures.',
    checklist: [
      'Irregular time signatures: 5/4, 7/4, 5/8, 7/8 and note grouping; irregular divisions (quintuplets, sextuplets, septuplets)',
      'Tenor Clef (C clef centered on line 4, used by Cello, Bassoon, Trombone in higher registers)',
      'Transposition across all 4 clefs (Treble, Bass, Alto, Tenor)',
      'Transposing instruments: Transposing to and from concert pitch for instruments in B♭, A, and F (Clarinet, Trumpet, Cor Anglais, French Horn)',
      'All major and minor keys up to 6 sharps and 6 flats (F#, F# minor, Gb, Eb minor)',
      'Compound intervals (intervals greater than an octave: 9th, 10th, 11th, etc.)',
      'Chord inversions: Root position (a / 5-3), 1st inversion (b / 6-3), and 2nd inversion (c / 6-4) of I, ii, IV, and V',
      'Cadences: Perfect (V - I), Plagal (IV - I), and Imperfect (I - V, ii - V, IV - V) in major keys of C, G, D, F',
      'Voice types (Soprano, Alto, Tenor, Bass) and standard vocal ranges',
      'General musical observation, score reading, instrument clefs & sound production'
    ],
    keys: ['F# Major', 'Gb Major', 'D# Minor', 'Eb Minor', 'All keys up to 6 ♯/♭'],
    timeSignatures: ['5/4', '7/4', '5/8', '7/8', 'quintuplets', 'sextuplets'],
    clefs: ['treble', 'bass', 'alto', 'tenor']
  }
};

// Technical Names for Diatonic Scale Degrees (ABRSM Grade 4 & 5)
const TECHNICAL_SCALE_DEGREES = [
  { degree: 1, roman: 'I', name: 'Tonic', role: 'Home keynote; provides harmonic center and rest.' },
  { degree: 2, roman: 'ii', name: 'Supertonic', role: 'Step above tonic; frequently leads into the dominant.' },
  { degree: 3, roman: 'iii', name: 'Mediant', role: 'Halfway between tonic and dominant; defines major or minor mood.' },
  { degree: 4, roman: 'IV', name: 'Subdominant', role: 'Fifth below tonic; crucial for plagal cadences.' },
  { degree: 5, roman: 'V', name: 'Dominant', role: 'Fifth above tonic; strongest pull to resolve to tonic.' },
  { degree: 6, roman: 'vi', name: 'Submediant', role: 'Halfway between tonic and subdominant; tonic of relative minor.' },
  { degree: 7, roman: 'vii°', name: 'Leading Note', role: 'One semitone below tonic; strongly pulls up to resolve into tonic.' }
];

// Cadences (ABRSM Grade 5)
const ABRSM_CADENCES = [
  {
    id: 'perfect',
    name: 'Perfect Cadence',
    progression: 'V ➔ I',
    effect: 'Full Stop / Conclusive',
    description: 'The strongest, most decisive resolution in Western tonal music. Sounds like a complete sentence ending with a period.',
    keys: {
      'C': { chord1: ['G3', 'B3', 'D4'], chord2: ['C4', 'E4', 'G4'], name1: 'G (V)', name2: 'C (I)' },
      'G': { chord1: ['D4', 'F#4', 'A4'], chord2: ['G3', 'B3', 'D4'], name1: 'D (V)', name2: 'G (I)' },
      'D': { chord1: ['A3', 'C#4', 'E4'], chord2: ['D4', 'F#4', 'A4'], name1: 'A (V)', name2: 'D (I)' },
      'F': { chord1: ['C4', 'E4', 'G4'], chord2: ['F3', 'A3', 'C4'], name1: 'C (V)', name2: 'F (I)' }
    }
  },
  {
    id: 'plagal',
    name: 'Plagal Cadence',
    progression: 'IV ➔ I',
    effect: 'The "Amen" Cadence',
    description: 'A softer, deeply satisfying resolution commonly heard at the end of church hymns and rock anthems.',
    keys: {
      'C': { chord1: ['F3', 'A3', 'C4'], chord2: ['C4', 'E4', 'G4'], name1: 'F (IV)', name2: 'C (I)' },
      'G': { chord1: ['C4', 'E4', 'G4'], chord2: ['G3', 'B3', 'D4'], name1: 'C (IV)', name2: 'G (I)' },
      'D': { chord1: ['G3', 'B3', 'D4'], chord2: ['D4', 'F#4', 'A4'], name1: 'G (IV)', name2: 'D (I)' },
      'F': { chord1: ['A#3', 'D4', 'F4'], chord2: ['F3', 'A3', 'C4'], name1: 'Bb (IV)', name2: 'F (I)' }
    }
  },
  {
    id: 'imperfect',
    name: 'Imperfect Cadence',
    progression: 'I ➔ V (or ii ➔ V, IV ➔ V)',
    effect: 'Comma / Unfinished / Open',
    description: 'Ends on the Dominant chord (V). Sounds like a question mark or a comma in the middle of a musical phrase.',
    keys: {
      'C': { chord1: ['C4', 'E4', 'G4'], chord2: ['G3', 'B3', 'D4'], name1: 'C (I)', name2: 'G (V)' },
      'G': { chord1: ['G3', 'B3', 'D4'], chord2: ['D4', 'F#4', 'A4'], name1: 'G (I)', name2: 'D (V)' },
      'D': { chord1: ['D4', 'F#4', 'A4'], chord2: ['A3', 'C#4', 'E4'], name1: 'D (I)', name2: 'A (V)' },
      'F': { chord1: ['F3', 'A3', 'C4'], chord2: ['C4', 'E4', 'G4'], name1: 'F (I)', name2: 'C (V)' }
    }
  }
];

// Ornaments (ABRSM Grade 4 & 5)
const ABRSM_ORNAMENTS = [
  {
    id: 'trill',
    name: 'Trill',
    symbol: 'tr~~~',
    description: 'Rapid, continuous alternation between the printed note and the note above it in the diatonic scale.',
    grade: 4
  },
  {
    id: 'turn',
    name: 'Turn (Gruppetto)',
    symbol: '∽',
    description: 'A four-note decorative figure: Note Above ➔ Principal Note ➔ Note Below ➔ Principal Note.',
    grade: 4
  },
  {
    id: 'upper_mordent',
    name: 'Upper Mordent',
    symbol: '𝆞',
    description: 'Rapid single alternation: Principal Note ➔ Note Above ➔ Principal Note.',
    grade: 4
  },
  {
    id: 'lower_mordent',
    name: 'Lower Mordent',
    symbol: '𝆟',
    description: 'Has a vertical stroke through it: Principal Note ➔ Note Below ➔ Principal Note.',
    grade: 4
  },
  {
    id: 'acciaccatura',
    name: 'Acciaccatura (Crushed Note)',
    symbol: '𝆠',
    description: 'A tiny grace note with an oblique stroke through the stem. Played as fast as possible right on or before the beat.',
    grade: 4
  },
  {
    id: 'appoggiatura',
    name: 'Appoggiatura (Leaning Note)',
    symbol: 'Small note without stroke',
    description: 'A melodic embellishment that leans on the beat and takes half (or two-thirds in dotted time) of the main note’s value.',
    grade: 4
  }
];

// Orchestral Instruments & Families (ABRSM Grade 4 & 5)
const ORCHESTRAL_INSTRUMENTS = [
  // Strings
  { name: 'Violin', family: 'Strings', clef: 'Treble', transposing: 'Non-transposing (Concert pitch)', sound: 'Bowed strings (horsehair) or plucked (pizzicato)', grade: 4 },
  { name: 'Viola', family: 'Strings', clef: 'Alto (Treble for high passages)', transposing: 'Non-transposing', sound: 'Warm, darker string timbre', grade: 4 },
  { name: 'Cello (Violoncello)', family: 'Strings', clef: 'Bass, Tenor, and Treble', transposing: 'Non-transposing', sound: 'Deep resonant bowed string', grade: 4 },
  { name: 'Double Bass', family: 'Strings', clef: 'Bass', transposing: 'Sounds an octave lower than written', sound: 'Lowest orchestral string', grade: 4 },
  { name: 'Harp', family: 'Strings', clef: 'Treble & Bass (Grand Staff)', transposing: 'Non-transposing (47 strings, 7 pedals)', sound: 'Plucked nylon/gut strings', grade: 4 },

  // Woodwind
  { name: 'Flute', family: 'Woodwind', clef: 'Treble', transposing: 'Non-transposing', sound: 'Edge-blown airstream across embouchure hole', grade: 4 },
  { name: 'Oboe', family: 'Woodwind', clef: 'Treble', transposing: 'Non-transposing', sound: 'Double reed; bright penetrating, nasal tone', grade: 4 },
  { name: 'Clarinet in B♭', family: 'Woodwind', clef: 'Treble', transposing: 'Transposing in B♭ (Sounds Major 2nd lower than written)', sound: 'Single reed attached to a mouthpiece', grade: 5 },
  { name: 'Clarinet in A', family: 'Woodwind', clef: 'Treble', transposing: 'Transposing in A (Sounds Minor 3rd lower than written)', sound: 'Single reed; warm mellow woody timbre', grade: 5 },
  { name: 'Bassoon', family: 'Woodwind', clef: 'Bass & Tenor', transposing: 'Non-transposing', sound: 'Large double reed with folded conical tube', grade: 4 },
  { name: 'Cor Anglais (English Horn)', family: 'Woodwind', clef: 'Treble', transposing: 'Transposing in F (Sounds Perfect 5th lower than written)', sound: 'Double reed with pear-shaped bell', grade: 5 },

  // Brass
  { name: 'French Horn in F', family: 'Brass', clef: 'Treble & Bass', transposing: 'Transposing in F (Sounds Perfect 5th lower than written)', sound: 'Cup mouthpiece, hand in bell', grade: 5 },
  { name: 'Trumpet in B♭', family: 'Brass', clef: 'Treble', transposing: 'Transposing in B♭ (Sounds Major 2nd lower than written)', sound: 'Cup mouthpiece, 3 piston valves', grade: 5 },
  { name: 'Trombone', family: 'Brass', clef: 'Bass & Tenor', transposing: 'Non-transposing (uses slide)', sound: 'Telescoping slide to change tube length', grade: 4 },
  { name: 'Tuba', family: 'Brass', clef: 'Bass', transposing: 'Non-transposing', sound: 'Lowest brass; wide conical bore', grade: 4 },

  // Percussion
  { name: 'Timpani (Kettledrums)', family: 'Percussion (Definite Pitch)', clef: 'Bass', transposing: 'Non-transposing (tuned to specific pitches)', sound: 'Mallets striking calfskin/plastic head on copper bowl', grade: 4 },
  { name: 'Glockenspiel', family: 'Percussion (Definite Pitch)', clef: 'Treble', transposing: 'Sounds 2 octaves higher than written', sound: 'Metal bars struck with hard mallets', grade: 5 },
  { name: 'Side Drum (Snare Drum)', family: 'Percussion (Indefinite Pitch)', clef: 'Single line / Neutral', transposing: 'No pitch', sound: 'Metal snares vibrating against bottom head', grade: 4 }
];

// Comprehensive ABRSM Terms & Signs Dictionary (Grades 1 to 5)
const ABRSM_TERMS = [
  // Grade 1 Terms
  { term: 'Adagio', translation: 'Slow', category: 'Tempo', grade: 1 },
  { term: 'Allegretto', translation: 'Fairly quick (slightly slower than allegro)', category: 'Tempo', grade: 1 },
  { term: 'Allegro', translation: 'Quick, lively, cheerful', category: 'Tempo', grade: 1 },
  { term: 'Andante', translation: 'At a walking pace', category: 'Tempo', grade: 1 },
  { term: 'Moderato', translation: 'Moderately', category: 'Tempo', grade: 1 },
  { term: 'Accelerando (accel.)', translation: 'Gradually getting quicker', category: 'Tempo', grade: 1 },
  { term: 'Rallentando (rall.)', translation: 'Gradually getting slower', category: 'Tempo', grade: 1 },
  { term: 'Ritardando (rit.)', translation: 'Gradually getting slower', category: 'Tempo', grade: 1 },
  { term: 'Ritenuto (riten.)', translation: 'Held back, suddenly slower', category: 'Tempo', grade: 1 },
  { term: 'A tempo', translation: 'In time (return to original speed)', category: 'Tempo', grade: 1 },
  { term: 'Crescendo (cresc.)', translation: 'Gradually getting louder', category: 'Dynamics', grade: 1 },
  { term: 'Decrescendo / Diminuendo', translation: 'Gradually getting softer', category: 'Dynamics', grade: 1 },
  { term: 'Forte (f)', translation: 'Loud', category: 'Dynamics', grade: 1 },
  { term: 'Piano (p)', translation: 'Quiet / soft', category: 'Dynamics', grade: 1 },
  { term: 'Mezzo forte (mf)', translation: 'Moderately loud', category: 'Dynamics', grade: 1 },
  { term: 'Mezzo piano (mp)', translation: 'Moderately quiet', category: 'Dynamics', grade: 1 },
  { term: 'Fortissimo (ff)', translation: 'Very loud', category: 'Dynamics', grade: 1 },
  { term: 'Pianissimo (pp)', translation: 'Very quiet', category: 'Dynamics', grade: 1 },
  { term: 'Cantabile', translation: 'In a singing style', category: 'Expression', grade: 1 },
  { term: 'Legato', translation: 'Smoothly', category: 'Articulation', grade: 1 },
  { term: 'Staccato', translation: 'Detached, short', category: 'Articulation', grade: 1 },
  { term: 'Da Capo (D.C.)', translation: 'From the beginning', category: 'Direction', grade: 1 },
  { term: 'Dal Segno (D.S.)', translation: 'From the sign 𝄋', category: 'Direction', grade: 1 },
  { term: 'Fine', translation: 'The end', category: 'Direction', grade: 1 },

  // Grade 2 Terms
  { term: 'Andantino', translation: 'Slightly faster than andante (or sometimes slightly slower)', category: 'Tempo', grade: 2 },
  { term: 'Grave', translation: 'Very slow, solemn', category: 'Tempo', grade: 2 },
  { term: 'Largo', translation: 'Slow, stately', category: 'Tempo', grade: 2 },
  { term: 'Presto', translation: 'Very fast', category: 'Tempo', grade: 2 },
  { term: 'Vivace / Vivo', translation: 'Lively, quick', category: 'Tempo', grade: 2 },
  { term: 'Con brio', translation: 'With vigour, spirited', category: 'Expression', grade: 2 },
  { term: 'Con moto', translation: 'With movement', category: 'Tempo', grade: 2 },
  { term: 'Dolce', translation: 'Sweet, gentle', category: 'Expression', grade: 2 },
  { term: 'Espressivo (espr.)', translation: 'Expressively', category: 'Expression', grade: 2 },
  { term: 'Fortepiano (fp)', translation: 'Loud, then immediately soft', category: 'Dynamics', grade: 2 },
  { term: 'Sforzando (sf / sfz)', translation: 'Forced, strongly accented', category: 'Dynamics', grade: 2 },
  { term: 'Maestoso', translation: 'Majestic', category: 'Expression', grade: 2 },
  { term: 'Meno', translation: 'Less (e.g. meno mosso = less movement)', category: 'Modifier', grade: 2 },
  { term: 'Molto', translation: 'Much, very', category: 'Modifier', grade: 2 },
  { term: 'Poco', translation: 'A little (poco a poco = little by little)', category: 'Modifier', grade: 2 },
  { term: 'Sempre', translation: 'Always (e.g. sempre staccato)', category: 'Modifier', grade: 2 },
  { term: 'Senza', translation: 'Without (e.g. senza misura)', category: 'Modifier', grade: 2 },
  { term: 'Simile', translation: 'In the same way', category: 'Direction', grade: 2 },
  { term: 'Sostenuto', translation: 'Sustained', category: 'Expression', grade: 2 },
  { term: 'Tenuto', translation: 'Held for full value', category: 'Articulation', grade: 2 },

  // Grade 3 Terms
  { term: 'Agitato', translation: 'Agitated, excited', category: 'Expression', grade: 3 },
  { term: 'Animato', translation: 'Animated, lively', category: 'Expression', grade: 3 },
  { term: 'Ben', translation: 'Well (e.g. ben marcato = well accented)', category: 'Modifier', grade: 3 },
  { term: 'Con fuoco', translation: 'With fire', category: 'Expression', grade: 3 },
  { term: 'Energico', translation: 'Energetic', category: 'Expression', grade: 3 },
  { term: 'Grazioso', translation: 'Graceful', category: 'Expression', grade: 3 },
  { term: 'Leggiero', translation: 'Light, nimble', category: 'Articulation', grade: 3 },
  { term: 'Marcato', translation: 'Marked, accented', category: 'Articulation', grade: 3 },
  { term: 'Pesante', translation: 'Heavy', category: 'Expression', grade: 3 },
  { term: 'Risoluto', translation: 'Bold, resolute', category: 'Expression', grade: 3 },
  { term: 'Rubato', translation: 'Flexible tempo, with expressive freedom', category: 'Tempo', grade: 3 },
  { term: 'Scherzando', translation: 'Playfully, joking', category: 'Expression', grade: 3 },
  { term: 'Tranquillo', translation: 'Calm, tranquil', category: 'Expression', grade: 3 },

  // Grade 4 Terms
  { term: 'Affettuoso', translation: 'Tenderly, affectionately', category: 'Expression', grade: 4 },
  { term: 'Appassionato', translation: 'With passion', category: 'Expression', grade: 4 },
  { term: 'Come prima', translation: 'As before', category: 'Direction', grade: 4 },
  { term: 'Giocoso', translation: 'Merry, playful', category: 'Expression', grade: 4 },
  { term: 'L’istesso tempo', translation: 'The same tempo (speed)', category: 'Tempo', grade: 4 },
  { term: 'Morendo', translation: 'Dying away', category: 'Dynamics', grade: 4 },
  { term: 'Nobilmente', translation: 'Nobly', category: 'Expression', grade: 4 },
  { term: 'Perdendosi', translation: 'Losing itself, dying away', category: 'Dynamics', grade: 4 },
  { term: 'Quasi', translation: 'As if, almost (e.g. quasi una fantasia)', category: 'Modifier', grade: 4 },
  { term: 'Stringendo', translation: 'Gradually quickening the tempo', category: 'Tempo', grade: 4 },
  { term: 'Volante', translation: 'Flying, fast and light', category: 'Tempo', grade: 4 },

  // Grade 5 Terms (including French and German terms)
  { term: 'Allargando', translation: 'Broadening, becoming slower and louder', category: 'Tempo/Dynamics', grade: 5 },
  { term: 'Calando', translation: 'Getting softer and slower', category: 'Tempo/Dynamics', grade: 5 },
  { term: 'Langsam (Ger)', translation: 'Slow', category: 'Tempo', grade: 5 },
  { term: 'Mäßig (Ger)', translation: 'Moderately', category: 'Tempo', grade: 5 },
  { term: 'Lebhaft (Ger)', translation: 'Lively', category: 'Tempo', grade: 5 },
  { term: 'Schnell (Ger)', translation: 'Fast', category: 'Tempo', grade: 5 },
  { term: 'Traurig (Ger)', translation: 'Sad', category: 'Expression', grade: 5 },
  { term: 'Lent (Fr)', translation: 'Slow', category: 'Tempo', grade: 5 },
  { term: 'Modéré (Fr)', translation: 'Moderate', category: 'Tempo', grade: 5 },
  { term: 'Vif / Vite (Fr)', translation: 'Lively / Fast', category: 'Tempo', grade: 5 },
  { term: 'Moins (Fr)', translation: 'Less', category: 'Modifier', grade: 5 },
  { term: 'Plus (Fr)', translation: 'More', category: 'Modifier', grade: 5 },
  { term: 'Très (Fr)', translation: 'Very', category: 'Modifier', grade: 5 },
  { term: 'Cédez (Fr)', translation: 'Yield, slow down', category: 'Tempo', grade: 5 }
];

window.ABRSM_SYLLABUS = ABRSM_SYLLABUS;
window.TECHNICAL_SCALE_DEGREES = TECHNICAL_SCALE_DEGREES;
window.ABRSM_CADENCES = ABRSM_CADENCES;
window.ABRSM_ORNAMENTS = ABRSM_ORNAMENTS;
window.ORCHESTRAL_INSTRUMENTS = ORCHESTRAL_INSTRUMENTS;
window.ABRSM_TERMS = ABRSM_TERMS;
