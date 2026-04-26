export interface GlossaryTerm {
  term: string;
  definition: string;
  category: "crypto" | "security" | "code" | "forensics";
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: "Seed Phrase",
    definition:
      "A sequence of 12–24 words that serves as the master key to a cryptocurrency wallet. Anyone with your seed phrase can access and drain all funds. Never store it in code.",
    category: "crypto",
  },
  {
    term: "Cold Wallet",
    definition:
      "A cryptocurrency wallet that is not connected to the internet. Considered more secure than hot wallets. Voss's wallet was cold — until the seed phrase was exposed in his code.",
    category: "crypto",
  },
  {
    term: "Coinjoin / Mixer",
    definition:
      "A method of obscuring cryptocurrency transactions by pooling multiple users' coins together, making it harder to trace the origin of funds.",
    category: "crypto",
  },
  {
    term: "KYC (Know Your Customer)",
    definition:
      "A regulatory requirement for financial institutions to verify the identity of their customers. Exchanges with KYC have identity records — which is why the frozen CVX account is traceable.",
    category: "crypto",
  },
  {
    term: "Blockchain",
    definition:
      "A public, immutable, distributed ledger that records all cryptocurrency transactions. Every transaction is permanently visible to anyone — it cannot be deleted or altered.",
    category: "crypto",
  },
  {
    term: "Tor",
    definition:
      "The Onion Router — a network that anonymizes internet traffic by routing it through multiple servers. IP 185.220.101.47 is a known Tor exit node.",
    category: "security",
  },
  {
    term: "Gait Analysis",
    definition:
      "A forensic technique that identifies individuals based on their walking pattern. As unique as a fingerprint, it can identify people even when their face is obscured.",
    category: "forensics",
  },
  {
    term: "Git Blame",
    definition:
      "A git command that shows which developer last modified each line of a file, and when. In this case it revealed that Voss was the last person to touch the file with the seed phrase.",
    category: "code",
  },
  {
    term: "Shell Company",
    definition:
      "A company that exists only on paper with no real business operations, used to move money anonymously. Meridian Capital Partners LLC is an example.",
    category: "forensics",
  },
  {
    term: "OFAC SDN List",
    definition:
      "The Office of Foreign Assets Control Specially Designated Nationals list — a US government list of entities subject to financial sanctions. ChainBlind_v3 is on this list.",
    category: "security",
  },
];
