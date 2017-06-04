// HUD Container
game.HUD = game.HUD || {};
game.HUD.Container = me.Container.extend({
    init: function () {
        this._super(me.Container, 'init');
        // Make persistent across level change
        this.isPersistent = true;
        // Make sure we use screen coordinates
        this.floating = true;
        // Keep it on top layer
        this.z = Infinity;
        // Name
        this.name = "HUD";
        // Add stored unit graphic as child
        this.addChild(new game.HUD.BuildUnits(0, 0));
    }
});
// Display how many units can be "built"
game.HUD.BuildUnits = me.Renderable.extend( {
    // Constructor
    init : function (x, y) {
    // Call parent constructor
    this._super(me.Renderable, 'init', [x, y, 10, 10]);
    // Create font
    this.color = me.pool.pull("me.Color", 255, 255, 255);
    this.font = new me.Font("Arial", 25, this.color);
    // Align font
    this.font.textAlign = "left";
    this.font.textBaseline = "top";
    // Local copy of stored units
    this.storedUnits = 0;
    },
    // Update: return true if stored units changes
    update : function (dt) {
        if (this.storedUnits !== game.data.storedUnits) {
            this.storedUnits = game.data.storedUnits;
            return true;
        }
        return false;
    },
    // Draw stored units render
    draw : function (renderer) {
	    this.font.draw (renderer, "Stored Units: " + this.storedUnits, 0, 30);
    }
});