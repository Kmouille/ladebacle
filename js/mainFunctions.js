// Toggle class menu
$(function () {
    $('.menu').on('click', function () {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $('.ss-menu-home').addClass('visible1');
            $('.ss-menu-music').addClass('visible2');
            $('.ss-menu-band').addClass('visible3');
            $('.ss-menu-shows').addClass('visible4');
            $('.ss-menu-contact').addClass('visible5');
        } else {
            $('.ss-menu-home').removeClass('visible1');
            $('.ss-menu-music').removeClass('visible2');
            $('.ss-menu-band').removeClass('visible3');
            $('.ss-menu-shows').removeClass('visible4');
            $('.ss-menu-contact').removeClass('visible5');
        }
    })
})
$(function () {
    $('.ss-menu').on('click', function () {
      $('.menu').removeClass('active');
      $('.ss-menu-home').removeClass('visible1');
      $('.ss-menu-music').removeClass('visible2');
      $('.ss-menu-band').removeClass('visible3');
      $('.ss-menu-shows').removeClass('visible4');
      $('.ss-menu-contact').removeClass('visible5');
    })
})
$(function () {
    $(window).on('scroll', function () {
        if ($('.menu').hasClass('active')) {
          $('.menu').removeClass('active');
          $('.ss-menu-home').removeClass('visible1');
          $('.ss-menu-music').removeClass('visible2');
          $('.ss-menu-band').removeClass('visible3');
          $('.ss-menu-shows').removeClass('visible4');
          $('.ss-menu-contact').removeClass('visible5');
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

// Manage vidéo
$(function () {
    $('video').on('click', function(event) {
      event.preventDefault();
      document.getElementById('tucoVideo').play();
    });
})

// Animations on scroll
$(function () {
    $(window).on('scroll', function () {
        let sizePage = $(window).height();
        let trigger = 100;
        // Animation en Y
        let element = document.getElementsByClassName('animatableY');
        for (var unit of element) {
          if (unit.getBoundingClientRect().top + trigger <= sizePage) {
            unit.classList.add('showed');
          }
        }

        // Animation en X
        let elementh2 = document.getElementsByClassName('animatableX');
        for (var unit of elementh2) {
          if (unit.getBoundingClientRect().top + trigger <= sizePage) {
            unit.classList.add('showed');
          }
        }

        // Animation opacity
        let elementOpacity = document.getElementsByClassName('animatableOpacity');
        for (var unit of elementOpacity) {
          if (unit.getBoundingClientRect().top + trigger <= sizePage) {
            unit.classList.add('showed');
          }
        }
    })
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

// Manage scroll up button
$(function () {
    let ecran = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      $(window).on('scroll', function () {
        let scrollNow = $(window).scrollTop();
        $(window).on('scroll', function functionName() {
          if (scrollNow > 600 && scrollNow > $(window).scrollTop()) {
            if ($('#upArrow').is(":hidden")) {
              $('#upArrow').show();
            }
          } else {
            $('#upArrow').hide();
          }
        })
        $('#upArrow').on('click', function () {
            $(window).scrollTop(0);
        })
      })
})

// Delete scroll tag on scroll down
$(function () {
    $(window).on('scroll', function () {
        let topPage = $(window).scrollTop();
        if (topPage >= 150) {
          $('#scrollDown').hide();
        } else {
          $('#scrollDown').show();
        }
    })
})
// Manage tag scroll down
$(function () {
    $('#scrollDown').on('click', function() {
      window.location.href = "#nextShow";
    });
})

// Locations
$(function () {
    $(".card").on('click', () => {});
})
// Location socials
$(function () {
  $('.facebook').on('click', function(event) {
    event.preventDefault();
    window.location.href = "https://www.facebook.com/NousSommesLaDebacle/";
  });
  $('.instagram').on('click', function(event) {
    event.preventDefault();
    window.location.href = "https://instagram.com/ladebacleinsta";
  });
  $('.soundcloud').on('click', function(event) {
    event.preventDefault();
    window.location.href = "https://soundcloud.com/ladebacle";
  });
  $('.bandcamp').on('click', function(event) {
    event.preventDefault();
    window.location.href = "https://ladebacle.bandcamp.com/";
  });
})
