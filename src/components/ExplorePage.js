import React, { Component } from 'react'
import Explorer from './Explorer';
import glam from 'glamorous';

class ExplorePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <Epage>
                <Explorer/>
            </Epage>
        )
    }
}

const Epage = glam.div ({
    padding: 20,
})

export default ExplorePage;
