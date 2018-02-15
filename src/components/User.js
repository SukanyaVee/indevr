import React from 'react';
import glam from 'glamorous';

const User = (props) => {
    return (
        <Main>
            <img src={props.img || "http://i.pravatar.cc/150"} alt="profile pic"/>
            <div>{props.name}</div>
        </Main>
    );
}

export default User;

const Main = glam.div({
    backgroundColor: 'var(--main-grey)',
    color: '#fff',
    fontSize: 12,
    width: 170,
    height: 210,
    padding: 10,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    borderRadius: 3,
    boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.75)',
    '> div':{
        backgroundColor: 'var(--main-purple)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: '100%'
    },
    '> img':{
        height: 150,
        width: 150
    }
})
