import React, { Component } from "react";
import { login } from "../ducks/reducer";
import { connect } from "react-redux";
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
            {/* <Btnlogin onClick={this.login}>
              <b>Login/Register</b>
            </Btnlogin> */}
          </Main>
          {/* <Aside>
                <Signup>
                Email:
                <Field placeholder='yours@example.com'/>
                Password:
                <Field placeholder='Your Password'/>
                First Name:
                <Field placeholder='First Name'/>
                Last Name:
                <Field placeholder='Last Name'/>
                <button style={btnlogin}>Sign Up</button>
                </Signup>
            </Aside> */}
        {/* </Initial> */}
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

// const Initial = glam.section({
//   display: "flex",
//   flexDirection: "row",
//   backgroundColor: "#593c8f",
//   backgroundBlendMode: 10,
//   color: "white"
// });

const Desc = glam.p({
  textAlign: 'center',
  width: "100%",
  // animation: `${bounce} 5s ease-in-out alternate`,
  "hover & .text": {
    color: 'black'
},
  '@media (max-width: 729px)': {
    textAlign: 'center',
    width: '100%',
    // height: '25%',
  }
});

// const Logo = glam.img({
//   height: '100%',
//   width: '50%',
//   '@media (max-width: 729px)': {
//     visibility: 'collapse',
//   }
// })

// const LogoSmall = glam.img({
//   visibility: 'hidden',
//   '@media (max-width: 729px)': {
//     visibility: 'visible',
//     marginLeft: 5,
//   }
// })

// const Header = glam.header({
//   height: "150",
//   width: "100vw",
//   backgroundColor: 'var(--main-black)',
//   display: "flex",
//   flexDirection: "row",
//   justifyContent: "space-between",
//   alignItems: "center",
//   marginTop: "0",
//   })

// });

const Heading = glam.h1({
  fontSize: "2.5em",
  width: "50%",
  padding: 20,
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, .8)',
  borderRadius: '3px',
  // boxShadow: '0px 0px 0px 4px var(--main-purple)',
  // border: 'solid var(--main-purple) 2px',
  animation: `${bounce} 5s ease-in-out alternate`,
  '& :hover': {
    backgroundColor: 'var(--main-purple)',
    color: 'white',
    border: 'solid var(--main-black) 2px',
  },
  '@media (max-width: 729px)':{
    width: '100vw',
    // minHeight: '50%',
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
  height: "90vh",
  color: 'var(--main-purple)',
  backgroundImage: `url(${keys})`,
  backgroundSize: 'cover',
  '@media (max-width: 729px)': {
      flexDirection: 'column',
  },
});

// const Btnlogin = glam.button({
//   // color: "white",
//   backgroundColor: "var(--main-grey)",
//   borderRadius: 5,
//   fontSize: "18pt",
//   height: 100,
//   width: 200,
//   marginLeft: 20,
//   animation: `${bounce} 5s ease-in-out alternate`,
//   '@media (max-width: 729px)': {
//     fontSize: '14pt',
//     height: 75,
//     width: 150,
//     marginLeft: 0,
//   }
// });

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
