import React, { Component } from 'react'
import logo from '../assets/in_DEV_r.png';
import glam from 'glamorous';
import {Link} from 'react-router-dom';


class Header extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    render() {
        return (
            <Hheader>
                    <Link to="/dashboard"><img src={logo} alt="inDevr"/></Link>
                    <Nav>
                        <div>About</div>
                        <div><Link to="/explore">Explore</Link></div>
                        <div>Profile</div>
                    </Nav>
            </Hheader>
        )
    }
}

const Hheader = glam.div ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottom: '10px solid #593c8f',
    marginBottom: 25,
    padding: 20,
    '& img': {
        width: 200,
    },
    '& a':{
        textDecoration: 'none'
    }
})

const Nav = glam.div ({
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    fontSize: 16,
    '&>div': {
        padding: 10,
        cursor: 'pointer'
    }
})

export default Header;
