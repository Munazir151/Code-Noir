# Code Noir - ElevenLabs Integration & Professional UI Update

## Overview

Code Noir has been upgraded with professional voice narration powered by ElevenLabs AI and a complete UI overhaul to look like real law enforcement forensics software.

---

## ✨ What's New

### 1. **ElevenLabs Voice Narration**
- Professional AI voice narration for detective insights
- Automatic audio playback when opening files
- Visual indicators showing when audio is playing
- Toggle audio on/off via Detective Header
- Graceful degradation (works without API key)

### 2. **Professional Detective Header**
- Law enforcement style header (not game-like)
- Real-time clock display
- Evidence collection counter
- Audio control toggle
- "Nightfall Division — Digital Forensics" branding

### 3. **Case Archive System (Dossier)**
- Professional filing cabinet interface
- Appears after solving a case
- Shows all available cases
- Tracks solved/locked status
- Color-coded difficulty badges
- Reinvestigate solved cases

### 4. **Auto-Start Experience**
- Game now starts directly with CASE_0001
- Quick 3-second briefing screen (auto-advances)
- No case selection screen at start
- Case archive opens after solving

---

## 📁 Files Created

```
codenoir/
├── src/
│   ├── lib/
│   │   └── elevenlabs.ts                # NEW: ElevenLabs API integration
│   └── components/
│       ├── DetectiveHeader.tsx          # NEW: Professional header component
│       ├── CaseDossier.tsx              # NEW: Case archive browser
│       └── NarrationOverlay.tsx         # UPDATED: Audio support added
├── .env.local.example                   # NEW: Environment template
├── ELEVENLABS_SETUP.md                  # NEW: Setup guide
└── UPDATE_SUMMARY.md                    # NEW: This file
```

---

## 🎯 Key Features

### ElevenLabs Integration (`src/lib/elevenlabs.ts`)

**Functions:**
- `speak(options)` - Play text-to-speech audio
- `stopSpeaking()` - Stop current audio
- `isSpeaking()` - Check playback status

**Configuration:**
- Voice: Rachel (professional female narrator)
- Stability: 0.75
- Similarity Boost: 0.85
- Volume: 0.8

**API Endpoint:**
```
POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}
```

### Detective Header Component

**Features:**
- Division branding with live status indicator
- Case number and title display
- Evidence counter (X / Y ITEMS)
- Audio toggle button with icon
- Real-time clock (24-hour format + date)
- Professional color scheme (#05050c background)

**Props:**
```typescript
interface DetectiveHeaderProps {
  caseNumber: string;
  caseTitle: string;
  cluesFound: number;
  totalClues: number;
  audioEnabled: boolean;
  onToggleAudio: () => void;
}
```

### Case Dossier Component

**Features:**
- Modal overlay with backdrop blur
- Grid layout (2 columns on desktop)
- Case cards with:
  - Case number badge
  - Title and tagline
  - Difficulty badge (color-coded)
  - Solved/locked indicators
  - Hover effects
- Click to start investigation
- ESC or X to close

**Props:**
```typescript
interface CaseDossierProps {
  cases: FullCase[];
  solvedCaseIds: Set<string>;
  onSelectCase: (id: string) => void;
  onClose: () => void;
}
```

---

## 🚀 Setup Instructions

### Step 1: Get ElevenLabs API Key

1. Visit https://elevenlabs.io/
2. Sign up (free tier: 10,000 chars/month)
3. Go to Settings → API Keys
4. Copy your API key

### Step 2: Configure Environment

```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local and add your key
NEXT_PUBLIC_ELEVENLABS_API_KEY=your_api_key_here
```

### Step 3: Restart Dev Server

```bash
npm run dev
```

---

## 🎮 How to Use

### Starting the Game

1. Open the app - you'll see **CASE_0001** briefing
2. Wait 3 seconds (or click anywhere to skip)
3. Investigation starts automatically
4. First file opens after onboarding

### Audio Controls

**Enable/Disable Audio:**
- Click the speaker icon in the top-right header
- "Audio On" / "Audio Off" indicator

**Audio Playback:**
- Plays automatically when opening files (if enabled)
- Visual pulse icon (🔊) appears during playback
- Typewriter text syncs with audio

### After Solving a Case

1. Select suspect in SOLVE.sh terminal
2. View verdict screen
3. Click **"View Case Archive"**
4. Case Dossier opens showing:
   - ✓ Solved cases (checkmark icon)
   - 🔒 Locked cases (requires progression)
   - Open cases (click to investigate)

---

## 🎨 UI Color Scheme

### Detective Header
- Background: `#05050c` (deep dark)
- Border: `#0f0f1a`
- Text: `#c8c8d4` (light gray)
- Amber accent: `#d4a017`
- Muted text: `#4a4a6a`
- Status indicator: `#27ae60` (green pulse)

### Case Dossier
- Difficulty colors:
  - Tutorial: `#3b82f6` (blue)
  - Easy: `#27ae60` (green)
  - Medium: `#d4a017` (amber)
  - Hard: `#c0392b` (red)

---

## 🔧 Technical Details

### Audio Flow

```
File Opened
    ↓
NarrationOverlay receives text
    ↓
If audioEnabled → speak()
    ↓
Fetch ElevenLabs API
    ↓
Blob → Audio element
    ↓
Play audio + typewriter effect
    ↓
On end → cleanup
```

### State Management (GameClient)

```typescript
const [audioEnabled, setAudioEnabled] = useState(true);
const [solvedCaseIds, setSolvedCaseIds] = useState<Set<string>>(new Set());
const [showDossier, setShowDossier] = useState(false);
```

### Intro Screen Auto-Advance

```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    onEnter(); // Start investigation
  }, 3000);
  
  return () => clearTimeout(timer);
}, [onEnter]);
```

---

## 🔒 Security

- ✅ API key in `.env.local` (gitignored)
- ✅ `NEXT_PUBLIC_` prefix (client-safe)
- ⚠️ Key visible in browser (ElevenLabs design)
- 💡 Add domain restrictions in production

---

## 📊 Cost Estimation

**Free Tier:**
- 10,000 characters/month
- ~100-200 chars per narration
- ~50-100 narrations/month
- 6-7 complete playthroughs

**Paid Starter ($5/month):**
- 30,000 characters
- ~150-300 narrations
- ~20 complete playthroughs

---

## 🐛 Troubleshooting

### Audio Not Playing

**Check:**
1. `.env.local` has correct API key
2. Dev server was restarted
3. Audio toggle is "On"
4. Browser autoplay policy (click page first)

### API Errors

**401 Unauthorized:**
- Invalid API key → Check `.env.local`

**429 Too Many Requests:**
- Rate limit exceeded → Wait or upgrade plan

**Network Error:**
- CORS issue → Should work (ElevenLabs allows browser)

### TypeScript Errors

If you see JSX errors after creating files:
1. Restart TypeScript server (VS Code: Cmd+Shift+P → "Restart TS Server")
2. Run `npm run build` to verify
3. Errors should clear automatically

---

## 🎯 Future Enhancements

### Planned Features
- [ ] Different voices per character
- [ ] Voice settings UI (speed, pitch)
- [ ] Audio caching (reduce API calls)
- [ ] Narration queue system
- [ ] Subtitles/closed captions
- [ ] Audio waveform visualization

### Advanced Ideas
- [ ] Dynamic voice based on emotion
- [ ] Ambient background sounds
- [ ] Case-specific music themes
- [ ] Voice-activated commands
- [ ] Multi-language support

---

## 📚 Resources

- [ElevenLabs Docs](https://elevenlabs.io/docs)
- [Voice Lab](https://elevenlabs.io/voice-lab)
- [API Reference](https://elevenlabs.io/docs/api-reference)
- [Code Noir GitHub](#) *(add your repo link)*

---

## ✅ Testing Checklist

- [ ] Audio plays when opening files
- [ ] Audio toggle works (on/off)
- [ ] Narration overlay shows volume icon
- [ ] Detective header displays correctly
- [ ] Clock updates every second
- [ ] Evidence counter increments
- [ ] Case dossier opens after solving
- [ ] Solved cases show checkmark
- [ ] Can select new case from dossier
- [ ] Auto-advance works (3 seconds)
- [ ] Works without API key (graceful)

---

## 💡 Usage Tips

1. **Test without API key first** - Make sure UI works
2. **Add API key** - Enable narration
3. **Check browser console** - See ElevenLabs logs
4. **Monitor usage** - Track character count in ElevenLabs dashboard
5. **Customize voice** - Edit `VOICE_ID` in `elevenlabs.ts`

---

## 🎉 Summary

Code Noir now features:
- ✅ Professional law enforcement UI
- ✅ AI voice narration (ElevenLabs)
- ✅ Audio controls in header
- ✅ Case archive system
- ✅ Auto-start experience
- ✅ Solved case tracking
- ✅ Graceful degradation

**Ready to investigate! 🕵️‍♀️**

---

*Last Updated: 2024*
*Code Noir v2.0 - ElevenLabs Integration*