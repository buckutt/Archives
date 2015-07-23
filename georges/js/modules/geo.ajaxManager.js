geo.namespace('ajaxManager');

geo.ajaxManager = new 
    function ajaxManager() {
        // attributs et methodes publiques = potentiellement utilisé ailleurs dans le programme donc à conserver
        // dans l'ideal, ce ne sont que des "alias" vers des methodes privées
        var pub = {};
        // attributs et methodes privées (underscore)
        var _ = {};
        // cette separation est faite pour rendre le code plus lisible
        
        
        _.constructor = function() {
            // on considere que ça marche par defaut !
            _.network_state = true;
            // au debut ya pas de msg
            _.msgNb = 0;
            // le callback fail qui sera utilisé partout
            _.callback_fail =(function(obj, error){
                if(error == "timeout"){
                    _.setNetworkState(false);
					_.log("REQUEST TIME OUT, le serveur de répond pas");
                }
            });
        }
        
        // c ça qui est utilisé par l'appli :
        // target = cible de l'ajax (ajax/*target*.php)
        // payload = objet js à fournir en post
        // callback = function à executer avec en argument le retour json convertit en js
        pub.ajax = function(target, payload, callback){
            if(typeof(target) == "undefined"){
                return false;
            }
            if(typeof(payload) == "undefined"){
                payload = {};
            }
            if(typeof(callback) != "function"){
                callback = (function(){});
            }
            _.msgNb++;            
            new geo.obj.ajax(_.msgNb, target, payload, callback, _.callback_fail);
        }
        
        pub.getNetworkState = function(){
            return _.network_state;
        }
        
        _.setNetworkState = function(bool){
            if(bool){
                if(!_.network_state){
                    _.network_state = true;
                    $.publish(geo.events.NETWORK_STATE_UPDATE);
                }
            } else if(!bool){
                if(_.network_state){
                    _.network_state = false;
                    $.publish(geo.events.NETWORK_STATE_UPDATE);
                }
            }
            
        }

        _.log = function(){
            var arg = arguments;
            Array.prototype.unshift.call(arg, '[AJAXMANAGER]');
            geo.utils.log.apply(this, arg);
        }
        _.constructor.apply(this,arguments);
        return pub;
    };
    
    