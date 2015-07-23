geo.namespace('page.product');

geo.page.product = new
    function product() {
        // attributs et methodes publiques = potentiellement utilisé ailleurs dans le programme donc à conserver
        // dans l'ideal, ce ne sont que des "alias" vers des methodes privées
        var pub = {};
        // attributs et methodes privées (underscore)
        var _ = {};
		_.json = {};
		_.formActive = false;
        
        _.constructor = function() {
            $.subscribe(geo.events.PAGE_CHANGE, (function(){
                if(geo.page.current == "product"){
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
				
				_.json = json;
				var viewModel = ko.mapping.fromJS(json);
				var viewNode = $('#'+geo.page.current+'_container')[0];   
				geo.formUtils.endLoading();
				ko.applyBindings(viewModel, viewNode);
				
				// On ajoute le code de nos boutons
				_.btnAdd();
				_.btnEdit();
				_.btnDel();
				
				// hide / unhide details
				geo.formUtils.bindHideUnhide(geo.page.current);
				
				// Boutons ajouter et del des attr_list
				geo.formUtils.attrTableBindDel();
				geo.formUtils.attrTableBindAdd(_.json, 'group_price', 'group', ['group_id', 'group_name', ['group_price', 'int']]);
				geo.formUtils.attrTableBindAdd(_.json, 'period', 'period', ['period_id', 'period_name', ['period', 'chk']]);
				geo.formUtils.attrTableBindAdd(_.json, 'point_priority', 'point', ['point_id', 'point_name', ['point', 'chk'], ['point_priority', 'int']]);
			});
			
        }
        
		_.btnAdd = function(){
			$('.'+geo.page.current+'_add').click(function(){
				$('.'+geo.page.current+'_add_validate').click(function(){
					var form = geo.formUtils.parseTableForm(
							$('#'+geo.page.current+'_add'), 
							'add',
							geo.page.current,
							['id', 'name', 'unique', 'image_id', 'stock'], 
							{'group_price' : ['group', ['id', 'name', 'price']],
							 'period' : ['period', ['id', 'name']],
							 'point_priority' : ['point', ['id', 'name', 'priority']]
							});

					// On envoie au serveur
					geo.formUtils.formAjax(geo.page.current, 'add', form, function(){
						// On recharge le content
						_.initialize();
					});
				});
				
				$('#'+geo.page.current+'_add .'+geo.page.current+'_date_begin, #'+geo.page.current+'_add .'+geo.page.current+'_date_end').geoDateTimePicker();
				
				$('#'+geo.page.current+'_add').slideDown('slow');
				$('.dynlink').css('visibility', 'hidden');// Cache les boutons Ajouter/Editer/Supprimer
			});
		}
		
		_.btnEdit = function(){
			$('.'+geo.page.current+'_edit span').click(function(){
				var form = geo.formUtils.parseTableForm(
						$(this).closest('.div_table_line'), 
						'edit',
						geo.page.current, 
						['id', 'name', 'unique', 'image_id', 'stock'], 
						{'group_price' : ['group', ['id', 'name', 'price']],
						 'period' : ['period', ['id', 'name']],
						 'point_priority' : ['point', ['id', 'name', 'priority']]
						});
				
				if(_.formActive){
					geo.formUtils.formAjax(geo.page.current, 'edit', form, function(){
						geo.formUtils.input2text(form);
						_.formActive = false;
					});
					return;
				}
				_.formActive = true;
				
				geo.formUtils.text2input(form);
			});
		}
		
		_.btnDel = function(){
			$('.'+geo.page.current+'_delete span').click(function(){
				var form = geo.formUtils.parseTableForm($(this).closest('.div_table_line'), 'delete', geo.page.current, ['id', 'name']);
				
				if(!confirm('Voulez vous vraiment supprimer la product '+form.items.name.text+' ?'))
					return;
				
				// On envoie au serveur
				geo.formUtils.formAjax(geo.page.current, 'delete', form, function(){
					// Animation
					form.tab.slideUp('slow', function(){
						// On retire la ligne
						form.tab.remove();
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
