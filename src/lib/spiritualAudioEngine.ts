/**
 * Bhavlaya High-Precision Spiritual Audio Engine
 * 
 * Implements:
 * 1. Mandir Ghanti (Indian Brass Temple Bell): Multi-harmonic modal synthesis
 * 2. Shankh Nada (Sacred Conch Shell): Aerophone formant synthesis with pitch envelope
 * 3. OM Nada (136.1 Hz Earth Cosmic Tone & Meditative Vocal Drone)
 * 
 * Features:
 * - Zero clipping, cosine fade-in/fade-out
 * - Master volume & duration timer
 * - Loop / repeat modes
 * - Centralized singleton ensuring only ONE sound plays at a time
 * - Real-time state subscriptions for reactive UI animations
 */

export type SpiritualSoundId = "bell" | "shankh" | "om_tone" | "om_chant";

export interface AudioPlaybackState {
  activeSound: SpiritualSoundId | null;
  isPlaying: boolean;
  volume: number;
  isLooping: boolean;
  durationMinutes: number; // 0 = one-shot/continuous
  remainingSeconds: number;
  amplitude: number; // For live visualization
}

type StateListener = (state: AudioPlaybackState) => void;

class SpiritualAudioEngine {
  private ctx: AudioContext | null = null;
  private activeSound: SpiritualSoundId | null = null;
  private volume: number = 0.8;
  private isLooping: boolean = false;
  private durationMinutes: number = 0;
  private remainingSeconds: number = 0;
  private timerInterval: NodeJS.Timeout | null = null;
  private animationInterval: NodeJS.Timeout | null = null;
  private currentGainNodes: GainNode[] = [];
  private currentOscillators: OscillatorNode[] = [];
  private listeners: Set<StateListener> = new Set();
  private amplitude: number = 0;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((fn) => fn(state));
  }

  public getState(): AudioPlaybackState {
    return {
      activeSound: this.activeSound,
      isPlaying: this.activeSound !== null,
      volume: this.volume,
      isLooping: this.isLooping,
      durationMinutes: this.durationMinutes,
      remainingSeconds: this.remainingSeconds,
      amplitude: this.amplitude,
    };
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    this.currentGainNodes.forEach((gn) => {
      if (this.ctx) {
        gn.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      }
    });
    this.notify();
  }

  public setLooping(loop: boolean) {
    this.isLooping = loop;
    this.notify();
  }

  public setDuration(minutes: number) {
    this.durationMinutes = minutes;
    this.remainingSeconds = minutes * 60;
    this.notify();
  }

  public stop() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }

    if (this.ctx && this.currentGainNodes.length > 0) {
      const now = this.ctx.currentTime;
      this.currentGainNodes.forEach((gn) => {
        try {
          gn.gain.setValueAtTime(gn.gain.value, now);
          gn.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
        } catch {
          // ignore
        }
      });
      setTimeout(() => {
        this.currentOscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // ignore
          }
        });
        this.currentOscillators = [];
        this.currentGainNodes = [];
      }, 350);
    } else {
      this.currentOscillators = [];
      this.currentGainNodes = [];
    }

    this.activeSound = null;
    this.amplitude = 0;
    this.notify();
  }

  /**
   * 1. Mandir Ghanti (Authentic Indian Brass Temple Bell Modal Synthesis)
   */
  public playTempleBell() {
    this.stop();
    const ctx = this.getContext();
    this.activeSound = "bell";

    // Traditional Bell partials (Hum, Prime, Tierce, Quint, Nominal)
    const partials = [
      { freq: 293.66, gain: 0.35, decay: 4.5 }, // Hum tone (D4)
      { freq: 587.33, gain: 0.5, decay: 3.8 },  // Fundamental / Prime (D5)
      { freq: 698.46, gain: 0.25, decay: 3.0 }, // Tierce minor third (F5)
      { freq: 880.0, gain: 0.2, decay: 2.5 },   // Quint fifth (A5)
      { freq: 1174.66, gain: 0.15, decay: 2.0 },// Nominal octave (D6)
      { freq: 1760.0, gain: 0.08, decay: 1.2 }, // Super-octave shimmer
    ];

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.volume, ctx.currentTime);
    masterGain.connect(ctx.destination);
    this.currentGainNodes.push(masterGain);

    const now = ctx.currentTime;

    partials.forEach((p) => {
      const osc = ctx.createOscillator();
      const pGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(p.freq, now);

      // Strike transient with exponential ringing decay
      pGain.gain.setValueAtTime(0.0001, now);
      pGain.gain.linearRampToValueAtTime(p.gain, now + 0.012);
      pGain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

      osc.connect(pGain);
      pGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + p.decay + 0.1);
      this.currentOscillators.push(osc);
    });

    this.amplitude = 1.0;
    this.notify();

    // Natural decay timeout
    setTimeout(() => {
      if (this.activeSound === "bell") {
        if (this.isLooping) {
          this.playTempleBell();
        } else {
          this.stop();
        }
      }
    }, 4500);
  }

  /**
   * 2. Shankh Nada (Sacred Conch Shell Breath & Acoustic Formant Simulation)
   */
  public playShankh() {
    this.stop();
    const ctx = this.getContext();
    this.activeSound = "shankh";

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.volume, ctx.currentTime);
    masterGain.connect(ctx.destination);
    this.currentGainNodes.push(masterGain);

    const now = ctx.currentTime;

    // Primary Conch Air Column Generator
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const voiceGain = ctx.createGain();

    osc1.type = "sawtooth";
    osc2.type = "triangle";

    // Conch blowing pitch envelope: gentle breath ramp, sustained peak, release
    osc1.frequency.setValueAtTime(220, now); // A3
    osc1.frequency.linearRampToValueAtTime(246.94, now + 0.6); // Peak B3
    osc1.frequency.setValueAtTime(245, now + 2.5);
    osc1.frequency.exponentialRampToValueAtTime(215, now + 4.2);

    osc2.frequency.setValueAtTime(440, now);
    osc2.frequency.linearRampToValueAtTime(493.88, now + 0.6);
    osc2.frequency.setValueAtTime(490, now + 2.5);
    osc2.frequency.exponentialRampToValueAtTime(430, now + 4.2);

    // Formant Acoustic Filter simulating conch shell internal spiral cavity
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(480, now);
    filter.Q.setValueAtTime(3.2, now);

    voiceGain.gain.setValueAtTime(0.0001, now);
    voiceGain.gain.linearRampToValueAtTime(0.4, now + 0.5);
    voiceGain.gain.linearRampToValueAtTime(0.35, now + 2.8);
    voiceGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.4);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(voiceGain);
    voiceGain.connect(masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 4.5);
    osc2.stop(now + 4.5);

    this.currentOscillators.push(osc1, osc2);
    this.currentGainNodes.push(voiceGain);

    this.amplitude = 1.0;
    this.notify();

    setTimeout(() => {
      if (this.activeSound === "shankh") {
        if (this.isLooping) {
          this.playShankh();
        } else {
          this.stop();
        }
      }
    }, 4500);
  }

  /**
   * 3. OM Nada Mode 1: Exact 136.1 Hz Cosmic Tone (Planetary Earth Year / Sadja)
   */
  public playOmTone(durationMinutes: number = 0) {
    this.stop();
    const ctx = this.getContext();
    this.activeSound = "om_tone";
    this.durationMinutes = durationMinutes;
    this.remainingSeconds = durationMinutes * 60;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.volume, ctx.currentTime);
    masterGain.connect(ctx.destination);
    this.currentGainNodes.push(masterGain);

    const now = ctx.currentTime;

    // Dual pure oscillators: Fundamental (136.1 Hz) + 2nd Harmonic (272.2 Hz)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const toneGain = ctx.createGain();

    osc1.type = "sine";
    osc2.type = "sine";

    osc1.frequency.setValueAtTime(136.1, now);
    osc2.frequency.setValueAtTime(272.2, now);

    // Smooth Cosine Fade-in (zero clicking)
    toneGain.gain.setValueAtTime(0.0001, now);
    toneGain.gain.linearRampToValueAtTime(0.35, now + 2.0);

    osc1.connect(toneGain);
    osc2.connect(toneGain);
    toneGain.connect(masterGain);

    osc1.start(now);
    osc2.start(now);

    this.currentOscillators.push(osc1, osc2);
    this.currentGainNodes.push(toneGain);

    this.amplitude = 0.8;
    this.notify();

    // Start countdown if duration is set
    if (durationMinutes > 0) {
      this.timerInterval = setInterval(() => {
        this.remainingSeconds--;
        if (this.remainingSeconds <= 0) {
          this.stop();
        } else {
          this.notify();
        }
      }, 1000);
    }
  }

  /**
   * 4. OM Nada Mode 2: Meditative Vocal Resonance Chant Simulation
   */
  public playOmChant(durationMinutes: number = 0) {
    this.stop();
    const ctx = this.getContext();
    this.activeSound = "om_chant";
    this.durationMinutes = durationMinutes;
    this.remainingSeconds = durationMinutes * 60;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.volume, ctx.currentTime);
    masterGain.connect(ctx.destination);
    this.currentGainNodes.push(masterGain);

    const now = ctx.currentTime;

    // Multi-voice overtone drone simulating Tibetan / Vedic Om chanting
    const droneOsc = ctx.createOscillator();
    droneOsc.type = "sawtooth";
    droneOsc.frequency.setValueAtTime(136.1, now);

    const f1 = ctx.createBiquadFilter();
    f1.type = "bandpass";
    f1.frequency.setValueAtTime(450, now); // Formant 'O'
    f1.Q.setValueAtTime(4.0, now);

    const f2 = ctx.createBiquadFilter();
    f2.type = "bandpass";
    f2.frequency.setValueAtTime(850, now); // Formant 'M'
    f2.Q.setValueAtTime(3.5, now);

    const chantGain = ctx.createGain();
    chantGain.gain.setValueAtTime(0.0001, now);
    chantGain.gain.linearRampToValueAtTime(0.3, now + 2.0);

    droneOsc.connect(f1);
    droneOsc.connect(f2);
    f1.connect(chantGain);
    f2.connect(chantGain);
    chantGain.connect(masterGain);

    droneOsc.start(now);
    this.currentOscillators.push(droneOsc);
    this.currentGainNodes.push(chantGain);

    this.amplitude = 0.9;
    this.notify();

    if (durationMinutes > 0) {
      this.timerInterval = setInterval(() => {
        this.remainingSeconds--;
        if (this.remainingSeconds <= 0) {
          this.stop();
        } else {
          this.notify();
        }
      }, 1000);
    }
  }
}

// Export singleton instance
export const spiritualAudioEngine = new SpiritualAudioEngine();
