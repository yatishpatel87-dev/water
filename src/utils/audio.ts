/**
 * Web Audio API synthesizer for sound effects and Web Speech API for text-to-speech.
 * 100% client-side, zero external assets required.
 */

class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private noiseBuffer: AudioBuffer | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Knock on wood sound for Knock Knock poem
  public playKnock() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      [0, 0.18].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, now + offset);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, now + offset);
        osc.frequency.exponentialRampToValueAtTime(45, now + offset + 0.08);

        gain.gain.setValueAtTime(0.7, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.09);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + offset);
        osc.stop(now + offset + 0.1);
      });
    } catch {
      // Audio not permitted yet
    }
  }

  // Water drop droplet sound
  public playWaterDrop() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1600, now + 0.12);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {
      // ignore
    }
  }

  // Pure melodic chime (wind chime / bell tone)
  public playChime(freq = 1046.5) {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Fundamental tone + overtones (2.76x, 5.4x for realistic bell harmonics)
      const harmonics = [
        { mult: 1.0, gainVal: 0.22, decay: 0.6 },
        { mult: 2.76, gainVal: 0.1, decay: 0.4 },
        { mult: 5.4, gainVal: 0.04, decay: 0.25 }
      ];

      harmonics.forEach(({ mult, gainVal, decay }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * mult, now);

        gain.gain.setValueAtTime(gainVal, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + decay + 0.05);
      });
    } catch {
      // ignore
    }
  }

  // Shimmering celestial sparkle / magic dust
  public playSparkle() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const pitches = [1318.5, 1567.98, 1760.0, 2093.0, 2637.02, 3135.96]; // E6, G6, A6, C7, E7, G7

      pitches.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + i * 0.045;
        const dur = 0.22;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, start);

        gain.gain.setValueAtTime(0.08, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + dur + 0.02);
      });
    } catch {
      // ignore
    }
  }

  // Positive reinforcement: Earn Star Chime (scales with count)
  public playStar(count = 1) {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      if (count <= 1) {
        // Crisp dual chime with golden sparkle
        const notes = [
          { f: 880.0, t: 0, d: 0.35, vol: 0.18 },   // A5
          { f: 1174.66, t: 0.09, d: 0.45, vol: 0.22 }, // D6
          { f: 1760.0, t: 0.18, d: 0.55, vol: 0.26 }  // A6
        ];

        notes.forEach(({ f, t, d, vol }) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const start = now + t;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, start);

          gain.gain.setValueAtTime(vol, start);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + d);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(start);
          osc.stop(start + d + 0.05);
        });

        // Add trailing soft high sparkle
        setTimeout(() => this.playSparkle(), 120);
      } else {
        // Multi-star grand cascading arpeggio (Pentatonic flourish)
        const notes = [
          { f: 523.25, t: 0, d: 0.3 },     // C5
          { f: 659.25, t: 0.07, d: 0.3 },  // E5
          { f: 783.99, t: 0.14, d: 0.35 }, // G5
          { f: 1046.5, t: 0.21, d: 0.4 },  // C6
          { f: 1318.5, t: 0.28, d: 0.45 }, // E6
          { f: 1567.98, t: 0.35, d: 0.55 },// G6
          { f: 2093.0, t: 0.44, d: 0.7 }   // C7
        ];

        notes.forEach(({ f, t, d }) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const start = now + t;

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, start);

          gain.gain.setValueAtTime(0.2, start);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + d);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(start);
          osc.stop(start + d + 0.05);
        });

        setTimeout(() => this.playSparkle(), 300);
      }
    } catch {
      // ignore
    }
  }

  // Positive reinforcement: Task / Step Complete sound
  public playTaskComplete() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Chord 1 (F Major / Lift): F4, A4, C5
      const chord1 = [349.23, 440.0, 523.25];
      chord1.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      });

      // Chord 2 (G Major / Peak): G4, B4, D5
      const chord2 = [392.0, 493.88, 587.33];
      chord2.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + 0.16;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, start);
        gain.gain.setValueAtTime(0.14, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.38);
      });

      // Chord 3 (C Major 9 / Victory Shine): C5, E5, G5, B5, D6
      const chord3 = [523.25, 659.25, 783.99, 987.77, 1174.66];
      chord3.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + 0.32 + i * 0.035;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, start);
        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.7);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.75);
      });

      // Followed by celebratory cheer and sparkle
      setTimeout(() => {
        this.playCheer();
      }, 250);
    } catch {
      // ignore
    }
  }

  // Noise generator for cheering & applause effect
  private getNoiseBuffer(ctx: AudioContext): AudioBuffer {
    if (!this.noiseBuffer || this.noiseBuffer.sampleRate !== ctx.sampleRate) {
      const dur = 1.4;
      const bufferSize = Math.floor(ctx.sampleRate * dur);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pink noise filter approximation
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.09;
        b6 = white * 0.115926;
      }
      this.noiseBuffer = buffer;
    }
    return this.noiseBuffer;
  }

  // Positive reinforcement: Cheering crowd & jubilant applause
  public playCheer() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const dur = 1.2;

      // 1. Filtered pink noise simulating applause and collective vocal whoops
      const noise = ctx.createBufferSource();
      noise.buffer = this.getNoiseBuffer(ctx);

      // Resonant bandpass filter focused on collective crowd vocal formants (~850Hz)
      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(750, now);
      bandpass.frequency.linearRampToValueAtTime(950, now + 0.4);
      bandpass.frequency.exponentialRampToValueAtTime(600, now + dur);
      bandpass.Q.setValueAtTime(2.5, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.linearRampToValueAtTime(0.22, now + 0.25);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      noise.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + dur + 0.05);

      // 2. Uplifting brassy celebratory harmonic chords underneath the cheer
      const cheerChords = [
        { f: 523.25, t: 0.05, d: 0.5 },  // C5
        { f: 659.25, t: 0.05, d: 0.6 },  // E5
        { f: 783.99, t: 0.05, d: 0.7 },  // G5
        { f: 1046.5, t: 0.12, d: 0.9 },  // C6
        { f: 1318.5, t: 0.18, d: 0.9 }   // E6
      ];

      cheerChords.forEach(({ f, t, d }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + t;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.12, start + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + d + 0.05);
      });
    } catch {
      // ignore
    }
  }

  // Full celebratory package: Task completion + Cheer + Sparkles
  public playCelebration() {
    this.playTaskComplete();
    setTimeout(() => this.playCheer(), 300);
    setTimeout(() => this.playSparkle(), 650);
  }

  // Success chime (classic 4-note ascending)
  public playSuccess() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.2, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.3);
      });
    } catch {
      // ignore
    }
  }

  // Gentle buzz for wrong answer
  public playWrong() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.25);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // ignore
    }
  }

  // Fanfare for course completion
  public playFanfare() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const notes = [
        { f: 523.25, t: 0, d: 0.15 },
        { f: 523.25, t: 0.16, d: 0.15 },
        { f: 523.25, t: 0.32, d: 0.15 },
        { f: 659.25, t: 0.48, d: 0.35 },
        { f: 783.99, t: 0.85, d: 0.2 },
        { f: 1046.5, t: 1.08, d: 0.6 },
      ];

      notes.forEach(({ f, t, d }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + t;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, start);

        gain.gain.setValueAtTime(0.25, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + d + 0.05);
      });
    } catch {
      // ignore
    }
  }
}

export const sound = new SoundController();

/**
 * High-level sound effects library for positive reinforcement
 * and user interactions.
 */
export const sfx = {
  /** Play positive chime when student earns a star (supports single or multi-star flourish) */
  earnStar: (count = 1) => sound.playStar(count),
  /** Play celebratory chime and fanfare when completing a task or curriculum step */
  taskComplete: () => sound.playTaskComplete(),
  /** Play cheering crowd and jubilant applause */
  cheer: () => sound.playCheer(),
  /** Play magical sparkling dust chime */
  sparkle: () => sound.playSparkle(),
  /** Play resonant bell chime */
  chime: (freq?: number) => sound.playChime(freq),
  /** Full celebration package: task chord + crowd cheer + sparkles */
  celebrate: () => sound.playCelebration(),
  /** Standard success chime */
  success: () => sound.playSuccess(),
  /** Soft water drop pop */
  waterDrop: () => sound.playWaterDrop(),
  /** Door knock sound */
  knock: () => sound.playKnock(),
  /** Gentle error buzz */
  wrong: () => sound.playWrong(),
  /** Grand graduation fanfare */
  fanfare: () => sound.playFanfare(),
  /** Gentle UI click chime */
  click: () => sound.playChime(660)
};

// Voice Cache & Selection for Pure Indian Female Voice (English & Gujarati)
let cachedVoices: SpeechSynthesisVoice[] = [];

// Configurable speed and pitch state
let gujaratiSpeed = 0.8;
let gujaratiPitch = 1.02;

export function getGujaratiVoiceSpeed(): number {
  return gujaratiSpeed;
}

export function setGujaratiVoiceSpeed(speed: number) {
  gujaratiSpeed = Math.min(Math.max(speed, 0.5), 1.5);
}

export function getGujaratiVoicePitch(): number {
  return gujaratiPitch;
}

export function setGujaratiVoicePitch(pitch: number) {
  gujaratiPitch = Math.min(Math.max(pitch, 0.7), 1.4);
}

function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  const voices = window.speechSynthesis.getVoices();
  if (voices && voices.length > 0) {
    cachedVoices = voices;
  }
  return cachedVoices;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    loadVoices();
  };
}

/** Check if text contains Gujarati unicode characters (U+0A80 to U+0AFF) */
export function isGujaratiText(text: string): boolean {
  return /[\u0A80-\u0AFF]/.test(text);
}

/** Gujarati number to spoken Gujarati word mapping */
const GUJARATI_DIGIT_WORDS: Record<string, string> = {
  '0': 'શૂન્ય',
  '1': 'એક',
  '2': 'બે',
  '3': 'ત્રણ',
  '4': 'ચાર',
  '5': 'પાંચ',
  '6': 'છ',
  '7': 'સાત',
  '8': 'આઠ',
  '9': 'નવ',
  '10': 'દસ',
  '11': 'અગિયાર',
  '12': 'બાર',
  '13': 'તેર',
  '14': 'ચૌદ',
  '15': 'પંદર',
  '16': 'સોળ',
  '17': 'સત્તર',
  '18': 'અઢાર',
  '19': 'ઓગણીસ',
  '20': 'વીસ',
  '૦': 'શૂન્ય',
  '૧': 'એક',
  '૨': 'બે',
  '૩': 'ત્રણ',
  '૪': 'ચાર',
  '૫': 'પાંચ',
  '૬': 'છ',
  '૭': 'સાત',
  '૮': 'આઠ',
  '૯': 'નવ'
};

function formatGujaratiNumber(numStr: string): string {
  if (GUJARATI_DIGIT_WORDS[numStr]) return GUJARATI_DIGIT_WORDS[numStr];
  // Pronounce multi-digits smoothly
  return numStr
    .split('')
    .map((d) => GUJARATI_DIGIT_WORDS[d] || d)
    .join(' ');
}

/**
 * Gujarati Pronunciation Purification Engine (ગુજરાતી ઉચ્ચાર શુદ્ધિ)
 * Cleans symbols, parentheses, slashes, and formats numbers & abbreviations
 * to produce natural, authentic, pause-balanced pronunciation.
 */
export function purifyGujaratiText(text: string): string {
  if (!text) return '';

  let clean = text;

  // 1. Clean brackets & parentheses into natural speech pauses (prevents reading "bracket")
  clean = clean.replace(/[([{]/g, ', ');
  clean = clean.replace(/[)\]}]/g, ', ');

  // 2. Convert slashes "/" to "અથવા" ("or")
  clean = clean.replace(/\s*\/\s*/g, ' અથવા ');

  // 3. Convert dashes/hyphens surrounded by spaces to soft pause commas
  clean = clean.replace(/\s*[-–—]+\s*/g, ', ');

  // 4. Remove quote marks and markdown artifacts
  clean = clean.replace(/["'“”‘’`*_~#•]/g, '');

  // 5. Expand mathematical and grammatical symbols
  clean = clean.replace(/&/g, ' અને ');
  clean = clean.replace(/%/g, ' ટકા ');
  clean = clean.replace(/\+/g, ' વત્તા ');
  clean = clean.replace(/=/g, ' બરાબર ');

  // 6. Expand decimals and decimal ratings (e.g. 0.8 -> શૂન્ય પોઇન્ટ આઠ)
  clean = clean.replace(/(\d+|[૦-૯]+)\.(\d+|[૦-૯]+)/g, (_, a, b) => {
    return `${formatGujaratiNumber(a)} પોઇન્ટ ${formatGujaratiNumber(b)}`;
  });

  // 7. Standalone numbers to pure Gujarati words
  clean = clean.replace(/\b(\d+)\b/g, (match) => formatGujaratiNumber(match));
  clean = clean.replace(/([૦-૯]+)/g, (match) => formatGujaratiNumber(match));

  // 8. Expand common Gujarati educational abbreviations
  clean = clean.replace(/ડૉ\./g, 'ડોક્ટર ');
  clean = clean.replace(/કિ\.મી\./g, 'કિલોમીટર ');
  clean = clean.replace(/લિ\./g, 'લીટર ');
  clean = clean.replace(/વગેરે\./g, 'વગેરે ');

  // 9. Clean consecutive punctuation and normalize whitespace
  clean = clean.replace(/,\s*,+/g, ',');
  clean = clean.replace(/\s+/g, ' ').trim();

  return clean;
}

/**
 * Transliterates Gujarati script to Devanagari (Hindi) script for fallback engines.
 * Gujarati Unicode (0x0A81 - 0x0AF9) maps directly to Devanagari (0x0901 - 0x0979)
 * with a constant mathematical offset of -0x0180 (-384 decimal).
 * This allows high-quality Hindi/Indic voices (like Microsoft Swara, Google हिन्दी)
 * to pronounce Gujarati phonetically with pristine Indian clarity when no gu-IN voice exists!
 */
export function gujaratiToDevanagari(text: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code >= 0x0A81 && code <= 0x0AF9) {
      result += String.fromCharCode(code - 0x0180);
    } else {
      result += text[i];
    }
  }
  return result;
}

/**
 * Roman phonetic transliteration of Gujarati for devices with English-only voices
 */
export function gujaratiToRomanPhonetic(text: string): string {
  const map: Record<string, string> = {
    'અ': 'a', 'આ': 'aa', 'ઇ': 'i', 'ઈ': 'ee', 'ઉ': 'u', 'ઊ': 'oo', 'ઋ': 'ru',
    'એ': 'e', 'ઐ': 'ai', 'ઓ': 'o', 'ઔ': 'au', 'અં': 'an', 'અઃ': 'ah',
    'ક': 'ka', 'ખ': 'kha', 'ગ': 'ga', 'ઘ': 'gha', 'ઙ': 'nga',
    'ચ': 'cha', 'છ': 'chha', 'જ': 'ja', 'ઝ': 'jha', 'ઞ': 'nya',
    'ટ': 'Ta', 'ઠ': 'Tha', 'ડ': 'Da', 'ઢ': 'Dha', 'ણ': 'Na',
    'ત': 'ta', 'થ': 'tha', 'દ': 'da', 'ધ': 'dha', 'ન': 'na',
    'પ': 'pa', 'ફ': 'pha', 'બ': 'ba', 'ભ': 'bha', 'મ': 'ma',
    'ય': 'ya', 'ર': 'ra', 'લ': 'la', 'ળ': 'La', 'વ': 'va',
    'શ': 'sha', 'ષ': 'sha', 'સ': 'sa', 'હ': 'ha',
    'ા': 'aa', 'િ': 'i', 'ી': 'ee', 'ુ': 'u', 'ૂ': 'oo', 'ૃ': 'ru',
    'ે': 'e', 'ૈ': 'ai', 'ો': 'o', 'ૌ': 'au', 'ં': 'n', '્': ''
  };

  let out = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    out += map[char] || char;
  }
  return out;
}

/**
 * Specifically finds a Pure Indian English Female voice (en-IN / en_IN)
 * Matches: Microsoft Heera, Microsoft Neerja Online (Natural), Google English (India),
 * Apple Veena / Lekha, Aditi, Priya, Swara, Sangeeta, etc.
 */
export function getIndianFemaleVoice(): SpeechSynthesisVoice | null {
  const voices = loadVoices();
  if (!voices || voices.length === 0) return null;

  // 1. Primary Target: Indian English voices (en-IN / en_IN or name contains India)
  const indianVoices = voices.filter(
    (v) => /^(en[-_]IN)/i.test(v.lang) || (/india/i.test(v.name) && v.lang.startsWith('en'))
  );

  if (indianVoices.length > 0) {
    const femaleKeywords = /female|heera|neerja|veena|aditi|priya|sangeeta|kalyani|swara|raveena|ananya|lekha|natural|online/i;
    const maleKeywords = /male|ravi|prabhat|george|david|madhav|hemant/i;

    const indianFemale = indianVoices.find((v) => femaleKeywords.test(v.name))
      || indianVoices.find((v) => !maleKeywords.test(v.name))
      || indianVoices[0];

    if (indianFemale) return indianFemale;
  }

  // 2. Bilingual Hindi/Indian female voice
  const hiFemale = voices.find(
    (v) => /^(hi[-_]IN)/i.test(v.lang) && /female|swara|kalpana|aditi|priya/i.test(v.name)
  );
  if (hiFemale) return hiFemale;

  // 3. Fallback: Any clear English female voice
  const englishFemale = voices.find(
    (v) => v.lang.startsWith('en') && /female|zira|samantha|karen|victoria|moira|fiona|natural|siri/i.test(v.name)
  );
  if (englishFemale) return englishFemale;

  // 4. Fallback: Any English voice
  return voices.find((v) => v.lang.startsWith('en')) || null;
}

export type GujaratiEngineType = 'native-gujarati' | 'indic-female' | 'indian-english' | 'fallback';

export interface GujaratiVoiceResolution {
  voice: SpeechSynthesisVoice | null;
  engineType: GujaratiEngineType;
  langCode: string;
  voiceName: string;
  isNativeGujarati: boolean;
}

/**
 * Identifies the best available voice for pure Gujarati speech synthesis
 * with automatic fallback classification:
 * 1. Native Gujarati voice (gu-IN)
 * 2. Indic/Hindi Female voice (hi-IN) with Devanagari transliteration
 * 3. Indian English Female voice (en-IN)
 */
export function resolveGujaratiVoice(): GujaratiVoiceResolution {
  const voices = loadVoices();
  if (!voices || voices.length === 0) {
    return {
      voice: null,
      engineType: 'fallback',
      langCode: 'gu-IN',
      voiceName: 'Default Speech Engine',
      isNativeGujarati: false
    };
  }

  // 1. Direct Native Gujarati voices (gu-IN, gu)
  const gujaratiVoices = voices.filter(
    (v) => /^(gu[-_]IN|gu)/i.test(v.lang) || /gujarati|ગુજરાતી/i.test(v.name)
  );

  if (gujaratiVoices.length > 0) {
    const femaleKeywords = /female|dhwani|drisha|priya|swara|shruti|kavya|online|natural/i;
    const maleKeywords = /male|niranjan|kishore/i;

    const guFemale = gujaratiVoices.find((v) => femaleKeywords.test(v.name))
      || gujaratiVoices.find((v) => !maleKeywords.test(v.name))
      || gujaratiVoices[0];

    if (guFemale) {
      return {
        voice: guFemale,
        engineType: 'native-gujarati',
        langCode: guFemale.lang || 'gu-IN',
        voiceName: guFemale.name,
        isNativeGujarati: true
      };
    }
  }

  // 2. High-quality Indian Indic/Hindi female voice (shares phonetic alphabet & smooth Indic cadence)
  const indicVoices = voices.filter((v) => /^(hi[-_]IN|hi)/i.test(v.lang));
  if (indicVoices.length > 0) {
    const indicFemale = indicVoices.find((v) => /female|swara|kalpana|aditi|priya|ananya/i.test(v.name))
      || indicVoices.find((v) => !/male|madhav|hemant/i.test(v.name))
      || indicVoices[0];
    if (indicFemale) {
      return {
        voice: indicFemale,
        engineType: 'indic-female',
        langCode: indicFemale.lang || 'hi-IN',
        voiceName: indicFemale.name,
        isNativeGujarati: false
      };
    }
  }

  // 3. Indian English female voice fallback with gu-IN binding
  const indianFemale = getIndianFemaleVoice();
  if (indianFemale) {
    return {
      voice: indianFemale,
      engineType: 'indian-english',
      langCode: indianFemale.lang || 'en-IN',
      voiceName: indianFemale.name,
      isNativeGujarati: false
    };
  }

  return {
    voice: null,
    engineType: 'fallback',
    langCode: 'gu-IN',
    voiceName: 'Default System Voice',
    isNativeGujarati: false
  };
}

export function getGujaratiFemaleVoice(): SpeechSynthesisVoice | null {
  return resolveGujaratiVoice().voice;
}

export interface VoiceEngineDiagnostics {
  voiceName: string;
  engineType: GujaratiEngineType;
  engineLabel: string;
  speed: number;
  pitch: number;
  totalVoicesAvailable: number;
  isNativeGujarati: boolean;
  purificationActive: boolean;
}

export function getVoiceEngineDiagnostics(): VoiceEngineDiagnostics {
  const resolution = resolveGujaratiVoice();
  const voices = loadVoices();

  let engineLabel = 'શુદ્ધ ગુજરાતી અવાજ (Native Gujarati)';
  if (resolution.engineType === 'indic-female') {
    engineLabel = 'ઇન્ડિક મહિલા અવાજ (દેવનાગરી ફોનેટિક ઉચ્ચાર શુદ્ધિ)';
  } else if (resolution.engineType === 'indian-english') {
    engineLabel = 'ભારતીય મહિલા અવાજ (Indian English Voice)';
  } else if (resolution.engineType === 'fallback') {
    engineLabel = 'સિસ્ટમ ડિફોલ્ટ અવાજ';
  }

  return {
    voiceName: resolution.voiceName,
    engineType: resolution.engineType,
    engineLabel,
    speed: gujaratiSpeed,
    pitch: gujaratiPitch,
    totalVoicesAvailable: voices.length,
    isNativeGujarati: resolution.isNativeGujarati,
    purificationActive: true
  };
}

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: 'en-IN' | 'gu-IN' | string;
  voiceType?: 'english' | 'gujarati' | 'auto';
  onEnd?: () => void;
  onStart?: () => void;
}

/**
 * Speech Synthesis Helper with Pure Indian Female voice (English & Gujarati) & 0.8x default speed.
 * Applies Gujarati Pronunciation Purification (ઉચ્ચાર શુદ્ધિ) automatically to Gujarati text.
 */
export function speakText(
  text: string,
  options: SpeakOptions = {}
) {
  if (sound.getIsMuted()) return;
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();

  // Determine language: Gujarati or English
  const isGujarati = options.voiceType === 'gujarati' 
    || options.lang === 'gu-IN' 
    || options.lang === 'gu'
    || (options.voiceType !== 'english' && isGujaratiText(text));

  let cleanText = text;
  let targetLang = 'en-IN';
  let targetVoice: SpeechSynthesisVoice | null = null;
  let targetRate = options.rate ?? (isGujarati ? gujaratiSpeed : 0.8);
  let targetPitch = options.pitch ?? (isGujarati ? gujaratiPitch : 1.05);

  if (isGujarati) {
    // Apply Gujarati Pronunciation Purification (ઉચ્ચાર શુદ્ધિ)
    const purified = purifyGujaratiText(text);
    const resolution = resolveGujaratiVoice();
    targetVoice = resolution.voice;

    if (resolution.engineType === 'native-gujarati') {
      cleanText = purified;
      targetLang = resolution.langCode || 'gu-IN';
    } else if (resolution.engineType === 'indic-female') {
      // High-quality Indic female voice: transliterate to Devanagari for 100% pure phonetics
      cleanText = gujaratiToDevanagari(purified);
      targetLang = resolution.langCode || 'hi-IN';
    } else {
      // Fallback: Romanized phonetics for English voice
      cleanText = gujaratiToRomanPhonetic(purified);
      targetLang = resolution.langCode || 'en-IN';
    }
  } else {
    // English text
    cleanText = text.replace(/[\\*_#~`[\]()]/g, ' ').trim();
    targetLang = 'en-IN';
    targetVoice = getIndianFemaleVoice();
    if (targetVoice?.lang) {
      targetLang = targetVoice.lang;
    }
  }

  if (!cleanText.trim()) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = targetLang;
  utterance.rate = targetRate;
  utterance.pitch = targetPitch;
  utterance.volume = options.volume ?? 1.0;

  if (targetVoice) {
    utterance.voice = targetVoice;
  }

  if (options.onStart) utterance.onstart = options.onStart;
  if (options.onEnd) utterance.onend = options.onEnd;
  utterance.onerror = () => {
    if (options.onEnd) options.onEnd();
  };

  window.speechSynthesis.speak(utterance);
}

/** Explicitly speak English with Pure Indian Female voice at 0.8x */
export function speakEnglish(text: string, options: Omit<SpeakOptions, 'voiceType' | 'lang'> = {}) {
  speakText(text, { ...options, voiceType: 'english', lang: 'en-IN' });
}

/** Explicitly speak Gujarati with Pure Indian Female voice and Pronunciation Purification at 0.8x */
export function speakGujarati(text: string, options: Omit<SpeakOptions, 'voiceType' | 'lang'> = {}) {
  speakText(text, { ...options, voiceType: 'gujarati', lang: 'gu-IN' });
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/** Test Pure Indian Female Voice: English, Gujarati, or both with purified pronunciation */
export function testIndianFemaleVoice(type: 'en' | 'gu' | 'both' = 'both') {
  if (type === 'en') {
    speakEnglish("Hello students! Pure Indian female voice in English is active at speed zero point eight.", { rate: 0.8 });
  } else if (type === 'gu') {
    speakGujarati("નમસ્તે વિદ્યાર્થી મિત્રો! ગુજરાતી ભાષાની ઉચ્ચાર શુદ્ધિ સક્રિય છે. જળ એ જ જીવન છે, પાણી બચાવો!", { rate: gujaratiSpeed });
  } else {
    // Speak English then Gujarati
    speakEnglish("Hello students! Pure Indian female voice in English is active.", {
      rate: 0.8,
      onEnd: () => {
        setTimeout(() => {
          speakGujarati("નમસ્તે! ગુજરાતી ભાષાની ઉચ્ચાર શુદ્ધિ પણ સક્રિય છે. જળ એ જ જીવન છે.", { rate: gujaratiSpeed });
        }, 500);
      }
    });
  }
}

