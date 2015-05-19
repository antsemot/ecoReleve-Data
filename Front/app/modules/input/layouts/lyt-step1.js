define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',

	'ns_stepper/lyt-step',

], function($, _, Backbone, Marionette, Step) {

	'use strict';

	 return Step.extend({
		/*===================================================
		=            Layout Stepper Orchestrator            =
		===================================================*/
		events:{
			'click .manual-tile' : 'selectMode'
		},


		datachanged_radio: function(e){
			var target= $(e.target);
			var val=$(target).attr('value');
			this.updateModel(val);
		},

		onShow: function(){
			this.updateModel(1);
		},

		updateModel : function(value){
			this.model.set('start_stationtype' , value);
			for(var key in this.model.attributes) {
				if(key != 'start_stationtype'){
					this.model.set(key,null);
				}
			}
		},

	});
});
