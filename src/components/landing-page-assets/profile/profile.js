import React, { Component } from 'react'
import one from './Screen Shot 2018-02-16 at 10.41.49 AM.png'
import glam from 'glamorous'

class profile extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    render() {
        return (
            <Main>
                <div className='container'>
                <h3 className='heading'><strong>Team Building</strong></h3>
                <h1 className='heading'><i>Grow your network</i></h1>
                <Topic>
                <Desc><div className='p'><strong>Connect and follow</strong> fellow devs with the social tools that inDevr offers. With the ability to provide links to the vast majority of development tools across the internet, these connections can lead to lasting friendships and future business endeavors.</div></Desc>
                <Image src={one} className="img-responsive"/>
                </Topic>
                <Topic2>
                <Desc2>
                    <div className='p'>Customize and personalize your profile page with information to grow your brand, influence the industry and display your skills. <strong>With a multitude of partnering sites,</strong> inDevr can help you take the next step in your development career.</div>
                </Desc2>
                <Image2 src={one} className="img-responsive"/>
                </Topic2>
                </div>
            </Main>
        )
    }
}

const Main = glam.div({
    minHeight: '100vh',
    color: 'white',
    backgroundColor: 'var(--main-purple)',
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
    //   '& .p': {  
    //     fontSize: '12pt',
    //     marginTop: 50,
    //     marginLeft: 205,
    //     marginBottom: 50,
    //     width: '100%',
    //     textAlign: 'center'
    //   }
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

export default profile;