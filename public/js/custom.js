(function($){
    $('#preload').remove();

    //TESTING
    for(var i = 1; i<=9; i++) {
        $('#projects-row').append(`
                <div class="col-sm-12 col-md-6 col-lg-4 project-wrapper">
                    <div class="project-placeholder"></div>
                </div>
            `);
    }

    var is_iPad = navigator.userAgent.match(/iPad/i) != null;
    var bgcolors = ['#00695C', '#3F51B5', '#EEEEEE', '#EEEEEE']
    var gradient_classes = ['gradient-blue-grey', 'gradient-light-blue', 'gradient-grey', 'skip'];
    var mobile_colors = ['#004D40', '#3F51B5', '#EEEEEE', '#3F51B5'];
    $.material.init();

    if(mobilecheck() || is_iPad) {
        $('#about-content').removeClass('well').removeClass('well-rounded').removeClass('well-teal');
        $('#skills-container').removeClass('well').removeClass('well-rounded');
        $('#section2-bg').closest('div').remove();
        $('.text-left').removeClass('.text-left').addClass('text-right');
        $('#section4').removeClass('gradient-grey-purple').addClass('gradient-grey-purple-mob');
        $('#button-up').remove();
        $('#button-down').remove();
    }
    else {
        console.log('not mobile')
        $('.project-placeholder').addClass('prime-grow');
        $('.mob-down-arrow').remove();
    }

    $('.name').animate({'opacity': '1', 'padding-top': '0'}, 500, function() {
        $('#occ').animate({'opacity': '1', 'padding-top': '0'}, 500, function() {
            $('.about-me').animate({'opacity': '1', 'padding-top': '0'}, 500, function() {
                $('#about-buttons').animate({'opacity': '1', 'padding-top': '0'}, 500);
            });
        });
    });

    $('#button-up').hide();
    $('#button-up').on('click', function() {
        $.fn.fullpage.moveSectionUp();
    });

    $('#button-down').on('click', function() {
        $.fn.fullpage.moveSectionDown();
    });

    $('#send-button').prop('disabled', 'true');
    $('body').css('background-color', bgcolors[0]);
    $('.mobile-browser-color').attr('content', mobile_colors[0]);

    $('#contact-page-container').toggleClass('contact-page-expand');
    var started = false;
    $('#fullpage').fullpage({
        verticalCentered: true,
        scrollOverflow: true,
        onLeave: function(index, nextIndex, direction) {

            $('.mobile-browser-color').attr('content', mobile_colors[nextIndex-1]);
            $('.'+gradient_classes[index-1]).css('opacity', 0);
            $('.'+gradient_classes[nextIndex-1]).css('opacity', 1);
            $('body').css('background-color', bgcolors[nextIndex-1]);

            if(nextIndex == 2) $('.project-placeholder').addClass('grow');
            if(nextIndex == 4 || index == 4) $('#contact-page-container').toggleClass('contact-page-contract');

            //Button fading
            if(nextIndex == 1) $('#button-up').delay(700).fadeOut(200);
            else if (nextIndex == 4) $('#button-down').delay(700).fadeOut(200);
            else {
                $('#button-up').delay(700).fadeIn(200);
                $('#button-down').delay(700).fadeIn(200);
            }

        },
        afterLoad: function(anchorLink, index){
            var loadedSection = $(this);

            $('#section1-bg').hide();
            $('#section2-bg').hide();

            if(index === 1 && !started) {
                $('#section1-img').remove();
                $('#section1-bg').append('<img id="section1-img" src="img/crane_animated.svg"></img>');
                var bg1 = document.querySelectorAll('#section1-img');
                SVGInjector(bg1, injectorOptions);
                $('#section1-bg').show();
            } else if(index === 2) {

                $('#section2-img').remove();
                $('#section2-bg').append('<img id="section2-img" src="img/ts_animated.svg"></img>');
                var bg2 = document.querySelectorAll('#section2-img');
                SVGInjector(bg2, injectorOptions);
                $('#section2-bg').show();
                setTimeout(function() {
                    $('#section2-bg').animate({'opacity': '0.1'});
                },8000);
            }

        }
    });

    var injectorOptions = {
      evalScripts: 'once',
    };

    // Inject section 1 background

    var bg1 = document.querySelectorAll('#section1-img');
    SVGInjector(bg1, injectorOptions);

    function expand(el_name) {

        var el_height = $(el_name).height();
        var el_width = $(el_name).width();

        $(el_name).height(0).width(0);

        $(el_name).animate({
            'height': el_height,
            'width:': el_width
        }, 1000);
    }

    /* FORM HANDLING */

    $('form').submit(function(e) {
        e.preventDefault();
        sendData();
    });

    $('input').keyup(function() {
        if(isFormValid()) {
            $('#send-button').prop("disabled", false);
        }
        else {
            $('#send-button').prop("disabled", true);
        }
    });

    $('textarea').keyup(function() {
        console.log("Triggered");
        if(isFormValid()) {
            $('#send-button').prop("disabled", false);
        }
        else {
            $('#send-button').prop("disabled", true);
        }
    });

    function sendData() {

            var n = $('#inputName').val().trim();
            var e = $('#inputEmail').val().trim();
            var s = $('#inputSubject').val().trim();
            var m = $('#message-text').val().trim();

            var data = {
                name: n,
                email: e,
                subject: s,
                message: m
            };

            console.log(data.name+" "+data.email+" "+data.subject+" "+data.message);
            var xhr = new XMLHttpRequest();
            xhr.open("post", "/logmessage", true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

            // send the collected data as JSON
            xhr.send(JSON.stringify(data));

            xhr.onloadend = function () {
            // done
            };
            //post('/logmessage', data, "post");

            $('#inputName').prop('disabled', true);
            $('#inputEmail').prop('disabled', true);
            $('#inputSubject').prop('disabled', true);
            $('#message-text').prop('disabled', true);
            $('#send-button').prop('disabled', true);
            $('#contact-header').html("<br><strong>Thank you!</strong><br>I will get back to you shortly.");

    }

    function isFormValid() {
        if(validateEmail($('#inputEmail').val().trim()) && $('#inputName').val().trim().length!=0 && $('#inputSubject').val().trim().length!=0 && $('#message-text').val().trim().length!=0) return true;
        else return false;
    }

    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
})(jQuery);
