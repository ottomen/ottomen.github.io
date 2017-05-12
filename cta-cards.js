(function (window, videojs) {
  var defaults = {
    // Display console log messages.
    debug: false,
    // msDisplayMax indicates the number of seconds that is
    // considered the boundary value for displaying milliseconds
    // in the time controls. An audio clip with a total length of
    // 2 seconds and a msDisplayMax of 3 will use the format
    // M:SS:MMM. Clips longer than msDisplayMax will be displayed
    // as M:SS or HH:MM:SS.
    msDisplayMax: 3
  };

  var ctaCard = function (options) {
    var settings = videojs.mergeOptions(defaults, options);
    var player = this;

    console.log('Wee');
  };

  var registerPlugin = videojs.plugin;
  if (typeof videojs.registerPlugin === 'function') {
    // video.js >= 6.0.0
    registerPlugin = videojs.registerPlugin;
  }
  registerPlugin('cta-card-async', ctaCard);

})(window, window.videojs);

//(function (window, videojs) {
//  var defaults = {
//      image_url: null,
//      click_url: '',
//      start_time: null,
//      end_time: null,
//      opacity: 0.7,
//      height: '100%',
//      width: '100%'
//    },
//    imageOverlay = function (options) {
//      var player = this,
//        settings = videojs.mergeOptions(defaults, options),
//        showingImage = false;
//
//      if (settings.start_time === null)
//        settings.start_time = 0;
//
//      overlay = {
//        checkEndTime: function () {
//          if (settings.end_time === null) {
//            settings.end_time = player.duration() + 1;
//          }
//        },
//        checkOverlay: function () {
//          if ((player.currentTime() >= settings.start_time) && (player.currentTime() < settings.end_time)) {
//            overlay.showImage();
//          } else {
//            overlay.hideImage();
//          }
//        },
//        showImage: function () {
//          if (showingImage) {
//            return;
//          }
//          showingImage = true;
//          var holderDiv = document.createElement('a');
//          holderDiv.id = 'vjs-image-overlay-holder';
//          holderDiv.style.height = settings.height;
//          holderDiv.style.width = settings.width;
//
//          if (settings.image_url) {
//            var overlayImage = document.createElement('img');
//            overlayImage.src = settings.image_url;
//            overlayImage.style.opacity = settings.opacity;
//            holderDiv.appendChild(overlayImage);
//          }
//
//          holderDiv.onclick = function () {
//            player.pause();
//            window.open(settings.click_url);
//          };
//
//          player.el().appendChild(holderDiv);
//        },
//        hideImage: function () {
//          if (!showingImage) {
//            return;
//          }
//          showingImage = false;
//          player.el().removeChild(document.getElementById('vjs-image-overlay-holder'));
//        }
//      };
//
//      player.on('timeupdate', overlay.checkOverlay);
//      player.on('loadedmetadata', overlay.checkEndTime);
//
//
//      //console.log(window, document, window.parent.document);
//    };
//
//  videojs.plugin('imageOverlay', imageOverlay);
//}(window, window.videojs, document));
