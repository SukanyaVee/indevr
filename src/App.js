import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { logout } from './ducks/reducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';
import router from './router';


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
                {router}
            </div>
        );
    }
}

const mapDispatchToProps = {
    logout
}

export default withRouter(connect(null, mapDispatchToProps, null, {pure: false})(App));
