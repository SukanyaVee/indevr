import React, { Component } from "react";
import SearchBar from "./SearchBar";
import logo from "../assets/in_DEV_rwhite.png";
import glam from "glamorous";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import UserTile from "./UserTile";
// import ProjectTile from "./ProjectTile";
import PostTile from "./PostTile";
import ConnectButton from "./ConnectButton";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
      results: [],
      projects: [],
      posts: []
    };
    this.getSearch = this.getSearch.bind(this);
  }

  componentDidMount() {
    this.getSearch();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: false,
      results: [],
      projects: [],
      posts: []
    });
    if (nextProps !== this.props){
      setTimeout(() => {
        this.getSearch();
      }, 100)
    }
  }

  getSearch(){
    console.log(this.props);
    let { term } = this.props;
    if (term === undefined) {
      term = this.props.location.pathname.substr(
        this.props.location.pathname.lastIndexOf("/") + 1
      );
    }
    axios.get(`/search/${term}`).then(response => {
      this.setState({
        results: response.data,
        data: true
      });
      console.log(this.state);
    });
    axios.get(`/search/projects/${term}`).then(response => {
      let pro = response.data.filter(elem => {
        if (elem.public === true) {
          return elem;
        }
        return null;
      });
      this.setState({
        projects: pro
      });
    });
    axios.get(`/search/posts/${term}`).then(response => {
      this.setState({
        posts: response.data
      });
    });
  }

  render() {
    return (
      <div style={{ backgroundColor: "var(--main-grey)", height: "100vh" }}>
        <Header>
          <img src={logo} alt="" />
          <SearchBar />
        </Header>

        <Content>
          {this.state.data && (
            <Main>
              <Span>
                <Title>Users</Title>
              </Span>
              <UserWrap>
                {this.state.results
                  ? this.state.results.map(user => {
                      return (
                        <Link to={`/dev/${user.id}`} key={user.id}>
                          <UserTile
                            key={user.id}
                            name={user.first_name + " " + user.last_name}
                            // name={user.username}
                            img={user.picture}
                          >
                            <div>
                              <ConnectButton />
                            </div>
                          </UserTile>
                        </Link>
                      );
                    })
                  : () => {
                      return <div> No user results available </div>;
                    }}
              </UserWrap>

              <Span>
                <Title>Projects</Title>
              </Span>

              <ProjWrap>
                {this.state.projects
                  ? this.state.projects.map(project => {
                      return (
                        <Projects key={project.id}>
                          <div>{project.project_name}</div>
                          <div>{project.description}</div>
                          {/* <ProjectTile
                        key={project.id}
                        title={project.project_name}
                        desc={project.description}
                        >
                        </ProjectTile> */}
                        </Projects>
                      );
                    })
                  : () => {
                      return <div> No project results available :(</div>;
                    }}
              </ProjWrap>

              <Span>
                <Title>Posts</Title>
              </Span>

              <PostsWrapper>
                {this.state.posts
                  ? this.state.posts.map((post, i) => {
                      return (
                        <PostTile
                          key={i}
                          id={post.id}
                          name={post.first_name + " " + post.last_name}
                          user_id={post.user_id}
                          content={post.content}
                          timestamp={post.created_at}
                        />
                      );
                    })
                  : () => {
                      return <div> No project results available :(</div>;
                    }}
              </PostsWrapper>
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
  backgroundColor: "var(--main-grey)"
});

// const Div = glam.div({
//   hieght: "100%",
//   width: "100%",
//   // border: 'solid black 2pt',
//   display: "flex",
//   flexDirection: "row",
//   alignItems: "flex-end",
//   margin: 0
// });

// const Column = glam.div({
//   display: "flex",
//   flexDirection: "Column",
//   alignItems: "flex-end",
//   height: 200,
//   width: "100%",
//   marginTop: 10
// });
const UserWrap = glam.div({
  display: "flex",
  // gridGap: 20,
  // gridTemplateColumns: 'repeat(auto-fill, 170px)',
  flexDirection: "row",
  justifyContent: "center",
  flexWrap: "wrap",
  marginBottom: 20,
  "> div": {
    margin: 50
  }
});

const ProjWrap = glam.div({
  width: "75%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  flexWrap: "wrap",
  marginBottom: 20,
  // paddingTop: 15,
  // paddingBottom: 65,
  borderRadius: 5,
  // backgroundColor: "var(--main-grey)",
  "> div": {
    marginLeft: 20
  }
});

const PostsWrapper = glam.div({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  // margin: 50,
  "> div": {
    margin: 20
  }
});

const Title = glam.h1({
  margin: 5
});

const Main = glam.section({
  width: "100%",
  minHeight: "100%",
  border: "solid black 2px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 100,
  backgroundColor: "var(--main-purple)",
  overflow: 'contain',
});

// const Image = glam.img({
//   marginTop: 0,
//   marginLeft: 0,
//   height: 200,
//   width: "20%",
//   border: "solid black 2pt"
// });

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

// const User = glam.div({
//   width: "75%",
//   height: 200,
//   border: "solid black 2px",
//   display: "flex",
//   flexDirection: "row",
//   justifyContent: "space-between",
//   //   alignItems: "center",
//   backgroundColor: "white"
// });

const Projects = glam.div({
  width: "40%",
  height: '100%',
  marginTop: 20,
  border: "solid black 2px",
  borderRadius: 3,
  // display: "flex",
  // flexDirection: "column",
  // flexWrap: "wrap",
  // justifyContent: "space-around",
  // alignItems: "center",
  fontSize: "16pt",
  backgroundColor: "white",
  '> div:first-of-type': {
    fontSize: '24pt',
  }
});

const Span = glam.span({
  color: "var(--main-purple)",
  backgroundColor: "white",
  position: "relative",
  height: "5%",
  // width: '10%',
  textAlign: "center",
  margin: 20,
  // top: 0,
  // right: 0,
  border: "solid var(--main-grey) 2pt",
  borderRadius: 3
});

function mapStateToProps(state) {
  const { term } = state;
  return {
    term
  };
}

export default connect(mapStateToProps)(SearchPage);
