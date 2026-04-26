// ElevenLabs text-to-speech integration
// Uses the browser-compatible API endpoint

const VOICE_ID = "onwK4e9ZLuTAKqWW03F9"; // Rachel - professional female voice
const CALL_VOICE_ID = "EXAVITQu4vr4xnSDxMaL"; // Bella - smoother call voice

export type VoiceProfile =
  | "default"
  | "call"
  | "detective"
  | "suspect"
  | "witness"
  | "narrator"
  | "urgent_narrator";

interface TTSOptions {
  text: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
  profile?: VoiceProfile;
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

  const profileConfig: Record<VoiceProfile, {
    voiceId: string;
    modelId: string;
    voiceSettings: Record<string, number | boolean>;
  }> = {
    default: {
      voiceId: VOICE_ID,
      modelId: "eleven_monolingual_v1",
      voiceSettings: {
        stability: 0.75,
        similarity_boost: 0.85,
      },
    },
    call: {
      voiceId: CALL_VOICE_ID,
      modelId: "eleven_turbo_v2_5",
      voiceSettings: {
        stability: 0.62,
        similarity_boost: 0.78,
        style: 0.1,
        use_speaker_boost: true,
      },
    },
    detective: {
      voiceId: VOICE_ID,
      modelId: "eleven_turbo_v2_5",
      voiceSettings: {
        stability: 0.68,
        similarity_boost: 0.82,
        style: 0.22,
      },
    },
    suspect: {
      voiceId: CALL_VOICE_ID,
      modelId: "eleven_turbo_v2_5",
      voiceSettings: {
        stability: 0.5,
        similarity_boost: 0.76,
        style: 0.34,
      },
    },
    witness: {
      voiceId: VOICE_ID,
      modelId: "eleven_turbo_v2_5",
      voiceSettings: {
        stability: 0.82,
        similarity_boost: 0.7,
        style: 0.12,
      },
    },
    narrator: {
      voiceId: VOICE_ID,
      modelId: "eleven_turbo_v2_5",
      voiceSettings: {
        stability: 0.74,
        similarity_boost: 0.84,
        style: 0.16,
      },
    },
    urgent_narrator: {
      voiceId: CALL_VOICE_ID,
      modelId: "eleven_turbo_v2_5",
      voiceSettings: {
        stability: 0.42,
        similarity_boost: 0.74,
        style: 0.5,
      },
    },
  };

  const config = profileConfig[profile] ?? profileConfig.default;
  const voiceId = config.voiceId;
  const voiceSettings = config.voiceSettings;
  const modelId = config.modelId;

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

export interface SpokenLine {
  profile: VoiceProfile;
  text: string;
}

export async function speakSequence(
  lines: SpokenLine[],
  gapMs = 160,
): Promise<void> {
  const pause = (duration: number) =>
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, duration);
    });

  for (const line of lines) {
    await new Promise<void>((resolve) => {
      let settled = false;

      const done = () => {
        if (settled) return;
        settled = true;
        resolve();
      };

      const fallback = window.setTimeout(done, 18000);
      speak({
        text: line.text,
        profile: line.profile,
        onEnd: () => {
          window.clearTimeout(fallback);
          done();
        },
        onError: () => {
          window.clearTimeout(fallback);
          done();
        },
      });
    });

    if (gapMs > 0) {
      await pause(gapMs);
    }
  }
}
