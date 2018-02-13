import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Chat from './components/Chat';
import TaskBoard from './components/TaskBoard';
import LandingPage from './components/LandingPage';

export default (
    <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path="/chat" component={Chat} />
        <Route path="/tasks" component={TaskBoard} />
    </Switch>
)
