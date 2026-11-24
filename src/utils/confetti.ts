import confetti from 'canvas-confetti';

export function triggerHeartConfetti() {
  const count = 40;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 45,
    colors: ['#FF6B8B', '#FF8E53', '#FFA8A8', '#FF4D6D']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#E11D48', '#F43F5E', '#FB7185', '#FDA4AF']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#FFE4E6', '#FECDD3', '#F43F5E']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#BE123C', '#FB7185']
  });
}
