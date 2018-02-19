import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import axios from 'axios';
import glam from 'glamorous';

const style = {
    borderRadius: 3,
	padding: '10px',
	margin: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
};

class Card extends Component {

    constructor(props){
        super(props);
        this.state = {
            user_id: props.listId,
            id: props.card.id,
            title: props.card.title,
            description: props.card.description,
            status: props.card.status,
            due: props.card.due
        }
    }

    editTitle(id){
        const input = document.getElementById(`title${this.props.card.id}`);
        input.classList.toggle('hidden');
    }

    updateCard(){
        axios.put(`/indevr/taskboard`, {card: this.state, user_id: this.props.listId}).then(res => {
            console.log(res.data);
        }).catch( err => console.log(err));
    }

	render() {
		const { card, isDragging, connectDragSource, connectDropTarget } = this.props;
		const opacity = isDragging ? 0 : 1;

		return connectDragSource(connectDropTarget(
			<div style={{ ...style, opacity }}>
                <Status>
                    <sub>{this.state.status}</sub>
                </Status>
                <Title>
                    <a role="button" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target={`#${card.id}`}>
                        {card.title}</a>
                </Title>
                <Modal className="modal" id={card.id} tabindex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title text-center" onClick={() => this.editTitle()}>
                                    {this.state.title}</h4>
                                <h4>
                                    <input className="form-control hidden"
                                        value={this.state.title ? this.state.title : ''}
                                        id={`title${card.id}`}
                                        onChange={ e => this.setState({ title: e.target.value })}/>
                                </h4>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea className="form-control"
                                            value={this.state.description ? this.state.description :''}
                                            onChange={ e => this.setState({ description: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <div className="flex-wrapper">
                                        <div className="form-group">
                                            <label>Status</label>
                                            <select
                                                className="form-control"
                                                value={this.state.status ? this.state.status : ''}
                                                onChange={ e => this.setState({ status: e.target.value })}>
                                                <option>Not Started</option>
                                                <option>In Progress</option>
                                                <option>Complete</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => this.updateCard()}>Close</button>
                            </div>
                        </div>
                    </div>
                </Modal>
			</div>
		));
	}
}

const cardSource = {

	beginDrag(props) {
		return {
			index: props.index,
			listId: props.listId,
			card: props.card
		};
	},

	endDrag(props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();

        //If card is moved to another list
		if ( dropResult && dropResult.listId !== item.listId ) {
            //Delete card from old list
            props.removeCard(item.index);
            //Update database
            axios.put('/indevr/taskboard', {card: props.card, user_id: dropResult.listId}).then(res =>{
                console.log(res.data);
            }).catch(err => console.log(err))
		}
	}
};

const cardTarget = {

	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;
		const sourceListId = monitor.getItem().listId;

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

		// Determine mouse position
		const clientOffset = monitor.getClientOffset();

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		// Time to actually perform the action
		if ( props.listId === sourceListId ) {
			props.moveCard(dragIndex, hoverIndex);

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			monitor.getItem().index = hoverIndex;
		}
	}
};

export default flow(
	DropTarget("CARD", cardTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragSource("CARD", cardSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
)(Card);

const Status = glam.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
})

const Title = glam.div({
    padding: '10px 0',
    '& a': {
        color: 'inherit'
    }
})

const Modal = glam.div({
    '& .modal-header': {
        backgroundColor: 'var(--main-purple)',
        color: '#fff',
    },
    '& form': {
        textAlign: 'left',
        '& textarea.form-control': {
            height: 200
        },
        '& .flex-wrapper': {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexWrap: 'wrap',
            '> div': {
                width: '48%',
                margin: '1%'
            }
        }
    },
    '@media (max-width: 500px)': {
        '& .flex-wrapper > div': {
            minWidth: '100%'
        }
    }
})
