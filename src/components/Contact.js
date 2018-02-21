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
            document.getElementById('form').reset();
        } else {
            alert.classList.remove('alert-success', 'hidden')
            alert.classList.add('alert-danger');
            alert.innertHTML = 'Uh-Oh - Something went wrong.'
            button.innderHTML = 'Try Again'
        }
        }).catch(err => console.log(err))
}
}

clearText(){
    document.getElementById('form').reset();
}

    render() {
        return (
        <Main>
            <h1><strong>Contact the inDevr Team</strong></h1>
            <Form id='form'>

            <Inputs>
                <TopRow>
                    <div>
                    <label>Name:</label>
                    <Name id='name' className='form-control' placeholder='Please enter your name' onChange={e => this.setState({name: e.target.value})}></Name>
                    </div>
                    <div className='two'>
                    <label>Email:</label>
                    <Name id='address' className='form-control' placeholder='Please enter your email address' onChange={e => this.setState({address: e.target.value})}></Name>
                    </div>
                </TopRow>

                <Text id='email' className='form-control' placeholder='Please enter your comments or questions' onChange={e => this.setState({email: e.target.value})}></Text>
            </Inputs>

                <Buttons>
                    <div className='alert alert-success hidden' id='mailAlert' role='alert'>Message was send successfully!</div>
                    <Submit id='button' className='btn btn-success' type='submit' onClick={e => this.sendMail(e)}>Submit & Send</Submit>
                    <Submit className='btn' type='clear' onClick={this.clearText}>Clear</Submit>
                </Buttons>
            </Form>
        </Main>
        )
    }
}

const Main = glam.div({
    minHeight: '80vh',
    backgroundColor: 'var(--main-grey)',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
})

const Form = glam.form({
    width: '75%',
    minHeight: '500px',
    margin: 25,
    backgroundColor: 'var(--main-purple)',
    boxShadow: '10px 10px 5px 0px',
    borderRadius: 8,
    '> input': {
        margin: '20px auto',
    }
})

const Inputs = glam.div({
    margin: 'auto',
    width: '90%',
    height: '400px',
    // backgroundColor: 'aqua',
})

const TopRow = glam.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: 'white',
    marginBottom: 20,
    '> div': {
        width: '100%',
        margin: '10px auto',
    },
    '& .two': {

        marginLeft: '5%'
    },
    '> label': {
        marginBottom: 0,
    }
})

const Name = glam.input({
    width: '100%',
    height: '30%',
    // marginTop: 20,
    boxShadow: '5px 5px 5px 0px',
})

const Text = glam.textarea({
    width: '100%',
    minHeight: '300px',
    margin: 'auto',
    boxShadow: '5px 5px 5px 0px'
})

const Buttons = glam.div({
    width: 200,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
})

const Submit = glam.button({
    margin: 'auto',
    // margin: 10,
})
export default Contact;
