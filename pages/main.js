window.$ = window.jQuery = require('jquery')
require('bootstrap/dist/js/umd/carousel.js')
require('bootstrap/dist/js/umd/collapse.js')
// require('bootstrap/dist/js/umd/util.js')
// require('bootstrap/dist/js/umd/alert.js')
// require('bootstrap/dist/js/umd/button.js')
// require('bootstrap/dist/js/umd/dropdown.js')
// require('bootstrap/dist/js/umd/modal.js')
// require('bootstrap/dist/js/umd/scrollspy.js')
// require('bootstrap/dist/js/umd/tab.js')
// require('bootstrap/dist/js/umd/tooltip.js')
// require('bootstrap/dist/js/umd/popover.js')

var $ = window.$
$('.carousel-item').first().addClass('active')
$('#clients-carousel').carousel()

function rolodex () {
  var itemWidth = $('.rolodex-item').first().width()
  var animating = false

  $('[data-dex="prev"]').on('click', slide.bind(null, '-='))
  $('[data-dex="next"]').on('click', slide.bind(null, '+='))

  initialRender()

  function slide (dir, e) {
    e.preventDefault()
    if (animating) return
    manageActiveClass(dir)
    manageActiveContent()

    if ($('.rolodex-item').first().position().left === 0 && dir === '+=') {
      loopItems(dir, moveItems)
    } else {
      moveItems(dir, loopItems)
    }
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
    var delta
    if (dir === '-=') {
      delta = (itemWidth * $('.rolodex-item').length) - itemWidth
      $('.rolodex-item').first().remove().first().clone().appendTo('.rolodex-list').css('left', delta + 'px')
    }
    if (dir === '+=') {
      delta = 0 - itemWidth
      $('.rolodex-item').last().remove().last().clone().prependTo('.rolodex-list').css('left', (0 - itemWidth) + 'px')
    }
    if (cb) cb(dir)
  }

  function initialRender () {
    $('.rolodex-item:nth-child(2)').addClass('active')
    $('.rolodex-content-item:nth-child(2)').addClass('active')
    $('.rolodex-item').each(function (i, item) {
      $(item).css('left', (itemWidth * i) + 'px')
    })
  }

  function manageActiveClass (dir) {
    var target
    if (dir === '-=') target = $('.rolodex-item.active').next().get(0)
    if (dir === '+=') target = $('.rolodex-item.active').prev().get(0)
    manageActiveState('rolodex-item', target)
  }

  function manageActiveContent () {
    var key = $('.rolodex-item.active').find('use').get(0).href.baseVal.replace('#', '')
    var target = $('[data-dex-item="$"]'.replace('$', key))
    manageActiveState('rolodex-content-item', target)
  }

  function manageActiveState (elClassName, target) {
    $('.' + elClassName + '.active').removeClass('active')
    $(target).addClass('active')
  }
}

rolodex()
