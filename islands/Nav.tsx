import { Component } from "preact";

type NavProps = {
  chordUrl?: string;
};

type NavState = {};

export default class Nav extends Component<NavProps, NavState> {
  constructor(props: NavProps) {
    super(props);
  }

  componentDidUpdate() {
    document.body.classList.remove("disable-scrolling");
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
              >
                Chords
              </a>
            </li>
            <li>
              <a href="/whiteboard">
                Whiteboard
              </a>
            </li>
            <li>
              <a href="/about">
                About
              </a>
            </li>
          </div>
        </ul>
      </nav>
    );
  }
}
