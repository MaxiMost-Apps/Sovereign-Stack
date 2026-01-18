import { HABIT_ATOMS, PROTOCOL_MOLECULES } from './libraryData';

// Re-export the data arrays
export const atoms = HABIT_ATOMS;
export const molecules = PROTOCOL_MOLECULES;

// Export type definitions if needed
export type Atom = typeof HABIT_ATOMS[number];
export type Molecule = typeof PROTOCOL_MOLECULES[number];
