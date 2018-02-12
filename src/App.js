import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProjectView from './components/ProjectView';

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route path="/project/overview" component={ProjectView}/>
                
            </div>
        );
    }
}

export default App;
