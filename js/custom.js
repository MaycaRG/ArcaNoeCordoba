/*
 * Arca Noé Córdoba Webpage - Custom javascript
 * Author: Arca Noé Córdoba Team
 */

$(document).ready(function($) {

    var isClosed = false; // Shows if the menu is closed
    var iterator = 0; // Iterator to count the slides
    var web = ''; // Store the search url
    var searchClicked = true; // Shows if the search box was clicked to avoid the focus
    var sentences = [ // Sentences to show on the main page
        '"Un país, una civilización se puede juzgar por la forma en que trata a sus animales".<br><b>Mahatma Gandhi (1869-1948)<br>Político y pensador.</b>',
        '"Una de las glorias de la civilización sería el haber mejorado la suerte de los animales".<br><b>Théophile Gautier (1811-1872)<br>Poeta, crítico y novelista.</b>',
        '"Si un hombre aspira a una vida correcta, su primer acto de abstinencia es el de lastimar animales".<br><b>León Tolstói (1828 - 1910)<br>Novelista.</b>',
        '"Cuando un hombre se apiade de todas las criaturas vivientes, sólo entonces será noble".<br><b>Buda <span>(563-483 a. C. - 483-411 a. C.)</span><br>Sabio.</b>',
        '"Podemos juzgar el corazón de una persona por la forma en que trata a los animales".<br><b>Immanuel Kant (1724 - 1804)<br>Filósofo.</b>',
        '"Los ojos de un animal tienen el poder de hablar un gran idioma.".<br><b>Martin Buber (1878 - 1965)<br>Filósofo.</b>',
        '"El alma es la misma en todas las criaturas, aunque el cuerpo de cada uno es diferente."<br><b>Hipócrates <span>(460 a. C. - 370 a. C.)</span><br>Médico.</b>',
        '"Cuando observas, conoces; cuando conoces, amas; y si amas, proteges."<br><b>Jordi Sabater Pi (1922 - 2009)<br>Primatólogo.</b>',
        '"El hombre puede medir el valor de su propia alma en la mirada agradecida que le dirija un animal al cual ha socorrido."<br><b>Platón <span>(427 a. C. - 347 a. C.)</span><br>Filósofo.</b>',
        '"Las atrocidades no lo son menos si ocurren en laboratorios y se llaman investigación biomédica."<br><b>George Bernard Shaw (1856 - 1950)<br>Escritor.</b>'
    ];

    // Wrap this class on the main page only
    $('#wrap').wrap('.main-page');
    // Add the wellcome class to show the wellcome message
    $('.main-page')
        .prepend('<div class="wellcome"><div class="wellcome-logo"></div></div>')
    // If I am positioned on the main page
    if ($('body').children(".main-page").is(".main-page")) {
        addSentence();
        fillSliders();
        calculateHeight();
        $(window).resize(function() {
            calculateHeight();
        });
    }
    // Add the menu on every page
    $('#wrap').prepend($('.main-menu'));
    // If the user is not using the native browser
    if (!usingNativeBrowser()) {
        // Add the video
        loadVideo();
        // Add menu logic
        $('.arca-menu').click(function() {
            arca_menu_cross();
        });
        // If the menu opens or closes, the wrap element will be updated
        $('[data-toggle="offcanvas"]').click(function() {
            $('#wrap').toggleClass('toggled');
        });
        // Open the dropdown on the main menu
        $('.main-menu .dropdown').click(function() {
            $('.main-menu .dropdown').toggleClass('open');
        });
        // Add search button logic
        searchButtonLogic();

    } else { // If the user is using an old native browser
        $("#wrap").wrap("<div class='native-browser'></div>");
        // If we are not on the main page, add space on top
        if (!$("body").children().is(".main-page")) {
            $("body #wrap .main-menu #button-menu").css("padding-bottom", 40);
        }
        redirectSearchSection();
        openMainMenu();
        showSubmenu();
    }

    openModal();

    /* START FUNTIONS */

    /**
     * This function sets the main sliders
     */
    function fillSliders() {

        // Set the first slider
        var gallery = $('.gallery.peques').flickity();
        // Set the second slider
        var gallery2 = $('.gallery.events').flickity();

        $.ajax({
            url: 'templates/masterbootstrap/php/getFilenames.php',
            success: function(data) {
                var dataTmp = data.split('/');
                var animals = dataTmp[0].split('-');
                var events = dataTmp[1].split('-');
                var descriptions = dataTmp[2].split('-');
                var firstSliderPercentage = 0.7;
                var secondSliderPercentage = 0.3;

                slider(firstSliderPercentage, animals, gallery, descriptions);
                slider(secondSliderPercentage, events, gallery2, descriptions);
            }
        });
    }
    /**
     * This function calculates the slider heights, reads the description file
     * and puts images and descriptions on both main sliders
     */
    function slider(sliderPercentage, myArray, gallery, descriptions) {
        var values, name, images = "";
        var windowHeight = $(window).height();
        var sliderHeight = sliderPercentage * windowHeight;
        if (sliderPercentage == 0.3) {
            var eventDescriptions = descriptions.toString().split(',');
            var count = 0; // Iterate to show the next description
        }

        // It will loop through the array and get the file names without
        // extension to collect all images
        $.each(myArray, function(key, val) {
            if (val !== "") {
                values = val.split('.');
                name = values[0];
                if (sliderPercentage == 0.7) { // Animals images
                    images += '<div class="image-names"><span class="friend-names">' +
                        name.substr(1, name.length) + '</span>' +
                        '<img id="slide' + iterator +
                        '" class="gallery-cell" style="height: ' + sliderHeight +
                        'px;" src="/templates/masterbootstrap/images/slider/animals/' +
                        val + '" alt="' + name + '" title="' +
                        name.substr(1, name.length) + '" /></div>';
                } else { // Events images
                    images += '<div><span class="event-descriptions-style">' +
                        eventDescriptions[count] + '</span>' + '<img id="slide' +
                        iterator + '" class="gallery-cell" style="height: ' +
                        sliderHeight +
                        'px;" src="/templates/masterbootstrap/images/slider/events/' +
                        val + '" alt="' + name + '" title="' + name + '" /></div>';

                    count++;
                }
            }
            iterator++;
        });

        // Add images to the slider
        var $cellElems = $(images);
        gallery.flickity('append', $cellElems);

        setTimeout(function() {
            $('.gallery.peques').addClass('is-expanded').flickity('resize');
            $('.gallery.events').addClass('is-expanded').flickity('resize');
            $('.gallery.peques').removeClass('is-expanded').flickity('resize');
            $('.gallery.events').removeClass('is-expanded').flickity('resize');
            // Add max-width to the event descriptions
            $('.gallery .event-descriptions-style')
                .css('max-width', $(window).width());
        }, 3800);

        setTimeout(function() {
            $('.main-page .wellcome').css('display', 'none');
        }, 5000);

        // Get all elements and remove the js-flickity elements added
        var cellElements = gallery.flickity('getCellElements');
        gallery.flickity('remove', cellElements[0]);
        gallery.flickity('remove', cellElements[1]);
        gallery.flickity('remove', cellElements[2]);
        gallery.flickity('remove', cellElements[3]);
    }
    /**
     * Open or closes the main menu
     */
    function arca_menu_cross() {
        if (isClosed == true) {
            $('.overlay').hide();
            $('.arca-menu').removeClass('is-open');
            $('.arca-menu').addClass('is-closed');
            // It will do that on the main page
            if ($('body').children().hasClass('main-page')) {
                $('body').toggleClass('hide-scroll');
            }
            isClosed = false;
        } else {
            $('.overlay').show();
            $('.arca-menu').removeClass('is-closed');
            $('.arca-menu').addClass('is-open');
            if ($('body').children().hasClass('main-page')) {
                $('body').toggleClass('hide-scroll');
            }
            isClosed = true;
            removeMenuLogoAnimation();
        }
    }
    /**
     * Calculate the height for main page sliders
     */
    function calculateHeight() {
        var windowHeight = $(window).height();
        var mainSliderHeight = 0.7 * windowHeight;
        var secondSliderHeight = 0.3 * windowHeight;
        $('.gallery.js-flickity.peques').css('height', mainSliderHeight);
        $('.gallery.js-flickity.events').css('height', secondSliderHeight);
        $('.gallery.js-flickity.peques .gallery-cell')
            .css('height', mainSliderHeight);
        $('.gallery.js-flickity.events .gallery-cell')
            .css('height', secondSliderHeight);
        $('.gallery .event-descriptions-style')
            .css('max-width', $(window).width());
    }
    /**
     * Add a famous sentence when the page is reloaded
     */
    function addSentence() {
        // Get a random number to show a famous sentence on the main page
        var rand = sentences[Math.floor(Math.random() * sentences.length)];
        $('.wellcome').prepend('<p class="great-sentence">' + rand + '</p>');
    }
    /**
     * Remove the menu and logo animation when the magnifying glass is closed
     * on mobile view
     */
    function removeMenuLogoAnimation() {
        $(".arca-home").removeClass("init-animation");
        $(".arca-menu").removeClass("init-animation");
    }
    /**
     * Init the menu and logo animation when the magnifying glass is opened
     * on mobile view
     */
    function initMenuLogoAnimation() {
        $(".arca-home").addClass("init-animation");
        $(".arca-menu").addClass("init-animation");
    }
    /**
     * Activate video in chrome
     */
    function loadVideo() {
        $('.arca-video video').get(0).play();
    }
    /**
     * Add the search logic when the user clicks to deploy the search button
     */
    function searchButtonLogic() {
        $('.search-button').click(function(e) {
            var senderElement = e.target;

            if (!$(this).hasClass("open-search-button")) {
                setTimeout(function() {
                    $('.input-search').focus();
                }, 300);
            } else {
                $('.input-search').focus();
            }
            $(this).addClass("open-search-button");
            // Add it was selected
            searchClicked = true;
            // Only on mobile view
            if ($(window).width() <= 1024) {
                initMenuLogoAnimation();
            }
            // If click again and only on the magnifying glass, it will
            // redirect the web with the typed element to the search page
            if ($('.input-search').val() != '' &&
                $(senderElement).hasClass('open-search-button')) {
                web = 'component/search/?searchword=' + $('.input-search').val() +
                    '&searchphrase=all&Itemid=106';
                window.location.href = web;
            }

            // If on mobile view the close button is clicked, remove the class
            // open-search-button to close the search box
            if (!$(senderElement).hasClass("search-button") &&
                !$(senderElement).hasClass("input-search") &&
                ($(senderElement).hasClass('.close-search-button') ||
                    $(senderElement).has('span'))) {
                $(".search-button").removeClass("open-search-button");
                $('.input-search').val('');
                removeMenuLogoAnimation();
            }
        });
        // If push enter on the search box when there is text, it will Redirect
        // the web with the entered text
        $('.input-search').keydown(function(e) {
            if (e.keyCode === 13 && $('.input-search').val() != '') {
                web = '/component/search/?searchword=' + $(this).val() +
                    '&searchphrase=all&Itemid=106';
                window.location.href = web;
            }
        });
        // If clicked again on the magnifying glass,
        // it will avoid the magnifying glass closing
        $('.input-search').focusout(function() {
            if (!searchClicked) {
                $(".search-button").removeClass("open-search-button");
                $('.input-search').val('');
            }
            // Initialize the value
            searchClicked = false;
        });
        // If clicked on a different element to the magnifying glass, close it
        $(document).click(function(event) {
            if (!$(event.target).closest('.search-button').length) {
                if (!searchClicked && !$(event.target)
                    .hasClass("mobile-search-anchor")) {
                    $(".search-button").removeClass("open-search-button");
                    $('.input-search').val('');
                    removeMenuLogoAnimation();
                }
            }
        });
        // If click on the search button on mobile view, open the search box
        $('.mobile-search').click(function() {
            $('#wrap').toggleClass('toggled');
            isClosed = true;
            arca_menu_cross();
            $('.search-button').addClass("open-search-button");
            initMenuLogoAnimation();
        });
    }

    /**
     * Notify if the user is using an old browser
     * @return isAndroidBrowser: Boolean which notify if the user is using an
     *                           old browser
     */
    function usingNativeBrowser() {

        var navU = navigator.userAgent;

        // Android Mobile
        var isAndroidMobile = navU.indexOf('Android') > -1 &&
            navU.indexOf('Mozilla/5.0') > -1 && navU.indexOf('AppleWebKit') > -1;

        // Apple webkit
        var regExAppleWebKit = new RegExp(/AppleWebKit\/([\d.]+)/);
        var resultAppleWebKitRegEx = regExAppleWebKit.exec(navU);
        var appleWebKitVersion =
            (resultAppleWebKitRegEx === null ? null :
                parseFloat(regExAppleWebKit.exec(navU)[1]));

        // Chrome
        var regExChrome = new RegExp(/Chrome\/([\d.]+)/);
        var resultChromeRegEx = regExChrome.exec(navU);
        var chromeVersion =
            (resultChromeRegEx === null ? null :
                parseFloat(regExChrome.exec(navU)[1]));

        // Native Android Browser
        var isAndroidBrowser = isAndroidMobile && (appleWebKitVersion !== null &&
            appleWebKitVersion < 537) || (chromeVersion !== null &&
            chromeVersion < 37);

        return isAndroidBrowser;
    }
    /**
     * Call to fillModal when bankia or cajasur is clicked
     */
    function openModal() {
        $('.cajasur a').click(function() {
            fillModal("cajasur", "ES09 0237 0197 1091 5619 7772", "CSURES2CXXX");
        });

        $('.bankia a').click(function() {
            fillModal("bankia", "ES11 2038 5859 2160 0059 0703", "CAHMESMMXXX");
        });
    }
    /**
     * Add content to the bank modal
     */
    function fillModal(bank, iban, swiftbic) {
        var dialog;
        if (bank == "cajasur") {
            $('.copy-iban').removeClass('hidden');
            $('.copy-swiftbic').removeClass('hidden');
            $('.br').removeClass('hidden');
            if (usingNativeBrowser()) {
                $('#cajasur-dialog2 #iban2').text(iban);
                $('#cajasur-dialog2 #swiftbic2').text(swiftbic);
                dialog = "#cajasur-dialog2"
            } else {
                $('#cajasur-dialog #iban').text(iban);
                $('#cajasur-dialog #swiftbic').text(swiftbic);
                dialog = "#cajasur-dialog"
            }
            $(dialog).dialog({
                resizable: true,
                height: "auto",
                width: 400,
                modal: true,
                buttons: {
                    Donar: function() {
                        window.open('https://www.cajasur.es/');
                    },
                    Cancelar: function() {
                        $(this).dialog("close");
                    }
                }
            });
        }
        $('.copy-bank-data').click(function() {
            new Clipboard('.copy-bank-data');
        });
    }
    /*
     * Remove the dropdown-menu when the menu is clicked to show the options
     */
    function showSubmenu() {
        var previousTarjet = null;
        $('.dropdown-toggle').click(function() {
            var _this = this; // Register the click
            $('.dropdown-toggle').each(function() {
                if (!$(this).next().hasClass('dropdown-menu') &&
                    _this !== previousTarjet) {
                    $(this).next().addClass('dropdown-menu');
                }
            });
            $(this).next().toggleClass('dropdown-menu');
            previousTarjet = this;
        });
    }
    /**
     * If the search button is clicked, redirect to the search section
     */
    function redirectSearchSection() {
        $('.search-button').click(function() {
            web = '/buscar';
            window.location.href = web; // Redirect the web with the entered text
        });
    }
    /**
     * If the main menu is clicked, show it
     */
    function openMainMenu() {
        $(".arca-menu").click(function() {
            $("#button-menu .native-browser-menu").toggleClass("active");
            $(".overlay").toggleClass("active");
            $("body").toggleClass("hideScroll");
            // Add the mobile height and substract 88 because is the menu
            // margin top
            $(".native-browser .main-menu .sidebar-nav")
                .css("height", $(window).height() - 88);
        });
    }

    /* END FUNCTIONS*/


    // When all content has been loaded
    $(window).load(function() {

        // Wait until images have been loaded
        setTimeout(function() {
            // Open the correct URL from every image
            $('.gallery.peques .image-names img, .gallery.peques .image-names .friend-names')
                .click(function(event) {
                    if ($(this).parent().hasClass('is-selected')) {
                        var title = $('.gallery.peques .is-selected img')
                            .attr('alt').toLowerCase();
                        if (title.substr(0, 1) == 'p') {
                            window.open('/adopta/perrosadopta/item/' +
                                title.substr(1, title.length));
                        } else {
                            window.open('/adopta/gatosadopta/item/' +
                                title.substr(1, title.length));
                        }
                    }
                });
            $('.gallery.events .flickity-slider div').click(function(event) {
                if ($(this).hasClass('is-selected')) {
                    var title =
                        $('.gallery.events .flickity-slider div.is-selected img')
                        .attr('title').toLowerCase();
                    window.open('/participa/' + title);
                }
            });

        }, 1000);
    });
});
