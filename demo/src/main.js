define(function(require, exports, module) {
	var Engine    = require('famous/core/Engine');
	// require('famous/inputs/FastClick');
	// Custom Modules
	var MainView   = require('views/main_view');
	// var App       = require('models/App');

	// var app       = new App();
	var appView   = new MainView();

	var mainCtx = Engine.createContext();
	mainCtx.setPerspective(1000);

	mainCtx.add(appView)
});
