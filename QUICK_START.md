# Quick Start - ElevenLabs Narration

Get up and running with Code Noir's new voice narration in 3 minutes.

## 🚀 Quick Setup

### 1. Get Your API Key (2 minutes)

1. Go to https://elevenlabs.io/
2. Sign up (free - no credit card required)
3. Click your profile → **Settings** → **API Keys**
4. Click **Create API Key** → Copy it

### 2. Add to Project (30 seconds)

```bash
# Create your environment file
cp .env.local.example .env.local

# Open .env.local and paste your key
NEXT_PUBLIC_ELEVENLABS_API_KEY=sk_your_key_here
```

### 3. Restart Server (30 seconds)

```bash
# Stop the server (Ctrl+C)
# Start it again
npm run dev
```

## ✅ That's It!

Open http://localhost:3000 and you'll hear:
- 🔊 Professional voice narration when opening files
- 🎙️ Detective insights in Rachel's voice
- 🔇 Toggle audio on/off in the top-right header

---

## 🎮 New Features at a Glance

### Professional Header
```
┌─────────────────────────────────────────────────────────────┐
│ ● Nightfall Division — Digital Forensics                   │
│   CASE_0001: The Voss Incident                             │
│                                                             │
│              Evidence: 3/8  [🔊 Audio On]  23:14:55        │
└─────────────────────────────────────────────────────────────┘
```

### Auto-Start Experience
- Opens directly to CASE_0001 (no case selection)
- 3-second briefing → auto-advances
- First file opens automatically

### Case Archive (After Solving)
- Click **"View Case Archive"** after verdict
- See all cases (solved ✓, locked 🔒, open)
- Click any case to start new investigation
- Track your progress

---

## 🎛️ Controls

| Action | Location |
|--------|----------|
| Toggle Audio | Top-right header (speaker icon) |
| View Cases | After solving → "View Case Archive" |
| Close Narration | X button on narration overlay |

---

## 💡 Without API Key?

The app works fine without an API key:
- ✅ Text narration still appears
- ✅ All game features work
- ⚠️ No voice audio (console warning)

---

## 🎯 Quick Test

1. **Start app** → See CASE_0001 briefing
2. **Wait 3 seconds** → Investigation starts
3. **Open "emails.txt"** → Hear narration + see text
4. **Click speaker icon** → Toggle audio off/on
5. **Solve case** → View Case Archive

---

## 🐛 Not Working?

**No audio?**
```bash
# Check your .env.local file exists
ls -la .env.local

# Restart dev server
npm run dev
```

**Still no audio?**
- Check browser console for errors
- Verify API key is correct (no spaces)
- Click page first (browser autoplay policy)

---

## 📊 Free Tier Limits

- **10,000 characters/month**
- **~100-200 chars per narration**
- **~50-100 files opened/month**
- **6-7 complete playthroughs**

More than enough for development! 🎉

---

## 🎨 Customize Voice

Edit `src/lib/elevenlabs.ts`:

```typescript
// Change this line:
const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel

// To one of these:
const VOICE_ID = "EXAVITQu4vr4xnSDxMaL"; // Sarah
const VOICE_ID = "ErXwobaYiN019PkySvjV"; // Antoni (deep)
const VOICE_ID = "MF3mGyEYCl7XYWbV9V6O"; // Elli (energetic)
```

Browse more voices: https://elevenlabs.io/voice-library

---

## 📚 More Info

- **Full Setup Guide**: `ELEVENLABS_SETUP.md`
- **Update Summary**: `UPDATE_SUMMARY.md`
- **ElevenLabs Docs**: https://elevenlabs.io/docs

---

**Happy investigating, detective! 🕵️‍♀️**