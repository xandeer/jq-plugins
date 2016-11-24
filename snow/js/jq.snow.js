/**
 * js 网页雪花效果 jquery 插件
 */
(function ($) {

  $.fn.snow = function (options) {

    var $flake         = $('<div class="snowbox" />').css({'position': 'absolute', 'top': '-10px'}).html('&#10052;'),
        documentHeight = $(document).height(),
        documentWidth  = $(document).width(),
        defaults       = {
          minSize:    10,		    // 雪花的最小尺寸
          maxSize:    20,		    // 雪花的最大尺寸
          newOn:      1000,		  // 雪花出现的频率
          flakeColor: "#FFFFFF"	// 雪花颜色
        },
        options        = $.extend({}, defaults, options);

    var interval;

    var stop = function () {
      clearInterval(interval);
      interval = NaN;
    };

    var start = function () {
      stop();
      interval = setInterval(function () {
        var startPositionLeft = Math.random() * documentWidth - 100,
            startOpacity      = 0.5 + Math.random(),
            sizeFlake         = options.minSize + Math.random() * options.maxSize,
            endPositionTop    = documentHeight,
            endPositionLeft   = startPositionLeft - 100 + Math.random() * 500,
            durationFall      = documentHeight * 10 + Math.random() * 5000;
        $flake.clone().appendTo('body').css({
          left:     startPositionLeft,
          opacity:  startOpacity,
          fontSize: sizeFlake,
          color:    options.flakeColor
        }).animate({
          top:     endPositionTop,
          left:    endPositionLeft,
          opacity: 0.2
        }, durationFall, 'linear', function () {
          $(this).remove();
        });
      }, options.newOn);
    };

    var toggle = function () {
      interval ? stop() : start();
    };

    return {
      start:  start,
      stop:   stop,
      toggle: toggle
    };
  };

})(jQuery);