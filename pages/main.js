var $ = window.$ = window.jQuery = require('jquery')
var Vimeo = require('@vimeo/player/dist/player.min.js')
var player = new Vimeo.Player($('#video'))

require('bootstrap/dist/js/umd/carousel.js')
require('bootstrap/dist/js/umd/collapse.js')
require('./rolodex.js')()

$('#play').on('click', startVideo)
$('body').on('click', stopVideo)

function startVideo (e) {
  e.preventDefault()
  e.stopPropagation()
  player.play()
  $('.container-lead').addClass('fade').one('transitionend', function (evt) {
    $(this).addClass('gone')
  })
}

function stopVideo () {
  var $lead = $('.container-lead')
  if (!$lead.hasClass('gone')) return
  $('.container-lead').removeClass('gone fade').one('transitionend', function (evt) {
    player.unload()
  })
}

// function player (opt) {
//   var opts = JSON.stringify({ 'method': opt })
//   $('#video').get(0).contentWindow.postMessage(opts, '*')
// }
