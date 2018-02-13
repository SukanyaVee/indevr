import React, { Component } from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import {login} from '../ducks/reducer';
import glam from 'glamorous';

import Overview from './Overview';
// import Repo from './Repo';
// import Progress from './Progress';
// import Trello from './Trello';
// import Whiteboard from './Whiteboard';



const ProjectViewer = glam.div ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1,
    // padding: 50,
    '& main': {
        border: '2px solid green',
        padding: 20
    },
    '& nav': {
        background: 'grey',
        padding: 20,
        color: 'white',
        width: 200,
        '& a': {
            textDecoration: 'none'
        }
    },
    '& aside': {
        border: '2px solid yellow',
        width: 300,
        padding: 20
    }
})



class ProjectView extends Component {
    constructor(props){
        super()
        this.state={
            user: {},
            // project: this.props.project,
            stack: [],
            goals: []
            // showTool:''
        }
    }

    componentDidMount(){
        // axios.all(
            //axios.get single projects or passed through props
            //axios.get project stack
            //axios.get project group chat            
            //axios.get project goals        
        // )
    }

    openRepo () {
        
        var output = document.getElementById("repo");
        output.innerHTML=<object type="html" data="https://github.com" width="600px" height="400px" style="overflow:auto;border:5px ridge blue"></object>
    }

    render() {

        return (
            <ProjectViewer>
                <nav>
                    PROJECT TOOLS
                    <div><Link to="/project/overview">Overview</Link></div>
                    <div onClick={e=>this.openRepo()}>Repo</div>
                    <div><Link to="/project/progress">Progress</Link></div>
                    <div><Link to="/project/trello">Trello</Link></div>
                    <div><Link to="/project/whiteboard">Whiteboard</Link></div>
                </nav>
                <main>
                    <Switch>
                        <Route path="/project/overview" render={()=><Overview project={this.state.project} stack={this.state.stack}/>}/>
                        {/* <Route path="/project/repo" component={Repo}/>
                        <Route path="/project/progress" component={Progress}/>
                        <Route path="/project/trello" component={Trello}/>
                        <Route path="/project/whiteboard" component={Whiteboard}/> */}
                    </Switch>
                    <div id="repo"></div>
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
        );
    }
}

export default ProjectView