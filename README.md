# 🕵️ Code Noir

A noir-themed detective game built with **Next.js**, **React**, and **ElevenLabs TTS**. Investigate cryptographic mysteries, analyze digital forensics, and solve complex cases using 8 interactive detective simulator systems.

![Code Noir Banner](https://img.shields.io/badge/Genre-Detective%20Game-blue?style=flat-square)
![Status](https://img.shields.io/badge/Status-Production%20Ready-green?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)
![Node](https://img.shields.io/badge/Node-18%2B-blue?style=flat-square)

---

## 🎮 Features

### Core Detective Game
- **12 Interactive Cases** + Hidden mysteries (0001-0012, 0047 "The Voss Incident")
- **File Explorer Interface** - Navigate crime scene evidence like a real forensic analyst
- **Evidence Board System** - Pin and organize clues to build your investigation timeline
- **Professional Narration** - ElevenLabs TTS voice guidance throughout gameplay
- **Noir UI Theme** - Dark, atmospheric interface with high-contrast readability

### 8 Detective Simulator Systems
1. **Terminal Simulator** - Execute forensic commands with hidden secrets
2. **Fingerprint Scanner** - Match suspects' prints with crime scene evidence
3. **BTC Tracer** - Trace cryptocurrency transactions across the blockchain
4. **Voice Stress Analyzer** - Analyze suspect interviews for deception indicators
5. **DNA Lab** - Process biological evidence with genetic sequence analysis
6. **Phone Forensics** - Extract data from locked suspect devices
7. **IP Trace** - Geolocate network connections and track digital footprints
8. **Case Strength Meter** - Real-time verdict strength indicator based on evidence

### Technical Features
- **Web Audio API** - Authentic phone ringtone generation
- **Monaco Editor Integration** - View and analyze source code files
- **Responsive Design** - Plays great on desktop and tablets
- **Server-Side TTS Proxy** - Secure API key handling
- **Vanilla JavaScript Simulators** - No heavy dependencies

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**
- **ElevenLabs API Key** (free tier available at https://elevenlabs.io)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Munazir151/codenoir.git
   cd codenoir
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure ElevenLabs API**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local and add your ElevenLabs API key
   # Get your free key at: https://elevenlabs.io/app/settings/api-keys
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📖 How to Play

### Game Flow
1. **Welcome Screen** - Choose your detective name and select a case
2. **File Explorer** - Browse crime scene evidence and open files
3. **Investigation** - Read clues, open evidence, and pin important findings
4. **Simulator Systems** - Use the 8 tools to analyze evidence scientifically
5. **Evidence Board** - Track your clues and build your case
6. **Verdict** - Submit your accusation when you've solved the mystery

### Controls
- **Click Files** - Open evidence and trigger narration
- **Pin Clues** - Click the pin icon to add evidence to your investigation board
- **Terminal** - Press `` ` `` to open the terminal simulator
- **Simulators** - Access from the HUD overlay menu
- **Audio** - Toggle narration on/off in the top-right header

### Tips for Detectives
- 🔍 **Read Everything** - Text files contain critical clues
- 🎯 **Follow the Hints** - Use the hint system when stuck
- 💾 **Pin Key Evidence** - Build a strong case on the evidence board
- 🔊 **Listen Carefully** - Narration provides important context
- 🧬 **Use All Tools** - Each simulator reveals different evidence angles

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI component framework
- **Next.js 14** - React framework with API routes
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Monaco Editor** - Code viewing component

### Backend
- **Next.js API Routes** - Serverless backend
- **ElevenLabs API** - Professional TTS narration

### Audio & Visualization
- **Web Audio API** - Ringtone generation and audio playback
- **Canvas API** - Real-time waveform visualization
- **SVG** - Network graphs and maps

### DevTools
- **TypeScript** - Type-safe JavaScript
- **ESLint** - Code quality
- **PostCSS** - CSS processing

---

## 🔐 Security & Privacy

### API Key Protection
- ElevenLabs API key is stored **server-side only** (never exposed to client)
- Never commit `.env.local` (protected by `.gitignore`)
- Use `.env.local.example` as template for users

### No Data Collection
- Code Noir does not collect user data
- All game state is stored locally in browser
- No analytics or tracking

---

## 📦 Build & Deployment

### Development
```bash
npm run dev     # Start development server with hot reload
```

### Production Build
```bash
npm run build   # Create optimized production bundle
npm start       # Run production server
```

### Deployment Targets
- **Vercel** - Recommended (zero-config Next.js deployment)
- **Netlify** - Static export compatible
- **Docker** - Custom container support available
- **Self-hosted** - Standard Node.js server

#### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
# Follow prompts, add ELEVENLABS_API_KEY to production environment
```

---

## 🎓 Case Guide

### Beginner Cases
- **Case 0001: AWS Key Leak** - Learn the evidence system
- **Case 0002: Night Shift Database Breach** - Explore file types

### Intermediate Cases
- **Case 0003: Docker Escape** - Use multiple simulators
- **Case 0004: API Misuse** - Complex evidence chains

### Advanced Cases
- **Case 0005-0012** - Multiple suspects, deep investigations
- **Case 0047: The Voss Incident** - Full feature showcase

---

## 🧑‍💻 Development

### Project Structure
```
codenoir/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/tts/           # ElevenLabs TTS proxy
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Main game page
│   │   └── globals.css        # Global styles
│   ├── components/             # React components (30+)
│   │   ├── GameClient.tsx     # Main game controller
│   │   ├── FileTree.tsx       # Evidence file explorer
│   │   ├── EvidenceBoard.tsx  # Clue pinning system
│   │   ├── *Simulator.tsx     # 8 detective tools
│   │   └── ...
│   ├── data/                   # Case definitions
│   │   ├── cases.ts           # Case registry
│   │   ├── case000X.ts        # Individual cases
│   │   ├── clues.ts           # Evidence library
│   │   └── glossary.ts        # Noir terminology
│   └── lib/
│       └── elevenlabs.ts      # TTS integration
├── public/                     # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

### Adding a New Case
1. Create `src/data/caseXXXX.ts` with case structure
2. Define files, clues, suspects, and hints
3. Register in `src/data/cases.ts`
4. Add case-specific event handlers in `GameClient.tsx`

### Adding a Simulator
1. Create `src/components/[Name]Simulator.tsx`
2. Implement vanilla JS logic (no external libraries)
3. Export with proper TypeScript types
4. Integrate into `HUDOverlay.tsx` menu
5. Connect results to evidence board pins

---

## 🤝 Contributing

We welcome contributions! Whether you're adding new cases, improving simulators, or fixing bugs:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-case`)
3. **Commit** your changes (`git commit -m 'Add new detective case'`)
4. **Push** to your fork (`git push origin feature/amazing-case`)
5. **Open a Pull Request** with description of changes

### Contribution Ideas
- 🕵️ **New Cases** - Detective mysteries with unique evidence chains
- 🔧 **Simulator Improvements** - Better UX for existing tools
- 🎨 **UI/UX** - Enhanced noir aesthetic
- 🐛 **Bug Fixes** - Performance and compatibility fixes
- 📚 **Documentation** - Guides for case creators
- 🌐 **Internationalization** - Multi-language support

---

## 📝 License

Code Noir is released under the **MIT License** - see [LICENSE](LICENSE) file for details.

### You Are Free To:
✅ Use commercially  
✅ Modify the code  
✅ Distribute copies  
✅ Include in closed-source projects  

### You Must:
📋 Include the license and copyright notice  

---

## 🌟 Credits

**Created by:** Mohammed Munazir  
**Framework:** Next.js 14  
**Voice Generation:** ElevenLabs API  
**Styling:** Tailwind CSS  
**Animations:** Framer Motion  

---

## 📧 Support & Contact

- **Issues:** Use GitHub Issues for bug reports
- **Discussions:** GitHub Discussions for feature requests
- **Email:** dev@codenoir.local
- **Twitter:** [@CodeNoirGame](https://twitter.com/codenoir)

---

## 🎯 Roadmap

- [ ] Mobile app version (React Native)
- [ ] Multiplayer investigation mode
- [ ] Custom case creator tools
- [ ] Leaderboard system
- [ ] Advanced AI suspect interrogation
- [ ] VR detective experience
- [ ] Community case sharing platform

---

## ⭐ Show Your Support

If you love Code Noir, please:
- ⭐ Star this repository
- 🔄 Share with other detective game enthusiasts
- 💬 Provide feedback and suggestions
- 🐛 Report bugs you find

**Happy investigating, Detective!** 🕵️‍♂️

---

**Last Updated:** April 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
