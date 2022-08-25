"use strict"

/**
 * @author Hannes Rasmussen
*/

// Version : 0.1

// Static class with the purpose of always being able to report an error related to Sprite, even if references within Sprite get all messed up.
const Error = ({
    thisUndefined : function(){
            console.error("%c[SPRITE] : %c(ILLEGAL) %cSprite method passed as argument in a sprite method's parameters. The object reference was lost.", "color:rgb(186, 49, 49)", "rgb(216, 78, 78)","color:rgb(255, 255, 255)");
    },
    typeError : function(x){
        console.error("%c[SPRITE] : %c(ERROR) %c" + x, "color:rgb(186, 49, 49)", "rgb(216, 78, 78)","color:rgb(255, 255, 255)");
    }
})

/**
 * Sprite allows for an animated png image. You can add multiple animations to the animated object, so that you may play it and stop it whenever you want.
 * @param {string} name Name of the object. (For example: "Mario", "Enemy1", "Flower" etc..)
 * @param {number} width Intended width of the sprite. In 'px'.
 * @param {number} height Intended height of the sprite. In 'px'.
 * @param {boolean} help Enable help through the developer console? :: true | false
*/
var Sprite = function(name,width,height,help){
    this.checkValidity(name,width,height,help);
    this.name = name; // Sprite's name.
    this.help = help; // Want help through the dev-console? Pass the argument true.
    this.spritesheet;
    this.width = width;
    this.height = height;
    this.stopped = "hasnotyetplayed";
    
    this.element = this.constructElement(this.name);
   
    this.animations = []; // Array filled with animation-objects. Each representing an animation for the current sprite.
    this.interval = null;
    this.current_frame;
}

/**
 * Append sprite to another html element. 
 * @param {HTMLObjectElement} parent Parent element to append to.
*/
Sprite.prototype.appendSpriteTo = function(parent){
    if (this == undefined){
        Error.thisUndefined()
        return;
    }

    parent.appendChild(this.element);
}

/**
 * This method should be private. Do not call it.
 */
Sprite.prototype.constructElement = function(name){
    if (this == undefined){
        Error.thisUndefined();
        return;
    }
    var object = document.createElement("div");
    object.setAttribute("id",name + "-object");
    var elem_temp = document.createElement("div");
    object.appendChild(elem_temp);
    this.helpMsg("Use (#" + name + ") to CSS-stylize your sprite. Make sure there are no duplicates.");
    elem_temp.setAttribute("class","sprite");
    elem_temp.setAttribute("id",this.name)
    elem_temp.style.position = "absolute";
    elem_temp.style.width = this.width + "px";
    elem_temp.style.height = this.height + "px";
    elem_temp.style.minWidth = this.width + "px";
    elem_temp.style.minHeight = this.height + "px";
    elem_temp.style.maxWidth = this.width + "px";
    elem_temp.style.maxHeight = this.height + "px";
    elem_temp.style.draggable = "false";
    return elem_temp;
}

/**
 * Add a spritesheet to current sprite.
 * @param {string} spritesheet Adress/url of the spritesheet.
 * @param {number} columns The number of vertical columns of your spritesheet.
 * @param {number} rows The number of horizontal rows of your spritesheet.
 * @param {number} x Spritesheet's cell width.
 * @param {number} y Spritesheet's cell height.

*/
Sprite.prototype.addSpriteSheet = function(spritesheet,columns,rows,x,y){
    if (this == undefined){
        Error.thisUndefined();
        return;
    }
    if (this.spritesheet != undefined){
        this.helpMsg("This Sprite already has a spritesheet!");
        return;
    } else {
        this.spritesheet = {
            spritesheet : spritesheet,
            columns     : columns,
            rows        : rows,
            cells       : [], // Multidimensionional array.
            width       : x,
            height      : y
        } 
        var that = this; // Saves the value of this.
        m_createGrid(that.spritesheet.width,that.spritesheet.height);

        function m_createGrid(width,height){
            var x = width;
            var y = 0;
            var frame;

            // Baby's first nested loop.
            for (var i = 0; i < rows; i++){
                for (var z = 0; z < columns; z++){
                    x -= width;
                    frame = "url('" + that.spritesheet.spritesheet + "') " + x + "px " + y + "px";
                    that.spritesheet.cells.push(frame);
                }
                y -= height;
            }
        }
        this.element.style.background = that.spritesheet.cells[0];
        this.helpMsg("Spritesheet has been added. Currently showing first frame.")
    }
}

/**
 * Add an animation to this sprite.
 * @param {string} name Name of the animation (Example: "idle").
 * @param {number} start The index of the first frame.
 * @param {number} end The index of the last frame.
 * @param {number} speed How many milliseconds per frame? 
*/
Sprite.prototype.addAnimation = function(name,start,end,speed){
    if (this == undefined){
        Error.thisUndefined();
        return;
    }
    var animation = {
        name : name,
        start : start,
        end : end,
        speed : speed,
        stopped : true
    }
    this.animations.push(animation)

}

Sprite.prototype.helpMsg = function(msg){
    if (this == undefined){
        Error.thisUndefined();
        return;
    }

    if (this.help == true){
        console.log("%c[SPRITE] : %c" + msg, "color:limegreen", "color:rgb(174, 243, 186)");
    }
}

/**
 * @param {string} name Name of the animation. (Example: "idle")
 * @param {boolean} loop Should the animation loop? :: true | false
 * 
 * play one of the sprite's animations.
*/
Sprite.prototype.play = function(name,loop){
    if (this == undefined){
        Error.thisUndefined();
        return;
    }
    var that = this; // Saves the value of this.
    var failure;
    for (var i = 0; i < this.animations.length; i++){
        if (this.animations[i].name == name){
            var failure = false;
            that.animations[i].stopped = false;
            var animation = this.animations[i];
            var frame = animation.start;
            var hasLooped = true;
            that.helpMsg("Animation '" + animation.name + "'is playing")
            this.interval = setInterval(() => {
                if (loop == false){
                    if (frame == animation.end){
                        that.setFrame(animation.end)
                        that.stop(animation.name);
                        that.helpMsg("Animation '" + animation.name + "'has ended!")
                    } else {
                        this.setFrame(frame);
                        frame++;
                    }
                }

                if (loop == true){
                    if (hasLooped == true){
                        frame = animation.start;
                        that.setFrame(animation.start);
                        hasLooped = false;
                    } else {
                        if (frame == animation.end) {
                            this.setFrame(animation.start);
                            frame = animation.start
                        } else {
                            frame++
                            that.setFrame(frame)
                        }
                        
                    }
                }
            }, animation.speed);
        }
    }
    if (failure == true){
        Error.typeError("Sprite, " + this.name + " doesn't have an animation with the name '" + name +  "'.")
        return;
    }
}

/**
 * Stop an animation.
 * @param {string} name Name of the animation. (Example: "idle")
*/
Sprite.prototype.stop = function(name){
    if (this == undefined){
        Error.thisUndefined();
        return;
    }
    for (var i = 0; i < this.animations.length; i++){
        if (this.animations[i].name == name){
            this.animations[i].stopped = true;
            clearInterval(this.interval); 
        }
    }
    
}

/**
 * Returns true if an animation has begun atleast once and has now stopped.
 * @param {string} name Name of the animation in question. (Example: "idle")
 * @param {function} callback Function/method to be called IF the animation in question stops or is stopped.

*/
Sprite.prototype.hasStopped = function(name,callback){
    if (this == undefined){
        Error.thisUndefined();
        return;
    }
    if (callback == undefined){
        console.error("hasStopped :: No callback function passed as second argument.");
        return
    } else {
        var that = this; // Saves the value of this
        for (var i = 0; i < this.animations.length; i++){
            if (that.animations[i].name == name){
                var animation = that.animations[i];
                var x = setInterval(() => {
                    if (animation.stopped == true){
                        clearInterval(x);
                        if (callback != undefined){
                            callback();
                        }
                        return true
                    }
                }, 1);
            }
        }
    } 
}

/**
 * @param {number} index The index of the frame (Example: 4).
*/
Sprite.prototype.setFrame = function(index){
    if (this == undefined){
        Error.thisUndefined();
        return;
    }
    this.current_frame = index;
    var maxNr = this.spritesheet.cells.length - 1;
    if (index > maxNr){
        this.helpMsg("You tried to set frame with index [" + index + "] The highest index in your spritesheet is [" + maxNr + "].")
    } else if (index < 0) {
        this.helpMsg("You tried to set an invalid frame. Your spritesheet does not have that index. " + "The lowest index in your spritesheet is [0].")
    } else {
        this.element.style.background = this.spritesheet.cells[index];
        this.helpMsg("Set frame [" + index + "].")
    }
}

Sprite.prototype.checkValidity = function(name,width,height,help){
    if (this == undefined){
        Error.thisUndefined();
        return;
    }
    if (typeof(name) != "string"){
        Error.typeError("Sprite 'name'-argument is not a string!")
    }
    if (typeof(width) != "number"){
        Error.typeError("Sprite 'width'-argument is either not set or not a number.")
    }
    if (typeof(height) != "number"){
        Error.typeError("Sprite 'height'-argument is either not set or not a number.")
    }
    if (typeof(help) != "boolean"){
        Error.typeError("Sprite 'help'-argument is either not set or not a boolean.")
    }
}