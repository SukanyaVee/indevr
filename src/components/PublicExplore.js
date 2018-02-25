import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import glam from 'glamorous';
import _ from 'lodash';
import ProjectTile from './ProjectTile';
import {connect} from 'react-redux';


class PublicExplore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            publicProj: []
        }
    }

    componentDidMount(){
    axios.get(`/indevr/pubproj`).then(res=>{
        console.log(res.data)
        
        this.setState({ publicProj: res.data })
    }).catch(error=>console.log(error))
    }

    render() {
        return (
            <Main>
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
            </Main>
        )
    }
}

const Main = glam.div({
    minHeight: 'calc(100vh - 230px)',
    backgroundColor: 'var(--main-grey)',
    padding: '20px 0',
    '& a':{
        color: 'inherit',
        textDecoration: 'none'
    }
})


export default PublicExplore;