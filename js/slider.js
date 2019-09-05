(function ($) {
    $.rSlider = function (element, settings) {
        this.element = (element instanceof $) ? element : $(element);

        this.defaults = {
            numSlides: 0,
            slidesContainerSelector: "",
            slidesContainer: null,
            slides: [],
            currentSlide: 1,
            animationTime: 500,
            currentSlideClass: "current-slide",
            showArrows: true,
            arrowsContainerHtml: "<div class='rslider-arrows'></div>",
            leftArrowHtml: "<div class='prev-button'><</div>",
            rightArrowHtml: "<div class='next-button'>></div>",
            showBullets: true,
            bulletsContainerHtml: "<div class='rslider-bullets'></div>",
            bulletHtml: "<span class='rslider-bullet'>o</span>",
        };

        this.options = $.extend({}, this.defaults, settings);

        this.init();
    }
}(jQuery));

$.rSlider.prototype = {
    init: function() {
        if (this.options.slidesContainerSelector == '') {
            this.element.find("> *").wrapAll( "<div class='js-rslider-container' />");
            this.options.slidesContainerSelector = ".js-rslider-container";
        }

        this.options.slidesContainer = this.element.find(this.options.slidesContainerSelector).first();
        this.options.slides = this.options.slidesContainer.find("> *");
        this.options.numSlides = this.options.slides.length;
        this.options.slidesContainer.width((this.options.numSlides * 100) + "%");

        this.options.slidesContainer.find("> *").first().addClass(this.options.currentSlideClass);

        this.addNavigationButtons();
        this.addBullets();
        this.addEvents();
    },
    nextSlide: function() {
        var nextSlide = this.options.currentSlide;
        if (this.options.currentSlide < this.options.numSlides) {
            nextSlide++;
        } else {
            nextSlide = 1;
        }
        this.setSlide(nextSlide);
    },
    prevSlide: function() {
        var prevSlide = this.options.currentSlide;
        if (this.options.currentSlide > 1) {
            prevSlide--;
        } else {
            prevSlide = this.options.numSlides;
        }
        this.setSlide(prevSlide);
    },
    setSlide: function(destinationSlide) {
        var currentSlide = this.options.currentSlide;
        var  direction = -1;
        var fromSlide = currentSlide;
        var toSlide = destinationSlide;
        if (destinationSlide < currentSlide) {
            direction = 1;

            fromSlide = destinationSlide;
            toSlide = currentSlide;
        }

        var totalWidth = 0;
        for (i=fromSlide;i < toSlide; i++) {
            totalWidth += this.options.slides[i-1].offsetWidth;
        }

        var slider = this;

        this.options.slidesContainer.animate({left: "+=" + (direction*totalWidth) + "px"}, this.options.animationTime, function(){
            slider.options.currentSlide = destinationSlide;
            slider.options.slides[currentSlide-1].classList.remove(slider.options.currentSlideClass);
            slider.options.slides[destinationSlide-1].classList.add(slider.options.currentSlideClass);
        });

    },
    addNavigationButtons: function() {
        if (this.options.showArrows) {
            var slider = this;
            var buttonsContainer = $(this.options.arrowsContainerHtml);
            var leftArrow = $(this.options.leftArrowHtml).on("click", function () {
                slider.prevSlide()
            });
            var rightArrow = $(this.options.rightArrowHtml).on("click", function () {
                slider.nextSlide()
            });

            buttonsContainer.append(leftArrow);
            buttonsContainer.append(rightArrow);

            this.element.append(buttonsContainer);
        }
    },
    addBullets: function() {
        if (this.options.showBullets) {
            var slider = this;
            var bulletsContainer = $(this.options.bulletsContainerHtml);
            for(var i = 1; i <= slider.options.numSlides; i++) {
                var bullet = $(this.options.bulletHtml).on("click", (function (j) {
                    return function() {
                        slider.setSlide(j);
                    }
                })(i));
                bulletsContainer.append(bullet);
            }
            this.element.append(bulletsContainer);
        }
    },
    addEvents: function() {
        var slider = this;

        $(window).on('resize', function(){
            slider.recalculateSlidePosition();
        });
        slider.element.on('swipeleft',function(e,data){
            slider.nextSlide();
        });
        slider.element.on('swiperight',function(e,data){
            slider.prevSlide();
        });
    },
    recalculateSlidePosition: function() {
        var totalWidth = 0;
        for (i=1;i < this.options.currentSlide; i++) {
            totalWidth += this.options.slides[i - 1].offsetWidth;
        }

        this.options.slidesContainer.css("left", "-" + totalWidth + "px");
    }
};

var slider = new $.rSlider(".slider", {
    slidesContainerSelector: ".slider__slide-container"
});