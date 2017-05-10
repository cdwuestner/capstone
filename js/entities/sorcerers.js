// Sorcerer Entity
game.SorcererEntity = me.Entity.extend({
    // Constructor
    init : function(x, y, settings){
        // Call super (Entity) constructor
        this._super(me.Entity, "init", [x, y, {
            image: "sorcerer",
            width: 32,
            height: 32
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
        // Add all animations and set at "idle"
        this.addAnimations();
        this.renderable.setCurrentAnimation("idle");
        // Set some starting stats
        this.xp = 0;
        this.level = 1;
        this.health = 50;
        this.attack = 50;
    },

    update : function(dt){
        if(this.attackCastle){
            if(this.pos.x > 70){
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
        }
        this.animate();
        // Apply physics
        this.body.update(dt);
        // Only update position if entity has moved
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x != 0 || 
                this.body.vel.y != 0);
    },

    addAnimations : function(){
        this.renderable.addAnimation("idle", [0, 1, 2, 0, 1, 2, 0, 1, 2, 3, 4,
                5], 250);
        this.renderable.addAnimation("move", [15, 16, 17], 200);
    },

    animate : function(){
        if(this.body.vel.x != 0 || this.body.vel.y != 0){
            if(this.body.vel.x < 0){
                this.renderable.flipX(false);
            }else if(this.body.vel.x > 0){
                this.renderable.flipX(true);
            }
            if(!this.renderable.isCurrentAnimation("move")){
                this.renderable.setCurrentAnimation("move");
            }
        }else{
            if(!this.renderable.isCurrentAnimation("idle")){
                this.renderable.setCurrentAnimation("idle");
            }
        }
    }
});