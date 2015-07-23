geo.namespace('utils');

geo.utils = new 
    function utils() {
        // attributs et methodes publiques = potentiellement utilisé ailleurs dans le programme donc à conserver
        // dans l'ideal, ce ne sont que des "alias" vers des methodes privées
        var pub = {};
        // attributs et methodes privées (underscore)
        var _ = {};
        // cette separation est faite pour rendre le code plus lisible
        _.constructor = function() {
            _.vm = false;
        }
        
        // pour tester un bout de code, exemple :
        //        geo.utils.perfTest(1000, (function(){
        //              codeàtester
        //         }));
     
        pub.perfTest = function(iterations, callback){
            var totalTime,
            start = new Date;
            _.log("iterations = "+iterations);
            while (iterations--) {
                callback.call();
            }
            totalTime = new Date - start;
            _.log("time = "+totalTime);
        }
    
        // donne le timestamp (temps en ms depuis 1970),
        //  Date.now evite la creation d'un objet mais n'existe pas partout, 
        //  le + de +new Date fait un cast vers un nombre
        pub.timestamp = function() {
            return +new Date;
        };

        // compare 2 objets javascript, assez perfomant (capable de verifier la comparaison de 2 json de niveau jusque 6 et environ 700 items 1000 fois en 3sec)
        // mais j'suis pas sûr que ça soit pas un minimum buggé
        // et t'façons c pas un vrai isEqual puisque ça ne (et ça ne peut pas) compare pas les functions
        pub.isEqual = function(o1, o2) {
            if(typeof(o1) === 'undefined'){
                console.log("breaking")
                return false;
            }
            if(typeof(o2) === 'undefined'){
                console.log("breaking")
                return false;
            }
            var p;
            for(p in o1) {
                if(typeof(o2[p]) === 'undefined') {
                    console.log("breaking")
                    return false;
                }
            }

            for(p in o1) {
                if (o1[p]) {
                    switch(typeof(o1[p])) {
                        case 'object':
                            if (!pub.isEqual(o1[p], o2[p])) {
                                console.log("breaking")
                                return false;
                            }
                            break;
                        case 'function':
                            if (typeof(o2[p])=='undefined' || (p != 'equals' && o1[p].toString() != o2[p].toString())){
                                console.log("breaking")
                                return false;
                            }
                            break;
                        default:
                            if (o1[p] != o2[p]) {
                                console.log("breaking")
                                return false;
                            }
                    }
                } else {
                    if (o2[p]){
                        console.log("breaking")
                        return false;
                    }
                        
                }
            }

            for(p in o2) {
                if(typeof(o1[p])=='undefined') {
                    console.log("breaking", p, o2[p])
                    return false;
                }
            }

            return true;
        }
        
        // c'est juste que la fonction à utiliser est moche donc je prefere ça
        pub.strContains = function(string, pattern) {
            string = string + "";
            pattern = pattern + "";
            if(string.indexOf(pattern) !== -1){
                return true;
            } else {
                return false;
            }
        }
        
        // format 31/12/70-23:59:59-999
        pub.formattedDate = function(timestamp){
            if(typeof(timestamp) !== 'undefined'){
                var d = new Date(timestamp);
            } else {
                var d = new Date();
            }
            
            // format 31/12/70-23:59:59-999
            // les concatenation de 0 et le slice c'est parceque le format en JS ne mets pas les 0 au debut
            var formattedDate = ('0'  +d.getDate()).slice(-2)+
            '/' +
            ('0' + (d.getMonth()+1)).slice(-2)+
            '/' +
            ('0' + (d.getYear()-100)).slice(-2)+
            '-' +
            ('0' + d.getHours()).slice(-2)+
            ':' +
            ('0' + d.getMinutes()).slice(-2)+
            ':' +
            ('0' + d.getSeconds()).slice(-2)+
            '-' +
            ('00' + d.getMilliseconds()).slice(-3);
            return formattedDate;
        };


        _.logDate = function (timestamp) {
            if(typeof(timestamp) !== 'undefined'){
                var d = new Date(timestamp);  
            } else {
                var d = new Date();    
            }
            // format [23:59:59-999]
            // les concatenation de 0 et le slice c'est parceque le format en JS ne mets pas les 0 au debut
            var formattedDate = '[' +
            ('0' + d.getHours()).slice(-2)+
            ':' +
            ('0' + d.getMinutes()).slice(-2)+
            ':' +
            ('0' + d.getSeconds()).slice(-2)+
            '-' +
            ('00' + d.getMilliseconds()).slice(-3) +
            ']';
            return formattedDate;
        }

        // ça sert dans Node.JS mais à rien ici :D
        _.getColor = function(color){
            var colors ={
                'reset': '\033[0m',
                'bold': '\033[1m',
                'italic': '\033[3m',
                'underline': '\033[4m',
                'blink': '\033[5m',
                'black': '\033[30m',
                'red': '\033[31m',
                'green': '\033[32m',
                'yellow': '\033[33m',
                'blue': '\033[34m',
                'magenta': '\033[35m',
                'cyan': '\033[36m',
                'white': '\033[37m'
            };
            if(typeof(colors[color]) === 'undefined'){
                return colors['reset'];
            } else {
                return colors[color];
            }

        }
    
        // explose un array d'arguments (faux array)
        // puis concatene avec un espace le contenu avec pour les objets du json
        // l'interet c de faire ce que fait console.log mais direction un fichier log par exemple
        // ça donne du string au final
        _.format = function (msg) {
            var out = Array.prototype.slice.call(msg);
            for(var i in out){
                if(typeof(out[i]) === 'object'){
                    out[i] = JSON.stringify(out[i]);
                } 
            }
            out = out.join(' ');
            return out;
        };

        // la fonction de la vie de log !
        // j'en suis tellement fier'
        _.log = function(){
            
            _.history = _.history || [];   // store logs to an array for reference
            _.history.push(arguments);
            Array.prototype.unshift.call(arguments, pub.timestamp()) // on ajoute la date dans le log
       
            var arg = Array.prototype.slice.call(_.history[_.history.length-1]); // on fait une copy pour ne pas pourrir l'historique avec les couleurs
            arg[0] = _.logDate(arg[0]);

            if(typeof(console.log) == "object"){ // IE
                console.log(_.format(arg));
            } else {
                console.log.apply(console, arg);
            }
            
        }
        
        // c'est ça qui est tapé par les modules
        pub.log = function(){
            var arg = arguments;
            Array.prototype.unshift.call(arg, '[LOG]');
            _.log.apply(this, arg);
        };
        
        // donne les clés dans un objet
        pub.getKeys = function(obj) {
            var keys = [];
            for(var key in obj){
                keys.push(key);
            }
            return keys;
        }
        
        pub.pushHistory = function() {
            for(var i in _.history){
                var show = _.history[i];
                var formattedDateForLog = pub.formattedDate(show[0])
                show[0] = formattedDateForLog;
                // faut pusher cette ligne : _.format(show)
                // mais qqpart mais là ya rien !
            }
   
        }
        _.constructor.apply(this,arguments);
        return pub;
    };
    
    