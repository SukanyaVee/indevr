import React, {Component} from 'react'
import glam from 'glamorous';
import ConnectButton from './ConnectButton';
import grate from '../assets/background-grate.png';

class Profile extends Component {
    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        return (
            <div>
                <Header></Header>
                <Main>
                    <div className="container">
                        <Sidebar>
                            <ProfileImg src="http://via.placeholder.com/300x300" alt="profile picture" />
                            <ConnectButton />
                            <UserDetails>
                                <p>Short bio goes here so people can say things about themselves or whatever</p>
                                <div>
                                    <li><i className="fas fa-map-pin"></i> &nbsp; Location</li>
                                    <li><i class="far fa-envelope"></i> &nbsp; email@indevr.io</li>
                                    <li><i className="fab fa-github"></i> &nbsp; Github</li>
                                    <li><i className="fab fa-bitbucket"></i> &nbsp; Bitbucket</li>
                                    <li><i className="fab fa-gitlab"></i> &nbsp; GitLab</li>
                                    <li><i className="far fa-briefcase"></i> &nbsp; Portfolio</li>
                                    <li><i className="far fa-globe"></i> &nbsp; Website</li>
                                    <li><i className="far fa-rss-square"></i> &nbsp; Blog</li>
                                    <li><i className="far fa-podcast"></i> &nbsp; Podcast</li>
                                    <li><i className="fab fa-codepen"></i> &nbsp; Codepen</li>
                                    <li><i className="fab fa-twitter"></i> &nbsp; Twitter</li>
                                    <li><i className="fab fa-stack-overflow"></i> &nbsp; Stack Overflow</li>
                                </div>
                            </UserDetails>
                        </Sidebar>
                        <Body>
                            <Projects>
                                <div>
                                    <h3>Current Project</h3>
                                </div>
                                <div>
                                    <h3>Featured Project</h3>
                                </div>
                            </Projects>
                            <Nav>
                                <div>Posts</div>
                                <div>Network</div>
                                <div>Projects</div>
                            </Nav>
                        </Body>
                    </div>
                </Main>
            </div>
        );
    }
}

export default Profile;

const Main = glam.div({
    backgroundColor: 'var(--main-purple)',
    minHeight: '100vh',
    paddingTop: 50,
    '> .container':{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    }
})

const Header = glam.div({
    height: 100,
    backgroundColor: 'var(--main-grey)',
    width: '100vw',
})

const Sidebar = glam.div({
    minHeight: '100vh',
    padding: '0 20px 20px 20px',
    width: 300,
    backgroundColor: 'var(--main-grey)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '> div':{
        width: '100%'
    },
    '@media (max-width: 729px)':{
        width: '100%',
        minHeight: '100%'
    }

})

const Body = glam.div({
    backgroundColor: '#fff',
    width: 'calc(100% - 300px)',
    minHeight: '100vh',
    minWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '@media (max-width: 729px)':{
        minWidth: '100%'
    }
})

const ProfileImg = glam.img({
    borderRadius: 3,
    marginBottom: 20
})

const Projects = glam.div({
    width: '100%',
    backgroundImage: `url(${grate})`,
    minHeight: 300,
    padding: 20,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    '> div':{
        flex: 1,
        width: 'calc(50% - 40px)',
        maxWidth: 'calc(50% - 40px)',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: 3,
        height: 200,
        margin: 20,
        padding: 20,
        '> h3':{
            margin: 0,
        },
        '@media (max-width: 992px)':{
            minWidth: '100%'
        }
    }
})


const UserDetails = glam.div({
    color: 'var(--main-purple)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '> p':{
        textAlign: 'center',
        color: '#fff',
        margin: '20px 0',
    },
    '& li':{
        listStyleType: 'none',
        fontSize: 16,
        padding: 10
    }
})

const Nav = glam.div({
    padding: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 300,
    fontSize: 18,
})
