import React, {Component}  from 'react';
import {Link} from 'react-router-dom';
import glam from 'glamorous';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import UserTile from './UserTile';


class  Overview extends Component  {
    constructor(props){
        super(props)
        this.state={
            projectId: this.props.match.params.id,
            contributors: [],
            project: [],
            skills:[],
            editShow: false,
            showReqButton: [],
            newTitle: '',
            newDescr: '',
            newRepo: '',
            newSkill: '',
            newLevel: 1
        }
    }

    componentDidMount(){
        axios.get(`/indevr/projects/${this.state.projectId}`).then(res=>{
            this.setState({project: res.data[0]})
            console.log('single project', res.data[0])
            this.setState({newDescr: this.state.project.description, newTitle: this.state.project.project_name, newRepo: this.state.project.repo})
        }).catch(error=>console.log(error))
        axios.get(`/indevr/skills/${this.state.projectId}`).then(res=>{
            this.setState({skills: res.data})
            // console.log('skill stack', this.state.skills)
        }).catch(error=>console.log(error))
        axios.get(`/indevr/contributors?projectId=${this.state.projectId}`).then(res=>{
            this.setState({contributors: res.data})
            var x=this.state.contributors.filter(e=>
                e.id===this.props.user.id
            )
            console.log(x)
            this.setState({showReqButton: x})
            console.log('showReqButton', this.state.showReqButton)
            // console.log('contributors', this.state.contributors)
        }).catch(error=>console.log(error))
    }

    removeContributor = (contributorId) => {
        console.log('contributor record id', contributorId)
        axios.delete(`/indevr/contributors/${contributorId}`).then(resp=>{
            axios.get(`/indevr/contributors?projectId=${this.state.projectId}`).then(res=>{
                this.setState({contributors: res.data})
                // console.log('contributors', this.state.contributors)
            }).catch(error=>console.log(error))
        }).catch(error=>console.log(error))
    }

    editTitleDescr(title,description, repo){
        var body={id: this.state.project.id, project_name: title||this.state.project.project_name, description: description||this.state.project.description, repo: repo||this.state.project.repo}
        console.log('edit body ',body)
        axios.put('/indevr/projects', body).then(resp=>{
            axios.get(`/indevr/projects/${this.state.projectId}`).then(res=>{
                this.setState({project: res.data[0]})
                this.setState({editShow: false, newTitle: this.state.project.project_name, newDescr: this.state.project.description, newRepo: this.state.project.repo})
                // console.log('single project', res.data[0])
            }).catch(error=>console.log(error))
        }).catch(error=>console.log(error))
    }
    deleteProj() {
        axios.delete(`/indevr/projects/${this.state.projectId}`).then(resp=>{
            this.props.history.push('/dashboard')
        }).catch(error=>console.log(error))
    }

    requestJoin(){
        axios.post('/indevr/messages', {project_id: this.state.project.id, user_id:this.state.project.user_id, contributor_id: this.props.user.id}).then(resp=>{
            this.setState({showReqButton: [1]})
        }).catch(error=>console.log(error))

    }

    createSkill(newSkill,newLevel, e){
        e.preventDefault()
        var x = {project_id: this.state.projectId, skill: newSkill, level: newLevel}
            if(this.state.newSkill !== ''){
                axios.post('/indevr/skills', x).then(resp=>{
                    console.log(resp.data)
                    this.setState({skills: [...this.state.skills, resp.data]})
                }).catch(error=>console.log(error))
                this.setState({newSkill:'',newLevel:1})
            }
    }

    removeSkill(index){
        const id = this.state.skills[index].id;
        const newStack = [...this.state.skills];
        newStack.splice(index, 1);
        axios.delete(`/indevr/skills/${id}`).then(res => {
            this.setState({skills: newStack})
        }).catch(err => console.log(err))
    }

    render( ) {
        var inline={marginLeft:'5px', cursor:'pointer'}
        var inline2={fontSize: 16}
        if(!this.props.user){
            return 'Loading...'
        }

        return (
            <ProjectOverview>
                <ProjectTitle>
                    <div>
                        {this.state.project.project_name}
                        <a href={this.state.project.repo} target="_blank"><i className="far fa-code-branch pull-right"></i></a>
                    </div>
                    {this.state.project.user_id===this.props.user.id &&
                    <div>
                        <Edit onClick={e=>{this.setState({editShow: true})}}>edit details</Edit>
                        <Edit onClick={e=>{this.deleteProj()}}>delete</Edit>
                    </div>}
                    {!this.state.showReqButton.length && <Edit style={inline2} onClick={e=>{this.requestJoin()}}>request to join</Edit>}
                </ProjectTitle>
                    {this.state.editShow===true &&
                    <Input placeholder="New Title"  value={this.state.newTitle} onChange={e=>{this.setState({newTitle: e.target.value})}}/>}
                <ProjectDescription>
                    {this.state.project.description}<br/>
                    {this.state.editShow===true &&
                    <Input placeholder="Edit Description" value={this.state.newDescr} onChange={e=>{this.setState({newDescr: e.target.value})}}/>}<br/>
                    {this.state.editShow===true &&
                    <Input placeholder="Edit Repo" value={this.state.newRepo} onChange={e=>{this.setState({newRepo: e.target.value})}}/>}<br/>
                </ProjectDescription>

                {this.state.editShow===true &&
                    <div><button onClick={e=>{this.editTitleDescr(this.state.newTitle, this.state.newDescr, this.state.newRepo)}}>Submit</button>
                    <Edit style={inline} onClick={e=>{this.setState({editShow: false})}}>close</Edit></div>}
                <br/>
                <hr></hr>
                <h4>Contributors</h4>
                <ProjectCollaborators>
                    {this.state.contributors.map(contributor =>
                    <div key={contributor.id}>
                        <Link to={`/dev/${contributor.id}`}>
                            <UserTile
                                name={contributor.first_name + ' ' + contributor.last_name}
                                img={contributor.picture} />
                        </Link>
                        {this.state.project.user_id===this.props.user.id && !this.state.contributor.owner &&
                        <Edit onClick={e=>{this.removeContributor(contributor.contributor_id)}}>remove</Edit>}
                        {contributor.id===this.props.user.id && !this.state.contributor.owner && 
                        <Edit onClick={e=>{this.removeContributor(contributor.contributor_id)}}>leave</Edit>}
                    </div>)}
                </ProjectCollaborators>
                <hr></hr>
                <h4>Skill Stack</h4>
                <ProjectSkills>
                    {this.state.project.user_id === this.props.user.id &&
                        <Form>
                            <label>Add to your Stack</label>
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
                            <div>
                                <button  className="btn"
                                    onClick={e=>{this.createSkill(this.state.newSkill, this.state.newLevel, e)}}>Add</button>
                            </div>
                        </Form>}
                    <SkillsDisplay>
                        {this.state.project.user_id === this.props.user.id &&
                            this.state.skills.map((skill, i) => {
                                return (
                                    <Tag key={i}>
                                        {skill.skill} - {skill.level}
                                        <div className="delete" onClick={() => this.removeSkill(i)}> &nbsp; <i className="fas fa-minus-circle"></i></div>
                                    </Tag>
                                )
                            })}

                        {this.state.project.user_id !== this.props.user.id &&
                            this.state.skills.map((skill,i) => {
                                return (
                                    <Tag key={i}>
                                        {skill.skill} - {skill.level}
                                    </Tag>
                                )
                            })}
                    </SkillsDisplay>
                </ProjectSkills>
            </ProjectOverview>
        );
    }
}
const ProjectOverview = glam.div ({
    padding: 10,
    fontSize: 14,
    '& h4':{
        fontWeight: 'bold'
    },
})

const ProjectTitle = glam.div ({
    fontSize: '3em',
    fontWeight: 'bold',
    '& span': {
        fontSize: 10,
        cursor: 'pointer',
        marginLeft: 5
    }
})

const ProjectDescription = glam.div ({
    fontStyle: 'oblique',
    '& span':{
        fontSize: 10,
        cursor: 'pointer',
        fontStyle: 'normal',
        marginLeft: 5
    },
    '@media (max-width: 500px)': {
        maxWidth: 300,
    }
})
const ProjectCollaborators = glam.div ({
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
    '> div': {
        margin: 10,
    },
    '& span': {
        fontSize: 10,
        cursor: 'pointer',
        marginLeft: 5,
    },

})
const ProjectSkills = glam.div ({
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'calc(100vw - 210px)',
    '& span': {
        fontSize: 10,
        cursor: 'pointer'
    },
    '@media (max-width: 500px)': {
        maxWidth: 300,
    }
})

const Input = glam.input ({
    borderRadius: 5,
    marginBottom: 5
})

const Edit=glam.span({
    background: 'var(--main-grey)',
    borderRadius: 3,
    padding: 3
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

const Form = glam.form({
    width: '25vw',
    minWidth: 300,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    '> div':{
        width: '100%'
    },
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
    }
})

const SkillsDisplay = glam.div({
    minWidth: 300,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'calc(100% - 25vw - 150px)'
})


const mapStateToProps = state => {
    return {
      user: state.user
    }
  }


export default withRouter(connect(mapStateToProps)(Overview));
