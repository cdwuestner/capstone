// Skeleton Warrior Entity
game.SkeletonEntity = me.Entity.extend({
    // Constructor
    init : function(_x, _y, _settings){
        // Call super (Entity) constructor
        this._super(me.Entity, "init", [_x, _y, {
            image: "skeleton",
            width: 25.6,
            height: 31.2
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
        this.renderable.addAnimation("idle", [65]);
        this.renderable.addAnimation("left", [39, 40, 41, 42, 43, 44, 45, 46],
                300);
        this.renderable.addAnimation("right", [52, 53, 54, 55, 56, 57, 58, 59],
                300);
        this.renderable.addAnimation("up", [26, 27, 28, 29, 30, 31, 32, 33], 
                300);
        this.renderable.addAnimation("down", [13, 14, 15, 16, 17, 18, 19, 20], 
                300);
    }
});