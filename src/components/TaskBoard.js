import React, {Component} from 'react';
import glam from 'glamorous';
import _ from 'lodash';


class TaskBoard extends Component {
    constructor() {
        super();
        this.state = {
            lists: [
                {
                    user: 'Unassigned',
                    tasks: [
                        {
                            id: 1,
                            title: 'Thing 1',
                            description: 'Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing Do the thing',
                            status: 'Not Started',
                            due: '2018-02-20'
                        }, {
                            id: 2,
                            title: 'Thing 2',
                            description: 'Do the thing',
                            status: 'Not Started',
                            due: '2018-02-20'
                        }, {
                            id: 3,
                            title: 'Thing 3',
                            description: 'Do the thing',
                            status: 'Not Started',
                            due: '2018-02-20'
                        }
                    ]
                }, {
                    user: 'Andrea',
                    tasks: [
                        {
                            id: 4,
                            title: 'Thing 1',
                            description: 'Do the thing',
                            status: 'Not Started',
                            due: '2018-02-20'
                        }
                    ]
                }, {
                    user: 'Brent',
                    tasks: [
                        {
                            id: 5,
                            title: 'Lots of things and lots of stuffs, etc etc etc and more goes here blah blah',
                            description: 'Do the thing',
                            status: 'In Progress',
                            due: '2018-02-20'
                        }
                    ]
                }, {
                    user: 'Sukanya',
                    tasks: [
                        {
                            id: 6,
                            title: 'Thing 1',
                            description: 'Do the thing',
                            status: 'Not Started',
                            due: '2018-02-20'
                        }
                    ]
                }
            ]
        }
    }

    updateCard(id){
        let card = {};
        this.state.lists.forEach( list => {
            if(_.find(list.tasks, {'id': id} )){
                card = _.find(list.tasks, {'id': id} );
                console.log(card);
                //Update database
            }
        })

    }

    updateLists(listIndex, taskIndex, id){
        const title = document.getElementById(`listTitle${id}`).value;
        const desc = document.getElementById(`listDesc${id}`).value;
        const status = document.getElementById(`listStatus${id}`).value;
        const due = document.getElementById(`listDue${id}`).value;
        let newList = this.state.lists.slice();
        newList[listIndex].tasks[taskIndex].title = title;
        newList[listIndex].tasks[taskIndex].description = desc;
        newList[listIndex].tasks[taskIndex].status = status;
        newList[listIndex].tasks[taskIndex].due = due;
        this.setState({lists: newList})
    }

    editTitle(id){
        const input = document.getElementById(`listTitle${id}`);
        input.classList.toggle('hidden');
    }

    render() {
        const lists = this.state.lists.map((list, i) => {
            const tasks = list.tasks.map((task, j) => {
                return (
                    <div key={`${i}-${j}`}>
                        <a role="button" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target={`#card${task.id}`}>
                            <Card>
                                <div>
                                    <sub>{task.status}</sub>
                                    <sub>{task.due}</sub>
                                </div>
                                <p>{task.title}</p>
                            </Card>
                        </a>
                        <Modal className="modal" id={`card${task.id}`} tabindex="-1" role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        <h4 className="modal-title text-center"
                                            onClick={() => this.editTitle(task.id)}>
                                            {task.title}</h4>
                                        <h4>
                                            <input className="form-control hidden"
                                            value={task.title}
                                            id={`listTitle${task.id}`}
                                            onChange={e => this.updateLists(i, j, task.id)}
                                            />
                                        </h4>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="form-group">
                                                <label>Description</label>
                                                <textarea className="form-control"
                                                    value={task.description}
                                                    id={`listDesc${task.id}`}
                                                    onChange={e => this.updateLists(i, j, task.id)}>
                                                </textarea>
                                            </div>
                                            <div className="flex-wrapper">
                                                <div className="form-group">
                                                    <label>Status</label>
                                                    <select className="form-control"
                                                        value={task.status}
                                                        id={`listStatus${task.id}`}
                                                        onChange={e => this.updateLists(i, j, task.id)}>
                                                        <option>Not Started</option>
                                                        <option>In Progress</option>
                                                        <option>On Pause</option>
                                                        <option>Complete</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label>Due Date</label>
                                                    <input type="date"
                                                        className="form-control"
                                                        id={`listDue${task.id}`}
                                                        value={task.due}
                                                        onChange={e => this.updateLists(i, j, task.id)}
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button"
                                            className="btn btn-default"
                                            data-dismiss="modal"
                                            onChange={e => this.updateCard(task.id)}
                                        >Close</button>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>

                );
            })
            return (<List key={i}>
                <label>{list.user}</label>
                {tasks}
                <a role="button" data-toggle="collapse">
                    <Card>
                        <p>Add Card <i className="fas fa-plus"></i></p>
                    </Card>
                </a>
            </List>);
        })

        return (<Main>
            {lists}
        </Main>);
    }
}

export default TaskBoard;

const Main = glam.div({display: 'flex', justifyContent: 'center', flexWrap: 'wrap'})

const List = glam.div({
    width: 250,
    margin: 20,
    backgroundColor: 'steelblue',
    textAlign: 'center',
    padding: 5,
    borderRadius: 3,
    height: '100%',
    boxShadow: '3px 3px 3px 0px rgba(0,0,0,0.75)',
    '> label': {
        color: '#fff'
    },
    '& a': {
        color: '#333',
        textDecoration: 'none'
    }
})

const Card = glam.div({
    minHeight: 30,
    width: '100%',
    borderRadius: 3,
    backgroundColor: '#fff',
    marginBottom: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    padding: 10,
    '> div': {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    '& sub': {
        marginBottom: 15
    },
    '& p': {
        margin: 0
    }
})

const Modal = glam.div({
    '& .modal-header':{
        backgroundColor: 'steelblue',
        color: '#fff',
    },
    '& form':{
        textAlign: 'left',
        '& textarea.form-control':{
            height: 200,
        },
        '& .flex-wrapper':{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexWrap: 'wrap',
            '> div':{
                width: '48%',
                margin: '1%'
            },
        }
    },
    '@media (max-width: 500px)':{
        '& .flex-wrapper > div':{
            minWidth: '100%',
        }
    }
})
