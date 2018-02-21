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
                <div>
                    <SearchBar />
                </div>
                <div>
                    <Image src={logo} alt='' />
                </div>
                <div>
                    <Link to='/about/indevr' style={link}>About</Link>
                    <Link to='/explore' style={link}>Explore</Link>
                    <Link to='/contact/indevr' style={link}>Contact</Link>
                </div>
            </Foot>
        )
    }
}

const Foot = glam.div({
    width: '100vw',
    minHeight: 100,
    
    backgroundColor: 'var(--main-black)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    textDecoration: 'none',
    color: 'white',
    borderTop: 'Solid black 5px',
    '> div':{
        // margin: 20
    },
    '& a':{
        margin: 20
    },
})

const Image = glam.img({
    height: 50
})

const link = {
    color: 'white',
    textDecoration: 'none',
}

export default Footer;
