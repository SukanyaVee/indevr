import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {login} from '../ducks/reducer';
import {connect} from 'react-redux';
import axios from 'axios';
import glam from 'glamorous';
import {withRouter} from 'react-router-dom';
import profpic from '../assets/prof-pic.png';
import CreateProject from './CreateProject'
import Explorer from './Explorer'


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
        this.submitPost = this.submitPost.bind(this)
        this.deletePost = this.deletePost.bind(this)
        this.switchProjectView = this.switchProjectView.bind(this)
    }

    componentDidMount(){
        // session check get user detaisl from req.session
        axios.get('/indevr/contacts?user_id=1').then(res=>{ //HARDCODED
            this.setState({contacts: res.data})
            console.log('connections', this.state.contacts)
        }).catch(error=>console.log(error))
        axios.get('/indevr/projects?user_id=1').then(res=>{//HARDCODED
            res.data[0] ? this.setState({projects: res.data}) : this.setState({projectView: 'others'})
            console.log('my projects', this.state.projects)
        }).catch(error=>console.log(error))
        axios.get('/indevr/public?user_id=1').then(res=>{//HARDCODED
            this.setState({publicProj: res.data})
            console.log('public projects', this.state.projects)
        }).catch(error=>console.log(error))
        axios.get('/indevr/posts').then(res=>{
            this.setState({posts: res.data})
        console.log('posts', this.state.posts)
        }).catch(error=>console.log(error))
    }

    showConn() {
        this.setState({showConnections: !this.state.showConnections})
    }

    switchProjectView (view) {
        // console.log(view)
        this.setState({projectView: view})
    }

    submitPost(content) {
        console.log('post cpntent', content)
        axios.post('/indevr/posts', {user_Id: 2, content:content}).then(resp=>{//HARDCODED
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
            // this.setState({posts: resp.data})
        }).catch(error=>console.log(error))
    }

    render() {
        return (
            <Dashboard1>

                <Greeting>
                    <Hi>Hello, Friendly Developer! </Hi>
                    <Contacts>
                        <h4 onClick={e=>this.showConn()}>My Connections +</h4><br/>
                        {this.state.showConnections && 
                            <span>
                                {this.state.contacts.map(contact => 
                                    <ContactItem key={contact.id} contact={contact}>
                                        <Link to={`/dev/${contact.id}`}> 
                                            <img src={contact.picture||profpic} alt="contact"/> 
                                            <div>{contact.first_name} {contact.last_name}</div>
                                        </Link>
                                    </ContactItem>)
                                }
                            </span>
                        }
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
                            {this.state.projectView==='mine' &&  
                                this.state.projects.map(proj => 
                                    <ProjectItem key={`mine${proj.id}`}>
                                        <Link to={`/project/${proj.project_id}`}> 
                                            <h2>{proj.project_name}</h2> 
                                        </Link>
                                        <div>{proj.description}</div>
                                    </ProjectItem>)}
                                {/* HARDCODED */}
                            {this.state.projectView==='create' && <CreateProject user_id="1"/>} 
                            {this.state.projectView==='others' && <Explorer/>}
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
                                    
                                    <div><img src={item.picture} alt="profile"/> {item.first_name} {item.last_name}</div>
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
    // padding: 50
})



const Greeting = glam.div ({
    // display: 'flex',
    // justifyContent: 'space-between',
    // alignItems: 'flex-start',
    width: '100%'
})

const Hi= glam.div ({
    padding: 20,
    color: 'white',
    background: 'var(--main-purple)',
    fontSize: 24
})

const Contacts = glam.div ({
    fontSize: 14,
    padding: 20,
    marginBottom: 10,
    cursor: 'Pointer',
    '& img': {
        width: 40,
        height: 40,
        borderRadius: '50%'
    },
    '& span': {
        width: 500,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    '@media (max-width: 500px)': {
        marginBottom: 0,
        border: '1px solid red',
        padding: 10,
        '& span': {
            margin: 'auto',
        }
    }
})

const ContactItem = glam.div ({
    cursor: 'pointer',
    display: 'flex',
    width:200,
    margin: 2,
    '& a': {
        textDecoration: 'none'
    }
})

const Main = glam.div ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    '@media (max-width: 500px)':{
        flexDirection: 'column',
        padding: 10
    }
})

const Projects = glam.div ({
    padding: 10
})

const Nav = glam.div ({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    '& div': {
        padding: 10,
        marginRight: 10,
        color: 'black',
        background: 'var(--main-grey)',
        borderBottom: '3px solid #593c8f',
        borderRadius: '8px 8px 0 0',
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
    maxWidth: 300,
    background: '#eeeeee',
    padding: 20,
    '@media (max-width: 500px)': {
        display: 'none'
    }
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
    background: 'white',
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
