import React from 'react';
import glam from 'glamorous';

const ProjectTile = props => {
    const skills = props.skills ? props.skills.map((skill,i) =>{
        return <Tag key={i}>{skill}</Tag>
    }) : '';
    return (
        <Main>
            <TitleRow>
                <h3>{props.title}</h3>
                <div>
                    {skills}
                </div>
            </TitleRow>
            <p>{props.desc}</p>

        </Main>
    );
}

export default ProjectTile;

const Main = glam.div({
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    display: 'flex',
    flexDirection: 'column',

})

const TitleRow = glam.div({
    '& h3':{
        fontWeight: 'bold',
        marginTop: 0,
        marginRight: 30
    },
    display: 'flex',
    justifyContent: 'space-between',
    '> div':{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end'
    }
})

const Tag = glam.div({
    backgroundColor: 'var(--main-purple)',
    borderRadius: 4,
    padding: '3px 5px',
    margin: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff'
})
