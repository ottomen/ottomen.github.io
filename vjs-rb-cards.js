/*
 *  Copyright (c) 2017 Ottomen
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
                  resolve('Success!');
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
                console.log('Cached id: ', cachedId, '  New Id: ', parseInt(cartData.id));
                cachedId = parseInt(cartData.id);
              } else {
                console.log('duplicate id');
              }
            }).catch(function (error) {
              document.body.querySelector('#player').innerHTML = error.responseText
            });
        },
        deleteCardDOM: function () {
          //console.log('deleteCardDOM');
          var card = document.querySelector('.vjs-rb-card');
        },
        addCardDOM: function (cartData) {
          var template = '<div class="vjs-rb-detail active">';
          template += '<a href="' + cartData.link + '" target="_blank" class="vjs-rb-js-detail">';
          template += '<div>';
          template += '<img src="' +  cartData.image + '" class="detail-image">';
          template += '<h3 class="title">' + cartData.title + '</h3>';
          template += '<div class="price-set js-if-price">';
          template += '<del class="original-price js-original-price">' + cartData.originalPrice + '</del>';
          template += '<span class="price">' + cartData.price + '</span>';
          template += '</div>';
          template += '<span class="description">' + cartData.description + '</span>';
          template += '<span class="btn">Buy</span>';
          template += '</div>';
          template += '</a>';
          template += '</div>';

          var holderDiv = document.createElement('div');
          holderDiv.id = 'vjs-rb-card';
          holderDiv.className = 'vjs-rb-card';
          holderDiv.innerHTML = template;
          player.el().appendChild(holderDiv);
        }
      };

      if (settings.start_time === null)
        settings.start_time = 0;

      //player.on('timeupdate', ctaCardInstance.getCards);
      player.on('play', ctaCardInstance.getCards);
    };

  videojs.plugin('cta-card-async', ctaCard);
}(window, window.videojs));
