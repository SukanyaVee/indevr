import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import glam from 'glamorous';

class Explorer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            publicProj: []
        }
    }

    componentDidMount(){
    axios.get('/indevr/public?user_id=1').then(res=>{//HARDCODED
        this.setState({publicProj: res.data})
        console.log('public projects', this.state.projects)
    }).catch(error=>console.log(error))
    }

    render() {
        return (
            <div>
                {this.state.publicProj.map(proj => <ProjectItem key={`others${proj.id}`}><Link to={`/project/${proj.project_id}`}> <h2>{proj.project_name}</h2> </Link><div>{proj.description}</div></ProjectItem> )}
            </div>
        )
    }
}

const ProjectItem = glam.div ({
    cursor: 'pointer',
    background: '#eeeeee',
    margin: 2,
    '& a': {
        textDecoration: 'none'
    }
})

export default Explorer;
