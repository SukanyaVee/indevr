import React, { Component } from 'react'
import one from './task1.png'
import glam from 'glamorous'

class tasks extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <Main>
                <h1>Task Management</h1><br/>
                <Topic>
                <Desc><div className='p'><strong>Delegate and Celebrate</strong><br/>
                With an in-house taskboard that allows the entire team to identify who is working on what task anytime, from anywhere with an internet connection.</div></Desc>
                <Image src={one} />
                
                </Topic>
            </Main>
        )
    }
}

const Main = glam.div({
    height: '100vh',
    // display: 'flex',
})

const Topic = glam.section({
    height: '45%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
})

const Desc = glam.span({
    width: '45%',
    height: '55%',
    fontSize: '16pt',
    '& .p': {
        padding: 10,
    }
})

const Image = glam.img({
    // width: '5%',
    height: '100%',
    float: 'right',
    marginRight: 10,
    border: '3px solid black',
})


export default tasks
