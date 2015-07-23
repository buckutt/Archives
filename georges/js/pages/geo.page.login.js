geo.namespace('page.login');

geo.page.login = new
    function login() {
        // attributs et methodes publiques = potentiellement utilisé ailleurs dans le programme donc à conserver
        // dans l'ideal, ce ne sont que des 'alias' vers des methodes privées
        var pub = {};
        // attributs et methodes privées (underscore)
        var _ = {};
		_.formActive = false;
        
        _.constructor = function(){
            $.subscribe(geo.events.PAGE_CHANGE, (function(){
                if(geo.page.current == 'login'){
                    _.initialize();
                }
            }));
        }
        _.initialize = function(){
			_.deco();
			
            geo.page.flush();
			
			geo.formUtils.createContainer(geo.page.current, 'page');
            
            _.viewModel = ko.mapping.fromJS({});
            _.viewNode = $('#'+geo.page.current+'_container')[0];
			geo.formUtils.endLoading();
            ko.applyBindings(_.viewModel, _.viewNode);
			
			var form = geo.formUtils.parseTableForm(
				$('#'+geo.page.current+'_page'), 
				'add',
				geo.page.current, 
				['login', 'password']);
			
			$('#btn_connexion').click(function(){// On concidère login comme un form d'ajout
				// On envoie au serveur
				geo.formUtils.formAjax(geo.page.current, 'add', form, function(json){
					$.publish(geo.events.LOGIN_STATE_UPDATE);
					
					// On va sur #main
					window.location.href = '#main';
					$.publish(geo.events.PAGE_CHANGE); 
				});
			});
        }
		
		_.deco = function(){
			geo.ajaxManager.ajax(geo.page.current, {'action' : 'deco'}, 
				(function(json){
					// state OK ou pas
					if(json == null || json.state == false){
						alert('erreur de déco');
						return;
					}
					$.publish(geo.events.LOGIN_STATE_UPDATE);
				})
			);
		}

        _.log = function(){
            var arg = arguments;
            Array.prototype.unshift.call(arg, '[PAGE_'+geo.page.current+']');
            geo.utils.log.apply(this, arg);
        }
        _.constructor.apply(this,arguments);
        return pub;
    };
    
    