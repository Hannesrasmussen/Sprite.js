Hannes Rasmussen - https://www.hannesrasmussen.com

# Sprite.js

Sprite.js is an uncompressed JavaScript library designed for sprite creation. This README provides guidance on importing, creating sprites, troubleshooting, and lists available methods.

## Importing Sprite.js

To use Sprite.js in your project, download the Sprite.js file and reference it in a script tag in your HTML file:

```html
<script src="./Sprite.js"></script>
```

Ensure that this script tag is placed higher in the hierarchy than your other scripts.

## Creating a Sprite

### Recommended Workflow:

1. Create a sprite instance:

   ```javascript
   var/let/const sprite = new Sprite(name, width, height, help);
   ```

2. Add a sprite sheet:

   ```javascript
   sprite.addSpriteSheet(spritesheet, columns, rows, width, height);
   ```

3. Add an animation:

   ```javascript
   sprite.addAnimation(name, start, end, speed);
   ```

4. Play the animation:

   ```javascript
   sprite.play(name, loop);
   ```

Note:
- Detailed information about arguments and their functions is displayed in your IDE as you code.
- If you encounter issues, refer to the bottom of this guide for troubleshooting tips.

## Troubleshooting and Tips

If you are facing difficulties or need assistance, instantiate your first sprite with the 'help' argument set to true:

```javascript
new Sprite(name, width, height, true);
```

This will provide helpful information and tips in the console.

## Available Methods

### `addSpriteSheet(spritesheet, columns, rows, width, height)`

Adds the spritesheet of your sprite.

- `spritesheet` (string): The address to the spritesheet.
- `columns` (number): The number of columns.
- `rows` (number): The number of rows.
- `width` (number): Width (px) of the spritesheet cells.
- `height` (number): Height (px) of the spritesheet cells.

### `appendSpriteTo(parent)`

Appends the sprite to an HTML element.

- `parent` (HTMLObjectElement): The element that will append this sprite.

### `addAnimation(name, start, end, speed)`

Adds an animation to your sprite.

- `name` (string): The name of the animation.
- `start` (number): The first frame (spritesheet cell) of the animation.
- `end` (number): The last frame (spritesheet cell) of the animation.
- `speed` (number): Milliseconds per frame.

### `play(name, loop)`

Plays an animation.

- `name` (string): The name of the animation to be played.
- `loop` (boolean): If the animation should loop or not.

### `stop(name)`

Stops an animation.

- `name` (string): The name of the animation to be stopped.

### `hasStopped(name, callback)`

Listens for the specified animation to end.

- `name` (string): The name of the animation.
- `callback` (Function): Function to be called.

### `setFrame(index)`

Sets a specific frame (spritesheet cell).
