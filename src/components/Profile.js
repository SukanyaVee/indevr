import React, {Component} from 'react'
import glam from 'glamorous';
import ConnectButton from './ConnectButton';
import grate from '../assets/background-grate.png';
import ToggleDisplay from 'react-toggle-display';
import axios from 'axios';
import PostTile from './PostTile';
import UserTile from './UserTile';
import ProjectTile from './ProjectTile';


class Profile extends Component {
    constructor(){
        super();
        this.state = {
            showPosts: false,
            showNetwork: false,
            showProjects: true,
            posts: [],
            network: [],
            projects: [
                {id: 1, project_name: 'inDevr', description: 'A super cool project!'},
                {id: 1, project_name: 'inDevr', description: 'A super cool project!'},
                {id: 1, project_name: 'inDevr', description: 'A super cool project! A super cool project! A super cool project! A super cool project! A super cool project! A super cool project! A super cool project! A super cool project!'}
            ]
        }
    }

    componentDidMount(){
        //Get Posts
        const userID = 1
        axios.get(`/indevr/posts/${userID}`).then(res => {
            this.setState({posts: res.data})
        }).catch( err => console.log(err))

        axios.get(`/indevr/contacts?user_id=${userID}`).then(res => {
            this.setState({network: res.data})
        }).catch( err => console.log(err))

        axios.get(`/indevr/projects?user_id=${userID}`).then(res => {
            this.setState({projects: res.data})
        }).catch( err => console.log(err))
    }

    switchTab(tab){
        document.querySelector('.active').classList.remove('active');
        document.getElementById(tab).classList.add('active');

        this.setState({
            showPosts: tab === 'posts' ? true : false,
            showNetwork: tab === 'network' ? true : false,
            showProjects: tab === 'projects' ? true : false,
        })
    }

    render(){
        return (
            <div>
                <Header></Header>
                <Main>
                    <div className="container">
                        <Sidebar>
                            <ProfileImg src="http://i.pravatar.cc/300" alt="profile picture" />
                            <h3>Apple Barrel</h3>
                            <ConnectButton />
                            <UserDetails>
                                <p>Short bio goes here so people can say things about themselves or whatever</p>
                                <div>
                                    <li><i className="fas fa-map-pin"></i> &nbsp; Location</li>
                                    <li><i className="far fa-envelope"></i> &nbsp; email@indevr.io</li>
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
                                <div id="posts" className="active" onClick={() => this.switchTab('posts')}>Posts</div>
                                <div id="network" onClick={() => this.switchTab('network')}>Network</div>
                                <div id="projects" onClick={() => this.switchTab('projects')}>Projects</div>
                            </Nav>
                            <Content>
                                <ToggleDisplay show={this.state.showPosts}>
                                    <PostsWrapper>
                                        {this.state.posts.map((post,i) => {
                                            return (
                                                    <PostTile key={i}
                                                        id={post.id}
                                                        name={post.first_name + ' ' + post.last_name}
                                                        user_id={post.user_id}
                                                        content={post.content}
                                                        timestamp={post.created_at}/>
                                            )
                                        })}
                                    </PostsWrapper>
                                </ToggleDisplay>

                                <ToggleDisplay show={this.state.showNetwork}>
                                    Network
                                    <NetworkWrapper>
                                        {this.state.network.map((user,i) => {
                                            return (
                                                    <UserTile key={i}
                                                    name={user.first_name + ' ' + user.last_name}
                                                    img={user.img}/>
                                            )
                                        })}
                                    </NetworkWrapper>
                                </ToggleDisplay>

                                <ToggleDisplay show={this.state.showProjects}>
                                    {this.state.projects.map((project,i) => {
                                        return (
                                            <ProjectTile
                                            key={i}
                                            id={project.id}
                                            title={project.project_name}
                                            desc={project.description}
                                            public={project.public}/>
                                        );
                                    })}
                                </ToggleDisplay>
                            </Content>
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
        alignItems: 'stretch',
        flexWrap: 'wrap',
    }
})

const Header = glam.div({
    height: 100,
    backgroundColor: 'var(--main-black)',
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
    '> h3':{
        marginTop: 0
    },
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
    marginBottom: 20,
    height: 300,
    width: 300
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
    cursor: 'pointer',
    '& .active':{
        borderBottom: '3px solid var(--main-purple)',
    },
})

const Content = glam.div({
    width: '100%',
    padding: 20,
})

const PostsWrapper = glam.div({
    display: 'grid',
    gridGap: 20,
    gridTemplateColumns: 'repeat(auto-fill, 300px)',
    justifyContent: 'center'
})

const NetworkWrapper = glam.div({
    display: 'grid',
    gridGap: 20,
    gridTemplateColumns: 'repeat(auto-fill, 170px)',
    justifyContent: 'center'
})
