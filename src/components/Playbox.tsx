import { Note } from 'libs/note'
import { h, Component } from 'preact'
import { notes as allNotes } from '../libs/db'

type PlayboxProps = {
  offset: number,
  highlightTable: boolean[],
  raiseOctave: () => void,
  lowerOctave: () => void,
  risingDisabled: boolean,
  lowerDisabled: boolean,
  color: number
}

export default class Playbox extends Component<PlayboxProps> {
  constructor(props: PlayboxProps) {
    super(props)
    this.playChord = this.playChord.bind(this)
    this.playEachNote = this.playEachNote.bind(this)
  }

  playChord(notes: Note[]) {
    notes.forEach(note => note.play())
  }

  playEachNote(notes: Note[]) {
    notes.forEach((note, i) =>
      setTimeout(() => note.play(), 300 * i)
    )
  }

  render() {
    let offset = 12 * (1 + this.props.offset)
    let notes = allNotes.slice(offset, offset + 36)
    let highlightedNotes = notes.filter((_, i) => this.props.highlightTable[i])

    return (
      <div class='playbox-container'>
        <button type='button' className={'color-' + this.props.color} onClick={() => this.playChord(highlightedNotes)}>&nbsp;▶ Play&nbsp;</button>
        <button type='button' className={'color-' + this.props.color} onClick={() => this.playEachNote(highlightedNotes)}>▶ Play each note</button>
        <button type='button' className={'color-' + this.props.color} disabled={this.props.lowerDisabled} onClick={this.props.lowerOctave}>↓&nbsp;Lower octave</button>
        <button type='button' className={'color-' + this.props.color} disabled={this.props.risingDisabled} onClick={this.props.raiseOctave}>↑&nbsp;Rising octave</button>
      </div>
    )
  }
}
