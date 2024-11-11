// 2.5D sprite mouse-follower script -- by Kiophen //

(function(){


var SPRITE_SHEET_URL = "hypno_icon_sheet_snuppo_trans.png"
var FRAMERATE = 90;


// Setup

var PATH = document.currentScript.attributes.src.value.split("hypnosprite.js")[0]

var MOUSE_X = 0;
var MOUSE_Y = 0;
var OLDMOUSE_X = 0;
var OLDMOUSE_Y = 0;

document.addEventListener('mousemove', e => {
    MOUSE_X = e.x;
    MOUSE_Y = e.y;
});


class Pointer {
    // Target that the sprites move towards. Moves towards the mouse
    constructor() {
        this.pos = {x:-90, y:-90};
        this.posList = [];

        this.elem = document.createElement("div");
        this.elem.style = "height:10px;width:10px;position:absolute;background:blue;z-index:100000000000";
        this.dist = 0;

        this.speed = Math.random()*(Math.PI*2)-Math.PI;
        this.acc = 0;
        this.vel = 0;
        this.mass = 1;
        this.dir = 0;

        this.target = { x:MOUSE_X, y:MOUSE_Y };

        this.max = {acc: 3, vel: 10};
        this.min = {acc: -1, vel: 0};
        this.n = 1;
    }

    update() {
        this.n+=0.5;

        this.posList.unshift({x:this.pos.x, y:this.pos.y});
        this.posList.splice(sprite.sprites.length+1)

        // fly in a circle around the mouse:
        this.target = {x:MOUSE_X+Math.cos(this.n/10)*20-16, y:MOUSE_Y-(Math.sin(this.n/10)*5)+32}

        // follow the mouse and stay still:
        // this.target = {x:MOUSE_X - 16, y:MOUSE_Y + 32}

        //distance to mouse
        this.dist = Math.sqrt(Math.pow(this.pos.x-this.target.x, 2) + Math.pow(this.pos.y-this.target.y, 2));

        this.vel = this.dist/20

        this.vel = Math.max(Math.min(this.vel, this.max.vel), this.min.vel);

        //angle to mouse in radians
        this.dir = Math.atan2(this.target.y-this.pos.y, this.target.x-this.pos.x);

        this.pos.x += Math.cos(this.dir) * this.vel;
        this.pos.y += Math.sin(this.dir) * this.vel;
        this.draw();
    }

    draw() {
        this.elem.style.top = (this.pos.y)+"px";
        this.elem.style.left = (this.pos.x)+"px";
    }
}

class Sprite {
    // The set of sprites and their html
    constructor(i) {
        this.index = i
        this.pos = {x:-90, y:-90};
        this.elem = document.createElement("div");

        this.spriteCont = document.createElement("div");
        this.spriteCont.style = "top:0;left:0;position:absolute;pointer-events:none;"
        this.spriteCont.id = "hypnoPointer";
        this.sprites = [];

        // Load in all the sprites as sprite-sheeted-backgrounded div's
        for (var y=0; y<4; y++) {
        for (var x=0; x<4; x++) {
            pointer.posList.unshift({x:-90,y:-90});

            this.s = document.createElement("div");
            this.s.style = "will-change: transform; transform: translate3d(0px, 0px, 0) scale(0); background:url('"+PATH+SPRITE_SHEET_URL+"') "+(x*-32)+"px "+(y*-32)+"px; width:32px; height:32px; background-size:128px; image-rendering:crisp-edges; image-rendering: pixelated; image-rendering: optimizespeed; position:fixed; z-index:" + (1000000+((y*4)+x)*-4);
            this.spriteCont.appendChild(this.s);
            this.sprites.push(this.s);
        }
        }
        // reorder z-indexes for the last 3 layers since theyre not in depth order
        this.sprites[12].style.zIndex = parseInt(this.sprites[3].style.zIndex) + 1 // eyewhite render front of 3
        this.sprites[13].style.zIndex = parseInt(this.sprites[12].style.zIndex) + 1  // pupil render front of eyewhite
        this.sprites[14].style.zIndex = parseInt(this.sprites[0].style.zIndex) + 1  // eyelash render in front of all

        document.body.appendChild(this.spriteCont);

    }

    update() {
        for (var i=this.sprites.length-1; i>=0; i--) {
        this.sprites[i].style.transform = "translate3d(" + Math.floor(pointer.posList[i].x) + "px," + Math.floor(pointer.posList[i].y) + "px,0) scale(2)";
        }

        this.sprites[12].style.transform = this.sprites[2].style.transform;  //eyewhite copies 2

        this.sprites[13].style.transform = this.sprites[3].style.transform; //pupil copies 3

        this.sprites[14].style.transform = this.sprites[2].style.transform; //eyelash copies 2


    }
}

var pointer;
var sprite;

// Loop
var SCREEN_WIDTH = screen.width;
var TIME = Date.now();
var DIFF = 0;

function loop() {
    DIFF += Date.now() - TIME;
    if (DIFF >= 1000/FRAMERATE) {
        pointer.update();
        sprite.update();
        DIFF = 0;
    }
    TIME = Date.now();
    requestAnimationFrame(loop);
}

function main() {
    pointer = new Pointer();
    sprite = new Sprite();
    loop();
}

// 1ms timeout before it starts so the script works if you put it in the <head> lol
setTimeout(function(){main();}, 1);

})();
