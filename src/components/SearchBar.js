//Search Bar Component used to search users and projects

import React, { Component } from 'react'
import glam from 'glamorous'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { searchResults } from '../ducks/reducer'
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

    search(){
        // e.preventDefault();
        const {searchTerm} = this.state
        axios.get(`/search/${searchTerm}`).then(response => {
                this.props.searchResults(response)
        })
        console.log('Bar props', this.props)
        // this.state.searchResults ? this.props.history.push(`/search`) : null
    }

    render() {
        // const {searchTerm} = this.state;
        return (
            <div>
                <Search 
                // style={search} 
                placeholder='Search Indevr'
                onChange={e => this.onInputChange(e.target.value)}
                ></Search>
                <Link to='/search'>
                <button 
                // onClick={searchTerm => this.search(searchTerm)}
                onClick={this.search}
                // results={this.state.searchResults}
                >Search</button>
                </Link>
                <br/>
            </div>
        )
    }
}

const Search = glam.input({
    border: 'black solid 2pt',
    width: '100%',
    height: 40,
})

const mapDispatchToProps = {
    searchResults
}

export default connect(null, mapDispatchToProps)(SearchBar);
