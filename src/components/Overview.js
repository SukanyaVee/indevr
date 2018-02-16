import React  from 'react';
// import axios from 'axios';
import {Link} from 'react-router-dom';
import glam from 'glamorous';


function Overview(props) {
        return (
            <ProjectOverview>
                <ProjectTitle>
                    {props.project.project_name}
                </ProjectTitle>
                <ProjectDescription>
                    {props.project.description}
                </ProjectDescription>
                <ProjectCollaborators>
                    <h4>Contributors</h4>
                    {props.projectCons.map(contributor => <div key={contributor.id}><Link to={`/project/${contributor.id}`}> <img src={contributor.picture} alt=""/> {contributor.first_name} {contributor.last_name}</Link></div>)}
                    </ProjectCollaborators>
                <ProjectSkills>
                    <h4>Skill Stack</h4>
                    {props.skills.map(skill => <div key={skill.id}>{skill.skill} - {skill.level===1?'Worthy Warrior':skill.level===2?'Noble Ninja':'Supreme Samurai'}</div>)}
                </ProjectSkills>
            </ProjectOverview>
        );
    }


const ProjectOverview = glam.div ({
    padding: 10,
    fontSize: 16
})

const ProjectTitle = glam.div ({
    fontSize: '3em',
    marginBottom: 10,
    // borderTop: '3px solid #593c8f'
})

const ProjectDescription = glam.div ({
    marginBottom: 10,
    fontStyle: 'oblique',
    // borderTop: '3px solid #593c8f'
})
const ProjectCollaborators = glam.div ({
    marginBottom: 10,
    padding: 12,
    borderLeft: '3px solid #593c8f',
    borderRight: '3px solid #593c8f',
    borderRadius: 10,
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
    padding: 12,
    borderLeft: '3px solid #593c8f',
    borderRight: '3px solid #593c8f',
    borderRadius: 10
})

export default Overview
