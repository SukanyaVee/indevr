import React, {Component} from 'react';
import glam from 'glamorous';
// import axios from 'axios';
import io from "socket.io-client";


class Chat extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: 'Andrea',
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
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
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
                    <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                </Form>
            </Main>
        );
    }
}

export default Chat;

const Main = glam.div({
    padding: 20
})

const Messages = glam.div({
    height: '80vh'
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
        margin: 10
    }
})
