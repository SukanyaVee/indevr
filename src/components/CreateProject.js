import React, { Component } from 'react';
import glam from 'glamorous';
import axios from 'axios';
import {withRouter} from 'react-router-dom';


class CreateProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: 1, //this.props.user_id, //HARDCODED
            proj_id: 0, 
            project_name: '',
            description: '',
            pub: true,
            repo: '',
            stack:[],
            newSkill: '',
            newLevel: 1,
            showSkillsForm: false
        }
        this.createProj = this.createProj.bind(this)
        this.createSkill = this.createSkill.bind(this)
        this.completed = this.completed.bind(this)

    }

    createProj(project_name, description, pub, repo) {
        var newProj = {project_name: project_name, description:description, pub: pub, repo: repo}
        axios.post('/indevr/projects', newProj).then(resp=>{
            console.log(resp.data)
            this.setState({proj_id: resp.data[0].id})
            axios.post('indevr/contributors', {project_id: resp.data[0].id, user_id: 1, owner: true}).then(resp=>{ //HARDCODED
            })
        }).catch(error=>console.log(error))
        this.setState({showSkillsForm: true})
    }

    createSkill(newSkill,newLevel){
        var x={project_id: this.state.proj_id, skill: newSkill, level: newLevel}
        axios.post('/indevr/skills', x).then(resp=>{
            axios.get(`indevr/skills/${this.state.proj_id}`).then(resp=>{
                this.setState({stack: resp.data})
            }).catch(error=>console.log(error))
        }).catch(error=>console.log(error))
        this.setState({newSkill:'',newLevel:0})
    }

    completed(newSkill,newLevel){
        var x={project_id: this.state.proj_id, skill: newSkill, level: newLevel}
        axios.post('/indevr/skills', x).then(resp=>{
            this.props.history.push('/project/1') // HARDCODED
        }).catch(error=>console.log(error))
    }
    
    render() {

        var mapppp = this.state.stack.map(skill=> 
            (<div key={skill.id}>{skill.skill} - {skill.level===1?'Worthy Warrior':skill.level===2?'Noble Ninja':'Supreme Samurai'}</div>)
        )
        return (
            <Forrrm>
                Step 1: Create a project. You can add more skills later.<br/><br/>
                {!this.state.showSkillsForm && 
                <div>
                    <input placeholder="Project Name" required onChange={e=>{this.setState({project_name: e.target.value})}}/><br/>
                    <input placeholder="Description" required onChange={e=>{this.setState({description: e.target.value})}}/><br/>
                    <input placeholder="Link to Github repo" required onChange={e=>{this.setState({repo:e.target.value})}}/><br/>
                    Public? 
                    <select onChange={e=>{this.setState({pub:e.target.value})}}>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select><br/>
                    <button onClick={e=>{this.createProj(this.state.project_name, this.state.description, this.state.repo)}}>Create</button>
                </div>}
                {/* CREATES PROJECT IN projects TABLE, THEN ALLOWS USER TO ENTER SKILLS */}
                {this.state.showSkillsForm && 
                    <div>
                        {mapppp}
                        <input placeholder="Primary Skill" value={this.state.newSkill} required onChange={e=>{this.setState({newSkill:e.target.value})}}/><br/>
                        <select value={this.state.newLevel} onChange={e=>{this.setState({newLevel:e.target.value})}}>
                            <option value="1">Worthy Warrior (novice)</option>
                            <option value="2">Noble Ninja (intermediate)</option>
                            <option value="3">Supreme Samurai (advanced)</option>
                        </select> <br/>
                        <button onClick={e=>{this.createSkill(this.state.newSkill, this.state.newLevel)}}>Submit and add another skill</button>
                        <button onClick={e=>{this.completed(this.state.newSkill, this.state.newLevel)}}>Submit and complete</button>
                    </div>}
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
