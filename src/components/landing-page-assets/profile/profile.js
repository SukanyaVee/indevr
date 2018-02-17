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
                <h3 className='heading'><strong>Task Management</strong></h3>
                <h1 className='heading'><i>Grow your network</i></h1>
                <Topic>
                <Desc><div className='p'><strong>Connect and follow</strong>{' '}
                fellow devs with the social tools that inDevr offers. With the ability to provide links to the vast majority of development tools across the internet, show the world your work and rejoice in the benefits. These connections can lead to lasting friendships and future business endeavors.</div></Desc>
                <Image src={one} />
                </Topic>
                <Topic>
                <Image2 src={one}/>
                <Desc2>
                    <div className='p'>Customize and personalize your profile page with information to grow your brand, influence the industry and display your skills. <strong>With a multitude of partnering sites,</strong> inDevr can help you take the next step in your development career.</div>
                </Desc2>
                </Topic>
            </Main>
        )
    }
}

const Main = glam.div({
    height: '100vh',
    marginBottom: 10,
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
        maginTop: 0,
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
        fontSize: '12pt',
        marginTop: 0,
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
        fontSize: '12pt',
        maginTop: 0,
      }
    }
})

const Image = glam.img({
    // width: '5%',
    height: '100%',
    float: 'right',
    marginRight: 10,
    border: '3px solid black',
    '@media (max-width: 729px)':{
        width: '50%',
        maxHeight: '60%',
        marginTop: 20,
    }
})
const Image2 = glam.img({
    // width: '5%',
    height: '100%',
    float: 'left',
    margin: '5px 10px',
    border: '3px solid black',
    '@media (max-width: 729px)':{
        width: '50%',
        maxHeight: '60%',
        marginTop: 20,
    }
})

export default profile;