// Boss Entity
game.BossEntity = me.Entity.extend({
    // Constructor
    init : function(x, y, settings){
        // Call super (Entity) constructor
        this._super(me.Entity, "init", [x, y, {
            image: "boss",
            framewidth: 64,
            frameheight: 78,
            width: 62,
            height: 62
        }]);
        // Layer
        this.z = 5;
        // Update even outside viewport
        this.alwaysUpdate = true;
        // Add animations
        this.addAnimations();
        this.renderable.setCurrentAnimation("stand");

        this.body.setVelocity(0, 0);
        this.curHealth = 500;
        this.maxHealth = 500;
        this.attack = 500;  // Probably too high
        // Set collision type
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;
    },
    
    update : function(dt){
        this._super(me.Entity, "update", [dt]);
        //this.renderable.setCurrentAnimation("stand");
        return true;
    },

    addAnimations : function(){
        this.renderable.addAnimation("stand", [0, 1, 2], 1500);
    },

    draw : function(renderer){
        // Draw health bar
        var color = renderer.getColor();
        renderer.setColor('#21b72a');
        renderer.fillRect(this.pos.x - 20, this.pos.y + 65, (this.curHealth / this.maxHealth) * 100, 3);
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