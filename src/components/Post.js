import React, {Component} from 'react';
import glam from 'glamorous';

class Post extends Component {
    render(){
        return (
            <Main>
                <Header>
                    <img src="http://via.placeholder.com/50x50" alt="" /> &nbsp;
                    <div>
                        <strong>{this.props.name}</strong><br/>
                        <sub>{this.props.timestamp}</sub>
                    </div>
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

export default Post;

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
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    '> div':{
        paddingLeft: 10
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
