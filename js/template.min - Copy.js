if("undefined"!=typeof MooTools){var mHide=Element.prototype.hide;Element.implement({hide:function(){return this.hasClass("deeper")?this:void mHide.apply(this,arguments)}})}!function(t){t(document).ready(function(){t(".parent").children("ul").length>0&&(t(".parent").addClass("dropdown"),t(".parent > a").addClass("dropdown-toggle"),t(".parent > a").attr("data-toggle","dropdown"),t(".parent > a").append('<b class="caret"></b>'),t(".parent > ul").addClass("dropdown-menu"));var o=document.querySelector("header"),e=new Headroom(o);e.init(),t(".dropdown-menu input, .dropdown-menu label").click(function(t){t.stopPropagation()}),t(".tooltip").tooltip({html:!0});var n=220,a=500;t(window).scroll(function(){t(this).scrollTop()>n?t(".back-to-top").fadeIn(a):t(".back-to-top").fadeOut(a)}),t(".back-to-top").click(function(o){return o.preventDefault(),t("html, body").animate({scrollTop:0},a),!1})})}(jQuery);