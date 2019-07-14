import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import './App.css';

function Note(props){
    return (
        <li className="note">
            <div className="note-big-rune">
                <span>{props.text[0]}</span>
            </div>
            <div className="note-content">
                <div className="note-content__rune">
                    {props.text}
                </div>
                <div className="note-content__text">
                    {props.text}
                </div>
            </div>
            <div className="note-button-wrapper">
                <button
                    onClick={() => props.onComplite(props.listIndex)}
                />
            </div>
        </li>
    );
}

class NoteEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: ""
        }
    }
    handleChange = (event) => {
        this.setState({value: event.target.value});
    }
    handlePush = () => {
        this.props.onCreateNote(this.state.value);
        this.setState({value: ""});
    }
    render() {
        return (
            <div className="content__new-note">
                <textarea
                    value={this.state.value}
                    onChange = {this.handleChange}
                    placeholder="Write todo here"
                    />
                <button
                    onClick={this.handlePush}
                >PUSH</button>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props){
        super(props);
        let data;
        let errorMessage;
        try {
            data = localStorage.getItem('notes') || "[]";
            data = JSON.parse(data);
        } catch(e) {
            errorMessage = "Error of reading local storage. All data was cleared."
        }
        this.state = {
            notes: data,
            errorMessage: errorMessage,
        }
    }
    handleCreateNote = (text) => {
        const notes = this.state.notes.slice();
        if (notes.indexOf(text) >= 0){
            return;
        }
        notes.push(text);
        this.setState({notes: notes})
    }
    handleNoteComplite = (index) => {
        const notes = this.state.notes.slice();
        notes.splice(index, 1);
        this.setState({notes: notes})
    }
    render() {
        const notes = this.state.notes;

        return (
            <div className="App">
                <header>
                    <h1>RUNE TODO</h1>

                    <h2>rune todo</h2>
                </header>
                <div className="content">
                    <div className="content-inner">
                        <NoteEditor
                            onCreateNote = {this.handleCreateNote}/>
                        <hr />
                        <ul className="notes-list">
                            <CSSTransitionGroup
                                transitionName="note"
                                transitionEnterTimeout={300}
                                transitionLeaveTimeout={300}>

                                {notes.map((text, i) =>
                                    <Note
                                        key={text}
                                        text={text}
                                        listIndex={i}
                                        onComplite={this.handleNoteComplite}
                                    />
                                )}
                            </CSSTransitionGroup>
                        </ul>
                        <div className="content-to-top-wrapper">
                            <button>TO TOP</button>
                        </div>
                    </div>
                </div>
                <footer>made by <a href="#">max_hha</a></footer>
            </div>
        )
    }
    saveNotesToStorage() {
        try {
            let data = JSON.stringify(this.state.notes);
            localStorage.setItem('notes', data);
        } catch(e) {
            this.setState({
                errorMessage: "Error on save data."
            });
        }
    }
    componentDidUpdate(prevProps, prevState){
        if (prevState.notes !== this.state.notes) {
            this.saveNotesToStorage();
        }
    }
}

export default App;
