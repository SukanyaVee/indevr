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
                            description: 'Do the thingDo the thingDo the thingDo the thingDo the thingDo the thingDo the thing',
                            status: 'Incomplete',
                        },
                        {
                            title: 'Thing 2',
                            description: 'Do the thing',
                            status: 'Incomplete',
                        },
                        {
                            title: 'Thing 3',
                            description: 'Do the thing',
                            status: 'Incomplete',
                        },
                    ]
                },
                {
                    user: 'Andrea',
                    tasks: [
                        {
                            title: 'Thing 1',
                            description: 'Do the thing',
                            status: 'Incomplete',
                        }
                    ]
                },
                {
                    user: 'Brent',
                    tasks: [
                        {
                            title: 'Thing 1',
                            description: 'Do the thing',
                            status: 'Incomplete',
                        }
                    ]
                },
                {
                    user: 'Sukanya',
                    tasks: [
                        {
                            title: 'Thing 1',
                            description: 'Do the thing',
                            status: 'Incomplete',
                        }
                    ]
                },
            ]
        }
    }

    render(){
        const lists = this.state.lists.map( (list,i) => {
            const tasks = list.tasks.map( (task, j) => {
                return (
                    <a role="button" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample" key={j}>
                        <Card>
                            {task.title}
                            <div class="collapse" id="collapseExample">
                                <div class="well">
                                {task.description}
                                </div>
                            </div>
                        </Card>
                    </a>
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
    '> a':{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        color: '#333',
        textDecoration: 'none',
    },
    padding: 5,
    borderRadius: 3,
    height: '100%',
    '> label':{
        color: '#fff'
    }
})

const Card = glam.div({
    minHeight: 100,
    width: '100%',
    backgroundColor: '#fff',
    margin: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    '& .well':{
        width: 235,
        height: '100%',
    }
})
