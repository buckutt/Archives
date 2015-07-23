(function( $ ) {
    $.fn.geoDateTimePicker = function(attr){
		if(typeof(attr) == 'undefined')
			attr = {};
		
		attr.changeMonth = true;
		attr.changeYear = true;
		attr.dateFormat = 'yy-mm-dd';
		attr.timeFormat = 'hh:mm:ss';
		attr.hourGrid = 6;
		attr.minuteGrid = 15;
		
		this.datetimepicker(attr);
		return this;
	};
	$.fn.geoJustDatePicker = function(attr){
		if(typeof(attr) == 'undefined')
			attr = {};
		
		attr.changeMonth = true;
		attr.changeYear = true;
		
		this.datepicker(attr);
		return this;
	};
	
	$.fn.geoDatePicker = function(mode, attr){
		if(typeof(mode) != 'undefined' && mode == 'time')
			return this.geoDateTimePicker(attr);
		else
			return this.geoJustDatePicker(attr);
	};
	
}( jQuery ) );
