import { Component } from "preact";

import { Github } from "@/components/icon/Github.tsx";
import KeySelector from "@/islands/KeySelector.tsx";

export default class IndexPage extends Component {
  render() {
    return (
      <div className="indexPage-container max-w-[63rem] mx-auto flex items-center justify-center h-[calc(100vh-150px)] flex-col">
        <h1>PianoChord.app</h1>
        <h2>A Reference to a Comprehensive Collection of Piano Chords</h2>
        <div className="mt-2 text-lg px-3 text-gray-700 border-b-4 border-gray-700">
          Select a root key to continue
        </div>
        <div className="w-full md:w-2/3">
          <KeySelector link={true} />
        </div>
      </div>
    );
  }
}
