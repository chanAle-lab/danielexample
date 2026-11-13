/**
 * ABRSM Music Theory Exam Practice & Quiz Engine
 * Comprehensive Grade 1 to Grade 5 Question Bank mirroring official exam formats.
 */

class AbrsmQuizEngine {
  constructor() {
    this.selectedGrade = 1; // Default to Grade 1 foundation
    this.currentQuestion = null;
    this.score = 0;
    this.streak = 0;
    this.totalAnswered = 0;

    this.questionBank = [
      // --- GRADE 1 ---
      {
        grade: 1,
        category: 'Time Signatures',
        question: 'Which of the following time signatures represents Simple Triple time with three crotchet (quarter note) beats per bar?',
        options: ['3/4', '2/4', '4/4', '6/8'],
        answer: '3/4',
        explanation: 'In 3/4 time, the top number 3 means three beats per bar, and the bottom number 4 indicates crotchet (quarter) note values.'
      },
      {
        grade: 1,
        category: 'Note Values',
        question: 'How many quavers (eighth notes) equal the value of one dotted minim (dotted half note)?',
        options: ['6 quavers', '4 quavers', '3 quavers', '8 quavers'],
        answer: '6 quavers',
        explanation: 'A minim equals 2 crotchets (4 quavers). The dot adds half its value (1 crotchet = 2 quavers). 4 + 2 = 6 quavers.'
      },
      {
        grade: 1,
        category: 'Keys & Scales',
        question: 'What is the key signature of F Major in both treble and bass clefs?',
        options: ['One Flat (B♭)', 'One Sharp (F♯)', 'Two Flats (B♭, E♭)', 'No sharps or flats'],
        answer: 'One Flat (B♭)',
        explanation: 'F Major has one flat: B♭. (Remember the mnemonic: Father Charles Goes Down And Ends Battle).'
      },
      {
        grade: 1,
        category: 'Clefs & Stave',
        question: 'Where is Middle C (C4) written on the Treble (G) clef stave?',
        options: ['On one ledger line below the stave', 'On the bottom line', 'In the first space', 'On one ledger line above the stave'],
        answer: 'On one ledger line below the stave',
        explanation: 'Middle C sits precisely on the first ledger line below the treble staff (and one ledger line above the bass staff).'
      },
      {
        grade: 1,
        category: 'Italian Terms',
        question: 'What is the correct English translation of the Italian direction "Andante"?',
        options: ['At a walking pace', 'Very fast', 'Slow and solemn', 'Gradually getting louder'],
        answer: 'At a walking pace',
        explanation: 'Andante comes from the Italian "andare" (to walk), meaning at a medium walking tempo.'
      },
      {
        grade: 1,
        category: 'Keys & Scales',
        question: 'Which notes form the tonic triad in root position for G Major?',
        options: ['G – B – D', 'G – C – E', 'D – F♯ – A', 'G – B♭ – D'],
        answer: 'G – B – D',
        explanation: 'The tonic triad of G Major is built on scale degrees 1, 3, and 5: G (root), B (3rd), and D (5th).'
      },
      {
        grade: 1,
        category: 'Time Signatures',
        question: 'What does the time signature symbol "C" (Common Time) represent in music theory?',
        options: ['4/4 time (four crotchet beats per bar)', '2/2 time', '3/4 time', '6/8 time'],
        answer: '4/4 time (four crotchet beats per bar)',
        explanation: 'The symbol "C" stands for Common Time, which is exactly equivalent to 4/4 (four crotchet beats per bar).'
      },
      {
        grade: 1,
        category: 'Rests & Note Values',
        question: 'How many semiquavers (16th notes) equal the value of one crotchet (quarter note)?',
        options: ['4 semiquavers', '2 semiquavers', '8 semiquavers', '16 semiquavers'],
        answer: '4 semiquavers',
        explanation: '1 crotchet = 2 quavers = 4 semiquavers.'
      },
      {
        grade: 1,
        category: 'Rests & Stave',
        question: 'Which rest is written as a solid black rectangle hanging DOWN from the 4th line of the stave?',
        options: ['Semibreve rest (whole measure rest)', 'Minim rest', 'Crotchet rest', 'Quaver rest'],
        answer: 'Semibreve rest (whole measure rest)',
        explanation: 'A Semibreve rest hangs down from line 4. (A Minim rest sits UP on line 3).'
      },
      {
        grade: 1,
        category: 'Accidentals',
        question: 'What is the function of a natural sign (♮) in front of a note?',
        options: ['Cancels a previous sharp or flat', 'Raises the pitch by a semitone', 'Lowers the pitch by a semitone', 'Doubles the note duration'],
        answer: 'Cancels a previous sharp or flat',
        explanation: 'A natural sign (♮) cancels any preceding sharp or flat, returning the note to its natural pitch.'
      },
      {
        grade: 1,
        category: 'Performance Signs',
        question: 'What does a dot placed directly above or below a notehead indicate to a performer?',
        options: ['Staccato (play short and detached)', 'Hold the note longer (Fermata)', 'Accent the note loudly', 'Legato (play smoothly)'],
        answer: 'Staccato (play short and detached)',
        explanation: 'A dot above or below a note indicates staccato (detached). Do not confuse with a dot placed to the side, which lengthens duration by half.'
      },
      {
        grade: 1,
        category: 'Dynamics',
        question: 'What is the meaning of the dynamic marking "pianissimo" (pp)?',
        options: ['Very quiet', 'Moderately quiet', 'Very loud', 'Gradually getting quieter'],
        answer: 'Very quiet',
        explanation: 'Pianissimo (pp) translates as "very quiet" or "very soft".'
      },

      // --- GRADE 2 ---
      {
        grade: 2,
        category: 'Time Signatures',
        question: 'In 2/2 time (alla breve), which note value receives one beat?',
        options: ['Minim (Half note)', 'Crotchet (Quarter note)', 'Semibreve (Whole note)', 'Quaver (Eighth note)'],
        answer: 'Minim (Half note)',
        explanation: 'The bottom number 2 indicates minim (half note) beats. 2/2 has two minim beats in a bar.'
      },
      {
        grade: 2,
        category: 'Rhythm & Triplets',
        question: 'How many crotchets (quarter notes) is a triplet of three quavers (eighth notes) equal to?',
        options: ['1 crotchet', '2 crotchets', '1.5 crotchets', '3 crotchets'],
        answer: '1 crotchet',
        explanation: 'A triplet squeezes three notes into the standard time value of two of the same notes. Three triplet quavers = two normal quavers = 1 crotchet.'
      },
      {
        grade: 2,
        category: 'Relative Keys',
        question: 'What is the relative minor key of C Major?',
        options: ['A Minor', 'E Minor', 'D Minor', 'C Minor'],
        answer: 'A Minor',
        explanation: 'The relative minor is found 3 semitones (a minor 3rd) below the major tonic. A Minor shares C Major’s zero sharps/flats.'
      },
      {
        grade: 2,
        category: 'Minor Scales',
        question: 'In an A Harmonic Minor scale, which note is raised by a semitone ascending AND descending?',
        options: ['G is raised to G♯ (7th degree)', 'F is raised to F♯ (6th degree)', 'C is raised to C♯ (3rd degree)', 'D is raised to D♯'],
        answer: 'G is raised to G♯ (7th degree)',
        explanation: 'Harmonic minor scales always raise the 7th degree (the leading tone) by a semitone both ascending and descending.'
      },

      // --- GRADE 3 ---
      {
        grade: 3,
        category: 'Compound Time',
        question: 'How is 6/8 time correctly classified according to ABRSM standards?',
        options: ['Compound Duple time', 'Simple Triple time', 'Compound Triple time', 'Simple Duple time'],
        answer: 'Compound Duple time',
        explanation: '6/8 has two main dotted-crotchet beats per bar, each subdivided into three quavers. Two beats = Duple; three subdivisions = Compound.'
      },
      {
        grade: 3,
        category: 'Note Values',
        question: 'What is the British term for a 32nd note (a note with three flags / three beams)?',
        options: ['Demisemiquaver', 'Semiquaver', 'Hemidemisemiquaver', 'Breve'],
        answer: 'Demisemiquaver',
        explanation: 'Crotchet = 1/4, Quaver = 1/8, Semiquaver = 1/16, Demisemiquaver = 1/32.'
      },
      {
        grade: 3,
        category: 'Intervals',
        question: 'What is the exact interval from D up to B♭?',
        options: ['Minor 6th', 'Major 6th', 'Perfect 5th', 'Augmented 5th'],
        answer: 'Minor 6th',
        explanation: 'D to B natural is a Major 6th (9 semitones). Lowering the top note to B♭ reduces it by one semitone to a Minor 6th (8 semitones).'
      },
      {
        grade: 3,
        category: 'Key Signatures',
        question: 'Which key signature has 4 sharps (F♯, C♯, G♯, D♯)?',
        options: ['E Major and C♯ Minor', 'A Major and F♯ Minor', 'B Major and G♯ Minor', 'D Major and B Minor'],
        answer: 'E Major and C♯ Minor',
        explanation: '4 sharps belongs to E Major and its relative minor, C♯ Minor.'
      },

      // --- GRADE 4 ---
      {
        grade: 4,
        category: 'Clefs & Stave',
        question: 'The Alto Clef (C clef) places Middle C (C4) on which line of the stave?',
        options: ['The 3rd line (middle line)', 'The 4th line', 'The 2nd line', 'The bottom line'],
        answer: 'The 3rd line (middle line)',
        explanation: 'The center notch of the Alto C-clef identifies the 3rd (middle) line as Middle C. This clef is standard for the Viola.'
      },
      {
        grade: 4,
        category: 'Technical Degree Names',
        question: 'In any diatonic major or minor scale, what is the technical name for the 4th degree?',
        options: ['Subdominant', 'Dominant', 'Supertonic', 'Submediant'],
        answer: 'Subdominant',
        explanation: 'The 4th degree is the Subdominant (a fifth below the tonic, mirroring the dominant which is a fifth above).'
      },
      {
        grade: 4,
        category: 'Ornaments',
        question: 'Which ornament consists of a rapid 4-note figure: Note Above ➔ Principal Note ➔ Note Below ➔ Principal Note?',
        options: ['Turn (Gruppetto)', 'Upper Mordent', 'Trill', 'Acciaccatura'],
        answer: 'Turn (Gruppetto)',
        explanation: 'A Turn (represented by the symbol ∽) decorates the melody by winding around the principal note.'
      },
      {
        grade: 4,
        category: 'Orchestral Instruments',
        question: 'Which of the following string instruments reads primarily from the Alto Clef?',
        options: ['Viola', 'Violin', 'Cello', 'Double Bass'],
        answer: 'Viola',
        explanation: 'The Viola uses the Alto Clef to avoid excessive ledger lines in its mid-range register.'
      },

      // --- GRADE 5 ---
      {
        grade: 5,
        category: 'Clefs & Stave',
        question: 'The Tenor Clef (C clef) places Middle C (C4) on which line of the stave?',
        options: ['The 4th line', 'The 3rd line', 'The 2nd line', 'The 5th line'],
        answer: 'The 4th line',
        explanation: 'The Tenor clef centers Middle C on the 4th line. It is frequently used for high passages in Cello, Bassoon, and Trombone.'
      },
      {
        grade: 5,
        category: 'Cadences',
        question: 'Which cadence progression moves from the Subdominant chord to the Tonic chord (IV ➔ I)?',
        options: ['Plagal Cadence', 'Perfect Cadence', 'Imperfect Cadence', 'Interrupted Cadence'],
        answer: 'Plagal Cadence',
        explanation: 'IV ➔ I is the Plagal cadence, famously known as the "Amen" cadence.'
      },
      {
        grade: 5,
        category: 'Transposition',
        question: 'A Clarinet in B♭ plays a written note C5. What is the sounding (concert pitch) note heard?',
        options: ['B♭4 (Major 2nd lower)', 'D5 (Major 2nd higher)', 'C5 (Concert pitch)', 'F4 (Fifth lower)'],
        answer: 'B♭4 (Major 2nd lower)',
        explanation: 'An instrument in B♭ sounds a Major 2nd lower than written. Written C sounds as concert B♭.'
      },
      {
        grade: 5,
        category: 'Chord Inversions',
        question: 'In ABRSM figured bass / inversion notation, what does a "6/4" chord indicate?',
        options: ['Second inversion (c) chord (5th in bass)', 'First inversion (b) chord (3rd in bass)', 'Root position (a) chord', 'Dominant 7th chord'],
        answer: 'Second inversion (c) chord (5th in bass)',
        explanation: 'A 6/4 chord is in 2nd inversion with the 5th in the bass, forming intervals of a 6th and a 4th above the bass note.'
      },
      {
        grade: 5,
        category: 'Time Signatures',
        question: 'How is 5/4 time classified according to ABRSM standards?',
        options: ['Irregular / Asymmetrical time', 'Compound Quintuple time', 'Simple Duple time', 'Regular Quadruple time'],
        answer: 'Irregular / Asymmetrical time',
        explanation: '5/4 and 7/4 cannot be divided into equal groups of two or three beats; they are irregular (typically grouped as 3+2 or 2+3).'
      }
    ];
  }

  setGradeFilter(grade) {
    this.selectedGrade = grade;
  }

  getNextQuestion() {
    let pool = this.questionBank;
    if (this.selectedGrade !== 'all') {
      const g = parseInt(this.selectedGrade, 10);
      pool = this.questionBank.filter(q => q.grade === g);
    }

    if (pool.length === 0) pool = this.questionBank;

    // Pick random question
    const q = pool[Math.floor(Math.random() * pool.length)];
    this.currentQuestion = q;
    return q;
  }

  checkAnswer(userAnswer) {
    if (!this.currentQuestion) return null;
    this.totalAnswered++;
    const isCorrect = userAnswer === this.currentQuestion.answer;

    if (isCorrect) {
      this.score += 10;
      this.streak++;
    } else {
      this.streak = 0;
    }

    return {
      isCorrect,
      correctAnswer: this.currentQuestion.answer,
      explanation: this.currentQuestion.explanation,
      score: this.score,
      streak: this.streak,
      totalAnswered: this.totalAnswered
    };
  }
}

window.abrsmQuizEngine = new AbrsmQuizEngine();
