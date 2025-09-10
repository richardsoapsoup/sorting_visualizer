
export const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export function playTone(value, duration = 80) {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.frequency.value = 50 + value * 20;
  oscillator.type = "sawtooth";

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration / 1000);
}
