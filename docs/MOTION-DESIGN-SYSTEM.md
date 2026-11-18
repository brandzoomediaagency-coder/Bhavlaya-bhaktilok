# Bhavlaya Motion Design System

**Philosophy:** Devotional, Elegant, Serene, Accessible  
**Target:** 60fps GPU-accelerated CSS/Web Transitions, Zero Cumulative Layout Shift (CLS)  
**Standard:** Strict `prefers-reduced-motion` compliance  

---

## 1. Core Motion Tokens

- **Durations:**
  - Microinteractions (buttons, badges): `150ms - 200ms`
  - Component transitions (dropdowns, cards): `250ms - 300ms`
  - Ambient spiritual motion (mandala rotation, breathing pulse): `12s - 24s`
- **Easings:**
  - Standard Enter: `cubic-bezier(0.16, 1, 0.3, 1)` (smooth deceleration)
  - Exit: `cubic-bezier(0.7, 0, 0.84, 0)` (quick exit)
  - Ambient / Organic: `easeInOutSine`

---

## 2. Component Microinteractions

1. **Ambient Mandala Rotation:**
   - 360-degree continuous rotation over 30 seconds at ultra-low opacity (3-5%).
   - Disabled instantly when user enables `prefers-reduced-motion`.
2. **Latest Updates Ticker:**
   - Continuous horizontal scroll marquee with CSS transform.
   - Pauses immediately on `:hover` and `:focus-within` for accessibility.
3. **Card Elevate & Glow:**
   - On `:hover`, translateY(-3px) with soft gold box-shadow (`0 10px 25px -5px rgba(217, 119, 6, 0.12)`).
4. **Spiritual Audio Visualizers:**
   - **Mandir Ghanti:** Radial shockwave expansion during bell strike decay (3.5s).
   - **Shankh Nada:** Acoustic undulating soundwaves matching breath pressure.
   - **OM 136.1 Hz:** 4-second expansion / 4-second contraction breathing guide.

---

## 3. Accessibility & Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
