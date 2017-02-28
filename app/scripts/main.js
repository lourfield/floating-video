/* eslint
	no-unused-vars: ["error", { "vars": "local", "varsIgnorePattern": "player" }]
*/
jQuery( function( $ ) {

  var player;

  var $window = $( window );
  var $featuredMedia = $( "#featured-media" ); // Container.
  var $featuredVideo = $( "#featured-video" ); // Actual Video.
  var top = $featuredMedia.offset().top;
  var offset = Math.floor( top + ( $featuredMedia.outerHeight() / 2 ) );

  window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player( "featured-video", {
      events: {
        "onStateChange": onPlayerStateChange
      }
    } );
  };

  /**
   * Run when the Youtube video state (play, pause, etc.) is changed.
   *
   * @param {Object} event The Youtube Object Event.
   * @return {Void}
   */
  function onPlayerStateChange( event ) {

    var isPlay  = 1 === event.data;
    var isPause = 2 === event.data;
    var isEnd   = 0 === event.data;

    if ( isPlay ) {
      $featuredVideo.removeClass( "is-paused" );
      $featuredVideo.toggleClass( "is-playing" );
    }

    if ( isPause ) {
      $featuredVideo.removeClass( "is-playing" );
      $featuredVideo.toggleClass( "is-paused" );
    }

    if ( isEnd ) {
      $featuredVideo.removeClass( "is-playing", "is-paused" );
    }
  }

  /**
   * _.Underscore.js throttle.
   *
   * Delay executing a function. It will reduce the notifications of an event that fires multiple times.
   *
   * @see http://stackoverflow.com/questions/27078285/simple-throttle-in-js
   *
   * @param {Function} func    The function to execute.
   * @param {Number}   wait    The delay time.
   * @param {Object}   options Some options.
   * @return {Function} The function to execute.
   */
  // function throttle( func, wait, options ) {
  //
  //   var context, args, result;
  //   var timeout = null;
  //   var previous = 0;
  //   if ( !options ) {
  //     options = {};
  //   }
  //
  //   var later = function() {
  //     previous = options.leading === false ? 0 : Date.now();
  //     timeout = null;
  //     result = func.apply( context, args );
  //     if ( !timeout ) {
  //       context = args = null;
  //     }
  //   };
  //
  //   return function() {
  //     var now = Date.now();
  //     if ( !previous && options.leading === false ) {
  //       previous = now;
  //     }
  //     var remaining = wait - ( now - previous );
  //     context = this;
  //     args = arguments;
  //     if ( remaining <= 0 || remaining > wait ) {
  //       if ( timeout ) {
  //         clearTimeout( timeout );
  //         timeout = null;
  //       }
  //       previous = now;
  //       result = func.apply( context, args );
  //       if ( !timeout ) {
  //         context = args = null;
  //       }
  //     } else if ( !timeout && options.trailing !== false ) {
  //       timeout = setTimeout( later, remaining );
  //     }
  //     return result;
  //   };
  // };

  // $window
  //
  //   .on( "resize", throttle( function() {
  //     top = $featuredMedia.offset().top;
  //     offset = Math.floor( top + ( $featuredMedia.outerHeight() / 2 ) );
  //   }, 150 ) )
  //
  //   .on( "scroll", throttle( function() {
  //     $featuredVideo.toggleClass( "is-sticky",
  //       $window.scrollTop() > offset && $featuredVideo.hasClass( "is-playing" )
  //     );
  //   }, 150 ) );
  //

  $window

    .on( "resize", function() {
      top = $featuredMedia.offset().top;
      offset = Math.floor( top + ( $featuredMedia.outerHeight() / 2 ) );
    } )

    .on( "scroll", function() {
      $featuredVideo.toggleClass( "is-sticky",
        $window.scrollTop() > offset && $featuredVideo.hasClass( "is-playing" )
      );
    } );
} );
