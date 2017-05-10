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
        // Update even outside viewport
        this.alwaysUpdate = true;
        // Set movement speed
        this.body.setVelocity(.5, .5);

        this.attackCastle = false;
        this.defendCastle = false;
        this.goToBaseOne = false;
        this.goToBaseTwo = false;
        this.goToBaseThree = false;

        this.goToX = this.x;
        this.goToY = this.y;
        // Add all animations and set at "idle"
        this.addAnimations();
        this.renderable.setCurrentAnimation("idle");
        // Set some starting stats
        this.xp = 0;
        this.level = 1;
        this.health = 100;
        this.attack = 100;

        this.isSelected = false;

        me.input.registerPointerEvent("pointerdown", me.game.viewport, function (event) {
            me.event.publish("pointerdown", [ event ]);
        });
    },

    update : function(dt){
        /*if(this.attackCastle){
            if(this.pos.x > 75){
                this.body.vel.x -= this.body.accel.x * me.timer.tick;
            }else{
                this.body.vel.x = 0;
            }
            if(this.pos.y > 240){
                this.body.vel.y -= this.body.accel.y * me.timer.tick;
            }else if(this.pos.y < 200){
                this.body.vel.y += this.body.accel.y * me.timer.tick;
            }else{
                this.body.vel.y = 0;
            }
        }else if(this.defendCastle){
            if(this.pos.x < 510){
                this.body.vel.x += this.body.accel.x * me.timer.tick;
            }else{
                this.body.vel.x = 0;
            }
            if(this.pos.y > 240){
                this.body.vel.y -= this.body.accel.y * me.timer.tick;
            }else if(this.pos.y < 200){
                this.body.vel.y += this.body.accel.y * me.timer.tick;
            }else{
                this.body.vel.y = 0;
            }
        }else if(this.goToBaseOne || this.goToBaseTwo || this.goToBaseThree){
            if(this.pos.x > 310){
                this.body.vel.x -= this.body.accel.x * me.timer.tick;
            }else if(this.pos.x < 310){
                this.body.vel.x += this.body.accel.x * me.timer.tick;
            }else{
                this.body.vel.x = 0;
            }
            if(this.goToBaseOne){
                if(this.pos.y > 30){
                    this.body.vel.y -= this.body.accel.y * me.timer.tick;
                }else if(this.pos.y < 30){
                    this.body.vel.y += this.body.accel.y * me.timer.tick;
                }else{
                    this.body.vel.y = 0;
                }
            }else if(this.goToBaseTwo){
                if(this.pos.y > 225){
                    this.body.vel.y -= this.body.accel.y * me.timer.tick;
                }else if(this.pos.y < 225){
                    this.body.vel.y += this.body.accel.y * me.timer.tick;
                }else{
                    this.body.vel.y = 0;
                }
            }else if(this.goToBaseThree){
                if(this.pos.y > 410){
                    this.body.vel.y -= this.body.accel.y * me.timer.tick;
                }else if(this.pos.y < 410){
                    this.body.vel.y += this.body.accel.y * me.timer.tick;
                }else{
                    this.body.vel.y = 0;
                }
            }
        }*/
        // Movement using mouse click coordinates
        if(this.pos.x > this.x){
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        }else if(this.pos.x < this.x){
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        }else{
            this.body.vel.x = 0;
        }
        if(this.pos.y > this.y){
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        }else if(this.pos.y < this.y){
            this.body.vel.y += this.body.accel.y * me.timer.tick;
        }else{
            this.body.vel.y = 0;
        }
        // Added a flicker to show which is selected
        if(this.isSelected){
            this.renderable.flicker(150);
        }
        // Display correct animation
        this.animate();
        // Apply physics
        this.body.update(dt);
        // Only update position if entity has moved
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x != 0 || 
                this.body.vel.y != 0);
    },

    addAnimations : function(){
        this.renderable.addAnimation("idle", [65]);
        this.renderable.addAnimation("walk", [39, 40, 41, 42, 43, 44, 45, 46],
                300);
        this.renderable.addAnimation("up", [26, 27, 28, 29, 30, 31, 32, 33], 
                300);
        this.renderable.addAnimation("down", [13, 14, 15, 16, 17, 18, 19, 20], 
                300);
    },

    animate : function(){
        if(this.body.vel.x > 0){
            this.renderable.flipX(true);
            if(!this.renderable.isCurrentAnimation("walk")){
                this.renderable.setCurrentAnimation("walk");
            }
        }else if(this.body.vel.x < 0){
            this.renderable.flipX(false);
            if(!this.renderable.isCurrentAnimation("walk")){
                this.renderable.setCurrentAnimation("walk");
            }
        }else if(this.body.vel.y < 0){
            if(!this.renderable.isCurrentAnimation("up")){
                this.renderable.setCurrentAnimation("up");
            }
        }else if(this.body.vel.y > 0){
            if(!this.renderable.isCurrentAnimation("down")){
                this.renderable.setCurrentAnimation("down");
            }
        }else{
            if(!this.renderable.isCurrentAnimation("idle")){
                this.renderable.setCurrentAnimation("idle");
            }
        }
    }
});