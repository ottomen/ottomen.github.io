/*
 *  Copyright (c) 2013 Funny or Die, Inc.
 *  http://www.funnyordie.com
 *  https://github.com/funnyordie/videojs-ctaCard/blob/master/LICENSE.md
 */

(function (window, videojs) {
  var defaults = {
      image_url: null,
      click_url: '',
      start_time: null,
      end_time: null,
      opacity: 0.7,
      height: '100%',
      width: '100%'
    },
    ctaCard = function (options) {
      var player = this,
        settings = videojs.mergeOptions(defaults, options);

      ctaCardInstance = {
        getCards: function () {
          console.log('Ajax cart request');
        },
        deleteCardDOM: function () {

        },
        addCardDOM: function () {

        }
      };

      if (settings.start_time === null)
        settings.start_time = 0;

      player.on('timeupdate', ctaCardInstance.getCards);
      
      console.log('Player', player);
    };

  videojs.plugin('cta-card-async', ctaCard);
}(window, window.videojs));
