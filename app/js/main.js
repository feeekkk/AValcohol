require.config({
    paths: {
        'jquery':       '../../vendor/jquery/dist/jquery',
        'underscore':   '../../vendor/underscore/underscore',
        'backbone':     '../../vendor/backbone/backbone',
        'marionette':   '../../vendor/marionette/lib/backbone.marionette',
        'slick':        '../../vendor/slick-carousel/slick/slick',
        'text':         '../../vendor/requirejs-text/text',
        'tpl':          '../../vendor/requirejs-tpl/tpl',
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            exports: 'Backbone',
            deps: ['jquery', 'underscore']
        },
		marionette: {
			deps: ['backbone'],
			exports: 'Marionette'
		},
    },
    deps: ['jquery', 'underscore', 'slick']
});

// boot up our app
require(['App'], function(App) {
	window.app = new App().start(); // storing globally yolo
    Backbone.history.start();
});
