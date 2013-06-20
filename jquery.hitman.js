(function() {

  jQuery(function($) {
    return $.fn.hitman = function(options) {
      var methods, settings;
      settings = $.extend({
        dataAttribute: "hitman",
        defaultCallback: null
      }, options);
      methods = {
        executeCallback: function(functionName) {
          var callback;
          if (functionName != null) {
            callback = methods.functionFromString(functionName);
          } else {
            callback = settings.defaultCallback;
          }
          if (callback != null) {
            return callback();
          }
        },
        functionFromString: function(functionName) {
          var callback, parts;
          callback = window;
          parts = functionName.split('.');
          $(parts).each(function() {
            if (typeof callback === 'object') {
              return callback = callback[this];
            }
          });
          if (typeof callback === 'function') {
            return callback;
          }
        }
      };
      return $(document).on('click', "[data-" + settings.dataAttribute + "]", function(event) {
        var callback, controller, element, targetSelector;
        event.preventDefault();
        controller = $(this);
        targetSelector = controller.data(settings.dataAttribute);
        if (controller.data("" + settings.dataAttribute + "-all")) {
          element = $(targetSelector);
        } else {
          element = controller.closest(targetSelector);
        }
        callback = controller.data("" + settings.dataAttribute + "-callback");
        methods.executeCallback(callback);
        return element.remove();
      });
    };
  });

}).call(this);
