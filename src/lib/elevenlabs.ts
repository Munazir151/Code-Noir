// ElevenLabs text-to-speech integration
// Uses the browser-compatible API endpoint

const VOICE_ID = "onwK4e9ZLuTAKqWW03F9"; // Rachel - professional female voice
const CALL_VOICE_ID = "EXAVITQu4vr4xnSDxMaL"; // Bella - smoother call voice

interface TTSOptions {
  text: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
  profile?: "default" | "call";
}

let currentAudio: HTMLAudioElement | null = null;
let activeRequestId = 0;

export async function speak({
  text,
  onStart,
  onEnd,
  onError,
  profile = "default",
}: TTSOptions): Promise<void> {
  const requestId = ++activeRequestId;
  const voiceId = profile === "call" ? CALL_VOICE_ID : VOICE_ID;
  
  const voiceSettings =
    profile === "call"
      ? {
        stability: 0.62,
        similarity_boost: 0.78,
        style: 0.1,
        use_speaker_boost: true,
      }
      : {
        stability: 0.75,
        similarity_boost: 0.85,
      };
  const modelId = profile === "call" ? "eleven_turbo_v2_5" : "eleven_monolingual_v1";

  // Stop any currently playing audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  try {
    const response = await fetch("/api/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        voiceId,
        voiceSettings,
        modelId
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch speech data: ${response.status}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    if (requestId !== activeRequestId) {
      URL.revokeObjectURL(audioUrl);
      return;
    }

    currentAudio = new Audio(audioUrl);
    currentAudio.volume = 0.8;

    currentAudio.addEventListener("play", () => onStart?.());
    currentAudio.addEventListener("ended", () => {
      URL.revokeObjectURL(audioUrl);
      if (requestId === activeRequestId) {
        currentAudio = null;
        onEnd?.();
      }
    });
    currentAudio.addEventListener("error", (e) => {
      URL.revokeObjectURL(audioUrl);
      if (requestId === activeRequestId) {
        currentAudio = null;
        onError?.(new Error("Audio playback failed"));
      }
    });

    await currentAudio.play();
  } catch (error) {
    console.error("Speech Error:", error);
    onError?.(error instanceof Error ? error : new Error("Unknown error"));
  }
}

export function stopSpeaking(): void {
  activeRequestId += 1;
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
}

export function isSpeaking(): boolean {
  return currentAudio !== null && !currentAudio.paused;
}
