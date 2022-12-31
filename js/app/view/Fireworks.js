import { FiresHelper } from "../helpers/FiresHelper.js";

export class Fireworks {

    constructor() {
        window.requestAnimFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();

        this._canvas = document.getElementById('canvas')

        this._ctx = canvas.getContext('2d')
        // full screen dimensions
        this._cw = window.innerWidth
        this._ch = window.innerHeight
        // firework collection
        this._fireworks = []
        // particle collection
        this._particles = []
        // starting hue
        this._hue = 120
        // when launching fireworks with a click, too many get launched at once without a limiter, one launch per 5 loop ticks
        this._limiterTotal = 5
        this._limiterTick = 0
        // this will time the auto launches of fireworks, one launch per 80 loop ticks
        this._timerTotal = 80
        this._timerTick = 0
        this._mousedown = false
        // mouse x coordinate,
        this._mx
        // mouse y coordinate
        this._my

        this._canvas.width = this.cw
        this._canvas.height = this.ch
    }

    loop() {
        requestAnimFrame(this.loop);
        this._canvas.classList.add('fireworks');
        // this function will run endlessly with requestAnimationFrame
        

        // increase the hue to get different colored fireworks over time
        this._hue += 0.5;

        // normally, clearRect() would be used to clear the canvas
        // we want to create a trailing effect though
        // setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
        this._ctx.globalCompositeOperation = 'destination-out';
        // decrease the alpha property to create more prominent trails
        this._ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this._ctx.fillRect(0, 0, this._w, this._ch);
        // change the composite operation back to our main mode
        // lighter creates bright highlight points as the fireworks and particles overlap each other
        this._ctx.globalCompositeOperation = 'lighter';

        // loop over each firework, draw it, update it
        var i = this._fireworks.length;
        while (i--) {
            this._fireworks[i].draw(this._ctx);
            this._fireworks[i].update(i, this._fireworks);
        }

        // loop over each particle, draw it, update it
        var i = this._particles.length;
        while (i--) {
            this._particles[i].draw(this._ctx);
            this._particles[i].update(i, this._particles);
        }

        // launch fireworks automatically to random coordinates, when the mouse isn't down
        if (this._timerTick >= this._timerTotal) {
            if (!this._mousedown) {
                // start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
                this._fireworks.push(new Firework(this._cw / 2, this._ch, FiresHelper.random(0, this._cw), FiresHelper.random(0, this._ch / 2)));
                this._timerTick = 0;
            }
        } else {
            this._timerTick++;
        }

        // limit the rate at which fireworks get launched when mouse is down
        if (this._limiterTick >= this._limiterTotal) {
            if (this._mousedown) {
                // start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
                this._fireworks.push(new Firework(this._cw / 2, this._ch, this._mx, this._my));
                this._limiterTick = 0;
            }
        } else {
            this._limiterTick++;
        }
    }
}