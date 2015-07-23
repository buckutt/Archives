// geo.namespace('abc.def.ghi')
// => va verifier et creer si besoin dans niveau => geo.abc, puis geo.abc.def, puis geo.abc.def.ghi
// très inspiré de http://code.google.com/p/adoromedia/source/browse/trunk/tddjs/tab/lib/tdd.js?r=1278
var geo = (function() {
    function namespace(str) {
        var object = this;
        var levels = str.split(".");
              
        for(var i = 0, l = levels.length; i < l; i++) {
            if(typeof object[levels[i]] == "undefined") {
                object[levels[i]] = {};                         
            }
            object = object[levels[i]];
        }
                
        return object;          
    }
        
    return {
        namespace: namespace
    } 
}());