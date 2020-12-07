import React, { Component } from 'react';
import WebSocketInstance from '../../wesockets';

class ChatInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }


    messageChangeHandler = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    sendMessageHandler = (e) => {
        e.preventDefault();
        const messageInputDom = document.querySelector('#chat-message-input');
        messageInputDom.value = '';
        const messageObject = {
            from: 'super_admin',
            content: this.state.message
        };
        WebSocketInstance.newChatMessage(messageObject);
        this.setState({
            messsage: ''
        });
    }

    render() {
        return (
            <div className="message-input">
                <form onSubmit={this.sendMessageHandler}>
                    <div className="wrap">
                        <input
                            onChange={this.messageChangeHandler}
                            value={this.state.message}
                            type="text"
                            id="chat-message-input"
                            placeholder="Write your message..." />
                        <span>
                            <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
                        </span>
                        <button className="submit" id="chat-message-submit">
                            <i className="fa fa-paper-plane" aria-hidden="true"></i>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default ChatInput;
