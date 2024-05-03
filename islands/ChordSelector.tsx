import { Component } from "preact";
import ChordThumbnail from "@/islands/ChordThumbnail.tsx";
import { KeyName, simpleKeys } from "@/libs/key.ts";
import {
  chordFilterByKeyword,
  urlEncodeChord,
  urlEncodeKey,
} from "@/libs/helper.ts";
import { chords as Chords } from "@/libs/db.ts";

type ChordSelectorProps = {
  selectedKey: KeyName;
};

type ChordSelectorState = {
  search: string;
};

export default class ChordSelector
  extends Component<ChordSelectorProps, ChordSelectorState> {
  constructor(props: ChordSelectorProps) {
    super(props);
    this.state = { search: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event: KeyboardEvent) {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ search: event.target.value });
    }
  }

  handleClick() {
  }

  render() {
    const selectedKey = this.props.selectedKey;
    const chords = Chords[selectedKey]?.filter(
      chordFilterByKeyword(this.state.search),
    ) || [];

    return (
      <div className="chordSelector-container">
        <input
          type="text"
          placeholder="Search by keywords"
          value={this.state.search}
          onKeyUp={this.handleChange}
          className={"color-" + (simpleKeys.indexOf(selectedKey) + 1)}
        />
        <div className="chord-container">
          {chords.map((c) => (
            <a
              className={"chord color-" +
                (simpleKeys.indexOf(selectedKey) + 1)}
              onClick={this.handleClick}
              draggable={false}
              href={"/chord/" + urlEncodeKey(selectedKey) + "/" +
                urlEncodeChord(c.name)}
            >
              <ChordThumbnail
                chord={c}
                highlightColor={simpleKeys.indexOf(selectedKey) + 1}
              />
              <div className="name">{c.shortName}</div>
            </a>
          ))}
          {chords.length === 0 &&
            (
              <div className="missing-chord">
                No matching chords found! To report missing chord definition,
                open an issue{" "}
                <a href="https://github.com/dunkbing/pianochord/issues">
                  here
                </a>.
              </div>
            )}
        </div>
      </div>
    );
  }
}
