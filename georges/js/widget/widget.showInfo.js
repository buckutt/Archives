(function( $ ) {
    // à appeler en $("#truc").showInfo({'text' : 'plouf party 12'});
    $.widget( "ui.showInfo", {
        options: { 
            text: ""
        },
       
        _create: function() {
           
            //<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px; padding: 0 .7em;">
            //                        <p><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>
            //                            <?php echo $str; ?>
            //                        </p>
            //                    </div>
            var divWrap = $("<div>")
            .addClass("ui-state-highlight")
            .addClass("ui-corner-all")
            .css({
                'margin-top': '20px', 
                'padding': '0 .9em'
            });
            var p = $("<p>");
            
            var span = $("<span>")
            .addClass("ui-icon ui-icon-info")
            .css({
                'float' : 'left', 
                'margin-right' : '.3em'
            });
           
            p.text(this.options.text);
            p.prepend(span);
            divWrap.append(p);
            
            this.element.append(divWrap);
        },
        
        // Use the _setOption method to respond to changes to options
        _setOption: function( key, value ) {
            switch( key ) {
                case "clear":
                    // handle changes to clear option
                    break;
            } 
            // In jQuery UI 1.8, you have to manually invoke the _setOption method from the base widget
            $.Widget.prototype._setOption.apply( this, arguments );
            // In jQuery UI 1.9 and above, you use the _super method instead
            this._super( "_setOption", key, value );
        },
        
        // Use the destroy method to clean up any modifications your widget has made to the DOM
        destroy: function() {
            
            // faudrait checker que c bien suffisant ...
            this.element.remove(this.element.find("div.ui-state-highlight"));
            // In jQuery UI 1.8, you must invoke the destroy method from the base widget
            $.Widget.prototype.destroy.call( this );
        // In jQuery UI 1.9 and above, you would define _destroy instead of destroy and not call the base method
        }

    });
}( jQuery ) );
