// The Source of Truth for the "Savage Filter" and Lexicon definitions
// Used by both frontend (LexiconPage) and "backend" (TheMirror filter logic)

export const LEXICON_DEFINITIONS = {
    DASH: {
        D: "Day: The primary temporal window of engagement.",
        A: "Atom: The smallest possible unit of action.",
        S: "Step: The immediate physical movement required to initiate momentum.",
        H: "Habit: The permanent 'firmware' of your identity."
    },
    METRICS: {
        WILLPOWER_BATTERY: "Willpower is a finite resource. Don't waste 'juice' on trivial decisions.",
        FORCE_INDICATOR: "Force = Mass x Acceleration. Measures total daily momentum.",
        IRON_MIND: "Stress Score tracking usage of the 'Hard Path'.",
        TAKING_SOULS: "Exceeding target goals by a significant margin (200%+)."
    },
    INFRASTRUCTURE: {
        THE_DASH: "Command Dashboard for situational awareness.",
        THE_LEDGER: "Consolidated historical record (Journal + Progress).",
        THE_VAULT: "Encrypted storage and Telemetry Uplinks.",
        THE_ARCHIVE: "The Armory containing Habit Atoms and Protocol Molecules.",
        GHOST_PROTOCOL: "Fail-safe logic returning safe 'Zero' values."
    }
};

export const WORD_REPLACEMENT_MAP: Record<string, { replacement: string, reason: string }> = {
    "journaling": { replacement: "AAR (After-Action Report)", reason: "Performance audit, not feelings." },
    "habit tracker": { replacement: "Tactical Protocol", reason: "Biological operating procedure." },
    "to-do list": { replacement: "Mission Orders", reason: "Strategic, non-negotiable objectives." },
    "routine": { replacement: "The Rig", reason: "The mechanical structure of your day." },
    "goals": { replacement: "Objectives", reason: "Specific tactical targets." },
    "failed": { replacement: "Data Point", reason: "Analyze and adjust; no room for shame." },
    "failure": { replacement: "Data Point", reason: "Analyze and adjust; no room for shame." },
    "motivation": { replacement: "Momentum", reason: "Physical state vs. fleeting emotion." },
    "preferences": { replacement: "Neural Bridge Config", reason: "System-level configuration." }
};

export const SAVAGE_FILTER = (input: string): { clean: string, flagged: boolean, corrections: string[] } => {
    let clean = input;
    const corrections: string[] = [];
    let flagged = false;

    Object.entries(WORD_REPLACEMENT_MAP).forEach(([soft, { replacement, reason }]) => {
        const regex = new RegExp(`\\b${soft}\\b`, 'gi');
        if (regex.test(clean)) {
            flagged = true;
            // correction logic could replace or just flag
            // For now, we flag it for the "Mirror" to comment on.
            corrections.push(`Detected soft term '${soft}'. Reframe as '${replacement}': ${reason}`);
        }
    });

    return { clean, flagged, corrections };
};
