import { Component, Fragment } from "preact";

import Keyboard from "@/islands/Keyboard.tsx";
import KeySelector from "@/islands/KeySelector.tsx";
import { KeyName, Keys, simpleKeys } from "@/libs/key.ts";
import ChordSelector from "@/islands/ChordSelector.tsx";
import ChordDetail from "@/islands/ChordDetail.tsx";
import Playbox from "@/islands/Playbox.tsx";
import {
  chordAlignMid,
  findChordByName,
  getHighlightTable,
} from "@/libs/helper.ts";
import { titlePrefix } from "@/libs/constant.ts";

const MAXoctaveAdj = 1;
const MINoctaveAdj = -1;

type ChordPageProps = {
  selectedKey: KeyName;
  selectedChord: string;
  path?: string;
  inversion?: string;
};

type ChordPageState = {
  octaveAdj: number;
  inversion: number;
};

export default class ChordPage
  extends Component<ChordPageProps, ChordPageState> {
  constructor(props: ChordPageProps) {
    super(props);
    this.raiseOctave = this.raiseOctave.bind(this);
    this.lowerOctave = this.lowerOctave.bind(this);
    this.urlDecode = this.urlDecode.bind(this);
    this.handleChangeInversion = this.handleChangeInversion.bind(this);
    let inversion;
    if (!this.props.inversion) {
      inversion = 0;
    } else {
      inversion = parseInt(this.props.inversion);
      if (isNaN(inversion)) inversion = 0;
    }
    this.state = { octaveAdj: 0, inversion };
  }

  raiseOctave() {
    let octaveAdj = this.state.octaveAdj;
    octaveAdj += 1;
    if (octaveAdj > MAXoctaveAdj) octaveAdj = MAXoctaveAdj;
    this.setState({ octaveAdj });
  }

  lowerOctave() {
    let octaveAdj = this.state.octaveAdj;
    octaveAdj -= 1;
    if (octaveAdj < MINoctaveAdj) octaveAdj = MINoctaveAdj;
    this.setState({ octaveAdj });
  }

  handleChangeInversion(inversion: number) {
    this.setState({ inversion });
  }

  urlDecode() {
    const selectedKey = this.props.selectedKey;
    const selectedChord = this.props.selectedChord;
    const inversion = this.state.inversion;
    return { selectedKey, selectedChord, inversion };
  }

  componentDidUpdate() {
    const { selectedKey, selectedChord } = this.urlDecode();
    if (selectedChord) {
      document.title = titlePrefix + " - " + selectedChord;
    } else if (selectedKey) {
      document.title = titlePrefix + " - Key " + selectedKey;
    }
  }

  render() {
    const { selectedKey, selectedChord, inversion } = this.urlDecode();
    if (!selectedKey) {
      window.location.href = "/404";
      return;
    }
    if (!simpleKeys.includes(selectedKey)) {
      window.location.href = "/404";
      return;
    }

    const chord = findChordByName(selectedKey, selectedChord);
    if (!chord) {
      window.location.href = "/404";
      return;
    }

    let highlightTable, colorIndex;
    if (inversion === 0) {
      highlightTable = chordAlignMid(getHighlightTable(chord));
      colorIndex = simpleKeys.indexOf(selectedKey) + 1;
    } else {
      if (chord.inversions.length < inversion) {
        window.location.href = "/404";
        return;
      }
      highlightTable = chordAlignMid(
        getHighlightTable(chord.inversions[inversion - 1]),
      );
      colorIndex = simpleKeys.map((str) =>
        Keys[str]
      ).indexOf(chord.inversions[inversion - 1].key) + 1;
    }
    const color = simpleKeys.indexOf(selectedKey) + 1;

    return (
      <Fragment>
        <Keyboard
          offset={this.state.octaveAdj}
          highlightTable={highlightTable}
          highlightColor={colorIndex}
        />
        <KeySelector selectedKey={selectedKey} link={true} />
        <Playbox
          offset={this.state.octaveAdj}
          highlightTable={highlightTable}
          raiseOctave={this.raiseOctave}
          lowerOctave={this.lowerOctave}
          risingDisabled={this.state.octaveAdj === MAXoctaveAdj}
          lowerDisabled={this.state.octaveAdj === MINoctaveAdj}
          color={color}
        />
        <ChordDetail
          chord={chord}
          inversion={inversion}
          color={color}
          onInversionChange={this.handleChangeInversion}
        />
        <ChordSelector selectedKey={selectedKey} />
      </Fragment>
    );
  }
}
