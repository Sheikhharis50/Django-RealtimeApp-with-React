import React, { Component } from 'react';
import TopBar from '../TopBar';
import ChatInput from '../ChatInput';
import Messages from '../Messages';
import SidePanel from '../SidePanel';
import WebSocketInstance from '../../wesockets';

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(
                this.setMessages.bind(this),
                this.addMessage.bind(this)
            );
            WebSocketInstance.fetchMessages(this.props.currentUser);
        })
    }

    waitForSocketConnection = (callback) => {
        const component = this;
        setTimeout(function () {
            if (WebSocketInstance.state() === 1) {
                console.log('connection is secure');
                callback();
                return;
            } else {
                console.log('waiting for connection...');
                component.waitForSocketConnection(callback);
            }
        }, 100);
    }

    setMessages = (messages) => {
        this.setState({
            messages: messages.reverse()
        })

    }

    addMessage = (message) => {
        this.setState({
            messages: [...this.state.messages, message]
        })
    }

    scroll_messages = () => {
        var m = document.querySelector('.messages');
        m.scrollTop = m.scrollHeight;
        return;
    }

    display_timestamp = (timestamp) =>{
        var t = (new Date().getTime() - new Date(timestamp).getTime())
        if(Math.round(t/6000)<60)
            t = Math.round(t/6000) + " seconds ago";
        else if(Math.round(Math.round(t/6000)/60)<60)
            t = Math.round(Math.round(t/6000)/60) + " minutes ago";
        else if(Math.round(Math.round(Math.round(t/6000)/60)/60)<60)
            t = Math.round(Math.round(Math.round(t/6000)/60)/60) + " hours ago";
        else
            t = Math.round(Math.round(Math.round(Math.round(t/6000)/60)/60)/24) + " days ago";
        
        return t
    }

    renderMessages = (messages) => {
        const currentUser = 'super_admin';
        return messages.map(message => (
            <li
                key={message.id}
                className={message.author === currentUser ? 'sent' : 'replies'}>
                <img src="http://emilcarlsson.se/assets/mikeross.png" />
                <p>
                    {message.content}
                    <br />
                    <small>
                        { this.display_timestamp(message.sent_date) }
                    </small>
                </p>
                {this.scroll_messages()}
            </li>
        ));
    }

    render() {
        const messages = this.state.messages;
        return (
            <div id="frame">
                <SidePanel />
                <div className="content">
                    <TopBar />
                    <Messages messages={messages} renderMessages={this.renderMessages} />
                    <ChatInput />
                </div>
            </div>
        );
    }
}

export default Chat;
