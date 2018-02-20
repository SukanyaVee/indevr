//Search Bar Component used to search users and projects

import React, { Component } from 'react'
import glam from 'glamorous'
import { Link } from 'react-router-dom'
import { searching } from '../ducks/reducer'
import { connect } from 'react-redux'

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: '',
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.search = this.search.bind(this);
    }

    onInputChange(value){
            this.setState({
                searchTerm: value
            });
        // console.log(this.state.searchTerm)
    };

    search(){
        if(this.state.searchTerm.length <= 1){
            alert('Need more information to complete search!')
        } else if (this.state.searchTerm.length > 1){
        this.props.searching(this.state.searchTerm);
        }
    }

    render() {
        return (
            <Main>
                <div className="input-group">
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Search inDevr"
                            onChange={e => this.onInputChange(e.target.value)}/>
                            <Link to={`/search/${this.state.searchTerm}`}>
                            <button type="submit" className="btn btn-default" onClick={this.search}><i className="fas fa-search"></i></button>
                        </Link>
                    </div>
                </div>
            </Main>
        )
    }
}

const Main = glam.form({
    '& .form-group':{
        display: 'flex',
    },
    '& button':{
        marginLeft: 3
    },
    '@media (max-width: 860px)':{
        maxWidth: '100%',
        '& input':{
            width: '130px !important',
        }
    },
    '@media (max-width: 767px)':{
        '& input':{
            width: '100% !important',
        }
    },


})

const mapDispatchToProps = {
    searching,
}

export default connect(null, mapDispatchToProps)(SearchBar);
