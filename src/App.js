import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { logout, login } from './ducks/reducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import router from './router';
import AltHeader from './components/AltHeader';
import Footer from './components/Footer';
import axios from 'axios';


class App extends Component {

    // static propTypes = {
    //     location: PropTypes.object.isRequired,

    // }

    componentDidMount(){
       axios.get('/checkSession').then(response => {
           const user = response.data;
           this.props.login(user);
       }).catch(err => {
           console.log(err, 'user error')
           this.props.history.push('/')
       });
    }


    render() {
        return (
            <div>
                <AltHeader />
                {router}
                <Footer />
            </div>
        );
    }
}

const mapDispatchToProps = {
    login,
    logout
}

export default withRouter(connect(null, mapDispatchToProps, null, {pure: false})(App));
