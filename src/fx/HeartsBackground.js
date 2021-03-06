/**
 * Created by w on 2017/3/21.
 */
import React from "react";
export class HeartsBackground extends React.Component {
    heartHeight = 60;
    heartWidth = 64;
    hearts = [];
    heartImage = '../../assets/heart.png';
    maxHearts = 12;
    minScale = 0.4;

    draw() {
        this.setCanvasSize();
        this.ctx.clearRect(0, 0, this.w, this.h);
        for (var i = 0; i < this.hearts.length; i++) {
            let heart = this.hearts[i];
            /*heart.image = new Image();
            heart.image.style.height = heart.height;
            heart.image.src = this.heartImage;*/
            this.ctx.globalAlpha = heart.opacity;
            this.ctx.drawImage(heart.image, heart.x, heart.y, heart.width, heart.height);
        }
        this.move();
    }

    move() {
        for (var b = 0; b < this.hearts.length; b++) {
            var heart = this.hearts[b];
            heart.y += heart.ys;
            if (heart.y > this.h) {
                heart.x = Math.random() * this.w;
                heart.y = -1 * this.heartHeight;
            }
        }
    }

    setCanvasSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.w = this.canvas.width;
        this.h = this.canvas.height;
    }

    componentDidMount() {
        this.canvas = this.refs.canvas;
        this.setCanvasSize();
        this.ctx = this.canvas.getContext('2d');
        if (!this.canvas.getContext)return;
        for (var a = 0; a < this.maxHearts; a++) {
            var scale = (Math.random() * (1 - this.minScale)) + this.minScale;
            this.hearts.push({
                x: Math.random() * this.w,
                y: Math.random() * this.h,
                ys: Math.random() + 1,
                height: scale * this.heartHeight,
                width: scale * this.heartWidth,
                opacity: scale
            });
            this.hearts[a].image=new Image();//new Image()要在didmount中，否则移动端Canvas渲染不出图片
            this.hearts[a].image.style.height =this.hearts[a].height;
            this.hearts[a].image.src = this.heartImage;

        }
        setInterval(()=>this.draw(), 30);
    }

    render() {
        return <canvas ref="canvas"/>
    }
}