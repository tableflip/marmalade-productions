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
  $('[data-dex="prev"]').on('click', slide.bind(null, -1))
  $('[data-dex="next"]').on('click', slide.bind(null, 1))

  function slide (dir, e) {
    e.preventDefault()
    manageActiveClass(dir)
    loopItems(dir)
    manageContent()
  }

  function loopItems (dir) {
    if (dir < 0) $('.rolodex-item').first().remove().first().clone().appendTo('.rolodex-list')
    if (dir > 0) $('.rolodex-item').last().remove().last().clone().prependTo('.rolodex-list')
  }

  function manageActiveClass (dir) {
    var target
    if (dir < 0) target = $('.rolodex-item.active').next().get(0)
    if (dir > 0) target = $('.rolodex-item.active').prev().get(0)
    $('.rolodex-item.active').removeClass('active')
    $(target).addClass('active')
  }

  function manageContent () {
    var key = $('.rolodex-item.active').find('use').get(0).href.baseVal
    console.log(key)
  }
}

rolodex()
