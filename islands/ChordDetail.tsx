import { Component, Fragment } from "preact";

import { Chord } from "@/libs/chord.ts";
import { Keys, simpleKeys } from "@/libs/key.ts";
import { intervalTable, inversionNames } from "@/libs/db.ts";
import ChordThumbnail from "@/islands/ChordThumbnail.tsx";
import { ChevronDown } from "@/components/icon/ChevronDown.tsx";
import { ChevronRight } from "@/components/icon/ChevronRight.tsx";

type ChordDetailProps = {
  chord: Chord;
  inversion: number;
  color: number;
  onInversionChange: (i: number) => void;
};

type ChordDetailState = {
  inversionOpen: boolean;
};

export default class ChordDetail
  extends Component<ChordDetailProps, ChordDetailState> {
  constructor(props: ChordDetailProps) {
    super(props);
    this.state = { inversionOpen: (props.inversion == 0 ? false : true) };
    this.handleInversionClick = this.handleInversionClick.bind(this);
  }

  handleInversionClick(i: number) {
    return () => {
      this.props.onInversionChange(i);
      let path = window.location.pathname.split("/");
      if (path.length == 4) {
        path.push(i.toString());
      } else if (path.length == 5) {
        path[4] = i.toString();
      }
      if (i == 0) path = path.slice(0, 4);
      history.replaceState('chord-detail', '', path.join('/'))
    };
  }

  render() {
    const chord = this.props.chord;

    return (
      <Fragment>
        <div className={"chordDetail-container color-" + this.props.color}>
          <div className="information-container">
            <h1>
              {this.props.inversion === 0
                ? chord.name
                : chord.inversions[this.props.inversion - 1].alias[0]}
            </h1>
            {this.props.inversion === 0 && (
              <div className="information">
                <div>
                  <b>Tonic</b> {chord.tonic}
                </div>
                <div>
                  <b>Interval</b>{" "}
                  {chord.intervals.map((i) => intervalTable[i].abbrev).join(
                    ", ",
                  )}
                </div>
                {chord.quality &&
                  (
                    <div>
                      <b>Quality</b> {chord.quality}
                    </div>
                  )}
                {
                  // if has fullname, display all alias
                  (chord.fullName) &&
                  (
                    <div>
                      <b>Aliases</b> {chord.alias.join(", ")}
                    </div>
                  )
                }
                {
                  // if no fullname, and has >1 alias, display the rest of alias
                  (!chord.fullName && chord.alias.length > 1) &&
                  (
                    <div>
                      <b>Aliases</b> {chord.alias.slice(1).join(", ")}
                    </div>
                  )
                }
              </div>
            )}
            {this.props.inversion > 0 && (
              <div className="information">
                <div>
                  <b>Inversion</b> {inversionNames[this.props.inversion]}
                </div>
                <div>
                  <b>Root Position Chord</b>{" "}
                  {(chord.fullName) ? chord.fullName : chord.alias[0]}
                </div>
                {chord.alias.length > 1 &&
                  (
                    <div>
                      <b>Alias</b>
                      {chord.inversions[this.props.inversion - 1].alias.slice(1)
                        .join(", ")}
                    </div>
                  )}
              </div>
            )}
          </div>
          {chord.inversions.length > 0 &&
            (
              <div className="inversion-container">
                <div
                  className={"inversion-header" +
                    (this.state.inversionOpen ? " open" : "")}
                  onClick={() =>
                    this.setState({ inversionOpen: !this.state.inversionOpen })}
                >
                  <span>Inversions</span>
                  {this.state.inversionOpen
                    ? <ChevronDown size={21} />
                    : <ChevronRight size={21} />}
                </div>
                {this.state.inversionOpen &&
                  (
                    <div className="inversion-content">
                      {[chord, ...chord.inversions].map((c, i) => {
                        const colorIndex = simpleKeys.map((str) =>
                          Keys[str]
                        ).indexOf(c.key) + 1;
                        const inversion = this.props.inversion;
                        return (
                          <a
                            className={"chord color-" + colorIndex +
                              (inversion == i ? " active" : "")}
                            onClick={this.handleInversionClick(i)}
                          >
                            <div className="chord-title">
                              {inversionNames[i]}
                            </div>
                            <ChordThumbnail
                              chord={c}
                              highlightColor={colorIndex}
                            />
                            <div className="chord-name">{`${c.alias[0]}`}</div>
                          </a>
                        );
                      })}
                    </div>
                  )}
              </div>
            )}
        </div>
      </Fragment>
    );
  }
}
