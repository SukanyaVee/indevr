import React, { Component } from 'react'
import { login } from '../ducks/reducer'
import { connect } from 'react-redux'
import axios from 'axios'
import Auth0Lock from 'auth0-lock'
import glam from 'glamorous'
import SearchBar from '../components/SearchBar'
import logo from '../assets/in_DEV_rwhite.png'

const options = {
    theme: {
            primaryColor: '#593c8f',
    },
    // allowSignUp: false,
    redirect: true,
    redirectUrl: '/dashboard', 
    languageDictionary: {
        title: 'inDevr'
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
                <Header><img src={logo} alt=''/><SearchBar /></Header>
            <Initial>
            <Main>
                <Heading><strong>By Developers - <i>For Developers</i></strong><br/>
                <Desc><strong><i>inDevr</i></strong> is a project development application designed to help you and your team of connections <strong>accomplish </strong>your goals. From internal communication and access to project multi-tools, welcome to your one-stop developer platform.</Desc>
                </Heading>
               <button style={btnlogin} onClick={this.login}>Login</button>
            </Main>
            {/* <Aside>
                <Signup>
                Email:
                <Field placeholder='yours@example.com'/>
                Password:
                <Field placeholder='Your Password'/>
                First Name:
                <Field placeholder='First Name'/>
                Last Name: 
                <Field placeholder='Last Name'/>
                <button style={btnlogin}>Sign Up</button>
                </Signup>
            </Aside> */}
            </Initial>
            </div>
        )
    }
}

const Initial = glam.section({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#593c8f',
    backgroundBlendMode: 10,
    color: 'white',
})

const Desc = glam.p({
    margin: 20,
    width: '75%',
})

const Header = glam.header ({
    height: '100',
    width: '100vw',
    backgroundColor: '#BDFAC2',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '0',
})

const Heading = glam.h1 ({
    fontSize: '2.5em',
    margin: 20,
    // textAlign: 'center',
    width: '75%',
    padding: 10,
    // boxShadow: '0 0 0 4px white',
    'hover .text': {
        color: 'black',
    }
})

const Main = glam.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '90vh',
})

// const Aside = glam.aside({
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '40vw',
//     height: '90vh',
//     backgroundColor: '#9b9b9b',
//     float: 'right',
// })

// const Signup = glam.div({
//     backgroundColor: 'white',
//     height: '75%',
//     width: '70%',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
// })

// const Field = glam.input({
//     width: '80%',
//     height: '8%',
//     // marginTop: 15,
//     marginBottom: 10,
// })

const btnlogin = {
    color: 'white',
    backgroundColor: '#9b9b9b',
    height: 75,
    width: 150,
    marginRight: 100,
}


const mapDispatchToProps = {
    login
}

export default connect(null, mapDispatchToProps)(LandingPage);
