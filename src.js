;(function (factory) {
  /* eslint-disable */
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory // CommonJS
  } else {
    factory(jQuery) // Global
  }
  /* eslint-enable */
})(function ($) {
  var scrollListeners = []

  'up down left right'.split(' ').forEach(function (direction) {
    /**
     * Add scroll[up|down|left|right] to jQuery.prototype
     * @param  {Function}  listener(offset: Number)
     * @param  {Function?} unlistenerReceiver(unlistener: Function)
     * @return {jQuery wrapped el}
     */
    $.fn['scroll' + direction] = function (listener, unlistenerReceiver) {
      var el = this
      var scrollListener = scrollListeners.filter(function (inst) {
        return inst.el === el
      })[0]

      if (!scrollListener) {
        scrollListener = new ScrollListener(el)
        scrollListeners.push(scrollListener)
      }

      scrollListener[direction].push(listener)

      unlistenerReceiver && unlistenerReceiver(function () {
        scrollListener[direction].splice(scrollListener[direction].indexOf(listener), 1)
      })

      return el
    }
  })

  /**
   * Class ScrollListener
   * @param {jQuery wrapped el} el
   */
  function ScrollListener (el) {
    var ctx = this
    ctx.el = el // identifier

    // listeners
    ctx.up = []
    ctx.down = []
    ctx.left = []
    ctx.right = []

    var $el = $(el)
    var lastOffsetX
    var lastOffsetY

    $el
      .on('scroll', debounce(function () {
        lastOffsetX = $el.scrollLeft()
        lastOffsetY = $el.scrollTop()
      }, 100, true))
      .on('scroll', debounce(function () {
        var curOffsetX = $el.scrollLeft()
        var curOffsetY = $el.scrollTop()

        // https://stackoverflow.com/a/7076832/5172890
        alternativeRunner(lastOffsetX, curOffsetX, ctx.left, ctx.right, el)
        // https://stackoverflow.com/a/4326907/5172890
        alternativeRunner(lastOffsetY, curOffsetY, ctx.up, ctx.down, el)

        lastOffsetX = curOffsetX
        lastOffsetY = curOffsetY
      }, 100))
  }

  /**
   * @param  {Number}     v1
   * @param  {Number}     v2
   * @param  {Function[]} listeners1
   * @param  {Function[]} listeners2
   * @param  {jQuery wrapped el}
   */
  function alternativeRunner (v1, v2, listeners1, listeners2, el) {
    var listeners
    if (v1 > v2) {
      listeners = listeners1
    } else if (v1 < v2) {
      listeners = listeners2
    } else {
      return
    }

    listeners.forEach(function (listener) {
      listener.call(el, Math.abs(v1 - v2)) // callback(offset: Number)
    })
  }

  // refers to https://davidwalsh.name/javascript-debounce-function
  function debounce (fn, ms, immediate) {
    var timeout
    return function () {
      var ctx = this
      var args = arguments
      var later = function () {
        timeout = null
        immediate || fn.apply(ctx, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, ms)
      callNow && fn.apply(ctx, args)
    }
  }
})
