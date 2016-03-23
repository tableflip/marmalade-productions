window.$ = window.jQuery = require('jquery')
require('bootstrap/dist/js/umd/carousel.js')
require('bootstrap/dist/js/umd/collapse.js')

var $ = window.$
$('.carousel-item').first().addClass('active')
$('#clients-carousel').carousel()

$('#play').on('click', function (e) {
  $('.container-lead').addClass('video-playing')
  player('play')
})

function player (opt) {
  var opts = JSON.stringify({ 'method': opt })
  $('iframe').get(0).contentWindow.postMessage(opts, '*')
}
