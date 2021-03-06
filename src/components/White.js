import React, { Component } from 'react'
import io from 'socket.io-client'

const socket = io();



class White extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.drawing = false;
        //eslint-disable-next-line
        this.canvas;
        //eslint-disable-next-line
        this.ctx;
        //eslint-disable-next-line
        this.current;
        this.offset = props.height; //document.getElementById('nav').height;
        this.side = props.width;
    }
    componentDidMount(){
        this.updateCanvas();
    }

    componentDidUpdate(){
        this.updateCanvas();
    }

    updateCanvas(){
        this.canvas = this.refs.canvas
        this.ctx = this.canvas.getContext('2d');
        this.current = {
            color: '#593c8f',
        };
        // canvas.addEventListener('mousedown', onMouseDown, false);
        // canvas.addEventListener('mouseup', onMouseUp, false);
        // canvas.addEventListener('mouseout', onMouseUp, false);
        // canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

        socket.on('drawing', data => this.onDrawingEvent(data));
    }

    onMouseMove(e){
        if (!this.drawing) {
            return;
          }
          this.drawLine(this.current.x, this.current.y, e.clientX - this.side, e.clientY - this.offset, this.current.color, true);
          this.current.x = e.clientX - this.side;
          this.current.y = e.clientY - this.offset;
    }

    onMouseDown(e){
        this.drawing = true;
        this.current.x = e.clientX - this.side;
        this.current.y = e.clientY - this.offset;
        console.log(e.clientY)
    }
    
    onMouseUp(e){
        if(!this.drawing){
            return 
        }
        this.drawing = false;
        this.drawLine(this.current.x, this.current.y, e.clientX - this.ide, e.clientY - this.offset, this.current.color, true);
    }

    drawLine(x0, y0, x1, y1, color, emit){
        this.ctx.beginPath();
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 4;
        this.ctx.stroke();
        this.ctx.closePath();

        if(!emit){
            return
        }
        var w = this.canvas.width;
        var h = this.canvas.height;

        socket.emit("draw", {
            x0: x0 / w,
            y0: y0 / h,
            x1: x1 / w,
            y1: y1 / h,
            color: color
          });
    }

    onDrawingEvent(data){
        var w = this.canvas.width;
        var h = this.canvas.height;
        this.drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    }

    throttle(callback, delay) {
        var previousCall = new Date().getTime();
        return function() {
          var time = new Date().getTime();
    
          if (time - previousCall >= delay) {
            previousCall = time;
            callback.apply(null, arguments);
          }
        };
      }

      onResize(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    render() {
        console.log(this.canvas, window.innerWidth)
        return (
            <div>
                <canvas ref='canvas' width={window.innerWidth} height={window.innerHeight} onMouseDown={(e) => this.onMouseDown(e)} onMouseUp={e => this.onMouseUp(e)} onMouseMove={(e) => this.throttle(this.onMouseMove(e), 10)}/>
            </div>
        )
    }
}

export default White;
