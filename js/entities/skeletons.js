// Skeleton Warrior Entity
game.SkeletonEntity = me.Entity.extend({
    // Constructor
    init : function(_x, _y, _settings){
        // Call super (Entity) constructor
        this._super(me.Entity, "init", [_x, _y, {
            image: "skeleton",
            width: 64,
            height: 64
        }]);
        // Add walking and idle animations
        this.addAnimations();
        this.renderable.setCurrentAnimation("idle");
        
        // this.body.setVelocity(0, 0);
    },
    
    update : function(_dt){
        this._super(me.Entity, "update", [_dt]);
        //this.renderable.setCurrentAnimation("stand");
        return true;
    },

    addAnimations : function(){
        this.renderable.addAnimation("idle", [26]);
        this.renderable.addAnimation("left", [117, 118, 119, 120, 121, 122,
                123, 124, 125], 150);
        this.renderable.addAnimation("right", [143, 144, 145, 146, 147, 148,
                149, 150, 151], 150);
        this.renderable.addAnimation("up", [105, 106, 107, 108, 109, 110,
                111, 112], 150);
        this.renderable.addAnimation("down", [131, 132, 133, 134, 135, 136,
                137, 138], 150);
    }
});