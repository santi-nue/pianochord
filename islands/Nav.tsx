import { Component } from "preact";

type NavProps = {
  chordUrl?: string;
};

export default class Nav extends Component<NavProps> {
  constructor(props: NavProps) {
    super(props);
  }

  render() {
    return (
      <nav class="navbar">
        <div class="logo">
          <a href="/">PianoChord.io</a>
        </div>
        <ul class="nav-links">
          <input type="checkbox" id="checkbox_toggle" checked={false} />
          <label
            for="checkbox_toggle"
            class="hamburger"
          >
            &#9776;
          </label>
          <div class="menu">
            <li>
              <a
                href={"/"}
                className="data-[current]:text-gray-500"
              >
                Chords
              </a>
            </li>
            <li>
              <a href="/whiteboard" className="data-[current]:text-gray-500">
                Whiteboard
              </a>
            </li>
            <li>
              <a href="/about" className="data-[current]:text-gray-500">
                About
              </a>
            </li>
          </div>
        </ul>
      </nav>
    );
  }
}
