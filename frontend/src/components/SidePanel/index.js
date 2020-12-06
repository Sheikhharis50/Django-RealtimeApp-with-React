import React, { Component } from 'react';
import Profile from './Profile'
import Search from './Search'
import Contacts from './Contacts'
import BottomBar from './BottomBar'

class SidePanel extends Component {
    render() {
        return (
            <div id="sidepanel">
                <Profile />
                <Search />
                <Contacts />
                <BottomBar />
            </div>
        );
    }
}

export default SidePanel;
