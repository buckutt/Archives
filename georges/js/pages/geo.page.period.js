geo.namespace('page.period');

geo.page.period = new
    function period() {
        // attributs et methodes publiques = potentiellement utilisé ailleurs dans le programme donc à conserver
        // dans l'ideal, ce ne sont que des "alias" vers des methodes privées
        var pub = {};
        // attributs et methodes privées (underscore)
        var _ = {};
		_.periods = {};
		_.formActive = false;
        
        _.constructor = function() {
            $.subscribe(geo.events.PAGE_CHANGE, (function(){
                if(geo.page.current == "period"){
                    _.initialize();
                }
            }));
        }
        _.initialize = function(){
            geo.page.flush();
			geo.formUtils.startLoading();
			_.formActive = false;

			// On envoie au serveur
			geo.formUtils.formAjax(geo.page.current, 'init', {'fundation_id' : geo.page.currentId}, function(json){
				geo.formUtils.createContainer(geo.page.current, 'page');
				
				_.periods = json.periods;
				var viewModel = ko.mapping.fromJS(json);
				var viewNode = $('#'+geo.page.current+'_container')[0];   
				geo.formUtils.endLoading();
				ko.applyBindings(viewModel, viewNode);
				
				// On ajoute le code de nos boutons
				_.btnAdd();
				_.btnEdit();
				_.btnDel();
			});
        }
        
		_.btnAdd = function(){
			$('.period_add').click(function(){
				var form = geo.formUtils.parseTableForm(
					$('#'+geo.page.current+'_add'), 
					'add',
					geo.page.current, 
					['name', 'date_begin', 'date_end']);
				
				$('#period_add .period_add').click(function(){
					// On envoie au serveur
					geo.formUtils.formAjax(geo.page.current, 'add', form, function(){
						// On recharge le content
						_.initialize();
					});
				});
				
				$('#period_add .period_date_begin, #period_add .period_date_end').geoDateTimePicker();
				
				$('#period_add').slideDown('slow');
				$('.dynlink').css('visibility', 'hidden');// Cache les boutons Ajouter/Editer/Supprimer
			});
		}
		
		_.btnEdit = function(){
			$('.period_edit span').click(function(){

				var line = geo.formUtils.parseTableForm($(this).closest('tr'), 'edit', geo.page.current, ['id', 'name', 'date_begin', 'date_end']);
				
				if(_.formActive){
					// On envoie au serveur
					geo.formUtils.formAjax(geo.page.current, 'edit', line, function(){
						geo.formUtils.input2text(line);
						_.formActive = false;
					});
					return;
				}
				_.formActive = true;
				
				geo.formUtils.text2input(line);
				
			});
		}
		
		_.btnDel = function(){
			$('.period_delete span').click(function(){
				var line = geo.formUtils.parseTableForm($(this).closest('tr'), 'delete', geo.page.current, ['id', 'name']);
				
				if(!confirm('Voulez vous vraiment supprimer la period '+line.items.name.text+' ?'))
					return;

				// On envoie au serveur
				geo.formUtils.formAjax(geo.page.current, 'delete', line, function(){
					// Animation
					line.tab.find('td div').slideUp('slow', function(){
						// On retire la ligne
						line.tab.remove();
					});
				});
			});
		}

        _.log = function(){
            var arg = arguments;
            Array.prototype.unshift.call(arg, '[PAGE_'+geo.page.current+']');
            geo.utils.log.apply(this, arg);
        }
        _.constructor.apply(this,arguments);
        return pub;
    };
