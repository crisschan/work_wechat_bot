$(document).ready(function(){
  if ($('.slide-window')) {

    var slideNum = $('.slide').length - 1
    var maxSlideNum = $('.slide').length - 1
    var slideWidth = $('.slide-window').outerWidth()
    var slideSetWidth = slideWidth * slideNum
    var controlSlideBtnLeft = '.slide-control-left'
    var controlSlideBtnRight = '.slide-control-right'
    var controlSlideBtnList = '.slide-control-btn ul li a'

    addSlideCtlBtn()

    var slideCurrent = 0
    var slideActiveBtn = 0
    var rotationInterval = setInterval(function(){
      slideCurrent++
      if (slideCurrent > maxSlideNum) {
        slideCurrent = 0
      }
      activation()
      sliding()
    }, 10000)

    $(controlSlideBtnLeft).on('click', function(){
      resetInterval()
      slideCurrent--
      if (slideCurrent < 0) {
        slideCurrent = maxSlideNum
      }
      activation()
      rotateArrow('left')
      sliding()
    })
    $(controlSlideBtnRight).on('click', function(){
      resetInterval()
      slideCurrent++
      if (slideCurrent > maxSlideNum) {
        slideCurrent = 0
      }
      activation()
      rotateArrow('right')
      sliding()
    })
    $(controlSlideBtnList).on('click', function(){
      resetInterval()
      slideCurrent = $(controlSlideBtnList).index(this)
      activation()
      sliding()
    })

    function addSlideCtlBtn() {
      var slideCtlBtn = '<div class="slide-control-btn"><ul>'
      for (var i = 0; i <= maxSlideNum; i++) {
        if (i==0) {
          slideCtlBtn += '<li><a class="active"></a></li>'
        }
        else {
          slideCtlBtn += '<li><a class=""></a></li>'
        }
      }
      slideCtlBtn += '</ul></div>'
      $('.slide-controller').append(slideCtlBtn)
    }
    function resetInterval() {
      clearInterval(rotationInterval)
      rotationInterval = setInterval(function(){
        slideCurrent++
        if (slideCurrent > maxSlideNum) {
          slideCurrent = 0
        }
        activation()
        sliding()
      }, 10000)
    }
    function activation() {
      slideActiveBtn = slideCurrent + 1
      $( controlSlideBtnList + '.active' ).removeClass()
      $('.slide-control-btn ul li:nth-child(' + slideActiveBtn + ') a').addClass('active')
    }
    function rotateArrow(direction) {
      var slideCtlLine1 = '.slide-control-' + direction + ' .slide-control-line:nth-child(1)'
      var slideCtlLine2 = '.slide-control-' + direction + ' .slide-control-line:nth-child(2)'
      $(slideCtlLine1).removeClass('rotate-' + direction + '-top')
      $(slideCtlLine2).removeClass('rotate-' + direction + '-down')
      $(slideCtlLine1).outerWidth()
      $(slideCtlLine2).outerWidth()
      $(slideCtlLine1).addClass('rotate-' + direction + '-top')
      $(slideCtlLine2).addClass('rotate-' + direction + '-down')
    }
    function sliding() {
      $('.slide-wrapper').css('left', slideCurrent * -slideWidth)
    }
  }
})
