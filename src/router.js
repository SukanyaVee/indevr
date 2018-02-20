import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProjectView from './components/ProjectView';
import Chat from './components/Chat';
import TaskBoard from './components/Taskboard/Taskboard';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import SearchPage from './components/SearchPage';
import ExplorePage from './components/ExplorePage';
import EditProfile from './components/EditProfile';
import About from './components/About';


export default (
    <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route path="/project/:id" component={ProjectView}/>
        <Route path="/chat" component={Chat} />
        <Route path="/tasks" component={TaskBoard} />
        <Route path="/dev/:userID" component={Profile} />
        <Route path="/edit" component={EditProfile} />
        <Route path='/search' component={SearchPage} />
        <Route path='/about/indevr' component={About} />
        <Route path="/explore" component={ExplorePage}/>
    </Switch>
)
