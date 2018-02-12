import React, { Component } from 'react'
import { login } from '../ducks/reducer'
import { connect } from 'react-redux'
import axios from 'axios'
import Auth0Lock from 'auth0-lock'
import glam from 'glamorous'
import SearchBar from '../components/SearchBar'

const options = {
    theme: {}, 
    languageDictionary: {
        title: 'Indevr'
    },
    additionalSignUpFields: [{
        name: 'first_name',
        placeholder: 'Enter your first name'
    },
    {
        name: 'last_name',
        placeholder: 'Enter your last name'
    }]
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
            <Main>
                <Heading> Welcome to Indevr </Heading>
               <button style={btnlogin} onClick={this.login}>Login/Register</button>
               <SearchBar />
            </Main>
        )
    }
}

const Heading = glam.h1 ({
    fontSize: '2.5em',
    textAlign: 'center',
})

const Main = glam.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
})

const btnlogin = {
    color: 'white',
    backgroundColor: 'blue',
    height: 75,
    width: 150,
    margin: 100,
}


const mapDispatchToProps = {
    login
}

export default connect(null, mapDispatchToProps)(LandingPage);
