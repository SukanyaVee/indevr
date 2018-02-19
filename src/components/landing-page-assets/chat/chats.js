import React, { Component } from 'react'
import glam from 'glamorous'
import one from './Screen Shot 2018-02-16 at 10.42.39 AM.png'

class Chats extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <Main>
                <h3 className='heading'>Communicate</h3>
                <h1 className='heading'></h1>
                <Topic>
                
        
                </Topic>
            </Main>
        )
    }
}

const Main = glam.div({
    height: '100vh',
    // display: 'flex',
    '& .heading': {
        textAlign: 'center',
    }
})

const Topic = glam.section({
    height: '45%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
})


export default Chats;
