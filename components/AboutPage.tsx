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
            PianoChord.app: Your Go-To Resource for Piano Chords This is an
            intuitive, mobile-friendly tool designed to help music lovers,
            students, and educators easily visualize and learn common piano
            chords. With a focus on user experience and data accuracy, our
            platform provides a reliable and engaging way to master chords and
            expand your musical knowledge. Join us today and elevate your piano
            skills!
          </div>
        </div>
      </div>
    );
  }
}
