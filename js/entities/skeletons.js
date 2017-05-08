// Skeleton Entity
game.SkeletonEntity = me.Entity.extend({
    // Constructor
    init : function(x, y, settings){
        // Call super (Entity) constructor
        this._super(me.Entity, "init", [x, y, {
            image: "skeleton",
            width: 25.6,
            height: 31.3
        }]);
        // Add walking and idle animations
        this.addAnimations();
        this.renderable.setCurrentAnimation("idle");

        // Temporary key bindings
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");

        me.input.registerPointerEvent("pointerdown", me.game.viewport, function (event) {
            me.event.publish("pointerdown", [ event ]);
        });
        
        this.body.setVelocity(.5, .5);

        this.xp = 0;
        this.level = 1;
        this.health = 100;
        this.attack = 100;

        this.alwaysUpdate = true;
    },
    
    update : function(dt){
       if (me.input.isKeyPressed("left")) {
           if(!this.renderable.isCurrentAnimation("left")){
                this.renderable.setCurrentAnimation("left");
           }
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed("right")) {
            if(!this.renderable.isCurrentAnimation("right")){
                this.renderable.setCurrentAnimation("right");
            }
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        } else {
            this.body.vel.x = 0;
        }

        if (me.input.isKeyPressed("up")) {
            if(!(me.input.isKeyPressed("left") || me.input.isKeyPressed("right"))){
                if(!this.renderable.isCurrentAnimation("up")){
                    this.renderable.setCurrentAnimation("up");
                }
            }
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        } else if (me.input.isKeyPressed("down")) {
            if(!(me.input.isKeyPressed("left") || me.input.isKeyPressed("right"))){
                if(!this.renderable.isCurrentAnimation("down")){
                this.renderable.setCurrentAnimation("down");
                }
            }
            this.body.vel.y += this.body.accel.y * me.timer.tick;
        } else {
            this.body.vel.y = 0;
        }

        if(this.body.vel.y == 0 && this.body.vel.x == 0){
            this.renderable.setCurrentAnimation("idle");
        }

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        //me.collision.check(this);

        // check if we moved (an "idle" animation would definitely be cleaner)
        if (this.body.vel.x !== 0 || this.body.vel.y !== 0) {
            this._super(me.Entity, "update", [dt]);
            return true;
        }
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
    },

    levelUp : function(){
        this.level++;
        this.updateStats(this.level);
        this.xp = 0;
    },

    updateStats : function(level){
        this.health = level * 100;
        this.attack = level * 100;
    },

    getLevel : function(){
        return this.level;
    }
});