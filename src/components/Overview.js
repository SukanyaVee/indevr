import React, {Component}  from 'react';
import {Link} from 'react-router-dom';
import glam from 'glamorous';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import 
// import profpic from '../assets/prof-pic.png';

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
            newDescr: ''
        }
    }

    componentDidMount(){
        axios.get(`/indevr/projects/${this.state.projectId}`).then(res=>{
            this.setState({project: res.data[0]})
            console.log('single project', res.data[0])
        }).catch(error=>console.log(error))        
        axios.get(`/indevr/skills/${this.state.projectId}`).then(res=>{
            this.setState({skills: res.data})
            // console.log('skill stack', this.state.skills)
        }).catch(error=>console.log(error))
        axios.get(`/indevr/contributors?projectId=${this.state.projectId}`).then(res=>{
            this.setState({contributors: res.data})
            // console.log('contributors', this.state.projectCons)
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

    editTitleDescr(title,description){
        axios.put('indevr/project', {id: this.state.project.id, project_name: title||this.state.project.project_name, description: description||this.state.project.description})
    }

    render( ) {
        {console.log('this.state.project in overview', this.state.project)}
        return (
            <ProjectOverview>
                <ProjectTitle>
                    {this.state.project.project_name}
                    {this.state.project.user_id===1 && //HARDCODED user id from req,session or redux
                    <span id="remove" onClick={e=>{this.setState({editShow: true})}}>edit</span>}
                </ProjectTitle>
                    {this.state.editShow===true && 
                    <Input placeholder="New Title"  value={this.state.newTitle} onChange={e=>{this.setState({newTitle: e.target.value})}}/>}
                <ProjectDescription>
                    {this.state.project.description}
                    {this.state.project.user_id===1 && //HARDCODED user id from req,session
                    <span id="remove" onClick={e=>{this.setState({editShow: !this.state.editShow})}}>edit</span>}
                </ProjectDescription>
                    {this.state.editShow===true && 
                    <Input placeholder="New Title" value={this.state.newDescr} onChange={e=>{this.setState({newDescr: e.target.value})}}/>}
                {this.state.editShow===true && 
                    <button onClick={e=>{this.editTitleDescr(this.state.newTitle, this.state.newDescr)}}>Submit</button>}
                <br/>
                <ProjectCollaborators>
                    <h4>Contributors</h4>
                        {this.state.contributors.map(contributor => 
                        <div key={contributor.id}>
                            <Link to={`/dev/${contributor.id}`}> 
                                <img src={contributor.picture} alt="contributor"/> 
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
    }
})

const Input = glam.input ({
    borderRadius: 5,
    marginBottom: 5
})


export default withRouter(Overview);
