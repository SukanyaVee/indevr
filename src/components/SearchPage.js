import React, { Component } from "react";
import SearchBar from "./SearchBar";
import logo from "../assets/in_DEV_rwhite.png";
import glam from "glamorous";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false
    };
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
          {this.state.data && (
            <Main>
              <User>
                {this.state.data && (
                  <Span>
                    <h1>Users:</h1>
                  </Span>
                )}
                {this.props.results
                  ? this.props.results.map(user => {
                      return (
                        <div key={user.id}>
                          <Image key={user.id} src={user.picture} alt="" />
                          <h3>Name:</h3>
                          <h1>
                            {user.first_name} {user.last_name}
                          </h1>
                          <h3>UserName:</h3>
                          <h1>{user.username}</h1>
                        </div>
                      );
                    })
                  : () => {
                      return <div> No user results available </div>;
                    }}
              </User>

              <Projects>
                {this.state.data && (
                  <Span>
                    <h1>Projects:</h1>
                  </Span>
                )}
                {this.props.projects
                  ? this.props.projects.map(project => {
                      return (
                        <div key={project.id}>
                          <h3>Project Name:</h3>
                          <h1>{project.project_name}</h1>
                        </div>
                      );
                    })
                  : () => {
                      return <div> No project results available :(</div>;
                    }}
              </Projects>
              <Posts>
                {this.state.data && (
                  <Span>
                    <h1>Posts:</h1>
                  </Span>
                )}
                {this.props.posts
                  ? this.props.posts.map(post => {
                      return (
                        <div key={post.id}>
                          <h3>Post:</h3>
                          <h1>{post.content}</h1>
                        </div>
                      );
                    })
                  : () => {
                      return <div> No post results available :(</div>;
                    }}
              </Posts>
            </Main>
          )}
          {/* <Aside>
                <Links> Search By: </Links>
                <Links> <Link to='search/projects'>Projects</Link> </Links>
                <Links> <Link to='search/skills'>Skills</Link> </Links>
                <Links> <Link to='search/stacks'>Stacks</Link> </Links>
                </Aside> */}
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
  height: 100,
  width: 100
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
  border: "solid black 2px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: 'white'
});

const Projects = glam.div({
  width: "75%",
  border: "solid black 2px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
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
  float: "left",
  position: "absolute",
  left: 180
});

function mapStateToProps(state) {
  const { results, projects, posts } = state;
  return {
    results,
    projects,
    posts
  };
}

export default connect(mapStateToProps)(SearchPage);
