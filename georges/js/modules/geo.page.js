geo.namespace('page');

geo.page = new 
    function page() {
        // attributs et methodes publiques = potentiellement utilisé ailleurs dans le programme donc à conserver
        // dans l'ideal, ce ne sont que des "alias" vers des methodes privées
        var pub = {};
        // attributs et methodes privées (underscore)
        var _ = {};     
        // cette separation est faite pour rendre le code plus lisible
        
        _.constructor = function() {
            pub.current = "";
            // on taffe que quand tout est chargé sinon c relou
            $.subscribeOnce(geo.events.LOADED_PAGE, (function(){
                _.selectPage();
            }));
        }
        _.selectPage = function () {
            // bout de code d'un ancien truc qui autoregister les pages à partir de ce qu'il trouve dans le dom
            //            
            //            // pour definir une page il faut que l'element soit de la classe "page" 
            //            // et que l'attribut "data-page_name" contienne le nom de la page (pour le lien) 
            //            // exemple : <div class='page' data-page_name="main">
            //            // sera accessible via index.html#main
            //    
            //            // on recupere tous les elements de la class page
            //            $('.page').each((function(){
            //                // on verifie que data-page_name est bien defini et non vide
            //                if(typeof($(this).attr('data-page_name')) !== 'undefined'){
            //                    if($(this).attr('data-page_name') !== ''){
            //                        // on ajoute les elements à l'objet des pages
            //                        _.pages[$(this).attr('data-page_name')] = $(this);
            //                    }
            //                }
            //            }));


            // executé à chaque changement de location.hash
            Sammy(function() {
                if(true){
                    // pas de moyen propre de supprimer le log de sammy donc on ecrase la fonction de log utilisée
                    // parceque le con il est vachement verbeux !
                    this.log = function(){};
                }
                
                // on recupere le nom de la page extrait de index.html#{nomdelapage}
                this.get('#:page', function() {
                    pub.current = this.params.page;
                    pub.currentId = null;
                    $.publish(geo.events.PAGE_CHANGE);
                    _.log("Page :", pub.current);
                    
                });
        
                // avec un id
                this.get('#:page/:id', function() {
                    pub.current = this.params.page;
                    pub.currentId = this.params.id;
                    $.publish(geo.events.PAGE_CHANGE);
                    _.log("Page :", pub.current, " and Id :", pub.currentId);
                });
        
                // si rien n'est defini, on va au 'main'
                this.get('', function() {
                    location.hash = '#main';
                });
            }).run(); 
        }
        
        pub.flush = function(){
            // faut voir si ya des eventuels callback à enregistrer sur le destroy des pages
            // j'sais pas si ça sert, on pourrait avoir un truc qui declenche un destructeur sur la page sortante
            // en tout cas on vide le contenu
            $("#content").empty();
        }
     
        _.log = function(){
            var arg = arguments;
            Array.prototype.unshift.call(arg, '[PAGE]');
            geo.utils.log.apply(this, arg);
        }
        _.constructor.apply(this,arguments);
        return pub;
    };
    
    