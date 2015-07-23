/* jQuery Tiny Pub/Sub - v0.7 - 10/27/2011
* http://benalman.com/
* Copyright (c) 2011 "Cowboy" Ben Alman; Licensed MIT, GPL 
* https://gist.github.com/661855
* */

(function($) {

    var o = $({});

    $.subscribe = function() {
        o.on.apply(o, arguments);    
        return arguments;
    };
    
    $.subscribeOnce = function() {
        o.one.apply(o, arguments);
        return arguments;
    };

    $.unsubscribe = function() {
        o.off.apply(o, arguments);
        return arguments;
    };

    $.publish = function() {
        o.trigger.apply(o, arguments);
    };
}(jQuery));