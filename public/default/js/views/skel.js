define([
	'marionette',
	'tpl!templates/'
], function(
	Mn,
	tpl
) {
	var view = Mn.ItemView.extend({
		template: tpl,

		events: {
		},

		ui: {
		},

		initialize: function(options) {
		}
	});

	return view;
});