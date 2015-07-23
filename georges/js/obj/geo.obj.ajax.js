geo.namespace('obj.ajax');
/**
 * objet ajax pour wrapper celle de jQuery
 */
geo.obj.ajax =  
    function ajax() {
        // attributs et methodes publiques = potentiellement utilisé ailleurs dans le programme donc à conserver
        // dans l'ideal, ce ne sont que des "alias" vers des methodes privées
        var pub = {};
        // attributs et methodes privées (underscore)
        var _ = {};
        
        // cette separation est faite pour rendre le code plus lisible
        
        // uid = unique id de l'appel
        // target = nom du point de sortie, situé dans ajax/*target*.php
        // payload = objet JS convertit en JSON donné en POST
        // callback = function à executer qd ça reussi avec en argument le retour json parsé
        // manager_failed_callback = function callback en cas de fail
        _.constructor = function(uid, target, payload, callback, manager_failed_callback) {
            if(typeof(uid) != "number"){
                _.uid = "undefined";
            } else {
                _.uid = uid;
            }
            if(typeof(target) == "undefined"){
                return false;
            }
            if(typeof(payload) == "undefined"){
                payload = {};
            }
            if(typeof(callback) != "function"){
                callback = (function(){});
            }
            _.log("REQUESTING", target, "with", payload);
            _.emit_time = geo.utils.timestamp();
            
            $.ajax({
                type: "POST",
                cache: false,
                url: "ajax/" + target+ ".php",
                data: payload,
                dataType: "json"
            })
            .error(
                (function(obj, error){
                    _.log("REQUEST FAILED after", (geo.utils.timestamp() - _.emit_time),"ms with error :", error, "on target", target, "with thoses arguments :", payload);
                    manager_failed_callback.apply(this, arguments);
                }))
            .done(
                (function(json_raw){ 
                    _.log("REQUEST COMPLETED in", (geo.utils.timestamp() - _.emit_time),"ms with return :", json_raw, "on target", target, "with thoses arguments :", payload);
                    callback.apply(this, arguments);
                }));
        }


        _.log = function(){
            var arg = arguments;
            Array.prototype.unshift.call(arg, '[AJAX_' + _.uid + ']'); // on log façon [AJAX_15] qui correspond au message uid 15
            geo.utils.log.apply(this, arg);
        }
        _.constructor.apply(this,arguments);
        return pub;
    };
    
    