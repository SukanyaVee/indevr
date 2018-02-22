import React, { Component } from 'react'
import one from './task1.png'
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
                <h3 className='heading'><strong>Task Management</strong></h3>
                <h1 className='heading'><i>Improve the way you focus</i></h1>
                <Topic>
                <Desc><div className='p'><strong>Delegate and Celebrate,</strong>{' '}
                with an in-house taskboard that allows the entire team to identify, from anywhere with an internet connection, who is working on what task at any point in the project.</div></Desc>
                <Image src={one} className="img-responsive"/>
                </Topic>
                <Topic2>
                
                <Desc2>
                    <div className='p'>Blabbity duh blah blah. I was walking around and forgot where I was going. I then said something but can't remember that either. <strong>Please send help!</strong></div>
                </Desc2>
                <Image2 src={one} className="img-responsive"/>
                </Topic2>
            </Main>
        )
    }
}

const Main = glam.div({
    height: '100vh',
    fontFamily: 'Helvetica Neue',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& .heading': {
        textAlign: 'center',
        margin: 10,
    }
})

const Topic = glam.section({
    height: '45%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    '@media (max-width: 729px)':{
        height: '35%',
        marginTop: 20,
        flexDirection: 'column',
        
    }
})
const Topic2 = glam.section({
    height: '45%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    '@media (max-width: 729px)':{
        height: '35%',
        marginTop: 20,
        flexDirection: 'column',
    }
})

const Desc = glam.span({
    width: '45%',
    height: '100%',
    fontSize: '22pt',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',

    '@media (max-width: 729px)':{
        fontSize: '12pt',
        width: '100vw',
        marginTop: 20,
        textAlign: 'center'
    }
})
const Desc2 = glam.span({
    width: '45%',
    height: '100%',
    fontSize: '22pt',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    // '& .p': {
    //     padding: 10,
    // },
    '@media (max-width: 729px)':{
      '& .p': {  
        fontSize: '12pt',
        marginLeft: 205,
        width: '100vw',
        textAlign: 'center'
      }
    }
})

const Image = glam.img({
    height: '99%',
    width: '60%',
    // float: 'right',
    margin: '5px 10px',
    border: '3px solid black',
    '@media (max-width: 729px)':{
        width: '75%',
        maxHeight: '60%',
        margin: '50px auto',
        marginBottom: 0,
        // margin: '30px auto',
        // marginBottom: 20,
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
        margin: '20px auto',
    }
})


export default tasks
