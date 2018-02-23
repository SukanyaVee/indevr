import React, {Component} from 'react';
import glam from 'glamorous';
import {Link} from 'react-router-dom';

class PostTile extends Component {
    render(){
        return (
            <Main>
                <Header>
                    <Link to={`/dev/${this.props.user_id}`}>
                        <img src={this.props.picture} alt="" /> &nbsp;
                        <div>
                            <strong>{this.props.name}</strong><br/>
                            <sub>{new Date(this.props.timestamp).toLocaleDateString("en-us", { hour: 'numeric', minute: 'numeric', timeZone: "America/Los_Angeles" })}</sub>
                        </div>
                    </Link>
                </Header>
                <Content>
                    <div>
                        {this.props.content}
                    </div>
                </Content>
            </Main>
        );
    }
}

export default PostTile;

const Main = glam.div({
    backgroundColor: 'var(--main-grey)',
    width: 300,
    height: 300,
    padding: 10,
    borderRadius: 3,
    boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.75)',
})

const Header = glam.div({
    backgroundColor: 'var(--main-purple)',
    color: '#fff',

    padding: 10,
    '> a':{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        color: 'inherit',
        textDecoration: 'none'
    },
    '& div':{
        paddingLeft: 10
    },
    '& img':{
        height: 50,
        width: 50
    }
})

const Content = glam.div({
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    textAlign: 'center'
})
