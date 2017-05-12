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

      var promise = new Promise(function (resolve, reject) {

      });

      ctaCardInstance = {
        getCards: function () {
          console.log('Ajax cart request', url);

          var url = settings.cardUrl;
          var id = '';
          var cartData = [];

          var promise = new Promise(function (resolve, reject) {
            //jQuery.get(url)
            //  .done(function (response) {
            //    resolve(response)
            //  })
            //  .fail(function (err) {
            //    reject(err)
            //  })

            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.send(null);

            xhr.onreadystatechange = function () {
              var DONE = 4; // readyState 4 means the request is done.
              var OK = 200; // status 200 is a successful return.
              if (xhr.readyState === DONE) {
                if (xhr.status === OK)
                  console.log(xhr.responseText); // 'This is the returned text.'
              } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
              }
            }


          });

          promise.then(function () {

            ctaCardInstance.deleteCardDOM();
            ctaCardInstance.addCardDOM();
          }, function () {
            console.log('Error');
          });

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
