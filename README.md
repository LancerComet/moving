# moving

A tiny library to make html node movable.

Compatibility: >= IE9. (Because of using `transform` style).

[Demo](http://htmlpreview.github.io/?https://github.com/LancerComet/moving/blob/master/test/demo.html) is here.

## Usage.

### Common.js:

```javascript
const moving = require('moving')

const myDiv = document.querySelector('#my-div')

moving.setDraggable(myDiv)  // Now it can move to anywhere.
moving.setUndraggable(myDiv)  // Stay here forever.
```

### Use it directly:
```html
<script src="node_modules/moving/src/index.js"></script>
<script>
  const myDiv = document.querySelector('#my-div')

  moving.setDraggable(myDiv)  // Now it can move to anywhere.
  moving.setUndraggable(myDiv)  // Stay here forever.
</script>
```

## License

MIT.