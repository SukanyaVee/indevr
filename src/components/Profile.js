import React, {Component} from 'react'
import glam from 'glamorous';
import ConnectButton from './ConnectButton';
import grate from '../assets/background-grate.png';
import ToggleDisplay from 'react-toggle-display';
import axios from 'axios';
import PostTile from './PostTile';
import UserTile from './UserTile';
import ProjectTile from './ProjectTile';
import {Link} from 'react-router-dom';


class Profile extends Component {
    constructor(){
        super();
        this.state = {
            showPosts: true,
            showNetwork: false,
            showProjects: false,
            user: '',
            picture: '',
            posts: [],
            network: [],
            projects: [],
            links: {},
            skills: []
        }
    }

    componentDidMount(){
        this.getInfo();

    }

    componentWillReceiveProps(nextProps){
        this.getInfo();
    }

    getInfo(){
        //Reset back to initial
        this.setState({
            showPosts: true,
            showNetwork: false,
            showProjects: false,
            user: '',
            picture: '',
            posts: [],
            network: [],
            projects: [],
            links: {},
            skills: []
        })
        document.querySelector('.active').classList.remove('active');
        document.getElementById('posts').classList.add('active');

        //Get User information
        const userID = this.props.history.location.pathname.slice(5);
        axios.get(`/indevr/users/${userID}`).then(res => {
            const {first_name, last_name, picture, bio, location, email, github,bitbucket,gitlab,portfolio,website,codepen,twitter, skills} = res.data;
            this.setState({ user: first_name + ' ' + last_name, picture, bio, links: {location, email, github,bitbucket,gitlab,portfolio,website,codepen,twitter}, skills })
        }).catch( err => console.log(err))

        //Get Posts
        axios.get(`/indevr/posts/${userID}`).then(res => {
            this.setState({posts: res.data})
        }).catch( err => console.log(err))

        //Get Network
        axios.get(`/indevr/contacts?user_id=${userID}`).then(res => {
            this.setState({network: res.data})
        }).catch( err => console.log(err))

        //Get Projects
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
                <Main>
                    <div className="container">
                        <Sidebar>
                            <ProfileImg src={this.state.picture} alt="profile picture" />
                            <h3>{this.state.user}</h3>
                            <ConnectButton />
                            <UserDetails>
                                <p>{this.state.bio}</p>
                                <div>
                                    {this.state.links.location &&
                                        <li><i className="fas fa-map-pin"></i> &nbsp; {this.state.links.location}</li>}
                                    {this.state.links.email &&
                                        <li><a href={`mailto:${this.state.links.email}`}><i className="far fa-envelope"></i> &nbsp; {this.state.links.email}</a></li>}
                                    {this.state.links.website &&
                                        <li><a href={`${this.state.links.website}`}><i className="far fa-globe"></i> &nbsp; {this.state.links.website}</a></li>}
                                    {this.state.links.github &&
                                        <li><a href={`https://github.com/${this.state.links.github}`}><i className="fab fa-github"></i> &nbsp; Github</a></li>}
                                    {this.state.links.bitbucket &&
                                        <li><a href={`https://bitbucket.org/${this.state.links.bitbucket}`}><i className="fab fa-bitbucket"></i> &nbsp; Bitbucket</a></li>}
                                    {this.state.links.gitlab &&
                                        <li><a href={`https://gitlab.com/${this.state.links.gitlab}`}><i className="fab fa-gitlab"></i> &nbsp; {this.state.links.gitlab}</a></li>}
                                    {this.state.links.portfolio &&
                                        <li><a href={`${this.state.links.portfolio}`}><i className="far fa-briefcase"></i> &nbsp; Portfolio</a></li>}
                                    {this.state.links.codepen &&
                                        <li><a href={`https://codepen.io/${this.state.links.codepen}`}><i className="fab fa-codepen"></i> &nbsp; {this.state.links.codepen}</a></li>}
                                    {this.state.links.twitter &&
                                        <li><a href={`https://twitter.com/${this.state.links.twitter}`}><i className="fab fa-twitter"></i> &nbsp; @{this.state.links.twitter}</a></li>}
                                </div>
                                <Skills>
                                    {this.state.skills.map((skill,i) => {
                                        return <div key={i}>{skill.skill} - {skill.level}</div>
                                    })}
                                </Skills>
                            </UserDetails>
                        </Sidebar>
                        <Body>
                            <Projects>
                                {!this.state.projects.length &&
                                    <div>
                                        <h3>No Projects Yet!</h3>
                                        <p>{this.state.user} hasn't joined any projects on inDevr yet :(</p>
                                    </div>}
                                {this.state.projects.length >= 1 &&
                                    <div>
                                        <h3>{this.state.projects[0].project_name}</h3>
                                        <p>{this.state.projects[0].description}</p>
                                    </div>}
                                {this.state.projects.length >= 2 &&
                                    <div>
                                        <h3>{this.state.projects[1].project_name}</h3>
                                        <p>{this.state.projects[1].description}</p>
                                    </div>}
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
                                    <NetworkWrapper>
                                        {this.state.network.map((user,i) => {
                                            return (
                                                <Link to={`/dev/${user.id}`} key={i}>
                                                    <UserTile
                                                    name={user.first_name + ' ' + user.last_name}
                                                    img={user.picture}/>
                                                </Link>
                                            )
                                        })}
                                    </NetworkWrapper>
                                </ToggleDisplay>

                                <ToggleDisplay show={this.state.showProjects}>
                                    {this.state.projects.map((project,i) => {
                                        return (
                                            <Link to={`/project/${project.id}`}>
                                                <ProjectTile
                                                key={i}
                                                id={project.id}
                                                title={project.project_name}
                                                desc={project.description}
                                                public={project.public}/>
                                            </Link>
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
    },
    '& a':{
        color: 'inherit',
        textDecoration: 'none',
    },
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

const Skills = glam.div({
    marginTop: 10,
    display: 'flex',
    flexWrap: 'wrap',
    '> div':{
        margin: 5,
        color: '#fff',
        backgroundColor: 'var(--main-purple)',
        padding: '3px 5px',
        borderRadius: 5,
    }
})
