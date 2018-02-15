import React, { Component } from 'react';
import glam from 'glamorous';
import axios from 'axios';
import {withRouter} from 'react-router-dom';


class CreateProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.user_id,
            project_name: '',
            description: '',
            public: true,
            repo: ''
        }
        this.createProj = this.createProj.bind(this)

    }

    createProj(newProj) {
        console.log(newProj)
        axios.post('/indevr/projects', newProj).then(resp=>{
            this.props.history.push('/project/1')
        }).catch(error=>console.log(error))
    }
    
    render() {
        console.log(this.props)
        return (
            <Forrrm>
                Step 1: Create a project. You can add more skills later.<br/><br/>
                {/* <input placeholder="Project Name" required onChange={e=>{p.name=e.target.value}}/><br/>
                <input placeholder="Description" required onChange={e=>{p.description=e.target.value}}/><br/>
                <input placeholder="Link to Github repo" required onChange={e=>{p.repo=e.target.value}}/><br/> */}
                <input placeholder="Project Name" required onChange={e=>{this.setState({project_name: e.target.value})}}/><br/>
                <input placeholder="Description" required onChange={e=>{this.setState({description: e.target.value})}}/><br/>
                <input placeholder="Link to Github repo" required onChange={e=>{this.setState({repo:e.target.value})}}/><br/>
                Public? 
                <select onChange={e=>{this.setState({public:e.target.value})}}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select><br/>
                <button onClick={e=>{this.createProj(this.state)}}>Create</button>
                
                {/* <input placeholder="Primary Skill" required onChange={e=>{this.setState(prevState=> {return {newProj: {...prevState.newProj, skill: e.target.value}}})}}/><br/>
                <select>
                    <option value="1">Worthy Warrior (novice)</option>
                    <option value="2">Noble Ninja (intermediate)</option>
                    <option value="3">Silent Samurai (advanced)</option>
                </select> */}
            </Forrrm>
        )
    }
}

const Forrrm = glam.div ({
    '& input': {
        margin: 5,
        padding: 5,
        borderRadius: 3
    },
    '& select': {
        margin: 5,
        padding: 5,
        borderRadius: 3
    }
})

export default withRouter(CreateProject);
