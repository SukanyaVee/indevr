import React from 'react';
import glam from 'glamorous';

const ProjectTile = props => {
    return (
        <Main>
            <h3>{props.title}</h3>
            <p>{props.desc}</p>
        </Main>
    );
}

export default ProjectTile;

const Main = glam.div({
    border: '1px solid #ddd',
    padding: 20,
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    '> h3':{
        fontWeight: 'bold',
        marginTop: 0,
    }
})
