export type KeyName =
  | "C"
  | "C♯"
  | "D♭"
  | "D"
  | "D♯"
  | "E♭"
  | "E"
  | "F"
  | "F♯"
  | "G♭"
  | "G"
  | "G♯"
  | "A♭"
  | "A"
  | "A♯"
  | "B♭"
  | "B";

const Keys: Record<KeyName, number> = {
  "C": 0,
  "C♯": 1,
  "D♭": 1,
  "D": 2,
  "D♯": 3,
  "E♭": 3,
  "E": 4,
  "F": 5,
  "F♯": 6,
  "G♭": 6,
  "G": 7,
  "G♯": 8,
  "A♭": 8,
  "A": 9,
  "A♯": 10,
  "B♭": 10,
  "B": 11,
};

enum bw {
  "white" = 0,
  "black" = 1,
}

const bwMap = [
  bw.white,
  bw.black,
  bw.white,
  bw.black,
  bw.white,
  bw.white,
  bw.black,
  bw.white,
  bw.black,
  bw.white,
  bw.black,
  bw.white,
];

const simpleKeys: KeyName[] = [
  "C",
  "C♯",
  "D♭",
  "D",
  "D♯",
  "E♭",
  "E",
  "F",
  "F♯",
  "G♭",
  "G",
  "G♯",
  "A♭",
  "A",
  "A♯",
  "B♭",
  "B",
];

const chromaticNames: KeyName[] = [
  "C",
  "D♭",
  "D",
  "E♭",
  "E",
  "F",
  "F♯",
  "G",
  "A♭",
  "A",
  "B♭",
  "B",
];

const possibleKeyNames: KeyName[][] = [
  ["C"],
  ["C♯", "D♭"],
  ["D"],
  ["D♯", "E♭"],
  ["E"],
  ["F"],
  ["F♯", "G♭"],
  ["G"],
  ["G♯", "A♭"],
  ["A"],
  ["A♯", "B♭"],
  ["B"],
];

const OctaveKeyCount = 12;

export type Octave = 2 | 3 | 4 | 5 | 6;

export {
  bw,
  bwMap,
  chromaticNames,
  Keys,
  OctaveKeyCount,
  possibleKeyNames,
  simpleKeys,
};
