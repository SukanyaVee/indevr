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
        }, 500)
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
                <Data key={user.id}>
                    <img key={user.id} src={user.picture} alt=''/><br/>
                    <h1>{user.first_name} {user.last_name}</h1>
                    <h1>{user.username}</h1>
                </Data>
                    )
                }) : null}
                </Main>
                <Aside>
                    <Link to='search/projects'>Projects</Link>
                    <Link to='search/skills'>Skills</Link>
                    <Link to='search/stacks'>Stacks</Link>
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
})

const Aside = glam.aside({
    backgroundColor: 'var --main-grey'
})

const Data = glam.div({
    // alignItems: 'center',
})

function mapStateToProps(state){
    const {results} = state
    return {
        results
    }
}

export default connect(mapStateToProps)(SearchPage);
