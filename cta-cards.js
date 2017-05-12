/*
 *  Copyright (c) 2013 Funny or Die, Inc.
 *  http://www.funnyordie.com
 *  https://github.com/funnyordie/videojs-ctaCard/blob/master/LICENSE.md
 */

(function (window, videojs) {
  var defaults = {
      customClass: 'card-aj'
    },
    ctaCard = function (options) {
      var player = this,
        settings = videojs.mergeOptions(defaults, options);

      ctaCardInstance = {
        getCards: function () {
          var url = settings.cardUrl;

          console.log('Ajax cart request', url);

          ctaCardInstance.deleteCardDOM();
          ctaCardInstance.addCardDOM();
        },
        deleteCardDOM: function () {
          console.log('deleteCardDOM');
        },
        addCardDOM: function () {
          console.log('addCardDOM');
          var template = '<div class="vjs-cta-detail active">';
          template += '<a href="" target="_blank" class="vjs-cta-js-detail">';

          template += '<div>';
          template += '<img src="" class="detail-image">';
          template += '<h3 class="title"></h3>';
          template += '<div class="price-set js-if-price">';
          template += '<del class="original-price js-original-price"></del>';
          template += '<span class="price">$</span>';
          template += '</div>';
          template += '<span class="description"></span>';
          template += '</div>';
          template += '</a>';
          template += '</div>';
          console.log('Template', template);
        }
      };

      if (settings.start_time === null)
        settings.start_time = 0;

      //player.on('timeupdate', ctaCardInstance.getCards);
      player.on('play', ctaCardInstance.getCards);

      console.log('Player', player);
    };

  videojs.plugin('cta-card-async', ctaCard);
}(window, window.videojs));
