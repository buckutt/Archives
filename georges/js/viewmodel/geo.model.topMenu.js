geo.namespace('model.topMenu');

geo.model.topMenu = new 
    function topMenu() {
        // attributs et methodes publiques = potentiellement utilisé ailleurs dans le programme donc à conserver
        // dans l'ideal, ce ne sont que des "alias" vers des methodes privées
        var pub = {};
        // attributs et methodes privées (underscore)
        var _ = {};
        // cette separation est faite pour rendre le code plus lisible
    
        // ça peut s'apparenter à un singleton
        _.constructor = function (){
            _.inited = false;
        }
        pub.initializeViewModel = function (json) {
            // on init avec le json
            _.viewModel = ko.mapping.fromJS(json);
            _.inited = true;
            return _.viewModel;
        }

        // getter/setter pour le model, sachant que le setter n'a qu'une fonction de sauvegarde, il ne change pas le model employé par KO
        pub.getViewModel = function() {
            return _.viewModel;
        }
        pub.setViewModel = function(viewModel) {
            _.viewModel = viewModel;
        }
        pub.update = function(json){
            _.viewModel = ko.mapping.fromJS(json, _.viewModel);
        }
        _.log = function(){
            var arg = arguments;
            Array.prototype.unshift.call(arg, '[MODEL_TOPMENU]');
            geo.utils.log.apply(this, arg);
        }
        _.constructor.apply(this,arguments);
        return pub;
    };