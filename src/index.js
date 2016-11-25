/**
 * Dragging By LancerComet at 20:48, 2016.11.24.
 * # Carry Your World #
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.moving = factory();
  }
}(this, function() {
  'use strict';

  // Store listeners reference.
  var registerBook = []
  window.registerBook = registerBook

  /**
   * Set target element draggable.
   * 
   * @param {HTMLElement} element
   * @returns {HTMLElement}
   */
  function setDraggable (element) {
    if (element) {
      var deltaX = 0, deltaY = 0, inited = false

      // No position resetting if isn't first time to set draggable.
      inited = registerBook.some(function (item) {
        return item.element === element
      })

      // Get position information.
      var position = element.getBoundingClientRect()

      // Change style to fixed.
      element.style.position = 'fixed'

      var reference = {}
      
      if (!inited) {
        // element.style.top = position.top + 'px'
        // element.style.left = position.left + 'px'

        // Register to registerBook.
        reference = {
          dragstart: dragstart,
          drag: drag,
          dragend: dragend,
          mouseLeave: mouseLeave,
          originalPosition: getComputedStyle(element).position,
          inited: inited,
          element: element
        }

        registerBook.push(reference)

        inited = true
      } else {
        reference = registerBook.filter(function (item) {
          return item.element === element
        })

        if (reference) reference = reference[0]
      }

      // Setup listeners.
      element.addEventListener('mousedown', reference.dragstart, false)
      element.addEventListener('mouseup', reference.dragend, false)
      element.addEventListener('mouseleave', reference.mouseLeave, false)
    }

    return element

    function dragstart (event) {
      event.preventDefault()

      var size = element.getBoundingClientRect()
      deltaX = event.clientX - size.left + element.offsetLeft
      deltaY = event.clientY - size.top + element.offsetTop
      
      element.addEventListener('mousemove', drag, false)
    }

    function drag (event) {
      event.preventDefault()    
      var x = event.clientX || event.pageX
      var y = event.clientY || event.pageY

      var transformPrefix = [
        'transform', 'webkitTransform', 'mozTransform', 'msTransform'
      ]

      transformPrefix.forEach(function (name) {
        element.style[name] = 'translate(' + (x - deltaX) + 'px, ' + (y - deltaY) + 'px)'      
      })
      
    }

    function dragend (event) {
      event.preventDefault()    
      mouseLeave()
    }

    function mouseLeave (event) {
      element.removeEventListener('mousemove', drag, false)
    }
  }

  /**
   * Set target element undraggable.
   * 
   * @param {HTMLElement} element
   * @returns {HTMLElement}
   */
  function setUndraggable (element) {
    var reference = registerBook.filter(function (item) {
      return item.element === element
    })

    if (reference) {
      reference = reference[0]
      var element = reference.element
      element.removeEventListener('mousedown', reference.dragstart, false)
      element.removeEventListener('mousemove', reference.drag, false)
      element.removeEventListener('mouseup', reference.dragend, false)
      element.removeEventListener('mouseleave', reference.mouseLeave, false)    
    }
    return element
  }
  
  return {
    setDraggable: setDraggable,
    setUndraggable: setUndraggable
  }
}));