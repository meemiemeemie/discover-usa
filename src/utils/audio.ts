/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Safe browser-native Audio Context helper
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

// Synthesize a bubbly pop sound using oscillators
export function playPopSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Resume context if suspended (common browser security rule)
  if (ctx.state === "suspended") {
    ctx.resume();
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  // Rapid frequency bend upwards to sound like a pop
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.1);
}

// Synthesize a "cronch" sound (white noise generator with quick decaying bandpass filter)
export function playCrunchSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === "suspended") {
    ctx.resume();
  }

  const now = ctx.currentTime;
  const bufferSize = ctx.sampleRate * 0.12; // 0.12 seconds buffer
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Fill buffer with white noise
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noiseNode = ctx.createBufferSource();
  noiseNode.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(1200, now);
  filter.frequency.exponentialRampToValueAtTime(300, now + 0.1);
  filter.Q.setValueAtTime(3, now);

  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0.18, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

  noiseNode.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  noiseNode.start(now);
  noiseNode.stop(now + 0.12);

  // Second minor crunch for double-bite feel
  setTimeout(() => {
    const doubleCtx = getAudioContext();
    if (!doubleCtx || doubleCtx.state === "suspended") return;
    const dNow = doubleCtx.currentTime;
    const dNoise = doubleCtx.createBufferSource();
    dNoise.buffer = buffer;
    const dFilter = doubleCtx.createBiquadFilter();
    dFilter.type = "bandpass";
    dFilter.frequency.setValueAtTime(1000, dNow);
    dFilter.frequency.exponentialRampToValueAtTime(200, dNow + 0.08);
    dFilter.Q.setValueAtTime(2, dNow);
    const dGain = doubleCtx.createGain();
    dGain.gain.setValueAtTime(0.12, dNow);
    dGain.gain.exponentialRampToValueAtTime(0.01, dNow + 0.08);

    dNoise.connect(dFilter);
    dFilter.connect(dGain);
    dGain.connect(doubleCtx.destination);
    dNoise.start(dNow);
    dNoise.stop(dNow + 0.08);
  }, 40);
}

// Synthesize a positive magical arpeggio
export function playSuccessSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === "suspended") {
    ctx.resume();
  }

  const now = ctx.currentTime;
  const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5

  notes.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const noteStart = now + index * 0.08;

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, noteStart);

    gain.gain.setValueAtTime(0, noteStart);
    gain.gain.linearRampToValueAtTime(0.1, noteStart + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(noteStart);
    osc.stop(noteStart + 0.25);
  });
}

// Speak English words using Browser Text-to-Speech
export function speakEnglishWord(phrase: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve(false);
      return;
    }

    try {
      // Cancel outstanding speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = "en-US";
      
      // Look for a suitable English voice
      const voices = window.speechSynthesis.getVoices();
      const enVoice = voices.find(
        (v) => (v.lang.startsWith("en-US") || v.lang.startsWith("en-GB")) && v.name.includes("Google")
      ) || voices.find(
        (v) => v.lang.startsWith("en-US") || v.lang.startsWith("en-")
      );

      if (enVoice) {
        utterance.voice = enVoice;
      }
      
      utterance.pitch = 1.1; // Slightly child-friendly pitch
      utterance.rate = 0.85;  // Slightly slower rate for clear classroom listening

      utterance.onend = () => resolve(true);
      utterance.onerror = () => resolve(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error("Speech Synthesis failed to run:", e);
      resolve(false);
    }
  });
}
