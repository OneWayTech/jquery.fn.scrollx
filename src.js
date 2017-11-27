;(function (factory) {
  /* eslint-disable */
  if (typeof define === 'function' && define.amd) { // AMD
    define(['jquery'], factory)
  } else if (typeof module !== 'undefined' && module.exports) { // CommonJS
    module.exports = factory
  } else { // Global
    factory(jQuery)
  }
  /* eslint-enable */
})(function ($) {
  var scrollListeners = []

  'up down left right'.split(' ').forEach(function (direction) {
    /**
     * Add scroll[up|down|left|right] to jQuery.prototype
     * @param  {Function}  listener
     * @param  {Function?} unlistenerReceiver
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
    var lastOffsetX = $el.scrollLeft()
    var lastOffsetY = $el.scrollTop()

    $el.on('scroll', function () {
      var curOffsetX = $el.scrollLeft()
      var curOffsetY = $el.scrollTop()

      // https://stackoverflow.com/a/7076832/5172890
      alternativeRunner(lastOffsetX, curOffsetX, ctx.left, ctx.right, el)
      // https://stackoverflow.com/a/4326907/5172890
      alternativeRunner(lastOffsetY, curOffsetY, ctx.up, ctx.down, el)

      lastOffsetX = curOffsetX
      lastOffsetY = curOffsetY
    })
  }

  /**
   * @param  {Number}     v1
   * @param  {Number}     v2
   * @param  {Function[]} listeners1
   * @param  {Function[]} listeners2
   * @param  {Context}    ctx
   */
  function alternativeRunner (v1, v2, listeners1, listeners2, ctx) {
    var listeners
    if (v1 > v2) {
      listeners = listeners1
    } else if (v1 < v2) {
      listeners = listeners2
    }

    listeners && listeners.forEach(function (listener) {
      listener.call(ctx)
    })
  }
})
