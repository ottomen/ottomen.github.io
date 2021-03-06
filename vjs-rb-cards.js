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
        settings = videojs.mergeOptions(defaults, options),
        interval;

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
                //console.log('Error: ' + xhr.status);
              }
            }
          });

          promise.then(function () {
            console.log(cartData);
            console.log('Cached id: ', cachedId, '  New Id: ', cartData.id);
            if (cachedId !== cartData.id) {
              ctaCardInstance.deleteCardDOM();
              ctaCardInstance.addCardDOM(cartData);
              console.log('Not duplicate id! Cached id: ', cachedId, '  New Id: ', cartData.id);
              cachedId = cartData.id;
            } else {
              console.log('Duplicate id! Cached id: ', cachedId, '  New Id: ', cartData.id);
            }
          }).catch(function (error) {
            document.body.querySelector('#player').innerHTML = error.responseText
          });
        },
        deleteCardDOM: function () {
          console.log('deleteCardDOM');
          var card = document.getElementById('vjs-rb-card'),
            cartParent;
          if (card !== null) {
            cartParent = card.parentElement;
            cartParent.removeChild(card);
          }
        },
        addCardDOM: function (cartData) {
          var template = '<div class="vjs-rb-detail active">';
          template += '<a href="' + cartData.link + '" target="_blank" class="vjs-rb-js-detail">';
          template += '<div>';
          template += '<img src="' + cartData.image + '" class="detail-image">';
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
        },
        setAjaxInterval: function () {
          interval = setInterval(function () {
            ctaCardInstance.getCards();
          }, 1000);
        }
      };

      if (settings.start_time === null)
        settings.start_time = 0;

      //player.on('timeupdate', ctaCardInstance.getCards);
      player.on('loadedmetadata', ctaCardInstance.getCards);
      player.on('play', ctaCardInstance.setAjaxInterval);
    };

  videojs.plugin('cta-card-async', ctaCard);
}(window, window.videojs));
