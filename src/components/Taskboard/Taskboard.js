import React, { Component } from 'react';
import glam from 'glamorous';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import List from './List';
import axios from 'axios';

class Taskboard extends Component {

    constructor(){
        super();
        this.state = {
            project_id: 2,
            lists: []
        }
    }

    componentDidMount(){
        axios.get(`/indevr/taskboard/${this.state.project_id}`).then(res => {
            let {lists, tasks} = res.data;
            let data = [];

            lists.forEach(list => {
                data.push({
                  id: list.user_id,
                  title: list.list_name,
                  label: '',
                  cards: []
                })
            })

            tasks.forEach(task => {
                if(!task.user_id){
                    data[0].cards.push(task)
                } else {
                    data.forEach(list => {
                        if(task.user_id === list.id){
                            list.cards.push(task);
                        }
                    })
                }
            })

            this.setState({lists: data})
        }).catch(err => console.log(err))
    }

	render() {
		return (
            <Main>
                {this.state.lists.map( (list,i) => {
                    return <List
                        project_id={this.state.project_id}
                        id={list.id}
                        title={list.title}
                        list={list.cards}
                        key={i}/>
                })}
            </Main>
		);
	}
}

export default DragDropContext(HTML5Backend)(Taskboard);

const Main = glam.div({
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingTop: 20,
    backgroundColor: 'var(--main-purple)',
    minHeight: '100vh',
})
