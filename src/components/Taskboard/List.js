import React, { Component } from 'react';
import update from 'immutability-helper';
import Card from './Card';
import { DropTarget } from 'react-dnd';
import glam from 'glamorous';
import axios from 'axios';

class Container extends Component {

	constructor(props) {
		super(props);
		this.state = {
			project_id: props.project_id,
            cards: props.list,
			user_id: props.id,
            title: '',
            description: '',
            status: '',
        };
	}

	pushCard(card) {
		this.setState(update(this.state, {
			cards: {
				$push: [ card ]
			}
		}));
	}

	removeCard(index) {
		this.setState(update(this.state, {
			cards: {
				$splice: [
					[index, 1]
				]
			}
		}));
	}

	moveCard(dragIndex, hoverIndex) {
		const { cards } = this.state;
		const dragCard = cards[dragIndex];

		this.setState(update(this.state, {
			cards: {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, dragCard]
				]
			}
		}));
	}

    addNewCard(){
		console.log(this.props);
        axios.post(`/indevr/taskboard`, {card: this.state, project_id: this.props.project_id}).then(res => {
            console.log(res.data);
			this.pushCard(this.state);
			this.setState({
				title: '',
	            description: '',
	            status: '',
			})
        }).catch( err => console.log(err));
    }

	render() {
		const { cards } = this.state;
		const { canDrop, isOver, connectDropTarget } = this.props;
		const isActive = canDrop && isOver;
		const style = {
			width: "200px",
            height: '100%',
			minHeight: "400px",
            margin: '10px',
            textAlign: 'center',
            paddingTop: 10,
            boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.75)',
		};

        const backgroundColor = isActive ? 'var(--main-grey)' : 'var(--main-purple)';
		const color = isActive ? '#fff' : '#333';
		return connectDropTarget(
			<div style={{...style, backgroundColor, color}}>
                <label style={{color: '#fff'}}>{this.props.title}</label>
				{cards.map((card, i) => {
					return (
						<Card
							key={card.id}
							index={i}
							listId={this.props.id}
							card={card}
							removeCard={this.removeCard.bind(this)}
							moveCard={this.moveCard.bind(this)} />
					);
				})}
				<AddCard>
					<a role="button" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target={`#List${this.props.id}`}>
						Add &nbsp; <i className="fas fa-plus-circle"></i></a>
				</AddCard>
				<Modal className="modal" id={`List${this.props.id}`} tabindex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title text-center">
                                    {this.state.title}</h4>
                                <h4>
                                    <input className="form-control"
                                        value={this.state.title ? this.state.title : ''}
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
                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => this.addNewCard()}>Add Card</button>
                            </div>
                        </div>
                    </div>
                </Modal>
			</div>
		);
  }
}

const cardTarget = {
	drop(props, monitor, component ) {
		const { id } = props;
		const sourceObj = monitor.getItem();
		if ( id !== sourceObj.listId ) component.pushCard(sourceObj.card);
		return {
			listId: id
		};
	}
}

const AddCard = glam.div({
    borderRadius: 3,
	padding: '0.5rem 1rem',
	margin: '.5rem',
	backgroundColor: 'white',
	cursor: 'pointer',
});

export default DropTarget("CARD", cardTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
}))(Container);


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
