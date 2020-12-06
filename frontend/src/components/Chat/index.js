import React, { Component } from 'react';
import TopBar from '../TopBar';
import ChatInput from '../ChatInput';
import Messages from '../Messages';
import SidePanel from '../SidePanel';

class Chat extends Component {
    render() {
        return (
            <div id="frame">
                <SidePanel />
                <div className="content">
                    <TopBar />
                    <Messages />
                    <ChatInput />
                </div>
            </div>
        );
    }
}

export default Chat;
