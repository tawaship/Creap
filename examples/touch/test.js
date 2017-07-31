(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.ssMetadata = [
		{name:"test_atlas_", frames: [[0,21,19,19],[0,0,19,19]]}
];


// symbols:



(lib.Bitmap1 = function() {
	this.spriteSheet = ss["test_atlas_"];
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap2 = function() {
	this.spriteSheet = ss["test_atlas_"];
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Symbol4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.Bitmap2();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(0,0,19,19), null);


(lib.Symbol2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill("#0000FF").beginStroke().moveTo(-14.9,14.8).curveTo(-21,8.7,-21,-0).curveTo(-21,-8.7,-14.9,-14.9).curveTo(-8.7,-21,-0,-21).curveTo(8.7,-21,14.8,-14.9).curveTo(21,-8.7,21,-0).curveTo(21,8.7,14.8,14.8).curveTo(8.7,21,-0,21).curveTo(-8.7,21,-14.9,14.8).closePath();
	this.shape.setTransform(21,21);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(0,0,42,42), null);


(lib.Symbol3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.g = new lib.Symbol4();
	this.g.parent = this;
	this.g.setTransform(30.3,9.5,1,1,0,0,0,9.5,9.5);

	this.instance = new lib.Bitmap1();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.g}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(0,0,39.8,19), null);


(lib.Ball = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.c = new lib.Symbol3();
	this.c.parent = this;
	this.c.setTransform(9.5,9.5,1,1,0,0,0,9.5,9.5);

	this.timeline.addTween(cjs.Tween.get(this.c).wait(1));

}).prototype = getMCSymbolPrototype(lib.Ball, new cjs.Rectangle(0,0,39.8,19), null);


(lib.Symbom0 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
<<<<<<< HEAD
		//this.a.text = "A\nA\nA\nA\nA\nA\nA\nA"
=======
		this.a.text = "A aaaa a    aaaanA\nA\nA\nA"
>>>>>>> text_view_issue
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// レイヤー 1
<<<<<<< HEAD
	this.text = new cjs.Text("AAA PPP\nPPP\nPPP\nPPP\nPPP\nVVV", "24px 'Yu Gothic UI'", "#0000FF");
	this.text.lineHeight = -28;
	this.text.lineWidth = 55;
=======
	this.text = new cjs.Text("A\nA\nA\nA\nA\nA", "24px 'Yu Gothic UI Light'", "#0000FF");
	this.text.lineHeight = -70;
	this.text.lineWidth = 20;
>>>>>>> text_view_issue
	this.text.parent = this;
	this.text.setTransform(-49,27.8);

	this.t = new lib.Ball();
	this.t.parent = this;
	this.t.setTransform(133,21,1,1,0,0,0,9.5,9.5);

	this.r = new lib.Symbol2();
	this.r.parent = this;
	this.r.setTransform(136,21,1,1,0,0,0,21,21);

<<<<<<< HEAD
	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.r},{t:this.t},{t:this.text}]}).wait(1));
=======
	this.a = new cjs.Text("p\nY", "24px 'Times New Roman'", "#0000FF");
	this.a.textAlign = "center"
	this.a.name = "a";
	this.a.lineHeight = 27;
	this.a.lineWidth = 20
	this.a.parent = this;
	this.a.setTransform(3.2,-110);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.a},{t:this.r},{t:this.t},{t:this.text}]}).wait(1));
>>>>>>> text_view_issue

}).prototype = getMCSymbolPrototype(lib.Symbom0, new cjs.Rectangle(-51,0,214.3,349.2), null);


// stage content:
(lib.test = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		createjs.Touch.enable(true); // This code is unnesseary in Creap.js.
		var self = this;
		
		
		
		this.a.t.c.addEventListener("mousedown", function(e) {
			console.log("down",e);
		}, false);
		
		
		this.a.addEventListener("pressmove", (function(e) {
			console.log("move", e);
		}).bind(this));
		
		this.a.t.c.g.addEventListener("pressup", function(e) {
			console.log("up",e);
		});
		
		this.a.t.addEventListener("click", function(e) {
			console.log("click", e);
			self.dispatchEvent("userevent");
			self.dispatchEvent(new createjs.Event("userevent"));
		});
		
		this.a.addEventListener("userevent", function(e) {
			console.log("userevent", e);
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// レイヤー 1
	this.a = new lib.Symbom0();
	this.a.parent = this;
	this.a.setTransform(137.6,175.7,1,1,0,0,0,81.6,50.6);

	this.timeline.addTween(cjs.Tween.get(this.a).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(125,285.1,214.3,349.2);
// library properties:
lib.properties = {
	width: 240,
	height: 320,
	fps: 60,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/test_atlas_.png?1501247340479", id:"test_atlas_"}
	],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;