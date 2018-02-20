import React, { Component } from "react";
import { login } from "../ducks/reducer";
import { connect } from "react-redux";
import axios from "axios";
import Auth0Lock from "auth0-lock";
import glam from "glamorous";
// import SearchBar from "../components/SearchBar";
// import logo from "../assets/LogoMain.png";
// import logo2 from '../assets/LogoMini.png';
import Tasks from "./landing-page-assets/taskboard/tasks";
import Profile from './landing-page-assets/profile/profile';
import MidBar from './landing-page-assets/MidBar';
import Footer from './Footer';

const options = {
  theme: {
    primaryColor: "#593c8f"
  },
  // allowSignUp: false,
  redirect: true,
  redirectUrl: "/dashboard",
  languageDictionary: {
    title: "inDevr"
  },
  additionalSignUpFields: [
    {
      name: "first_name",
      placeholder: "Enter your first name"
    },
    {
      name: "last_name",
      placeholder: "Enter your last name"
    }
  ]
};

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {};
    this.lock = null;
    this.login = this.login.bind(this);
  }

  //Creating Auth0 Functionality
  componentDidMount() {
    this.lock = new Auth0Lock(
      process.env.REACT_APP_AUTH0_CLIENT_ID,
      process.env.REACT_APP_AUTH0_DOMAIN,
      options
    );
    this.lock.on("authenticated", authResult => {
      this.lock.getUserInfo(authResult.accessToken, (error, user) => {
        axios.post("/login", { userId: user.sub }).then(response => {
          this.props.login(response.data.user);
          this.props.history.push("/dashboard");
        });
      });
    });
  }

  login() {
    this.lock.show();
  }

  render() {
    return (
      <div>
        {/* <Header>
          <Logo className='big' src={logo} alt="" />
          <LogoSmall className='small' src={logo2} alt='' />
          <SearchBar />
        </Header>  */}
        {/* <Initial> */}
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
                welcome to your one-stop-shop developer platform.
              </Desc>
            </Heading>
            <Btnlogin onClick={this.login}>
              <b>Login/Register</b>
            </Btnlogin>
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
        <MidBar />
        <Profile />
        <MidBar />
        <Tasks />
      </div>
    );
  }
}

// const Initial = glam.section({
//   display: "flex",
//   flexDirection: "row",
//   backgroundColor: "#593c8f",
//   backgroundBlendMode: 10,
//   color: "white"
// });

const Desc = glam.p({
  // margin: 20,
  width: "90%",
  "hover & .text": {
    color: 'black'
},
  '@media (max-width: 729px)': {
    textAlign: 'center',
    width: '100%',
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
  // margin: 20,
  // marginright: 100,
  // textAlign: 'center',
  width: "65%",
  padding: 10,
  // boxShadow: '0 0 0 4px white',
  // border: 'solid white 2px',
  '@media (max-width: 729px)':{
    width: '100vw',
    minHeight: '50%',
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
  '@media (max-width: 729px)': {
      flexDirection: 'column',
  }
});

// const Aside = glam.aside({
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '40vw',
//     height: '90vh',
//     backgroundColor: '#9b9b9b',
//     float: 'right',
// })

// const Signup = glam.div({
//     backgroundColor: 'white',
//     height: '75%',
//     width: '70%',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
// })

// const Field = glam.input({
//     width: '80%',
//     height: '8%',
//     // marginTop: 15,
//     marginBottom: 10,
// })

const Btnlogin = glam.button({
  // color: "white",
  backgroundColor: "var(--main-grey)",
  borderRadius: 5,
  fontSize: "18pt",
  height: 100,
  width: 200,
  '@media (max-width: 729px)': {
    fontSize: '14pt',
    height: 75,
    width: 150,
  }
});

const mapDispatchToProps = {
  login
};

export default connect(null, mapDispatchToProps)(LandingPage);
