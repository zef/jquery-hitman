jQuery Hitman
==================

A jQuery plugin that makes it easy to target DOM elements for destruction.

Basic usage
-----------

Hitman uses HTML data attributes to define behavior. Simply initialize Hitman and add a data attribute to an element. This will cause the containing element with the selector `.my-container` to be removed when the link is clicked.

```javascript
$(document).ready(function() {
  $(document).hitman();
});
```
```html
<div class="my-container">
  <a href="#remove_container" data-hitman=".my-container">Remove container</a>
</div>
```

Options
-------

You can pass a default callback to be called when any element is removed:
```javascript
$(document).hitman({
  callback: function() {
    // do something special
  }
});
```

Or provide the name of a callback to be called on a case by case basis:
```html
<a href="#" data-hitman=".my-container" data-hitman-callback="YourApp.yourCallback">
  Remove container and call YourApp.yourCallback()
</a>
```

By default, Hitman is suicidal and destroys its nearest matching containing element using `jQuery.closest()`. You can have it destroy all matching elements by adding the data-hitman-all attribute:
```html
<a href="#" data-hitman=".some-class" data-hitman-all="true">
  Remove all matching elements
</a>
```

You can also choose your own word to use in your data attributes:
```javascript
$(document).hitman({
  dataAttribute: 'remove'
});

// will use the attributes
//   data-remove, data-remove-callback, and data-remove-all
// instead of
//   data-hitman, data-hitman-callback, and data-hitman-all
```

See [the code](https://github.com/zef/jquery-hitman/blob/master/coffeescript/jquery.hitman.coffee) for details.

