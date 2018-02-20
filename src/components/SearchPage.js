import React, { Component } from "react";
import SearchBar from "./SearchBar";
import logo from "../assets/LogoMain.png";
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
      posts: [],
      skills: [],
      stacks: [],
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
    // console.log(this.props);
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
      // console.log(this.state);
    });
    axios.get(`/search/projects/${term}`).then(res => {
        let { proj, skills } = res.data;
        // console.log(proj , skills)

        let pro = proj.filter(elem => {
        if (elem.public === true) {
          return elem
        }
        return null;
      });
      pro.forEach(project => {
        skills[0].forEach(skill => {
          if(skill.project_id === project.project_id){
            project.skills.push(skill.skill)
          }
        })
      })
      this.setState({
        projects: pro
      });
    });
    axios.get(`/search/posts/${term}`).then(response => {
      this.setState({
        posts: response.data
      });
    });
    axios.get(`/search/skills/${term}`).then(response => {
      this.setState({
        skills: response.data
      })
    })
  }

  render() {
    return (
      <div style={{ backgroundColor: "var(--main-grey)", height: "100vh" }}>

          {this.state.data && (
            <Main>
          {this.state.results.length ?
              <Span>
                <Title>Users</Title>
              </Span> : null}
              <UserWrap>
                {this.state.results
                  ? this.state.results.map(user => {
                      return (
                        <Link to={`/dev/${user.id}`} key={user.id}>
                          <UserTile
                            key={user.id}
                            name={user.first_name + " " + user.last_name}
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
{this.state.projects.length ?
              <Span>
                <Title id='projects'>Projects</Title>
              </Span> : null}

              <ProjWrap>
                {this.state.projects
                  ? this.state.projects.map(project => {
                      return (
                        <Projects key={project.project_id}>
                          <div>{project.project_name}</div>
                          <div>{project.description}</div>
                          <Skill>
                         { project.skills.map((elem, i) => {
                          return <Ill key={i}>{elem}</Ill>
                          })}
                          </Skill>
                          <div><Link to={`/project/${project.id}`}>Project Page</Link></div>
                        </Projects>
                      );
                    })
                  : null}
              </ProjWrap>
              {this.state.posts.length ?
              <Span>
                <Title>Posts</Title>
              </Span> : null}

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
                      return <div> No project results available </div>;
                    }}
              </PostsWrapper>
              {this.state.skills.length ?
              <Span>
                <Title>Skills</Title>
              </Span> : null}

              <SkillsWrap>
                {this.state.skills
                  ? this.state.skills.map((skill, i) => {
                    return (
                      <SkillTile
                        key={i}>
                        <h1>{skill.skill}</h1>
                      </SkillTile>
                    )
                  })
                : () => {
                  return <div> No project results available </div>
                }}
              </SkillsWrap>
            </Main>
          )}
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

// const SearchNav = glam.div({
//   height: 50,
//   width: '100%',
//   backgroundColor: 'var(--main-grey)',
// })

const UserWrap = glam.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  flexWrap: "wrap",
  marginBottom: 20,
  "> div": {
    marginLeft: 20
  }
});

const Skill = glam.span({
  display: 'flex',
  flexDirection: 'row',

})

const Ill = glam.div({
  marginLeft: 10,
})

const ProjWrap = glam.div({
  width: "75%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  flexWrap: "wrap",
  marginBottom: 20,
  borderRadius: 5,
  "> div": {
    marginRight: 20
  }
});

const PostsWrapper = glam.div({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  "> div": {
    margin: 20
  }
});

const SkillsWrap = glam.div({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  "> div": {
    margin: 20
  }
});

const SkillTile = glam.div({
  color: 'white',
})

const Title = glam.h1({
  margin: 5
});

const Main = glam.section({
  width: "100%",
  minHeight: "100vh",
  border: "solid black 2px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // marginTop: 100,
  backgroundColor: "var(--main-purple)",
  overflow: 'contain',
});

const Projects = glam.div({
  width: "45%",
  height: '100%',
  marginTop: 20,
  border: "solid black 2px",
  borderRadius: 3,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  fontSize: "16pt",
  backgroundColor: "white",
  '> div': {
    marginLeft: 10,
  },
  '> div:first-of-type': {
    fontSize: '24pt',
  }
});

const Span = glam.span({
  color: "var(--main-purple)",
  backgroundColor: "white",
  position: "relative",
  height: "5%",
  textAlign: "center",
  margin: 20,
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
