import React, {Component} from 'react';
import glam from 'glamorous';
import axios from 'axios';

class Card extends Component {
    constructor(){
        super();
        this.state = {
            cardID: '',
            title: '',
            description: '',
            status: '',
            due: ''
        }
    }

    componentDidMount(){
        if(this.props.card){
            const {id, title, description, status, due} = this.props.card;
            this.setState({
                cardID: id,
                title,
                description,
                status,
                due
            })
        }
    }

    editTitle(id){
        const input = document.getElementById(`title${this.state.cardID}`);
        input.classList.toggle('hidden');
    }

    updateCard(){
        axios.put(`/indevr/taskboard`, this.state).then(res => {
            console.log(res.data);
        }).catch( err => console.log(err));
    }

    render() {
        const {status, due, title, description, cardID} = this.state;
        return (
            <div>
                <a role="button" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target={`#${cardID}`}>
                    <Main>
                        <div>
                            <sub>{status}</sub>
                            <sub>{due}</sub>
                        </div>
                        <p>{title}</p>
                    </Main>
                </a>
                <Modal className="modal" id={cardID} tabindex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title text-center" onClick={() => this.editTitle()}>
                                    {title}</h4>
                                <h4>
                                    <input className="form-control hidden"
                                        value={title ? title : ''}
                                        id={`title${cardID}`}
                                        onChange={e => this.setState({title: e.target.value})}/>
                                </h4>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>{description}</label>
                                        <textarea className="form-control"
                                            value={description ? description :''}
                                            onChange={e => this.setState({description: e.target.value})}
                                        ></textarea>
                                    </div>
                                    <div className="flex-wrapper">
                                        <div className="form-group">
                                            <label>{status}</label>
                                            <select
                                                className="form-control"
                                                value={status ? status : ''}
                                                onChange={e => this.setState({status: e.target.value})}>
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
                                                value={due ? due : ''}
                                                onChange={e => this.setState({due: e.target.value})}/>
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
        );
    }
}

export default Card;

const Main = glam.div({
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
    '& .modal-header': {
        backgroundColor: 'steelblue',
        color: '#fff'
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
