var $ = window.$ = window.jQuery = require('jquery')
require('bootstrap/dist/js/umd/carousel.js')
require('bootstrap/dist/js/umd/collapse.js')

var rolodex = require('./rolodex.js')
$('.carousel-item').first().addClass('active')
$('#clients-carousel').carousel()

rolodex()

$('#play').on('click', function (e) {
  e.preventDefault()
  $('.container-lead').addClass('video-playing')
  $('.container-video').show().on('click', stopVideo)
  player('play')
})

function removeStopVideo () {
  $('.container-video').off('click', stopVideo)
}

function stopVideo () {
  $('.container-lead').removeClass('video-playing')
  $('.container-video').hide()
  player('unload')
  removeStopVideo()
}

function player (opt) {
  var opts = JSON.stringify({ 'method': opt })
  $('#video').get(0).contentWindow.postMessage(opts, '*')
}
