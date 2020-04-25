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
            "pagedim-black",
            "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var mmenuBtn = $(".mmenu-btn");
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

    $worksSlider.on('changed.owl.carousel', function (e) {
        var currentItem = e.item.index + 3;
        if(currentItem < 10) {
            $('#works-nums .current').text('0' + currentItem);
        } else {
            $('#works-nums .current').text(currentItem);
        }
    });


    $('.reviews-slider').on('initialize.owl.carousel', function (e) {
        var $slides = $(this).find('.review-item');
        var $totalSlides = $slides.length;
        // var currentItem = e.item.index + 2;
        var currentItem = (e.item.index + 2) - e.relatedTarget._clones.length / 2;

        if($totalSlides < 10) {
            $('#reviews-nums .total').text('0'+$totalSlides);
        } else {
            $('#reviews-nums .total').text($totalSlides);
        }
        if(currentItem < 10) {
            $('#reviews-nums .current').text('0' + currentItem);
        } else {
            $('#reviews-nums .current').text(currentItem);
        }
    });

    var $reviewsSlider = $('.reviews-slider').owlCarousel({
        items: 1,
        loop: true,
        dots: true,
        autoplay: false,
        navText: ["", ""],
        autoWidth: true,
        startPosition: 1,
        center: true,
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

    $reviewsSlider.on('changed.owl.carousel', function (e) {
        var currentItem = (e.item.index + 1) - e.relatedTarget._clones.length / 2;
        if(currentItem < 10) {
            $('#reviews-nums .current').text('0' + currentItem);
        } else {
            $('#reviews-nums .current').text(currentItem);
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

    $('.preloader').fadeOut();


    /** FORMS START */

    $(function() {
        $("a[href='#popup-form']").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 300,
            mainClass: "my-mfp-zoom-in"
        })
    });

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
        var t = th.find(".btn").text();
        th.find(".btn").prop("disabled", "disabled").addClass("disabled").find('span').text("Отправлено!");

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {
            setTimeout(function() {
                th.find(".btn").removeAttr('disabled').removeClass("disabled").find('span').text(t);
                th.trigger("reset");
                $.magnificPopup.close();
            }, 2000);
        });
        return false;
    });



    function loadScript(url, callback){
        var script = document.createElement("script");

        if (script.readyState){  // IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Другие браузеры
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }


    function initMap() {
        ymaps.ready(function(){
            var mapId = $('#map'),
                attitude = mapId.data("att"),
                longtitude = mapId.data("long"),
                zoom = mapId.data("zoom"),
                marker = mapId.data("marker"),
                map = new ymaps.Map("map", {
                    center: [attitude, longtitude],
                    controls: ['zoomControl'],
                    zoom: zoom
                }),

                myPlacemark = new ymaps.Placemark(map.getCenter(), {}, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: marker,
                    // Размеры метки.
                    iconImageSize: [30, 46],
                });

            map.geoObjects.add(myPlacemark);

            var position = map.getGlobalPixelCenter();
            if ($(window).width() >= 992) {
                map.setGlobalPixelCenter([position[0] + 75, position[1]]);
            }
        });
    }

    if( $('#map').length )         // use this if you are using id to check
    {
        setTimeout(function(){
            loadScript("https://api-maps.yandex.ru/2.1/?apikey=e470b388-a1d0-4edf-acdc-34b4bc5bedee&lang=ru_RU&loadByRequire=1", function(){
                initMap();
            });
        }, 2000);
    }
});
