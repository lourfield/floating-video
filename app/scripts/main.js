(function() {

  var player;
  var featuredVideo = document.getElementById('featured-video');
  var featuredVideoHeight = featuredVideo.clientHeight;

  window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('featured-video', {
      events: {
        'onStateChange': onPlayerStateChange
      }
    });
  }

  /**
   * Run when the Youtube video state (play, pause, etc.) change.
   *
   * @param {Object} event The Youtube Object Event.
   * @return {Void}
   */
  function onPlayerStateChange( event ) {

    var isPlay = 1 === event.data;
    var isPause = 2 === event.data;
    var isEnd = 0 === event.data;

    toggleVideoClasses(isPlay, isPause, isEnd);
  }

  /**
   * Toggle class names of the video iframe.
   *
   * @param {Boolean} play  Whether the video is playing.
   * @param {Boolean} pause Whether the video is paused.
   * @param {Boolean} end   Whather the video ends.
   * @return {Void}
   */
  function toggleVideoClasses( play, pause, end ) {

      if ( play ) {
        featuredVideo.classList.remove('is-paused');
        featuredVideo.classList.toggle('is-playing');
      }

      if ( pause ) {
        featuredVideo.classList.remove('is-playing');
        featuredVideo.classList.toggle('is-paused');
      }

      if ( end ) {
        featuredVideo.classList.remove('is-playing', 'is-paused');
      }
  }

  var waypoints = new Waypoint({
    element : featuredVideo,
    offset  : featuredVideoHeight / -2,
    handler : function(direction) {

      if ( 'down' === direction && featuredVideo.classList.contains('is-playing') ) {
        featuredVideo.classList.add('is-sticky');
      }

      if ( 'up' === direction && featuredVideo.classList.contains('is-sticky') ) {
        featuredVideo.classList.remove('is-sticky');
      }
    },
  });
})();
