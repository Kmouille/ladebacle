// Toggle class menu
$(function () {
    $('.menu').on('click', function () {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $('.ss-menu-band').addClass('visible1');
            $('.ss-menu-music').addClass('visible2');
            $('.ss-menu-shows').addClass('visible3');
            $('.ss-menu-contact').addClass('visible4');
        } else {
            $('.ss-menu-band').removeClass('visible1');
            $('.ss-menu-music').removeClass('visible2');
            $('.ss-menu-shows').removeClass('visible3');
            $('.ss-menu-contact').removeClass('visible4');
        }
    })
})
$(function () {
    $('.ss-menu').on('click', function () {
      $('.menu').removeClass('active');
      $('.ss-menu-band').removeClass('visible1');
      $('.ss-menu-music').removeClass('visible2');
      $('.ss-menu-shows').removeClass('visible3');
      $('.ss-menu-contact').removeClass('visible4');
    })
})
$(function () {
    $(window).on('scroll', function () {
        if ($('.menu').hasClass('active')) {
          $('.menu').removeClass('active');
          $('.ss-menu-band').removeClass('visible1');
          $('.ss-menu-music').removeClass('visible2');
          $('.ss-menu-shows').removeClass('visible3');
          $('.ss-menu-contact').removeClass('visible4');
        }
    })
})

// Script adresse Email
// Listener pour chargement adresse mailto
window.addEventListener("load", function () {
  if (document.getElementById('insertMail')) {
    let name = "ladebaclemail" ;
    let domain = "gmail.com" ;
    let divMail = document.getElementById('insertMail');
    let newAhref = document.createElement('a');
    newAhref.href = "mailto:" + name + '@' + domain;
    newAhref.innerHTML = name + '@' + domain;
    divMail.appendChild(newAhref);
  }
})

// resize reload
$(function () {
  let initialWidth = $(window).innerWidth();
  $(window).on('resize', function () {
    let newWidth = $(window).innerWidth();
    if (initialWidth != newWidth) {
      document.location.reload(true);
    }
  })
})
