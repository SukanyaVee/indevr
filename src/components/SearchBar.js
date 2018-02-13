//Search Bar Component used to search users and projects

import React, { Component } from 'react'

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: '',
            searchResults: [],
        }
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(value){
        this.setState({
            searchTerm: value
        });
        console.log(this.state.searchTerm)
    };

    render() {
        const {searchTerm} = this.state;
        return (
            <div>
                <input style={search} onChange={e => this.onInputChange(e.target.value)}></input>

                <br/>
                <results>{searchTerm}</results>
            </div>
        )
    }
}

const search = {
    backgroundColor: 'red',
    border: 'black solid 2pt',
    width: '100%',
}


export default SearchBar;
