/* jQuery TG-Slider v 0.5
 * Copyright (c) 2013 Michael Lay
 * http://www.themegift.com/tgslider/
 * Licensed under MIT
 * Required animation.css - http://daneden.me/animate
 */
(function($) {

    var TgSlider = {
        init : function(options, el) {
            var self = this;
            // Transition effects created by Danial Eden - http://daneden.me/animate
            self.transitionIn = ["bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp", "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft", "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "fadeInUp", "fadeInUpBig", "flip", "flipInX", "flipInY", "lightSpeedIn", "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft", "rotateInUpRight", "slideInUp", "slideInDown", "slideInLeft", "slideInRight", "zoomIn", "zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp"];
            self.transitionOut = ["bounceOut", "bounceOutDown", "bounceOutLeft", "bounceOutRight", "bounceOutUp", "fadeOut", "fadeOutDown", "fadeOutDownBig", "fadeOutLeft", "fadeOutLeftBig", "fadeOutRight", "fadeOutRightBig", "fadeOutUp", "fadeOutUpBig", "flipOutX", "flipOutY", "lightSpeedOut", "rotateOut", "rotateOutDownLeft", "rotateOutDownRight", "rotateOutUpLeft", "rotateOutUpRight", "slideOutUp", "slideOutDown", "slideOutLeft", "slideOutRight", "zoomOut", "zoomOutDown", "zoomOutLeft", "zoomOutRight", "zoomOutUp"];
            // Slider Element
            self.elem = $(el);
            // Extend user options
            self.options = $.extend({}, $.fn.tgSlider.options, options);
            //Set height
            self.elem.css({height: self.options.height + 'px'});
            //base.userOptions = options;
            self.loadContent();
        },
        loadContent : function() {
            var self = this;
            // Get slide image
            var img = self.elem.find("img");
            // Set height
            self.resetHeight($(img).height());
            // Queue Slide image
            self.seqEle = [];
            img.each(function() {
                self.seqEle.push(this);
            });
            // Set position
            for (var i = 0; i < self.seqEle.length; i++) {
                var leftPercent = i * 100;
                $(self.seqEle[i]).css({
                    left : leftPercent > 0 ? leftPercent + '%' : leftPercent + 'px'
                });
            }

            self.slide();
        },
        slide : function() {
            var self = this;
            var index = 0;
            self.timer = setInterval(function() {
                if (index >= self.seqEle.length) {
                    index = 0;
                }
                self.slideIn(index);
                index++;
            }, self.options.speed);
            self.navClick();
        },
        slideIn : function(index) {
            var self = this;
            var nextIndex = index + 1;
            if (nextIndex >= self.seqEle.length) {
                nextIndex = 0;
            } else {
                nextIndex = index + 1;
            }
            self.nextIndex = nextIndex;
            $(self.seqEle[nextIndex]).css({
                left : 0
            });

            self.randomEffect = Math.floor((Math.random() * self.transitionIn.length));
            $(self.seqEle[nextIndex]).removeClass().addClass("animated " + self.transitionIn[self.randomEffect]);

            self.slideOut(index);
        },
        slideOut : function(index) {
            var self = this;
            self.prevIndex = index;
            $(self.seqEle[index]).removeClass().addClass("animated " + self.transitionOut[self.randomEffect]);
        },
        navClick : function() {
            var self = this;
            self.prevIndex = self.nextIndex || 0;
            $('.tg-nav.prev').on('click', function() {
                clearInterval(self.timer);
                self.slideIn(self.nextIndex--);
            });
            $('.tg-nav.next').on('click', function() {
                clearInterval(self.timer);
                self.slideIn(self.nextIndex);
            });
        },
        resetHeight : function(height) {
            var self = this;
            if (height < self.elem.height()) {
                self.elem.css({
                    height : height + 'px'
                });
            }
        }
    };

    $.fn.tgSlider = function(options) {
        var tgSlider = Object.create(TgSlider);
        var el = this;
        $.fn.tgSlider.options = $.extend({}, $.fn.tgSlider.options, options);
        $(window).on('resize orientationchange', function(e) {
            var height = $(el).find('img').height();
            if (height > $.fn.tgSlider.options.height) {
                height = $.fn.tgSlider.options.height;
            }
            $(el).css({
                height : height + 'px'
            });
        });

        return this.each(function() {
            tgSlider.init(options, this);
        });
    };

    $.fn.tgSlider.options = {
        speed : 3000,
        height : 600
    };
})(jQuery);
