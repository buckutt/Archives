geo.namespace('formUtils');

geo.formUtils = new 
    function formUtils() {

        var pub = {};
        var _ = {};

		/*
			Cette fonction parse une ligne d'un tableau (table+tr+td ou avec des div) 
			Les lignes doivent contenir des inputs cachés pour tout les champs simples et modifiables
			masterTab - jquery - la ligne du tableau (tr ou div) qu'on veut parser
			fname - string - nom de l'entité qu'on manipule (période, point, fondation, etc)
			attr_s - array - les champs simplesqui constitue cette entité ex: ['id', 'name']
			attr_c - array - les champs complèxes qui constitue cette entité càd des tableaux
							ex: {'group_price' : ['group', ['id', 'name', 'price']],
								 'period' : ['period', ['id', 'name']],
								 'point_priority' : ['point', ['id', 'name', 'priority']]
								}
			return - object:
			{
				tab : la ligne du tableau (jquery)
				items : 
				{
					id :
					{
						tab : balise text (jquery)
						text : chaine de caractère
						input : balise input (jquery)
					}
					name :
					{
						tab : balise text (jquery)
						text : chaine de caractère
						input : balise input (jquery)
					}
					etc
				}
				lists : 
				{
					group_price :
					{
						tab : balise du tableau (jquery)
						lines
						[
							[0] : parseTableFormObject (récursiv mais contient pas de lists, seulement des items)
							[1] : parseTableFormObject
							[2] : parseTableFormObject
							etc
						]
					}
					etc
				}
			}
		*/
		pub.parseTableForm = function(masterTab, action, fname, attr_s, attr_c) {
			if(typeof(attr_s) == 'undefined')
				return;

			var form = {};
			form.tab = masterTab;
			form.fname = fname;
			form.items = {};
			for (var i in attr_s){// On gère les champs simples
				var value = attr_s[i];
				form.items[value] = {};
				
				if(action == 'add'){
					form.items[value].input = form.tab.find('.'+fname+'_'+value);
				}
				else {
					form.items[value].tab = form.tab.find('.'+fname+'_'+value+' div:first-child');
					form.items[value].text = form.items[value].tab.text();
					form.items[value].input = form.tab.find('.'+fname+'_'+value+' input');
				}
				form.items[value].hasForm = (typeof(form.items[value].input.attr('value')) != 'undefined');
				form.items[value].isText = form.items[value].input.attr('type') == 'text';
				form.items[value].isRadio = form.items[value].input.attr('type') == 'radio';
				
				// Si on a un input on bind la touche entrée au bouton de validation
				if(typeof(form.items[value].isText)){
					form.items[value].input.off('keyup');
					form.items[value].input.keyup(function(e){
						if(typeof e !== 'undefined' && e.keyCode != 13)// touche entrée
							return;
						
						if(action == 'add')
							form.tab.find('.linklike').click();
						else
							form.tab.find('.'+fname+'_edit .dynamicForm span').click();
					});
				}
			}
			if(typeof(attr_c) == 'undefined')
				return form;
			
			form.lists = {};
			$.each(attr_c, function(listName, listStruct){// on gère les attributs sous formes de listes
				form.lists[listName] = {};
				form.lists[listName].tab = form.tab.find('.'+fname+'_'+listName);
				form.lists[listName].lines = [];
				
				//On boucle sur les lignes de la liste
				form.lists[listName].tab.find('tr').each(function(){
					if($(this).hasClass('parsedData') == false || $(this).is(':visible') == false)
						return;
					
					form.lists[listName].lines.push(
						pub.parseTableForm($(this), '', listStruct[0], listStruct[1])
					);
				});
			});
			
			return form;
        }
		
		/*
			Cette fonction agit sur une ligne de tableau
			Elle cache le texte et découvre les inputs
			form - objet parseTableForm - la ligne en question
		*/
		pub.text2input = function(form) {
			if(typeof(form) == 'undefined')
				return;
			
			// Pour chaque champs éditable on copie la valeur de la balise de texte vers la balise input
			$.each(form.items, function(key, value){
				if(key == 'id' || !value.hasForm)
					return;
				
				if(value.isText)
					value.input.val(value.tab.text());
					
				if(value.isRadio){
					$.each(value.input, function(k, v){
						if($(v).val() == value.tab.text())
							$(v).attr({'checked':'checked'});
					});
				}
				
				if(key.indexOf('date') != -1)
					value.input.geoDatePicker('time');
			});
			
			form.tab.find('div[class*="dynamicForm"]').slideDown('slow').prev().slideUp('slow');
			
			//On masque tout les boutons editer et supprimer
			$('.dynlink').css('visibility', 'hidden');
			
			//On masque le bouton masquer   // TODO rendre ça générique
			form.tab.find('.'+form.fname+'_hide_info').css('visibility', 'hidden');
		}

		/*
			Cette fonction agit sur une ligne de tableau
			Elle cache le texte et découvre les inputs
			form - objet parseTableForm - la ligne en question
		*/
		pub.input2text = function(form) {
			if(typeof(form) == 'undefined')
				return;
			
			// On copie la value de l'input dans la balise de text
			$.each(form.items, function(key, value){
				if(key == 'id' || !value.hasForm)
					return;
				
				if(value.isText)
					value.tab.text(value.input.attr('value'));
				
				if(value.isRadio){
					$.each(value.input, function(k, v){
						if($(v).attr('checked') == 'checked')
							value.tab.text($(v).val());
					});
				}
			});
			
			// On rebascule les input en text
			form.tab.find('div[class*="dynamicForm"]').slideUp('slow').prev().slideDown('slow');

			// On remontre les boutons ajouter/editer/supprimer
			$('.dynlink').css('visibility', 'visible');
			
			// On montre le bouton masquer
			form.tab.find('.'+form.fname+'_hide_info').css('visibility', 'visible');
		}
		
		
		/*
			Cette fonction effectue un envoie de form classique pour init, add, edit et delete
			currentPage - string - le nom de la page courante
			action - string - int, add, edit ou delete
			form - object parseTableForm -  du formulaire à envoyer (pour init c'est les argument a copier)
			callback - fonction - fonction de callback
		*/
		pub.formAjax = function(currentPage, action, form, callback){
			var ajaxArgs = { 'action' : action };
			
			if(action == 'init'){
				$.each(form, function(key, value){// On copie les items sans les modifier
					ajaxArgs[key] = value;
				});
			}
			else if(action == 'delete'){
				ajaxArgs['id'] = form.items.id.text;
			}
			else{// Ici on lit les valeurs dans les inputs
				pub.startSending(currentPage, action, form);
				$.each(form.items, function(key, value){// On boucle sur les items
					var attr;
					if(typeof(value.input.attr('value')) != 'undefined')// Si y a un input alors on prend
						attr = value.input.attr('value');
					else if(typeof(value.text) != 'undefined')// Si non on regarde si on peut trouver du texte
						attr = value.text;
					else
						return;
					
					ajaxArgs[key] = attr;
				});
				
				// puis si le formulaire est complexe on parcourt les lists
				if(form.hasOwnProperty('lists')){
					$.each(form.lists, function(listName, list){// On boucle sur les lists
						ajaxArgs[listName] = [];
						
						for (var i in list.lines){// On boucle sur les lignes
							var line = {}
							$.each(list.lines[i].items, function(key, value){// On boucle sur les items
								var attr;
								if(typeof(value.input.attr('value')) != 'undefined')// Si y a un input alors on prend
									attr = value.input.attr('value');
								else if(typeof(value.text) != 'undefined')// Si non on regarde si on peut trouver du texte
									attr = value.text;
								else
									return;
								
								line[key] = attr;
							});
							ajaxArgs[listName].push(line);
						}
					});
				}
			}
			
			// On envoie au serveur
			geo.ajaxManager.ajax(currentPage, ajaxArgs, 
				(function(json){
					pub.endSending();
					// state OK ou pas
					if(json == null || json.state == false){
						if(action == 'init'){
							pub.endLoading();
							alert('On peut pas charger la page l\'ajax renvoie de la merde :o');// TODO changer
							return;
						}
						
						var err = json != null ? json.error : 'Impossible de communiquer avec le serveur';
						$('#uiMessage').empty().showError({
							'text' : err
						});
						return;
					}
					callback(json);
				})
			);
			
		}
		
		/*
			Cet fonction bind les formulaires d'ajout d'une attr_table au bouton approprié
			Il bind le template ko à chaque fois donc pas besoin de reset la fenêtre
			json - init json - le json avec toutes les données affichés et les listes complêtes des attr_list
			fname - string - nom du tableau (ex: group_price, period ou point_priority)
			listing - string - nom de l'entité qu'on manipule à l'intérieur de attr_list (période, point, fondation, etc)
			attr - array - Description d'une ligne, simple string pour une zone de texte et tableau pour un input avec nom + type
						ex: ['group_id', 'group_name', ['group_price', 'int']]
		*/
		pub.attrTableBindAdd = function(json, fname, listing, attr) {
			$('.'+fname+'_add .linklike').click(function(){
				$('#dialog_list_content').empty();
				geo.formUtils.createContainer('dialog_list_'+fname, 'inc', 'dialog_list_content');
				
				var lastLineTab = $(this).closest('tr').prev();
				var attrListTab = $(this).closest('table');
				var listings = listing+'s';
				var attrList = {};
				attrList[listings] = [];
				$.each(json[listings], function(key, value){// On boucle sur les attributs a choisire
					// Si l'attribut est déjà dans la liste on le propose pas en choix
					var isInList = false;
					attrListTab.find('.'+listing+'_id div').each(function(){
						if(($(this).text()) == value.id){
							isInList = true;
							return;
						}
					});
					
					if(!isInList)
						attrList[listings].push(value);
				});
				
				var viewModel = ko.mapping.fromJS(attrList);
				var viewNode = $('#dialog_list_'+fname+'_container')[0];   
				ko.applyBindings(viewModel, viewNode);
				
				$('#dialog_list_'+fname).dialog({
					open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
					autoOpen: false,
					height: 300,
					width: 380,
					modal: true,
					buttons: {
						"Ok": function() {
							// on boucle sur les lignes
							$(this).find('table tr').each(function(){
								var dialogLine = $(this);
								
								for (var i in attr){
									if(!jQuery.isArray(attr[i]))
										continue;
									
									if((attr[i][2] = pub.dialogInputHandler(dialogLine, attr[i][0], attr[i][1])) === false)
										return;//on quitte la fonction donc on passe la ligne
								}
			
								//On l'ajoute au tableau
								lastLineTab.after(
									lastLineTab.clone()
								);
								lastLineTab = lastLineTab.next();
								lastLineTab.show();
								
								for (var i in attr){
									if(jQuery.isArray(attr[i]) && attr[i].length > 2){
										lastLineTab.find('.'+attr[i][0]+' div').text(attr[i][2]);
									}
									else{
										lastLineTab.find('.'+attr[i]+' div').text(dialogLine.find('.'+attr[i]+' div').text());
									}
								}
							});
							pub.attrTableBindDel();
							$(this).dialog('close');
						},
						Cancel: function() {
							$(this).dialog('close');
						}
					},
					close: function() {
						$('#dialog_list_'+fname).remove();
					}
				});
				$('#dialog_list_'+fname).dialog('open');
			});
		}
		
		/*
			Rebind la fonction del sur tout les boutons del des attr_table, 
			del la ligne actuel (tr)
		*/
		pub.attrTableBindDel = function() {
			$('.attr_table .button_attr_del').off('click').click(function(){
				var line = $(this).closest('tr');
				// Animation
				line.find('td div').slideUp('slow', function(){
					if(!($(this).is(':empty')))
						line.remove();
				});
			});
		}
		
		/*
			Transforme (cast) un input de dialogBox en type demandé (int et bool pour le moment)
			lineTab - jquery - la ligne actuel (form.tab)
			inputName - string - le nom de l'attribut (class div mère) (correspond à fname en gros)
			inputType - string - int ou chk pour le type d'input text ou checkbox
			return - false/true/int - false si l'entrée est invalide, 
									  l'entier sous forme d'int si le str était bien un int
									  true ou false si chk coché ou pas
		*/
		pub.dialogInputHandler = function(lineTab, inputName, inputType) {
			if(inputType == 'int'){
				var val = lineTab.find('.'+inputName+' input').attr('value');
				
				if(typeof(val) != 'string')
					return false;
				
				if(val == '')
					return false;
				
				var valInt = parseInt(val);
				
				if(isNaN(valInt))
					return false;
				
				return valInt;
			}
			else if(inputType == 'chk'){
				return lineTab.find('.'+inputName+' input').attr('checked') == 'checked';
			}
			
			return false;
		}
		
		/*
			Rebind les boutons dérouler et masquer
			fname - string - nom de la page et des entités affichés
		*/
		pub.bindHideUnhide = function(fname) {
			$('.'+fname+'_hide_info .linklike').click(function(){
				var line = $(this).closest('.div_table_line');
				line.find('.dynamicInfo').slideUp('slow');// On cache les infos de l'objet
				line.find('.'+fname+'_show_info').slideDown('slow');// On montre le bouton dérouler
			});
			$('.'+fname+'_show_info .linklike').click(function(){// Bouton dérouler
				var line = $(this).closest('.div_table_line');
				line.find('.'+fname+'_show_info').slideUp('slow');// On cache le boutton dérouler
				line.find('.dynamicInfo').slideDown('slow');// On show les infos
			});
		}
		
		/*
			Crée un conteneur pour un template knockoutJS
			fname - string - nom de la page (présent dans le nom du template)
			tmplType - string - page ou inc (pour des template inclus et réutilisables)
			parentTab - string - ID css de la parent tab (on crée avec append)
		*/
		pub.createContainer = function(fname, tmplType, parentTab) {
			if(typeof(tmplType) == 'undefined')
				tmplType = 'page';
			
			if(typeof(parentTab) == 'undefined')
				parentTab = 'content';
			
			$('#'+parentTab).append(
                $('<div>').attr({
                    'id' : fname+'_container', 
                    'data-bind' : 'template: {name: \''+fname+'_'+tmplType+'_template\'}'
                })
			);
            // <div id="topMenu_container" data-bind="template: {name: 'topMenu_template'}"></div>
		}
		
		/*
			Affiche le pacman de chargement sur la page
			fname - string - nom de l'entité qu'on manipule (période, point, fondation, etc)
			action - string - int, add, edit ou delete
			form - object parseTableForm -  form (ligne) sur laquel on effectue l'action
		*/
		pub.startLoading = function(){
			$('#content').append(
                $('<div>').attr({
                    'class' : 'loadDiv'
                }).text('Loading...').append(
					$('<br>')
				).append(
					$('<img>').attr({
						'src' : 'css/images/ajax-loader-1.gif',
						'class' : 'loadImg'
					})
				)
			);
        }
		
		/*
			On enlève le pacman
		*/
		pub.endLoading = function(){
			$('#content .loadDiv').hide('slow').remove();
        }
		
		/*
			Affiche le pacman sur une ligne en court d'édition
			fname - string - nom de l'entité qu'on manipule (période, point, fondation, etc)
			action - string - int, add, edit ou delete
			form - object parseTableForm -  form (ligne) sur laquel on effectue l'action
		*/
		pub.startSending = function(fname, action, form){
			if(action == 'init')
				return;
			$('.dynlink').css('visibility', 'hidden');
			bouton = action == 'add' ? form.tab.find('.linklike') : form.tab.find('.'+fname+'_'+action+' .linklike');
			
			bouton.hide().parent().append(
				$('<div>').attr({
                    'class' : 'sendingDiv'
                }).append(
					$('<img>').attr({
						'src' : 'css/images/ajax-loader-1.gif',
						'class' : 'sendingImg'
					})
				)
			);
        }
		
		/*
			On enlève le pacman sur les lignes qui l'affiche et on remet les boutons qu'ils remplacaient
		*/
		pub.endSending = function(){
			$('.sendingDiv').parent().find('.linklike').show();
			$('.sendingDiv').remove();
        }
		
		_.log = function(){
            var arg = arguments;
            Array.prototype.unshift.call(arg, '[formUtils]');
            geo.utils.log.apply(this, arg);
        }
		
        return pub;
    };
    
    