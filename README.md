# Creap.js

## Description

Creap.js is a plug-in for playing createjs content built by "Adobe Animate CC".<br />
By using webGL rendering you can render faster than regular createjs content.

## Rerease note

### v1.1.3 (07/28/2017)
- [modify] Moved the Emitter class to the Creap namespace.
- [fix] createjs.Text
	- Fixed incorrect padding and touch judgment range when lineHeight value was below font size.

### v1.1.2 (07/27/2017)
- [add] CSV loader.

### v1.1.1 (07/26/2017)
<span style="red:">From this version, pixi.js v4.4.3 has become unsupported.</span>
- [add] TypeKit and GoogleWebFont are now available
- [update] createjs.Shape
	- Some functions for compatibility.
- [update] Creap.ApplicationOption
	- Related to TypeKit.
	- Related to GoogleWebFont.
- [fix] createjs.Shape
	- Fixed that complex path could not be expressed.
	
### v1.1.0 (07/20/2017)
- [add] Creap.loader
	- Function that asynchronous loading.
	- Function that asynchronous loading and create Creap.Content.
- [update] Support for multiple contents
- [update] Creap.Application
	- Functions related to align content.
	- Functions related to display of content.
	- Functions related to definition replacement.
	- Function that replace only a part of the image contained in the sprite sheet.
- [update] Creap.Application#isAccurateTarget has been changed to Creap.options.isAccurateTarget.
- [fix] createjs.Event
	- Fixed an error when addEventListener has not executed.
- [fix] createjs.Shape
	- Fixed that I could not express a path with a hole inside Fill.

### v1.0.3 (07/10/2017)
- [add] createjs.MouseEvent

### v1.0.0 (07/05/2017)
- [add] Initial release


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
- [pixi.js](http://www.pixijs.com/) v4.5.1 (If Creap.js v1.1.0 or lower, pixi.js v4.4.3 supported too.)
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