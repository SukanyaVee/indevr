import React, { Component } from "react";
import glam from "glamorous";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import UserTile from "./UserTile";
import ProjectTile from "./ProjectTile";
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
      <div>

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

              <ProjWrap className="container">
                {this.state.projects ? this.state.projects.map((project,i) => {
                    return (
                        <div>
                            <Link to={`/project/${project.project_id}`}>
                                <ProjectTile
                                    key={i}
                                    title={project.project_name}
                                    desc={project.description}
                                    skills={project.skills}/>
                                </Link>
                        </div>
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
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  flexWrap: "wrap",
  marginBottom: 20,
  borderRadius: 5,
  "> div": {
      width: '80%',
    minWidth: 300,
    maxWidth: '95vw'
  }
});

const PostsWrapper = glam.div({
    width: '100%',
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    '> div':{
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
  minHeight: "100vh",
  border: "solid black 2px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // marginTop: 100,
  backgroundColor: "var(--main-purple)",
  overflow: 'contain',
  '& a':{
      textDecoration: 'none',
      color: 'inherit'
  }
});

// const Projects = glam.div({
//   width: "45%",
//   overflow: 'auto',
//   height: '100%',
//   marginTop: 20,
//   border: "solid black 2px",
//   borderRadius: 3,
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "space-between",
//   fontSize: "16pt",
//   backgroundColor: "white",
//   '> div': {
//     marginLeft: 10,
//   },
//   '> div:first-of-type': {
//     fontSize: '24pt',
//   }
// });

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

const NoSearch = glam.div({
  fontSize: '18pt',
  color: 'white',
})

function mapStateToProps(state) {
  const { term } = state;
  return {
    term
  };
}

export default connect(mapStateToProps)(SearchPage);
