import React, {Component} from 'react';
import glam from 'glamorous';
import logo from '../assets/in_DEV_r.png';
import {connect} from 'react-redux';


class Header extends Component {
    render() {
        return (
            <Nav className="navbar navbar-inverse">
                <div className="container-fluid">

                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href=""><img src={logo} alt="logo" className="img-responsive"/></a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a href="">About</a>
                            </li>
                            <li>
                                <a href="">Explore Projects</a>
                            </li>
                            <li className="dropdown">
                                <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                    <img src={this.props.user.picture} alt="user"/>
                                    <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a href="">View Profile</a>
                                    </li>
                                    <li>
                                        <a href="">Edit Profile</a>
                                    </li>
                                    <li role="separator" className="divider"></li>
                                    <li>
                                        <a href=""><i className="fas fa-sign-out"></i> &nbsp; Logout</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <NavForm className="navbar-form navbar-right">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Search" />
                            </div>
                            <button type="submit" className="btn btn-default"><i className="fas fa-search"></i></button>
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

export default connect(mapStateToProps)(Header);


const Nav = glam.nav({
    borderRadius: '0 !important',
    height: 100,
    marginBottom: 0,
    fontSize: 18,
    '& img':{
        maxHeight: 70,
        borderRadius: '50%',
    },
    '& .navbar-nav':{
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    '& .navbar-collapse':{
        backgroundColor: '#222',
    },
    '& .navbar-header':{
        height: 100,
    }
})

const NavForm = glam.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    '> button':{
        marginLeft: 5,

    }
})
