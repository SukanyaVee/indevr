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
            
        })
    }

    componentWillUnmount () {
        
    }

    onMouseDown (e, mouse) {
        mouse.click = true;
    }

    onMouseUp (e, mouse) {
        mouse.click = false;
    }

    onMouseMove (e, mouse){
        
        mouse.pos.x = e.clientX / width;
        mouse.pos.y = e.clientY / height;
        mouse.move = true;
    }
    // canvas.addEventListener('onMouseDown', function(e){
    //     mouse.click = true;
    //  }
    // canvas.addEventListener('onMouseUp', function(e){
    //     mouse.click = false;
    //  }
    // canvas.addEventListener('onMouseMove', function(e){
    //     mouse.pos.x = e.clientX / width;
    //     mouse.pos.y = e.clientY / height;
    //     mouse.move = true;         
    // }
    
    const canvas = document.getElementById('canvas');
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');
    var socket  = io.connect()
    var mouse = { 
        click: false,
        move: false,
        pos: {x:0, y:0},
        pos_prev: false
    }

    render() {
        

        return (
            <div id="canvas" onMouseDown={e=>{this.onMouseDown(e, mouse)}} onMouseDown={e=>{this.onMouseDown(e, mouse)}} onMouseDown={e=>{this.onMouseDown(e, mouse)}}>
                
            </div>
        );
    }
}

export default Whiteboard