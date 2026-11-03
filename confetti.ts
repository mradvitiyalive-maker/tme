import confetti from 'canvas-confetti';

export function fireConfetti(options?: confetti.Options) {
  try {
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#F8DDE5', '#EBA8BC', '#E8E1FA', '#FFDCC5', '#f43f5e', '#fbbf24', '#a855f7'],
      disableForReducedMotion: true,
      ...options,
    });
  } catch {
    // Graceful fallback
  }
}

export function fireCelebrationRain() {
  try {
    const end = Date.now() + 1500;
    const colors = ['#F8DDE5', '#EBA8BC', '#E8E1FA', '#FFDCC5', '#f43f5e'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch {
    // Graceful fallback
  }
}

export function fireHearts() {
  try {
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.7 },
      shapes: ['star', 'circle'],
      colors: ['#f43f5e', '#ec4899', '#f472b6', '#fda4af'],
      scalar: 1.2,
      disableForReducedMotion: true,
    });
  } catch {
    // Graceful fallback
  }
}
