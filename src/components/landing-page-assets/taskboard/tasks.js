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
                <h3 className='heading'><strong>Task Management</strong></h3>
                <h1 className='heading'><i>Improve the way you focus</i></h1>
                <Topic>
                <Desc><div className='p'><strong>Delegate and Celebrate,</strong>{' '}
                with an in-house taskboard that allows the entire team to identify, from anywhere with an internet connection, who is working on what task at any point in the project.</div></Desc>
                <Image src={one} />
                </Topic>
                <Topic>
                <Image2 src={one}/>
                <Desc2>
                    <div className='p'>Blabbity duh blah blah. I was walking around and forgot where I was going. I then said something but can't remember that either. <strong>Please send help!</strong></div>
                </Desc2>
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

const Desc = glam.span({
    width: '45%',
    height: '55%',
    fontSize: '24pt',
    marginTop: 100,
    '& .p': {
        padding: 10,
    }
})
const Desc2 = glam.span({
    width: '45%',
    height: '55%',
    fontSize: '24pt',
    marginTop: 100,
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
const Image2 = glam.img({
    // width: '5%',
    height: '100%',
    float: 'left',
    margin: '5px 10px',
    border: '3px solid black',
})


export default tasks
