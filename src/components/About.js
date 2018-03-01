import React, { Component } from 'react'
import glam from 'glamorous'

class About extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <Main>
                <Title className='heading'>Inside inDevr</Title>
                <div className='container'>
                <Description>
                    <p>
                       The idea behind inDevr stemmed from the mind of one of the most creative creatures in the office who wanted a better way to communicate with the various teams they worked with in their professional career, as well as their personal life. As a result, inDevr ended up as a website that is intended for those who need a little extra when they're discussing their next project or deciphering their upcoming plan.
                        <br/>
                        <br/>
                        For example, since being built with a purpose for developers, inDevr continues to find top-notch tools that can assist with breaking down the project process. Using quick links to a vast majority of the developer spread across the internet, and capitalizing on the social aspects of today's networking prowess, inDevr brings everything you as a developer needs to stay focused. Sign up for free and begin your inDevr today!
                        <br/>
                        <br/>
                        This site was designed and completed as a groupe project by three DevMountain students.
                    </p>
                </Description>
                </div>


                    <SectionBig>
                <Title2>Meet the Team</Title2>
                    <Section>
                        <Person>
                            <a href='' target='_blank' rel="noopener noreferrer"><div className='opacity'><div className='spot1'><i className='icon fas fa-spinner fa-pulse fa-7x' data-fa-transform='grow-6 down-16' color='var(--main-purple)'></i></div></div></a>
                            <p><strong>Sukanya Vee</strong></p>
                        </Person>
                        <Person className='two'>
                            <a href='http://astringham.com' target='_blank' rel="noopener noreferrer">
                            <div className='opacity'><div className='spot1'><i className="icon fas fa-sync fa-spin fa-7x" data-fa-transform='grow-6 down-16' color='var(--main-purple)'></i></div></div></a>
                            <p><strong>Andrea Stringham</strong></p>
                        </Person>
                        <Person className='three'>
                            <a href='https://b-eck37.github.io/#' target='_blank' rel="noopener noreferrer">
                            <div className='opacity'><div className='spot1'><i className="icon fas fa-cog fa-spin fa-7x"  data-fa-transform='grow-8 down-16' color='var(--main-purple)'></i></div></div></a>
                            <p><strong>Brent Eckert</strong></p>
                        </Person>
                    </Section>
                </SectionBig>
            </Main>
        )
    }
}


const Main = glam.div({
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: 'var(--main-purple)',
    textAlign: 'center',
    marginTop: 0,
    color: 'var(--main-grey)'
})

const Title = glam.p({
    margin: 'auto',
    marginBottom: 20,
    paddingTop: 50,
    fontSize: '36pt',
    color: 'white',
    fontWeight: '700',
    borderBottom: 'solid white 3px',
    boxShadow: '0px 0px 0px 0px',
    width: 400,
    '@media (max-width: 729px)': {
        width: 300,
        fontSize: '24pt',
    }
})
const Title2 = glam.p({
    margin: 'auto',
    marginBottom: 20,
    paddingTop: 50,
    fontSize: '36pt',
    fontWeight: '700',
    borderBottom: 'solid white 3px',
    boxShadow: '0px 0px 0px 0px',
    width: 400,
    '@media (max-width: 729px)': {
        width: 300,
        fontSize: '24pt',
    }
})

const Description = glam.section({
    margin: 'auto',
    color: 'white',
    fontSize: '14pt',
    width: '75%',
    paddingBottom: 50,
})

const Section = glam.section({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    color: '#fff',
    '& .spot1, .spot3': {
        height: '250px !important',
        width: '250px !important',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        boxShadow: '5px 5px 5px 0px black',
        '& .icon': {
            marginTop: -190,
        },
        '@media (max-width: 729px)': {
            height: 200,
            width: 200,
        }
    },
    '@media (max-width: 729px)': {
        '& .icon': {
            marginTop: -85,
        }
    }
})

const Person = glam.div({
    margin: 50, 
    marginBottom: 20,
    '& .opacity': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 275,
        width: 275,
        backgroundColor: 'rgba(255, 255, 255, .1)',
        borderRadius: '50%',
    },
    '.three': {
        marginBottom: 0,
        paddingBottom: 20,
    },
    '& p': {
        fontSize: '22pt',
        color: '#fff',
        margin: 15, 
    },
})

const SectionBig = glam.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    color: '#fff',
    backgroundImage: 'url("https://images.unsplash.com/photo-1513957391641-38811fee23f9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=986a50abca5b48ee42a346454feb018f&auto=format&fit=crop&w=1351&q=80")',
    backgroundSize: 'cover',
    // '@media (max-width: 729px)': {
    //     backgroundImage: 'hidden',
    // }
})


export default About;
