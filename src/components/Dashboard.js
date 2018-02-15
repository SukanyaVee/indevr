import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {login} from '../ducks/reducer';
import {connect} from 'react-redux';
import axios from 'axios';
import profpic from '../assets/prof-pic.png';
import logo from '../assets/in_DEV_r.png';
import glam, { ClipPath, Aside } from 'glamorous';
import Header from './Header'
import CreateProject from './CreateProject'


class Dashboard extends Component {
    constructor(){
        super();
        this.state={
            user: {},
            projects: [],
            publicProj: [],
           posts: [],
            contacts: [],
            showConnections: false,
            projectView: 'mine',
            postContent: ''
        };
        this.showConn = this.showConn.bind(this)
        this.submitPost = this.deletePost.bind(this)
        this.deletePost = this.deletePost.bind(this)
        this.switchProjectView = this.switchProjectView.bind(this)
    }

    componentDidMount(){
            // axios.get('/indevr/users').then(res=>{
            //     this.props.login(res.data)
            // }).catch(error=>console.log(error))
        axios.get('/indevr/contacts?user_id=1').then(res=>{
            this.setState({contacts: res.data})
            console.log('connections', this.state.contacts)
        }).catch(error=>console.log(error))
        axios.get('/indevr/projects?user_id=1').then(res=>{
            res.data[0] ? this.setState({projects: res.data}) : this.setState({projectView: 'others'})
            console.log('my projects', this.state.projects)
        }).catch(error=>console.log(error))
        axios.get('/indevr/public?user_id=1').then(res=>{
            this.setState({publicProj: res.data})
            console.log('public projects', this.state.projects)
        }).catch(error=>console.log(error))
        axios.get('/indevr/posts').then(res=>{
            this.setState({posts: res.data})
        console.log('posts', this.state.posts)
        }).catch(error=>console.log(error))
    }

    showConn() {
        this.state.showConnections ? this.setState({showConnections: false}) : this.setState({showConnections: true})
    }

    switchProjectView (view) {
        console.log(view)
        this.setState({projectView: view})
    }
    
    submitPost(content, userId) {
        axios.post('/indevr/posts', {user_Id: 1, content:content}).then(resp=>{
            console.log('this is the response', resp.data)
            this.setState(prevState=>{
                return {posts: [...prevState.posts, resp.data[0]]}
            })
            console.log('this is the state after setting response to it', this.state.posts)
        }).catch(error=>console.log(error))
    }
    deletePost(postId){
        console.log(postId)
        axios.delete(`/indevr/posts/${postId}`).then(resp=>{
            this.setState({posts: resp.data})
        })
    }

    render() {
        // var p = {
        //     '
        // }

        return (
            <Dashboard1>
                <Header/>

                <Greeting>
                    <Hi>Hello, Friendly Developer! </Hi>
                    <Contacts>
                        <div onClick={e=>this.showConn()}>My Connections +</div>
                        {this.state.showConnections && <div>{this.state.contacts.map(contact => <ContactItem key={contact.id} contact={contact}><Link to={`/user/${contact.id}`}> <img src={contact.picture}/> <div>{contact.first_name} {contact.last_name}</div> </Link><br/></ContactItem>)}</div>}
                        
                    </Contacts>
                </Greeting>


                <Main>
                    <Projects>
                        <Nav>
                            <div onClick={e=>this.switchProjectView('mine')}>My projects</div>
                            <div onClick={e=>this.switchProjectView('others')}>Explore projects</div>
                            <div onClick={e=>this.switchProjectView('create')}>Create New Project</div>
                        </Nav>
                        {/* {this.state.projects[0] && */}
                        <ProjectList>
                            {this.state.projectView=='mine' &&  
                                this.state.projects.map(proj => <ProjectItem key={`mine${proj.id}`}><Link to={`/project/${proj.project_id}`}> <h2>{proj.project_name}</h2> </Link><div>{proj.description}</div></ProjectItem>)}
                            {this.state.projectView=='create' && <CreateProject user_id="1"/>}
                            {this.state.projectView=='others' && 
                            this.state.publicProj.map(proj => <ProjectItem key={`others${proj.id}`}><Link to={`/project/${proj.project_id}`}> <h2>{proj.project_name}</h2> </Link><div>{proj.description}</div></ProjectItem> )}
                        </ProjectList>
                    </Projects>
                <Side>
                        <Newpost>
                            <textarea placeholder="what gem did you find?" cols="25" onChange={e=>{this.setState({postContent:e.target.value})}}></textarea><br/>
                            <button onClick={e=>{this.submitPost(this.state.postContent)}}>Post</button>
                        </Newpost>
                    <PostFeed>
                        THE LATEST NEWS
                        {this.state.posts.map(item => 
                            <PostItem key={item.post_id}> 
                                <PostTitle>
                                    {item.content}
                                    <Xxx onClick={e=>{this.deletePost(item.post_id)}}>x</Xxx>
                                </PostTitle>
                                <div>
                                <small><small>{item.created_at}</small></small> 
                                 
                                <div><img src={item.picture}/> {item.first_name} {item.last_name}</div>
                                </div>
                            </PostItem>)}
                    </PostFeed>
                </Side>
                </Main>
            </Dashboard1>
        );
    }
}




const Dashboard1 = glam.div ({
    padding: 50
})



const Greeting = glam.div ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
})

const Hi= glam.div ({
    fontSize: 24
})

const Contacts = glam.div ({
    fontSize: 14,
    maxWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 20,
    '& img': {
        width: 30,
        height: 30,
        borderRadius: '50%'
    },
    cursor: 'Pointer'
})

const ContactItem = glam.div ({
    cursor: 'pointer',
    margin: 2,
    '& a': {
        textDecoration: 'none'
    }
})

const Main = glam.div ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
})

const Projects = glam.div ({
    padding: 10
})

const Nav = glam.div ({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
    '& div': {
        padding: 10,
        marginRight: 10,
        color: 'black',
        borderBottom: '3px solid #593c8f',
        cursor: 'pointer'
    }
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
    }
})


const Side = glam.div ({
    maxWidth: 300
})

const Newpost = glam.div ({
    '& textarea': {
        borderRadius: 3,
        padding: 3
    },
    marginBottom: 10,
})

const PostFeed = glam.div ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    '& img': {
        height: 25,
        width: 25,
        borderRadius: '50%',
        marginRight: 10
    },
    
})

const PostItem = glam.div({
    marginBottom: 5,
    padding: 5,
})

const PostTitle = glam.div ({
    display: 'flex',
    background: '#faffdd',
    borderRadius: 10,
    padding:5,
    justifyContent: 'space-between',
    minWidth: 200

})

const Xxx = glam.div({
    cursor: 'pointer',
    '&:hover': {
        opacity: '1',
        transform: 'scale(1.2)'
    },
    '&:not(:hover)': {
        opacity: '0.4'
    }
})

const mapStateToProps = state => {
    return {
      user: state.user
    }
  }
  const mapDispatchToProps = {
    login: login
  }

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
