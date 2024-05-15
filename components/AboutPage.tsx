import { Component } from "preact";

import { simpleKeys } from "@/libs/key.ts";
import Decoration from "@/components/Decoration.tsx";

const total = simpleKeys.length * 2;

export default class AboutPage extends Component {
  render() {
    return (
      <div className="about-container">
        <Decoration />
        <div className="content-container">
          <h1>About</h1>
          <div>
            PianoChord.app will always be free and open source. The motivation
            of this project is to provide music lovers, students and educators
            an easy-to-use tool to visualize and learn common piano chords. We
            insist on high bar of user experience, mobile friendliness, and most
            importantly, the correctness of the data.
          </div>
          <h1>Report a Bug</h1>
          <div>
            Don't hesitate to report a bug if you find we have the wrong chord
            data or anything else goes wrong. Feature requests are also
            welcomed! To do so, please open an issue in{" "}
            <a href="https://github.com/dunkbing/pianochord/issues">
              Github Issues
            </a>.
          </div>
        </div>
      </div>
    );
  }
}
