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

        /*// Temporary key bindings
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");*/

        me.input.registerPointerEvent("pointerdown", me.game.viewport, function (event) {
            me.event.publish("pointerdown", [ event ]);
        });
        
        this.body.setVelocity(.5, .5);

        x = this.pos.x;
        y = this.pos.y;

        this.xp = 0;
        this.level = 1;
        this.health = 100;
        this.attack = 100;

        this.goToBaseOne = false;
        this.goToBaseTwo = false;
        this.goToBaseThree = false;
        this.goToEnemyCastle = false;
        this.defendCastle = false;

        this.alwaysUpdate = true;
    },
    
    update : function(dt){
        if(this.goToBaseOne){
            if(this.pos.x > 310){
                this.renderable.flipX(false);
                if(!this.renderable.isCurrentAnimation("walk")){
                    this.renderable.setCurrentAnimation("walk");
                }
                this.body.vel.x -= this.body.accel.x * me.timer.tick;
            }else if(this.pos.x < 310){
                this.renderable.flipX(true);
                if(!this.renderable.isCurrentAnimation("walk")){
                    this.renderable.setCurrentAnimation("walk");
                }
                this.body.vel.x += this.body.accel.x * me.timer.tick;
            }else{
                this.body.vel.x = 0;
            }
            if(this.pos.y > 30){
                this.body.vel.y -= this.body.accel.y * me.timer.tick;
            }else if(this.pos.y < 30){
                this.body.vel.y += this.body.accel.y * me.timer.tick;
            }else{
                this.body.vel.y = 0;
            }
        }

        if(this.goToBaseTwo){
            if(this.pos.x > 310){
                this.renderable.flipX(false);
                if(!this.renderable.isCurrentAnimation("walk")){
                    this.renderable.setCurrentAnimation("walk");
                }
                this.body.vel.x -= this.body.accel.x * me.timer.tick;
            }else if(this.pos.x < 310){
                this.renderable.flipX(true);
                if(!this.renderable.isCurrentAnimation("walk")){
                    this.renderable.setCurrentAnimation("walk");
                }
                this.body.vel.x += this.body.accel.x * me.timer.tick;
            }else{
                this.body.vel.x = 0;
            }
            if(this.pos.y > 225){
                this.body.vel.y -= this.body.accel.y * me.timer.tick;
            }else if(this.pos.y < 225){
                this.body.vel.y += this.body.accel.y * me.timer.tick;
            }else{
                this.body.vel.y = 0;
            }
        }

        if(this.goToBaseThree){
            if(this.pos.x > 310){
                this.renderable.flipX(false);
                if(!this.renderable.isCurrentAnimation("walk")){
                    this.renderable.setCurrentAnimation("walk");
                }
                this.body.vel.x -= this.body.accel.x * me.timer.tick;
            }else if(this.pos.x < 310){
                this.renderable.flipX(true);
                if(!this.renderable.isCurrentAnimation("walk")){
                    this.renderable.setCurrentAnimation("walk");
                }
                this.body.vel.x += this.body.accel.x * me.timer.tick;
            }else{
                this.body.vel.x = 0;
            }
            if(this.pos.y > 415){
                this.body.vel.y -= this.body.accel.y * me.timer.tick;
            }else if(this.pos.y < 415){
                this.body.vel.y += this.body.accel.y * me.timer.tick;
            }else{
                this.body.vel.y = 0;
            }
        }

        if(this.goToEnemyCastle){
            if(this.pos.x > 65){
                this.renderable.flipX(false);
                if(!this.renderable.isCurrentAnimation("walk")){
                    this.renderable.setCurrentAnimation("walk");
                }
                this.body.vel.x -= this.body.accel.x * me.timer.tick;
            }else{
                this.body.vel.x = 0;
            }
            if(this.pos.y > 225){
                this.body.vel.y -= this.body.accel.y * me.timer.tick;
            }else if(this.pos.y < 225){
                this.body.vel.y += this.body.accel.y * me.timer.tick;
            }else{
                this.body.vel.y = 0;
            }
        }

        /*if (me.input.isKeyPressed("left")) {
           this.renderable.flipX(false);
           if(!this.renderable.isCurrentAnimation("walk")){
                this.renderable.setCurrentAnimation("walk");
           }
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed("right")) {
            this.renderable.flipX(true);
            if(!this.renderable.isCurrentAnimation("walk")){
                this.renderable.setCurrentAnimation("walk");
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
        }*/

        if(this.body.vel.y == 0 && this.body.vel.x == 0){
            this.renderable.setCurrentAnimation("idle");
        }

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        //me.collision.check(this);

        // check if we moved (an "idle" animation would definitely be cleaner)
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
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

    levelUp : function(){
        this.level++;
        this.updateStats(this.level);
        this.xp = 0;
    },

    updateStats : function(level){
        this.health = level * 100;
        this.attack = level * 100;
    },

    /*goToBase : function(base){
        if(base == 1){
            while(this.x < 304){
                this.x++;
            }
            while(this.x > 304){
                this.x--;
            }
        }
        return true;
    }*/
});