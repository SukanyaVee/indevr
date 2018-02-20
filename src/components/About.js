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
                            <div className='spot1'></div>
                            <p> Sukanya </p>
                        </Person>
                        <Person className='two'>
                            <div className='spot2'></div>
                            <p> Andrea </p>
                        </Person>
                        <Person className='three'>
                            <div className='spot3'></div>
                            <p> Brent </p>
                        </Person>
                    </Section>
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
    // '& .heading': {
    //     marginTop: 0,
    // }
})

const Title = glam.p({
    paddingTop: 50,
    fontSize: '36pt',
    color: 'white',
    fontWeight: '700',
})

const Description = glam.section({
    margin: 'auto',
    color: 'white',
    fontSize: '14pt',
    width: '75%'
})

const Section = glam.section({
    '& .spot1': {
        height: 300,
        width: 300,
        borderRadius: '50%',
        backgroundColor: 'var(--main-grey)',
    },
    '& .spot2': {
        height: 300,
        width: 300,
        borderRadius: '50%',
        backgroundColor: 'var(--main-grey)',
    },
    '& .spot3': {
        height: 300,
        width: 300,
        borderRadius: '50%',
        backgroundColor: 'var(--main-grey)',
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
        fontSize: '16pt',
        color: 'white',
    }
})


export default About;
