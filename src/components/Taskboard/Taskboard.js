import React, { Component } from 'react';
import glam from 'glamorous';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import List from './List';

class Taskboard extends Component {

    constructor(){
        super();
        this.state = {
            lists: [
                {
                    listID: 0,
                    title: 'Unassigned',
                    cards: [ {id: 1, text: 'Do the thing'},{id: 2, text: 'Do the other thing'} ]
                },
                {
                    listID: 1,
                    title: 'Andrea',
                    cards: [{id: 3, text: 'Do more things'}]
                }
            ]
        }
    }

	render() {


		return (
            <Main>
                {this.state.lists.map( (list,i) => {
                    return <List
                        id={list.listID}
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
    paddingTop: 20,
    backgroundColor: 'var(--main-purple)',
    minHeight: '100vh',
})
