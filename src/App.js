import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import router from './router';
import ProjectView from './components/ProjectView';
import DropZone from './components/DropZone';
import LandingPage from './components/LandingPage';
// import PropTypes from 'prop-types';
// import axios from 'axios';
import { logout } from './ducks/reducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';



class App extends Component {

    // static propTypes = {
    //     location: PropTypes.object.isRequired,

    // }

    componentDidMount(){
        // if(this.props.location.pathname === '/dashboard'){
        //     axios.get('/indevr/users').then(response => {
        //         if(!response.data.user){
        //             this.props.logout();
        //         }
        //     })
        // }
    }


    render() {
        return (
            <div>
                {router}
            </div>
        );
    }
}

const mapDispatchToProps = {
    logout
}

export default withRouter(connect(null, mapDispatchToProps, null, {pure: false})(App));
