jQuery ($) ->
  $.fn.hitman = (options) ->
    settings = $.extend
      dataAttribute: "hitman"
      callback: null
    , options

    methods =
      executeCallback: (functionName) ->
        if functionName?
          callback = methods.functionFromString(functionName)
        else
          callback = settings.callback

        callback() if callback?

      functionFromString: (functionName) ->
        callback = window
        parts = functionName.split('.')

        $(parts).each () ->
          callback = callback[this] if typeof(callback) == 'object'

        callback if typeof(callback) == 'function'

    $(document).on 'click', "[data-#{settings.dataAttribute}]", (event) ->
      event.preventDefault()
      controller = $(this)
      targetSelector = controller.data(settings.dataAttribute)

      if controller.data("#{settings.dataAttribute}-all")
        element = $(targetSelector)
      else
        element = controller.closest(targetSelector)

      callback = controller.data("#{settings.dataAttribute}-callback")

      element.remove()
      methods.executeCallback(callback)

