// from http://api.$.com/$.getScript/
$.cachedScript = function(url, options) {

  // allow user to set any option except for dataType, cache, and url
  options = $.extend(options || {}, {
    dataType: "script",
    cache: true,
    url: url
  });

  // Use $.ajax() since it is more flexible than $.getScript
  // Return the jqXHR object so we can chain callbacks
  return $.ajax(options);
};

(function(){
  // Code highlighting
  $('pre').addClass('prettyprint');
  $.cachedScript('/js/prettify.js', {
    success: function() {
      prettyPrint();
    }
  });
})();
