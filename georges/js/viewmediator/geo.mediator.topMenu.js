geo.namespace('mediator.topMenu');

geo.mediator.topMenu = new 
    function topMenu(){
        // attributs et methodes publiques = potentiellement utilisé ailleurs dans le programme donc à conserver
        // dans l'ideal, ce ne sont que des "alias" vers des methodes privées
        var pub = {};
        // attributs et methodes privées (underscore)
        var _ = {};
        // on initialise le modele
        
    	
        _.constructor = function (){
            $.subscribeOnce(geo.events.LOADED_PAGE, (function(){
                geo.ajaxManager.ajax("topMenu", {}, (function(json){
                    pub.createViewMediator(json);
                }));
            }));
            
            $.subscribe(geo.events.LOGIN_STATE_UPDATE, _.update);
        }
        
        _.update = function(){
            geo.ajaxManager.ajax("topMenu", {}, (function(json){
                geo.model.topMenu.update(json);
            }));
        }
        
        pub.createViewMediator = function (json) {
            // on initialise le modele
            var viewModel =  geo.model.topMenu.initializeViewModel(json);

            // on indique à knockout le container du template à utiliser, pour cela on lui indique un element du DOM
            // != template, != vue
            var viewNode = $('#topMenu_container')[0];
            // on lie modele et template et on execute
        
            ko.applyBindings(viewModel, viewNode); 

            _.log("Ready!");
        }
    
       
        _.log = function(){
            var arg = arguments;
            Array.prototype.unshift.call(arg, '[MEDIATOR_TOPMENU]');
            geo.utils.log.apply(this, arg);
        }
        _.constructor.apply(this,arguments);
        return pub;
    };
