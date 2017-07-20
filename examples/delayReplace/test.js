(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.ssMetadata = [];


// symbols:



(lib.Bitmap1 = function() {
	this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,19,19);// helper functions:

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


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill("#0000FF").beginStroke().moveTo(0.6,3.3).lineTo(0.6,3.1).lineTo(0.8,3.1).curveTo(1.2,3.1,1.4,2.9).curveTo(1.6,2.7,1.6,2.1).lineTo(1.6,0.1).lineTo(-1.5,0.1).lineTo(-1.5,2.1).lineTo(-1.5,2.8).lineTo(-1.3,3).lineTo(-0.8,3.1).lineTo(-0.6,3.1).lineTo(-0.6,3.3).lineTo(-3.4,3.3).lineTo(-3.4,3.1).lineTo(-3.2,3.1).curveTo(-2.8,3.1,-2.6,2.9).lineTo(-2.5,2.1).lineTo(-2.5,-2.2).lineTo(-2.5,-2.8).lineTo(-2.7,-3).curveTo(-2.8,-3,-2.8,-3.1).curveTo(-2.9,-3.1,-2.9,-3.1).curveTo(-3,-3.1,-3.1,-3.1).curveTo(-3.1,-3.2,-3.2,-3.2).lineTo(-3.4,-3.2).lineTo(-3.4,-3.3).lineTo(-0.6,-3.3).lineTo(-0.6,-3.2).lineTo(-0.8,-3.2).lineTo(-1.3,-3.1).lineTo(-1.5,-2.8).lineTo(-1.5,-2.2).lineTo(-1.5,-0.2).lineTo(1.6,-0.2).lineTo(1.6,-2.2).curveTo(1.6,-2.7,1.5,-2.8).lineTo(1.3,-3).curveTo(1.2,-3,1.2,-3.1).curveTo(1.1,-3.1,1.1,-3.1).curveTo(1,-3.1,0.9,-3.1).curveTo(0.9,-3.2,0.8,-3.2).lineTo(0.6,-3.2).lineTo(0.6,-3.3).lineTo(3.4,-3.3).lineTo(3.4,-3.2).lineTo(3.2,-3.2).lineTo(2.8,-3.1).lineTo(2.6,-2.8).curveTo(2.5,-2.7,2.5,-2.2).lineTo(2.5,2.1).curveTo(2.5,2.7,2.6,2.8).lineTo(2.8,3).lineTo(3.2,3.1).lineTo(3.4,3.1).lineTo(3.4,3.3).closePath();
	this.shape.setTransform(28.4,19.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.beginFill("#0000FF").beginStroke().moveTo(-0.4,3.4).lineTo(-1.1,3.2).lineTo(-1.7,3.1).lineTo(-1.8,3.1).lineTo(-2,3.5).lineTo(-2.1,3.5).lineTo(-2.1,1.2).lineTo(-2,1.2).curveTo(-1.8,1.9,-1.6,2.2).curveTo(-1.4,2.6,-1,2.8).curveTo(-0.5,3,0,3).curveTo(0.6,3,1,2.8).curveTo(1.3,2.5,1.3,2).lineTo(1.2,1.5).curveTo(1.1,1.3,0.8,1.1).lineTo(-0.3,0.4).lineTo(-1.5,-0.4).lineTo(-2,-1).curveTo(-2.2,-1.3,-2.2,-1.7).curveTo(-2.2,-2.5,-1.7,-2.9).curveTo(-1.1,-3.5,-0.3,-3.4).curveTo(0.3,-3.4,0.9,-3.2).lineTo(1.2,-3.1).lineTo(1.5,-3.2).lineTo(1.6,-3.4).lineTo(1.8,-3.4).lineTo(1.8,-1.2).lineTo(1.6,-1.2).curveTo(1.5,-1.8,1.3,-2.3).curveTo(1,-2.6,0.6,-2.8).curveTo(0.2,-3.1,-0.3,-3.1).curveTo(-0.8,-3.1,-1.1,-2.7).curveTo(-1.4,-2.5,-1.4,-2).curveTo(-1.4,-1.8,-1.2,-1.5).curveTo(-0.9,-1.1,0.2,-0.6).curveTo(1.2,-0,1.5,0.2).curveTo(1.8,0.5,2,0.9).curveTo(2.2,1.2,2.2,1.6).curveTo(2.2,2.4,1.6,2.9).curveTo(1,3.5,0.1,3.5).lineTo(-0.4,3.4).closePath();
	this.shape_1.setTransform(22.1,19.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.beginFill("#0000FF").beginStroke().moveTo(-1.6,3).curveTo(-2.2,2.6,-2.4,2).curveTo(-2.6,1.6,-2.6,0.4).lineTo(-2.6,-2.2).curveTo(-2.6,-2.8,-2.7,-3).curveTo(-2.9,-3.2,-3.3,-3.2).lineTo(-3.5,-3.2).lineTo(-3.5,-3.4).lineTo(-0.7,-3.4).lineTo(-0.7,-3.2).lineTo(-0.9,-3.2).curveTo(-1.3,-3.2,-1.5,-3).curveTo(-1.6,-2.8,-1.6,-2.2).lineTo(-1.6,0.7).lineTo(-1.5,1.5).curveTo(-1.5,2,-1.3,2.3).curveTo(-1.1,2.6,-0.8,2.8).curveTo(-0.4,3,0.1,3).curveTo(0.7,3,1.3,2.7).curveTo(1.8,2.4,2,2).curveTo(2.1,1.5,2.1,0.5).lineTo(2.1,-2.2).lineTo(2,-3).curveTo(1.8,-3.2,1.4,-3.2).lineTo(1.2,-3.2).lineTo(1.2,-3.4).lineTo(3.5,-3.4).lineTo(3.5,-3.2).lineTo(3.3,-3.2).curveTo(2.9,-3.2,2.7,-2.9).curveTo(2.6,-2.7,2.6,-2.2).lineTo(2.6,0.5).curveTo(2.6,1.5,2.4,2).curveTo(2.2,2.6,1.6,3).curveTo(1,3.4,0,3.4).curveTo(-1,3.4,-1.6,3).closePath();
	this.shape_2.setTransform(15.6,19.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.beginFill("#0000FF").beginStroke().moveTo(-2.5,3.3).lineTo(-2.5,3.1).lineTo(-2.3,3.1).curveTo(-1.8,3.1,-1.7,2.8).curveTo(-1.6,2.7,-1.6,2.1).lineTo(-1.6,-2.2).lineTo(-1.7,-2.9).curveTo(-1.9,-3.2,-2.3,-3.2).lineTo(-2.5,-3.2).lineTo(-2.5,-3.3).lineTo(-0.1,-3.3).curveTo(0.8,-3.3,1.3,-3.2).curveTo(1.8,-3,2.2,-2.5).curveTo(2.5,-2.1,2.5,-1.5).curveTo(2.5,-0.7,2,-0.1).curveTo(1.5,0.3,0.5,0.3).lineTo(-0,0.3).lineTo(-0.6,0.2).lineTo(-0.6,2.1).curveTo(-0.6,2.7,-0.5,2.9).curveTo(-0.3,3.1,0.1,3.1).lineTo(0.3,3.1).lineTo(0.3,3.3).closePath().moveTo(-0.6,-2.8).lineTo(-0.6,-0.1).lineTo(-0.2,-0).lineTo(0.2,-0).curveTo(0.7,0,1.1,-0.4).curveTo(1.4,-0.8,1.4,-1.4).curveTo(1.4,-1.8,1.2,-2.2).curveTo(1.1,-2.5,0.7,-2.7).curveTo(0.4,-2.9,0,-2.9).lineTo(-0.6,-2.8).closePath();
	this.shape_3.setTransform(9.2,19.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.beginFill("#FF0000").beginStroke().moveTo(-0,20.3).lineTo(-1.3,20.3).lineTo(-2.5,20.2).curveTo(-9.3,19.4,-14.4,14.4).curveTo(-20.3,8.4,-20.4,-0).curveTo(-20.3,-8.4,-14.4,-14.4).curveTo(-8.4,-20.3,-0,-20.4).curveTo(8.4,-20.3,14.4,-14.4).curveTo(20.3,-8.4,20.3,-0).curveTo(20.3,8.4,14.4,14.4).curveTo(10.1,18.6,4.7,19.9).curveTo(2.8,20.3,0.7,20.3).lineTo(-0,20.3).closePath().moveTo(-13.4,-13.4).curveTo(-19,-7.9,-19,-0).curveTo(-19,7.9,-13.4,13.4).curveTo(-8.8,18.1,-2.5,18.8).lineTo(-1.3,19).lineTo(-0,19).lineTo(0.7,19).curveTo(2.8,18.9,4.7,18.4).curveTo(9.6,17.2,13.4,13.4).curveTo(19,7.9,19,-0).curveTo(19,-7.9,13.4,-13.4).curveTo(7.9,-19,-0,-19).curveTo(-7.9,-19,-13.4,-13.4).closePath();
	this.shape_4.setTransform(19,19);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(-1.3,-1.3,41.6,40.7), null);


// stage content:
(lib.test = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.b.addEventListener("mousedown", function(e) {
			console.log("push")
			if (typeof func === "function") {
				func();
			}
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// レイヤー 1
	this.b = new lib.Symbol1();
	this.b.parent = this;
	this.b.setTransform(212.9,289,1,1,0,0,0,19.9,19);

	this.instance = new lib.Bitmap1();
	this.instance.parent = this;
	this.instance.setTransform(27,37);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.b}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(147,197,206.3,272.4);
// library properties:
lib.properties = {
	width: 240,
	height: 320,
	fps: 60,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Bitmap1.png?1500544830571", id:"Bitmap1"}
	],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;