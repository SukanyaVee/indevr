import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProjectView from './components/ProjectView';
import Chat from './components/Chat';
import TaskBoard from './components/TaskBoard';


export default (
    <Switch>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route path="/project/overview" component={ProjectView}/>
        <Route path="/chat" component={Chat} />
        <Route path="/tasks" component={TaskBoard} />
    </Switch>
)
