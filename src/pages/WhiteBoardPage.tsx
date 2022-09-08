import { polyfill } from "mobile-drag-drop";
import { Chord } from '../libs/chord'
import { h, Component, Fragment, createRef, RefObject } from 'preact'
import { loadBoard, saveBoard } from '../libs/localStorage'
import { Edit3 } from '../components/icon/Edit-3'
import { FilePlus } from '../components/icon/FilePlus'
import { Trash2 } from '../components/icon/Trash-2'
import { RefreshCw } from '../components/icon/Refresh-cw'
import { Share2 } from '../components/icon/Share-2'
import ChordThumbnail from '../components/ChordThumbnail'
import { chromaticName, Key, keySimpleList } from '../libs/key'
import { Move } from '../components/icon/Move'
import { Plus } from "../components/icon/Plus";
import Modal from "../components/Modal";
import { Clipboard } from "../components/icon/Clipboard";
import KeySelector from "../components/KeySelector";
import { sum } from "../libs/helper";
import { intervalTable } from "../libs/db";
import { ArrowRightLong } from "../components/icon/ArrowRightLong";
import { MinusCircle } from "../components/icon/MinusCircle";
import { PlusCircle } from "../components/icon/PlusCircle";

type Card = {
    chord: Chord,
    name: string
}

type Board = {
    cards: Card[],
    name: string
}

type WhiteBoardPageProps = {
}
type WhiteBoardPageState = {
    boards: Board[],
    selectedBoard: number,
    draggingId: number,
    renameModal: {
        show: boolean,
        text: string,
    },
    newBoardModal: {
        show: boolean,
        text: string,
    }
    switchBoardModal: {
        show: boolean,
    }
    addCustomizedChordModal: {
        show: boolean,
        chord: Chord,
        keyStr: string,
        name: string,
    }
}


export default class WhiteBoardPage extends Component<WhiteBoardPageProps, WhiteBoardPageState> {

    constructor(props: WhiteBoardPageProps) {
        super(props)
        this.state = {
            ...loadBoard(),
            draggingId: -1,
            renameModal: { show: false, text: "" },
            newBoardModal: { show: false, text: "" },
            switchBoardModal: { show: false },
            addCustomizedChordModal: { show: false, chord: new Chord(0, [0, 4, 3, 4, 3]), keyStr: 'C', name: "" },
        }
    }

    componentDidMount() {
        polyfill()
        window.addEventListener('touchmove', function () { }, { passive: false });
    }

    render() {
        return (
            <Fragment>
                <div className='whiteboard-container'>
                    <div className='title-container'>
                        <h1>{this.state.boards[this.state.selectedBoard].name}</h1>
                        <div className="menu-container">
                            <button onClick={() => { this.setState({ renameModal: { ...this.state.renameModal, show: true } }) }}><Edit3 size={15} />Rename</button>
                            <button onClick={() => { this.setState({ newBoardModal: { ...this.state.newBoardModal, show: true } }) }}><FilePlus size={15} />New</button>
                            <button
                                disabled={this.state.boards.length > 1 ? false : true}
                                onClick={() => {
                                    if (this.state.boards.length > 1 && confirm(`Do you want to delete board ${this.state.boards[this.state.selectedBoard].name} ?`)) {
                                        this.state.boards.splice(this.state.selectedBoard, 1)
                                        this.setState({ selectedBoard: 0 })
                                    }
                                }}
                            >
                                <Trash2 size={15} />Delete
                            </button>
                            <button onClick={() => { this.setState({ switchBoardModal: { ...this.state.switchBoardModal, show: true } }) }}><RefreshCw size={15} />Switch</button>
                            <button><Share2 size={15} />Share</button>
                        </div>
                    </div>
                    <div className='cards-container'>
                        {
                            this.state.boards[this.state.selectedBoard].cards.map((card, i) => (
                                <div className='card'
                                    onDragEnd={(e) => {
                                        e.currentTarget.setAttribute("draggable", "false")
                                    }}
                                    onDragStart={(e) => { this.setState({ draggingId: i }) }}
                                    onDragEnter={(e) => {
                                        if (this.state.draggingId != i && this.state.draggingId != -1) {
                                            let cards = this.state.boards[this.state.selectedBoard].cards
                                            let deletedCard = cards.splice(this.state.draggingId, 1)
                                            cards.splice(i, 0, deletedCard[0])
                                            saveBoard({ boards: this.state.boards, selectedBoard: this.state.selectedBoard })
                                            this.setState({ boards: this.state.boards, draggingId: i })
                                        }
                                        e.preventDefault();
                                    }}
                                    onDragOver={(e) => { e.preventDefault(); }}
                                    onDragLeave={(e) => { e.preventDefault(); }}
                                >
                                    <div className='actions-container'>
                                        <Move className='drag' size={20}
                                            onMouseDown={(e) => { e.currentTarget.parentElement?.parentElement?.setAttribute("draggable", "true") }}
                                            onMouseUp={(e) => { e.currentTarget.parentElement?.parentElement?.setAttribute("draggable", "false") }}
                                            onTouchStart={(e) => { e.currentTarget.parentElement?.parentElement?.setAttribute("draggable", "true") }}
                                            onTouchEnd={(e) => { e.currentTarget.parentElement?.parentElement?.setAttribute("draggable", "false") }}
                                        />
                                        <Trash2 className="delete" size={20} onClick={(e) => {
                                            let cards = this.state.boards[this.state.selectedBoard].cards
                                            cards.splice(i, 1)
                                            saveBoard({ boards: this.state.boards, selectedBoard: this.state.selectedBoard })
                                            this.setState({ boards: this.state.boards })
                                        }} />
                                    </div>
                                    <ChordThumbnail chord={card.chord} highlightColor={keySimpleList.map(str => Key[str]).indexOf(card.chord.key) + 1} />
                                    <div className='name'>{card.name}</div>
                                </div>
                            ))
                        }
                        <div className='card add-card' >
                            <div className="option">
                                <Plus size={30} />
                                Existing Chord
                            </div>
                            <div className="option" onClick={() => { this.setState({ addCustomizedChordModal: { ...this.state.addCustomizedChordModal, show: true } }) }}>
                                <Plus size={30} />
                                Customized Chord
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.renameModal.show} setShow={(show) => this.setState({ renameModal: { ...this.state.renameModal, show } })}>
                    <div className="rename-modal">
                        <h1>{`Rename board "${this.state.boards[this.state.selectedBoard].name}" to`}</h1>
                        <input maxLength={20} onInput={(e) => { this.setState({ renameModal: { ...this.state.renameModal, text: e.currentTarget.value } }) }}></input>
                        <div className="actions-container">
                            <button className="highlighted" onClick={() => {
                                if (!this.state.renameModal.text) {
                                    alert("Name cannot be empty!")
                                    return
                                }
                                this.state.boards[this.state.selectedBoard].name = this.state.renameModal.text
                                saveBoard({ boards: this.state.boards, selectedBoard: this.state.selectedBoard })
                                this.setState({ renameModal: { ...this.state.renameModal, show: false } })
                            }}>Save</button>
                            <button onClick={() => { this.setState({ renameModal: { ...this.state.renameModal, show: false } }) }}>Cancel</button>
                        </div>
                    </div>
                </Modal>
                <Modal show={this.state.newBoardModal.show} setShow={(show) => this.setState({ newBoardModal: { ...this.state.newBoardModal, show } })}>
                    <div className="newBoard-modal">
                        <h1>Create a new whiteboard</h1>
                        <input maxLength={20} placeholder="Name" onInput={(e) => { this.setState({ newBoardModal: { ...this.state.newBoardModal, text: e.currentTarget.value } }) }}></input>
                        <div className="actions-container">
                            <button className="highlighted" onClick={() => {
                                if (!this.state.newBoardModal.text) {
                                    alert("Name cannot be empty!")
                                    return
                                }
                                let newBoard: Board = { cards: [], name: this.state.newBoardModal.text }
                                let i = this.state.boards.push(newBoard) - 1
                                saveBoard({ boards: this.state.boards, selectedBoard: i })
                                this.setState({ newBoardModal: { ...this.state.newBoardModal, show: false }, selectedBoard: i })
                            }}>Create</button>
                            <button onClick={() => { this.setState({ newBoardModal: { ...this.state.newBoardModal, show: false } }) }}>Cancel</button>
                        </div>
                    </div>
                </Modal>
                <Modal show={this.state.switchBoardModal.show} setShow={(show) => this.setState({ switchBoardModal: { ...this.state.switchBoardModal, show } })}>
                    <div className="switchBoard-modal">
                        <h1>My Whiteboards</h1>
                        {
                            this.state.boards.map((board, i) => (
                                <div className="item-container" onClick={(e) => {
                                    saveBoard({ boards: this.state.boards, selectedBoard: i })
                                    this.setState({ selectedBoard: i, switchBoardModal: { ...this.state.switchBoardModal, show: false } })
                                }}>
                                    <Clipboard className="icon" size={25} />
                                    <span>{board.name}</span>
                                    {this.state.boards.length > 1 && <Trash2 className="delete" size={25} onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        this.state.boards.splice(i, 1)
                                        saveBoard({ boards: this.state.boards, selectedBoard: 0 })
                                        this.setState({ selectedBoard: 0 })
                                    }} />}
                                </div>
                            ))
                        }
                    </div>
                </Modal>
                <Modal show={this.state.addCustomizedChordModal.show} setShow={(show) => this.setState({ addCustomizedChordModal: { ...this.state.addCustomizedChordModal, show } })}>
                    <div className="customizedChord-modal">
                        <h1>Create New Chord</h1>
                        <div className="thumbnail">
                            <ChordThumbnail chord={this.state.addCustomizedChordModal.chord} highlightColor={keySimpleList.map(str => Key[str]).indexOf(this.state.addCustomizedChordModal.chord.key) + 1} />
                        </div>
                        <h2>Root Key</h2>
                        <KeySelector link={false} selectedKey={this.state.addCustomizedChordModal.keyStr}
                            setKey={(keyStr) => {
                                this.state.addCustomizedChordModal.chord.key = Key[keyStr]
                                this.state.addCustomizedChordModal.chord.cutoff(36)
                                this.setState({ addCustomizedChordModal: { ...this.state.addCustomizedChordModal, keyStr } })
                            }}
                        />
                        <h2>Intervals</h2>
                        <div className="intervals-container">
                            {
                                this.state.addCustomizedChordModal.chord.intervals.slice(1).map((interval, i) => {
                                    let chord = this.state.addCustomizedChordModal.chord
                                    let startKey = chord.key + sum(chord.intervals.slice(0, i + 1))
                                    startKey %= 12
                                    let startKeyColor = keySimpleList.map(str => Key[str]).indexOf(startKey) + 1
                                    let endKey = startKey + interval
                                    endKey %= 12
                                    let endKeyColor = keySimpleList.map(str => Key[str]).indexOf(endKey) + 1
                                    return (
                                        <div className="item">
                                            <span className={"key color-" + startKeyColor}>{chromaticName[startKey]}</span>
                                            <div className="interval">
                                                {`${intervalTable[interval].abbrev} - ${intervalTable[interval].name}`}
                                                <div className="arrow-container">
                                                    <MinusCircle className={"action color-" + startKeyColor} size={18}
                                                        onClick={(e) => {
                                                            if (chord.intervals[i + 1] > 1) chord.intervals[i + 1] -= 1
                                                            this.setState({ addCustomizedChordModal: this.state.addCustomizedChordModal })
                                                        }}
                                                    />
                                                    <ArrowRightLong className="arrow" size={20} />
                                                    <PlusCircle className={"action color-" + endKeyColor} size={18}
                                                        disabled={
                                                            (chord.key + sum(chord.intervals) == 35) ? true : false
                                                        }
                                                        onClick={(e) => {
                                                            if (chord.key + sum(chord.intervals) >= 35) return
                                                            if (chord.intervals[i + 1] < 12) chord.intervals[i + 1] += 1
                                                            this.setState({ addCustomizedChordModal: this.state.addCustomizedChordModal })
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <span className={"key color-" + endKeyColor}>{chromaticName[endKey]}</span>
                                            <Trash2 className="delete" size={20}
                                                disabled={chord.intervals.length === 2}
                                                onClick={() => {
                                                    if (chord.intervals.length <= 2) return
                                                    chord.intervals.splice(i + 1, 1)
                                                    this.setState({ addCustomizedChordModal: this.state.addCustomizedChordModal })
                                                }}
                                            />
                                        </div>
                                    )
                                })
                            }
                            <button
                                disabled={this.state.addCustomizedChordModal.chord.key + sum(this.state.addCustomizedChordModal.chord.intervals) >= 35}
                                onClick={() => {
                                    if (this.state.addCustomizedChordModal.chord.key + sum(this.state.addCustomizedChordModal.chord.intervals) >= 35) return
                                    this.state.addCustomizedChordModal.chord.intervals.push(1)
                                    this.setState({ addCustomizedChordModal: this.state.addCustomizedChordModal })
                                }}>
                                <Plus size={15} />Add a interval
                            </button>
                        </div>
                        <h2>Name</h2>
                        <input maxLength={20} placeholder="Chord Name" onInput={(e) => { this.setState({ addCustomizedChordModal: { ...this.state.addCustomizedChordModal, name: e.currentTarget.value } }) }}></input>
                        <div className="actions-container">
                            <button className="highlighted" onClick={() => {
                                if (!this.state.addCustomizedChordModal.name) {
                                    alert("Name cannot be empty!")
                                    return
                                }
                                if (this.state.addCustomizedChordModal.chord.intervals.length <= 2) {
                                    alert("Number of intervals must be greater than 1!")
                                    return
                                }
                                this.state.boards[this.state.selectedBoard].cards.push({ chord: this.state.addCustomizedChordModal.chord.clone(), name: this.state.addCustomizedChordModal.name })
                                saveBoard({ boards: this.state.boards, selectedBoard: this.state.selectedBoard })
                                this.setState({ addCustomizedChordModal: { ...this.state.addCustomizedChordModal, show: false } })
                            }}>Save</button>
                            <button onClick={() => { this.setState({ addCustomizedChordModal: { ...this.state.addCustomizedChordModal, show: false } }) }}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            </Fragment >
        )
    }
}

export type { Board, Card }