import React, { Component } from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import {login} from '../ducks/reducer';
import glam from 'glamorous';








class Whiteboard extends Component {
    constructor(props){
        super()
        this.state={
            user: {},
            // project: this.props.project,
            stack: [],
            goals: []
            // showTool:''
        }
    }

    componentDidMount () {
        window.addEventListener('DOMContentLoaded', ()=> {
            var mouse = { 
                click: false,
                move: false,
                pos: {x:0, y:0},
                pos_prev: false
            }
        }
        canvas.addEventListener('onMouseDown', function(e){
            mouse.click = true;
         }
        canvas.addEventListener('onMouseUp', function(e){
            mouse.click = false;
         }
        canvas.addEventListener('onMouseMove', function(e){
            mouse.pos.x = e.clientX / width;
            mouse.pos.y = e.clientY / height;
            mouse.move = true;         }
    }

    componentWillUnmount () {
        
    }
    

    render() {
        const canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var socket  = io.connect()

        return (
            <div id="canvas">
                
            </div>
        );
    }
}

export default Whiteboard