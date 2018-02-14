import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {login} from '../ducks/reducer';
import {connect} from 'react-redux';
import axios from 'axios';
import profpic from '../assets/prof-pic.png';
import logo from '../assets/logo.png';
import glam from 'glamorous';

const Dashboard1 = glam.div ({
    padding: 50
})

const Header = glam.div ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgb(200,200,200)',
    padding: 20,
    '& img': {
        width: 200,
        height: 100
    }

})

const Nav = glam.div ({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
    '& div': {
        padding: 10,
        border: '2px solid blue'
    }
})

const Greeting = glam.div ({
    fontSize: 24
})

const Main = glam.div ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1
})

const Projects = glam.div ({
    padding: 10
})

const ProjectItem = glam.div ({
    cursor: 'pointer',
    background: '#eeeeee',
    margin: 2,
    '& a': {
        textDecoration: 'none'
    }
})

const ProjectList = glam.div ({
    '& div': {
        padding: 10,
        textAlign: 'left',
        // border: '2px solid red'
    }
})

const Contacts = glam.div ({
    display: 'flex',
    justifyContent: 'flex-end',
    maxWidth: 400,
    alignItems: 'center',
    '& img': {
        width: 30,
        height: 30,
        margin: 10,
        borderRadius: '50%'
    }
})

const PostFeed = glam.div ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    width: 300
})

const PostTitle = glam.div ({
    padding: 5,
    fontStyle: 'Oblique'
})

class Dashboard extends Component {
    constructor(){
        super();
        this.state={
            user: {},
            projects: [],
           posts: [],
            contacts: [],
        };
    }

    componentDidMount(){
            // axios.get('/indevr/users').then(res=>{
            //     this.props.login(res.data)
            // }).catch(error=>console.log(error))
            axios.get('/indevr/contacts?user_id=1').then(res=>{
                this.setState({contacts: res.data})
                console.log(this.state.contacts)
            }).catch(error=>console.log(error))
            axios.get('/indevr/projects?user_id=1').then(res=>{
                this.setState({projects: res.data})
                console.log(this.state.projects)
            }).catch(error=>console.log(error))
        axios.get('/indevr/posts').then(res=>{
            this.setState({posts: res.data})
        console.log(this.state.posts)
        }).catch(error=>console.log(error))
    }


    render() {
        return (
            <Dashboard1>
                <Header>
                    <img src={logo}/>
                    <Nav>
                        <div>About</div>
                        <div>Explore</div>
                        <div>USer stuff</div>
                    </Nav>
                </Header>

                <Greeting>Hello, Friendly Developer! </Greeting>

                <Main>
                    <Projects>
                        <Nav>
                            <div>My projects Tab</div>
                            <div>Explore projects Tab</div>
                        </Nav>
                        {/* {this.state.projects[0] && */}
                        <ProjectList>
                            {this.state.projects.map(proj => <ProjectItem key={proj.id} project={proj}><Link to={`/project/${proj.project_id}`}> <h2>{proj.project_name}</h2> </Link><div>{proj.description}</div></ProjectItem>)}
                        </ProjectList>
                    </Projects>

                <aside>
                    <Contacts>
                        <div>MY CONNECTIONS</div>
                        {this.state.contacts.map(contact => <ProjectItem key={contact.id} contact={contact}><Link to={`/user/${contact.id}`}> <img src={contact.picture}/> <div>{contact.first_name} {contact.last_name}</div> </Link><br/></ProjectItem>)}
                        
                    </Contacts>
                    <PostFeed>
                        {this.state.posts.map(item => <div key={item.id} item={item}> {item.title} <br/> <div>Comment</div><div> Upvote</div></div>)}
                        <div> <PostTitle>Post title</PostTitle> <br/> <div>Comment Upvote</div></div>
                        <div><PostTitle>Post title</PostTitle> <br/> <div>Comment Upvote</div></div>
                        <div><PostTitle>Post title</PostTitle> <br/> <div>Comment Upvote</div></div>
                        <div><PostTitle>Post title</PostTitle> <br/> <div>Comment Upvote</div></div>
                        <div><PostTitle>Post title</PostTitle> <br/> <div>Comment Upvote</div></div>
                        <div><PostTitle>Post title</PostTitle> <br/> <div>Comment Upvote</div></div>
                        <div><PostTitle>Post title</PostTitle> <br/> <div>Comment Upvote</div></div>
                        <div><PostTitle>Post title</PostTitle> <br/> <div>Comment Upvote</div></div>
                    </PostFeed>
                </aside>
                </Main>
            </Dashboard1>
        );
    }
}

const mapStateToProps = state => {
    return {
      user: state.user
    }
  }
  const mapDispatchToProps = {
    login: login
  }

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
