define(function(require, exports, module) {
    // Famous Modules
    var View = require('famous/core/View');
    var RenderNode = require('famous/core/RenderNode')
    var Transform = require('famous/core/Transform');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var EventHandler = require('famous/core/EventHandler');
    var ViewSequence = require('famous/core/ViewSequence');
    var Transitionable = require('famous/transitions/Transitionable');
    var Scrollview = require('famous/views/Scrollview');
    var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
    var Utility = require('famous/utilities/Utility');

    var PopupView = require('views/popup_view')
    var SwitchView = require('views/switch_view')

    function MainView() {
        View.apply(this);

        // this.model = model;

        // Create the mainTransforms for shifting the entire view over on menu open
        this.mainTransform = new Modifier({
            transform: Transform.identity
        });

        this.surface1 = new Surface({
            content: 'click me to popup',
            size: [undefined, 100],
            properties: {
                lineHeight: "100px",
                textAlign: "center",
                backgroundColor: 'orange'
            }
        });

        this.surface2 = new Surface({
            content: 'surface2',
            size: [undefined, 400],
            properties: {
                lineHeight: "100px",
                textAlign: "center",
                backgroundColor: 'grey'
            }
        });

        this.surface3 = new Surface({
            content: 'click me to switch page',
            size: [undefined, 200],
            properties: {
                lineHeight: "100px",
                textAlign: "center",
                backgroundColor: 'red'
            }
        });

        var modifier2 = new Modifier({
            transform: Transform.translate(0, 100)
        });

        var modifier3 = new Modifier({
            transform: Transform.translate(0, 500)
        });

        // Attach the main transform and the comboNode to the renderTree
        var wrapper = new RenderNode().add(this.mainTransform);
        wrapper.add(this.surface1);
        wrapper.add(modifier2).add(this.surface2);
        wrapper.add(modifier3).add(this.surface3);
        this._add(wrapper);

        this.surface1.on('click', this.showPopup.bind(this));
        this.surface3.on('click', this.switchPage.bind(this));

        this._eventInput.on('back', this.back.bind(this));
    };

    MainView.prototype = Object.create(View.prototype);
    MainView.prototype.constructor = MainView;


    MainView.prototype.showPopup = function() {
    	var popupView = new PopupView();
    	this.add(popupView);
    	popupView.setPopupAnimation(Transform.translate(0, 0, 0), { duration: 500, curve: 'easeOut' });
    }

    MainView.prototype.switchPage = function() {
    	var switchView = new SwitchView();
    	switchView.pipe(this._eventInput);
    	this.add(switchView);
    	switchView.setSwitchAnimation(Transform.translate(0, 0, 0), { duration: 500, curve: 'linear' });
    	// this.mainTransform.setTransform(Transform.translate(-600, 0, 0), { duration: 1000, curve: 'linear' });
    }

    MainView.prototype.back = function() {
    	this.mainTransform.setTransform(Transform.translate(0, 0, 0), { duration: 500, curve: 'linear' });
    }

    module.exports = MainView;
});