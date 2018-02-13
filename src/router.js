import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Chat from './components/Chat';
import TaskBoard from './components/TaskBoard';

export default (
    <Switch>
        <Route path="/chat" component={Chat} />
        <Route path="/tasks" component={TaskBoard} />
    </Switch>
)
