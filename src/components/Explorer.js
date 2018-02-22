import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import glam from 'glamorous';
import _ from 'lodash';
import ProjectTile from './ProjectTile';

class Explorer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            publicProj: []
        }
    }

    componentDidMount(){
    axios.get('/indevr/public?user_id=1').then(res=>{//HARDCODED
        const projects = _.uniqBy(res.data, 'project_id');
        projects.forEach(project => {
            project.skills = [];
            res.data.forEach(skill => {
                if (skill.project_id === project.project_id){
                    project.skills.push(skill.skill);
                }
            })
        })
        this.setState({ publicProj: projects })
    }).catch(error=>console.log(error))
    }

    render() {
        return (
            <Main>
                <div className="container">
                    {this.state.publicProj.map((project,i) => {
                        return (
                            <Link to={`project/${project.project_id}`} key={i}>
                                <ProjectTile
                                    title={project.project_name}
                                    skills={project.skills}
                                    desc={project.description} />
                            </Link>
                        )
                    })}
                </div>
            </Main>
        )
    }
}

const Main = glam.div({
    minHeight: 'calc(100vh - 230px)',
    backgroundColor: 'var(--main-grey)',
    '& a':{
        color: 'inherit',
        textDecoration: 'none'
    }
})


export default Explorer;
