import React, { Component } from 'react';
// import {Link, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import glam from 'glamorous';
import Overview from './Overview';
// import Repo from './Repo';
// import Chat from './Chat';
import TaskBoard from './TaskBoard';
// import Whiteboard from './Whiteboard';


// const Nav = glam.div ({
//     display: 'flex',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     padding: 20,
//     '& div': {
//         padding: 10,
//         marginRight: 10,
//         color: 'black',
//         borderBottom: '3px solid #593c8f',
//         cursor: 'pointer'
//     }
// })

const ProjectViewer = glam.div ({
    display: 'flex',
    justifyContent: 'space-between',
    border: '2px red solid',
    alignItems: 'flex-start',
    flex: 1,
    // padding: 50,
    '& main': {
        padding: 20
    },
    '& nav': {
        background: 'grey',
        padding: 20,
        color: 'white',
        width: 200,
        height: '100vh',
        '& div': {
            cursor: 'pointer'
        }
    },
    '& aside': {
        border: '2px solid yellow',
        maxWidth: 300,
        minWidth: 200,
        padding: 20,
        height: '100vh',
        background: '#d4c631'
    }
})



export default class ProjectView extends Component {
    constructor(props){
        super()
        this.state={
            projectId: 1,//this.props.match.params.id
            // user: {},
            project: {},
            skills: [],
            projectsCons: [] ,
            viewToggler: 'overview'
        }
        this.openRepo = this.openRepo.bind(this)
        this.toggleView = this.toggleView.bind(this)
    }

    componentDidMount(){
        axios.get(`/indevr/projects/${this.state.projectId}`).then(res=>{
            this.setState({project: res.data[0]})
            // console.log('single project', res.data[0])
        }).catch(error=>console.log(error))        
        axios.get(`/indevr/skills/${this.state.projectId}`).then(res=>{
            this.setState({skills: res.data})
            // console.log('skill stack', this.state.skills)
        }).catch(error=>console.log(error))
        axios.get(`/indevr/contributors?projectId=${this.state.projectId}`).then(res=>{
            this.setState({projectCons: res.data})
            // console.log('contributors', this.state.projectCons)
        }).catch(error=>console.log(error))
    }

    openRepo () {
        // var output = document.getElementById("repo");
        // output.innerHTML=<object type="html" data="https://github.com" width="600px" height="400px" style="overflow:auto;border:5px ridge blue"></object>
    }

    toggleView(view) {
        console.log('what to show', view)
        this.setState({viewToggler: view})
    }

    render() {

        return (
            <div>
            <ProjectViewer>
                <nav>
                    PROJECT TOOLS
                    <div onClick={e=>this.toggleView('overview')}>Overview</div>
                    <div onClick={e=>this.toggleView('repo')}>Repo</div>
                    <div onClick={e=>this.toggleView('tasks')}>Tasks</div>
                    {/* <div onClick={e=>this.toggleView('white')}>Whiteboard</div> */}
                </nav>
                <main>
                        {this.state.viewToggler==='overview' && <Overview project={this.state.project} skills={this.state.skills} projectCons={this.state.projectsCons}/> }
                        {this.state.viewToggler==='tasks' && <TaskBoard/> }
                        {this.state.viewToggler==='repo' && <div id="repo"></div> }
                        {/* {this.state.viewToggler==='white' && <Whiteboard/> } */}
                </main>

                <aside>
                    <div>Chat message</div>
                    <div>Chat message</div>
                    <div>Chat message</div>
                    <div>Chat message</div>
                    <div>Chat message</div>
                    <div>Chat message</div>
                    <div>Chat message</div>
                    <div>Chat message</div>
                </aside>
            </ProjectViewer>
        </div>
        );
    }
}
