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
            newRepo: ''
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
            this.setState({showReqButton: []})
        }).catch(error=>console.log(error))

    }

    render( ) {
        var inline={marginLeft:'5px', cursor:'pointer'}
        var inline2={fontSize: 16}
        
        
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
                        {this.state.project.user_id===this.props.user.id &&
                        <Edit onClick={e=>{this.removeContributor(contributor.contributor_id)}}>remove</Edit>}
                        {contributor.id===this.props.user.id &&
                        <Edit onClick={e=>{this.removeContributor(contributor.contributor_id)}}>leave</Edit>}
                    </div>)}
                </ProjectCollaborators>
                <hr></hr>
                <h4>Skill Stack</h4>
                <ProjectSkills>
                    {this.state.skills.map(skill => <div key={skill.id}>{skill.skill} - {skill.level===1?'Worthy Warrior':skill.level===2?'Noble Ninja':'Supreme Samurai'}
                    </div>)}
                </ProjectSkills>
            </ProjectOverview>
        );
    }
}
const ProjectOverview = glam.div ({
    padding: 10,
    fontSize: 14,
    minWidth: 400,
    '& h4':{
        fontWeight: 'bold'
    },
})

const ProjectTitle = glam.div ({
    fontSize: '3em',
    fontWeight: 'bold',
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
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
    // padding: 12,
    // borderRadius: 10,
    '> div': {
        margin: 10
    },
    // '& img': {
    //     width: 30,
    //     height: 30,
    //     borderRadius: '50%'
    // },
    '& span': {
        fontSize: 10,
        cursor: 'pointer',
        marginLeft: 5,
    },
    // '@media (max-width: 500px)': {
    //     maxWidth: 300,
    // }
})
const ProjectSkills = glam.div ({
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
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


const mapStateToProps = state => {
    return {
      user: state.user
    }
  }


export default withRouter(connect(mapStateToProps)(Overview));
