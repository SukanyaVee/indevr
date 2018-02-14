import React from 'react';
import glam from 'glamorous';

const ConnectButton = (props) => {
    return (
        <Button color={props.color} className="btn">
            <i className="far fa-arrow-to-right"></i>
            &nbsp; Connect &nbsp;
            <i className="far fa-arrow-to-left"></i>
        </Button>
    )
}

export default ConnectButton;

const colors = {
    purple: 'var(--main-purple)',
    grey: 'var(--main-grey)',
    black: 'var(--main-black)',
};

const Button = glam.button({
    color: '#fff',
    width: 150,
    margin: 5,
    height: 50,
    fontWeight: 700,
    fontSize: 16
},
    props => ({
        backgroundColor: colors[props.color] || colors['purple']
}))
