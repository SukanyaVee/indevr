import React, { Component } from 'react'
import { login } from '../ducks/reducer'
import { connect } from 'react-redux'
import axios from 'axios'
import Auth0Lock from 'auth0-lock'

const options = {
    theme: {}, 
    languageDictionary: {
        title: 'Indevr'
    }
}
class LandingPage extends Component {
    constructor() {
        super()
        this.state = {
        }
        this.lock = null;
        this.login = this.login.bind(this);
    }

//Creating Auth0 Functionality 
    componentDidMount(){
        this.lock = new Auth0Lock(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN, options);
        this.lock.on('authenticated', authResult => {
            this.lock.getUserInfo(authResult.accessToken, (error, user) => {
                axios.post('/login', { userId: user.sub }).then(response => {
                    this.props.login(response.data.user);
                    this.props.history.push('/dashboard');
                });
            });
        });
    }

    login(){
        this.lock.show();
    }

    render() {
        return (
            <div>
                <h1> Welcome to Indevr </h1>
               <button onClick={this.login}>Login/Register</button>
            </div>
        )
    }
}

const mapDispatchToProps = {
    login
}

export default connect(null, mapDispatchToProps)(LandingPage);
