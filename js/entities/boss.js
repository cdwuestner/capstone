// Boss Entity
game.BossEntity = me.Entity.extend({
    // Constructor
    init : function(x, y, settings){
        // Call super (Entity) constructor
        this._super(me.Entity, "init", [x, y, {
            image: "boss",
            width: 64,
            height: 78
        }]);
        // Update even outside viewport
        this.alwaysUpdate = true;
        // Add animations
        this.addAnimations();
        this.renderable.setCurrentAnimation("stand");

        this.body.setVelocity(0, 0);
        this.health = 500;
        this.attack = 500;  // Probably too high
    },
    
    update : function(dt){
        this._super(me.Entity, "update", [dt]);
        //this.renderable.setCurrentAnimation("stand");
        return true;
    },

    addAnimations : function(){
        this.renderable.addAnimation("stand", [0, 1, 2], 1500);
    }
});