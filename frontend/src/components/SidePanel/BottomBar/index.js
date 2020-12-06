import React, { Component } from 'react';

class BottomBar extends Component {
    render() {
        return (
            <div id="bottom-bar">
                <button id="addcontact">
                    <i className="fa fa-user-plus fa-fw" aria-hidden="true"></i>
                    <span>Add contact</span>
                </button>
                <button id="settings">
                    <i className="fa fa-cog fa-fw" aria-hidden="true"></i>
                    <span>Settings</span>
                </button>
            </div>
        );
    }
}

export default BottomBar;
