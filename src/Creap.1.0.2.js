/*!
 * Creap.js - v1.0.2
 * 
 * @requires pixi.js v4.4.3 | 4.5.1
 * @requires howler.core.js v2.0.1
 * @requires Ease.js
 * @author makazu.mori@gmail.com (tawaship)
 * @copylight (c) tawaship
 * @license MIT License
 */

var createjs, Creap, playSound, exportRoot, stage;

console.log('\r\n%c  Creap.js %c v1.0.2  %c\r\n\r\n', 'color: #FFF; background: #06F; padding: 5px; border-radius:12px 0 0 12px;', 'color: #FFF; background: #F33; padding: 5px;  border-radius:0 12px 12px 0;', 'padding: 5px;');

(function() {
	var Emitter, EmitterCreapData;
	var isAccurateTarget = true;
	var isAndroid = navigator.userAgent.match(/Android/i) !== null;
	var isIos = navigator.userAgent.match(/iPhone/i) !== null || navigator.userAgent.match(/iPad/i) !== null || navigator.userAgent.match(/iPod/i) !== null;
	var isMobile = isAndroid || isIos;
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var CPJSON = '.cp.json';
	var DEFAULT_COLOR = '#000000';
	var EVENT = {
		/**
		 * Fires when mousedown or touchstart, on the instance.
		 * @event createjs~DisplayObject.mousedown
		 */
		mousedown: 'mousedown',
		/**
		 * Fires when mouseup or touchend, after createjs~DisplayObject.mousedown fires.
		 * @event createjs~DisplayObject.pressup
		 */
		pressup: 'pressup',
		/**
		 * Fires when mousemove or touchmove, after createjs~DisplayObject.mousedown fires.
		 * @event createjs~DisplayObject.pressmove
		 */
		pressmove: 'pressmove',
		pointerdown: 'pointerdown',
		pointerup: 'pointerup',
		pointermove: 'pointermove',
		pointerupoutside: 'pointerupoutside',
		/**
		 * Fires when click on the instance.
		 * @event createjs~DisplayObject.click
		 */
		click: 'click',
		/**
		 * Fires when the loop of sound finishes.
		 * @event createjs.Sounc.complete
		 */
		complete: 'complete',
		/**
		 * Fires when the sound is played to the end.
		 * @event createjs.Sounc.end
		 */
		end: 'end',
		/*!
		 * Fires when the instance get on the display list.
		 * @event createjs~DisplayObject.added
		 */
		//added: 'added'
	};
	
	var TAG_OFF = '_off';
	var TAG_PX = 'px';
	var TAG_COLOR = '#';
	var TAG_COMMA = ',';
	
	var CREAP_EVENT = {
		/*!
		 * Fires when the instance first get on the display list.
		 * @event Creap.attach
		 */
		attach: 'attach',
		/**
		 * Fires when call new Creap().
		 * @event Creap.initialized
		 */
		initialized: 'initialized',
		/**
		 * Fires when call Creap#start.
		 * @event Creap.started
		 */
		started: 'started'
	};
	
	var PRE_MOUSE_EVENT = {
		mousedown: '_' + EVENT.mousedown,
		pressup: '_' + EVENT.pressup,
		pressmove: '_' + EVENT.pressmove,
		click: '_' + EVENT.click
	};
	
	/**
	 * Play sound.
	 * 
	 * @function playSound
	 * @param id {string} Linkage name of sound file in createjs content.
	 * @param loop {number} Number of loops. If it is negative value, loop infinitely.
	 * @return {createjs.Sound}
	 */
	playSound = function(id, loop) {
		return createjs.Sound.play(id, 0, 0, 0, loop);
	};
	
	(function() {
		/*!
		 * @function Emitter~addListener
		 * @param type {object} The object that contains callbacks.
		 * @param type {string} Event type.
		 * @param func {function} Callback when the event fires.
		 */
		function addListener(events, type, func) {
			events[type] = events[type] || [];
			if (events[type].indexOf(func) > -1) {
				return;
			}
			events[type].push(func);
		}
		
		/*!
		 * @function Emitter~removeListener
		 * @param type {object} The object that contains callbacks.
		 * @param type {string} Registered event type.
		 * @param func {function} Regitered callback.
		 */
		function removeListener(events, type, func) {
			var idx;
			events[type] = events[type] || [];
			if ((idx = events[type].indexOf(func)) === -1) {
				return;
			}
			events[type].splice(idx, 1);
		}
		
		/*!
		 * @function  Emitter~fire
		 * @param e {string|createjs.Event} Event type or Event object.
		 */
		function fire(events, e) {
			var list;
			
			if (!(e instanceof createjs.Event)) {
				e = new createjs.Event(e);
			}
			
			list = events[e.type] || [];
			for (var i = 0; i < list.length; i++) {
				list[i].call(this, e);
			}
			return this;
		}
		
		/*!
		 * @constructor Emitter~CreapData
		 * @classdesc Class related to system data of Emitter.
		 * @param obj {createjs.MovieClip} Instance that owns event.
		 */
		(EmitterCreapData = function(obj) {
			/*!
			 * Instance that owns event.
			 * 
			 * @member Emitter~CreapData#obj {Emitter|createjs~DisplayObject}
			 */
			this.target = obj;
			this.events = {};
			this.systemEvents = {};
		}).prototype = Object.defineProperties({}, {
			/*!
			 * Registers event managed by the system.
			 * 
			 * @function Emitter~CreapData#on
			 * @param type {string} Event type.
			 * @param func {function} Callback when the event fires.
			 * @return {Emitter} Return a itself (can use method chaining).
			 */
			on: {
				value: function(type, func) {
					addListener(this.systemEvents, type, func);
					return this.target;
				}
			},
			/*!
			 * Unregisters event managed by the system.
			 * 
			 * @function Emitter~CreapData#off
			 * @param type {string} Registered event type.
			 * @param func {function} Regitered callback.
			 * @return {Emitter} Return a itself (can use method chaining).
			 */
			off: {
				value: function(type, func) {
					removeListener(this.systemEvents, type, func);
					return this.target;
				}
			},
			/*!
			 * Fires event.
			 * 
			 * @function Emitter#emit
			 * @param e {string|createjs.Event} Event type or Event object.
			 * @return {Emitter} Return a itself (can use method chaining).
			 */
			emit: {
				value: function(e) {
					fire.call(this.target, this.systemEvents, e);
					return this.target;
				}
			},
		});
		
		/**
		 * <span style="color: #F00;">This constructor is accessible only in Creap.js.</span>
		 * 
		 * @constructor Emitter
		 * @classdesc Class related to event emission.
		 * @abstract
		 */
		(Emitter = function() {
			this._creap = this._creap || new EmitterCreapData(this);
		}).prototype = Object.defineProperties({}, {
			constructor: {
				value: Emitter
			},
			/**
			 * Registers event.
			 * 
			 * @function Emitter#on
			 * @see Emitter#addEventListener
			 * @param type {string} Event type.
			 * @param func {function} Callback when the event fires.
			 * @return {Emitter} Return a itself (can use method chaining).
			 */
			on: {
				value: function(type, func) {
					addListener(this._creap.events, type, func);
					return this;
				}
			},
			/**
			 * Unregisters event.
			 * 
			 * @function Emitter#off
			 * @see Emitter#removeEventListener
			 * @param type {string} Registered event type.
			 * @param func {function} Regitered callback.
			 * @return {Emitter} Return a itself (can use method chaining).
			 */
			off: {
				value: function(type, func) {
					removeListener(this._creap.events, type, func);
					return this;
				}
			},
			/**
			 * Fires event.
			 * 
			 * @function Emitter#emit
			 * @see Emitter#dispatchEvent
			 * @param e {string|createjs.Event} Event type or Event object.
			 * @return {Emitter} Return a itself (can use method chaining).
			 */
			emit: {
				value: function(e) {
					fire.call(this, this._creap.events, e);
					return this;
				}
			},
			/**
			 * Alias of on().
			 * 
			 * @function Emitter#addEventListener
			 * @see Emitter#on
			 * @param type {string} Event type.
			 * @param func {function} Callback when the event fires.
			 * @return {Emitter} Return a itself (can use method chaining).
			 */
			addEventListener: {
				value: function(type, func) {
					return this.on(type, func);
				}
			},
			/**
			 * Alias of off().
			 * 
			 * @function Emitter#removeEventListener
			 * @see Emitter#off
			 * @param type {string} Registered event type.
			 * @param func {function} Regitered callback.
			 * @return {Emitter} Return a itself (can use method chaining).
			 */
			removeEventListener: {
				value: function(type, func) {
					return this.off(type, func);
				}
			},
			/**
			 * Unregisters all applicable events.
			 * 
			 * @function Emitter#removeAllEventListeners
			 * @param [type=''] {string} Registered event type. If it regarded as false, unregister all events.
			 * @return {Emitter} Return a itself (can use method chaining).
			 */
			removeAllEventListeners: {
				value: function(type) {
					type = type || '';
					if (type) {
						this._creap.events[type] = [];
					} else {
						this._creap.events = {};
					}
					return this;
				}
			},
			/**
			 * Alias of emit().
			 * 
			 * @function Emitter#dispatchEvent
			 * @see Emitter#emit
			 * @param e {string|createjs.Event} Event type or Event object.
			 * @return {Emitter} Return a itself (can use method chaining).
			 */
			dispatchEvent: {
				value: function(e) {
					return this.emit(e);
				}
			}
		});
		
	})();
	
	/**
	 * @namespace Creap
	 */
	Creap = (function() {
		var Creap, Option, Application, Content, ReplaceData, SsJsonParser;
		
		/*
		var TextureView;
		var atlasListContainer;
		
		function createTextureView(resources) {
			if (!this.useTextureView) {
				return;
			}
			
			atlasListContainer = atlasListContainer || (function() {
				var c = document.createElement('div');
				c.style.position = 'absolute';
				c.style.top = 0;
				c.style.width = innerWidth - 20 + TAG_PX;
				this.container.appendChild(c);
				return  c;
			}).bind(this)();
			atlasListContainer.appendChild((new TextureView(resources)).container);
		}
		
		(TextureView = function(resources) {
			var app, box, head, btn, pContainer, sContainer, sprite, text;
			var row = cell = 0;
			var i, j;
			var container = document.createElement('div');
			
			var width = innerWidth - 20;
			var size =  50;
			var fontSize = 6;
			var space = size + fontSize * 2;
			var maxCellNum = width / size - 1;
			
			for (i in resources) {
				box = document.createElement('div');
				row = cell = 0;
				pContainer = new PIXI.Container();
				
				if (resources[i].data instanceof Image) {
					var idx = i.lastIndexOf('_image');
					if (resources[i.substr(0, idx)]) {
						continue;
					}
					sContainer = new PIXI.Container();
					sContainer.x = cell * size;
					sContainer.y = row * space;
					pContainer.addChild(sContainer);
					
					sprite = new PIXI.Sprite(resources[i].texture);
					sprite.scale.x = sprite.scale.y = size / (sprite.width > sprite.height ? sprite.width : sprite.height);
					sprite.y = fontSize * 2;
					sContainer.addChild(sprite);
					
					text = new PIXI.Text(i, {font: fontSize + 'pt', fill: 'white'});
					sContainer.addChild(text);
				} else {
					for (j in resources[i].textures) {
						sContainer = new PIXI.Container();
						sContainer.x = cell * size;
						sContainer.y = row * space;
						pContainer.addChild(sContainer);
						
						sprite = new PIXI.Sprite(resources[i].textures[j]);
						sprite.scale.x = sprite.scale.y = size / (sprite.width > sprite.height ? sprite.width : sprite.height);
						sprite.y = fontSize * 2;
						sContainer.addChild(sprite);
						
						text = new PIXI.Text(j, {font: fontSize + 'pt', fill: 'white'});
						sContainer.addChild(text);
						
						if (++cell > maxCellNum) {
							cell = 0;
							row++;
						}
					}
				}
				
				app = new PIXI.Application(width, ++row * space);
				app.view.style.display = 'none';
				app.stage.addChild(pContainer);
				
				head = document.createElement('div');
				head.style.textAlign ='right';
				btn = head.appendChild(document.createElement('button'));
				btn.appendChild(document.createTextNode(i));
				btn.addEventListener('click', (function(canvas, head) {
					return function() {
						if (canvas.style.display !== 'none') {
							canvas.style.display = 'none';
							head.style.background = null;
						} else {
							canvas.style.display = 'block';
							head.style.background = '#FF0000';
						}
					}
				})(app.view, head));
				box.appendChild(head);
				box.appendChild(app.view);
				container.appendChild(box);
				app.stop();
				app.render();
				app.ticker.stop();
			}
			
			Object.defineProperties(this, {
				container: {
					value: container
				},
				resources: {
					value: resources
				}
			});
		}).prototype = Object.defineProperties({}, {
			constructor: {
				value: TextureView
			}
		});
		*/
		
		(function() {
			function encodeHTMLForm(data) {
				var params = [];
				for(var i in data) {
					params.push(encodeURIComponent(i).replace(/%20/g, '+') + '=' + encodeURIComponent(data[i]).replace(/%20/g, '+'));
				}
				return params.join('&');
			}
			
			/**
			 * Create content data from js file built by animate CC.
			 * 
			 * @constructor Creap.Content
			 * @classdesc Class related to content data for Creap.js.
			 * @param lib {string} Name of library object. (Maybe, named 'lib')
			 * @param root {string} Name of the root object in library object.
			 * @param images {string} Name of images object. (Maybe, named 'images')
			 * @param ss {string} Name of sprite sheet object. (Maybe, named 'ss')
			 */
			(Content = function(lib, root, images, ss) {
				var s; // shortcut
				
				this._lib = window[lib];
				this._root = window[lib][root];
				this._img = window[images];
				this._ss = window[ss];
				
				this._images = {};
				this._sounds = {};
				this._ssMetadata = {};
				
				this._relatedContents = [this];
				
				this._defineVars = {};
				this._replaceMovieClips = {};
				
				s = this._lib.ssMetadata;
				for (i = 0; i < s.length; i++) {
					this._ssMetadata[s[i].name] = true;
				}
				
				s = this._lib.properties.manifest;
				for (i = 0; i < s.length; i++) {
					if (s[i].id in this._ssMetadata) {
						this._images[s[i].id] = s[i].src.replace(/(\.gif|\.png|\.jpg)($|\?.*)/, CPJSON + '$2');
					} else {
						if (s[i].src.match(/(gif|png|jpg)/)) {
							this._images[s[i].id] = s[i].src.replace(/(gif|png|jpg)($|\?.*)/, '$1$2');
						} else {
							this._sounds[s[i].id] = s[i].src.replace(/(mp3|wav)($|\?.*)/, '$1$2');
						}
					}
				}
				
				window[lib] = {};
				window[images] = {};
				window[ss] = {};
			}).prototype = Object.defineProperties({}, {
				constructor: {
					value: Content
				},
				/**
				 * Create json file for sprite sheet image.<br />
				 * This json file is like a created by SpritePacker.<br />
				 * <span style="color: #F00;">This function uses XMLHttpRequest to load './ssJsonMaker.php'.</span><br />
				 * <span style="color: #F00;">This function runs synchronously. In other words, it stops processing until all the json files are created.</span>
				 * 
				 * @function Creap.Content#createJson
				 * @return {Creap.Content} Return a itself (can use method chaining).
				 */
				createJson: {
					value: function() {
						var list = SsJsonParser.parse(this._lib.ssMetadata);
						var xhr;
						for (var i = 0; i < list.length; i++) {
							xhr = new XMLHttpRequest();
							xhr.open('POST', './ssJsonMaker.php', false);
							xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
							xhr.send(encodeHTMLForm(list[i]));
						}
						
						return this;
					}
				},
				/**
				 * Unregister images in the content.<br />
				 * Used when there is an unnecessary image as a result of executing replaceMovieClip.
				 * 
				 * @function Creap.Content#disabledImages
				 * @see Creap.Content#replaceClips
				 * @param list {array<string>} Values of 'id' in object that is registered lib.properies.manifest.
				 * @return {Creap.Content} Return a itself (can use method chaining).
				 */
				disabledImages: {
					value: function(list) {
						list = list || [];
						for (var i = 0; i <list.length; i++) {
							if (!(list[i] in this._images)) {
								return;
							}
							
							delete(this._images[list[i]]);
						}
						return this;
					}
				},
				/**
				 * Define variables to instance of root object.<br />
				 * Timing of definition is when this content passed to constructor of Creap.Application.
				 * 
				 * @function Creap.Content#defineVars
				 * @param obj {object<string, *>}
				 *     key: Name of variable.<br >
				 *     value: Value of variable.
				 * @return {Creap.Content} Return a itself (can use method chaining).
				 */
				defineVars: {
					value: function(obj) {
						obj = obj || {};
						for (var i in obj) {
							this._defineVars[i] = obj[i];
						}
						
						return this;
					}
				},
				/**
				 * Define images to the content.<br />
				 * If already defined, replace that definition.
				 * 
				 * @function Creap.Content#defineImages
				 * @param obj {object<string, string>}
				 *     key: Value of 'id' in object that is registered lib.properies.manifest.<br >
				 *     value: Images URL.
				 * @return {Creap.Content} Return a itself (can use method chaining).
				 */
				defineImages: {
					value: function(obj) {
						obj = obj || {};
						for (var i in obj) {
							if (i in this._ssMetadata) {
								this._images[i] = obj[i].replace(/(\.gif|\.png|\.jpg)($|\?.*)/, CPJSON + '$2');
							} else {
								this._images[i] = obj[i];
							}
						}
						
						return this;
					}
				},
				/**
				 * Define sounds to the content.<br />
				 * If already defined, replace that definition.
				 * 
				 * @function Creap.Content#defineSounds
				 * @param obj {object<string, string>}
				 *     key: Value of 'id' in object that is registered lib.properies.manifest.<br >
				 *     value: Sound URL.
				 * @return {Creap.Content} Return a itself (can use method chaining).
				 */
				defineSounds: {
					value: function(obj) {
						obj = obj || {};
						for (var i in obj) {
							this._sounds[i] = obj[i];
						}
						
						return this;
					}
				},
				/**
				 * Replace definitions in the content to one in other content.
				 * 
				 * @function Creap.Content#replaceClips
				 * @see Creap.ReplaceData
				 * @param obj {object<string, Creap.ReplaceData>}
				 *     key: Name of definition to change in content.<br />
				 *     value: Data related to replace in other content.<br />
				 * @return {Creap.Content} Return a itself (can use method chaining).
				 */
				replaceClips: {
					value: function(obj) {
						obj = obj || {};
						for (var i in obj) {
							if (!(obj[i] instanceof ReplaceData)) {
								continue;
							}
							this._replaceMovieClips[i] = obj[i];
						}
						
						return this;
					}
				}
			});
		})();
		
		(function() {
			/*!
			 * @function Creap.Application~initialize
			 * @this Creap.Application
			 * @fires Creap.initialized
			 * @param p {Creap.Content} Target content.
			 * @param c {DOMElement} The parent element of the canvas that displays the content.
			 * @param w {number} Canvas width.
			 * @param upr {bool} Whether render bitmaps before starting the content.
			 * @param ugl {bool} Whether use webGL render.
			 */
			function initialize(p, c, w, upr, ugl) {
				var s; //shortcut
				var h = p._lib.properties.height * w / p._lib.properties.width;
				var app = new PIXI.Application(w, h, {transparent: true}, !ugl);
				var ticker = app.ticker;
				var container = c.appendChild(document.createElement('div'));
				var view = app.view;
				var loader = new PIXI.loaders.Loader();
				var i, j;
				var count = 0;
				var ssMetadata = {};
				var images = {};
				var sounds = {};
				var audios = {}
				
				stage = app.stage;
				
				this.content = p;
				this.container = c;
				this.wrapper = container;
				this.app = app;
				this.view = view;
				this.app.stage.scale.x = this.app.stage.scale.y = this.scale = w / p._lib.properties.width
				//this.useTextureView = false;
				
				for (i in p._replaceMovieClips) {
					if (!((s = this.content._replaceMovieClips[i]) instanceof ReplaceData)) {
						continue;
					}
					
					if (!(s._content instanceof Content) || !(i in p._lib) || !(s._name in s._content._lib)) {
						continue;
					}
					
					for (j in s._content._ssMetadata) {
						p._ssMetadata[j] = s._content._ssMetadata[j];
					}
					
					for (j in s._content._images) {
						p._images[j] = s._content._images[j];
					}
					
					p._relatedContents.push(s._content);
					p._lib[i] = s._content._lib[s._name];
				}
				
				for (i in p._sounds) {
					new Howl({
						src: p._sounds[i],
						onload: (function(v) {
							return function() {
								createjs.Sound._creapStatic.register(v, this);
							}
						})(i),
						pool: 100
					});
				}
				
				container.style.position = 'relative';
				container.appendChild(view);
				app.stop();
				
				app.ticker.speed = p._lib.properties.fps / 60;
				app.ticker.addOnce(function() {
					app.stage.removeChildren();
				});
				
				// Load resources
				for (i in p._images) {
					++count;
					loader.add(i, p._images[i], {
						crossOrigin: true
					});
				}
				
				if (count) {
					loader.load((function(loader, resources) {
						var s; // shortcut
						//createTextureView.call(this, resources);
						for (i in resources) {
							for (j = 0; j < p._relatedContents.length; j++) {
								s = p._relatedContents[j];
								s._ss[i] = s._img[i] = resources[i];
							}
						}
						
						if (upr) {
							for (i = 0; i < p._relatedContents.length; i++) {
								s = p._relatedContents[i];
								for (j in s._lib) {
									if (h.prototype instanceof createjs.Sprite || h.prototype instanceof createjs.Bitmap) {
										h = new s._lib[j]();
										h.x = 99999;
										h._creap.emit(CREAP_EVENT.attach);
										stage.addChild(h);
									}
								}
							}
						}
						
						app.ticker.update();
						this.emit(CREAP_EVENT.initialized);
					}).bind(this));
				} else {
					app.ticker.update();
					setTimeout((function() {
						this.emit(CREAP_EVENT.initialized);
					}).bind(this), 100);
				}
			}
			
			/**
			 * @constructor Creap.Option
			 * @classdesc Class related to data of creap option.
			 * @param [width=Value of "lib.properties.width"] {number} Canvas width.
			 * @param [usePreRender=true] {bool} Whether render bitmaps before starting the content.
			 * @param [useWebGL=true] {bool} Whether use webGL render.
			 * @param [isAccurateTarget=true] {bool} Whether set accurate target when fires mouse/touch event.
			 */
			(Option = function(width, usePreRender, useWebGL, isAccurateTarget) {
				/**
				 * Canvas width.
				 * 
				 * @member Creap.Option#width {number}
				 * @default Value of "lib.properties.width"
				 */
				this.width = width || 0;
				
				/**
				 * Whether render bitmaps before starting the content.
				 * 
				 * @member Creap.Option#usePreRender {bool}
				 * @default true
				 */
				this.usePreRender = usePreRender === false ? false : true;
				
				/**
				 * Whether use webGL render.
				 * 
				 * @member Creap.Option#useWebGL {bool}
				 * @default true
				 */
				this.useWebGL = useWebGL === false ? false : true;
				
				/**
				 * Whether set accurate target when fires mouse/touch event.<br />
				 * <br />
				 * When code like the following...
				 * ```js
				 * exportRoot.addEventListener("mousedown", function(e) {
				 *     console.log(e.currentTarget);
				 *     console.log(e.target);
				 * })
				 * ```
				 * <li>isAccurateTarget = true;</li>
				 * <img src="../img/accurateTrue.jpg" />
				 * ```js
				 * console.log(e.currentTarget); // exportRoot
				 * console.log(e.target); // Bitmap
				 * ```
				 * This specification is the same as createjs, but performance tends to decline instead.<br />
				 * It is especially noticeable when many mousemove event fires on the browser for PC.<br />
				 * 
				 * <li>isAccurateTarget = false;</li>
				 * <img src="../img/accurateFalse.jpg" />
				 * ```js
				 * console.log(e.currentTarget); // exportRoot
				 * console.log(e.target); // exportRoot
				 * ```
				 * If you don't need an accurate target, please use this setting.<br />
				 * <br />
				 * In createjs, the conditions under which pressmove, pressup events can fire.<br />
				 * <li>"e.currentTarget" that when the mousedown event fires. ( = instance with the event listener)</li>
				 * <li>"e.target" that when the mousedown event fires.</li>
				 * <li>Instance containing "e.target" when the mousedown event fires.</li>
				 * <br />
				 * Therefore, if isAccurateTarget is false, please be aware that pressmove and pressup may not behave as expected.
				 * 
				 * @member Creap.Option#isAccurateTarget {bool}
				 * @default true
				 */
				this.isAccurateTarget = isAccurateTarget === false ? false : true;
			});
			
			/**
			 * Create an application from instance of Creap.Content.
			 * 
			 * @constructor Creap.Application
			 * @classdesc Plug-in created using pixi.js for playing createjs content built by animate CC.
			 * @extends Emitter
			 * @fires Creap.initialized
			 * @param content {Creap.Content} Target content.
			 * @param [container=document.body] {DOMElement} The parent element of the canvas that displays the content.
			 * @param [options=new Creap.Option()] {object|Creap.Option} Object that like instance of Creap.Option, or instance of Creap.Option.
			 */
			(Application = function(content, container, options) {
				if (!(this instanceof Application)) {
					return;
				}
				
				Emitter.call(this);
				if (!(options instanceof Option)) {
					options = options || {};
					options = new Option(options.width, options.usePreRender, options.useWebGL, options.isAccurateTarget);
				}
				
				this.isStarted = false;
				isAccurateTarget = options.isAccurateTarget;
				
				initialize.call(
					this,
					content,
					container || document.body,
					options.width || content._lib.properties.width,
					options.usePreRender,
					options.useWebGL
				);
			}).prototype = Object.defineProperties(Object.create(Emitter.prototype), {
				constructor: {
					value: Application
				},
				/**
				 * Build and start the content.
				 * 
				 * @function Creap.Application#start
				 * @fires Creap.started
				 */
				start: {
					value: function() {
						var f;
						var tappedList;
						
						if (this.isStarted) {
							return;
						}
						
						this.isStarted = true;
						exportRoot = this.root = new this.content._root();
						
						Object.defineProperties(stage, {
							scaleX: {
								get: function() {
									return this.scale.x;
								},
								set: function(v) {
									this.scale.x = v;
								}
							},
							scaleY: {
								get: function() {
									return this.scale.y;
								},
								set: function(v) {
									this.scale.y = v;
								}
							}
						});
						
						stage.interactive = true;
						
						tappedList = [];
						stage.on(EVENT.pointerdown, function(e) {
							var ne;
							var t = e.target;
							
							this.mouseX = e.data.global.x;
							this.mouseY = e.data.global.y;
							while (true) {
								
								e.currentTarget = t;
								ne = createjs.MouseEvent._creapStatic.ref(EVENT.mousedown.o, e);
								tappedList.push(t);
								t.emit(PRE_MOUSE_EVENT.mousedown, ne);
								if (t._creap.empty || t.parent === this || ne.stopped) {
									break;
								}
								
								t = t.parent;
							}
						});
						
						stage.on(EVENT.pointermove, function(e) {
							var ne, t;
							
							this.mouseX = e.data.global.x;
							this.mouseY = e.data.global.y;
							
							for (var i = 0; i < tappedList.length; i++) {
								t = tappedList[i];
								if (t._creap.empty) {
									continue;
								}
								e.currentTarget = t;
								ne = createjs.MouseEvent._creapStatic.ref(EVENT.pressmove.o, e);
								t.emit(PRE_MOUSE_EVENT.pressmove, ne);
							}
						});
						
						stage.on(EVENT.pointerup, f = function(e) {
							var ne, t;
							for (var i = 0; i < tappedList.length; i++) {
								t = tappedList[i];
								if (t._creap.empty) {
									continue;
								}
								e.currentTarget = t;
								ne = createjs.MouseEvent._creapStatic.ref(EVENT.pressmove.o, e);
								t.emit(PRE_MOUSE_EVENT.pressup, ne);
							}
							
							tappedList = [];
						});
						
						stage.on(EVENT.pointerupoutside, f);
						
						for (var i in this.content._defineVars) {
							this.root[i] = this.content._defineVars[i];
						}
						
						this.app.ticker.addOnce((function() {
							t = 0;
							this.app.stage.addChild(this.root);
							this.root._creap.exec();
							
							this.app.ticker.add((function(delta) {
								if ((t += delta) < 1) {
									return;
								}
								t -= 1;
								this.root._creap.clear();
								this.root._creap.exec();
							}).bind(this));
						}).bind(this));
						
						this.app.start();
						this.emit(CREAP_EVENT.started);
					}
				},
				/**
				 * Restart the content.
				 * 
				 * @function Creap.Application#play
				 */
				play: {
					value: function() {
						this.app.start();
					}
				},
				/**
				 * Pause the content.
				 * 
				 * @function Creap.Application#stop
				 */
				stop: {
					value: function() {
						this.app.stop();
					}
				},
				/**
				 * Display the content in full screen.
				 * 
				 * @function Creap.Application#fullScreen
				 */
				fullScreen: {
					value: function() {
						if (windowWidth / windowHeight > this.content._lib.properties.width / this.content._lib.properties.height) {
							var m = (windowWidth - windowHeight / this.view.height * this.view.width) / 2;
							this.view.style.width = windowHeight / this.content._lib.properties.height * this.content._lib.properties.width / (windowWidth - m) * 100 + '%';
							this.wrapper.style.marginLeft = m + TAG_PX;
						} else {
							this.view.style.width = '100%';
							this.wrapper.style.marginTop = (windowHeight - windowWidth / this.view.width * this.view.height) / 2 + TAG_PX;
						}
					}
				}
			});
		})();
		
		/**
		 * @constructor Creap.ReplaceData
		 * @classdesc Class related to data of replacement of definition.
		 * @param content {Creap.Content} Target content which have definition to replace.
		 * @param name {string} Name of definition to replace.
		 */
		(ReplaceData = function(content, name) {
			this._content = content;
			this._name = name;
		});
		
		(function() {
			var Size, Rect, SpriteSheet, Meta, Frames, Frame, SsJson;
			
			(Size = function(w, h) {
				this.w = w;
				this.h = h;
			});
			
			(Rect = function(x, y, w, h) {
				this.x = x;
				this.y = y;
				this.w = w;
				this.h = h;
			});
			
			(SpriteSheet = function(data, name, w, h) {
				this.frames = new Frames(data);
				this.meta = new Meta(name, w, h);
			});
			
			(Meta = function(name, w, h) {
				this.image = name;
				this.format = 'RGBA8888';
				this.size = new Size(w, h);
				this.scale = 1;
			});
			
			(Frames = function(data) {
				for (var i in data) {
					name = '_' + i;
					this[name] = new Frame(data[i]);
				}
			});
			
			(Frame = function(data) {
				this.frame = new Rect(data[0], data[1], data[2], data[3]);
				this.rotated = false;
				this.trimmed = false;
				this.spriteSourceSize = new Rect(0, 0, data[2], data[3]);
				this.sourceSize = new Size(data[2], data[3]);
			});
			
			/*!
			 * @constructor Creap~SsJsonParser~SsJson
			 * @classdesc Class related to json file for sprite sheet.
			 * @private
			 * @param name {string} Atlas name.
			 * @param data {string} Json string of sprite sheet.
			 */
			(SsJson = function(name, data) {
				/**
				 * Atlas name.
				 * 
				 * @member Creap~SsJsonParser~SsJson#name {string}
				 */
				this.name = name;
				
				/**
				 * Json string of sprite sheet.
				 * 
				 * @member Creap~SsJsonParser~SsJson#data {string}
				 */
				this.data = data;
			});
			
			/*!
			 * @constructor Creap~SsJsonParser
			 * @classdesc Class related to json file parser for sprite sheet.
			 */
			Object.defineProperties((SsJsonParser = function() {
			}), {
				/**
				 * @function Creap~SsJsonParser.parse
				 * @param ssMetadata {array} Sprite sheets data created by animate CC.
				 * @return {array<SsJsonParser~SsJson>}
				 */
				parse: {
					value: function(ssMetadata) {
						var list = [];
						for (var i = 0; i < ssMetadata.length; i++) {
							list.push(new SsJson(
								ssMetadata[i].name + CPJSON,
								JSON.stringify(new SpriteSheet(ssMetadata[i].frames, ssMetadata[i].name + '.png', 4096, 4096))
							));
						}
						
						return list;
					}
				}
			});
		})();
		
		return Object.defineProperties({}, {
			Application: {
				value: Application
			},
			Content: {
				value: Content
			},
			ReplaceData: {
				value: ReplaceData
			}
		});
	})();
	
	/**
	 * This is an emulation of the original createjs.
	 * 
	 * @namespace createjs
	 */
	createjs = (function() {
		var Timeline, DisplayObject, Sprite, MovieClip, Shape, Graphics, Bitmap, Rectangle, Tween, MultiTween, MaskTween, ScriptTween, Sound, Text, Event, MouseEvent, Touch, Prop, BindProp, PropFunctions;
		
		var TO_RAD = Math.PI / 180;
		var TO_DEG = 180 / Math.PI;
		var NONE_EASE = createjs.Ease.get(0);
		
		var CJS_MOUSE_EVENT = {
			mousedown: {
				o: EVENT.mousedown,
				p: EVENT.pointerdown
			},
			pressup: {
				o: EVENT.pressup,
				p: EVENT.pointerup
			},
			pressmove: {
				o: EVENT.pressmove,
				p: EVENT.pointermove
			},
			click: {
				o: EVENT.click,
				p: EVENT.click
			}
		};
		
		var SYSTEM_EVENT = {
			pointerdown: EVENT.PointerDown,
			pointerup: EVENT.PointerUp,
			pointermove: EVENT.PointerMove,
			pointerupoutside: EVENT.PointerUpOutside
		};
		
		var currentDefiner = null;
		
		// Add accessors like a createjs to event prototype.
		var eventPrototype = Object.getPrototypeOf((new PIXI.interaction.InteractionManager(document.createElement('canvas'))).eventData);
		
		Object.defineProperties(eventPrototype, {
			stageX: {
				get: function() {
					return this.data.global.x;
				},
				set: function(v) {
				}
			},
			stageY: {
				get: function() {
					return this.data.global.y;
				},
				set: function(v) {
				}
			},
			rawX: {
				get: function() {
					return this.data.global.x;
				},
				set: function(v) {
				}
			},
			rawY: {
				get: function() {
					return this.data.global.y;
				},
				set: function(v) {
				}
			}
		});
		
		(function() {
			var DisplayObjectCreapData;
			var maskDiscriptor = Object.getOwnPropertyDescriptor(PIXI.DisplayObject.prototype, 'mask');
			
			(PropFunctions = function() {
			}).prototype = Object.defineProperties({}, {
				_off: {
					value: function(value) {
						this._off = value;
					}
				},
				x: {
					value: function(value) {
						if (this._creap.bindProp.s.x) {
							return;
						}
						this.transform.position.x = value;
					}
				},
				y: {
					value: function(value) {
						if (this._creap.bindProp.s.y) {
							return;
						}
						this.transform.position.y = value;
					}
				},
				scaleX: {
					value: function(value) {
						if (this._creap.bindProp.s.scaleX) {
							return;
						}
						this.transform.scale.x = value;
					}
				},
				scaleY: {
					value: function(value) {
						if (this._creap.bindProp.s.scaleY) {
							return;
						}
						this.transform.scale.y = value;
					}
				},
				rotation: {
					value: function(value) {
						if (this._creap.bindProp.s.rotation) {
							return;
						}
						this.transform.rotation = value * TO_RAD;
					}
				},
				skewX: {
					value: function(value) {
						if (this._creap.bindProp.s.skewX) {
							return;
						}
						this.transform.skew.x = -value * TO_RAD;
					}
				},
				skewY: {
					value: function(value) {
						if (this._creap.bindProp.s.skewY) {
							return;
						}
						this.transform.skew.y = value * TO_RAD;
					}
				},
				regX: {
					value: function(value) {
						if (this._creap.bindProp.s.regX) {
							return;
						}
						this.transform.pivot.x = value;
					}
				},
				regY: {
					value: function(value) {
						if (this._creap.bindProp.s.regY) {
							return;
						}
						this.transform.pivot.y = value;
					}
				},
				alpha: {
					value: function(value) {
						if (this._creap.bindProp.s.alpha) {
							return;
						}
						this._creap.alpha = value;
					}
				}
			});
			
			/*!
			 * @constructor createjs~DisplayObjectCreapData
			 * @classdesc Class related to system data of createjs.MovieClip.
			 * @extends EmitterCreapData
			 * @param obj {createjs.MovieClip} Instance that owns data.
			 */
			(DisplayObjectCreapData = function(obj) {
				EmitterCreapData.call(this);
				
				/**
				 * Instance that owns data.
				 * 
				 * @member createjs~DisplayObjectCreapData#obj {createjs.MovieClip}
				 */
				this.target = obj;
				
				/**
				 * State of properties binding.
				 * 
				 * @member createjs~DisplayObjectCreapData#bindProp {createjs~BindProp}
				 */
				this.bindProp = new BindProp();
				
				/**
				 * Whether this instance is removed in the timeline of the parent instance.
				 * 
				 * @member createjs~DisplayObjectCreapData#empty {bool}
				 * @default false
				 */
				this.empty = false;
				
				/**
				 * Transparency.
				 * 
				 * @member createjs~DisplayObjectCreapData#alpha {number}
				 * @default 1
				 */
				this.alpha = 1;
				
				/**
				 * Offset of depth to place.
				 * 
				 * @member createjs~DisplayObjectCreapData#depthOffset {number}
				 * @default -1
				 */
				this.depthOffset = -1;
				
				/**
				 * Whether this instance has created by timeline.
				 * 
				 * @member createjs~DisplayObjectCreapData#isLayer {bool}
				 * @default false
				 */
				this.isLayer = false;
				
				/**
				 * Instance actually tapped when it detects a tap.
				 * 
				 * @member createjs~DisplayObjectCreapData#tapped {createjs~DisplayObject}
				 */
				this.tapped = null;
				
				/**
				 * Current parent instance.
				 * 
				 * @member createjs~DisplayObjectCreapData#parent {createjs.MovieClip}
				 */
				this.parent = null;
				
				/**
				 * Whether this class has instantiated once.
				 * 
				 * @member createjs~DisplayObjectCreapData#isDefined {bool}
				 * @default false
				 */
				this.isDefined = false;
				
				/**
				 * Instance that should be the parent instance.
				 * 
				 * @member createjs~DisplayObjectCreapData#targetParent {createjs.MovieClip}
				 */
				this.targetParent = null;
			}).prototype = Object.defineProperties(Object.create(EmitterCreapData.prototype), {
				/**
				 * <span style="color:#F00;">Defined for compatibility.</span>
				 * 
				 * @function createjs~DisplayObjectCreapData#reset
				 */
				reset: {
					value: function() {
					}
				},
				/**
				 * Set the graphics of shape instance as a mask.
				 * 
				 * @function createjs~DisplayObjectCreapData#setMask
				 * @param v {createjs.Shape}
				 */
				setMask: {
					value: function(v) {
						maskDiscriptor.set.call(this.target, v._creap.graphics);
					}
				},
				/**
				 * Group of functions to reflect the value of the timeline.
				 * 
				 * @member createjs~DisplayObjectCreapData#prop {createjs~PropFunctions}
				 */
				prop: {
					value: new PropFunctions()
				}
			});
			
			(function() {
				/**
				 * @constructor createjs~DisplayObject
				 * @classdesc Class related to displayable object.
				 * @extends PIXI.Container
				 * @abstract
				 */
				(DisplayObject = function() {
					var f;
					
					this._creap = this._creap || new DisplayObjectCreapData(this);
					PIXI.Container.call(this);
					
					/*
					this.on("pointerdown", function(e) {
						e.stopPropagation();
						console.log(e.currentTarget, e.target)
					})
					
					this.on("pointermove", function(e) {
						e.stopPropagation();
					//	console.log(e.currentTarget, e.target)
					})*/
					/*
					this.on(EVENT.pointerdown, function(e) {
						this._creap.tapped = e.target;
						e.type = EVENT.mousedown;
						e.timeStamp = Date.now();
						this.emit(PRE_MOUSE_EVENT.mousedown, e);
					});
					
					this.on(EVENT.pointermove, function(e) {
						if (!this._creap.tapped) {
							return;
						}
						
						e.target = this._creap.tapped;
						e.type = EVENT.pressmove;
						e.timeStamp = Date.now();
						this.emit(PRE_MOUSE_EVENT.pressmove, e);
					});
					
					this.on(EVENT.pointerup, f = function(e) {
						var t = e.target;
						if (!this._creap.tapped) {
							return;
						}
						
						if (e.target === this._creap.tapped) {
							e.type = EVENT.click;
							this.emit(PRE_MOUSE_EVENT.click, e);
						}
						
						e.target = this._creap.tapped;
						e.type = EVENT.pressup;
						e.timeStamp = Date.now();
						this.emit(PRE_MOUSE_EVENT.pressup, e);
						this._creap.tapped = null;
						e.target = t;
					});
					*/
					
					/*
					this.on(CJS_MOUSE_EVENT.mousedown.p, function(e) {
						var ne = MouseEvent._creapStatic.ref(CJS_MOUSE_EVENT.mousedown.o, e);
						this._creap.tapped = e.target;
						this.emit(PRE_MOUSE_EVENT.mousedown, ne);
					});
					
					this.on(CJS_MOUSE_EVENT.pressmove.p, function(e) {
						var ne;
						
						if (!this._creap.tapped) {
							return;
						}
						
						ne = MouseEvent._creapStatic.ref(CJS_MOUSE_EVENT.mousedown.o, e);
						ne.target = this._creap.tapped;
						this.emit(PRE_MOUSE_EVENT.pressmove, ne);
					});
					
					this.on(CJS_MOUSE_EVENT.pressup.p, f = function(e) {
						var ne, n;
						
						if (!this._creap.tapped) {
							return;
						}
						
						if (e.target === this._creap.tapped) {
							n = MouseEvent._creapStatic.ref(CJS_MOUSE_EVENT.mousedown.o, e);
							this.emit(PRE_MOUSE_EVENT.click, n);
						}
						
						ne = MouseEvent._creapStatic.ref(CJS_MOUSE_EVENT.mousedown.o, e);
						ne.target = this._creap.tapped;
						this.emit(PRE_MOUSE_EVENT.pressup, ne);
						this._creap.tapped = null;
					});
					
					this.on(EVENT.pointerupoutside, f);
					
					this.interactive = true;*/
				}).prototype = Object.defineProperties(Object.create(PIXI.Container.prototype), {
					constructor: {
						value: DisplayObject
					},
					/**
					 * Set values of instance properties.
					 * 
					 * @function createjs~DisplayObject#setTransform
					 * @param [x=0] {number} X coordinate of the current position.
					 * @param [y=0] {number} Y coordinate of the current position.
					 * @param [scaleX=1] {number} Scale in X direction
					 * @param [scaleY=1] {number} Scale in Y direction
					 * @param [rotation=0] {number} Rotation amount (degree).
					 * @param [skewX=0] {number} X skew factor (degree).
					 * @param [skewY=0] {number} Y skew factor (degree).
					 * @param [regX=0] {number} X coodinate of the rotation reference point.
					 * @param [regY=0] {number} Y coodinate of the rotation reference point.
					 */
					setTransform: {
						value: function(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
							this._creap.prop.x.call(this, x || 0);
							this._creap.prop.y.call(this, y || 0);
							this._creap.prop.scaleX.call(this, (scaleX === 0) ? 0 : (scaleX || 1));
							this._creap.prop.scaleY.call(this, (scaleY === 0) ? 0 : (scaleY || 1));
							this._creap.prop.rotation.call(this, rotation || 0);
							this._creap.prop.skewX.call(this, skewX || 0);
							this._creap.prop.skewY.call(this, skewY || 0);
							this._creap.prop.regX.call(this, regX || 0);
							this._creap.prop.regY.call(this, regY || 0);
						}
					},
					/**
					 * Current parent instance.
					 * 
					 * @member createjs~DisplayObject#parent {createjs.MovieClip}
					 */
					parent: {
						get: function() {
							return this._creap.parent;
						},
						set: function(obj) {
							this._creap.parent = obj;
							
							if (this._creap.isDefined) {
								return;
							}
							
							this._creap.targetParent = obj;
							if (obj instanceof DisplayObject) {
								obj._creap.preDefines.push(this);
								currentDefiner = obj;
							}
						}
					},
					/**
					 * Get shape instance that has graphics of current mask.
					 * 
					 * @member createjs~DisplayObject#mask {createjs.Shape}
					 */
					mask: {
						get: function() {
							var s = maskDiscriptor.get.call(this);
							return s && s.parent;
						},
						set: function(v) {
							v._creap.maskTargets.push(this);
							this._creap.targetParent.addChild(v);
							v._creap.isLayer = true;
							this._creap.setMask(v);
						}
					},
					/*!
					 * Whether this instance is removed in the timeline of the parent instance.
					 * 
					 * @member createjs~DisplayObject#off {bool}
					 */
					_off: {
						get: function() {
							return this._creap.empty;
						},
						set: function(flag) {
							if (this._creap.empty === flag) {
								return;
							}
							
							this._creap.empty = flag;
							if (this._creap.empty) {
								this._creap.targetParent._creap.removeLayer(this);
							} else {
								this._creap.reset();
								this._creap.targetParent._creap.addLayerAt(this, this._creap.depthOffset);
							}
						}
					},
					/**
					 * Fires event.
					 * 
					 * @function createjs~DisplayObject#dispatchEvent
					 * @param e {string|createjs.Event} Event type or Event object.
					 */
					dispatchEvent: {
						value: function(e) {
							if (!(e instanceof createjs.Event)) {
								e = new createjs.Event(e);
							}
							e.target = this;
							e.currentTarget = this;
							
							this.emit(PRE_MOUSE_EVENT[e.type] || e.type, e);
						}
					},
					/**
					 * Registers event.
					 * 
					 * @function createjs~DisplayObject#addEventListener
					 * @param type {string} Event type.
					 * @param func {function} Callback when the event fires.
					 * @param [isCapture=false] {bool} <span style="color:#F00;">Defined for compatibility. Creap.js always ignores it.</span>
					 * @return {function} Referece of argument 'func'.
					 */
					addEventListener: {
						value: function(type, func, isCapture) {
							if (type in CJS_MOUSE_EVENT) {
								this.interactive = true;
							}
							this.on(PRE_MOUSE_EVENT[type] || type, func);
							return func;
						}
					},
					/**
					 * Unregisters event.
					 * 
					 * @function createjs~DisplayObject#removeEventListener
					 * @param type {string} Registered event type.
					 * @param func {function} Regitered callback.
					 * @param [isCapture=false] {bool} <span style="color:#F00;">Defined for compatibility. Creap.js always ignores it.</span>
					 */
					removeEventListener: {
						value: function(type, func, isCapture) {
							this.off(PRE_MOUSE_EVENT[type] || type, func);
						}
					},
					/**
					 * Unregisters all applicable events.
					 * 
					 * @function createjs~DisplayObject#removeAllEventListeners
					 * @param [type=''] {string} Registered event type. If it regarded as false, unregister all events.
					 */
					removeAllEventListeners: {
						value: function(type) {
							var names, i;
							type = type || '';
							
							if (type) {
								if (type in SYSTEM_EVENT) {
									return;
								}
								this.removeAllListeners(PRE_MOUSE_EVENT[type] || type);
							} else {
								names = this.eventNames();
								for (i = 0; i < names.length; i++) {
									if (names[i] in SYSTEM_EVENT) {
										continue;
									}
									this.removeAllListeners(names[i]);
								}
							}
						}
					},
					/**
					 * X coordinate of the current position.
					 * 
					 * @member createjs~DisplayObject#x {number}
					 * @default 0
					 */
					x: {
						get: function() {
							return this.transform.position.x;
						},
						set: function(value) {
							if (this._creap.bindProp.t.x) {
								return;
							}
							this.transform.position.x = value;
							this._creap.bindProp.s.x = true;
						}
					},
					/**
					 * Y coordinate of the current position.
					 * 
					 * @member createjs~DisplayObject#y {number}
					 * @default 0
					 */
					y: {
						get: function() {
							return this.transform.position.y;
						},
						set: function(value) {
							if (this._creap.bindProp.t.y) {
								return;
							}
							this.transform.position.y = value;
							this._creap.bindProp.s.y = true;
						}
					},
					/**
					 * Scale in X direction
					 * 
					 * @member createjs~DisplayObject#scaleX {number}
					 * @default 1
					 */
					scaleX: {
						get: function() {
							return this.transform.scale.x;
						},
						set: function(value) {
							if (this._creap.bindProp.t.scaleX) {
								return;
							}
							this.transform.scale.x = value;
							this._creap.bindProp.s.scaleX = true;
						}
					},
					/**
					 * Scale in Y direction
					 * 
					 * @member createjs~DisplayObject#scaleY {number}
					 * @default 1
					 */
					scaleY: {
						get: function() {
							return this.transform.scale.y;
						},
						set: function(value) {
							if (this._creap.bindProp.t.scaleY) {
								return;
							}
							this.transform.scale.y = value;
							this._creap.bindProp.s.scaleY = true;
						}
					},
					/**
					 * Rotation amount (degree).
					 * 
					 * @member createjs~DisplayObject#rotation {number}
					 * @default 0
					 */
					rotation: {
						get: function() {
							return this.transform.rotation * TO_DEG;
						},
						set: function(value) {
							if (this._creap.bindProp.t.rotation) {
								return;
							}
							this.transform.rotation = value * TO_RAD;
							this._creap.bindProp.s.rotation = true;
						}
					},
					/**
					 * X skew factor (degree).
					 * 
					 * @member createjs~DisplayObject#skewX {number}
					 * @default 0
					 */
					skewX: {
						get: function() {
							return -this.transform.skew.x * TO_DEG;
						},
						set: function(value) {
							if (this._creap.bindProp.t.skewX) {
								return;
							}
							this.transform.skew.x = -value * TO_RAD;
							this._creap.bindProp.s.skewX = true;
						}
					},
					/**
					 * Y skew factor (degree).
					 * 
					 * @member createjs~DisplayObject#skewY {number}
					 * @default 0
					 */
					skewY: {
						get: function() {
							return this.transform.skew.y * TO_DEG;
						},
						set: function(value) {
							if (this._creap.bindProp.t.skewY) {
								return;
							}
							this.transform.skew.y = value * TO_RAD;
							this._creap.bindProp.s.skewY = true;
						}
					},
					/**
					 * X coodinate of the rotation reference point.
					 * 
					 * @member createjs~DisplayObject#regY {number}
					 * @default 0
					 */
					regX: {
						get: function() {
							return this.transform.pivot.x;
						},
						set: function(value) {
							if (this._creap.bindProp.t.regX) {
								return;
							}
							this.transform.pivot.x = value;
							this._creap.bindProp.s.regX = true;
						}
					},
					/**
					 * Y coodinate of the rotation reference point.
					 * 
					 * @member createjs~DisplayObject#regY {number}
					 * @default 0
					 */
					regY: {
						get: function() {
							return this.transform.pivot.y;
						},
						set: function(value) {
							if (this._creap.bindProp.t.regY) {
								return;
							}
							this.transform.pivot.y = value;
							this._creap.bindProp.s.regY = true;
						}
					},
					/**
					 * Transparency.
					 * 
					 * @member createjs~DisplayObject#alpha {number}
					 * @default 1
					 */
					alpha: {
						get: function() {
							return this._creap.alpha;
						},
						set: function(value) {
							if (this._creap.bindProp.t.alpha) {
								return;
							}
							this._creap.alpha = value;
							if (!this._creap.isLayer) {
								return;
							}
							this._creap.bindProp.s.alpha = true;
						}
					}
				});
			})();
			
			/**
			 * @constructor createjs.Sprite
			 * @classdesc Class related to sprite.
			 * @extends createjs~DisplayObject
			 */
			(Sprite = function() {
				/**
				 * Target sprite sheet.
				 * 
				 * @member createjs.Sprite#spriteSheet {PIXI.loaders.Resource}
				 */
				this.spriteSheet = null;
			}).prototype = Object.defineProperties(Object.create(DisplayObject.prototype), {
				constructor: {
					value: Sprite
				},
				/**
				 * Select a sprite from target sprite sheet.
				 * 
				 * @function createjs.Sprite#gotoAndStop
				 * @param num {number} Index of sprite.
				 */
				gotoAndStop: {
					value: function(num) {
						DisplayObject.call(this);
						this.interactive = isAccurateTarget;
						
						if (!this.spriteSheet) {
							return;
						}
						/*
						if (this.spriteSheet.data instanceof Image) {
							sp = new PIXI.Sprite(this.spriteSheet.texture);
						} else {
							sp = new PIXI.Sprite(this.spriteSheet.textures['_' + num]);
						}
						*/
						
						this._creap.on(CREAP_EVENT.attach, function() {
							this._creap.off(CREAP_EVENT.attach, arguments.callee);
							this.addChild(new PIXI.Sprite(this.spriteSheet.textures['_' + num]));
						});
					}
				}
			});
			
			/**
			 * @constructor createjs.Bitmap
			 * @classdesc Class related to bitmap.
			 * @extends createjs~DisplayObject
			 */
			(Bitmap = function() {
			}).prototype = Object.defineProperties(Object.create(DisplayObject.prototype), {
				constructor: {
					value: Bitmap
				},
				/**
				 * Create sprite from texture.
				 * 
				 * @function createjs.Bitmap#initialize
				 * @param resource {PIXI.loaders.Resource} Resource having the target texture.
				 */
				initialize: {
					value: function(resource) {
						DisplayObject.call(this);
						this.interactive = isAccurateTarget;
						if (!resource) {
							return;
						}
						this._creap.on(CREAP_EVENT.attach, function() {
							this._creap.off(CREAP_EVENT.attach, arguments.callee);
							this.addChild(new PIXI.Sprite(resource.texture));
						});
					}
				}
			});
			
			(function() {
				var CreapData;
				
				/*!
				 * @constructor createjs.Shape~CreapData
				 * @classdesc Class related to system data of createjs.Shape.
				 * @extends createjs~DisplayObjectCreapData
				 * @param obj {createjs.Shape} Instance that owns data.
				 */
				(CreapData = function(obj) {
					DisplayObjectCreapData.call(this, obj);
					
					/**
					 * Instances masked by itself.
					 * 
					 * @member createjs.Shape~CreapData#maskTargets {array<createjs.MovieClip>}
					 */
					this.maskTargets = [];
					
					/**
					 * Graphics that currently using.
					 * 
					 * @member createjs.Shape~CreapData#graphics {createjs.Graphics}
					 */
					this.graphics = null;
				}).prototype = Object.create(DisplayObjectCreapData.prototype);
				
				/**
				 * @constructor createjs.Shape
				 * @classdesc Class related to shape.
				 * @extends createjs~DisplayObject
				 */
				(Shape = function() {
					this._creap = new CreapData(this);
					DisplayObject.call(this);
					this.parent = currentDefiner;
					this.interactive = isAccurateTarget;
				}).prototype = Object.defineProperties(Object.create(DisplayObject.prototype), {
					constructor: {
						value: Shape
					},
					/**
					 * Graphics that currently using.
					 * 
					 * @member createjs.Shape#graphics {createjs.Graphics}
					 */
					graphics: {
						get: function() {
							return this._creap.graphics || (this.graphics = new Graphics());
						},
						set: function(v) {
							if (this._creap.graphics) {
								this.removeChild(this._creap.graphics);
							}
							this._creap.graphics = v;
							if (this._creap.graphics) {
								this.addChild(this._creap.graphics);
							}
						}
					}
				});
			})();
			
			(function() {
				var CreapData, ProtoCreapData;
				
				/*!
				 * @constructor createjs.MovieClip~CreapData
				 * @classdesc Class related to system data of createjs.MovieClip.
				 * @extends createjs~DisplayObjectCreapData
				 * @param obj {createjs.MovieClip} Instance that owns data.
				 */
				(CreapData = function(obj) {
					DisplayObjectCreapData.call(this, obj);
					this.definedLayerCount = 0;
					this.definedMaskLayerCount = 0;
					this.totalFrames = 0;
					this.currentFrame = -1;
					this.preFrame = -1;
					this.isGoto = false;
					this.isDone = false;
					this.preDefines = [];
					this.onLayerCount = 0;
					this.masks = [];
					this.prevScriptFrame = -1;
					this.isAttached = false;
				}).prototype = Object.defineProperties(Object.create(DisplayObjectCreapData.prototype), {
					reset: {
						value: function() {
							this.currentFrame = -1;
							this.target.paused = false;
						}
					},
					addLayerAt: {
						value: function(child, offset) {
							this.removeLayer(child);
							child._creap.emit(CREAP_EVENT.attach);
							for (var i = 0; i < child._creap.targetParent.children.length; i++) {
								if (offset > child._creap.targetParent.children[i]._creap.depthOffset) {
									PIXI.Container.prototype.addChildAt.call(child._creap.targetParent, child, i);
									child._creap.targetParent._creap.onLayerCount++;
									return;
								}
							}
							PIXI.Container.prototype.addChild.call(child._creap.targetParent, child);
							child._creap.targetParent._creap.onLayerCount++;
						}
					},
					removeLayer: {
						value: function(child) {
							if (child._creap.targetParent.children.indexOf(child) > -1) {
								PIXI.Container.prototype.removeChild.call(child._creap.targetParent, child);
								child._creap.targetParent._creap.onLayerCount--;
							}
						}
					},
					goto: {
						value: function(v, isPlay) {
							v = isNaN(v) ? (this.target.labels[v] || this.currentFrame) : v;
							
							this.target.paused = !isPlay;
							this.preFrame = v;
							this.isGoto = true;
							this.exec();
						}
					},
					clear: {
						value: function() {
							var s; //shortcut
							this.isDone = false;
							this.preFrame = -1;
							this.isGoto = false;
							//this.prevScriptFrame = -1;
							s = this.target.children;
							for (var i = 0; i < s.length; i++) {
								if (s[i] instanceof MovieClip) {
									s[i]._creap.clear();
								}
							}
						}
					},
					exec: {
						value: function() {
							//exportRoot.x += 1
							var i, j, item, instance, isGoto, isNew;
							
							if (!this.target.tickEnabled) {
								return;
							}
							//isNew = (this.currentFrame === -1 || this._off) && this.isLayer;
							/*
							if (isNew = (this.currentFrame === -1 || this._off) && this.isLayer) {
								this.target.paused = false;
							}
							*/
							isGoto = this.isGoto;
							//
							
							if (isGoto) {
								/*if (isNew) {
									if (this.preFrame in this.target._creapProto.scripts._creap.frames && this.prevScriptFrame !== this.preFrame) {
										this.prevScriptFrame = this.preFrame;
										this.target._creapProto.scripts._creap.frames[this.preFrame].call(this.target);
									}
								} else {*/
									if (this.currentFrame === this.preFrame && this.isAttached) {
										return;
									}
									
									this.currentFrame = this.preFrame;
									this.preFrame = -1;
									if (this.currentFrame >= this.totalFrames) {
										this.currentFrame = 0;
									}
									
									if (this.totalFrames < 2) {
										this.target.paused = true;
									}
									
									this.isGoto = false;
									
									if (this.currentFrame in this.target._creapProto.scripts._creap.frames && this.prevScriptFrame !== this.currentFrame) {
										this.prevScriptFrame = this.currentFrame;
										this.target._creapProto.scripts._creap.frames[this.currentFrame].call(this.target);
									}
									
									for (i = 0; i < this.target.timeline._creap.tweens.length; i++) {
										item = this.target.timeline._creap.tweens[i]._creap.frames[this.currentFrame];
										instance = this.target.timeline._creap.tweens[i]._creap.target;
										
										if (instance._creap.depthOffset !== item.depth && !item.props._off) {
											instance._creap.depthOffset = item.depth;
											this.addLayerAt(instance, instance._creap.depthOffset = item.depth);
										}
										
										for (j in item.props) {
											instance._creap.prop[j].call(instance, item.props[j]);
										}
									}
									
									for (i = 0; i < this.target._creap.masks.length; i++) {
										item = this.target._creap.masks[i]._creap.target;
										instance = this.target._creap.masks[i]._creap.frames[this.currentFrame];
										
										if (instance.graphics === item._creap.graphics) {
											continue;
										}
										
										item.graphics = instance.graphics;
										item.x = instance.x;
										item.y = instance.y;
										for (j = 0; j < item._creap.maskTargets.length; j++) {
											item._creap.maskTargets[j]._creap.setMask(item);
										}
									}
									
									if (!this.isDone) {
										return;
									}
									
									for (i = 0; i < this.target.children.length; i++) {
										instance = this.target.children[i];
										if (instance instanceof MovieClip) {
											instance._creap.exec();
										}
									}
								//}
							} else {
								if (!this.target.paused && !this.isDone) {
									if (++this.currentFrame >= this.totalFrames) {
										this.currentFrame = 0;
									}
									
									if (this.totalFrames < 2) {
										this.target.paused = true;
									}
									
									if (this.currentFrame in this.target._creapProto.scripts._creap.frames && this.prevScriptFrame !== this.currentFrame) {
										this.prevScriptFrame = this.currentFrame;
										this.target._creapProto.scripts._creap.frames[this.currentFrame].call(this.target);
									}
									
									if (this.isGoto) {
										return;
									}
									
									for (i = 0; i < this.target.timeline._creap.tweens.length; i++) {
										if ((item = this.target.timeline._creap.tweens[i]._creap.frames[this.currentFrame]).keep) {
											continue;
										}
										
										instance = this.target.timeline._creap.tweens[i]._creap.target;
										
										if (instance._creap.depthOffset !== item.depth && !item.props._off) {
											instance._creap.depthOffset = item.depth;
											this.addLayerAt(instance, instance._creap.depthOffset = item.depth);
										}
										
										for (j in item.props) {
											instance._creap.prop[j].call(instance, item.props[j]);
										}
									}
									
									for (i = 0; i < this.target._creap.masks.length; i++) {
										item = this.target._creap.masks[i]._creap.target;
										instance = this.target._creap.masks[i]._creap.frames[this.currentFrame];
										
										if (instance.graphics === item._creap.graphics) {
											continue;
										}
										
										item.graphics = instance.graphics;
										item.x = instance.x;
										item.y = instance.y;
										for (j = 0; j < item._creap.maskTargets.length; j++) {
											item._creap.maskTargets[j]._creap.setMask(item);
										}
									}
								}
								
								for (i = 0; i < this.target.children.length; i++) {
									instance = this.target.children[i];
									if (instance instanceof MovieClip) {
										instance._creap.exec();
									}
								}
								
								this.isDone = true;
								this.isAttached = true;
							}
						}
					}
				});
				
				/*!
				 * @constructor createjs.MovieClip~ProtoCreapData
				 * @classdesc Class related to system prototype data of createjs.MovieClip.
				 */
				(ProtoCreapData = function() {
					this.count = 0;
					this.scripts = new ScriptTween();
					this.tweens = [];
				});
				
				/**
				 * @constructor createjs.MovieClip
				 * @classdesc Class related to movieclip.
				 * @extends createjs~DisplayObject
				 */
				(MovieClip = function() {
					this._creapProto = new ProtoCreapData();
				}).prototype = Object.defineProperties(Object.create(DisplayObject.prototype), {
					constructor: {
						value: MovieClip
					},
					initialize: {
						value: function(mode, startPosition, loop, labels) {
							this._creap = new CreapData(this);
							DisplayObject.call(this);
							this._creapProto.count++;
							this.mode = mode;
							this.startPosition = startPosition;
							this.loop = loop;
							this.labels = labels;
							this.timeline = new Timeline(this);
							this.tickEnabled = true;
							this.paused = false;
							currentDefiner = this;
						}
					},
					/**
					 * Current frame count of the timeline.
					 * 
					 * @member createjs.MovieClip#currentFrame {number}
					 */
					currentFrame: {
						get: function() {
							return Math.max(this._creap.currentFrame, 0);
						},
						set: function(value) {
						}
					},
					/**
					 * Total frame count of the timeline.
					 * 
					 * @member createjs.MovieClip#totalFrames {number}
					 */
					totalFrames: {
						get: function() {
							return this._creap.totalFrames;
						},
						set: function(value) {
						}
					},
					
					/**
					 * Append child that is not defined on the timeline.<br />
					 * <span style="color:#F00;">This funcion not supported multi instances.</span>
					 * 
					 * @function createjs.MovieClip#addChildAt
					 * @param child {createjs~DisplayObject}
					 * @return {createjs~DisplayObject} Added instance.
					 */
					addChild: {
						value: function(child) {
							if (child._creap.isLayer) {
								return;
							}
							
							child._creap.emit(CREAP_EVENT.attach);
							return PIXI.Container.prototype.addChild.call(this, child);
						}
					},
					/**
					 * Insert child that is not defined on the timeline to the specified index position.<br />
					 * <span style="color:#F00;">This funcion not supported multi instances.</span>
					 * 
					 * @function createjs.MovieClip#addChildAt
					 * @param child {createjs~DisplayObject}
					 * @param index {number}
					 * @return {createjs~DisplayObject} Added instance.
					 */
					addChildAt: {
						value: function(child, index) {
							if (index > this.children.length || child._creap.isLayer) {
								return;
							}
							
							child._creap.emit(CREAP_EVENT.attach);
							return PIXI.Container.prototype.addChildAt.call(this, child, Math.min(index + this._creap.onLayerCount, this.children.length));
						}
					},
					/**
					 * Remove child that is not defined on the timeline.<br />
					 * <span style="color:#F00;">This funcion not supported multi instances.</span>
					 * 
					 * @function createjs.MovieClip#removeChild
					 * @param child {createjs~DisplayObject}
					 * @return {createjs~DisplayObject} Removed instance.
					 */
					removeChild: {
						value: function(child) {
							if (child._creap.isLayer) {
								return;
							}
							return PIXI.Container.prototype.removeChild.call(this, child);
						}
					},
					/**
					 * Remove child that is not defined on the timeline from the specified index position.<br />
					 * <span style="color:#F00;">This funcion not supported multi instances.</span>
					 * 
					 * @function createjs.MovieClip#removeChildAt
					 * @param index {number}
					 * @return {createjs~DisplayObject} Removed instance.
					 */
					removeChildAt: {
						value: function(index) {
							if (!this.children[index] || this.children[index]._creap.isLayer) {
								return;
							}
							return PIXI.Container.prototype.removeChildAt.call(this, index);
						}
					},
					/**
					 * Remove all children that are not defined on the timeline.
					 * 
					 * @function createjs.MovieClip#removeAllChildren
					 * @return {array<createjs~DisplayObject>} Removed instances.
					 */
					removeAllChildren: {
						value: function() {
							var list = [];
							for (var i = 0; i < this.children.length; i++) {
								list.push(this.removeChild(this.children[i]));
							}
							return list;
						}
					},
					/**
					 * Stop timeline.
					 * 
					 * @function createjs.MovieClip#stop
					 */
					stop: {
						value: function() {
							this.paused = true;
						}
					},
					/**
					 * Play timeline.
					 * 
					 * @function createjs.MovieClip#play
					 */
					play: {
						value: function() {
							this.paused = false;
						}
					},
					/**
					 * Go to the specified frame and stop timeline.
					 * 
					 * @function createjs.MovieClip#gotoAndStop
					 * @param frame {number|string} Frame number or frame label.
					 */
					gotoAndStop: {
						value: function(frame) {
							this._creap.goto(frame, false);
						}
					},
					/**
					 * Go to the specified frame and play timeline.
					 * 
					 * @function createjs.MovieClip#gotoAndPlay
					 * @param frame {number|string} Frame number or frame label.
					 */
					gotoAndPlay: {
						value: function(frame) {
							this._creap.goto(frame, true);
						}
					}
				});
			})();
			
			/**
			 * @constructor createjs.Text
			 * @classdesc Class related to text.
			 * @extends createjs~DisplayObject
			 * @param value {string} Text content.
			 * @param style {string} String in CSS format without "color".
			 * @param [color='#000000'] {string} String of "color" in CSS format.
			 */
			(Text = function(value, style, color) {
				var s = style.split(/\s/);
				var f;
				var styles = {};
				
				DisplayObject.call(this);
				
				if (!s[0].match(TAG_PX)) {
					styles.fontWeight = s.shift();
				}
				f = parseInt(s.shift().replace(TAG_PX, ''));
				styles.fontSize = f * 10 + TAG_PX;
				styles.fontFamily = s.join(' ');
				styles.fill = color || 0;
				
				this.instance = new PIXI.Text(value, styles);
				this.instance.scale.x = this.instance.scale.y = 1 / 10;
				this.instance.y = f / 10 / 6;
				this.addChild(this.instance);
				
				this.interactive = isAccurateTarget;
			}).prototype = Object.defineProperties(Object.create(DisplayObject.prototype), {
				constructor: {
					value: Text
				},
				/**
				 * Height of one line.
				 * 
				 * @member createjs.Text#lineHeight {number}
				 */
				lineHeight: {
					get: function() {
						return this.instance.style.lineHeight;
					},
					set: function(v) {
						this.instance.style.lineHeight = v / this.instance.scale.y / 10;
						if (v <= 0) {
							this.instance.style.padding = (-v + 10) * this.instance.scale.y / 10;
						} else {
							this.instance.style.padding = 10 * this.instance.scale.y / 10;
						}
					}
				},
				/**
				 * Width of one line.
				 * 
				 * @member createjs.Text#lineWidth {number}
				 */
				lineWidth: {
					get: function() {
						return this.instance.style.wordWrapWidth;
					},
					set: function(v) {
						this.instance.style.wordWrapWidth = v;
					}
				},
				/**
				 * The horizontal alignment of the text field.<br />
				 * This property is like a "text-align" in CSS.<br />
				 * <h6><span style="color: #F00;">Allowable values:</span></h6>
				 * <ul>
				 * <li>'left'</li>
				 * <li>'center'</li>
				 * <li>'right'</li>
				 * </ul>
				 * 
				 * @member createjs.Text#textAlign {string}
				 * @default 'left'
				 */
				textAlign: {
					get: function() {
						return this.instance.style.align;
					},
					set: function(v) {
						switch (v) {
							case 'center':
								this.instance.x = -this.width / 2;
								break;
							case 'right':
								this.instance.x = -this.width;
								break;
							default:
								v = 'left';
								this.instance.x = 0;
						}
						
						this.instance.style.align = v;
					}
				},
				/**
				 * Text content.
				 * 
				 * @member createjs.Text#text {string}
				 */
				text: {
					get: function() {
						return this.instance.text;
					},
					set: function(v) {
						this.instance.text = v || '';
						this.textAlign = this.textAlign;
					}
				},
				/**
				 * Text color.<br />
				 * <h6><span style="color: #F00;">Allowable values:</span></h6>
				 * <ul>
				 * <li>String of "color" in CSS format</li>
				 * <li>0x000000 - 0xFFFFFF</li>
				 * </ul>
				 *
				 * @member createjs.Text#text {string|number}
				 * @default '#000000'
				 */
				color: {
					get: function() {
						return this.instance.style.fill;
					},
					set: function(v) {
						this.instance.style.fill = v || 0;
					}
				}
			});
			
			(function() {
				var CreapData;
				
				/*!
				 * @constructor createjs.Timeline~CreapData
				 * @classdesc Class related to system data of createjs.Timeline.
				 * @param obj {createjs.MovieClip} Instance that owns this timline.
				 */
				(CreapData = function(obj) {
					/**
					 * Instance that owns this timline.
					 * 
					 * @member createjs.Timeline~CreapData#target {createjs.MovieClip}
					 */
					this.target = obj;
					
					/**
					 * Tweens registered in this timeline.
					 * 
					 * @member createjs.Timeline~CreapData#tweens {array<createjs.Tween>}
					 */
					this.tweens = [];
				});
				
				/*!
				 * @constructor createjs.Timeline
				 * @classdesc Class related to timeline.
				 * @param obj {createjs.MovieClip} Instance that owns this timeline.
				 */
				(Timeline = function(obj) {
					this._creap = new CreapData(obj);
				}).prototype = Object.defineProperties({}, {
					constructor: {
						value: Timeline
					},
					/**
					 * @function createjs.Timeline#addTween
					 * @param tween {createjs.Tween|createjs.MultiTween|createjs.ScriptTween} Target tween instance.
					 */
					addTween: {
						value: function(tween) {
							var i, j, p;
							
							if (tween instanceof ScriptTween) {
								this._creap.target._creap.totalFrames = tween._creap.head;
								this._creap.target._creap.preDefines = [];
								tween._creap.isReference = true;
								return;
							}
							
							if (tween instanceof MultiTween) {
								for (i = 0; i < tween._creap.tweenList.length; i++) {
									this.addTween(tween._creap.tweenList[i]);
								}
								return;
							}
							
							if (tween instanceof MaskTween) {
								this._creap.target._creap.definedMaskLayerCount++;
								this._creap.target._creap.totalFrames = tween._creap.head;
								this._creap.target._creap.masks.push(tween);
								return;
							}
							
							for (i = 0; i < this._creap.tweens.length; i++) {
								if (this._creap.tweens[i]._creap.target === tween._creap.target) {
									for (j in tween._creap.frames) {
										tween._creap.frames[j].depth = this._creap.tweens[i]._creap.frames[j].depth;
									}
									this._creap.tweens[i] = tween;
									return;
								}
							}
							
							/*
							if (!tween._creap.target._creap.empty) {
								this._creap.target._creap.addLayerAt(tween._creap.target, 9999999);
							}
							*/
							tween._creap.target._off = true;
							
							tween._creap.target._creap.depthOffset = this._creap.target._creap.definedLayerCount++;
							tween._creap.target._creap.isDefined = true;
							this._creap.target._creap.totalFrames = tween._creap.head;
							this._creap.tweens.push(tween);
							
							this._creap.target._creap.preDefines = [];
						}
					}
				});
			})();
			
			(function() {
				var CreapData, Frame;
				
				/*!
				 * @constructor createjs.Tween~CreapData
				 * @classdesc Class related to system data of createjs.Tween.
				 * @param obj {createjs~DisplayObject} Instance to create tween.
				 * @param offset {number} Offset of layer depth.
				 */
				(CreapData = function(obj, frames) {
					/**
					 * Instance to create tween.
					 * 
					 * @member createjs.Tween~CreapData#target {createjs~DisplayObject}
					 */
					this.target = obj;
					
					/**
					 * Data of each frame of tween.
					 * 
					 * @member createjs.Tween~CreapData#frames {object<number, createjs~Frame>}
					 */
					this.frames = frames;
					
					/**
					 * Current header index.
					 * 
					 * @member createjs.Tween~CreapData#head {number}
					 */
					this.head = 0;
					
					/**
					 * Whether the definition is reference.
					 * 
					 * @member createjs.Tween~CreapData#isReference {bool}
					 */
					this.isReference = false;
				}).prototype = Object.defineProperties({}, {
					/**
					 * Reflects data of defined tween to this tween.
					 * 
					 * @function createjs.Tween~CreapData#ref
					 * @param offset {number} 
					 */
					ref: {
						value: function(offset) {
							offset = offset || 0;
							var b = this.target._creap.targetParent._creapProto.tweens[this.target._creap.targetParent._creap.definedLayerCount + offset]._creap;
							this.head = b.head;
							this.frames = b.frames;
							this.isReference = true;
							this.target._creap.empty = b.target._creap.empty;
						}
					}
				});
				
				/*!
				 * @constructor createjs.Tween~Frame
				 * @classdesc Class related to data of each frame of tween.
				 */
				(Frame = function(props, keep, depth) {
					this.props = props;
					this.keep = keep;
					this.depth = depth || 0;
				}).prototype = Object.defineProperties({}, {
					constructor: {
						value: Frame
					}
				});
				
				/**
				 * @constructor createjs.Tween
				 * @classdesc Class related to tween of an instance.
				 * @param obj {createjs~DisplayObject} Instance to create tween.
				 * @param offset {number} Offset of layer depth.
				 */
				Object.defineProperties((Tween = function(obj, offset) {
					this._creap = new CreapData(obj, {
						0: new Frame((new Prop()).set(
							obj.x,
							obj.y,
							obj.scale.x,
							obj.scale.y,
							obj.rotation,
							obj.skewX,
							obj.skewY,
							obj.regX,
							obj.regY,
							obj.alpha,
							obj._creap.empty
						), false, obj._creap.targetParent._creap.definedLayerCount + offset)
					});
				}), {
					/**
					 * Create tween instance.
					 * 
					 * @function createjs.Tween.get
					 * @param obj {createjs~DisplayObject|object} Instance to create tween.
					 * @param offset {number} Offset of layer depth.
					 * @return {createjs.Tween|createjs~MultiTween|createjs~ScriptTween}
					 */
					get: {
						value: function(obj, offset) {
							var t;
							offset = offset || 0;
							
							if (obj instanceof DisplayObject) {
								if (!obj._creap.targetParent) {
									// Script layer
									return obj._creapProto.scripts;
								} else if (obj instanceof Shape && obj._creap.graphics === null) {
									// Mask layer
									/*
									if (obj._creap.targetParent._creapProto.count > 1) {
										t = new MaskTween(obj);
										t._creap.ref();
										return t;
									}
									*/
									
									t = new MaskTween(obj);
									
									//obj._creap.targetParent._creapProto.masks.push(t);
									//obj._creap.targetParent.masks.push(t);
									return t;
								} else {
									// Single instance layer
									obj._creap.isLayer = true;
									if (obj._creap.targetParent._creapProto.count > 1) {
										t = new Tween(obj, offset);
										t._creap.ref(offset);
										return t;
									}
									
									t = new Tween(obj, offset);
									obj._creap.targetParent._creapProto.tweens.push(t);
									return t;
								}
							} else {
								// Multi instance layer
								t = new MultiTween(currentDefiner._creap.preDefines);
								if (currentDefiner._creapProto.count > 1) {
									t._creap.isReference = true;
								}
								return t;
							}
						}
					}
				}).prototype = Object.defineProperties({}, {
					constructor: {
						value: Tween
					},
					/**
					 * Register motion tween or properties.
					 * 
					 * @function createjs.Tween#to
					 * @param obj {object} Has property names and values to modify.
					 * @param wait {number} Number of frames to advance.
					 * @param ease {function} Using ease function (from createjs.Ease).
					 * @param offset {number} Offset of layer depth.
					 * @return {createjs.Tween} Return a itself (can use method chaining).
					 */
					to: {
						value: function(obj, wait, ease, offset) {
							var i, j, p, anim, prop;
							var c = false;
							var o;
							
							if (this._creap.isReference) {
								return this;
							}
							offset = offset || 0;
							
							for (i in obj) {
								if (i !== TAG_OFF) {
									c = true;
									break;
								}
							}
							
							if (wait && c) {
								// motion tween
								
								if (!this._creap.frames[this._creap.head]) {
									this._creap.frames[this._creap.head] = this._creap.frames[this._creap.head - 1];
								}
								anim = this._creap.frames[this._creap.head].props;
								ease = ease || NONE_EASE;
								for (i = 1; i <= wait; i++) {
									prop = new Prop();
									p = i / wait;
									for (j in anim) {
										if (j in obj) {
											if (j === TAG_OFF) {
												if (i < wait) {
													prop[j] = anim[j];
												} else {
													prop[j] = obj[j];
												}
											} else {
												prop[j] = anim[j] + (obj[j] - anim[j]) * ease(p);
											}
											continue;
										}
										prop[j] = anim[j];
									}
									
									this._creap.frames[this._creap.head + i] = new Frame(prop, false, this._creap.target._creap.targetParent._creap.definedLayerCount + offset);
								}
								for (i in obj) {
									this._creap.target._creap.bindProp.t[i] = true;
								}
								this._creap.head += wait;
							} else {
								this.wait(wait);
								anim = this._creap.frames[this._creap.head - 1].props;
								prop = new Prop();
								for (i in anim) {
									if (i in obj) {
										this._creap.target._creap.bindProp.t[i] = true;
										prop[i] = obj[i];
										continue;
									}
									prop[i] = anim[i];
								}
								this._creap.frames[this._creap.head] = new Frame(prop, false, this._creap.target._creap.targetParent._creap.definedLayerCount + offset);
							}
							return this;
						}
					},
					/**
					 * Advance the current header index.
					 * 
					 * @function createjs.Tween#wait
					 * @param num {number} Number of frames to advance.
					 * @return {createjs.Tween} Return a itself (can use method chaining).
					 */
					wait: {
						value: function(num) {
							if (this._creap.isReference || num === 0) {
								return this;
							}
							
							if (num > 1) {
								if (!this._creap.frames[this._creap.head]) {
									this._creap.frames[this._creap.head] = this._creap.frames[this._creap.head - 1];
								}
								
								this._creap.frames[this._creap.head + 1] = new Frame(this._creap.frames[this._creap.head].props, true, this._creap.frames[this._creap.head].depth);
								for (var i = this._creap.head + 2; i < this._creap.head + num; i++) {
									this._creap.frames[i] = this._creap.frames[this._creap.head + 1];
								}
							}
							
							this._creap.head += num;
							return this;
						}
					}
				});
			})();
			
			(function() {
				var CreapData;
				
				/*!
				 * @constructor createjs~MultiTween~CreapData
				 * @classdesc Class related to system data of createjs~MultiTween.
				 * @param defines {array<createjs~DisplayObject>} Instances to create tween.
				 */
				(CreapData = function(defines) {
					/**
					 * Tweens to be managed.
					 * 
					 * @member createjs~MultiTween~CreapData#tweenList {array<createjs.Tween>}
					 */
					this.tweenList = [];
					
					for (var i = 0; i < defines.length; i++) {
						if (defines[i]._off) {
							continue;
						}
						this.tweenList.push(Tween.get(defines[i], i));
					}
					
					/**
					 * Whether the definition is reference.
					 * 
					 * @member createjs~MultiTween~CreapData#isReference {bool}
					 */
					this.isReference = false;
				});
				
				/*!
				 * @constructor createjs~MultiTween
				 * @classdesc Class related to tween of multi instances.
				 * @param defines {array<createjs~DisplayObject>} Instances to create tween.
				 */
				(MultiTween = function(defines) {
					/**
					 * @member createjs~MultiTween#_creap {createjs~MultiTween~CreapData}
					 */
					this._creap = new CreapData(defines);
				}).prototype = Object.defineProperties({}, {
					constructor: {
						value: MultiTween
					},
					/**
					 * Register properties.
					 * 
					 * @function createjs~MultiTween#to
					 * @param obj {object} Has instance, property names and values to modify.
					 * @param wait {number} Number of frames to advance.
					 * @return {createjs~MultiTween} Return a itself (can use method chaining).
					 */
					to: {
						value: function(obj, wait) {
							var i, j, s, t, o, idx;
							wait = wait || 0;
							
							if (this._creap.isReference) {
								return this;
							}
							
							for (i = 0; i < this._creap.tweenList.length; i++) {
								t = this._creap.tweenList[i];
								s = null;
								for (j = 0; j < obj.state.length; j++) {
									if (obj.state[j].t === t._creap.target) {
										s = obj.state[j];
										idx = obj.state.length - j - 1;
										break;
									}
								}
								
								if (!s) {
									if (wait) {
										t.to({_off: true}, wait, null, idx);
									} else {
										t._creap.target._off = true;
										t._creap.frames[0].props._off = true;
									}
								} else {
									if (!wait) {
										continue;
									}
									
									if (s.p) {
										s.p._off = false;
										t.wait(wait);
										t.to(s.p, 0, null, idx);
									} else {
										t.to({_off: false}, wait, null, idx);
									}
								}
							}
							
							return this;
						}
					},
					/**
					 * Advance the current header index.
					 * 
					 * @function createjs~MultiTween#wait
					 * @param num {number} Number of frames to advance.
					 * @return {createjs~MultiTween} Return a itself (can use method chaining).
					 */
					wait: {
						value: function(num) {
							if (this._creap.isReference) {
								return this;
							}
							
							for (i = 0; i < this._creap.tweenList.length; i++) {
								this._creap.tweenList[i].wait(num);
							}
							
							return this;
						}
					}
				});
			})();
			
			(function() {
				var CreapData, Frame;
				
				/*!
				 * @constructor createjs~MaskTween~CreapData
				 * @classdesc Class related to system data of createjs~MaskTween.
				 * @param obj {createjs~DisplayObject} Instance to create tween.
				 */
				(CreapData = function(obj) {
					/**
					 * Instance to create tween.
					 * 
					 * @member createjs~MaskTween~CreapData#target {createjs~DisplayObject}
					 */
					this.target = obj;
					
					/**
					 * Functions of each frame of tween.
					 * 
					 * @member createjs~MaskTween~CreapData#frames {object<number, function>}
					 */
					this.frames = {};
					
					/**
					 * Current header index.
					 * 
					 * @member createjs~MaskTween~CreapData#head {number}
					 */
					this.head = 0;
				});
				
				/*!
				 * @constructor createjs.MaskTween~Frame
				 * @classdesc Class related to data of each frame of tween of mask.
				 */
				(Frame = function(graphics, x, y) {
					this.graphics = graphics;
					this.x = x || 0;
					this.y = y || 0;
				}).prototype = Object.defineProperties({}, {
					constructor: {
						value: Frame
					}
				});
				
				/*!
				 * @constructor createjs~MaskTween
				 * @classdesc Class related to tween of mask.
				 * @param obj {createjs~DisplayObject} Instance to create tween.
				 */
				(MaskTween = function(obj) {
					this._creap = new CreapData(obj);
				}).prototype = Object.defineProperties({}, {
					constructor: {
						value: MaskTween
					},
					/**
					 * Register mask.
					 * 
					 * @function createjs~MaskTween#to
					 * @param obj {object} Has graphics and position.
					 * @return {createjs~MaskTween} Return a itself (can use method chaining).
					 */
					to: {
						value: function(obj) {
							this._creap.frames[this._creap.head] = new Frame(obj.graphics, obj.x, obj.y);
							return this;
						}
					},
					/**
					 * Advance the current header index.
					 * 
					 * @function createjs~MaskTween#wait
					 * @param num {number} Number of frames to advance.
					 * @return {createjs~MaskTween} Return a itself (can use method chaining).
					 */
					wait: {
						value: function(num) {
							for (var i = 1; i < num; i++) {
								this._creap.frames[this._creap.head + i] = this._creap.frames[this._creap.head];
							}
							
							this._creap.head += num;
							return this;
						}
					}
				});
			})();
			
			(function() {
				var CreapData;
				
				/*!
				 * @constructor createjs~ScriptTween~CreapData
				 * @classdesc Class related to system data of createjs~ScriptTween.
				 */
				(CreapData = function() {
					/**
					 * Functions of each frame of tween.
					 * 
					 * @member createjs~ScriptTween~CreapData#frames {object<number, function>}
					 */
					this.frames = {};
					
					/**
					 * Current header index.
					 * 
					 * @member createjs~ScriptTween~CreapData#head {number}
					 */
					this.head = 0;
					
					/**
					 * Whether the definition is complete.
					 * 
					 * @member createjs~ScriptTween~CreapData#isDefined {bool}
					 */
					this.isDefined = false;
				});
				
				/*!
				 * @constructor createjs~ScriptTween
				 * @classdesc Class related to tween of script.
				 */
				(ScriptTween = function() {
					this._creap = new CreapData();
				}).prototype = Object.defineProperties({}, {
					constructor: {
						value: ScriptTween
					},
					/**
					 * Register callback when this._creap.target.currentFrame reaches the current header index.
					 * 
					 * @function createjs~ScriptTween#call
					 * @param func {function} Function to register.
					 * @return {createjs~ScriptTween} Return a itself (can use method chaining).
					 */
					call: {
						value: function(func) {
							if (this._creap.isDefined) {
								return this;
							}
							
							this._creap.frames[this._creap.head] = func;
							return this;
						}
					},
					/**
					 * Advance the current header index.
					 * 
					 * @function createjs~ScriptTween#wait
					 * @param num {number} Number of frames to advance.
					 * @return {createjs~ScriptTween} Return a itself (can use method chaining).
					 */
					wait: {
						value: function(num) {
							if (this._creap.isDefined) {
								return this;
							}
							
							this._creap.head += num;
							return this;
						}
					}
				});
			})();
			
			(function() {
				var CreapData;
				
				/*!
				 * Convert color and alpha from String of "color" in CSS format.
				 * 
				 * @function createjs.Graphics~toColorAndAlpha
				 * @param v {string} String of "color" in CSS format.
				 */
				function toColorAndAlpha(v) {
					var color, colors;
					var alpha = 1;
					if (v.match(TAG_COLOR)) {
						color = parseInt(v.substr(1), 16);
					} else {
						var colors = v.replace(/[a-z]|\(|\)/g, '').split(TAG_COMMA);
						alpha = Number(colors.pop());
						color = parseInt(colors.map(function(v) {
							var c = parseInt(v).toString(16);
							return c.length === 1 ? '0' + c : c;
						}).join(''), 16);
					}
					
					return {
						color: color,
						alpha: alpha
					};
				}
				
				/*!
				 * @constructor createjs.Graphics~CreapData
				 * @classdesc Class related to system data of createjs.Graphics.
				 */
				(CreapData = function() {
					/**
					 * Whether current path is line.
					 * 
					 * @member createjs.Graphics~CreapData#isLine {bool}
					 */
					this.isLine = false;
				});
				
				/**
				 * @constructor createjs.Graphics
				 * @classdesc Class related to graphics.
				 * @extends PIXI.Graphics
				 */
				(Graphics = function(obj) {
					this._creap = new CreapData();
					PIXI.Graphics.call(this);
					this.beginFill(DEFAULT_COLOR);
				}).prototype = Object.defineProperties(Object.create(PIXI.Graphics.prototype), {
					constructor: {
						value: Graphics
					},
					beginFill: {
						value: function(color) {
							var c;
							this.closePath();
							if (color) {
								c = toColorAndAlpha(color);
								PIXI.Graphics.prototype.beginFill.call(this, c.color, c.alpha);
							} else {
								PIXI.Graphics.prototype.beginFill.call(this, 0, 0);
							}
							return this;
						}
					},
					beginStroke: {
						value: function(color) {
							var c;
							if (color) {
								this._creap.isLine = true;
								c = toColorAndAlpha(color);
								this.lineStyle(1, c.color, c.alpha);
							}
							return this;
						}
					},
					setStrokeStyle: {
						value: function(width, endStyle, joinStyle, e, isNativeLines) {
							this.nativeLines = isNativeLines || false;
							this.lineWidth = width;
							return this;
						}
					},
					curveTo: {
						value: function(cpX, cpY, toX, toY, cpX2, cpY2) {
							this.bezierCurveTo(this.currentPath.shape.points[this.currentPath.shape.points.length - 2], this.currentPath.shape.points[this.currentPath.shape.points.length - 1], cpX, cpY, toX, toY);
							return this;
						}
					}
				});
			})();
			
			/**
			 * @constructor createjs.Rectangle
			 * @classdesc Class related to rectangle.<br />
			 *            <span style="color:#F00;">Defined for compatibility. In Creap.js, this class doesn't have valid function.</span>
			 */
			(Rectangle = function() {
				// not use
			}).prototype = Object.defineProperties({}, {
				constructor: {
					value: Rectangle
				}
			});
			
			/*!
			 * @constructor createjs~Prop
			 * @classdesc Class related to properties of each frame of tween.
			 */
			Object.defineProperties((Prop = function(obj) {
			}), {
				create: {
					value: function(f) {
						var v = new Prop();
						v.x = v.y = v.scaleX = v.scaleY = v.rotation = v.skewX = v.skewY = v.regX = v.regY = v.alpha = v._off = f;
						return v;
					}
				}
			}).prototype = Object.defineProperties({}, {
				constructor: {
					value: Prop
				},
				set: {
					value: function(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY, alpha, _off) {
						this.x = x || 0;
						this.y = y || 0;
						this.scaleX = (scaleX === 0) ? 0 : (scaleX || 1);
						this.scaleY = (scaleY === 0) ? 0 : (scaleY || 1);
						this.rotation = rotation || 0;
						this.skewX = skewX || 0;
						this.skewY = skewY || 0;
						this.regX = regX || 0;
						this.regY = regY || 0;
						this.alpha = alpha || 0;
						this._off = _off || false;
						return this;
					}
				}
			});
			
			/*!
			 * @constructor createjs~BindProp
			 * @classdesc Class related to state of properties binding.
			 */
			(BindProp = function() {
				/**
				 * State of properties binding by timeline.
				 * 
				 * @member createjs~BindProp#t {createjs~Prop}
				 */
				this.t = Prop.create(false);
				
				/**
				 * State of properties binding by scripts.
				 * 
				 * @member createjs~BindProp#s {createjs~Prop}
				 */
				this.s = Prop.create(false);
			});
			
			(function() {
				var CreapData, StaticCreapData;
				
				/*!
				 * @constructor createjs.Sound~StaticCreapData
				 * @classdesc Class related to static system data of createjs.Sound.
				 */
				(StaticCreapData = function() {
					this.audios = {};
				}).prototype = Object.defineProperties({}, {
					register: {
						value: function(name, audio) {
							this.audios[name] = audio;
						}
					}
				});
				
				/*!
				 * @constructor createjs.Sound~CreapData
				 * @classdesc Class related to system data of createjs.Sound.
				 * @extends EmitterCreapData
				 * @param audio {Howl} From howler.js
				 */
				(CreapData = function(audio) {
					EmitterCreapData.call(this);
					this.audio = audio;
				}).prototype = Object.create(EmitterCreapData.prototype);
				
				/**
				 * @constructor createjs.Sound
				 * @classdesc Class related to sound.
				 * @extends Emitter
				 * @param audio {Howl} From howler.js
				 */
				Object.defineProperties((Sound = function(audio) {
					this._creap = new CreapData(audio);
					Emitter.call(this);
				}), {
					_creapStatic: {
						value: new StaticCreapData()
					},
					/**
					 * Play sound with instantiate.
					 * 
					 * @function createjs.Sound.play
					 * @param id {strin} Linkage id of sound file in createjs content.
					 * @param interrupt {number} <span style="color:#F00;">Defined for compatibility. Creap.js always ignores it.</span>
					 * @param delay {number} Delay time of start playing (ms).
					 * @param offset {number} Position of playing header (ms).
					 * @param loop {number} Number of loops. If it is negative value, loop indefinitely.
					 * @param volume {number} Sound volume (0 - 1).
					 * @param pan {number} Sound panning. Between -1 (left) and 1 (right).
					 * @param startTime {number} <span style="color:#F00;">Defined for compatibility. Creap.js always ignores it.</span>
					 * @param duration {number} <span style="color:#F00;">Defined for compatibility. Creap.js always ignores it.</span>
					 */
					play: {
						value: function(id, interrupt, delay, offset, loop, volume, pan, startTime, duration) {
							var audio, sound, playProp;
							
							if (!((audio = this._creapStatic.audios[id]) instanceof Howl)) {
								return;
							}
							
							sound = new Sound(audio);
							sound.play(interrupt, delay, offset, loop, volume, pan);
							return sound;
						}
					},
					/**
					 * Stop all registered sounds.
					 * 
					 * @function createjs.Sound.stop
					 */
					stop: {
						value: function() {
							for (var i in this._creapStatic.audios) {
								this._creapStatic.audios[i].stop();
							}
						}
					}
				}).prototype = Object.defineProperties(Object.create(Emitter.prototype), {
					constructor: {
						value: Sound
					},
					/**
					 * Play sound.
					 * 
					 * @function createjs.Sound#play
					 * @param interrupt {number} <span style="color:#F00;">Defined for compatibility. Creap.js always ignores it.</span>
					 * @param delay {number} Delay time of start playing (ms).
					 * @param offset {number} Position of playing header (ms).
					 * @param loop {number} Number of loops. If it is negative value, loop indefinitely.
					 * @param volume {number} Sound volume (0 - 1).
					 * @param pan {number} Sound panning. between -1 (left) and 1 (right).
					 */
					play: {
						value: function(interrupt, delay, offset, loop, volume, pan) {
							var audio = this._creap.audio;
							
							playProp = typeof(interrupt) === 'object' ? interrupt : {
								delay: delay || 0,
								offset: offset || 0,
								loop: loop || 0,
								volume: volume || 1,
								pan: pan || 0
							};
							
							audio.volume(playProp.volume);
							audio.seek(playProp.offset / 1000);
							if (playProp.loop) {
								audio.loop(true);
							} else {
								audio.loop(false);
							}
							if (playProp.loop > -1) {
								audio.on(EVENT.end, (function(v) {
									var c = 0;
									return (function() {
										var e;
										if (++c > v) {
											this.emit(EVENT.complete);
											audio.stop();
										}
									}).bind(this);
								}).call(this, playProp.loop));
							}
							
							if (playProp.delay === 0) {
								audio.play();
							} else {
								setTimeout(function() {
									audio.play();
								}, playProp.delay);
							}
						}
					},
					/**
					 * Stop sound.
					 * 
					 * @function createjs.Sound#stop
					 */
					stop: {
						value: function() {
							this._creap.audio.stop();
						}
					},
					/**
					 * Pause or restart sound.
					 * 
					 * @member createjs.Sound#paused {bool}
					 */
					paused: {
						get: function() {
							return this._creap.audio._paused;
						},
						set: function(v) {
							if (v) {
								this._creap.audio.pause();
							} else {
								this._creap.audio.play();
							}
						}
					}
				});
			})();
			
			/**
			 * @constructor createjs.Event
			 * @classdesc Class related to event.
			 * @param type {string} Name of event type.
			 */
			(Event = function(type) {
				/**
				 * Name of event type.
				 * 
				 * @member createjs.Event#type {string}
				 * @default ''
				 */
				this.type = type || '';
				
				/**
				 * Unixtime when event was created.
				 * 
				 * @member createjs.Event#timeStamp {number}
				 */
				this.timeStamp = Date.now();
				
				/**
				 * Object that fired the event.
				 * 
				 * @see Creap.Option#isAccurateTarget
				 * @member createjs.Event#target {createjs~DisplayObject}
				 */
				this.target = null;
				
				/**
				 * Object that added the event listener.
				 * 
				 * @member createjs.Event#currentTarget {createjs~DisplayObject}
				 */
				this.currentTarget = null;
				
				/**
				 * Whether to interrupt event propagation
				 * 
				 * pmember createjs.Event#stopped {bool}
				 * @default false
				 */
				this.stopped = false;
			}).prototype = Object.defineProperties({}, {
				constructor: {
					value: Event
				}
			});
			
			(function() {
				var CreapData, StaticCreapData;
				
				/*!
				 * @constructor createjs.MouseEvent~StaticCreapData
				 * @classdesc Class related to static system data of createjs.MouseEvent.
				 */
				(StaticCreapData = function() {
					this.audios = {};
				}).prototype = Object.defineProperties({}, {
					/**
					 * @function createjs.MouseEvent~StaticCreapData#ref
					 * @param type {string} Event type.
					 * @param e {PIXI.interaction.InteractionEvent}
					 * @return {createjs.Event}
					 */
					ref: {
						value: function(type, e) {
							var ne = new MouseEvent(type);
							ne.stageX = ne.rawX = e.data.global.x;
							ne.stageY = ne.rawY = e.data.global.y;
							ne.target = e.target;
							ne.currentTarget = e.currentTarget;
							ne.stopPropagation = e.stopPropagation;
							return ne;
						}
					}
				});
				
				/**
				 * @constructor createjs.MouseEvent
				 * @classdesc Class related to mouse event.
				 * @extends createjs.Event
				 * @since 1.0.1
				 * @param type {string} Name of event type.
				 */
				Object.defineProperties((MouseEvent = function(type) {
					Event.call(this, type);
					
					/**
					 * @member createjs.MouseEvent#stageX {number}
					 * @default 0
					 */
					this.stageX = 0;
					
					/**
					 * @member createjs.MouseEvent#stageY {number}
					 * @default 0
					 */
					this.stageY = 0;
					
					/**
					 * @member createjs.MouseEvent#rawX {number}
					 * @default 0
					 */
					this.rawX = 0;
					
					/**
					 * @member createjs.MouseEvent#rawY {number}
					 * @default 0
					 */
					this.rawY = 0;
					
					/**
					 * @member createjs.MouseEvent#stopPropagation {function}
					 */
					this.stopPropagation = null;
				}), {
					_creapStatic: {
						value: new StaticCreapData()
					},
				}).prototype = Object.defineProperties(Event, {
					constructor: {
						value: MouseEvent
					}
				});
			})();
			
			/**
			 * @constructor createjs.Touch
			 * @classdesc Class related to touch.
			 */
			Object.defineProperties((Touch = function() {
			}), {
				/**
				 * Change status on validity of touch event.<br />
				 * <span style="color:#F00;">Defined for compatibility. In Creap.js, don't need to execute this function.</span><br />
				 * 
				 * @function createjs.Touch#enable
				 * @param flag {bool} Whether to enable.
				 */
				enable: {
					value: function(flag) {
					}
				}
			}).prototype = Object.defineProperties({}, {
				constructor: {
					value: Touch
				}
			});
		})();
		
		return Object.defineProperties(createjs || {}, {
			Sprite: {
				value: Sprite
			},
			MovieClip: {
				value: MovieClip
			},
			Shape: {
				value: Shape
			},
			Graphics: {
				value: Graphics
			},
			Bitmap: {
				value: Bitmap
			},
			Rectangle: {
				value: Rectangle
			},
			Tween: {
				value: Tween
			},
			Sound: {
				value: Sound
			},
			Text: {
				value: Text
			},
			Event: {
				value: Event
			},
			MouseEvent: {
				value: MouseEvent
			},
			Touch: {
				value: Touch
			},
			extend: {
				value: function(c, p) {
					return c.prototype = new p();
				}
			}
		});
	})();
})();