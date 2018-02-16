import React, {Component} from 'react'
import glam from 'glamorous';
import DropZone from './DropZone';
import axios from 'axios';

class EditProfile extends Component {
    constructor(){
        super();
        this.state = {
            first_name: '',
            last_name: '',
            picture: ''
        }
    }

    componentDidMount(){
        const userID = 1;
        axios.get(`/indevr/users/${userID}`).then(res => {
            const {first_name, last_name, picture, bio, location, email, github,bitbucket,gitlab,portfolio,website,codepen,twitter} = res.data;
            this.setState({ user: first_name + ' ' + last_name, picture, bio, links: {location, email, github,bitbucket,gitlab,portfolio,website,codepen,twitter} })
        }).catch( err => console.log(err))
    }

    render(){
        return (
            <div>
                <Header></Header>
                <Main>
                    <div className="container">
                        <div className="profile-pic">
                            <img src={this.state.picture} alt="" />
                            <DropZone className="dropzone"/>
                            <div>
                                <p>
                                    The contact information you provide here will help others find and connect with you.  You can choose what is displayed publically using the switches next to each field.
                                </p>
                            </div>
                        </div>
                        <div>
                            <Form>
                                <div className="row">
                                    <div className="form-group col-sm-6" id='div1'>
                                        <label>First Name</label>
                                        <input className="form-control" />
                                    </div>
                                    <div className="form-group col-sm-6" id='div2'>
                                        <label>Last Name</label>
                                        <input className="form-control" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col-xs-12">
                                        <label>Bio</label>
                                        <textarea className="form-control"></textarea>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 text-center">
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="form-group col-xs-9">
                                        <label>Email</label>
                                        <input className="form-control" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 text-center">
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="form-group col-xs-9">
                                        <label>Location</label>
                                        <input className="form-control" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 text-center">
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="form-group col-xs-9">
                                        <label>Portfolio</label>
                                        <input className="form-control" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 text-center">
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="form-group col-xs-9">
                                        <label>Website</label>
                                        <input className="form-control" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 text-center">
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="form-group col-xs-9">
                                        <label>Github</label>
                                        <input className="form-control" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 text-center">
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="form-group col-xs-9">
                                        <label>Bitbucket</label>
                                        <input className="form-control" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 text-center">
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="form-group col-xs-9">
                                        <label>GitLab</label>
                                        <input className="form-control" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 text-center">
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="form-group col-xs-9">
                                        <label>Codepen</label>
                                        <input className="form-control" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-3 text-center">
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="form-group col-xs-9">
                                        <label>Twitter</label>
                                        <input className="form-control" />
                                    </div>
                                </div>

                            </Form>
                        </div>
                    </div>
                </Main>
            </div>
        );
    }
}

export default EditProfile;

const Main = glam.div({
    backgroundColor: 'var(--main-purple)',
    minHeight: '100vh',
    color: '#fff',
    padding: 20,
    '> .container':{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        flexWrap: 'wrap',
        '> div':{
            width: '50%',
            minWidth: 300,
        },
        '& p':{
            fontSize: 24,
            textAlign: 'center',
            marginTop: 40,
            padding: 20
        }
    },
    '& .profile-pic':{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& img':{
            height: 300,
            width: 300,
            marginBottom: 20,
        },
    },

})

const Form = glam.form({
    maxWidth: 500,
    '& .switch':{
        marginTop: 25
    },
})

const Header = glam.div({
    height: 100,
    backgroundColor: 'var(--main-black)',
    width: '100vw',
})
