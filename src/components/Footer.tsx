import { Component } from 'preact'
import { Github } from './icon/Github'

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <pre>
                    <b><a href='https://pianochord.io/' className="no-decoration">PianoChord.io</a></b> made with ❤ by <a href='https://db99.dev'>dunkbing</a>.
                </pre>
                <pre>
                    Open sourced at <Github size={12} /> <a href="https://github.com/dunkbing/pianochord">Github</a>
                </pre>
            </footer>
        )
    }

}