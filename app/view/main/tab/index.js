/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 563:
/***/ (function(module, __unused_webpack_exports, __nccwpck_require__) {

/*!
 * Draggabilly v3.0.0
 * Make that shiz draggable
 * https://draggabilly.desandro.com
 * MIT license
 */

( function( window, factory ) {
  // universal module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        __nccwpck_require__(505),
        __nccwpck_require__(439),
    );
  } else {
    // browser global
    window.Draggabilly = factory(
        window,
        window.getSize,
        window.Unidragger,
    );
  }

}( typeof window != 'undefined' ? window : this,
    function factory( window, getSize, Unidragger ) {

// -------------------------- helpers & variables -------------------------- //

function noop() {}

let jQuery = window.jQuery;

// -------------------------- Draggabilly -------------------------- //

function Draggabilly( element, options ) {
  // querySelector if string
  this.element = typeof element == 'string' ?
    document.querySelector( element ) : element;

  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }

  // options
  this.options = {};
  this.option( options );

  this._create();
}

// inherit Unidragger methods
let proto = Draggabilly.prototype = Object.create( Unidragger.prototype );

/**
 * set options
 * @param {Object} opts
 */
proto.option = function( opts ) {
  this.options = {
    ...this.options,
    ...opts,
  };
};

// css position values that don't need to be set
const positionValues = [ 'relative', 'absolute', 'fixed' ];

proto._create = function() {
  // properties
  this.position = {};
  this._getPosition();

  this.startPoint = { x: 0, y: 0 };
  this.dragPoint = { x: 0, y: 0 };

  this.startPosition = { ...this.position };

  // set relative positioning
  let style = getComputedStyle( this.element );
  if ( !positionValues.includes( style.position ) ) {
    this.element.style.position = 'relative';
  }

  // events
  this.on( 'pointerDown', this.handlePointerDown );
  this.on( 'pointerUp', this.handlePointerUp );
  this.on( 'dragStart', this.handleDragStart );
  this.on( 'dragMove', this.handleDragMove );
  this.on( 'dragEnd', this.handleDragEnd );

  this.setHandles();
  this.enable();
};

// set this.handles  and bind start events to 'em
proto.setHandles = function() {
  let { handle } = this.options;
  if ( typeof handle == 'string' ) {
    this.handles = this.element.querySelectorAll( handle );
  } else if ( typeof handle == 'object' && handle.length ) {
    this.handles = handle;
  } else if ( handle instanceof HTMLElement ) {
    this.handles = [ handle ];
  } else {
    this.handles = [ this.element ];
  }
};

const cancelableEvents = [ 'dragStart', 'dragMove', 'dragEnd' ];

// duck-punch emitEvent to dispatch jQuery events as well
let emitEvent = proto.emitEvent;
proto.emitEvent = function( eventName, args ) {
  // do not emit cancelable events if dragging is disabled
  let isCanceled = !this.isEnabled && cancelableEvents.includes( eventName );
  if ( isCanceled ) return;

  emitEvent.call( this, eventName, args );

  // trigger jQuery event
  let jquery = window.jQuery;
  if ( !jquery || !this.$element ) return;
  // create jQuery event
  let event;
  let jqArgs = args;
  let isFirstArgEvent = args && args[0] instanceof Event;
  if ( isFirstArgEvent ) [ event, ...jqArgs ] = args;
  /* eslint-disable-next-line new-cap */
  let $event = jquery.Event( event );
  $event.type = eventName;
  this.$element.trigger( $event, jqArgs );
};

// -------------------------- position -------------------------- //

// get x/y position from style
proto._getPosition = function() {
  let style = getComputedStyle( this.element );
  let x = this._getPositionCoord( style.left, 'width' );
  let y = this._getPositionCoord( style.top, 'height' );
  // clean up 'auto' or other non-integer values
  this.position.x = isNaN( x ) ? 0 : x;
  this.position.y = isNaN( y ) ? 0 : y;

  this._addTransformPosition( style );
};

proto._getPositionCoord = function( styleSide, measure ) {
  if ( styleSide.includes('%') ) {
    // convert percent into pixel for Safari, #75
    let parentSize = getSize( this.element.parentNode );
    // prevent not-in-DOM element throwing bug, #131
    return !parentSize ? 0 :
      ( parseFloat( styleSide ) / 100 ) * parentSize[ measure ];
  }
  return parseInt( styleSide, 10 );
};

// add transform: translate( x, y ) to position
proto._addTransformPosition = function( style ) {
  let transform = style.transform;
  // bail out if value is 'none'
  if ( !transform.startsWith('matrix') ) return;

  // split matrix(1, 0, 0, 1, x, y)
  let matrixValues = transform.split(',');
  // translate X value is in 12th or 4th position
  let xIndex = transform.startsWith('matrix3d') ? 12 : 4;
  let translateX = parseInt( matrixValues[ xIndex ], 10 );
  // translate Y value is in 13th or 5th position
  let translateY = parseInt( matrixValues[ xIndex + 1 ], 10 );
  this.position.x += translateX;
  this.position.y += translateY;
};

// -------------------------- events -------------------------- //

proto.handlePointerDown = function( event, pointer ) {
  if ( !this.isEnabled ) return;
  // track start event position
  // Safari 9 overrides pageX and pageY. These values needs to be copied. flickity#842
  this.pointerDownPointer = {
    pageX: pointer.pageX,
    pageY: pointer.pageY,
  };

  event.preventDefault();
  document.activeElement.blur();
  // bind move and end events
  this.bindActivePointerEvents( event );
  this.element.classList.add('is-pointer-down');
};

proto.handleDragStart = function() {
  if ( !this.isEnabled ) return;

  this._getPosition();
  this.measureContainment();
  // position _when_ drag began
  this.startPosition.x = this.position.x;
  this.startPosition.y = this.position.y;
  // reset left/top style
  this.setLeftTop();

  this.dragPoint.x = 0;
  this.dragPoint.y = 0;

  this.element.classList.add('is-dragging');
  // start animation
  this.animate();
};

proto.measureContainment = function() {
  let container = this.getContainer();
  if ( !container ) return;

  let elemSize = getSize( this.element );
  let containerSize = getSize( container );
  let {
    borderLeftWidth,
    borderRightWidth,
    borderTopWidth,
    borderBottomWidth,
  } = containerSize;
  let elemRect = this.element.getBoundingClientRect();
  let containerRect = container.getBoundingClientRect();

  let borderSizeX = borderLeftWidth + borderRightWidth;
  let borderSizeY = borderTopWidth + borderBottomWidth;

  let position = this.relativeStartPosition = {
    x: elemRect.left - ( containerRect.left + borderLeftWidth ),
    y: elemRect.top - ( containerRect.top + borderTopWidth ),
  };

  this.containSize = {
    width: ( containerSize.width - borderSizeX ) - position.x - elemSize.width,
    height: ( containerSize.height - borderSizeY ) - position.y - elemSize.height,
  };
};

proto.getContainer = function() {
  let containment = this.options.containment;
  if ( !containment ) return;

  let isElement = containment instanceof HTMLElement;
  // use as element
  if ( isElement ) return containment;

  // querySelector if string
  if ( typeof containment == 'string' ) {
    return document.querySelector( containment );
  }
  // fallback to parent element
  return this.element.parentNode;
};

// ----- move event ----- //

/**
 * drag move
 * @param {Event} event
 * @param {Event | Touch} pointer
 * @param {Object} moveVector - x and y coordinates
 */
proto.handleDragMove = function( event, pointer, moveVector ) {
  if ( !this.isEnabled ) return;

  let dragX = moveVector.x;
  let dragY = moveVector.y;

  let grid = this.options.grid;
  let gridX = grid && grid[0];
  let gridY = grid && grid[1];

  dragX = applyGrid( dragX, gridX );
  dragY = applyGrid( dragY, gridY );

  dragX = this.containDrag( 'x', dragX, gridX );
  dragY = this.containDrag( 'y', dragY, gridY );

  // constrain to axis
  dragX = this.options.axis == 'y' ? 0 : dragX;
  dragY = this.options.axis == 'x' ? 0 : dragY;

  this.position.x = this.startPosition.x + dragX;
  this.position.y = this.startPosition.y + dragY;
  // set dragPoint properties
  this.dragPoint.x = dragX;
  this.dragPoint.y = dragY;
};

function applyGrid( value, grid, method ) {
  if ( !grid ) return value;

  method = method || 'round';
  return Math[ method ]( value/grid ) * grid;
}

proto.containDrag = function( axis, drag, grid ) {
  if ( !this.options.containment ) return drag;

  let measure = axis == 'x' ? 'width' : 'height';

  let rel = this.relativeStartPosition[ axis ];
  let min = applyGrid( -rel, grid, 'ceil' );
  let max = this.containSize[ measure ];
  max = applyGrid( max, grid, 'floor' );
  return Math.max( min, Math.min( max, drag ) );
};

// ----- end event ----- //

proto.handlePointerUp = function() {
  this.element.classList.remove('is-pointer-down');
};

proto.handleDragEnd = function() {
  if ( !this.isEnabled ) return;

  // use top left position when complete
  this.element.style.transform = '';
  this.setLeftTop();
  this.element.classList.remove('is-dragging');
};

// -------------------------- animation -------------------------- //

proto.animate = function() {
  // only render and animate if dragging
  if ( !this.isDragging ) return;

  this.positionDrag();
  requestAnimationFrame( () => this.animate() );
};

// left/top positioning
proto.setLeftTop = function() {
  let { x, y } = this.position;
  this.element.style.left = `${x}px`;
  this.element.style.top = `${y}px`;
};

proto.positionDrag = function() {
  let { x, y } = this.dragPoint;
  this.element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
};

// ----- methods ----- //

/**
 * @param {Number} x
 * @param {Number} y
 */
proto.setPosition = function( x, y ) {
  this.position.x = x;
  this.position.y = y;
  this.setLeftTop();
};

proto.enable = function() {
  if ( this.isEnabled ) return;
  this.isEnabled = true;
  this.bindHandles();
};

proto.disable = function() {
  if ( !this.isEnabled ) return;
  this.isEnabled = false;
  if ( this.isDragging ) this.dragEnd();
  this.unbindHandles();
};

const resetCssProperties = [ 'transform', 'left', 'top', 'position' ];

proto.destroy = function() {
  this.disable();
  // reset styles
  resetCssProperties.forEach( ( prop ) => {
    this.element.style[ prop ] = '';
  } );
  // unbind handles
  this.unbindHandles();
  // remove jQuery data
  if ( this.$element ) this.$element.removeData('draggabilly');
};

// ----- jQuery bridget ----- //

// required for jQuery bridget
proto._init = noop;

if ( jQuery && jQuery.bridget ) {
  jQuery.bridget( 'draggabilly', Draggabilly );
}

// -----  ----- //

return Draggabilly;

} ) );


/***/ }),

/***/ 568:
/***/ (function(module) {

/**
 * EvEmitter v2.1.1
 * Lil' event emitter
 * MIT License
 */

( function( global, factory ) {
  // universal module definition
  if (  true && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {

function EvEmitter() {}

let proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) return this;

  // set events hash
  let events = this._events = this._events || {};
  // set listeners array
  let listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( !listeners.includes( listener ) ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) return this;

  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  let onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  let onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  let listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) return this;

  let index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  let listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) return this;

  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice( 0 );
  args = args || [];
  // once stuff
  let onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( let listener of listeners ) {
    let isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
  return this;
};

return EvEmitter;

} ) );


/***/ }),

/***/ 505:
/***/ ((module) => {

/*!
 * Infinite Scroll v2.0.4
 * measure size of elements
 * MIT license
 */

( function( window, factory ) {
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

} )( window, function factory() {

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  let num = parseFloat( value );
  // not a percent like '100%', and a number
  let isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

// -------------------------- measurements -------------------------- //

let measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth',
];

let measurementsLength = measurements.length;

function getZeroSize() {
  let size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0,
  };
  measurements.forEach( ( measurement ) => {
    size[ measurement ] = 0;
  } );
  return size;
}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) elem = document.querySelector( elem );

  // do not proceed on non-objects
  let isElement = elem && typeof elem == 'object' && elem.nodeType;
  if ( !isElement ) return;

  let style = getComputedStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) return getZeroSize();

  let size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  let isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  measurements.forEach( ( measurement ) => {
    let value = style[ measurement ];
    let num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  } );

  let paddingWidth = size.paddingLeft + size.paddingRight;
  let paddingHeight = size.paddingTop + size.paddingBottom;
  let marginWidth = size.marginLeft + size.marginRight;
  let marginHeight = size.marginTop + size.marginBottom;
  let borderWidth = size.borderLeftWidth + size.borderRightWidth;
  let borderHeight = size.borderTopWidth + size.borderBottomWidth;

  // overwrite width and height if we can get it from style
  let styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBox ? 0 : paddingWidth + borderWidth );
  }

  let styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBox ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

} );


/***/ }),

/***/ 439:
/***/ (function(module, __unused_webpack_exports, __nccwpck_require__) {

/*!
 * Unidragger v3.0.0
 * Draggable base class
 * MIT license
 */

( function( window, factory ) {
  // universal module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        __nccwpck_require__(568),
    );
  } else {
    // browser global
    window.Unidragger = factory(
        window,
        window.EvEmitter,
    );
  }

}( typeof window != 'undefined' ? window : this, function factory( window, EvEmitter ) {

function Unidragger() {}

// inherit EvEmitter
let proto = Unidragger.prototype = Object.create( EvEmitter.prototype );

// ----- bind start ----- //

// trigger handler methods for events
proto.handleEvent = function( event ) {
  let method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

let startEvent, activeEvents;
if ( 'ontouchstart' in window ) {
  // HACK prefer Touch Events as you can preventDefault on touchstart to
  // disable scroll in iOS & mobile Chrome metafizzy/flickity#1177
  startEvent = 'touchstart';
  activeEvents = [ 'touchmove', 'touchend', 'touchcancel' ];
} else if ( window.PointerEvent ) {
  // Pointer Events
  startEvent = 'pointerdown';
  activeEvents = [ 'pointermove', 'pointerup', 'pointercancel' ];
} else {
  // mouse events
  startEvent = 'mousedown';
  activeEvents = [ 'mousemove', 'mouseup' ];
}

// prototype so it can be overwriteable by Flickity
proto.touchActionValue = 'none';

proto.bindHandles = function() {
  this._bindHandles( 'addEventListener', this.touchActionValue );
};

proto.unbindHandles = function() {
  this._bindHandles( 'removeEventListener', '' );
};

/**
 * Add or remove start event
 * @param {String} bindMethod - addEventListener or removeEventListener
 * @param {String} touchAction - value for touch-action CSS property
 */
proto._bindHandles = function( bindMethod, touchAction ) {
  this.handles.forEach( ( handle ) => {
    handle[ bindMethod ]( startEvent, this );
    handle[ bindMethod ]( 'click', this );
    // touch-action: none to override browser touch gestures. metafizzy/flickity#540
    if ( window.PointerEvent ) handle.style.touchAction = touchAction;
  } );
};

proto.bindActivePointerEvents = function() {
  activeEvents.forEach( ( eventName ) => {
    window.addEventListener( eventName, this );
  } );
};

proto.unbindActivePointerEvents = function() {
  activeEvents.forEach( ( eventName ) => {
    window.removeEventListener( eventName, this );
  } );
};

// ----- event handler helpers ----- //

// trigger method with matching pointer
proto.withPointer = function( methodName, event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this[ methodName ]( event, event );
  }
};

// trigger method with matching touch
proto.withTouch = function( methodName, event ) {
  let touch;
  for ( let changedTouch of event.changedTouches ) {
    if ( changedTouch.identifier == this.pointerIdentifier ) {
      touch = changedTouch;
    }
  }
  if ( touch ) this[ methodName ]( event, touch );
};

// ----- start event ----- //

proto.onmousedown = function( event ) {
  this.pointerDown( event, event );
};

proto.ontouchstart = function( event ) {
  this.pointerDown( event, event.changedTouches[0] );
};

proto.onpointerdown = function( event ) {
  this.pointerDown( event, event );
};

// nodes that have text fields
const cursorNodes = [ 'TEXTAREA', 'INPUT', 'SELECT', 'OPTION' ];
// input types that do not have text fields
const clickTypes = [ 'radio', 'checkbox', 'button', 'submit', 'image', 'file' ];

/**
 * any time you set `event, pointer` it refers to:
 * @param {Event} event
 * @param {Event | Touch} pointer
 */
proto.pointerDown = function( event, pointer ) {
  // dismiss multi-touch taps, right clicks, and clicks on text fields
  let isCursorNode = cursorNodes.includes( event.target.nodeName );
  let isClickType = clickTypes.includes( event.target.type );
  let isOkayElement = !isCursorNode || isClickType;
  let isOkay = !this.isPointerDown && !event.button && isOkayElement;
  if ( !isOkay ) return;

  this.isPointerDown = true;
  // save pointer identifier to match up touch events
  this.pointerIdentifier = pointer.pointerId !== undefined ?
    // pointerId for pointer events, touch.indentifier for touch events
    pointer.pointerId : pointer.identifier;

  this.pointerDown( event, pointer );
  this.bindActivePointerEvents();
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// ----- move ----- //

proto.onmousemove = function( event ) {
  this.pointerMove( event, event );
};

proto.onpointermove = function( event ) {
  this.withPointer( 'pointerMove', event );
};

proto.ontouchmove = function( event ) {
  this.withTouch( 'pointerMove', event );
};

proto.pointerMove = function( event, pointer ) {
  let moveVector = {
    x: pointer.pageX - this.pointerDownPointer.pageX,
    y: pointer.pageY - this.pointerDownPointer.pageY,
  };
  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
  // start drag if pointer has moved far enough to start drag
  let isDragStarting = !this.isDragging && this.hasDragStarted( moveVector );
  if ( isDragStarting ) this.dragStart( event, pointer );
  if ( this.isDragging ) this.dragMove( event, pointer, moveVector );
};

// condition if pointer has moved far enough to start drag
proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
};

// ----- drag ----- //

proto.dragStart = function( event, pointer ) {
  this.isDragging = true;
  this.isPreventingClicks = true; // set flag to prevent clicks
  this.emitEvent( 'dragStart', [ event, pointer ] );
};

proto.dragMove = function( event, pointer, moveVector ) {
  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
};

// ----- end ----- //

proto.onmouseup = function( event ) {
  this.pointerUp( event, event );
};

proto.onpointerup = function( event ) {
  this.withPointer( 'pointerUp', event );
};

proto.ontouchend = function( event ) {
  this.withTouch( 'pointerUp', event );
};

proto.pointerUp = function( event, pointer ) {
  this.pointerDone();
  this.emitEvent( 'pointerUp', [ event, pointer ] );

  if ( this.isDragging ) {
    this.dragEnd( event, pointer );
  } else {
    // pointer didn't move enough for drag to start
    this.staticClick( event, pointer );
  }
};

proto.dragEnd = function( event, pointer ) {
  this.isDragging = false; // reset flag
  // re-enable clicking async
  setTimeout( () => delete this.isPreventingClicks );

  this.emitEvent( 'dragEnd', [ event, pointer ] );
};

// triggered on pointer up & pointer cancel
proto.pointerDone = function() {
  this.isPointerDown = false;
  delete this.pointerIdentifier;
  this.unbindActivePointerEvents();
  this.emitEvent('pointerDone');
};

// ----- cancel ----- //

proto.onpointercancel = function( event ) {
  this.withPointer( 'pointerCancel', event );
};

proto.ontouchcancel = function( event ) {
  this.withTouch( 'pointerCancel', event );
};

proto.pointerCancel = function( event, pointer ) {
  this.pointerDone();
  this.emitEvent( 'pointerCancel', [ event, pointer ] );
};

// ----- click ----- //

// handle all clicks and prevent clicks when dragging
proto.onclick = function( event ) {
  if ( this.isPreventingClicks ) event.preventDefault();
};

// triggered after pointer down & up with no/tiny movement
proto.staticClick = function( event, pointer ) {
  // ignore emulated mouse up clicks
  let isMouseup = event.type == 'mouseup';
  if ( isMouseup && this.isIgnoringMouseUp ) return;

  this.emitEvent( 'staticClick', [ event, pointer ] );

  // set flag for emulated clicks 300ms after touchend
  if ( isMouseup ) {
    this.isIgnoringMouseUp = true;
    // reset flag after 400ms
    setTimeout( () => {
      delete this.isIgnoringMouseUp;
    }, 400 );
  }
};

// -----  ----- //

return Unidragger;

} ) );


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
((window, factory) => {
  const Draggabilly = !window.require ? window.Draggabilly : __nccwpck_require__(563)
  const ChromeTabs = factory(window, Draggabilly)
  window.ChromeTabs = ChromeTabs;
})(window, (window, Draggabilly) => {
  const TAB_CONTENT_MARGIN = 9
  const TAB_CONTENT_OVERLAP_DISTANCE = 1
  const TAB_CONTENT_MIN_WIDTH = 24
  const TAB_CONTENT_MAX_WIDTH = 240
  const TAB_SIZE_SMALL = 84
  const TAB_SIZE_SMALLER = 60
  const TAB_SIZE_MINI = 48
  const noop = _ => {}
  // 计算拖动
  const closest = (value, array) => {
    let closest = Infinity
    let closestIndex = -1
    for (let i = 0; i < array.length; i++) {
      const v = array[i];
      if (Math.abs(value - v) < closest) {
        closest = Math.abs(value - v)
        closestIndex = i
      }
    }
    return closestIndex
  }

  const tabTemplate = `
    <div class="chrome-tab">
      <div class="chrome-tab-dividers"></div>
      <div class="chrome-tab-background">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><symbol id="chrome-tab-geometry-left" viewBox="0 0 214 36"><path d="M17 0h197v36H0v-2c4.5 0 9-3.5 9-8V8c0-4.5 3.5-8 8-8z"/></symbol><symbol id="chrome-tab-geometry-right" viewBox="0 0 214 36"><use xlink:href="#chrome-tab-geometry-left"/></symbol><clipPath id="crop"><rect class="mask" width="100%" height="100%" x="0"/></clipPath></defs><svg width="52%" height="100%"><use xlink:href="#chrome-tab-geometry-left" width="214" height="36" class="chrome-tab-geometry"/></svg><g transform="scale(-1, 1)"><svg width="52%" height="100%" x="-100%" y="0"><use xlink:href="#chrome-tab-geometry-right" width="214" height="36" class="chrome-tab-geometry"/></svg></g></svg>
      </div>
      <div class="chrome-tab-content">
        <div class="chrome-tab-favicon"></div>
        <div class="chrome-tab-title"></div>
        <div class="chrome-tab-drag-handle"></div>
        <div class="chrome-tab-close"></div>
      </div>
    </div>
  `

  function NumToString_px(Nmu) {
    return Nmu + "px"
  }

  /**
   * 默认的标签配置
   */
  const defaultTapProperties = {
    title: '新标签',
    favicon: false,
    close: true,
  }

  let instanceId = 0
  /**标签 */
  class ChromeTabs {
    constructor(el, ShowMenu) {
      if(!el)throw new Error("Not_Page_Element");
      this.draggabillies = []
      this.init(el)
      if (ShowMenu) {
        el.setAttribute("ShowMenu", "")
      }
      let This = this;

      function SetwindragSize() {
        const els = el.querySelector("#System_windrag")
        if (!els) return;
        const {
          style
        } = els;
        let AllWidth = 0;
        let List = This.el.querySelectorAll('.chrome-tab');
        for (const el of List) AllWidth += el?.offsetWidth || 0;
        // 很奇怪的bug  莫名其妙多出
        const Difference = {
          0: 0,
          1: 0,
          2: -20,
          3: -35
        }
        // 数据计算出来不是精准的，原因是标签很奇怪的变动，但是el框架的逻辑就是触摸块有变动就会重新计算
        style.left = NumToString_px(AllWidth + Difference[This.tabEls.length])
        style.width = NumToString_px(innerWidth - AllWidth - 120)
        if (This.tabEls.length > 3) {
          style.width="100vw"
        }
      };
      addEventListener("resize",SetwindragSize)
      el.addEventListener('tabRemove', function () {
        setTimeout(SetwindragSize, 300)
        // 删除有可能不触发手动触发下
       if( el.querySelector("#System_windrag"))el.querySelector("#System_windrag").style.width="95vw"
      })
      el.addEventListener('tabAdd', function () {
        setTimeout(SetwindragSize, 300)
      })
      el.addEventListener('tabdragEnd', function () {
        setTimeout(SetwindragSize, 300)
        // 删除有可能不触发手动触发下
       if( el.querySelector("#System_windrag"))el.querySelector("#System_windrag").style.width="95vw"
      })
    }
    /**创建新的项目 */
    init(el) {
      if (el) this.el = el
      // el.innerHTML=tabMainTemplate;
      this.instanceId = instanceId
      this.el.setAttribute('data-chrome-tabs-instance-id', this.instanceId)
      instanceId += 1

      this.setupCustomProperties()
      this.setupStyleEl()
      this.setupEvents()
      this.layoutTabs()
      this.setupDraggabilly()

    }

    emit(eventName, data) {
      this.el.dispatchEvent(new CustomEvent(eventName, {
        detail: data
      }))
    }

    setupCustomProperties() {
      this.el.style.setProperty('--tab-content-margin', `${ TAB_CONTENT_MARGIN }px`)
    }

    setupStyleEl() {
      this.styleEl = document.createElement('style')
      this.el.appendChild(this.styleEl)
    }

    setupEvents() {
      window.addEventListener('resize', _ => {
        this.cleanUpPreviouslyDraggedTabs()
        this.layoutTabs()
      })
      // 移除双击添加
      // this.el.addEventListener('dblclick', event => {
      //   if ([this.el, this.tabContentEl].includes(event.target)) this.addTab()
      // })
      for (const tabEl of this.tabEls) this.setTabCloseEventListener(tabEl)
    }

    get tabEls() {
      return Array.prototype.slice.call(this.el.querySelectorAll('.chrome-tab'))
    }

    get GetAllWidth() {
      let AlloffsetWidth = 0;
      let List = this.el.querySelectorAll('.chrome-tab');
      for (const el of List) AlloffsetWidth += el?.offsetWidth || 0;
      return AlloffsetWidth
    }

    get tabContentEl() {
      return this.el.querySelector('.chrome-tabs-content')
    }

    get tabContentWidths() {
      const numberOfTabs = this.tabEls.length
      const tabsContentWidth = this.tabContentEl.clientWidth
      const tabsCumulativeOverlappedWidth = (numberOfTabs - 1) * TAB_CONTENT_OVERLAP_DISTANCE
      const targetWidth = (tabsContentWidth - (2 * TAB_CONTENT_MARGIN) + tabsCumulativeOverlappedWidth) / numberOfTabs
      const clampedTargetWidth = Math.max(TAB_CONTENT_MIN_WIDTH, Math.min(TAB_CONTENT_MAX_WIDTH, targetWidth))
      const flooredClampedTargetWidth = Math.floor(clampedTargetWidth)
      const totalTabsWidthUsingTarget = (flooredClampedTargetWidth * numberOfTabs) + (2 * TAB_CONTENT_MARGIN) - tabsCumulativeOverlappedWidth
      const totalExtraWidthDueToFlooring = tabsContentWidth - totalTabsWidthUsingTarget

      // TODO - Support tabs with different widths / e.g. "pinned" tabs
      const widths = []
      let extraWidthRemaining = totalExtraWidthDueToFlooring
      for (let i = 0; i < numberOfTabs; i += 1) {
        const extraWidth = flooredClampedTargetWidth < TAB_CONTENT_MAX_WIDTH && extraWidthRemaining > 0 ? 1 : 0
        widths.push(flooredClampedTargetWidth + extraWidth)
        if (extraWidthRemaining > 0) extraWidthRemaining -= 1
      }

      return widths
    }

    get tabContentPositions() {
      const positions = []
      const tabContentWidths = this.tabContentWidths

      let position = TAB_CONTENT_MARGIN
      for (const i in tabContentWidths) {
        const width = tabContentWidths[i]
        const offset = i * TAB_CONTENT_OVERLAP_DISTANCE
        positions.push(position - offset)
        position += width
      }
      return positions
    }

    get tabPositions() {
      const positions = []
      for (const contentPosition of this.tabContentPositions) positions.push(contentPosition - TAB_CONTENT_MARGIN)
      return positions
    }

    layoutTabs() {
      const tabContentWidths = this.tabContentWidths
      let i = 0;
      for (const tabEl of this.tabEls) {
        const contentWidth = tabContentWidths[i]
        const width = contentWidth + (2 * TAB_CONTENT_MARGIN)

        tabEl.style.width = width + 'px'
        tabEl.removeAttribute('is-small')
        tabEl.removeAttribute('is-smaller')
        tabEl.removeAttribute('is-mini')

        if (contentWidth < TAB_SIZE_SMALL) tabEl.setAttribute('is-small', '')
        if (contentWidth < TAB_SIZE_SMALLER) tabEl.setAttribute('is-smaller', '')
        if (contentWidth < TAB_SIZE_MINI) tabEl.setAttribute('is-mini', '')
        i += 1;
      }
      let styleHTML = ''
      for (let index = 0; index < this.tabPositions.length; index++) {
        const position = this.tabPositions[index];
        styleHTML += `
        .chrome-tabs[data-chrome-tabs-instance-id="${ this.instanceId }"] .chrome-tab:nth-child(${ index + 1 }) {
          transform: translate3d(${ position }px, 0, 0)
        }
      `
      }
      this.styleEl.innerHTML = styleHTML
    }

    createNewTabEl() {
      const div = document.createElement('div')
      div.innerHTML = tabTemplate
      return div.firstElementChild
    }
    /**
     * 添加标签
     * @param {*} tabProperties {
            title: 'New Tab',
            favicon: false
          }
     * @param {*} param1 
     */
    addTab(tabProperties, {
      animate = true,
      background = false
    } = {}) {
      const tabEl = this.createNewTabEl()
      // 删除动画
      if (animate) {
        tabEl.classList.add('chrome-tab-was-just-added')
        setTimeout(() => tabEl.classList.remove('chrome-tab-was-just-added'), 500)
      }

      tabProperties = Object.assign({}, defaultTapProperties, tabProperties)
      this.tabContentEl.appendChild(tabEl)
      this.setTabCloseEventListener(tabEl)
      this.updateTab(tabEl, tabProperties)
      this.emit('tabAdd', {
        tabEl
      })
      if (!background) this.setCurrentTab(tabEl)
      this.cleanUpPreviouslyDraggedTabs()
      this.layoutTabs()
      this.setupDraggabilly()
      if (tabProperties.close === false) tabEl.setAttribute("NotClose", "")
      if(tabProperties.id)tabEl.id = tabProperties.id;
      return tabEl
    }
    
    setTabCloseEventListener(tabEl) {
      tabEl.querySelector('.chrome-tab-close').addEventListener('click', _ => this.removeTab(tabEl))
    }

    get activeTabEl() {
      return this.el.querySelector('.chrome-tab[active]')
    }

    hasActiveTab() {
      return !!this.activeTabEl
    }

    setCurrentTab(tabEl) {
      const activeTabEl = this.activeTabEl
      if (activeTabEl === tabEl) return
      if (activeTabEl) activeTabEl.removeAttribute('active')
      tabEl.setAttribute('active', '')
      this.emit('activeTabChange', {
        tabEl
      })
    }

    removeTab(tabEl) {
      if(typeof tabEl=="string") for (let tabE of this.tabEls) if(tabE.id===tabEl) return this.removeTab(tabE);
      if (tabEl === this.activeTabEl) {
        if (tabEl.nextElementSibling) {
          this.setCurrentTab(tabEl.nextElementSibling)
        } else if (tabEl.previousElementSibling) {
          this.setCurrentTab(tabEl.previousElementSibling)
        }
      }
      tabEl.setAttribute('removeTab', '')
      tabEl.parentNode.removeChild(tabEl)
      this.emit('tabRemove', {
        tabEl
      })
      this.cleanUpPreviouslyDraggedTabs()
      this.layoutTabs()
      this.setupDraggabilly()
      const {
        draggabillies
      } = this;
      // 移除没引用的拖拽标签
      for (let index = 0; index < draggabillies.length; index++) {
        const Draggabilly = draggabillies[index];
        if (Draggabilly.element.attributes.getNamedItem("removetab") ||
          Draggabilly.element == draggabillies[index - 1]?.element ||
          Draggabilly.element == draggabillies[index + 1]?.element
        ) {
          draggabillies.splice(index, 1)
        }
      }

    }

    updateTab(tabEl, tabProperties) {
      tabEl.querySelector('.chrome-tab-title').textContent = tabProperties.title

      const faviconEl = tabEl.querySelector('.chrome-tab-favicon')
      if (tabProperties.favicon) {
        faviconEl.style.backgroundImage = `url('${ tabProperties.favicon }')`
        faviconEl.removeAttribute('hidden', '')
      } else {
        faviconEl.setAttribute('hidden', '')
        faviconEl.removeAttribute('style')
      }

      if (tabProperties.id) {
        tabEl.setAttribute('data-tab-id', tabProperties.id)
      }
    }

    cleanUpPreviouslyDraggedTabs() {
      for (const tabEl of this.tabEls) tabEl.classList.remove('chrome-tab-was-just-dragged')
    }

    setupDraggabilly() {
      const tabEls = this.tabEls
      const tabPositions = this.tabPositions

      if (this.isDragging) {
        this.isDragging = false
        this.el.classList.remove('chrome-tabs-is-sorting')
        this.draggabillyDragging.element.classList.remove('chrome-tab-is-dragging')
        this.draggabillyDragging.element.style.transform = ''
        this.draggabillyDragging.dragEnd()
        this.draggabillyDragging.isDragging = false
        this.draggabillyDragging.positionDrag = noop // Prevent Draggabilly from updating tabEl.style.transform in later frames
        this.draggabillyDragging.destroy()
        this.draggabillyDragging = null
      }
      for (const iterator of this.draggabillies) {
        iterator.destroy()
      }
      for (const originalIndex in tabEls) {
        const tabEl = tabEls[originalIndex]

        const originalTabPositionX = tabPositions[originalIndex]
        const draggabilly = new Draggabilly(tabEl, {
          axis: 'x',
          handle: '.chrome-tab-drag-handle',
          containment: this.tabContentEl
        })

        this.draggabillies.push(draggabilly)

        draggabilly.on('pointerDown', _ => {
          this.setCurrentTab(tabEl)
        })

        draggabilly.on('dragStart', _ => {
          this.isDragging = true
          this.draggabillyDragging = draggabilly
          tabEl.classList.add('chrome-tab-is-dragging')
          this.el.classList.add('chrome-tabs-is-sorting')
        })

        draggabilly.on('dragEnd', _ => {
          this.isDragging = false
          const finalTranslateX = parseFloat(tabEl.style.left, 10)
          tabEl.style.transform = `translate3d(0, 0, 0)`

          // Animate dragged tab back into its place
          requestAnimationFrame(_ => {
            tabEl.style.left = '0'
            tabEl.style.transform = `translate3d(${ finalTranslateX }px, 0, 0)`

            requestAnimationFrame(_ => {
              tabEl.classList.remove('chrome-tab-is-dragging')
              this.el.classList.remove('chrome-tabs-is-sorting')

              tabEl.classList.add('chrome-tab-was-just-dragged')

              requestAnimationFrame(_ => {
                tabEl.style.transform = ''

                this.layoutTabs()
                this.setupDraggabilly()
              })
            })
          })
          this.emit("tabdragEnd", {tabEl})
                })

        draggabilly.on('dragMove', (event, pointer, moveVector) => {
          // 当前索引不能在事件内计算，因为它可以在拖动过程中更改
          const tabEls = this.tabEls
          const currentIndex = tabEls.indexOf(tabEl)

          const currentTabPositionX = originalTabPositionX + moveVector.x
          const destinationIndexTarget = closest(currentTabPositionX, tabPositions)
          const destinationIndex = Math.max(0, Math.min(tabEls.length, destinationIndexTarget))

          if (currentIndex !== destinationIndex) {
            this.animateTabMove(tabEl, currentIndex, destinationIndex)
          }
        })
      }
    }

    animateTabMove(tabEl, originIndex, destinationIndex) {
      if (destinationIndex < originIndex) {
        tabEl.parentNode.insertBefore(tabEl, this.tabEls[destinationIndex])
      } else {
        tabEl.parentNode.insertBefore(tabEl, this.tabEls[destinationIndex + 1])
      }
      this.emit('tabReorder', {
        tabEl,
        originIndex,
        destinationIndex
      })
      this.layoutTabs()
    }
  }

  return ChromeTabs
})
})();

module.exports = __webpack_exports__;
/******/ })()
;