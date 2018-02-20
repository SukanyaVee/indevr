import React, {Component}  from 'react';
import {Link} from 'react-router-dom';
import glam from 'glamorous';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
// import {connect} from 'react-redux';

import profpic from '../assets/prof-pic.png';

class  Overview extends Component  {
    constructor(props){
        super(props)
        this.state={
            projectId: this.props.match.params.id,
            contributors: [],
            project: [],
            skills:[],
            editShow: false,
            newTitle: '',
            newDescr: '',
            newRepo: ''
        }
    }

    componentDidMount(){
        axios.get(`/indevr/projects/${this.state.projectId}`).then(res=>{
            this.setState({project: res.data[0]})
            // console.log('single project', res.data[0])
            this.setState({newDescr: this.state.project.description, newTitle: this.state.project.project_name, newRepo: this.state.project.repo})
        }).catch(error=>console.log(error))
        axios.get(`/indevr/skills/${this.state.projectId}`).then(res=>{
            this.setState({skills: res.data})
            // console.log('skill stack', this.state.skills)
        }).catch(error=>console.log(error))
        axios.get(`/indevr/contributors?projectId=${this.state.projectId}`).then(res=>{
            this.setState({contributors: res.data})
            // console.log('contributors', this.state.contributors)
        }).catch(error=>console.log(error))
    }

    removeContributor = (contributorId) => {
        console.log('contributor record id', contributorId)
        axios.delete(`/indevr/contributors/${contributorId}`).then(resp=>{
            this.setState(prevState=>{
                return {posts: prevState.posts.filter((e, i) => this.state.contributor.id !== contributorId)}
            })
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

    render( ) {
        var inline={marginLeft:'5px', cursor:'pointer'}
        return (
            <ProjectOverview>
                <ProjectTitle>
                    {this.state.project.project_name}
                    {this.state.project.user_id===1 && //HARDCODED user id from req,session or redux
                    <div><Edit id="remove" onClick={e=>{this.setState({editShow: true})}}>edit details</Edit><Edit onClick={e=>{this.deleteProj()}}>delete</Edit></div>}
                </ProjectTitle>
                    {this.state.editShow===true &&
                    <Input placeholder="New Title"  value={this.state.newTitle} onChange={e=>{this.setState({newTitle: e.target.value})}}/>}
                <ProjectDescription>
                    {this.state.project.description}<br/>
                    {this.state.editShow===true &&
                    <Input placeholder="Edit Description" value={this.state.newDescr} onChange={e=>{this.setState({newDescr: e.target.value})}}/>}<br/>
                    {this.state.project.repo}<br/>
                    {this.state.editShow===true &&
                    <Input placeholder="Edit Repo" value={this.state.newRepo} onChange={e=>{this.setState({newRepo: e.target.value})}}/>}<br/>
                </ProjectDescription>

                {this.state.editShow===true &&
                    <div><button onClick={e=>{this.editTitleDescr(this.state.newTitle, this.state.newDescr, this.state.newRepo)}}>Submit</button>
                    <Edit style={inline} onClick={e=>{this.setState({editShow: false})}}>close</Edit></div>}
                <br/>

                <ProjectCollaborators>
                    <h4>Contributors</h4>
                    {this.state.contributors.map(contributor =>
                    <div key={contributor.id}>
                        <Link to={`/dev/${contributor.id}`}>
                            <img src={contributor.picture||profpic} alt="contributor"/>
                            {contributor.first_name} {contributor.last_name}
                        </Link>
                        {this.state.project.user_id===1 && //HARDCODED user id from req,session
                        <span id="remove" onClick={e=>{this.removeContributor(contributor.contributor_id)}}>remove</span>}
                        {contributor.id===1 && //HARDCODED user id from req,session
                        <span id="remove" onClick={e=>{this.removeContributor(contributor.contributor_id)}}>leave</span>}
                    </div>)}
                </ProjectCollaborators>

                <ProjectSkills>
                    <h4>Skill Stack</h4>
                    {this.state.skills.map(skill => <div key={skill.id}>{skill.skill} - {skill.level===1?'Worthy Warrior':skill.level===2?'Noble Ninja':'Supreme Samurai'}
                    {/* <span id="remove">edit</span> */}
                    </div>)}
                </ProjectSkills>
            </ProjectOverview>
        );
    }
}
const ProjectOverview = glam.div ({
    padding: 10,
    fontSize: 14,
    minWidth: 400
})

const ProjectTitle = glam.div ({
    fontSize: '3em',
    // marginBottom: 10,
    '& span': {
        fontSize: 10,
        cursor: 'pointer',
        marginLeft: 5
    }

    // borderTop: '3px solid #593c8f'
})

const ProjectDescription = glam.div ({
    // marginBottom: 10,
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
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
    '& div': {
        padding: 10,
        background: '#eeeeee',
        margin: 5,
    },
    '& img': {
        width: 30,
        height: 30,
        borderRadius: '50%'
    },
    '& span': {
        fontSize: 10,
        cursor: 'pointer',
        marginLeft: 5
    },
    '@media (max-width: 500px)': {
        maxWidth: 300,
    }
})
const ProjectSkills = glam.div ({
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
    '& div': {
        borderRadius: 3,
        background: 'var(--main-purple)',
        margin: 5,
        padding:5,
        color: 'white'
    },
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


export default withRouter(Overview);
