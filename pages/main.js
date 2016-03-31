var $ = window.$ = window.jQuery = require('jquery')
require('bootstrap/dist/js/umd/carousel.js')
require('bootstrap/dist/js/umd/collapse.js')

var rolodex = require('./rolodex.js')
$('.carousel-item').first().addClass('active')
$('#clients-carousel').carousel()

rolodex()
$('#play').on('click', startVideo)
$('body').on('click', stopVideo)

function startVideo (e) {
  e.preventDefault()
  e.stopPropagation()
  player('play')
  $('.container-lead').addClass('fade').one('transitionend', function (evt) {
    $(this).addClass('gone')
  })
}

function stopVideo () {
  var $lead = $('.container-lead')
  if (!$lead.hasClass('gone')) return
  $('.container-lead').removeClass('gone fade').one('transitionend', function (evt) {
    player('unload')
  })
}

function player (opt) {
  var opts = JSON.stringify({ 'method': opt })
  $('#video').get(0).contentWindow.postMessage(opts, '*')
}
