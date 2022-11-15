![Sprite.js](thumbn.png)

Hannes Rasmussen - https://www.hannesrasmussen.se


Sprite.js is uncompressed for the sake of IDE comments.




______________________________________________________
(Question) - (How do I import / require this?)
    

    Two options:
    
    Download Sprite.js and reference it in a script tag, like this:

        <script src="./Sprite.js"></script>
    
    or.. link to Sprite.js, like this:
    
        <script src="https://www.Hannesrasmussen.se/requests/Sprite.js"></script>
        
    You do you.

        (!) There is no need for neither import or require.
   
        (!) This should go without saying, but make sure that the script-tag is placed higher
            in the hierarchy than your other scripts.


__________________________________________
(Question) - (How do I create a sprite?)

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


______________________________________________________
(Question) - (Why is this not working? / I am stuck.. etc)


    new Sprite(name,width,height, --> true <-- );

    It is advised to pass argument 'help' as true when
    you instantiate your first Sprite. Helpful information
    and tips are shown to you in the console. 



____________________________________________________
Available methods:
____________________________________________________

addSpriteSheet(spritesheet,columns,rows,width,height)

    Adds the spritesheet of your sprite.

    (string) spritesheet : The adress to the spritesheet.
    (number) columns     : The number of columns.
    (number) rows        : The number of rows.
    (number) width       : Width (px) of the spritesheet cells.
    (number) height      : Height (px) of the spritesheet cells.

___________________________________________________

appendSpriteTo(parent)

    Append sprite to a HTML element. 

    (HTMLObjectElement) parent : The element that will append this sprite.

___________________________________________________

addAnimation()
        
    Adds an animation to your sprite.

    (string) name    : The name of the animation.
    (number) start   : The first frame (spritesheet cell) of the animation.
    (number) end     : The last frame (spritesheet cell) of the animation.
    (number) speed   : Milliseconds per frame.
            
____________________________________________________

play(name,loop)

    Play an animation

    (string) name    : The name of the animation to be played. 
    (boolean) loop   : If the animation should loop or not.

____________________________________________________

stop(name)
        
    Stop an animation.
        
    (string) name    : The name of the animation to be stopped. 

____________________________________________________

hasStopped(name,callback)
    
    Listens for the animation in question to end.
    
    (string) name          : The name of the animation. 
    (Function) callback    : Function to be called. 

____________________________________________________

setFrame(index)
    
    
    Sets a specific frame (spritesheet cell).

    (number) index : index of the frame.

    


