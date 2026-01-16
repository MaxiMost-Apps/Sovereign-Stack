import { useCallback } from 'react';

export const useKinetic = () => {
  const triggerImpact = useCallback(() => {
    // 1. VISUAL SHOCK (Screen Shake)
    // We remove and re-add the class to trigger the animation on every click
    document.body.classList.remove('kinetic-shake');
    void document.body.offsetWidth; // Force reflow
    document.body.classList.add('kinetic-shake');

    // 2. AUDIO STRIKE (Metal on Glass)
    // Ensure you place a file named 'impact.mp3' in your public/sounds/ folder
    // Using a reliable placeholder sound for now if file doesn't exist
    const audio = new Audio('/sounds/impact.mp3');
    audio.volume = 0.4; // Subtle but heavy
    audio.play().catch(() => {
      // Silent fail if user hasn't interacted yet (browser policy)
    });

    // 3. HAPTIC (Mobile Feedback)
    if (navigator.vibrate) {
      navigator.vibrate(15); // Sharp, short tap
    }
  }, []);

  return { triggerImpact };
};
