# Creap.js

## Description

Creap.js is a plug-in for playing createjs content built by "Adobe Animate CC".<br />
By using webGL rendering you can render faster than regular createjs content.

## Features
- Can use the createjs content built by "Adobe Animate CC" as it is.
- Can use sprite sheet.
- Variables replacement/definition system
- Images replacement/definition system
- Sounds replacement/definition system
- DisplayObjects replacement system

## Caution
There are many unimplemented processes for most classes, especially the MovieClip class.<br />
Therefore it may not work with complicated createjs content.

Since compression of shapes is not supported, please disable "Shape Compact" from publish settings.

## Required libraries
- [pixi.js](http://www.pixijs.com/) v4.4.3 | 4.5.1
- [howler.js](https://howlerjs.com/) v2.0.1
- [Ease.js](http://www.createjs.com/)(module of Tween.js)

## Usage

### 1. Load plugins

```js:
<script src="lib/pixi.4.5.1.min.js"></script>
<script src="lib/Ease.js"></script>
<script src="lib/howler.core.js"></script>
<script src="dist/Creap.min.js"></script>
```
or
```html
<script src="dist/Creap.all.min.js"></script>
```

### 2. Setup content

```html
<script src="test.js"></script>
<script>
	var test = new Creap.Content('lib', 'test', 'images', 'ss');
</script>
```

### 3. If uses sprite sheet in content

```html
<script>
	// This process generates a json file corresponding to the sprite sheet.
	// Use only in development environment.
	test.createJson();
</script>
```

### 4. Start Creap.js

```html
<script>
	new Creap.Application(test, document.body)
	.on('initialized', function() {
		this.fullScreen();
		this.start();
	});
</script>
```