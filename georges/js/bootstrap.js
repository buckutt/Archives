geo.namespace('bootstrap');

geo.bootstrap = new 
    function bootstrap() {
        var _ = {};
        
        _.constructor = function() {
            _.log("Starting");
            
            // en fait, ici ya quasi rien car les modules doivent s'abonner
            
            $.subscribeOnce(geo.events.LOADED_PAGE, (function(){
                $.unblockUI();
            
            }));
            $.publish(geo.events.LOADED_PAGE);
        }

        
        _.log = function(){
            var arg = arguments;
            Array.prototype.unshift.call(arg, '[BOOTSTRAP]');
            geo.utils.log.apply(this, arg);
        }
    
        // delai de 100ms pour etre sûr qu'on est bien tranquille
        // et surtout, vu que le delai en javascript c'est surtout "pas avant 100ms et quand t'as fini de mouliner"
        // bah ça permet d'attaquer qd le cpu est tranquillisé, alors que du timeout 0, ça pourrait piquer la priorité à de l'init
        // de bibliotheque foireuse qui utiliserait aussi le truc du setTimeout pour priotiser le cpu
        setTimeout((function(){
            _.constructor.apply(this,arguments);
        }), 100)
        
    };
