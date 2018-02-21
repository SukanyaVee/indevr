import React, {Component} from 'react';
import glam from 'glamorous';
import skillList from './SkillList';
import axios from 'axios';
import {checkInput} from '../../tests/unit/ProfileTests/profile';

class AddSkills extends Component {
    constructor(props){
        super(props);
        this.state = {
            skills: props.skills,
            user_id: props.user,
            skill: '',
            level: ''
        }
    }


    componentWillReceiveProps(nextProps){
        this.setState({skills: nextProps.skills})
    }

    addSkill(e){
        e.preventDefault();

        if(checkInput(this.state.skill, this.state.level)){
            axios.post('/indevr/users/skills', this.state).then(res => {
                this.setState({skills:[...this.state.skills, res.data] })
            }).catch(err => console.log(err))
        }

    }

    removeSkill(index){
        const id = this.state.skills[index].id;
        const newSkills = [...this.state.skills];
        newSkills.splice(index, 1);
        axios.delete(`indevr/users/skills/${id}`).then(res => {
            this.setState({skills: newSkills})
        }).catch(err => console.log(err))
    }

    render(){
        return (
            <Main>
                <Form>
                    <div className="form-group">
                        <label>Add a Skill</label>
                        <select className="form-control" onChange={e => this.setState({skill: e.target.value})}>
                            <option></option>
                            {skillList.map( (skill,i) => <option key={i}>{skill}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Skill Level</label>
                        <select className="form-control" onChange={e => this.setState({level: e.target.value})}>
                            <option value="0"></option>
                            <option value="1">1 - Worthy Warrior (Novice)</option>
                            <option value="2">2 - Noble Ninja (Intermediate)</option>
                            <option value="3">3 - Silent Samurai (Advanced)</option>
                        </select>
                    </div>
                    <Button className="btn btn-success" onClick={e => this.addSkill(e)}>Add</Button>
                </Form>
                <Display>
                    {this.state.skills.map( (skill,i) => {
                        return (
                            <Tag key={i}>
                                {skill.skill} - {skill.level}
                                <div className="delete" onClick={() => this.removeSkill(i)}> &nbsp; <i className="fas fa-minus-circle"></i></div>
                            </Tag>
                        )
                    })}

                </Display>
            </Main>
        );
    }
}


export default AddSkills;

const Main = glam.div({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 200,
    '> div, form':{
        width: '100%'
    }
})

const Form = glam.form({
    // backgroundColor: 'blue'
})

const Display = glam.div({
    backgroundColor: 'var(--main-black)',
    margin: 20,
    padding: 10,
    height: 200,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'auto',
})

const Button = glam.button({
    width: '100%'
})

const Tag = glam.div({
    backgroundColor: 'var(--main-purple)',
    borderRadius: 4,
    padding: '3px 5px',
    margin: 3,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    '& .fa-minus-circle':{
        fontSize: '.8em',
        color: 'red',
    },
})
