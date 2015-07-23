geo.namespace('mediator.sideMenu');

geo.mediator.sideMenu = new 
    function sideMenu(){
        // attributs et methodes publiques = potentiellement utilisé ailleurs dans le programme donc à conserver
        // dans l'ideal, ce ne sont que des "alias" vers des methodes privées
        var pub = {};
        // attributs et methodes privées (underscore)
        var _ = {};
        // on initialise le modele
        
    	
        _.constructor = function (){// LOADED_PAGE
            $.subscribeOnce(geo.events.LOADED_PAGE, (function(){
                geo.ajaxManager.ajax("sideMenu", {
                    "page" : geo.page.current
                }, (function(json){
					if(json != null && json.state != false)
						pub.createViewMediator(json);
                }));
            }));
            
        $.subscribe(geo.events.LOGIN_STATE_UPDATE, _.update);
        // $.subscribe(geo.events.PAGE_CHANGE, _.update);
        }
        
        _.update = function(){
            geo.ajaxManager.ajax("sideMenu", {
                "page" : geo.page.current
            }, (function(json){
                if(json != null && json.state != false)
					geo.model.sideMenu.update(json);
            }));
        }
        
        pub.createViewMediator = function (json) {
            // on initialise le modele
            var viewModel =  geo.model.sideMenu.initializeViewModel(json);

            // on indique à knockout le container du template à utiliser, pour cela on lui indique un element du DOM
            // != template, != vue
            var viewNode = $('#sideMenu_container')[0];
            // on lie modele et template et on execute
        
            ko.applyBindings(viewModel, viewNode); 

            _.log("Ready!");
        }
    
       
        _.log = function(){
            var arg = arguments;
            Array.prototype.unshift.call(arg, '[MEDIATOR_SIDEMENU]');
            geo.utils.log.apply(this, arg);
        }
        _.constructor.apply(this,arguments);
        return pub;
    };
