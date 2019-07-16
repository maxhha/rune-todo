import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import './App.css';

function Note(props){
    return (
        <li className="note">
            <div className="note__rune">
                <span>{props.text[0]}</span>
            </div>
            <div className="note-content note__content">
                <div className="note-content__rune-text">
                    {props.text}
                </div>
                <div className="note-content__text">
                    {props.text}
                </div>
            </div>
            <div className="note__complite-wrapper">
                <button
                    className="complite-button"
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
            <div className={"note-editor " + this.props.className}>
                <textarea
                    className="note-editor__textarea"
                    value={this.state.value}
                    onChange = {this.handleChange}
                    placeholder="Write todo here"
                    />
                <button
                    className="note-editor__push"
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
            errorMessage =
                "Error of reading local storage. All data was cleared.";
            console.error(e);
        }
        this.refToTop = React.createRef();
        this.state = {
            notes: data,
            errorMessage: errorMessage,
        }
    }
    handleCreateNote = (text) => {
        const notes = this.state.notes.slice();
        if (!text || notes.indexOf(text) >= 0){
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
    handleToTop = () => {
        this.refToTop.current.scrollIntoView({behavior: 'smooth'});
    }
    render() {
        const notes = this.state.notes;

        return (
            <div className="app" ref={this.refToTop}>
                <header className="header">
                    <h1 className="header__title">RUNE TODO</h1>

                    <h2 className="header__runes">rune todo</h2>
                </header>
                <div className="content">
                    <div className="content__inner">
                        {this.state.errorMessage ? (<div className="error-message">{this.state.errorMessage}</div>) : ""}
                        <NoteEditor
                            className = "content__note-editor"
                            onCreateNote = {this.handleCreateNote}/>
                        <hr className="content__hr circled-hr"/>
                        <ul className="notes-list">
                            <CSSTransitionGroup
                                transitionName="note_animation"
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
                        <button
                            className="to-top-button content__to-top"
                            onClick={this.handleToTop}>TO TOP</button>

                    </div>
                </div>
                <footer className="footer">made by <a href="https://github.com/maxhha"
                        target="_blank">max_hha</a></footer>
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
            console.error(e);
        }
    }
    componentDidUpdate(prevProps, prevState){
        if (prevState.notes !== this.state.notes) {
            this.saveNotesToStorage();
        }
    }
}

export default App;
