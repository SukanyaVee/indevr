import React, { Component } from 'react';
<<<<<<< HEAD
import {Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProjectView from './components/ProjectView';
import Whiteboard from './components/Whiteboard';
=======

import PropTypes from 'prop-types';
import { logout } from './ducks/reducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';
import router from './router';

>>>>>>> master

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
<<<<<<< HEAD
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route path="/project/overview" component={ProjectView}/>
                <Route path="/whiteboard" component={Whiteboard}/>
=======
                {router}
>>>>>>> master
            </div>
        );
    }
}

const mapDispatchToProps = {
    logout
}

export default withRouter(connect(null, mapDispatchToProps, null, {pure: false})(App));
