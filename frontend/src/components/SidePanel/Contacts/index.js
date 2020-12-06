import React, { Component } from 'react';
import Contact from '../Contact'

class Contacts extends Component {
    render() {
        return (
            <div id="contacts">
                <ul>
                    <Contact />
                    <Contact />
                    <Contact />
                </ul>
            </div>
        );
    }
}

export default Contacts;
