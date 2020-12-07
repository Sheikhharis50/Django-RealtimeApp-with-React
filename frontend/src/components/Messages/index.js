import React, { Component } from 'react';

class Messages extends Component {

    render() {
        return (
            <div className="messages">
                <ul id="chat-log">
                    {
                        this.props.messages &&
                        this.props.renderMessages(this.props.messages)
                    }
                </ul>
            </div>
        );
    }
}

export default Messages;
