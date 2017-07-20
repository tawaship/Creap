(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.ssMetadata = [];


// symbols:
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


(lib.Synmol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill("#FFFFFF").beginStroke().moveTo(0.3,3.5).lineTo(0.3,3.3).lineTo(0.4,3.3).lineTo(0.8,3.2).lineTo(1,2.9).lineTo(1,2.5).lineTo(1,0.9).lineTo(0.9,-0.1).lineTo(0.6,-0.4).lineTo(0.3,-0.5).lineTo(-0.3,-0.4).lineTo(-0.8,0.1).lineTo(-0.8,2.5).lineTo(-0.8,3).lineTo(-0.6,3.2).lineTo(-0.2,3.3).lineTo(-0.2,3.5).lineTo(-2.4,3.5).lineTo(-2.4,3.3).lineTo(-1.9,3.2).lineTo(-1.7,3).lineTo(-1.7,2.5).lineTo(-1.7,-1.6).lineTo(-1.7,-2.5).lineTo(-1.8,-2.8).lineTo(-2.1,-2.8).lineTo(-2.4,-2.8).lineTo(-2.4,-2.9).lineTo(-1.1,-3.5).lineTo(-0.8,-3.5).lineTo(-0.8,-0.2).curveTo(-0.3,-0.8,-0,-1).lineTo(0.6,-1.1).curveTo(1,-1.1,1.2,-0.9).curveTo(1.5,-0.7,1.7,-0.3).lineTo(1.8,0.9).lineTo(1.8,2.5).lineTo(1.9,3).lineTo(2,3.2).lineTo(2.4,3.3).lineTo(2.4,3.5).closePath();
	this.shape.setTransform(33.4,39.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-0.9,2.2).lineTo(-1.2,2.2).lineTo(-1.4,2.3).lineTo(-1.5,2.3).lineTo(-1.5,0.7).lineTo(-1.4,0.7).curveTo(-1.2,1.4,-0.8,1.7).curveTo(-0.4,2.1,0,2.1).curveTo(0.4,2.1,0.6,1.9).curveTo(0.8,1.7,0.8,1.4).curveTo(0.8,1.1,0.6,0.8).lineTo(-0.4,0.3).curveTo(-1.1,-0.1,-1.3,-0.4).curveTo(-1.5,-0.7,-1.5,-1.1).curveTo(-1.5,-1.6,-1.2,-2).curveTo(-0.8,-2.4,-0.2,-2.4).lineTo(0.5,-2.3).lineTo(0.8,-2.2).lineTo(0.9,-2.2).lineTo(1,-2.4).lineTo(1.2,-2.4).lineTo(1.2,-0.9).lineTo(1,-0.9).curveTo(0.8,-1.6,0.5,-1.8).curveTo(0.3,-2.1,-0.2,-2.1).curveTo(-0.5,-2.1,-0.8,-1.9).curveTo(-0.8,-1.9,-0.9,-1.8).curveTo(-0.9,-1.8,-0.9,-1.7).curveTo(-0.9,-1.7,-1,-1.6).curveTo(-1,-1.6,-1,-1.5).curveTo(-1,-1.2,-0.8,-1).curveTo(-0.7,-0.8,-0.2,-0.6).lineTo(0.5,-0.3).curveTo(1.5,0.2,1.5,1).curveTo(1.5,1.6,1.1,2).curveTo(0.6,2.4,0,2.4).lineTo(-0.9,2.2).closePath();
	this.shape_1.setTransform(29,41.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.beginFill("#FFFFFF").beginStroke().moveTo(1,2.3).lineTo(1,1.4).lineTo(0.1,2.2).curveTo(-0.2,2.3,-0.6,2.3).curveTo(-0.9,2.3,-1.3,2.1).curveTo(-1.5,1.8,-1.6,1.5).lineTo(-1.7,0.6).lineTo(-1.7,-1.4).lineTo(-1.8,-1.9).lineTo(-2,-2.1).lineTo(-2.5,-2.1).lineTo(-2.5,-2.3).lineTo(-0.9,-2.3).lineTo(-0.9,0.6).curveTo(-0.9,1.3,-0.7,1.5).curveTo(-0.5,1.7,-0.2,1.7).lineTo(0.3,1.5).lineTo(1,1).lineTo(1,-1.5).curveTo(0.9,-1.8,0.8,-2).curveTo(0.7,-2.2,0.2,-2.1).lineTo(0.2,-2.3).lineTo(1.8,-2.3).lineTo(1.8,0.4).lineTo(1.8,1.4).lineTo(1.9,1.6).lineTo(2.1,1.6).lineTo(2.4,1.5).lineTo(2.5,1.7).lineTo(1.1,2.3).closePath();
	this.shape_2.setTransform(24.5,41.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-2.4,3.4).lineTo(-2.4,3.2).lineTo(-2.2,3.2).lineTo(-1.8,3.1).lineTo(-1.6,2.9).lineTo(-1.6,2.3).lineTo(-1.6,-1.9).lineTo(-1.6,-2.5).lineTo(-1.7,-2.7).lineTo(-1.9,-2.7).lineTo(-2.3,-2.6).lineTo(-2.3,-2.8).lineTo(-0.9,-3.4).lineTo(-0.8,-3.4).lineTo(-0.8,-2.3).curveTo(-0.4,-2.9,-0,-3.1).curveTo(0.3,-3.4,0.7,-3.4).curveTo(1.4,-3.4,1.8,-2.9).curveTo(2.4,-2.2,2.4,-1.2).curveTo(2.4,-0,1.7,0.7).curveTo(1.1,1.4,0.3,1.4).lineTo(-0.3,1.3).lineTo(-0.8,1).lineTo(-0.8,2.3).lineTo(-0.7,2.9).lineTo(-0.5,3.1).lineTo(-0,3.2).lineTo(-0,3.4).closePath().moveTo(-0.1,-2.6).lineTo(-0.8,-2).lineTo(-0.8,-0.4).lineTo(-0.7,0.4).curveTo(-0.7,0.6,-0.3,0.9).curveTo(-0.1,1.1,0.3,1.1).curveTo(0.8,1.1,1.1,0.7).curveTo(1.5,0.2,1.5,-0.7).curveTo(1.5,-1.7,1,-2.3).curveTo(0.7,-2.7,0.3,-2.7).lineTo(-0.1,-2.6).closePath();
	this.shape_3.setTransform(19.3,42.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.beginFill("#FFFFFF").beginStroke().moveTo(2.2,8.1).lineTo(2.2,7.7).curveTo(3.1,7.6,3.5,7.4).curveTo(3.8,7.1,3.8,6.7).curveTo(3.8,6.2,3.3,5.1).lineTo(2.4,2.8).lineTo(-3.8,2.8).lineTo(-4.9,5.3).curveTo(-5.3,6.2,-5.3,6.7).curveTo(-5.3,7.1,-4.9,7.3).curveTo(-4.6,7.6,-3.4,7.7).lineTo(-3.4,8.1).lineTo(-8.4,8.1).lineTo(-8.4,7.7).curveTo(-7.4,7.5,-7.1,7.2).curveTo(-6.6,6.7,-5.8,4.9).lineTo(-0.2,-8.1).lineTo(0.2,-8.1).lineTo(5.7,5.1).curveTo(6.4,6.7,6.9,7.2).curveTo(7.5,7.6,8.4,7.7).lineTo(8.4,8.1).closePath().moveTo(-3.4,1.9).lineTo(2,1.9).lineTo(-0.7,-4.5).closePath();
	this.shape_4.setTransform(26.2,25);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.beginFill("#666666").beginStroke().moveTo(-15.6,15.6).curveTo(-22,9.1,-22,0).curveTo(-22,-9.1,-15.6,-15.6).curveTo(-9.1,-22,0,-22).curveTo(9.1,-22,15.6,-15.6).curveTo(22,-9.1,22,0).curveTo(22,9.1,15.6,15.6).curveTo(9.1,22,0,22).curveTo(-9.1,22,-15.6,15.6).closePath();
	this.shape_5.setTransform(26,26);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.beginFill("#000000").beginStroke().moveTo(-18.4,18.4).curveTo(-26,10.7,-26,0).curveTo(-26,-10.7,-18.4,-18.4).curveTo(-10.7,-26,0,-26).curveTo(10.7,-26,18.4,-18.4).curveTo(26,-10.7,26,0).curveTo(26,10.7,18.4,18.4).curveTo(10.7,26,0,26).curveTo(-10.7,26,-18.4,18.4).closePath().moveTo(-15.6,-15.6).curveTo(-22,-9.1,-22,0).curveTo(-22,9.1,-15.6,15.6).curveTo(-9.1,22,0,22).curveTo(9.1,22,15.6,15.6).curveTo(22,9.1,22,0).curveTo(22,-9.1,15.6,-15.6).curveTo(9.1,-22,0,-22).curveTo(-9.1,-22,-15.6,-15.6).closePath();
	this.shape_6.setTransform(26,26);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Synmol1, new cjs.Rectangle(0,0,52,52), null);


(lib.Symbol2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.beginFill("#FFFFFF").beginStroke().moveTo(0.3,3.5).lineTo(0.3,3.3).lineTo(0.4,3.3).lineTo(0.8,3.2).lineTo(1,2.9).lineTo(1,2.5).lineTo(1,0.9).lineTo(0.9,-0.1).lineTo(0.6,-0.4).lineTo(0.3,-0.5).lineTo(-0.3,-0.4).lineTo(-0.8,0.1).lineTo(-0.8,2.5).lineTo(-0.8,3).lineTo(-0.6,3.2).lineTo(-0.2,3.3).lineTo(-0.2,3.5).lineTo(-2.4,3.5).lineTo(-2.4,3.3).lineTo(-1.9,3.2).lineTo(-1.7,3).lineTo(-1.7,2.5).lineTo(-1.7,-1.6).lineTo(-1.7,-2.5).lineTo(-1.8,-2.8).lineTo(-2.1,-2.8).lineTo(-2.4,-2.8).lineTo(-2.4,-2.9).lineTo(-1.1,-3.5).lineTo(-0.8,-3.5).lineTo(-0.8,-0.2).curveTo(-0.3,-0.8,-0,-1).lineTo(0.6,-1.1).curveTo(1,-1.1,1.2,-0.9).curveTo(1.5,-0.7,1.7,-0.3).lineTo(1.8,0.9).lineTo(1.8,2.5).lineTo(1.9,3).lineTo(2,3.2).lineTo(2.4,3.3).lineTo(2.4,3.5).closePath();
	this.shape.setTransform(33.4,39.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-0.9,2.2).lineTo(-1.2,2.2).lineTo(-1.4,2.3).lineTo(-1.5,2.3).lineTo(-1.5,0.7).lineTo(-1.4,0.7).curveTo(-1.2,1.4,-0.8,1.7).curveTo(-0.4,2.1,0,2.1).curveTo(0.4,2.1,0.6,1.9).curveTo(0.8,1.7,0.8,1.4).curveTo(0.8,1.1,0.6,0.8).lineTo(-0.4,0.3).curveTo(-1.1,-0.1,-1.3,-0.4).curveTo(-1.5,-0.7,-1.5,-1.1).curveTo(-1.5,-1.6,-1.2,-2).curveTo(-0.8,-2.4,-0.2,-2.4).lineTo(0.5,-2.3).lineTo(0.8,-2.2).lineTo(0.9,-2.2).lineTo(1,-2.4).lineTo(1.2,-2.4).lineTo(1.2,-0.9).lineTo(1,-0.9).curveTo(0.8,-1.6,0.5,-1.8).curveTo(0.3,-2.1,-0.2,-2.1).curveTo(-0.5,-2.1,-0.8,-1.9).curveTo(-0.8,-1.9,-0.9,-1.8).curveTo(-0.9,-1.8,-0.9,-1.7).curveTo(-0.9,-1.7,-1,-1.6).curveTo(-1,-1.6,-1,-1.5).curveTo(-1,-1.2,-0.8,-1).curveTo(-0.7,-0.8,-0.2,-0.6).lineTo(0.5,-0.3).curveTo(1.5,0.2,1.5,1).curveTo(1.5,1.6,1.1,2).curveTo(0.6,2.4,0,2.4).lineTo(-0.9,2.2).closePath();
	this.shape_1.setTransform(29,41.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.beginFill("#FFFFFF").beginStroke().moveTo(1,2.3).lineTo(1,1.4).lineTo(0.1,2.2).curveTo(-0.2,2.3,-0.6,2.3).curveTo(-0.9,2.3,-1.3,2.1).curveTo(-1.5,1.8,-1.6,1.5).lineTo(-1.7,0.6).lineTo(-1.7,-1.4).lineTo(-1.8,-1.9).lineTo(-2,-2.1).lineTo(-2.5,-2.1).lineTo(-2.5,-2.3).lineTo(-0.9,-2.3).lineTo(-0.9,0.6).curveTo(-0.9,1.3,-0.7,1.5).curveTo(-0.5,1.7,-0.2,1.7).lineTo(0.3,1.5).lineTo(1,1).lineTo(1,-1.5).curveTo(0.9,-1.8,0.8,-2).curveTo(0.7,-2.2,0.2,-2.1).lineTo(0.2,-2.3).lineTo(1.8,-2.3).lineTo(1.8,0.4).lineTo(1.8,1.4).lineTo(1.9,1.6).lineTo(2.1,1.6).lineTo(2.4,1.5).lineTo(2.5,1.7).lineTo(1.1,2.3).closePath();
	this.shape_2.setTransform(24.5,41.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-2.4,3.4).lineTo(-2.4,3.2).lineTo(-2.2,3.2).lineTo(-1.8,3.1).lineTo(-1.6,2.9).lineTo(-1.6,2.3).lineTo(-1.6,-1.9).lineTo(-1.6,-2.5).lineTo(-1.7,-2.7).lineTo(-1.9,-2.7).lineTo(-2.3,-2.6).lineTo(-2.3,-2.8).lineTo(-0.9,-3.4).lineTo(-0.8,-3.4).lineTo(-0.8,-2.3).curveTo(-0.4,-2.9,-0,-3.1).curveTo(0.3,-3.4,0.7,-3.4).curveTo(1.4,-3.4,1.8,-2.9).curveTo(2.4,-2.2,2.4,-1.2).curveTo(2.4,-0,1.7,0.7).curveTo(1.1,1.4,0.3,1.4).lineTo(-0.3,1.3).lineTo(-0.8,1).lineTo(-0.8,2.3).lineTo(-0.7,2.9).lineTo(-0.5,3.1).lineTo(-0,3.2).lineTo(-0,3.4).closePath().moveTo(-0.1,-2.6).lineTo(-0.8,-2).lineTo(-0.8,-0.4).lineTo(-0.7,0.4).curveTo(-0.7,0.6,-0.3,0.9).curveTo(-0.1,1.1,0.3,1.1).curveTo(0.8,1.1,1.1,0.7).curveTo(1.5,0.2,1.5,-0.7).curveTo(1.5,-1.7,1,-2.3).curveTo(0.7,-2.7,0.3,-2.7).lineTo(-0.1,-2.6).closePath();
	this.shape_3.setTransform(19.3,42.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.beginFill("#FFFFFF").beginStroke().moveTo(-7.2,8).lineTo(-7.2,7.5).lineTo(-6.6,7.5).curveTo(-5.5,7.5,-5.1,6.9).curveTo(-4.9,6.5,-4.9,5.2).lineTo(-4.9,-5.2).curveTo(-4.9,-6.6,-5.2,-7).curveTo(-5.6,-7.5,-6.6,-7.5).lineTo(-7.2,-7.5).lineTo(-7.2,-8).lineTo(-0.3,-8).curveTo(1.6,-8,2.8,-7.7).curveTo(4.5,-7.2,5.5,-6.2).curveTo(6.4,-5.1,6.4,-3.7).curveTo(6.4,-2.5,5.7,-1.6).curveTo(5,-0.6,3.5,-0.1).curveTo(5.2,0.2,6,1).curveTo(7.1,2.1,7.1,3.6).curveTo(7.2,4.8,6.4,5.9).curveTo(5.6,7,4.3,7.4).curveTo(3,8,0.4,8).closePath().moveTo(-2.6,0.3).lineTo(-2.6,6.8).curveTo(-1.3,7.1,0.1,7.1).curveTo(2.2,7.1,3.3,6.2).curveTo(4.4,5.2,4.4,3.8).curveTo(4.5,2.9,3.9,2).curveTo(3.4,1.1,2.3,0.7).curveTo(1.2,0.2,-0.5,0.2).lineTo(-1.8,0.2).lineTo(-2.6,0.3).closePath().moveTo(-2.6,-6.9).lineTo(-2.6,-0.8).lineTo(-1.6,-0.7).lineTo(-0.4,-0.7).curveTo(1.3,-0.6,2.2,-1).curveTo(3,-1.4,3.5,-2.1).curveTo(3.9,-2.9,4,-3.8).curveTo(4,-5.2,2.8,-6.2).curveTo(1.7,-7.2,-0.5,-7.1).curveTo(-1.7,-7.1,-2.6,-6.9).closePath();
	this.shape_4.setTransform(25.1,25.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.beginFill("#666666").beginStroke().moveTo(-15.6,15.6).curveTo(-22,9.1,-22,0).curveTo(-22,-9.1,-15.6,-15.6).curveTo(-9.1,-22,0,-22).curveTo(9.1,-22,15.6,-15.6).curveTo(22,-9.1,22,0).curveTo(22,9.1,15.6,15.6).curveTo(9.1,22,0,22).curveTo(-9.1,22,-15.6,15.6).closePath();
	this.shape_5.setTransform(26,26);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.beginFill("#000000").beginStroke().moveTo(-18.4,18.4).curveTo(-26,10.7,-26,0).curveTo(-26,-10.7,-18.4,-18.4).curveTo(-10.7,-26,0,-26).curveTo(10.7,-26,18.4,-18.4).curveTo(26,-10.7,26,0).curveTo(26,10.7,18.4,18.4).curveTo(10.7,26,0,26).curveTo(-10.7,26,-18.4,18.4).closePath().moveTo(-15.6,-15.6).curveTo(-22,-9.1,-22,0).curveTo(-22,9.1,-15.6,15.6).curveTo(-9.1,22,0,22).curveTo(9.1,22,15.6,15.6).curveTo(22,9.1,22,0).curveTo(22,-9.1,15.6,-15.6).curveTo(9.1,-22,0,-22).curveTo(-9.1,-22,-15.6,-15.6).closePath();
	this.shape_6.setTransform(26,26);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(0,0,52,52), null);


// stage content:
(lib.t = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.a.addEventListener("mousedown", function() {
			console.log("push A")
			if (typeof toggleA === "function") {
				toggleA();
			}
		});
		this.b.addEventListener("mousedown", function() {
			console.log("push B")
			if (typeof toggleB === "function") {
				toggleB();
			}
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// レイヤー 1
	this.a = new lib.Synmol1();
	this.a.parent = this;
	this.a.setTransform(144.9,45,1,1,0,0,0,23.9,23.9);

	this.b = new lib.Symbol2();
	this.b.parent = this;
	this.b.setTransform(204.9,45,1,1,0,0,0,23.9,23.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.b},{t:this.a}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(241,66.1,112,52);
// library properties:
lib.properties = {
	width: 240,
	height: 90,
	fps: 60,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;