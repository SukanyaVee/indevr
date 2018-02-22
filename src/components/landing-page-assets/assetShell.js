import React, { Component } from 'react'
import glam from 'glamorous'

class Component extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <Main>
                <h3 className='heading'><strong>Section Title</strong></h3>
                <h1 className='heading'><i>Cool Whip</i></h1>
                <Topic>
                    <Desc><div className='p'><strong>Hey</strong>{" "}
                    Blabbity duh blah blah dum ditty doo-Op dedo. Shibop tibbity tado tado dee ditty sitty blitty blab. blasdan</div></Desc>
                <Image src={''} className='img-responsive' />
                </Topic>
                <Topic2>
                    <Desc2><div className='p'><strong>Hey</strong>{" "}
                    Blabbity duh blah blah dum ditty doo-Op dedo. Shibop tibbity tado tado dee ditty sitty blitty blab. blasdan</div></Desc2>
                <Image src={''} className='img-responsive' />
                </Topic2>
            </Main>
        )
    }
}


const Main = glam.div({
    height: '100vh',
    color: 'var(--main-purple)',
    backgroundColor: 'var(--main-black)',
    '& .heading': {
        textAlign: 'center',
        marginTop: 0,
        paddingTop: 10,
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
    height: '100%',
    fontSize: '22pt',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
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
    height: '99%',
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
    height: '98%',
    width: '60%',
    margin: '5px 10px',
    marginBottom: '10px',
    border: '3px solid black',
    '@media (max-width: 729px)':{
        width: '75%',
        maxHeight: '60%',
        margin: '20px auto',
    }
})


export default Component;