import { Component, createRef } from "preact";

import Key from "@/islands/Key.tsx";
import { notes as allNotes } from "@/libs/db.ts";

type KeyboardProps = {
  offset: number;
  highlightTable?: boolean[];
  highlightColor?: number;
};

export default class Keyboard extends Component<KeyboardProps> {
  ref = createRef();

  componentDidUpdate() {
    // scroll the first highlighted key into view
    if (this.props.highlightTable) {
      const div = this.ref.current as HTMLElement;
      const firstIndex = this.props.highlightTable.findIndex((item) =>
        item === true
      );
      const lastIndex = this.props.highlightTable.lastIndexOf(true);
      (div.childNodes[lastIndex] as HTMLElement).scrollIntoView();
      (div.childNodes[firstIndex] as HTMLElement).scrollIntoView();
      scrollTo(0, 0);
    }
  }

  render() {
    const offset = 12 * (1 + this.props.offset);
    const notes = allNotes.slice(offset, offset + 36);
    const highlightTable = this.props.highlightTable
      ? this.props.highlightTable
      : Array(36).fill(0);
    const highlightColor = this.props.highlightColor
      ? this.props.highlightColor
      : 1;
    return (
      <div ref={this.ref} className="keyboard-container">
        {notes.map((note, i) => (
          <Key
            note={note}
            highlighted={highlightTable[i]}
            highlightColor={highlightColor}
          />
        ))}
      </div>
    );
  }
}
