var $ = window.$ = window.jQuery = require('jquery')

module.exports = function () {
  var itemWidth = $('.rolodex-item').first().width()
  var animating = false

  $('[data-dex="prev"]').on('click', slide.bind(null, '-='))
  $('[data-dex="next"]').on('click', slide.bind(null, '+='))

  initialRender()

  function slide (dir, e) {
    e.preventDefault()
    if (animating) return
    manageAnimation(dir)
    manageActiveClass(dir)
    manageActiveContent()
  }

  function manageAnimation (dir) {
    var notSetUp = ($('.rolodex-item').first().position().left === 0 && dir === '+=')
    notSetUp ? loopItems(dir, moveItems) : moveItems(dir, loopItems)
  }

  function moveItems (dir, cb) {
    var finish = 0
    animating = !animating
    $('.rolodex-item').animate({left: dir + itemWidth}, 500, function () {
      finish += 1
      if (finish === $('.rolodex-item').length) {
        animating = !animating
        if (cb) cb(dir)
      }
    })
  }

  function loopItems (dir, cb) {
    (dir === '+=') ? loopLast() : loopFirst()
    if (cb) cb(dir)
  }

  function loopFirst () {
    var delta = (itemWidth * $('.rolodex-item').length) - itemWidth
    $('.rolodex-item').first().remove().first().clone().appendTo('.rolodex-list').css('left', delta + 'px')
  }

  function loopLast () {
    $('.rolodex-item').last().remove().last().clone().prependTo('.rolodex-list').css('left', (0 - itemWidth) + 'px')
  }

  function getCurrentDex () {
    return $('.rolodex .active').data('dex-item')
  }

  function manageActiveClass (dir) {
    var target
    if (dir === '-=') target = $('.rolodex-item.active').next().get(0)
    if (dir === '+=') target = $('.rolodex-item.active').prev().get(0)
    manageActiveState(target)
  }

  function manageActiveState (target) {
    $('.rolodex .active').removeClass('active')
    $(target).addClass('active')
  }

  function manageActiveContent () {
    var key = getCurrentDex()
    $('.rolodex-content .active').removeClass('active')
    var target = $('[data-dex-item="$"]'.replace('$', key))
    $(target).addClass('active')
    updateActiveContentTitle(key)
  }

  function updateActiveContentTitle (key) {
    var title = key.toUpperCase().split('-').join(' ')
    $('#rolodex-titlebar').text(title)
  }

  function initialRender () {
    $('.rolodex-item:nth-child(2)').addClass('active')
    $('.rolodex-content-item:nth-child(2)').addClass('active')
    $('.rolodex-item').each(function (i, item) { $(item).css('left', (itemWidth * i) + 'px') })
    updateActiveContentTitle(getCurrentDex())
  }
}
