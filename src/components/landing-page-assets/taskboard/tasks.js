

import React, { Component } from 'react'
import two from './task2.png'
import glam from 'glamorous'

class tasks extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    render() {
        return (
            <Main>
                <div className='container'>
                <h3 className='heading'><strong>Task Management</strong></h3>
                <h1 className='heading'><i>Improve the way you focus</i></h1>
                <Topic>
                <Image src={two} className="img-responsive"/>
                </Topic>
                <Topic2>
                <Desc>
                    <div className='p'><strong>Delegate and Celebrate,</strong>
                     with an in-house taskboard that allows the entire team to identify, from anywhere with an internet connection, who is working on what task at any point in the project.</div>
                </Desc>
                <Desc2>
                    <div className='p'>Also, the drag and drop feature facilitates easily assigning throughout the team. When project plans change, the taskboard is just the thing to help you <strong>handle the change with grace.</strong></div>
                </Desc2>

                </Topic2>
                </div>
            </Main>
        )
    }
}

const Main = glam.div({
    minHeight: '100vh',
    fontFamily: 'Helvetica Neue',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '100px 0',
    '& .heading': {
        textAlign: 'center',
        margin: 10,
    },
    '& .container': {
        width: '85%',
    }
})

const Topic = glam.section({
    height: '45%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 65,
    '@media (max-width: 729px)':{
        height: '45%',
        marginTop: 30,
        flexDirection: 'column',
        
    }
})
const Topic2 = glam.section({
    height: '45%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 65,
    '@media (max-width: 729px)':{
        height: '45%',
        marginTop: 30,
        flexDirection: 'column',
        
    }
})

const Desc = glam.span({
    width: '45%',
    minHeight: '100%',
    fontSize: '20pt',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    '& .p': {
        padding: 10,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    '@media (max-width: 1100px)': {
        '& .p': {
            fontSize: '12pt',
        }
    },
    '@media (max-width: 729px)':{
        fontSize: '12pt',
        width: '100%',
        marginTop: 20,
        textAlign: 'center'
    }
})
const Desc2 = glam.span({
    width: '45%',
    minHeight: '100%',
    fontSize: '20pt',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    '& .p': {
        padding: 10,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    '@media (max-width: 1100px)': {
        '& .p': {
            fontSize: '12pt',
        }
    },
    '@media (max-width: 729px)':{
        fontSize: '12pt',
        width: '100%',
        marginTop: 20,
        textAlign: 'center',
    }
})

const Image = glam.img({
    height: '99%',
    width: '60%',
    margin: '5px 10px',
    border: '3px solid black',
    '@media (max-width: 729px)':{
        width: '75%',
        maxHeight: '60%',
        margin: '60px auto',
        marginBottom: 0,
    }
})
const Image2 = glam.img({
    height: '99%',
    width: '60%',
    margin: '5px 10px',
    border: '3px solid black',
    '@media (max-width: 729px)':{
        width: '75%',
        maxHeight: '60%',
        margin: '30px auto',
        marginBottom: 0,
    }
})

export default tasks;
