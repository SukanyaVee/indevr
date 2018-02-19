import React, { Component } from 'react';
// import {Link, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import glam from 'glamorous';
import Overview from './Overview';
// import Repo from './Repo';
// import Chat from './Chat';
import TaskBoard from './TaskBoard';
// import Whiteboard from './Whiteboard';


const ProjectViewer = glam.div ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    flex: 1,
    // padding: 50,
    '& main': {
        padding: 20
    },
    '& nav': {
        background: 'var(--main-purple)',
        padding: 20,
        color: 'white',
        width: 200,
        height: '100vh',
        '& div': {
            cursor: 'pointer'
        }
    },
    '& aside': {
        maxWidth: 300,
        minWidth: 200,
        padding: 20,
        height: '100vh',
        background: 'var(--main-grey)'
    }
})



export default class ProjectView extends Component {
    constructor(props){
        super()
        this.state={
            projectId: 1,//this.props.match.params.id //HARDCODED
            // user: {},
            project: {},
            skills: [],
            projectCons: [] ,
            viewToggler: 'overview'
        }
        // this.openRepo = this.openRepo.bind(this)
        this.toggleView = this.toggleView.bind(this)
    }

    componentDidMount(){
         // session check get user detaisl from req.session
        
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
                        {this.state.viewToggler==='overview' && <Overview/> }
                        {this.state.viewToggler==='tasks' && <TaskBoard/> }
                        {this.state.viewToggler==='repo' && 
                            <div>
                                <a href={this.state.project.repo} target="_blank"></a>
                                <iframe src="http://github.com" width="600px" height="400px">
                                    <p>Github Repo</p>
                                </iframe>
                            </div>}
                        {/* {this.state.viewToggler==='repo' && <div id="repo"></div> } */}
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
