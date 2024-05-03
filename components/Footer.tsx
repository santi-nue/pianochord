import { Component } from "preact";
import { Github } from "@/components/icon/Github.tsx";

export default class Footer extends Component {
  render() {
    return (
      <footer className="flex flex-wrap items-center justify-center m-1 space-x-2 py-4">
        <pre>
          <b><a href='https://pianochord/' className="no-decoration">PianoChord.io</a></b> made with ❤ by <a href='https://db99.dev'>dunkbing</a>.
        </pre>
        <pre className="flex flex-wrap items-center space-x-1">
          Open sourced at <Github size={14} />
          <a target="_blank" href="https://github.com/dunkbing/pianochord">Github</a>
        </pre>
      </footer>
    );
  }
}
