import React, { Component } from 'react';
// import {Link, Switch, Route} from 'react-router-dom';
// import axios from 'axios';
import glam from 'glamorous';
import Overview from './Overview';
// import Repo from './Repo';
import Chat from './Chat';
import TaskBoard from './Taskboard/Taskboard';
// import Whiteboard from './Whiteboard';
import ToggleDisplay from 'react-toggle-display';




export default class ProjectView extends Component {
    constructor(props){
        super(props)
            this.state= {
            projectId: this.props.match.params.id,
            // user: {},
            project: {},
            skills: [],
            projectCons: [] ,
            showOverview: true,
            showChat: false,
            showTaskboard: false,
            showWhiteboard: false
        }
        // this.openRepo = this.openRepo.bind(this)
    }

    componentDidMount(){
         // session check get user detaisl from req.session

    }

    // openRepo () {
        // var output = document.getElementById("repo");
        // output.innerHTML=<object type="html" data="https://github.com" width="600px" height="400px" style="overflow:auto;border:5px ridge blue"></object>
    // }

    switchTab(tab){
        document.querySelector('.active').classList.remove('active');
        document.getElementById(tab).classList.add('active');

        this.setState({
            showOverview: tab === 'overview' ? true : false,
            showChat: tab === 'chat' ? true : false,
            showTaskboard: tab === 'taskboard' ? true : false,
            showWhiteboard: tab === 'whiteboard' ? true : false,
        })
    }

    render() {
        console.log(this.props)

        return (
            <Main>
                <Sidebar>
                    <Nav>
                        <div id="overview" className="active" onClick={() => this.switchTab('overview')}>Overview</div>
                        <div id="chat" onClick={() => this.switchTab('chat')}>Team Chat</div>
                        <div id="taskboard" onClick={() => this.switchTab('taskboard')}>Taskboard</div>
                        <div id="whiteboard" onClick={() => this.switchTab('whiteboard')}>Whiteboard</div>
                    </Nav>
                </Sidebar>
                <View>
                    <ToggleDisplay show={this.state.showOverview}>
                        <Overview />
                    </ToggleDisplay>
                    <ToggleDisplay show={this.state.showChat}>
                        <Chat />
                    </ToggleDisplay>
                    <ToggleDisplay show={this.state.showTaskboard}>
                        <TaskBoard project={this.state.projectId}/>
                    </ToggleDisplay>
                    <ToggleDisplay show={this.state.showWhiteboard}>

                    </ToggleDisplay>
                </View>
            </Main>
        );
    }
}


const Main = glam.div({
    minHeight: 'calc(100vh - 205px)',
    backgroundColor: 'var(--main-purple)',
    display: 'flex',
})

const Sidebar = glam.div({
    width: 150,
    paddingTop: 20,
    position: 'fixed'
})


const Nav = glam.div({
    // padding: 20,
    color: '#fff',
    width: 130,
    fontSize: 18,
    cursor: 'pointer',
    '> div':{
        padding: 10,
    },
    '& .active':{
        backgroundColor: 'var(--main-black)',
        fontWeight: 'bold',
        borderRadius: '0 10px 10px 0'
    },
})

const View = glam.div({
    minHeight: 'calc(100vh - 205px)',
    backgroundColor: '#fff',
    width: '100%',
    marginLeft: 150,
    padding: 20,
})


{/* <ProjectViewer>
    <nav>
        PROJECT TOOLS
        <div onClick={e=>this.toggleView('overview')}>Overview</div>
        <div onClick={e=>this.toggleView('repo')}>Repo</div>
        <div onClick={e=>this.toggleView('tasks')}>Tasks</div>
    </nav>

    <main>
            {this.state.viewToggler==='overview' && <Overview/> }
            {this.state.viewToggler==='tasks' && <TaskBoard/> }
            {this.state.viewToggler==='repo' &&
                <div>
                    <a href={this.state.project.repo} target="_blank"></a>
                    <iframe title="repo" src="http://github.com" width="600px" height="400px">
                        <p>Github Repo</p>
                    </iframe>
                </div>}
            {this.state.viewToggler==='repo' && <div id="repo"></div> }
            {this.state.viewToggler==='white' && <Whiteboard/> }
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
</ProjectViewer> */}






// const ProjectViewer = glam.div ({
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     // width: '100%',
//     // flex: 1,
//     // padding: 50,
//     '& main': {
//         padding: 20
//     },
//     '& nav': {
//         background: 'var(--main-purple)',
//         padding: 20,
//         color: 'white',
//         minWidth: 200,
//         height: '100vh',
//         '& div': {
//             cursor: 'pointer',
//             padding: 5
//         }
//     },
//     '& aside': {
//         maxWidth: 300,
//         minWidth: 200,
//         padding: 20,
//         height: '100vh',
//         background: 'var(--main-grey)'
//     },
//     '@media (max-width: 500px)': {
//         flexDirection: 'column',
//         justifyContent: 'flex-start',
//         alignItems:'center',
//         width: '100%',
//         '& nav': {
//             width: '100vw',
//             padding: 10,
//             height: 'auto',
//             fontSize: 16
//         },
//         '& aside': {
//             width: '100%',
//             height: 'auto'
//         },
//         '& main': {
//             width: '100%',
//         }
//     }
// })
//
