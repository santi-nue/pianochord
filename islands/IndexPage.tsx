import { Component } from "preact";

import { Github } from "@/components/icon/Github.tsx";
import KeySelector from "@/islands/KeySelector.tsx";

export default class IndexPage extends Component {
  render() {
    return (
      <div className="indexPage-container">
        <h1>PianoChord.io</h1>
        <h2>A Reference to a Comprehensive Collection of Piano Chords</h2>
        <h3>
          Open Sourced at <Github size={14} />
          <a href="https://github.com/dunkbing/pianochord">Github</a>
        </h3>
        <div className="tip1">Select a root key to continue</div>
        <div className="tip2">
          <KeySelector link={true} />
        </div>
      </div>
    );
  }
}
