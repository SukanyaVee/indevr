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
            </div>
        )
    }
}

const search = {
    backgroundColor: 'red',
    border: 'black solid 2pt',
}


export default SearchBar;
