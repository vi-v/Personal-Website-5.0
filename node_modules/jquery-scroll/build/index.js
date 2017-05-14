'use strict';

var $ = require('jquery');

var scroll = function scroll(_ref) {
  var selector = _ref.selector;
  var offset = _ref.offset;
  var callback = _ref.callback;
  var posY = _ref.posY;
  var duration = _ref.duration;
  var easing = _ref.easing;
  var element = _ref.element;

  (typeof element === 'object' ? element : $('html,body')).animate({
    scrollTop: parseInt(typeof posY !== 'undefined' ? posY : $(selector).offset().top - (offset || 0)) + 'px'
  }, typeof duration === 'undefined' ? 800 : duration, easing || 'swing').promise().done(function () {
    if (typeof callback === 'function') callback();
  });
};

module.exports = scroll;