import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProjectView from './components/ProjectView';
import Chat from './components/Chat';
import TaskBoard from './components/TaskBoard';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import SearchPage from './components/SearchPage';


export default (
    <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route path="/project/:id" component={ProjectView}/>
        <Route path="/chat" component={Chat} />
        <Route path="/tasks" component={TaskBoard} />
        <Route path="/profile" component={Profile} />
        <Route path='/search' component={SearchPage} />
    </Switch>
)
