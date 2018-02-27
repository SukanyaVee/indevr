import React, { Component } from 'react'
import glam from 'glamorous'
import two from '../projectview/tools.gif'
import one from '../projectview/search.gif'

class Project extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <Main>
                <div className='container'>
                <h3 className='heading'><strong>Project Matching</strong></h3>
                <h1 className='heading'><i>Collaborate on Inventions</i></h1>
                <Topic>
                    <Desc><div className='p'><strong>Explore and find</strong>
                    projects that interest you. Any public project provides the chance to team up and contribute towards something beyond your current skillset. </div></Desc>
                <Image src={one} className='img-responsive' />
                </Topic>
                <Topic2>
                    <Desc2><div className='p'><strong>Need to have morning stand-up flexability?</strong>Influence, mentor and learn as a developer by using the huge array of inDevr communication tools to help your team move forward. Try the team chat or a whiteboard session with a teammate to see how.{" "}
                    </div></Desc2>
                <Image2 src={two} className='img-responsive' />
                </Topic2>
                </div>
            </Main>
        )
    }
}


const Main = glam.div({
    minHeight: '100vh',
    color: 'white',
    backgroundColor: 'var(--main-black)',
    fontFamily: 'Helvetica Neue',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '100px 0',
    '& .heading': {
        textAlign: 'center',
        margin: 10,
        // paddingTop: 10,
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
    alignItems: 'center',
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
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 65,
    '@media (max-width: 729px)':{
        height: '45%',
        marginTop: 30,
        flexDirection: 'column',
        
    }
})

const Desc = glam.span({
    width: '45%',
    height: '100%',
    fontSize: '20pt',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    '& .p': {
        padding: 10,
        minHeight: '100%',
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
    height: '100%',
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
      '& .p': {  
        fontSize: '12pt',
      }
    }
})

const Image = glam.img({
    minHeight: '99%',
    minWidth: '60%',
    // float: 'right',
    margin: '5px 10px',
    border: '3px solid black',
    '@media (max-width: 729px)':{
        width: '75%',
        maxHeight: '60%',
        margin: '60px auto',
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
        margin: '30px auto',
        marginBottom: 0,
    }
})


export default Project;
