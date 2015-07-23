geo.namespace('page.main');

geo.page.main = new
    function main() {
        // attributs et methodes publiques = potentiellement utilisé ailleurs dans le programme donc à conserver
        // dans l'ideal, ce ne sont que des "alias" vers des methodes privées
        var pub = {};
        // attributs et methodes privées (underscore)
        var _ = {};
        // cette separation est faite pour rendre le code plus lisible
        _.constructor = function() {
            $.subscribe(geo.events.PAGE_CHANGE, (function(){
                if(geo.page.current == "main"){
                    _.initialize();
                }
            }));
        }
        _.initialize = function(){
            geo.page.flush();
			geo.formUtils.startLoading();
			
            $("#content").append(
                $("<div>").attr({
                    'id' : 'main_container', 
                    'data-bind' : 'template: {name: "main_page_template"}'
                }));
            // <div id="topMenu_container" data-bind="template: {name: 'topMenu_template'}"></div>
            
            _.viewModel = ko.mapping.fromJS({});
            _.viewNode = $('#main_container')[0];
			geo.formUtils.endLoading();
            ko.applyBindings(_.viewModel, _.viewNode);
            /*
            // login, bricolé temporaire
            geo.ajaxManager.ajax("login", { 'action' : 'add', 'login' : 'chabatest', 'password' : '1236'}, (function(json){
                if(json.state == false)
                    alert('Err co : '+json.details);
            }));
            $.publish(geo.events.LOGIN_STATE_UPDATE);//*/
			
			$(_.viewNode).find("#frd1").showInfo({
                "text" : $(_.viewNode).find("#frd1").text()
            });
            var txt = $(_.viewNode).find("#frd2").text();
            $(_.viewNode).find("#frd2").empty().showError({
                "text" : txt
            });
        }

        _.log = function(){
            var arg = arguments;
            Array.prototype.unshift.call(arg, '[PAGE_MAIN]');
            geo.utils.log.apply(this, arg);
        }
        _.constructor.apply(this,arguments);
        return pub;
    };
    
    