import DOMPurify from "npm:dompurify";
import { Chord } from "./chord.ts";
import { allChords, chords } from "./db.ts";

function getHighlightTable(chord: Chord) {
  const maxLength = 12 * 3;
  let highlightTable: boolean[] = Array(maxLength).fill(false);
  const startIndex = chord.key;
  highlightTable[startIndex] = true;
  chord.intervals.reduce((previousValue, currentValue) => {
    const accumulate = previousValue + currentValue;
    if (accumulate < maxLength) {
      highlightTable[accumulate] = true;
    } else {
      console.log("chord cannot fit in 3 octaves", chord);
    }
    return accumulate;
  }, startIndex);
  // remove the last octave if empty
  if (highlightTable.slice(-12).every((v) => !v)) {
    highlightTable = highlightTable.slice(0, 24);
  }
  return highlightTable;
}

function chordAlignMid(highlightTable: boolean[]): boolean[] {
  // if all the notes are in first 2/3 of the keyboard (3 octaves)
  if (highlightTable.slice(24).every((h) => h === false)) {
    // move notes to the middle octave
    return Array(12).fill(false).concat(highlightTable.slice(0, 24));
  } else {
    // otherwise, do not move notes. Notes will use octave 4 as base
    return highlightTable;
  }
}

function findChordByName(key: string, chordName: string) {
  return chords[key].find((c) => {
    if (c.name === chordName) return true;
    return false;
  });
}

// C-flat.. -> Cb
function decodeKey(key: string): string {
  return key.replace("-flat", "♭").replace("-sharp", "♯");
}
// C♯ -> C-sharp
function urlEncodeKey(key: string): string {
  return key.replace("♯", "-sharp").replace("♭", "-flat");
}
// ♯->sharp  /->_  ' '->-
function urlEncodeChord(chordName: string): string {
  return chordName.replace(/♯/g, "sharp").replace(/♭/g, "b").replace(/\//g, "_")
    .replace(/ /g, "-");
}
function decodeChord(chordName: string): string {
  return chordName.replace(/sharp/g, "♯").replace(/b/g, "♭").replace(
    /_/g,
    "/",
  ).replace(/-/g, " ");
}

function chordFilterByKeyword(kw: string) {
  return (chord: Chord) => {
    kw = kw.toLowerCase().replace(" ", "").replace("♯", "#").replace("♭", "b");
    const allNames = chord.possibleNames.map((str: string) =>
      str.toLowerCase().replace(" ", "").replace("♯", "#").replace("♭", "b")
    );
    return allNames.some((name) => name.indexOf(kw) !== -1);
  };
}

function searchForChord(kw: string): Chord[] {
  type ChordScore = {
    chord: Chord;
    score: number;
  };
  kw = kw.toLowerCase().replace(" ", "").replace("♯", "#").replace("♭", "b");
  if (!kw) return [];
  const chordsWithScores: ChordScore[] = allChords.map((chord) => {
    let score = 0;
    const allNames = chord.possibleNames.map((str: string) =>
      str.toLowerCase().replace(" ", "").replace("♯", "#").replace("♭", "b")
    );
    allNames.forEach((name) => {
      if (name === kw) {
        score += 1;
      } else if (name.indexOf(kw) !== -1) {
        score += 0.1;
      }
    });
    score /= allNames.length;
    return { chord, score };
  });
  const result = chordsWithScores.sort((a, b) => (b.score - a.score)).filter(
    (cs) => cs.score > 0,
  ).map((cs) => cs.chord).slice(0, 20);
  return result;
}

function inferChord(
  kw: string,
): { chord?: Chord | string; chordDisplay: string } {
  function convertToLowerCaseExceptM(str: string) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i);
      if (char !== "M") {
        result += char.toLowerCase();
      } else {
        result += char;
      }
    }
    return result;
  }
  const originalKw = kw;
  kw = kw.trim().replace(" ", "").replace("♯", "#").replace("♭", "b");
  const kwM = convertToLowerCaseExceptM(kw);
  const kwm = kw.toLowerCase();
  if (!kw) return { chordDisplay: "" };
  // search for result without lowercase M to m
  for (const chord of allChords) {
    const allNames = chord.possibleNames.map((str: string) =>
      convertToLowerCaseExceptM(str).replace(" ", "").replace("♯", "#").replace(
        "♭",
        "b",
      )
    );
    for (const [i, name] of allNames.entries()) {
      if (name === kwM) {
        return {
          chord,
          chordDisplay: chord.possibleNames[i],
        };
      }
    }
  }
  // if cannot find a match, lowercase M to m
  for (const chord of allChords) {
    const allNames = chord.possibleNames.map((str: string) =>
      str.toLowerCase().replace(" ", "").replace("♯", "#").replace("♭", "b")
    );
    for (const [i, name] of allNames.entries()) {
      if (name === kwm) {
        return {
          chord,
          chordDisplay: chord.possibleNames[i],
        };
      }
    }
  }
  return {
    chord: originalKw,
    chordDisplay: originalKw,
  };
}

const delay = (t: number) => new Promise((resolve) => setTimeout(resolve, t));

function sum(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0);
}

function randomList(n: number, a: number, b: number) {
  // create a list of n numbers between a and b
  const list = [];
  for (let i = 0; i < n; i++) {
    list[i] = Math.random() * (b - a) + a;
  }
  return list;
}

function descriptives(list: number[]) {
  // compute mean, sd and the interval range: [min, max]
  let mean, sd, i, len = list.length, sum, a = Infinity, b = -a;
  for (sum = i = 0; i < len; i++) {
    sum += list[i];
    a = Math.min(a, list[i]);
    b = Math.max(b, list[i]);
  }
  mean = sum / len;
  for (sum = i = 0; i < len; i++) {
    sum += (list[i] - mean) * (list[i] - mean);
  }
  sd = Math.sqrt(sum / (len - 1));
  return {
    mean: mean,
    sd: sd,
    range: [a, b],
  };
}

function forceDescriptives(list: number[], mean: number, sd: number) {
  // transfom a list to have an exact mean and sd
  const oldDescriptives = descriptives(list),
    oldMean = oldDescriptives.mean,
    oldSD = oldDescriptives.sd,
    newList = [],
    len = list.length;
  for (let i = 0; i < len; i++) {
    newList[i] = sd * (list[i] - oldMean) / oldSD + mean;
  }
  return newList;
}

function sanitize(str: string): string {
  str = DOMPurify.sanitize(str);
  str = str.replace(/(\r\n|\n|\r)/gm, "").replace(/<.*?>/gm, "");
  return str;
}

export {
  chordAlignMid,
  chordFilterByKeyword,
  decodeChord,
  decodeKey,
  delay,
  descriptives,
  findChordByName,
  forceDescriptives,
  getHighlightTable,
  inferChord,
  randomList,
  sanitize,
  searchForChord,
  sum,
  urlEncodeChord,
  urlEncodeKey,
};
