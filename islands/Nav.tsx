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
      <nav class="navbar mx-auto max-w-5xl px-2 py-5 flex items-center justify-between text-black">
        <div class="">
          <a
            href="/"
            class="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-500 to-gray-900 bg-clip-text text-transparent hover:text-black"
          >
            PianoChord.app
          </a>
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
