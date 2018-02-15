import React, { Component } from "react";
import SearchBar from "./SearchBar";
import logo from "../assets/in_DEV_rwhite.png";
import glam from "glamorous";
import { connect } from "react-redux";
import axios from 'axios';
import { Link } from "react-router-dom";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
      results: [],
      projects: [],
      posts: [],
    };
  }

  componentDidMount(){
      console.log(this.props)
        const {term} = this.props
        axios.get(`/search/${term}`).then(response => {
                this.setState({
                    results: response.data,
                    data: true,
                })
                console.log(this.state)
        });
        axios.get(`/search/projects/${term}`).then(response => {
            let pro = response.data.filter(elem => {
                if(elem.public === true){
                    return elem
                }
                return null;
            })
            this.setState({
                projects: response.data
            })
        });
        axios.get(`/search/posts/${term}`).then(response => {
            this.setState({
                posts: response.data
            })
        })
        console.log('Bar props', this.props)
        // this.state.searchResults ? this.props.history.push(`/search`) : null
    }
  

  componentWillReceiveProps(nextProps) {
   if( nextProps.results || nextProps.projects )
      this.setState({
          data: true
        })
    
  }

  render() {
    return (
      <div style={{backgroundColor: 'var(--main-grey)', height: '100vh'}}>
        <Header>
          <img src={logo} alt="" />
          <SearchBar />
        </Header>

        <Content>
          {/* {this.state.data && ( */}
            <Main>
            <Span><Title>Users</Title></Span>
              <User>
                {this.state.results
                  ? this.state.results.map(user => {
                      return (
                        <Div key={user.id}>
                        <Image key={user.id} src={user.picture} alt="" />
                          <Column>
                          <h1>{user.first_name} {user.last_name}</h1>
                          <h1>{user.username}</h1>
                          <Link to='/profile'>Profile Page</Link>
                          </Column>
                        </Div>
                      );
                    })
                  : () => {
                      return <div> No user results available </div>;
                    }}
              </User>

                  <Span><Title>Projects:</Title></Span>
               <Projects>
                {this.state.projects
                  ? this.state.projects.map(project => {
                      return (
                        <Div key={project.id}>
                        <Column>
                          <h1>{project.project_name}</h1>
                          <p>{project.description}</p>
                          <link href={project.repo} value='Git Hub Repository'/>
                        </Column>
                        </Div>
                      );
                    })
                  : () => {
                      return <div> No project results available :(</div>;
                    }}
              </Projects>
              {/*<Posts>
                {this.state.posts
                  ? this.state.posts.map(post => {
                      return (
                          <div key={post.id}>
                          <Span>
                            <h1>Posts:</h1>
                          </Span>
                          <h3>Post:</h3>
                          <h1>{post.content}</h1>
                        </div>
                      );
                    })
                  : () => {
                      return <div> No post results available :(</div>;
                    }}
              </Posts> */}
            </Main>
          )}
        
        </Content>
      </div>
    );
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
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  height: "100%",
  backgroundColor: 'var(--main-grey)',
});

const Div = glam.div({
  hieght: '100%',
  width: '100%',
  // border: 'solid black 2pt',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  margin: 0,
})

const Column = glam.div({
  display: "flex",
  flexDirection: "Column",
  alignItems: "flex-end",
  height: 200,
  width: '100%',
  marginTop: 10,
})
// const Row2 = glam.div({
//   display: "flex",
//   flexDirection: "row",
//   justifyContent: 'space-around',
//   alignItems: "center",
//   width: '50%',
// })

const Title = glam.h1({
    margin: 5,

})

const Main = glam.section({
  width: "100%",
  height: "100%",
  border: "solid black 2px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 100,
  backgroundColor: 'var(--main-purple)'
});

const Image = glam.img({
  marginTop: 0,
  marginLeft: 0,
  height: 200,
  width: '20%',
  border: 'solid black 2pt',
});

// const Aside = glam.aside({
//     backgroundColor: 'var(--main-grey)',
//     border: 'solid black 2px',
//     width: '20%',
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
// })

// const Links = glam.span({
//     color: 'var(--main-purple)',
//     margin: 20,
// })

const User = glam.div({
  width: "75%",
  height: 200,
  border: "solid black 2px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
//   alignItems: "center",
  backgroundColor: 'white'
});

const Projects = glam.div({
  width: "75%",
  border: "solid black 2px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: 'white'
});

const Posts = glam.div({
  width: "75%",
  border: "solid black 2px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: 'white'
});

const Span = glam.span({
  color: 'white',
  position: "relative",
  height: '5%',
  // width: '10%',
  textAlign: 'center',
  margin: 10,
  // top: 0,
  // right: 0,
  border: 'solid black 2pt',
});

function mapStateToProps(state) {
  const { term } = state;
  return {
    term
  };
}

export default connect(mapStateToProps)(SearchPage);
