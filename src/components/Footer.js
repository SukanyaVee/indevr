import React, { Component } from 'react'
import glam from 'glamorous'
import { Link } from 'react-router-dom'
import logo from '../assets/in_DEV_r.png'


class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div>


                <Image src={logo} alt='' />


            </div>
        )
    }
}

export default Footer;
