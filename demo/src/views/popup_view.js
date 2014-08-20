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


    function PopupView() {
        View.apply(this);

        // this.model = model;

        // Create the mainTransforms for shifting the entire view over on menu open
        this.mainTransform = new Modifier({
            transform: Transform.translate(0, 800, 0),
        });

        this.surface1 = new Surface({
            content: 'click me to dismiss',
            size: [undefined, 100],
            properties: {
                lineHeight: "100px",
                textAlign: "center",
                backgroundColor: 'pink'
            }
        });

        this.surface2 = new Surface({
            content: 'I am pop up view',
            size: [undefined, 600],
            properties: {
                lineHeight: "100px",
                textAlign: "center",
                backgroundColor: 'green'
            }
        });


        var modifier2 = new Modifier({
            transform: Transform.translate(0, 100)
        });


        // Attach the main transform and the comboNode to the renderTree
        var wrapper = new RenderNode();
        var tmpnode = wrapper.add(this.mainTransform);
        tmpnode.add(this.surface1);
        tmpnode.add(modifier2).add(this.surface2);
        this._add(tmpnode);

        this.surface1.on('click', this.dismissPopup.bind(this));
        // this.mainTransform.setTransform(Transform.translate(0, 0, 0), { duration: 500, curve: 'easeOut' });
    };

    PopupView.prototype = Object.create(View.prototype);
    PopupView.prototype.constructor = PopupView;

    PopupView.prototype.setPopupAnimation = function(transform, settings) {
        this.mainTransform.setTransform(transform, settings);
    }

    PopupView.prototype.dismissPopup = function() {
        this.mainTransform.setTransform(Transform.translate(0, 800, 0), { duration: 500, curve: 'easeOut' });
    }

    module.exports = PopupView;
});