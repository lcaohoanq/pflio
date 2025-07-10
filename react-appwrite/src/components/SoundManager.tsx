import React, { useEffect, useState } from "react";

interface SoundManagerProps {
  enabled: boolean;
  onToggle: () => void;
}

const SoundManager: React.FC<SoundManagerProps> = ({ enabled, onToggle }) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    if (enabled && !audioContext) {
      try {
        const ctx = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        setAudioContext(ctx);
      } catch (error) {
        console.log("Web Audio API not supported");
      }
    }
  }, [enabled, audioContext]);

  const playScrollSound = (frequency: number = 440, duration: number = 100) => {
    if (!enabled || !audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + duration / 1000,
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  };

  // Expose playScrollSound to global scope for use in Portfolio component
  useEffect(() => {
    (window as any).playScrollSound = enabled ? playScrollSound : () => {};
  }, [enabled, playScrollSound]);

  return (
    <button
      onClick={onToggle}
      className="fixed top-20 md:top-24 right-4 md:right-8 z-50 bg-white/20 backdrop-blur-sm text-white w-10 h-10 md:w-12 md:h-12 rounded-full hover:bg-white/30 transition-all duration-300 flex items-center justify-center text-sm hover:scale-110"
      aria-label={`${enabled ? "Disable" : "Enable"} sound effects`}
      title={`${enabled ? "Disable" : "Enable"} sound effects`}
    >
      {enabled ? "🔊" : "🔇"}
    </button>
  );
};

export default SoundManager;
