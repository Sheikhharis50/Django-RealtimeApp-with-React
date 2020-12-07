import './App.css';
import Chat from './components/Chat'
import '../src/assets/css/chat.css';
import WebSocketInstance from './wesockets'
import React, { Component } from 'react';

class App extends Component {

  componentDidMount() {
    WebSocketInstance.connect();
  }

  render() {
    return (
      <div className="App">
        <Chat />
      </div>
    );
  }
}

export default App;