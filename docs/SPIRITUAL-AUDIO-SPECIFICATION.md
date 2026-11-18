# Bhavlaya Spiritual Audio Specification

**Standard:** Web Audio API Acoustic Synthesis & Master Audio Orchestration  
**Engine:** `src/lib/spiritualAudioEngine.ts`  
**Audio Controller:** Single-source playback, Zero autoplay, Volume & Repeat, Ambient Timers  

---

## 1. Acoustic Modeling Specifications

### 1.1 Mandir Ghanti (पीतल की मंदिर घंटी)
- **Acoustic Signature:** Traditional Indian brass temple bell (Panchadhatu casting).
- **Harmonics Structure:**
  - Strike transient: 2200 Hz click burst (15ms).
  - Hum tone: 293.66 Hz (D4, sub-octave foundation, 4.0s decay).
  - Prime / Fundamental: 587.33 Hz (D5, prominent strike tone, 3.5s decay).
  - Tierce (Minor third): 698.46 Hz (F5, authentic bell bell-mouth overtone, 2.8s decay).
  - Quint (Fifth): 880.00 Hz (A5, 2.2s decay).
  - Nominal (Upper octave): 1174.66 Hz (D6, crystalline shimmer, 1.8s decay).
- **Envelope:** Exponential decay (`exponentialRampToValueAtTime`) down to `0.0001` with zero abrupt cutoff.

### 1.2 Shankh Nada (मंगलकारी शंख ध्वनि)
- **Acoustic Signature:** Traditional Conch Shell (Dakshinavarti / Vamavarti Shankh) blown with steady diaphragmatic breath.
- **Waveform & Filtering:**
  - Rich harmonic generator (Sawtooth + subtle Triangle warmth).
  - Dynamic Pitch Envelope: Initiates at 220 Hz (A3), rises smoothly to 246.94 Hz (B3) as breath pressure peaks, sustaining at 235 Hz, and trailing down naturally.
  - Formant Filter: Bandpass biquad filter centered at 480 Hz (Q = 2.8) to simulate the acoustic cavity resonance of the shell chamber.
  - Amplitude Envelope: 500ms linear attack, 2.5s sustained plateau, 1.2s organic breath release.

### 1.3 OM Nada — 136.1 Hz Cosmic Tone & Meditative Vocal Mode
- **Dual Mode System:**
  - **Mode 1: Precise 136.1 Hz Harmonic Meditation:**
    - Planetary Earth Year frequency (Hans Cousto cosmic octave calculation: $1 / (365.242 \text{ days}) \times 2^{32} \approx 136.10 \text{ Hz}$, equivalent to the classical Indian *Sadja / Sa* fundamental).
    - Dual sine oscillators: Primary tone at 136.10 Hz + subtle second harmonic at 272.20 Hz (octave shimmer at -18dB).
    - Cosine windowing: 1.5s smooth fade-in, 1.5s smooth fade-out to guarantee zero speaker clicking.
    - Continuous loop option with session timers (1 min, 5 min, 10 min, 15 min).
  - **Mode 2: Meditative Vocal Om Chant:**
    - Vocal resonance modeling with formant filters (F1: 450 Hz, F2: 850 Hz for the 'A-U-M' glide).

---

## 2. Browser & Accessibility Compliance

1. **Autoplay Policy:** AudioContext is initialized and resumed strictly on user gesture (`click` / `keydown`).
2. **Exclusivity:** Playing any sound immediately fades out and stops any active competing spiritual track.
3. **Screen Readers:** ARIA state `aria-pressed`, `aria-label`, and live announcements (`role="status"`).
