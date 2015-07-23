// cache bust à retirer en prod, c'est pour eviter les reloads
//@TODO supprimer le cachebust en prod
$LAB.setGlobalDefaults({
    CacheBust:"true"
});

$LAB
    // l'ordre des elements situés entre les .wait() n'est pas important par contre 
    // l'ordre des sous ensembles par rapport aux autres l'est
    // (entre chaque wait, ça charge tout en //)
      
    // jquery
    .script("js/lib/vendor/jquery-1.8.2.min.js")
    .wait()
    
    // jquery ui
    .script("js/lib/vendor/jquery-ui-1.8.24.custom.min.js")
    .wait()
    
    // plugins jquery & librairies tierces
    // json si le nav gere pas
    .script("js/lib/vendor/json2.js")
    // systeme de pub/sub
    .script("js/lib/vendor/jquery.ba-tinypubsub.js")
    // ptit truc pour faire un overlay easy
    .script("js/lib/vendor/jquery.blockUI.js")
	// vf du datepicker
    .script("js/lib/vendor/jquery.ui.datepicker-fr.js")
	// date & time picker http://github.com/trentrichardson/jQuery-Timepicker-Addon
    .script("js/lib/vendor/jquery-ui-timepicker-addon.js")
    // utilisé pour les chemins virtuels (index.php#periodmanagement/1452 par exemple pour gerer la periode 1452)
    .script("js/lib/vendor/sammy.js")
    // sert au templatage/gestion affichage (abbrevié ko)
    .script("js/lib/vendor/knockout-2.0.0.js")
    .wait()
    // a besoin de knockout avant de se charger ...
    // et sinon ça sert à prendre un json en input, c un plugin de ko
    .script("js/lib/vendor/knockout.mapping-2.1.0.js")
    .wait()
    
    // definition du namespace global
    .script("js/namespace.js")
    
    // on mets l'overlay sympa
    .wait(function(){
        $.blockUI({
            message: 'Loading ...'
        });
    })
    
    // fonctions utilitaires (notamment log, timestamp ...)
    .script("js/modules/geo.utils.js")
    .wait()
    
    // config de l'application
    .script("js/config.js")
    .wait()
    
    // mise en place des events
    .script("js/events.js")
    .wait()
    
    
    
    // scripts de l'application
    
    // widgets
    // widgetisation des cadre d'information/erreur
    .script("js/widget/widget.showInfo.js")
    .script("js/widget/widget.showError.js")
    .script("js/widget/widget.geoDateTimePicker.js")
    
    // viewmodel/viewmediator
    .script("js/viewmodel/geo.model.sideMenu.js")
    .script("js/viewmediator/geo.mediator.sideMenu.js")
    
    .script("js/viewmodel/geo.model.topMenu.js")
    .script("js/viewmediator/geo.mediator.topMenu.js")
        
    // modules
    // wrapper pour l'ajax (avec gestion network, decodage etc)
    .script("js/modules/geo.ajaxManager.js")
    // gestion des pages (s'appuie sur sammy js)
    .script("js/modules/geo.page.js")
	// utils pour la gestion des formulaire dans les templates
	.script("js/modules/geo.formUtils.js")
       
    // pages
    .script("js/pages/geo.page.main.js")
    .script("js/pages/geo.page.login.js")
    .script("js/pages/geo.page.period.js")
    .script("js/pages/geo.page.point.js")
    .script("js/pages/geo.page.product.js")
    .script("js/pages/geo.page.fundationSales.js")
    
    // objects
    // instance crée pour chaque requete ajax
    .script("js/obj/geo.obj.ajax.js")
    
    .wait(function(){
        $.blockUI({
            message: 'Everything is loaded ! Starting ...'
        });       
    })
    // finalement, le bootstrap pour demarrer le tout
    .script("js/bootstrap.js")
  