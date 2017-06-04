game.HUD = game.HUD || {};
// The HUD container
game.HUD.Container = me.Container.extend({
    init: function() {
        // call the constructor
        this._super(me.Container, 'init');
        // persistent across level change
        this.isPersistent = true;
        // make sure we use screen coordinates
        this.floating = true;
        // Make sure it is drawn on top
        this.z = Infinity;
        // give a name
        this.name = "HUD";
        // add our child score object at the top left corner
        this.addChild(new game.HUD.ScoreItem(10, 10));
    }
});

// HUD for creating players
game.HUD.ScoreItem = me.Renderable.extend({
    // constructor
    init: function(x, y) {
        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 10, 10]);
        // white Arial font
        this.color = me.pool.pull("me.Color", 255, 255, 255);
        this.font = new me.Font("Arial", 32, this.color);
        // font aligned right, bottom
        this.font.textAlign = "center";

    },

    update : function () {
        // we don't do anything fancy here, so just
        // return true if the score has been updated
        if (this.score !== game.data.score) {
            this.score = game.data.score;
            return true;
        }
        return false;
    },

    draw : function (renderer) {
        // draw it baby !
		this.font.draw (renderer, game.data.score, me.game.viewport.width + this.pos.x, me.game.viewport.height + this.pos.y);
    }

});