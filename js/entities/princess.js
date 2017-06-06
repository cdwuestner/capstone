// Princess Entity
game.PrincessEntity = me.Entity.extend({
    // Constructor
    init : function(x, y, settings){
        // Call super (Entity) constructor
        this._super(me.Entity, "init", [x, y, {
            image: "princess",
            framewidth: 19,
            frameheight: 36,
            width: 62,
            height: 62
        }]);
        // make her bigger
        this.renderable.scale(1.7, 1.7);

        // Layer
        this.z = 7;
        // Update even outside viewport
        this.alwaysUpdate = true;
        // Add animations
        this.addAnimations();
        this.renderable.setCurrentAnimation("stand");

        this.body.setVelocity(0, 0);
        this.curHealth = 500;
        this.maxHealth = 500;
        this.attack = 150;
        // Set collision type
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
    },
    
    update : function(dt){
        this._super(me.Entity, "update", [dt]);
        //this.renderable.setCurrentAnimation("stand");
        return true;
    },

    addAnimations : function(){
        this.renderable.addAnimation("stand", [13]);
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
        // Heal the princess/castle?
        if(other.body.collisionType === me.collision.types.COLLECTABLE_OBJECT){
            this.curHealth += 25;
            if(this.curHealth > this.maxHealth){
                this.curHealth = this.maxHealth;
            }
            return false;
        }
        if(other.body.collisionType === me.collision.types.ENEMY_OBJECT){
            // Temporarily filter collision detection with players
            this.body.setCollisionMask(me.collision.types.ENEMY_OBJECT);
            // Random damage based on attack of player unit
            this.curHealth -= Math.floor(Math.random() * other.attack);
            // Remove enemy unit if its health is 0
            if(this.curHealth <= 0){
                me.state.change(me.state.GAMEOVER);
            }
            this.body.setCollisionMask(me.collision.types.ALL_OBJECT);
            return false;
        }
        if(other.body.collisionType === me.collision.types.PROJECTILE_OBJECT){
            return false;
        }
        return false;
    }

});