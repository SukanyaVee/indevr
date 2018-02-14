//Search Bar Component used to search users and projects

import React, { Component } from 'react'
import glam from 'glamorous'
import axios from 'axios'

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

    search(e, searchTerm){
        // e.preventDefault();
        axios.get(`/search/${searchTerm}`).then(response => {
                console.log(response)
        })
        this.props.history.push(`/search/${searchTerm}`)
    }

    render() {
        // const {searchTerm} = this.state;
        return (
            <div>
                <Search 
                // style={search} 
                placeholder='Search Indevr'
                onChange={e => this.onInputChange(e.target.value)}
                onSubmit={(e, searchTerm) => this.search(e, searchTerm)}></Search>

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


export default SearchBar;
