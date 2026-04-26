# ElevenLabs Narration Setup Guide

Code Noir now includes professional voice narration powered by ElevenLabs text-to-speech.

## What's New

- **Professional Voice Narration**: Detective insights are narrated using ElevenLabs AI voice (Rachel - professional female voice)
- **Audio Toggle**: Enable/disable narration via the Detective Header
- **Graceful Degradation**: App works perfectly without an API key (narration is skipped)
- **Visual Indicators**: Audio playing status shown in narration overlay

## Files Added

```
codenoir/
├── src/
│   ├── lib/
│   │   └── elevenlabs.ts           # ElevenLabs API integration
│   └── components/
│       ├── DetectiveHeader.tsx     # Professional header with audio toggle
│       ├── CaseDossier.tsx         # Case archive browser
│       └── NarrationOverlay.tsx    # Updated with audio support
└── .env.local.example              # Environment variable template
```

## Setup Instructions

### 1. Get Your ElevenLabs API Key

1. Go to [ElevenLabs](https://elevenlabs.io/)
2. Sign up for a free account
3. Navigate to **Settings → API Keys**
4. Copy your API key

**Free Tier**: 10,000 characters/month (plenty for testing)

### 2. Configure Your Environment

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your API key:
   ```env
   NEXT_PUBLIC_ELEVENLABS_API_KEY=your_actual_api_key_here
   ```

3. Restart your development server:
   ```bash
   npm run dev
   ```

### 3. Test the Narration

1. Start a case investigation
2. Open a file to trigger narration
3. Look for the volume icon (🔊) in the:
   - **Detective Header** (top right) - toggle audio on/off
   - **Narration Overlay** (bottom) - shows when audio is playing

## How It Works

### Audio Flow

1. **File Opened** → `NarrationOverlay` receives narration text
2. **If Audio Enabled** → `speak()` function is called
3. **API Request** → Text sent to ElevenLabs API
4. **Audio Stream** → Blob converted to Audio element
5. **Playback** → Audio plays while text types out

### Voice Configuration

Located in `src/lib/elevenlabs.ts`:

```typescript
const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel - professional female voice
```

**Other ElevenLabs Voices You Can Try**:
- `EXAVITQu4vr4xnSDxMaL` - Sarah (narrative)
- `ErXwobaYiN019PkySvjV` - Antoni (deep, serious)
- `MF3mGyEYCl7XYWbV9V6O` - Elli (energetic)

### Voice Settings

```typescript
voice_settings: {
  stability: 0.75,      // 0-1 (higher = more consistent)
  similarity_boost: 0.85 // 0-1 (higher = closer to original voice)
}
```

## Without API Key

The app gracefully degrades:
- ✅ Text narration still appears (typewriter effect)
- ✅ All game features work normally
- ⚠️ Audio narration is skipped (warning in console)
- 🔇 Audio toggle still visible (but does nothing)

## Troubleshooting

### "ElevenLabs API error: 401"
- **Problem**: Invalid or missing API key
- **Solution**: Check `.env.local` has correct key, restart dev server

### "ElevenLabs API error: 429"
- **Problem**: Rate limit exceeded (free tier: 10k chars/month)
- **Solution**: Wait for limit reset or upgrade plan

### Audio doesn't play
- **Problem**: Browser autoplay policy
- **Solution**: User must interact with page first (click anywhere)

### "Audio playback failed"
- **Problem**: Browser can't decode audio format
- **Solution**: Use a modern browser (Chrome, Firefox, Safari, Edge)

## UI Components

### DetectiveHeader
Professional law enforcement style header showing:
- Case number and title
- Evidence collected count
- Audio on/off toggle
- Real-time clock

### CaseDossier
Case archive that appears after solving a case:
- Shows all available cases
- Displays solved/locked status
- Color-coded by difficulty
- Click to start new investigation

## Cost Estimation

**Free Tier**: 10,000 characters/month

Average narration per file: ~100-200 characters

**Approximate usage**:
- Single playthrough: ~1,500 characters
- 6-7 complete playthroughs per month (free tier)

**Paid Starter Plan**: $5/month = 30,000 characters

## Security Notes

- ✅ API key is stored in `.env.local` (not committed to Git)
- ✅ Uses `NEXT_PUBLIC_` prefix (safe for client-side use)
- ⚠️ Key is visible in browser (ElevenLabs design - API is browser-safe)
- 🔒 Consider domain restrictions in ElevenLabs dashboard for production

## Next Steps

- [ ] Customize voice ID for different characters
- [ ] Add voice settings UI (stability, similarity)
- [ ] Cache audio files to reduce API calls
- [ ] Add narration speed control
- [ ] Implement audio queue for multiple narrations

## Resources

- [ElevenLabs Documentation](https://elevenlabs.io/docs)
- [Voice Lab](https://elevenlabs.io/voice-lab) - Create custom voices
- [API Reference](https://elevenlabs.io/docs/api-reference)

---

**Enjoy the immersive detective experience! 🎙️🕵️**