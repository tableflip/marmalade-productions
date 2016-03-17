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

var Rolodex = function Rolodex ($el) {
  this.el = $el
  this.items = $('.rolodex-item').size()
  this.itemWidth = this.el.width() / this.items
  this.rolodexInnerWidth = this.itemWidth * 3
  this.position = 1

  var self = this

  $('[data-dex="prev"]').on('click', slide.bind(null, -1))
  $('[data-dex="next"]').on('click', slide.bind(null, 1))

  function slide (dir, e) {
    e.preventDefault()
    var xd
    updatePosition(dir)
    var x = $('.rolodex-list').position()
    if (dir > 0) xd = x.left + self.itemWidth
    if (dir < 0) xd = x.left - self.itemWidth
    $('.rolodex-list').animate({ left: xd + 'px' }, 250, move.bind(null, dir))
  }

  function move (dir) {
    if (dir < 0) $('.rolodex-item').first().clone().appendTo('.rolodex-list')
    if (dir > 0) $('.rolodex-item').last().clone().prependTo('.rolodex-list')
  }

  function updatePosition (dir) {
    var newPosition
    if (dir > 0) newPosition = self.position + 1
    if (dir < 0) newPosition = self.position - 1
    if (newPosition > self.items) newPosition = self.items
    if (newPosition < 0) newPosition = 0
    return self.position = newPosition
  }
}

new Rolodex($('.rolodex'))
