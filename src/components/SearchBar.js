//Search Bar Component used to search users and projects

import React, { Component } from 'react'
import glam from 'glamorous'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { searching } from '../ducks/reducer'
// import { searchUsers, searchProj, searchPosts } from '../ducks/reducer'
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
        console.log(this.state.searchTerm)
    };

    // search(){
    //     // e.preventDefault();
    //     const {searchTerm} = this.state
    //     axios.get(`/search/${searchTerm}`).then(response => {
    //             this.props.searchUsers(response)
    //     });
    //     axios.get(`/search/projects/${searchTerm}`).then(response => {
    //         this.props.searchProj(response)
    //     });
    //     axios.get(`/search/posts/${searchTerm}`).then(response => {
    //         this.props.searchPosts(response)
    //     })
    //     console.log('Bar props', this.props)
    //     // this.state.searchResults ? this.props.history.push(`/search`) : null
    // }
    search(){
        this.props.searching(this.state.searchTerm);
    }

    render() {
        // const {searchTerm} = this.state;
        return (
            <Bar class="input-group">
                <Search 
                type="text" className="form-control"
                placeholder='Search Indevr'
                onChange={e => this.onInputChange(e.target.value)}
                >
                </Search>
                <Link to={`/search/${this.state.searchTerm}`}>
                <Btn 
                onClick={this.search}
                ><i className="fab fa-searchengin fa-2x"></i></Btn>
                </Link>
                <br/>
            </Bar>
        )
    }
}

const Bar = glam.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

})

const Search = glam.input({
    border: 'black solid 2pt',
    width: '100%',
    height: 40,
})

const Btn = glam.button({
    height: 35,
    width: 100,
    backgroundColor: 'transparent',
    border: 'solid white 2px',
    color: 'white',
    textAlign: 'center',
})

const mapDispatchToProps = {
    searching,
}

export default connect(null, mapDispatchToProps)(SearchBar);
