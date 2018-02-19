import React, { Component } from 'react'
import one from './Screen Shot 2018-02-16 at 10.41.49 AM.png'
import glam from 'glamorous'

class profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <Main>
                <h3 className='heading'><strong>Team Building</strong></h3>
                <h1 className='heading'><i>Grow your network</i></h1>
                <Topic>
                <Desc><div className='p'><strong>Connect and follow</strong>{' '}
                fellow devs with the social tools that inDevr offers. With the ability to provide links to the vast majority of development tools across the internet, show the world your work and rejoice in the benefits. These connections can lead to lasting friendships and future business endeavors.</div></Desc>
                <Image src={one} />
                </Topic>
                <Topic2>
                <Desc2>
                    <div className='p'>Customize and personalize your profile page with information to grow your brand, influence the industry and display your skills. <strong>With a multitude of partnering sites,</strong> inDevr can help you take the next step in your development career.</div>
                </Desc2>
                <Image2 src={one}/>
                </Topic2>
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
    height: '55%',
    fontSize: '24pt',
    // marginTop: 100,
    '& .p': {
        padding: 10,
    },
    '@media (max-width: 729px)':{
        fontSize: '10pt',
        width: '100vw',
        marginTop: 20,
        textAlign: 'center'
    }
})
const Desc2 = glam.span({
    width: '45%',
    height: '55%',
    fontSize: '24pt',
    // marginTop: 20,
    '& .p': {
        padding: 10,
    },
    '@media (max-width: 729px)':{
      '& .p': {  
        fontSize: '10pt',
        marginTop: 50,
        width: '100vw',
        textAlign: 'center'
      }
    }
})

const Image = glam.img({
    height: '100%',
    width: '60%',
    float: 'right',
    margin: '5px 10px',
    border: '3px solid black',
    '@media (max-width: 729px)':{
        width: '75%',
        maxHeight: '60%',
        margin: '20px auto',
        // marginBottom: 20,
    }
})
const Image2 = glam.img({
    height: '100%',
    width: '60%',
    margin: '5px 10px',
    border: '3px solid black',
    '@media (max-width: 729px)':{
        width: '75%',
        maxHeight: '60%',
        margin: '20px auto',
    }
})

export default profile;