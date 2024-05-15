import { Component } from "preact";

import { simpleKeys } from "@/libs/key.ts";
import Decoration from "@/components/Decoration.tsx";

const total = simpleKeys.length * 2;

export default class AboutPage extends Component {
  render() {
    return (
      <div className="about-container">
        <Decoration />
        <div className="content-container mb-2 p-4">
          <h1 className="text-4xl font-normal my-4 text-gray-800">About</h1>
          <div className="leading-5 text-gray-600">
            PianoChord.app will always be free and open source. The motivation
            of this project is to provide music lovers, students and educators
            an easy-to-use tool to visualize and learn common piano chords. We
            insist on high bar of user experience, mobile friendliness, and most
            importantly, the correctness of the data.
          </div>
        </div>
      </div>
    );
  }
}
