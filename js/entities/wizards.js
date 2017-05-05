// Wizard Entity
game.WizardEntity = me.Entity.extend({
    // Constructor
    init : function(_x, _y, _settings){
        // Call super (Entity) constructor
        this._super(me.Entity, "init", [_x, _y, {
            image: "wizard",
            width: 32,
            height: 32
        }]);
        // Add idle, transform, and fly animations
        this.addAnimations();
        this.renderable.setCurrentAnimation("idle");
        // this.renderable.flipX(true);
    },
    
    update : function(_dt){
        this._super(me.Entity, "update", [_dt]);
        //this.renderable.setCurrentAnimation("stand");
        return true;
    },

    addAnimations : function(){
        this.renderable.addAnimation("idle", [0, 1, 2, 0, 1, 2, 0, 1, 2, 3, 4,
                5], 250);
        this.renderable.addAnimation("takeoff", [3, 4, 5, 12, 15, 16, 17], 200);
        this.renderable.addAnimation("land", [17, 16, 15, 12, 2, 1, 0], 200);
        this.renderable.addAnimation("move", [15, 16, 17], 200);
    }
});