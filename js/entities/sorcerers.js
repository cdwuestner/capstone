// Sorcerer Entity
game.SorcererEntity = me.Entity.extend({
    // Constructor
    init : function(x, y, base_x, base_y, settings){
        // Call super (Entity) constructor, add two paramters for base that it is going to go t o
        this._super(me.Entity, "init", [x, y, {
            image: "sorcerer",
            width: 32,
            height: 32
        }]);
        // Layer
        this.z = 5;
        // Update even outside viewport
        this.alwaysUpdate = true;
        // Set movement speed (fastest in game)
        this.body.setVelocity(.75, .75);
        this.base_x = base_x;
        this.base_y = base_y;

        this.attackCastle = false;
        this.defendCastle = false;
        this.goToBaseOne = false;
        this.goToBaseTwo = false;
        this.goToBaseThree = false;
        // Add all animations and set at "idle"
        this.addAnimations();
        this.renderable.setCurrentAnimation("idle");
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;
        // Stats
        this.maxHealth = 75;
        this.curHealth = 75;
        this.attack = 60;
       


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
            if(this.pos.x > this.base_x){
                this.body.vel.x -= this.body.accel.x * me.timer.tick;
            }else if(this.pos.x < this.base_x){
                this.body.vel.x += this.body.accel.x * me.timer.tick;
            }else{
                this.body.vel.x = 0;
            }
             
                if(this.pos.y > this.base_y){
                    this.body.vel.y -= this.body.accel.y * me.timer.tick;
                }else if(this.pos.y < this.base_y){
                    this.body.vel.y += this.body.accel.y * me.timer.tick;
                }else{
                    this.body.vel.y = 0;
                }


/*            if(this.goToBaseOne){
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
            }*/
        }
        // Display correct animations
        this.animate();
        // Apply physics
        this.body.update(dt);
        // Check for collisions
        me.collision.check(this);
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
    },

    levelUp : function(){
        this.level++;
        this.updateStats(this.level);
        this.xp = 0;
    },

    updateStats : function(level){
        this.maxHealth = level * 50;
        this.curHealth = this.maxHealth;
        this.attack = level * 50;
    },

    draw : function(renderer){
        // Draw health bar
        var color = renderer.getColor();
        renderer.setColor('#21b72a');
        renderer.fillRect(this.pos.x, this.pos.y + 35, (this.curHealth / this.maxHealth) * 30, 3);
        renderer.setColor(color);
        // Call super so that sprite is also drawn
        this._super(me.Entity, "draw", [renderer]);
    },

    onCollision : function(response, other){
        if(other.body.collisionType === me.collision.types.PROJECTILE_OBJECT){
            this.curHealth -= 15;
            if(this.curHealth < 0){
                me.game.world.removeChild(this);
            }
            return false;
        }
        if(other.body.collisionType === me.collision.types.PLAYER_OBJECT){
            // Temporarily filter collision detection with players
            this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);
            // Random damage based on attack of player unit
            this.curHealth -= Math.floor(Math.random() * other.attack);
            // Remove enemy unit if its health is 0
            if(this.curHealth <= 0){
                this.alive = false;
                me.game.world.removeChild(this);
            }
            // Move enemy back a bit based on current movement
            if(this.body.vel.x > 0){
                this.pos.x -= 10;
            }
            if(this.body.vel.x < 0){
                this.pos.x += 10;
            }
            if(this.body.vel.y > 0){
                this.pos.y -= 10;
            }
            if(this.body.vel.y < 0){
                this.pos.y += 10;
            }
            this.x = this.pos.x;
            this.y = this.pos.y;
            // Disable collision filter
            this.body.setCollisionMask(me.collision.types.ALL_OBJECT);
            return false;
        }
        if(other.body.collisionType === me.collision.types.COLLECTABLE_OBJECT){
            return false;
        }
        return false;
    }

});