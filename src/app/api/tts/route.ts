import { NextResponse } from 'next/server';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;

export async function POST(req: Request) {
  if (!ELEVENLABS_API_KEY) {
    return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
  }

  try {
    const { text, voiceId, voiceSettings, modelId } = await req.json();

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: modelId || "eleven_monolingual_v1",
          voice_settings: voiceSettings,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: `ElevenLabs Error: ${errorText}` }, { status: response.status });
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
