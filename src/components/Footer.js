import React, { Component } from 'react'
import glam from 'glamorous'
import { Link } from 'react-router-dom'
import logo from '../assets/in_DEV_rFoot.png'
import SearchBar from './SearchBar'
import {connect } from 'react-redux'


class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        console.log(this.props.id, this.props.user)
        return (
            <Foot>
                <div>
                    <SearchBar className='search'/>
                </div>
                <div>
                    <Link to={this.props.user.id ? '/dashboard' : '/'} className='img-responsive'>
                    <Image src={logo} alt='' />
                    </Link>
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
    
    backgroundColor: 'var(--main-purple)',
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
    '& .search': {
        marginTop: 30,
    }
})

const Image = glam.img({
    height: 75,
    marginBottom: 10,
})

const link = {
    color: 'white',
    textDecoration: 'none',
}

function mapStateToProps(state){
    const { user } = state;
    return {
        user
    }
}

export default connect(mapStateToProps)(Footer);
