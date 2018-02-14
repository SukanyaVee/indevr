import React, { Component } from 'react'
import SearchBar from './SearchBar'
import logo from "../assets/in_DEV_rwhite.png"
import glam from 'glamorous'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class SearchPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        setTimeout(() => {
        this.props.results ? this.setState({
            data: this.props.results 
        }) : null;
            console.log(this.state.data)
        }, 1000)
    }
    

    render() {
        return (
            <div>
                <Header>
                    <img src={logo} alt="" />
                    <SearchBar />
                </Header>
                <Content>
                <Main>
                {this.state.data ? this.state.data.map(user => {
                    return (
                <User key={user.id}>
                    <Image key={user.id} src={user.picture} alt=''/>
                    <h3>Name:</h3><h1>{user.first_name} {user.last_name}</h1>
                    <h3>UserName:</h3><h1>{user.username}</h1>
                </User>
                    )
                }) : null}
                
                </Main>
                <Aside>
                <Links> Search By: </Links>
                <Links> <Link to='search/projects'>Projects</Link> </Links>
                <Links> <Link to='search/skills'>Skills</Link> </Links>
                <Links> <Link to='search/stacks'>Stacks</Link> </Links>
                </Aside>
                </Content>
                
            </div>
        )
    }
}



const Header = glam.header({
    height: "100",
    width: "100vw",
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "0"
  });

const Content = glam.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
})

const Main = glam.section({
    width: '80%',
    height: '100%',
    border: 'solid black 2px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 100,
})

const Image = glam.img({
    height: 100,
    width: 100,
})

const Aside = glam.aside({
    backgroundColor: 'var(--main-grey)',
    border: 'solid black 2px',
    width: '20%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
})

const Links = glam.span({
    color: 'var(--main-purple)',
    margin: 20,
})

const User = glam.div({
    width: '75%',
    border: 'solid black 2px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
})

function mapStateToProps(state){
    const {results} = state
    return {
        results
    }
}

export default connect(mapStateToProps)(SearchPage);
