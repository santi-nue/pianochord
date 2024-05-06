import { Component } from "preact";

export default class Footer extends Component {
  render() {
    return (
      <footer className="flex flex-wrap items-center justify-center m-1 space-x-2 py-4">
        <pre>
          <b><a href='https://pianochord/' className="no-decoration">PianoChord.io</a></b> made with ❤ by <a target="_blank" className="font-semibold underline" href='https://db99.dev'>dunkbing</a>
        </pre>
      </footer>
    );
  }
}
