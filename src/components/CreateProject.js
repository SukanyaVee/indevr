import React, { Component } from 'react';
import glam from 'glamorous';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';


class CreateProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: '',
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

    componentDidMount(){
        if(this.props && this.props.user){
            this.setState({user_id: this.props.user.id})
        }
    }

    createProj(project_name, description, pub, repo) {
        if (project_name!=='' && description!=='' && repo!=='') {
            var newProj = {user_id: this.state.user_id, project_name: project_name, description:description, pub: pub, repo: repo}
            console.log(newProj)
            axios.post('/indevr/projects', newProj).then(resp=>{
                console.log(resp.data)
                this.setState({proj_id: resp.data[0].id})
                axios.post('/indevr/contributors', {project_id: resp.data[0].id, user_id: this.state.user_id, owner: true}).then(resp=>{ //HARDCODED
                }).catch(error=>console.log(error))
            }).catch(error=>console.log(error))
            this.setState({showSkillsForm: true})
        } else {
            alert('Please do not leave any fields blank')
        }
    }

    createSkill(newSkill,newLevel, e){
        e.preventDefault()
        var x={project_id: this.state.proj_id, skill: newSkill, level: newLevel}
            if(this.state.newSkill !== ''){
                axios.post('/indevr/skills', x).then(resp=>{
                    axios.get(`indevr/skills/${this.state.proj_id}`).then(resp=>{
                        this.setState({stack: resp.data})
                        this.setState({newLevel: 1})
                    }).catch(error=>console.log(error))
                }).catch(error=>console.log(error))
                this.setState({newSkill:'',newLevel:1})
            }
    }

    removeSkill(index){
        const id = this.state.stack[index].id;
        const newStack = [...this.state.stack];
        newStack.splice(index, 1);
        axios.delete(`indevr/skills/${id}`).then(res => {
            this.setState({stack: newStack})
        }).catch(err => console.log(err))
    }

    completed(newSkill,newLevel){
        this.props.history.push(`/project/${this.state.proj_id}`)
    }

    render() {
        return (
            <div>
                {!this.state.showSkillsForm &&
                    <Form>
                        <label>Step 1: Create a project!</label>
                        <input className="form-control"
                            placeholder="Project Name"
                            onChange={e=>{this.setState({project_name: e.target.value})}}/>

                        <textarea className="form-control"
                            placeholder="Description"
                            onChange={e=>{this.setState({description: e.target.value})}}></textarea>

                        <input className="form-control"
                            placeholder="Link to Github repo"
                            onChange={e=>{this.setState({repo:e.target.value})}}/>

                        <select className="form-control"
                            value={this.state.pub}
                            onChange={e=>{this.setState({pub:e.target.value})}}>
                            <option value={true}>Public</option>
                            <option value={false}>Private</option>
                        </select>

                        <button className="btn"
                            onClick={e=>{this.createProj(this.state.project_name, this.state.description, this.state.pub, this.state.repo)}}>
                            Create</button>
                    </Form>}

                {/* CREATES PROJECT IN projects TABLE, THEN ALLOWS USER TO ENTER SKILLS */}
                {this.state.showSkillsForm &&
                    <div>
                        <Form>
                            <label>Step 2: Build the stack for your project</label>
                            <input className="form-control"
                                placeholder="Ex: React"
                                value={this.state.newSkill}
                                required onChange={e=>{this.setState({newSkill:e.target.value})}}/>

                            <select className="form-control"
                                value={this.state.newLevel}
                                onChange={e=>{this.setState({newLevel:e.target.value})}}>
                                <option value="1">Worthy Warrior (novice)</option>
                                <option value="2">Noble Ninja (intermediate)</option>
                                <option value="3">Supreme Samurai (advanced)</option>
                            </select>
                            <button  className="btn"
                                onClick={e=>{this.createSkill(this.state.newSkill, this.state.newLevel, e)}}>Add</button>
                            <button className="btn"
                                onClick={e=>{this.completed(this.state.newSkill, this.state.newLevel)}}>Finish
                            </button>
                        </Form>
                        <SkillDisplay>
                            {this.state.stack.map( (skill,i) => {
                                return (
                                    <Tag key={i}>
                                        {skill.skill} - {skill.level}
                                        <div className="delete" onClick={() => this.removeSkill(i)}> &nbsp; <i className="fas fa-minus-circle"></i></div>
                                    </Tag>
                                )
                            })}
                        </SkillDisplay>
                    </div>}
            </div>
        )
    }
}

const Form = glam.form ({
    padding: 10,
    maxWidth: 400,
    textAlign: 'center',
    '& button':{
        backgroundColor: 'var(--main-purple)',
        color: '#fff',
        width: 'calc(50% - 10px)',
        fontWeight: 'bold',
        margin: 5,
        ':hover':{
            color: '#fff'
        }
    },
    '& .form-control':{
        margin: 10,
        width: 'calc(100% - 20px)'
    }
})

const SkillDisplay = glam.div({
    marginTop: 10,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // '> div':{
    //     margin: 5,
    //     color: '#fff',
    //     backgroundColor: 'var(--main-purple)',
    //     padding: '3px 5px',
    //     borderRadius: 5,
    // }
})

const Tag = glam.div({
    backgroundColor: 'var(--main-purple)',
    borderRadius: 4,
    padding: '3px 5px',
    margin: 3,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    color: '#fff',
    '& .fa-minus-circle':{
        fontSize: '.8em',
        color: 'red',
    },
})



const mapStateToProps = state => {
    return {
      user: state.user
    }
  }


export default withRouter(connect(mapStateToProps)(CreateProject));
