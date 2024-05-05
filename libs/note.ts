import {
  bwMap,
  chromaticNames,
  KeyName,
  Keys,
  Octave,
  OctaveKeyCount,
} from "./key.ts";
import piano from "@/libs/audio.ts";

class Note {
  key: KeyName;
  octave: Octave;

  constructor(key: KeyName, octave: Octave) {
    this.key = key;
    this.octave = octave;
  }

  play() {
    return piano.play(Keys[this.key], this.octave);
  }

  toString() {
    return chromaticNames[Keys[this.key]] + this.octave;
  }

  valueOf() {
    return this.octave * OctaveKeyCount + this.key;
  }

  get bw() {
    return bwMap[Keys[this.key]];
  }
}

export { Note };
