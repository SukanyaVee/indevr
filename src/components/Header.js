import React, { Component } from 'react'
import logo from '../assets/in_DEV_r.png';
import glam from 'glamorous';


class Header extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    render() {
        return (
            <Hheader>
                    <img src={logo} alt="" onClick={e=>{this.props.history.push('/dashboard')}}/>
                    <div>
                        <div>About</div>
                        <div>Explore</div>
                        <div>USer stuff</div>
                    </div>
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
    }

})



export default Header;
