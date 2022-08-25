
[Sprite.js - Documentation & Guide]

Author: Hannes Rasmussen
E-mail: Hannes.e.rasmussen@gmail.com
Website: Hannesrasmussen.se


// Sprite.js is uncompressed for the sake of IDE comments.


(Question) - (How do I import / require this?)
______________________________________________________

    Add the following to your HTML document:

    <script src="./Sprite.js"></script>

    Now; of course the url will be different 
    depending on what folder you place Sprite.js in.

        (!) There is no need for neither import or require.
   
        (!) Make sure that this script-tag is placed higher
            in the hierarchy than the document / code that 
            is going to use of it.



(Question) - (How do I create a sprite?)
__________________________________________

    The recommended workflow for creating
    sprites is:

    (1) var/let/const ??? = new Sprite(name,width,height,help);

    (2) ???.addSpriteSheet(spritesheet,columns,rows,width,height);
      
    (3) ???.addAnimation(name,start,end,speed);

    (4) ???.play(name,loop);

        (!) Further explanation about arguments and what they do is
            shown to you as you code in your IDE! 
         
        (!) If nothing is showing up for you, check the bottom of
            this guide.



(Question) - (Why is this not working? / I am stuck.. etc)
______________________________________________________

    new Sprite(name,width,height, --> true <-- );

    It is advised to pass argument 'help' as true when
    you instatiate your first Sprite. Helpful information
    and tips are shown to you in the console. 




Available methods:



____________________________________________________
addSpriteSheet(spritesheet,columns,rows,width,height)
----------------------------------------------------

    Adds the spritesheet of your sprite.

        (string) spritesheet : The adress to the spritesheet.
        (number) columns     : The number of columns.
        (number) rows        : The number of rows.
        (number) width       : Width (px) of the spritesheet cells.
        (number) height      : Height (px) of the spritesheet cells.

____________________________________________________
                appendSpriteTo(parent)
----------------------------------------------------
    
    Append sprite to a HTML element. 

        (HTMLObjectElement) parent : The element that will append this sprite.

____________________________________________________
                    addAnimation()
----------------------------------------------------
    
    Adds an animation to your sprite.

        (string) name    : The name of the animation.
        (number) start   : The first frame (spritesheet cell) of the animation.
        (number) end     : The last frame (spritesheet cell) of the animation.
        (number) speed   : Milliseconds per frame.
____________________________________________________
                    play(name,loop)
----------------------------------------------------

    Play an animation

        (string) name    : The name of the animation to be played. 
        (boolean) loop   : If the animation should loop or not.

____________________________________________________
                    stop(name)
----------------------------------------------------
    
    Stop an animation.

        (string) name    : The name of the animation to be stopped. 

____________________________________________________
            hasStopped(name,callback)
----------------------------------------------------
    
    Listens for the animation in question to end.

        (string) name          : The name of the animation. 
        (Function) callback    : Function to be called. 

____________________________________________________
                setFrame(index)
----------------------------------------------------
    
    Sets a specific frame (spritesheet cell).

        (number) index : index of the frame.

    


