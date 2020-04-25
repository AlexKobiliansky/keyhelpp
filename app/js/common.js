$(document).ready(function(){
    /**
     * mobile-mnu customization
     */
    var mmenu = $('#mobile-mnu');
    var menuLogo = mmenu.data("logo");
    var $mmenu = mmenu.mmenu({
        navbars: [{
            content: [ "<img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/>" ],
        }],
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            // "pagedim-black",
            "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('is-active')
    });


    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "is-active" );
        }, 300);
    });
    /** end mobile-mnu customization */

    $('.works-slider').on('initialize.owl.carousel', function (e) {
        var $slides = $(this).find('.works-slide');
        var $totalSlides = $slides.length;
        var currentItem = e.item.index + 3;

        if($totalSlides < 10) {
            $('#works-nums .total').text('0'+$totalSlides);
        } else {
            $('#works-nums .total').text($totalSlides);
        }
        if(currentItem < 10) {
            $('#works-nums .current').text('0' + currentItem);
        } else {
            $('#works-nums .current').text(currentItem);
        }
    });


    var $worksSlider = $('.works-slider').owlCarousel({
        items: 1,
        loop: false,
        dots: true,
        autoplay: false,
        navText: ["", ""],
        autoWidth: true,
        responsive: {
            0: {
                nav: false,
                margin: 15
            },
            768: {
                nav: true,
                margin: 30
            }
        }
    });

    var $worksCurrent = $('#works-nums .current');
    var $worksTotal = $('#works-nums .total');

    $worksSlider.on('changed.owl.carousel', function (e) {
        var currentItem = e.item.index + 3;
        if(currentItem < 10) {
            $('#works-nums .current').text('0' + currentItem);
        } else {
            $('#works-nums .current').text(currentItem);
        }
    });


    $('.works-slide').photoswipe();




    function heightses() {
        if ($(window).width()>480) {
            $('.service-item-title').height('auto').equalHeights()
        }
    }

    $(window).resize(function() {
        heightses();
    });

    heightses();


    /** FORMS START */
    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });

    var uPhone = $('.user-phone');
    uPhone.mask("+7 (999) 999-99-99",{autoclear: false});

    uPhone.on('click', function (ele) {
        var needelem = ele.target || event.srcElement;
        needelem.setSelectionRange(4,4);
        needelem.focus();
    });

    $('input[type="checkbox"], select').styler();

    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });
});
