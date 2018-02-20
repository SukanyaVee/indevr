import React, { Component } from 'react'
import glam from 'glamorous'
import { Link } from 'react-router-dom'
import logo from '../assets/in_DEV_r.png'
import SearchBar from './SearchBar'


class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <Foot>
                <SearchBar />
                <Image src={logo} alt='' />
                <Link to='/about/indevr' style={link}>About</Link>
                <Link to='/explore' style={link}>Explore</Link>
                <Link to='' style={link}>Contact</Link>
            </Foot>
        )
    }
}

const Foot = glam.div({
    width: '100vw',
    height: 100,
    // marginTop: 10,
    // backgroundColor: 'var(--main-purple)',
    // backgroundColor: 'var(--main-grey)',
    backgroundColor: 'var(--main-black)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'white',
    borderTop: 'Solid black 5px',
})

const Image = glam.img({
    height: '90%'
})

const link = {
    color: 'white',
    textDecoration: 'none',
}

export default Footer;
