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
        cachedId = '',
        settings = videojs.mergeOptions(defaults, options);

      var promise = new Promise(function (resolve, reject) {

      });

      ctaCardInstance = {
        getCards: function () {

          var url = settings.cardUrl;
          var id = '';
          var cartData = [];


          var promise = new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.send(null);
            xhr.onreadystatechange = function () {
              var DONE = 4;
              var OK = 200;
              if (xhr.readyState === DONE) {
                if (xhr.status === OK) {
                  cartData = JSON.parse(xhr.responseText);
                  console.log(cartData);
                }
              } else {
                console.log('Error: ' + xhr.status);
              }
            }
          });

          promise.then(function () {

            if (parseInt(cachedId) !== parseInt(cartData.id)) {
              ctaCardInstance.deleteCardDOM();
              ctaCardInstance.addCardDOM(cartData);
              cachedId = parseInt(cartData.id);
              console.log('ids are not the same');
            } else {
              console.log('duplicate id');
            }
          }, function () {
            console.log('Error');
          });

        },
        deleteCardDOM: function () {
          console.log('deleteCardDOM');
        },
        addCardDOM: function (cartData) {
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
