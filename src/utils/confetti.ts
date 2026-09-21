import confetti from 'canvas-confetti';

/**
 * Water Unit 1 Celebration Themes & Palettes
 */
const GOLD_PALETTE = ['#f59e0b', '#fbbf24', '#fde047', '#fcd34d', '#ffffff', '#ea580c'];
const CELEBRATION_PALETTE = ['#0ea5e9', '#0284c7', '#10b981', '#059669', '#f59e0b', '#ec4899', '#8b5cf6', '#ffffff'];
const WATER_PALETTE = ['#38bdf8', '#0284c7', '#0369a1', '#34d399', '#10b981', '#67e8f9'];

/**
 * Triggers a multi-stage canvas-based grand confetti explosion
 * perfect for completing all lesson steps, certificate unlocking, or graduation.
 */
export function triggerGrandConfettiExplosion() {
  if (typeof window === 'undefined') return;

  try {
    // Stage 1: Immediate central burst with high velocity
    confetti({
      particleCount: 90,
      spread: 100,
      startVelocity: 45,
      origin: { x: 0.5, y: 0.55 },
      colors: CELEBRATION_PALETTE,
      zIndex: 9999
    });

    // Stage 2 (+250ms): Dual left and right angled cannons
    setTimeout(() => {
      confetti({
        particleCount: 65,
        angle: 60,
        spread: 60,
        startVelocity: 55,
        origin: { x: 0.05, y: 0.75 },
        colors: CELEBRATION_PALETTE,
        zIndex: 9999
      });
      confetti({
        particleCount: 65,
        angle: 120,
        spread: 60,
        startVelocity: 55,
        origin: { x: 0.95, y: 0.75 },
        colors: CELEBRATION_PALETTE,
        zIndex: 9999
      });
    }, 250);

    // Stage 3 (+550ms): Golden shimmer rain from top
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 120,
        startVelocity: 30,
        origin: { x: 0.5, y: 0.3 },
        colors: GOLD_PALETTE,
        gravity: 0.8,
        scalar: 1.2,
        zIndex: 9999
      });
    }, 550);

    // Stage 4 (+850ms): Grand finale fountain eruption from bottom
    setTimeout(() => {
      confetti({
        particleCount: 110,
        spread: 140,
        startVelocity: 60,
        origin: { x: 0.5, y: 0.85 },
        colors: CELEBRATION_PALETTE,
        ticks: 280,
        zIndex: 9999
      });
    }, 850);
  } catch (err) {
    console.error('Confetti explosion error:', err);
  }
}

/**
 * Triggers a canvas-based star reward explosion effect
 * for significant star earnings (e.g. earning 3+ stars or reaching milestone total stars).
 */
export function triggerStarMilestoneConfetti(options?: { isMilestone?: boolean }) {
  if (typeof window === 'undefined') return;

  try {
    const isBigMilestone = options?.isMilestone ?? false;

    // Upward golden star explosion
    confetti({
      particleCount: isBigMilestone ? 100 : 60,
      spread: isBigMilestone ? 90 : 70,
      startVelocity: isBigMilestone ? 50 : 38,
      origin: { x: 0.5, y: 0.65 },
      colors: GOLD_PALETTE,
      scalar: 1.3,
      shapes: ['star', 'circle'],
      zIndex: 9999
    });

    if (isBigMilestone) {
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 50,
          origin: { x: 0.1, y: 0.7 },
          colors: GOLD_PALETTE,
          zIndex: 9999
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 50,
          origin: { x: 0.9, y: 0.7 },
          colors: GOLD_PALETTE,
          zIndex: 9999
        });
      }, 200);
    }
  } catch (err) {
    console.error('Star confetti error:', err);
  }
}

/**
 * Triggers a standard water & lesson celebratory burst for individual step completions.
 */
export function triggerStepCompleteConfetti() {
  if (typeof window === 'undefined') return;

  try {
    confetti({
      particleCount: 50,
      spread: 65,
      startVelocity: 35,
      origin: { x: 0.5, y: 0.65 },
      colors: WATER_PALETTE,
      zIndex: 9999
    });
  } catch (err) {
    console.error('Step confetti error:', err);
  }
}
