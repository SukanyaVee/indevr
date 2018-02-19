import React, { Component } from 'react'
import glam from 'glamorous'
import { Link } from 'react-router-dom'
import logo from '../assets/LogoMain.png'


class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <Foot>
                <Link to='/about'>About</Link>
                <Link to=''>Explore</Link>
                <Image src={logo} alt='' />
                <Link to=''>News</Link>
                <Link to=''>Contact</Link>
            </Foot>
        )
    }
}

const Foot = glam.div({
    width: '100vw',
    height: 100,
    backgroundColor: 'var(--main-purple)',
    // backgroundColor: 'var(--main-grey)',
    // backgroundColor: 'var(--main-black)',
})

export default Footer;
