import React, {Component} from 'react';
import glam from 'glamorous';
import logo from '../assets/in_DEV_r.png';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import SearchBar from './SearchBar';


class Header extends Component {
    render() {
        return (
            <Nav className="navbar navbar-inverse">
                <div className="container-fluid">

                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#topNav" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <i className="far fa-chevron-square-down fa-2x" color="white"></i>
                        </button>
                        <Link to={this.props.user.id ? '/dashboard' : '/'} className="navbar-brand"><img src={logo} alt="logo" className="img-responsive"/></Link>
                    </div>

                    <div className="collapse navbar-collapse" id="topNav">

                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/explore">Explore</Link>
                            </li>
                            <li className="mobile-show">
                                <Link to={`/dev/${this.props.user.id}`}>Profile</Link>
                            </li>
                            <li className="dropdown mobile-hide">
                                <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                    <img src={this.props.user.picture} alt="user"/>
                                    <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to={`/dev/${this.props.user.id}`}>View Profile</Link>
                                    </li>
                                    <li>
                                        <Link to="/edit">Edit Profile</Link>
                                    </li>
                                    <li role="separator" className="divider"></li>
                                    <li>
                                        <a href=""><i className="fas fa-sign-out"></i> &nbsp; Logout</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <NavForm className="navbar-form navbar-right">
                            <SearchBar />
                            {/* <div className="form-group">
                                <input type="text" className="form-control" placeholder="Search" />
                            </div>
                            <button type="submit" className="btn btn-default"><i className="fas fa-search"></i></button> */}
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
    height: 105,
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
        alignItems: 'center',
        '@media (max-width: 767px)':{
            flexDirection: 'column',
        }
    },
    '& .navbar-collapse':{
        backgroundColor: '#222',
        zIndex: 100
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
