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
     * @param  {Function}  listener(delta <Number>, currentOffset <Number>, lastOffset <Number>)
     * @param  {Number? }  period - for debounce
     * @param  {Function?} unlistenerReceiver(unlistener <Function>)
     * @return {this}      chainable
     */
    $.fn['scroll' + direction] = function (listener, period, unlistenerReceiver) {
      switch (typeof period) {
        case 'function':
          unlistenerReceiver = period
        case 'undefined': // eslint-disable-line no-fallthrough
          period = 100
      }

      var el = this
      var scrollListener = scrollListeners.filter(function (instance) {
        return instance.el === el
      })[0]

      if (!scrollListener) {
        scrollListener = new ScrollListener(el, period)
        scrollListeners.push(scrollListener)
      }

      scrollListener[direction].push(listener)

      unlistenerReceiver && unlistenerReceiver(function () {
        scrollListener[direction].splice(scrollListener[direction].indexOf(listener), 1)
      })

      return el // return this
    }
  })

  /**
   * Class ScrollListener
   * @param {jQuery this} el
   * @param {Number}      period - for debounce
   */
  function ScrollListener (el, period) {
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
      }, period, true))
      .on('scroll', debounce(function () {
        var curOffsetX = $el.scrollLeft()
        var curOffsetY = $el.scrollTop()

        // https://stackoverflow.com/a/7076832/5172890
        alternativeRunner(lastOffsetX, curOffsetX, ctx.left, ctx.right, el)
        // https://stackoverflow.com/a/4326907/5172890
        alternativeRunner(lastOffsetY, curOffsetY, ctx.up, ctx.down, el)

        lastOffsetX = curOffsetX
        lastOffsetY = curOffsetY
      }, period))
  }

  /**
   * @param  {Number}     v1
   * @param  {Number}     v2
   * @param  {Function[]} listeners1
   * @param  {Function[]} listeners2
   * @param  {Context}    el
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
      // callback(delta, currentOffset, lastOffset)
      listener.call(el, Math.abs(v1 - v2), v2, v1)
    })
  }

  // refers to https://davidwalsh.name/javascript-debounce-function
  function debounce (fn, ms, immediate) {
    var timerId
    return function () {
      clearTimeout(timerId)
      var ctx = this
      var args = arguments

      immediate && !timerId && fn.apply(ctx, args)

      timerId = setTimeout(function () {
        timerId = null
        immediate || fn.apply(ctx, args)
      }, ms)
    }
  }
})
