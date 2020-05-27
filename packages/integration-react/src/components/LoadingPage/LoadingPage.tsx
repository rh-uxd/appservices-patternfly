import React from 'react';
import { Bullseye } from '@patternfly/react-core';
import './LoadingPage.css';

export class LoadingPage extends React.Component {
    render () {
        return (
            <div className="app__loading-container">
                <Bullseye>
                    <p>Loading</p>
                </Bullseye>
            </div>
        )
    }
}
