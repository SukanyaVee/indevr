import React, { Component } from 'react'
import glam from 'glamorous'
import axios from 'axios'

class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            email: '',
        }

    }


sendMail(e){
    e.preventDefault();

    //Validation
    let formComplete=true;
    for(let key in this.state){
        if(this.state[key] === '' || (key === 'address' && !(/[^@]+@[^@]+\.[^@]+/.test(this.state.address)))){
            formComplete = false;
            document.getElementById(key).classList.add('required')
        }
    }

    if(formComplete){
        const button = document.getElementById('button');
        button.setAttribute('disabled', '');
        button.innerHTML = 'Sending...'
        axios.post('/indevr/send', this.state).then(res => {
            button.removeAttribute('disabled');
            const alert = document.getElementById('mailAlert');
            if(res.status === 200){
            alert.classList.remove('alert-danger', 'hidden');
            alert.classList.add('alert-success')
            alert.innderHTML =  'Message was sent successfully!';
            button.innerHTML = 'Sent!';
            document.getElementById('form').request();
        } else {
            alert.classList.remove('alert-success', 'hidden')
            alert.classList.add('alert-danger');
            alert.innertHTML = 'Uh-Oh - Something went wrong.'
            button.innderHTML = 'Try Again'
        }
        }).catch(err => console.log(err))
}
}

    render() {
        return (
        <Main>
            <h1>Contact the inDevr Team</h1>
            <form>
                <input id='name' className='form-control' placeholder='Please enter your name' onChange={e => this.setState({name: e.target.value})}></input>
                <input id='address' className='form-control' placeholder='Please enter your email address' onChange={e => this.setState({address: e.target.value})}></input>
                <textarea id='email' className='form-control' placeholder='Please enter your comments or questions' onChange={e => this.setState({email: e.target.value})}></textarea>

                <div>
                    <div className='alert alert-success hidden' id='mailAlert' role='alert'>Message was send successfully!</div>
                    <button id='button' className='btn btn-success' type='submit' onClick={e => this.sendMail(e)}>Submit & Send</button>
                </div>
            </form>
        </Main>
        )
    }
}

const Main = glam.div({
    minHeight: '100vh',
})


export default Contact;
