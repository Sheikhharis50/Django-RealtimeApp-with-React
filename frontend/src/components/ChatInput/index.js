import React, { Component } from 'react';

class ChatInput extends Component {
    render() {
        return (
            <div className="message-input">
                <div className="wrap">
                    <input type="text" id="chat-message-input" placeholder="Write your message..." />
                    <span>
                        <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
                    </span>
                    <button className="submit" id="chat-message-submit">
                        <i className="fa fa-paper-plane" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default ChatInput;
