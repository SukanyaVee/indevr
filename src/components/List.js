import React, {Component} from 'react';
import glam from 'glamorous';
import Card from './Card'

class List extends Component {

    constructor(){
        super();
        this.state = {
            id: '',
            title: '',
            cards: []
        }
    }

    componentDidMount(){
        this.setState({
            id: this.props.list.id,
            title: this.props.list.title,
            cards: this.props.list.cards
        })
    }

    render(){
        const cards = this.state.cards.map( (card,i) => {
            return <Card card={card} key={i} />
        })
        return (
            <Main>
                <label>{this.state.title}</label>
                {cards}
                <Card />
            </Main>
        );
    }
}

export default List;

const Main = glam.div({
    width: 250,
    margin: 20,
    backgroundColor: 'steelblue',
    textAlign: 'center',
    padding: 5,
    borderRadius: 3,
    height: '100%',
    boxShadow: '3px 3px 3px 0px rgba(0,0,0,0.75)',
    '& label': {
        color: '#fff'
    },
    '& a': {
        color: '#333',
        textDecoration: 'none'
    }
})
