(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
lib.ssMetadata = [];



lib.updateListCache = function (cacheList) {		
	for(var i = 0; i < cacheList.length; i++) {		
		if(cacheList[i].cacheCanvas)		
			cacheList[i].updateCache();		
	}		
};		

lib.addElementsToCache = function (textInst, cacheList) {		
	var cur = textInst;		
	while(cur != exportRoot) {		
		if(cacheList.indexOf(cur) != -1)		
			break;		
		cur = cur.parent;		
	}		
	if(cur != exportRoot) {		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != cur) {		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {		
		cur = textInst;		
		while(cur != exportRoot) {		
			cacheList.push(cur);		
			cur = cur.parent;		
		}		
	}		
};		

lib.gfontAvailable = function(family, totalGoogleCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

	loadedGoogleCount++;		
	if(loadedGoogleCount == totalGoogleCount) {		
		lib.updateListCache(gFontsUpdateCacheList);		
	}		
};		

lib.tfontAvailable = function(family, totalTypekitCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

	loadedTypekitCount++;		
	if(loadedTypekitCount == totalTypekitCount) {		
		lib.updateListCache(tFontsUpdateCacheList);		
	}		
};
// symbols:



// stage content:
(lib.test = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.text = new cjs.Text("sans\nline2", "24px 'Arial'", "#0000FF");
	this.text.lineHeight = -23;
	this.text.lineWidth = 100;
	this.text.parent = this;
	this.text.setTransform(133,258.4);

	this.text_1 = new cjs.Text("Oswald\n(but not loaded in Creap.js)", "normal 400 20px 'Oswald'", "#0000FF");
	this.text_1.lineHeight = 34;
	this.text_1.lineWidth = 210;
	this.text_1.parent = this;
	this.text_1.setTransform(23,131.7);
	if(!lib.properties.webfonts['Oswald']) {
		lib.webFontTxtInst['Oswald'] = lib.webFontTxtInst['Oswald'] || [];
		lib.webFontTxtInst['Oswald'].push(this.text_1);
	}

	this.text_2 = new cjs.Text("Gloria Hallelujah", "normal 400 24px 'Gloria Hallelujah'", "#0000FF");
	this.text_2.lineHeight = 50;
	this.text_2.lineWidth = 252;
	this.text_2.parent = this;
	this.text_2.setTransform(23,68.7);
	if(!lib.properties.webfonts['Gloria Hallelujah']) {
		lib.webFontTxtInst['Gloria Hallelujah'] = lib.webFontTxtInst['Gloria Hallelujah'] || [];
		lib.webFontTxtInst['Gloria Hallelujah'].push(this.text_2);
	}

	this.text_3 = new cjs.Text("Alegreya", "normal 400 24px 'Alegreya'", "#0000FF");
	this.text_3.lineHeight = 32;
	this.text_3.lineWidth = 100;
	this.text_3.parent = this;
	this.text_3.setTransform(23,23.7);
	if(!lib.properties.webfonts['Alegreya']) {
		lib.webFontTxtInst['Alegreya'] = lib.webFontTxtInst['Alegreya'] || [];
		lib.webFontTxtInst['Alegreya'].push(this.text_3);
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.text_3},{t:this.text_2},{t:this.text_1},{t:this.text}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(141,181.7,256,294.5);
// library properties:
lib.properties = {
	width: 240,
	height: 320,
	fps: 60,
	color: "#FFFFFF",
	opacity: 1.00,
	webfonts: {},
	manifest: [],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;