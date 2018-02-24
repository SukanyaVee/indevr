import React, { Component } from 'react';
import glam from 'glamorous';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';


class CreateProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.user.id, //HARDCODED
            proj_id: 0,
            project_name: '',
            description: '',
            pub: true,
            repo: '',
            stack:[],
            newSkill: '',
            newLevel: "1",
            showSkillsForm: false
        }
        this.createProj = this.createProj.bind(this)
        this.createSkill = this.createSkill.bind(this)
        this.completed = this.completed.bind(this)

    }

    createProj(project_name, description, pub, repo) {
        var newProj = {user_id: this.props.user.id, project_name: project_name, description:description, pub: pub, repo: repo}
        console.log(newProj)
        axios.post('/indevr/projects', newProj).then(resp=>{
            console.log(resp.data)
            this.setState({proj_id: resp.data[0].id})
            axios.post('/indevr/contributors', {project_id: resp.data[0].id, user_id: this.props.user.id, owner: true}).then(resp=>{ //HARDCODED
            }).catch(error=>console.log(error))
        }).catch(error=>console.log(error))
        this.setState({showSkillsForm: true})
    }

    createSkill(newSkill,newLevel){
        var x={project_id: this.state.proj_id, skill: newSkill, level: newLevel}
        console.log(x)
        axios.post('/indevr/skills', x).then(resp=>{
            axios.get(`indevr/skills/${this.state.proj_id}`).then(resp=>{
                this.setState({stack: resp.data})
                this.setState({newLevel: 1})
            }).catch(error=>console.log(error))
        }).catch(error=>console.log(error))
        // this.setState({newSkill:'',newLevel:0})
    }

    completed(newSkill,newLevel){
        var x={project_id: this.state.proj_id, skill: newSkill, level: newLevel}
        axios.post('/indevr/skills', x).then(resp=>{
            this.props.history.push(`/project/${this.state.proj_id}`) // HARDCODED
        }).catch(error=>console.log(error))
    }

    render() {
        var mapppp = this.state.stack.map(skill=> 
            (<ProjectSkills><div key={skill.id}>{skill.skill} - {skill.level===1?'Worthy Warrior':skill.level===2?'Noble Ninja':'Supreme Samurai'}</div></ProjectSkills>)
        )
        return (
            <Forrrm>
                {!this.state.showSkillsForm &&
                <div>
                Step 1: Create a project. You can add more skills later.<br/><br/>
                    <input placeholder="Project Name" onChange={e=>{this.setState({project_name: e.target.value})}}/><br/>
                    <input placeholder="Description"  onChange={e=>{this.setState({description: e.target.value})}}/><br/>
                    <input placeholder="Link to Github repo" onChange={e=>{this.setState({repo:e.target.value})}}/><br/>
                    Public?
                    <select value={this.state.pub} onChange={e=>{this.setState({pub:e.target.value})}}>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select><br/>
                    <button onClick={e=>{this.createProj(this.state.project_name, this.state.description, this.state.pub, this.state.repo)}}>Create</button>
                </div>}
                {/* CREATES PROJECT IN projects TABLE, THEN ALLOWS USER TO ENTER SKILLS */}
                {this.state.showSkillsForm &&
                    <div>
                        {mapppp}
                        Add more skills and levels to the project you just created<br/><br/>
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

const ProjectSkills = glam.div ({
    padding: 10,
    borderRadius: 10,
    '& div': {
        borderRadius: 3,
        background: 'var(--main-purple)',
        // margin: 5,
        padding:5,
        color: 'white'
    },
    '& span': {
        fontSize: 10,
        cursor: 'pointer'
    }
})


const mapStateToProps = state => {
    return {
      user: state.user
    }
  }


export default withRouter(connect(mapStateToProps)(CreateProject));
