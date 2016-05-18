/**
 * Created by Feek on 3/16/16.
 */

require.config({
	paths: {
		'jquery': 				'../../vendor/jquery/dist/jquery',
		'underscore': 			'../../vendor/underscore/underscore',
		'backbone': 			'../../vendor/backbone/backbone',
		'backbone.wreqr': 		'../../vendor/backbone.wreqr/lib/backbone.wreqr.min',
		'backboneRelational':	'../../vendor/backbone-relational/backbone-relational',
		'marionette': 			'../../vendor/marionette/lib/backbone.marionette',
		'foundation' : 			'../../vendor/foundation/js/foundation',
		'foundationEqualizer' : '../../vendor/foundation/js/foundation/foundation.equalizer',
		'foundationOffCanvas': 	'../../vendor/foundation/js/foundation/foundation.offcanvas',
		'foundationTooltip': 	'../../vendor/foundation/js/foundation/foundation.tooltip',
		'modernizr' : 			'../../vendor/modernizr/modernizr',
		'text': 				'../../vendor/requirejs-text/text',
		'tpl': 					'../../vendor/requirejs-tpl/tpl',
		'async': 				'../../vendor/requirejs-plugins/src/async',
		'stripe':				'https://js.stripe.com/v2/?noext',
		'backbone.poller':		'../../vendor/backbone-poller/backbone.poller',
		'moment':				'../../vendor/moment/moment',
		'jSignature':			'../../vendor/jSignature/libs/jSignature.min',
		'behaviors':			'../../vendor/UsefulMarionetteViewBehaviors'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			exports: 'Backbone',
			deps: ['jquery', 'underscore']
		},
		backboneRelational: {
			exports: 'BackboneRelational',
			deps: ['backbone'],
		},
		marionette: {
			deps: ['backbone'],
			exports: 'Marionette'
		},
		foundation: {
			deps: ['jquery', 'modernizr'],
			exports: 'Foundation'
		},
		foundationEqualizer: {
			deps: ['foundation']
		},
		foundationOffCanvas: {
			deps: ['foundation']
		},
		foundationTooltip: {
			deps: ['foundation']
		}
	},
	deps: ['jquery', 'underscore']
});

require([
	'App',
	'backbone',
	'views/RootView',
	'controllers/Controller',
	'util/Router',
	'../../shared/js/models/Config',
	'foundation',
], function (
	app,
	Backbone,
	RootView,
	Controller,
	Router,
	Config
) {
	$(document).foundation();

	app.on('start', function() {
		app.rootView = new RootView();

		var controller = new Controller({
			rootView: app.rootView
		});

		app.rootView.render();
		app.router = new Router({ controller: controller });
	});

	// screw it, we're waiting for config to fetch before starting app
	app.config = new Config();
	app.config.fetch().done(function() {
		app.start();

		Backbone.history.start({
			pushState: true
		});
	}).error(function(response) {
		if (response.status === 503) {
			// api is down for maintenance
			$('body').html(
				'<div style="text-align:center;">' +
				'<h1>We Are Currently Down For Maintenance.</h1>' +
				'<p>Please check back soon - Aqua Vitae</p>' +
				'</div>'
			);
		}
	});
});
