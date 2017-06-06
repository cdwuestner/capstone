// HUD Container
game.HUD = game.HUD || {};
game.HUD.Container = me.Container.extend({
    init: function () {
        this._super(me.Container, 'init');
        // Make persistent across level change
        // this.isPersistent = true;
        // Make sure we use screen coordinates
        this.floating = true;
        // Keep it on top layer
        this.z = Infinity;
        // Name
        this.name = "HUD";
        // Add stored unit graphic as child
        this.addChild(new game.HUD.BuildUnits(0, 0));
        this.addChild(new game.HUD.UnitInstructions(0, 0));
    }
});
// Display how many units can be "built"
game.HUD.BuildUnits = me.Renderable.extend({
    // Constructor
    init : function (x, y) {
        // Call parent constructor
        this._super(me.Renderable, 'init', [x, y, 10, 10]);
        // Create font (white Arial)
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
    // Draw available units render
    draw : function (renderer) {
	    this.font.draw(renderer, "Available Units: " + this.storedUnits, 165, 30);
    }
});
// Give the user instructions
game.HUD.UnitInstructions = me.Renderable.extend({
    // Constructor
    init : function(x, y){
        // Call parent constructor
        this._super(me.Renderable, 'init', [x, y, 10, 10]);
        // Create font (white Arial)
        this.color = me.pool.pull("me.Color", 255, 255, 255);
        this.font = new me.Font("Arial", 15, this.color);
        // Align font
        this.font.textAlign = "left";
        this.font.textBaseline = "top";
    },
    // Draw the instructional text
    draw : function (renderer) {
        this.font.draw(renderer, "Press:", 400, 20);
        this.font.draw(renderer, "W for a Wizard\n"
                + " E for a Healer\n"
                + " R for a Warrior", 450, 20);
    }
});