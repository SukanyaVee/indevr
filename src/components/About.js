import React, { Component } from 'react'
import glam from 'glamorous'
import { css } from 'glamor'

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

                <Description>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit turpis cursus in hac habitasse platea dictumst. Faucibus vitae aliquet nec ullamcorper sit. Sagittis purus sit amet volutpat consequat mauris. Commodo elit at imperdiet dui accumsan sit amet nulla facilisi. Sed velit dignissim sodales ut eu. Scelerisque mauris pellentesque pulvinar pellentesque habitant. Felis bibendum ut tristique et egestas. Tincidunt tortor aliquam nulla facilisi cras. At quis risus sed vulputate odio ut enim blandit. Turpis egestas integer eget aliquet nibh. Aliquet risus feugiat in ante metus dictum at. Sit amet luctus venenatis lectus magna fringilla urna porttitor. Eget felis eget nunc lobortis mattis aliquam faucibus purus in.
                        <br/>
                        <br/>
                        Nisl suscipit adipiscing bibendum est ultricies integer. Non nisi est sit amet facilisis magna etiam tempor. Velit egestas dui id ornare arcu odio ut sem nulla. Neque volutpat ac tincidunt vitae semper. Arcu cursus vitae congue mauris rhoncus. Nunc id cursus metus aliquam eleifend mi. Ac placerat vestibulum lectus mauris ultrices eros in cursus turpis. Non sodales neque sodales ut etiam. Nulla facilisi cras fermentum odio eu feugiat. Vitae sapien pellentesque habitant morbi tristique. Massa tincidunt dui ut ornare lectus sit amet est. Quam nulla porttitor massa id neque aliquam vestibulum morbi blandit. Integer vitae justo eget magna fermentum iaculis.
                    </p>
                </Description>
                <Title>Meet the Team</Title>
                    <Section>
                        <Person>
                            <a href='' target='_blank' rel="noopener noreferrer"><div className='spot1'><i className='fas fa-spinner fa-pulse fa-7x' data-fa-transform='grow-6 down-16' color='var(--main-grey)'></i></div></a>
                            <p><strong>Sukanya Vee</strong></p>
                        </Person>
                        <Person className='two'>
                            <a href='http://astringham.com' target='_blank' rel="noopener noreferrer"><div className='spot2'><i className="fas fa-sync fa-spin fa-7x" data-fa-transform='grow-6 down-16' color='var(--main-grey)'></i></div></a>
                            <p><strong>Andrea Stringham</strong></p>
                        </Person>
                        <Person className='three'>
                            <a href='' target='_blank' rel="noopener noreferrer"><div className='spot3'><i className="fas fa-cog fa-spin fa-7x" data-fa-transform="grow-6 down-16" color='var(--main-grey)'></i></div></a>
                            <p><strong>Brent Eckert</strong></p>
                        </Person>
                    </Section>
            </Main>
        )
    }
}

const grow = css.keyframes({
    '0%': { transform: `scale(1.3)`},
    '100%': { transform: `scale(1.0)`}
})

const Main = glam.div({
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: 'var(--main-grey)',
    textAlign: 'center',
    marginTop: 0,
    color: 'var(--main-purple)'
    // '& .heading': {
    //     marginTop: 0,
    // }
})

const Title = glam.p({
    margin: 'auto',
    marginBottom: 20,
    paddingTop: 50,
    fontSize: '36pt',
    color: 'var(--main-purple)',
    fontWeight: '700',
    borderBottom: 'solid var(--main-purple) 3px',
    width: 400,
})

const Description = glam.section({
    margin: 'auto',
    color: 'var(--main-purple)',
    fontSize: '14pt',
    width: '75%'
})

const Section = glam.section({
    '& .spot1': {
        height: 300,
        width: 300,
        borderRadius: '50%',
        boxShadow: '5px 5px 5px 0px black',
        backgroundColor: 'var(--main-purple)',
        '& :hover': {
            animation: `${grow} 5s ease-in-out alternate`
        }
    },
    '& .spot2': {
        height: 300,
        width: 300,
        borderRadius: '50%',
        boxShadow: '5px 5px 5px 0px black',
        backgroundColor: 'var(--main-purple)',
    },
    '& .spot3': {
        height: 300,
        width: 300,
        borderRadius: '50%',
        boxShadow: '5px 5px 5px 0px black',
        backgroundColor: 'var(--main-purple)',
        '& .fa-black-tie': {
            zIndex: 10,

        }
    }
})

const Person = glam.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    '.two': {
        flexDirection: 'row-reverse',
    },
    '.three': {
        marginBottom: 0,
        paddingBottom: 20,
    },
    '& p': {
        fontSize: '22pt',
        color: 'var(--main-purple)',
    }
})


export default About;
