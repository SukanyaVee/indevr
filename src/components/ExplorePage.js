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
            <Main>
                <div className="container">
                    <Explorer/>
                </div>
            </Main>
        )
    }
}


export default ExplorePage;

const Main = glam.div({
    backgroundColor: 'var(--main-grey)',
    minHeight: 'calc(100vh - 235px)'
})
