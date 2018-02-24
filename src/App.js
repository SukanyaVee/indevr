import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { logout, login } from './ducks/reducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import router from './router';
import Header from './components/Header';
import Footer from './components/Footer';
import axios from 'axios';


class App extends Component {

    componentDidMount(){
       axios.get('/checkSession').then(response => {
           const user = response.data;
           this.props.login(user);
           if(!this.props.user){
               this.props.history.push('/')
           }
       }).catch(err => {
           console.log(err, 'user error')
           this.props.history.push('/')
       });
    }

    render() {
        return (
            <div>
                <Header />
                {router}
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    login,
    logout
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(App));
