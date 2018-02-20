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
    width: 250,
    height: 43,
})

const Btn = glam.button({
    height: 35,
    width: 100,
    backgroundColor: 'white',
    border: 'solid white 2px',
    color: 'var(--main-purple)',
    textAlign: 'center',
    marginRight: '30px',
    '@media (max-width: 729px)':{
        width: '30%',
        minHeight: '50%',
        fontSize: '12pt',
        '> i': {
            fontSize: '4pt',
        }
    }
})

const mapDispatchToProps = {
    searching,
}

export default connect(null, mapDispatchToProps)(SearchBar);
