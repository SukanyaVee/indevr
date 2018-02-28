import React, { Component } from "react";
import glam from "glamorous";
import { css } from 'glamor';
import Tasks from "./landing-page-assets/taskboard/tasks";
import Profile from './landing-page-assets/profile/profile';
import Project from './landing-page-assets/projectview/project';
import keys from './landing-page-assets/keys.png';


class LandingPage extends Component {

  render() {
    return (
      <div>
          <Main>
            <Heading >
              <strong>
                Made By Developers - <i>For Developers</i>
              </strong>
              <br />
              <br />
              <Desc className='text'>
                <strong>
                  <i>inDevr</i>
                </strong>{" "}
                is a project application designed to help you and
                your team of connections <strong>accomplish </strong>your development goals.
                From internal communication and access to project multi-tools, we've got it.
                Welcome to your one-stop-shop developer platform.
              </Desc>
            </Heading>
          </Main>
        <Project />
        <Profile />
        <Tasks />
      </div>
    );
  }
}


const bounce = css.keyframes({
  '0%': {transform: `scale(1.3)`},
  '100%': {transform: `scale(1.0)`}
})

const Desc = glam.p({
  textAlign: 'center',
  width: "100%",
  "hover & .text": {
    color: 'black'
},
  '@media (max-width: 729px)': {
    textAlign: 'center',
    width: '100%',
  }
});

const Heading = glam.h1({
  fontSize: "2.5em",
  width: "75vw",
  padding: 20,
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, .8)',
  borderRadius: '3px',
  animation: `${bounce} 5s ease-in-out alternate`,
  '@media (max-width: 729px)':{
    width: '75vw',
    fontSize: '12pt',
    textAlign: 'center',
}

});

const Main = glam.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "85vh",
  color: 'var(--main-purple)',
  backgroundImage: `url(${keys})`,
  backgroundSize: 'cover',
  '@media (max-width: 729px)': {
      flexDirection: 'column',
  },
});


export default LandingPage;
