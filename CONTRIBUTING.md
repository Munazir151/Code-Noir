# Contributing to Code Noir

Thank you for your interest in contributing to Code Noir! This document provides guidelines and instructions for contributing.

## 🎯 Code of Conduct

Be respectful, inclusive, and constructive. We're building a fun detective game together!

---

## 🚀 Getting Started

### 1. Fork & Clone
```bash
# Fork the repo on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/codenoir.git
cd codenoir
```

### 2. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
# Or for bug fixes:
git checkout -b fix/bug-description
```

### 3. Set Up Development Environment
```bash
npm install
cp .env.local.example .env.local
# Add your ElevenLabs API key to .env.local
npm run dev
```

---

## 💡 Types of Contributions

### 🕵️ Add a New Detective Case
The most impactful way to contribute!

1. **Create case file** `src/data/caseXXXX.ts`
   ```typescript
   import { Case, CaseFile, Clue, Suspect } from './cases';

   export const caseXXXX: Case = {
     id: "XXXX",
     title: "Case Title",
     description: "Brief case description...",
     difficulty: "intermediate",
     suspects: [
       { id: "suspect1", name: "Name", role: "Role", bio: "..." },
       // ...
     ],
     files: [
       { id: "file1", name: "filename.ts", content: "...", locked: false },
       // ...
     ],
     clues: [
       { id: "clue1", title: "Clue Title", content: "Details...", critical: true },
       // ...
     ],
     hints: [
       "Hint 1",
       "Hint 2",
       // ...
     ],
     verdict: {
       correctSuspect: "suspect1",
       correctMethod: "Method of attack",
       correctMotive: "Motive for crime"
     }
   };
   ```

2. **Register in** `src/data/cases.ts`
   ```typescript
   import { caseXXXX } from './caseXXXX';
   
   export const ALL_CASES = [
     // ... existing cases
     caseXXXX,
   ];
   ```

3. **Add case-specific logic** in `src/components/GameClient.tsx`
   - Implement file open handlers
   - Register evidence pins
   - Trigger simulators or modals

4. **Test thoroughly**
   - Play through the entire case
   - Verify all clues are discoverable
   - Test all simulators with the case evidence

### 🔧 Improve Detective Simulators

Each simulator should:
- ✅ Use vanilla JavaScript (no external UI libraries)
- ✅ Be case-agnostic (work with any evidence)
- ✅ Provide clear UX feedback
- ✅ Return structured results to evidence board
- ✅ Support dark mode / noir aesthetic

Example simulator structure:
```typescript
// src/components/NewSimulator.tsx
'use client';
import { useState } from 'react';

interface SimulatorProps {
  caseId: string;
  onClose: () => void;
  onResult?: (result: SimulatorResult) => void;
}

interface SimulatorResult {
  title: string;
  content: string;
  critical: boolean;
}

export default function NewSimulator({ caseId, onClose, onResult }: SimulatorProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
      {/* Simulator UI */}
      <div className="bg-noir-bg border border-noir-amber rounded-lg p-6 max-w-2xl w-full">
        {/* Your simulator content */}
      </div>
    </div>
  );
}
```

### 🎨 UI/UX Improvements

- Enhance noir aesthetic
- Improve readability
- Add animations
- Better mobile support
- Accessibility improvements

### 📚 Documentation

- Case guides
- Developer tutorials
- API documentation
- Glossary expansions

### 🐛 Bug Fixes

- Performance optimizations
- Compatibility issues
- UI glitches
- Audio problems

---

## ✍️ Commit Guidelines

Use clear, descriptive commit messages:

```bash
# Good commits
git commit -m "Add Case 0013: The Network Intrusion"
git commit -m "Fix fingerprint scanner rotation logic"
git commit -m "Improve evidence board drag performance"

# Avoid vague commits
git commit -m "Update stuff"
git commit -m "Fix things"
```

### Commit Types
- `feat:` New case or simulator
- `fix:` Bug fix
- `improve:` Performance or UX enhancement
- `refactor:` Code restructuring
- `docs:` Documentation updates
- `style:` CSS/styling changes
- `test:` Tests or validation

---

## 🧪 Testing Your Changes

### Before Submitting a PR:

1. **No TypeScript Errors**
   ```bash
   npm run build
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   # Open http://localhost:3000
   # Test your changes thoroughly
   ```

3. **Test in Different Browsers**
   - Chrome/Edge
   - Firefox
   - Safari

4. **Mobile Testing**
   - Open DevTools (F12)
   - Toggle device toolbar
   - Test touch interactions

---

## 📤 Creating a Pull Request

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a PR on GitHub**
   - Clear title: `Add Case 0013: The Network Intrusion`
   - Description of changes
   - Screenshots/GIFs if visual changes
   - Link related issues

3. **PR Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type
   - [ ] New case
   - [ ] Simulator improvement
   - [ ] Bug fix
   - [ ] UI/UX enhancement
   - [ ] Documentation

   ## Testing
   - [ ] Tested locally
   - [ ] No TypeScript errors
   - [ ] Verified in multiple browsers
   - [ ] Mobile responsive

   ## Checklist
   - [ ] Follows code style
   - [ ] No credentials exposed
   - [ ] Includes comments for complex logic
   - [ ] Works with existing features
   ```

---

## 🎓 Code Style Guidelines

### TypeScript/React
```typescript
// Use clear, descriptive names
const handleEvidencePinning = () => {
  // ...
};

// Type your props
interface ComponentProps {
  caseId: string;
  onClose: () => void;
}

// Use const for functions
const MyComponent: React.FC<ComponentProps> = ({ caseId, onClose }) => {
  return <div>...</div>;
};

// Handle errors gracefully
try {
  const result = await fetchData();
} catch (error) {
  console.error('Failed to fetch:', error);
  // Show user-friendly error
}
```

### Tailwind CSS
```jsx
// Prefer Tailwind utilities
<div className="bg-noir-bg border border-noir-amber rounded-lg p-6">
  {/* Use custom noir colors from tailwind.config.ts */}
</div>

// Avoid inline styles unless necessary
// Don't use arbitrary values when noir theme exists
```

### File Structure
```
src/
├── components/
│   └── MyNewComponent.tsx  // PascalCase for components
├── lib/
│   └── myUtility.ts        // camelCase for utils
└── data/
    └── caseData.ts         // Organized by feature
```

---

## 🐛 Reporting Bugs

If you find a bug:

1. **Check existing issues** - Don't duplicate
2. **Create a detailed report**
   ```markdown
   ## Bug Description
   Clear description of the bug

   ## Steps to Reproduce
   1. Open case XXXX
   2. Click on file Y
   3. Expected: Z
   4. Actual: W

   ## Environment
   - OS: Windows/Mac/Linux
   - Browser: Chrome/Firefox/Safari
   - Node version: 18.x

   ## Screenshots
   [If applicable]
   ```

---

## ❓ Questions or Need Help?

- 💬 Open a GitHub Discussion
- 📧 Email: dev@codenoir.local
- 🤔 Check existing documentation first

---

## 🎉 What Happens After You Submit a PR

1. **Review** - Code maintainers will review your changes
2. **Feedback** - May ask for revisions
3. **Approval** - Once approved, we'll merge it
4. **Release** - Your contribution goes live! 🚀

---

## 📖 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [ElevenLabs API](https://elevenlabs.io/docs)

---

## 🌟 Thank You!

Your contributions make Code Noir better for everyone. We appreciate your dedication to creating awesome detective games! 🕵️‍♂️

**Happy contributing, Detective!**
