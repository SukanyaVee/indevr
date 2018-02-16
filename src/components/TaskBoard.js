import React, {Component} from 'react';
import glam from 'glamorous';

class TaskBoard extends Component {
    constructor(){
        super();
        this.state = {
            lists: [
                {
                    user: 'Unassigned',
                    tasks: [
                        {
                            title: 'Thing 1',
                            description: 'Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing',
                            status: 'Not Started',
                        },
                        {
                            title: 'Thing 2',
                            description: 'Do the thing',
                            status: 'Not Started',
                        },
                        {
                            title: 'Thing 3',
                            description: 'Do the thing',
                            status: 'Not Started',
                        },
                    ]
                },
                {
                    user: 'Andrea',
                    tasks: [
                        {
                            title: 'Thing 1',
                            description: 'Do the thing',
                            status: 'Not Started',
                        }
                    ]
                },
                {
                    user: 'Brent',
                    tasks: [
                        {
                            title: 'Lots of things and lots of stuffs, etc etc etc and more goes here blah blah',
                            description: 'Do the thing',
                            status: 'Not Started',
                        }
                    ]
                },
                {
                    user: 'Sukanya',
                    tasks: [
                        {
                            title: 'Thing 1',
                            description: 'Do the thing',
                            status: 'Not Started',
                        }
                    ]
                },
            ]
        }
    }

    updateCard(val, listI, taskI){

        let newList = this.state.lists.slice();
        newList[listI].tasks[taskI].status = val;

        this.setState({lists: newList})
    }

    render(){
        const lists = this.state.lists.map( (list,i) => {
            const tasks = list.tasks.map( (task, j) => {
                return (
                    <Card key={j}>
                        <a role="button" data-toggle="collapse" href={`#card${i}${j}`}>
                            <sub>{task.status}</sub>
                            <h4>{task.title}</h4>
                        </a>
                        <div className="collapse" id={`card${i}${j}`}>
                            <div className="well">
                            {task.description}
                            <br/>
                            <div>
                                <div className="input-group">
                                    <span className="input-group-addon" id="basic-addon1">Status</span>
                                    <select type="text" className="form-control" onChange={e => this.updateCard(e.target.value, i, j)}>
                                        <option>Not Started</option>
                                        <option>In Progress</option>
                                        <option>Complete</option>
                                    </select>
                                </div>
                            </div>
                            </div>
                        </div>
                    </Card>
                );
            })
            return (
                <List key={i}>
                    <label>{list.user}</label>
                    {tasks}
                </List>
            );
        })

        return (
            <Main>
                task
                {lists}
            </Main>
        );
    }
}

export default TaskBoard;

const Main = glam.div({
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
})

const List = glam.div({
    width: 250,
    margin: 20,
    backgroundColor: 'steelblue',
    textAlign: 'center',
    padding: 5,
    borderRadius: 3,
    height: '100%',
    boxShadow: '3px 3px 3px 0px rgba(0,0,0,0.75)',
    '> label':{
        color: '#fff'
    }
})

const Card = glam.div({
    minHeight: 100,
    width: '100%',
    borderRadius: 3,
    backgroundColor: '#fff',
    marginBottom: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    paddingTop: 8,
    '& .well':{
        width: 235,
        height: '100%',
        margin: 0,
        padding: 10,
    },
    '> a':{
        color: '#333',
        textDecoration: 'none',
    },
    '& sub':{
        position: 'absolute',
        top: 7,
        left: 3,
        margin: 5
    },
    '& select':{
        position: 'relative',
        left: -3,
    },
})
