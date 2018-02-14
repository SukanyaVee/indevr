import React, {Component}  from 'react';
import axios from 'axios';
import {Link,  Route} from 'react-router-dom';
import glam from 'glamorous';


class Overview extends Component {
    constructor(props){
        super(props)
        this.state={
            projectId: 1,
            project: {},
            projectCons: [],
            skills: []
        }
    }

    componentDidMount(){
        console.log(this.state.projectId);
        axios.get(`/indevr/projects/${this.state.projectId}`).then(res=>{
            this.setState({project: res.data[0]})
            console.log(res.data)
        }).catch(error=>console.log(error))        
        axios.get(`/indevr/projects/skills/${this.state.projectId}`).then(res=>{
            this.setState({skills: res.data})
            console.log(this.state.skills)
        }).catch(error=>console.log(error))        
        axios.get(`/indevr/contributors?projectId=${this.state.projectId}`).then(res=>{
            this.setState({projectCons: res.data})
            console.log(this.state.projectCons)
        }).catch(error=>console.log(error))        
    }



    render(){
        return (
            <ProjectOverview>
                <ProjectTitle>
                    {this.state.project.project_name} 
                </ProjectTitle>
                <ProjectDescription>
                    {this.state.project.description} 
                </ProjectDescription>
                <ProjectCollaborators>
                    Contributors<br/>
                    {this.state.projectCons.map(contributor => <div key={contributor.id}><Link to={`/project/${contributor.id}`}> <img src={contributor.picture}/> {contributor.first_name} {contributor.last_name}</Link></div>)}
                    </ProjectCollaborators>
                <ProjectSkills>
                    Skill Stack<br/>
                    {this.state.skills.map(skill => <div key={skill.id}>{skill.skill} - {skill.level==1?'Shadow Warrior':skill.level==2?'Wannabe Ninja':'Samurai'}</div>)}
                </ProjectSkills>
            </ProjectOverview>
        );
    }
}

const ProjectOverview = glam.div ({
    padding: 50,
    fontSize: 16
})

const ProjectTitle = glam.div ({
    fontSize: '3em',
    marginBottom: 10,
    borderLeft: '3px solid #593c8f'
})

const ProjectDescription = glam.div ({
    marginBottom: 10,
    fontStyle: 'oblique',
    borderLeft: '3px solid #593c8f'
})
const ProjectCollaborators = glam.div ({
    marginBottom: 10,
    borderLeft: '3px solid #593c8f',
    '& div': {
        padding: 10,
        background: '#eeeeee'
    },
    '& img': {
        width: 30,
        height: 30,
        borderRadius: '50%'
    }
})
const ProjectSkills = glam.div ({
    marginBottom: 10,
    borderLeft: '3px solid #593c8f'
})

export default Overview