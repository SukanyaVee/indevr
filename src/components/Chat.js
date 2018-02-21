import React, {Component} from 'react';
import glam from 'glamorous';
// import axios from 'axios';
import io from "socket.io-client";
import {connect} from 'react-redux';


class Chat extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: props.user.first_name + ' ' + props.user.last_name,
            message: '',
            messages: []
        };

        this.socket = io('localhost:3483');

        this.sendMessage = e => {
            e.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            });
            this.setState({message: ''});
        }

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            this.setState({messages: [...this.state.messages, data]});
        };
    }

    render(){
        return (
            <Main>
                <Messages className="messages">
                    {this.state.messages.map((message,i) => {
                        return (
                            <div key={i}><strong>{message.author}:</strong> {message.message}</div>
                        )
                    })}
                </Messages>
                <Form>
                    <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={e => this.setState({message: e.target.value})}/>
                    <button onClick={this.sendMessage} className="btn form-control">Send</button>
                </Form>
            </Main>
        );
    }
}

const mapStateToProps = state => {
    return {user: state.user}
}

export default connect(mapStateToProps)(Chat);

const Main = glam.div({
    padding: 20
})

const Messages = glam.div({
    height: 'calc(100vh - 205px)',
    overflowY: 'scroll'
})

const Form = glam.form({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    '> input':{
        flex: 5,
        margin: 10
    },
    '> button':{
        flex: 1,
        margin: 10,
        backgroundColor: 'var(--main-purple)',
        color: '#fff',
        ':hover':{
            color: '#fff'
        }
    }
})
