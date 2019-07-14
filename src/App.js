import React from 'react';
import './App.css';

function Note(props){
    return (
        <li className="note">
            <div className="note-rune">
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
                <button></button>
            </div>
        </li>
    );
}

function App() {
  return (
    <div className="App">
        <header>
            <h1>RUNE TODO</h1>

            <h2>rune todo</h2>
        </header>
        <div className="content">
            <div className="content-inner">
                <div className="content__new-note">
                    <textarea
                        placeholder="Write note here"
                    />
                <button>PUSH</button>
                </div>
                <hr />
                <ul className="notes-list">
                    <Note text="Random text"/>
                    <Note text="Hello world!"/>
                    <Note text="Another note"/>
                </ul>
                <div className="content-to-top-wrapper">
                    <button>TO TOP</button>
                </div>
            </div>
        </div>
        <footer>made by <a href="#">maxhha</a></footer>
    </div>
  );
}

export default App;
