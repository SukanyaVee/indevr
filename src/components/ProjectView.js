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
        return (
            <div>
                <MobileHeader>
                    <div className="navbar-header">

                          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#project-tools" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <div className="submenu-btn">
                                Project Tools &nbsp; <i className="fas fa-wrench" color="#fff"></i>
                            </div>
                          </button>
                    </div>
                </MobileHeader>
                <Main>

                    <Sidebar>

                        <Nav className="collapse navbar-collapse" id="project-tools">
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
                            <Chat room={`ProjectRoom${this.state.projectId}`} />
                        </ToggleDisplay>
                        <ToggleDisplay show={this.state.showTaskboard}>
                            <TaskBoard project={this.state.projectId}/>
                        </ToggleDisplay>
                        <ToggleDisplay show={this.state.showWhiteboard}>

                        </ToggleDisplay>
                    </View>
                </Main>
            </div>
        );
    }
}


const Main = glam.div({
    minHeight: 'calc(100vh - 205px)',
    backgroundColor: 'var(--main-purple)',
    display: 'flex',
    '& .navbar-collapse':{
        padding: 0,
    },
    '@media (max-width: 767px)':{
        '& #project-tools':{
            backgroundColor: 'var(--main-purple)',
            width: '100vw',
            marginTop: -20
        }
    }

})

const Sidebar = glam.div({
    width: 150,
    paddingTop: 20,
    position: 'fixed',

})

const MobileHeader = glam.div({
    '& .submenu-btn':{
        color: '#fff',
    },
    '@media (max-width: 767px)':{
        '& .navbar-header':{
            backgroundColor: 'var(--main-purple) !important',
            height: 35,
            display: 'flex',
            justifyContent: 'center'
        },
        '& .navbar-toggle':{
            padding: 0
        }
    }
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
    '@media (max-width: 767px)':{
        textAlign: 'center',
        width: '100%',
        '& .active':{
            borderRadius: 0
        },
    }

})

const View = glam.div({
    minHeight: 'calc(100vh - 205px)',
    backgroundColor: '#fff',
    width: '100%',
    marginLeft: 150,
    padding: 20,
    '@media (max-width: 767px)':{
        marginLeft: 0
    }
})
