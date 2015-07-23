geo.namespace('config');

/**
 * config de l'appli
 */
geo.config = new 
    function config() {
        var _ = {};
        
        var pub = {};

        _.constructor = function() {
            // accessible en geo.config.events
            // ça sera le nom des events utilisés dans l'application
            pub.events = [
            "LOADED_PAGE", // une fois que le bootstrap est fini
            "NETWORK_STATE_UPDATE", // si l'ajax fait un echec donc network down ou reUp
            "LOGIN_STATE_UPDATE", // si user connecté ou non <= pertinent??
            "PAGE_CHANGE", // changement de page
           
            ];
        }

        
        _.log = function(){
            var arg = arguments;
            Array.prototype.unshift.call(arg, '[CONFIG]');
            geo.utils.log.apply(this, arg);
        }
    
        _.constructor.apply(this,arguments);
        return pub;
    };
