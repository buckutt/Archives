geo.namespace('page.fundationSales');

geo.page.fundationSales = new
    function fundationSales() {
        // attributs et methodes publiques = potentiellement utilisé ailleurs dans le programme donc à conserver
        // dans l'ideal, ce ne sont que des 'alias' vers des methodes privées
        var pub = {};
        // attributs et methodes privées (underscore)
        var _ = {};
        _.date_range = null;
        
        _.constructor = function(){
            $.subscribe(geo.events.PAGE_CHANGE, (function(){
                if(geo.page.current == 'fundationSales'){
                    _.initialize();
                }
            }));
        }

        _.initialize = function(){
            geo.page.flush();
			geo.formUtils.startLoading();
            
            var args = { 'fundation_id' : geo.page.currentId };
            
            if(_.date_range != null){
                args['date_range_begin'] = _.date_range.begin;
                args['date_range_end'] = _.date_range.end;
            }
            
			// On envoie au serveur
			geo.formUtils.formAjax(geo.page.current, 'init', args, function(json){
				geo.formUtils.createContainer(geo.page.current, 'page');
				
				var viewModel = ko.mapping.fromJS(json);
				var viewNode = $('#'+geo.page.current+'_container')[0];
				geo.formUtils.endLoading();
				ko.applyBindings(viewModel, viewNode);
				
				$( '#date_begin, #date_end' ).datepicker({
					changeMonth: true,
					changeYear: true
				});
				
				_.btnGo();
			});
        }
        
        _.btnGo = function(){
			var validate = function(){
                _.date_range = { };
                _.date_range.begin = $('#date_begin').val();
                _.date_range.end = $('#date_end').val();
                
                _.initialize();
            };
            $('#go_btn').click(validate);
            $('#date_begin, #date_end').keydown(function(e){
                if(typeof e !== 'undefined' && e.keyCode != 13)// touche entrée
					return;
				validate();
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
    
    