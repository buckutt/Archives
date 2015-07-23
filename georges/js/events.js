geo.namespace('events');

/**
 * module gestion des evenements, sorte de complement au plugin jquery de pub sub
 * 
 */
geo.events = new 
    function events() {
        var _ = {};
        var pub = {};
        _.constructor = function() {
            // pour chaque evenement configuré
            for(var i in geo.config.events){
                // on les regroupe dans un tableau accessible en geo.events.LOADED_PAGE = "LOADED_PAGE"
                pub[geo.config.events[i]] = geo.config.events[i];
                // et on les ecoute
                $.subscribe(geo.config.events[i], (function(event){
                    // et on y ecrit dans le log, le nom de l'evenement
                    _.log(event.type);
                }))
            }
        }
        
        _.log = function(){
            var arg = arguments;
            Array.prototype.unshift.call(arg, '[EVENTS]');
            geo.utils.log.apply(this, arg);
        }
    
        _.constructor.apply(this,arguments);
        return pub;
    };
