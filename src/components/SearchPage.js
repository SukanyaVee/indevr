import React, { Component } from "react";
import glam from "glamorous";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import UserTile from "./UserTile";
import ProjectTile from "./ProjectTile";
import PostTile from "./PostTile";
import ToggleDisplay from "react-toggle-display";

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
      showPeople: true,
      showProjects: false,
      showPosts: false
      //   showSkills: false
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
    if (nextProps !== this.props) {
      setTimeout(() => {
        this.getSearch();
      }, 100);
    }
  }

  getSearch() {
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
    });
    axios.get(`/search/projects/${term}`).then(res => {
      let { proj, skills } = res.data;

      let pro = proj.filter(elem => {
        if (elem.public === true) {
          return elem;
        }
        return null;
      });
      pro.forEach(project => {
        skills[0].forEach(skill => {
          if (skill.project_id === project.project_id) {
            project.skills.push(skill.skill);
          }
        });
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

  switchTab(tab) {
    document.querySelector(".active").classList.remove("active");
    document.getElementById(tab).classList.add("active");

    this.setState({
      showPeople: tab === "people" ? true : false,
      showProjects: tab === "projects" ? true : false,
      showPosts: tab === "posts" ? true : false
    });
  }

  render() {
    return (
      <Main>
        <div className="container">
          <Nav>
            <div
              id="people"
              className="active"
              onClick={() => this.switchTab("people")}
            >
              People
            </div>
            <div id="projects" onClick={() => this.switchTab("projects")}>
              Projects
            </div>
            <div id="posts" onClick={() => this.switchTab("posts")}>
              Posts
            </div>
          </Nav>

          <ToggleDisplay show={this.state.showPeople}>
            <Users>
              {this.state.results.length ? (
                this.state.results.map((user, i) => {
                  return (
                    <Link to={`/dev/${user.id}`} key={i}>
                      <UserTile
                        name={user.first_name + " " + user.last_name}
                        img={user.picture}
                      />
                    </Link>
                  );
                })
              ) : (
                <div> No user results available </div>
              )}
            </Users>
          </ToggleDisplay>

          <ToggleDisplay show={this.state.showProjects}>
            {this.state.projects.length ? (
              this.state.projects.map((project, i) => {
                return (
                  <div key={i}>
                    <Link to={`/project/${project.project_id}`}>
                      <ProjectTile
                        title={project.project_name}
                        desc={project.description}
                        skills={project.skills}
                      />
                    </Link>
                  </div>
                );
              })
            ) : (
              <div> No project results available </div>
            )}
          </ToggleDisplay>

          <ToggleDisplay show={this.state.showPosts}>
            <Posts>
              {this.state.posts.length ? (
                this.state.posts.map((post, i) => {
                  // console.log(post);
                  return (
                    <Link to={`/dev/${post.user_id}`}>
                      <PostTile
                        key={i}
                        id={post.id}
                        name={post.first_name + " " + post.last_name}
                        picture={post.picture}
                        user_id={post.user_id}
                        content={post.content}
                        timestamp={post.created_at}
                      />
                    </Link>
                  );
                })
              ) : (
                <div> No post results available </div>
              )}
            </Posts>
          </ToggleDisplay>
        </div>
      </Main>
    );
  }
}

// const SkillTile = glam.div({
//   color: "white",
//   backgroundColor: "var(--main-purple)",
//   padding: "3px 8px",
//   borderRadius: 5,
//   margin: 10,
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   "& h1": {
//     margin: 0
//   }
// });

const Main = glam.section({
  minHeight: "calc(100vh - 200px)",
  border: "solid black 2px",
  backgroundColor: "var(--main-purple)",
  overflow: "contain",
  "& a": {
    textDecoration: "none",
    color: "inherit"
  },
  paddingTop: 20,
  "> .container": {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 3,
    minHeight: "calc(100vh - 250px)"
  }
});

function mapStateToProps(state) {
  const { term } = state;
  return {
    term
  };
}

export default connect(mapStateToProps)(SearchPage);

const Nav = glam.div({
  padding: 20,
  marginBottom: 30,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: 300,
  fontSize: 18,
  cursor: "pointer",
  "& .active": {
    borderBottom: "3px solid var(--main-purple)"
  }
});

const Users = glam.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  "> a": {
    margin: 10
  }
});

const Posts = glam.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  "> div": {
    margin: 20
  }
});

// const Skills = glam.div({
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   flexWrap: "wrap"
// });
