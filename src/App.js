import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProjectView from './components/ProjectView';
import DropZone from './components/DropZone';
import LandingPage from './components/LandingPage';
import PropTypes from 'prop-types';
import { logout } from './ducks/reducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';


class App extends Component {

    // static propTypes = {
    //     location: PropTypes.object.isRequired,
    
    // }

    componentDidMount(){
        // if(this.props.location.pathname === '/dashboard'){
        //     axios.get('/checkSession').then(response => {
        //         if(!response.data.user){
        //             this.props.logout();
        //         }
        //     })
        // }
    }


    render() {
        return (
            <div>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route path="/project/overview" component={ProjectView}/>
                
            </div>
        );
    }
}

const mapDispatchToProps = {
    logout
}

export default withRouter(connect(null, mapDispatchToProps, null, {pure: false})(App));
