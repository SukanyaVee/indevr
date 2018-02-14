import React, {Component} from 'react';
import glam from 'glamorous';
import axios from 'axios';
import List from './List';


class TaskBoard extends Component {
    constructor() {
        super();
        this.state = {
            lists: []
        }
    }

    componentDidMount(){
    let projectID = 1;
    axios.get(`/indevr/taskboard/${projectID}`).then(res => {
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

    }).catch( err => console.log(err))

}




    render() {
        const lists = this.state.lists.map( (list,i) => {
            return <List list={list} key={i}/>
        })
        return (
            <Main>
                {lists}
            </Main>
        );
    }

}

export default TaskBoard;

const Main = glam.div({display: 'flex', justifyContent: 'center', flexWrap: 'wrap'})
