import React, {Component} from 'react';
import glam from 'glamorous';
import logo from '../assets/in_DEV_r.png';
import {connect} from 'react-redux';
import { withRouter } from 'react-router'
import {Link} from 'react-router-dom';
import SearchBar from './SearchBar';
import {logout, login} from '../ducks/reducer';
import axios from 'axios';
import Auth0Lock from 'auth0-lock';
import logo2 from '../assets/lock.png';


const options = {
    theme: {
      primaryColor: "#593c8f",
      logo: logo2,
    },
    popupOptions: {width: 300, height: 400},
    // allowSignUp: false,
    redirect: true,
    redirectUrl: "/dashboard",
    languageDictionary: {
      title: "inDevr"
    },
    additionalSignUpFields: [
      {
        name: "first_name",
        placeholder: "Enter your first name"
      },
      {
        name: "last_name",
        placeholder: "Enter your last name"
      }
    ]
  };

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false
        }

        this.lock = null;
        this.login = this.login.bind(this);
    }

    componentDidMount(){
        this.lock = new Auth0Lock(
            process.env.REACT_APP_AUTH0_CLIENT_ID,
            process.env.REACT_APP_AUTH0_DOMAIN,
            options
        );
        this.lock.on("authenticated", authResult => {
            this.props.history.push('/dashboard')
            this.lock.getUserInfo(authResult.accessToken, (error, user) => {
                axios.post("/login", { userId: user.sub }).then(response => {
                    this.props.login(response.data.user);
                });
            });
        });

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user && !this.props.user){
            this.setState({loggedIn: true})
        }

        if(this.props.user && !nextProps.user){
            this.setState({loggedIn: false})
        }
    }

    closeMobileNav(){
        document.getElementById('topNav').classList.remove('in');
    }


    login() {
        this.props.history.push('/login');
        if(this.props.history.location.pathname === '/login'){
            this.lock.show();
        } else {
            this.login();
        }
    }

    logout(){
        console.log('logout here')
        axios.get('/logout').then(res => {
            console.log('Session destroyed')
            this.props.logout();
            this.props.history.push('/login');
        }).catch( err => console.log(err))
    }

    render() {
        return (
            <Nav className="navbar navbar-inverse" id='nav'>
                <div className="container-fluid">

                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#topNav" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <i className="far fa-chevron-square-down fa-2x" color="white"></i>
                        </button>
                        <Link to={this.state.loggedIn ? '/dashboard' : '/'} className="navbar-brand"><img src={logo} alt="logo" className="img-responsive"/></Link>
                    </div>

                    <div className="collapse navbar-collapse" id="topNav">

                        <ul className="nav navbar-nav navbar-right">
                            <li onClick={() => this.closeMobileNav()}>
                                <Link to="/about/indevr">About</Link>
                            </li>
                            <li onClick={() => this.closeMobileNav()}>
                                <Link to="/explore">Explore</Link>
                            </li>
                            {this.props.user && <li className="mobile-show" onClick={() => this.closeMobileNav()}>
                                <Link to={`/dev/${this.props.user.id}`}>Profile</Link>
                            </li>}
                            {!this.props.user && <li className="mobile-show"  onClick={this.login}>
                                <Link to={`/`}>Sign In</Link>
                            </li>}
                            {this.props.user && <li className="dropdown mobile-hide" id="user-img">
                                <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                    <img src={this.props.user.picture} alt="user" className='profilepic'/>
                                    <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li onClick={() => this.closeMobileNav()}>
                                        <Link to={`/dev/${this.props.user.id}`}>View Profile</Link>
                                    </li>
                                    <li onClick={() => this.closeMobileNav()}>
                                        <Link to="/edit">Edit Profile</Link>
                                    </li>
                                    <li role="separator" className="divider"></li>
                                    <li onClick={() => this.logout()}>
                                        <Link to="/"><i className="fas fa-sign-out"></i> &nbsp; Logout</Link>
                                    </li>
                                </ul>
                            </li>}
                            {!this.props.user && <li className="mobile-hide" onClick={this.login}>
                                <Link to={`/`}>Sign In</Link>
                            </li>}
                        </ul>
                        <NavForm className="navbar-form navbar-right">
                            <SearchBar />
                        </NavForm>
                    </div>
                </div>
            </Nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
};

const mapDispatchToProps = {
        logout,
        login
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));


const Nav = glam.nav({
    borderRadius: '0 !important',
    height: 105,
    marginBottom: 0,
    fontSize: 18,
    zIndex: 998,
    '& img':{
        maxHeight: 70,
    },
    '& .profilepic': {
        borderRadius: '50%',
    },
    '& #user-img':{
        paddingTop: 0
    },
    '& .navbar-nav':{
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (max-width: 767px)':{
            flexDirection: 'column',
        }
    },
    '& .navbar-collapse':{
        backgroundColor: '#222',
        zIndex: 100,
    },
    '& .navbar-right':{
        '> li':{
            paddingTop: 10,
        }
    },
    '& .dropdown img':{
        height: 50,
        width: 50
    },
    '& .navbar-header':{
        height: 100,
    },
    '& .navbar-toggle':{
        marginTop: 30,
        padding: 0,
    },
    '@media (max-width: 767px)':{
        '&  .mobile-show':{
            display: 'block'
        },
        '& .mobile-hide':{
            display: 'none'
        }
    },
    '@media (min-width: 768px)':{
        '&  .mobile-show':{
            display: 'none'
        },
        '& .mobile-hide':{
            display: 'block'
        }

    }
})

const NavForm = glam.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
})
