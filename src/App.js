import React, { Component } from 'react';
import {login,logout} from './ducks/reducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import router from './router';
import Header from './components/Header';
import Footer from './components/Footer';
import axios from 'axios';


class App extends Component {

    componentDidMount(){
        if(!this.props.user){
            this.checkSession()
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user && !this.props.user){
            this.checkSession()
        }
    }



    checkSession(){
        const getSession = async () => {
            const session = await axios.get('/checkSession');
            //If session is active, set user data in redux
            if(session.data.user){
                this.props.login(session.data.user);
                //Redirect to dashboard if coming from login
                if(this.props.history.location.pathname === '/login'){
                    this.props.history.push('/dashboard')
                }
            }

            //If no session, logout and redirect to login
            if(this.props.history.location.pathname !== '/login' && !session.data.user){
                this.props.logout();
                this.props.history.push('/login')
            }
        }
        getSession()
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
    logout,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
