# Creap.js

## Description

Creap.js is a plug-in for playing createjs content built by animateCC.<br>
By using webGL rendering you can render faster than regular createjs content.

<span style="color:red">There are many unimplemented processes for most classes, especially the MovieClip class.</span>
Therefore it may not work with complicated createjs content.</span>

大半のクラス、特にMovieClipクラスについて、未実装の処理が多く存在します。
そのため、複雑なcreatejsコンテンツでは動作しない可能性があります。

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
```js:
<script src="dist/Creap.all.min.js"></script>
```

### 2. Setup content

```js:
<script src="test.js"></script>
<script>
	var test = new Creap.Content('lib', 'test', 'images', 'ss');
</script>
```

### 3. If uses sprite sheet in content

```js:
<script>
	// This process generates a json file corresponding to the sprite sheet.
	// Use only in development environment.
	test.createJson();
</script>
```

### 4. Start Creap.js

```js:
<script>
	new Creap.Application(test, document.body, {
		width: window.innerWidth
	}).on(Creap.Event.Initialized, function() {
		this.fullScreen();
		this.start();
	});
</script>
```