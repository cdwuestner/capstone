// Wizard Entity
game.WizardEntity = me.Entity.extend({
    // Constructor
    init: function (x, y, settings) {
        // Call super (Entity) constructor
        this._super(me.Entity, "init", [x, y, {
            image: "wizard",
            width: 25,
            height: 35,
            framewidth: 64,
            frameheight: 64
        }]);
        // Set layer
        this.z = 7;
        // Shrink players to size of gameboard
        this.renderable.scale(.6, .6);
        // Update even outside viewport
        this.alwaysUpdate = true;
        // Set movement speed
        this.body.setVelocity(.25, .25);
        //set collision type
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
        // Add all animations and set at "stand" animation
        this.addAnimations();
        this.renderable.setCurrentAnimation("stand");
        // Unit's stats & variables
        this.maxHealth = 100;
        this.curHealth = 100;
        this.defaultHealth = 100;
        this.attack = 5;    // low close-range attack
        this.isSelected = false;
        // Register pointer event for movement
        me.input.registerPointerEvent("pointerdown", me.game.viewport, function(event){
            me.event.publish("pointerdown", [event]);
        });
    },
    // Update position on gameboard based on mouse click
    update: function (dt) {
        if (this.pos.x > this.x) {
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            if (!this.renderable.isCurrentAnimation("left")) {
              this.renderable.setCurrentAnimation("left");
            }              
        } else if (this.pos.x < this.x) {
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            if (!this.renderable.isCurrentAnimation("right")) {
              this.renderable.setCurrentAnimation("right");
            } 

        } else {
            this.body.vel.x = 0;
            if (this.body.vel.y == 0) {
              this.renderable.setCurrentAnimation("stand");
            }                 
        }
        if (this.pos.y > this.y) {
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
            if (!this.renderable.isCurrentAnimation("up")) {
              this.renderable.setCurrentAnimation("up");
            }             
        } else if (this.pos.y < this.y) {
            this.body.vel.y += this.body.accel.y * me.timer.tick;
            if (!this.renderable.isCurrentAnimation("down")) {
              this.renderable.setCurrentAnimation("down");
            }               
        } else {
            this.body.vel.y = 0;
            if (this.body.vel.x == 0) {
              this.renderable.setCurrentAnimation("stand");
            }             
        }
        // Added a flicker to show which is currently selected
        if (this.isSelected) {
            this.renderable.flicker(150);
            // Magic used with arrow keys
            if(me.input.isKeyPressed("left")){
                me.game.world.addChild(me.pool.pull("MagicLeft", this.pos.x - game.MagicLeft.width - 15, this.pos.y - game.MagicLeft.height + 20))
            }
            if(me.input.isKeyPressed("right")){
                me.game.world.addChild(me.pool.pull("MagicRight", this.pos.x - game.MagicRight.width + 43, this.pos.y - game.MagicRight.height + 20))
            }
            if(me.input.isKeyPressed("up")){
                me.game.world.addChild(me.pool.pull("MagicUp", this.pos.x - game.MagicUp.width + 14, this.pos.y - game.MagicUp.height - 10))
            }
            if(me.input.isKeyPressed("down")){
                me.game.world.addChild(me.pool.pull("MagicDown", this.pos.x - game.MagicDown.width + 14, this.pos.y - game.MagicDown.height + 55))
            }
        }
        // Update if in castle or not
        if (this.pos.x > 515 && this.pos.x < 630 && this.pos.y > 210 && this.pos.y < 280){
            this.enemyCastle = true;
            console.log(" Wizard ¿In Enemy Castle");
        }        
        // Apply physics
        this.body.update(dt);
        // Check for collisions
        me.collision.check(this);
        // Only update position if entity has moved
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x != 0 ||
                this.body.vel.y != 0);
    },
    // Add animations from spritesheet
    addAnimations: function () {
        this.renderable.addAnimation("stand", [18]);
        this.renderable.addAnimation("left", [10, 11, 12, 13, 14, 15, 16, 17],
            300);
        this.renderable.addAnimation("down", [19, 20, 21, 22, 23, 24, 25, 26],
            300);
        this.renderable.addAnimation("up", [1, 2, 3, 4, 5, 6, 7, 8],
            300);
        this.renderable.addAnimation("right", [28, 29, 30, 31, 32, 33, 34, 35],
            300);
    },
    // Handle collisions with other objects
    onCollision : function(response, other){
        // Collisions with healer magic
        if(other.body.collisionType === me.collision.types.COLLECTABLE_OBJECT){
            this.curHealth += Math.floor(Math.random() * 15);
            if(this.curHealth > this.maxHealth){
                this.curHealth = this.maxHealth;
            }
            return false;
        }
        // Collisions with enemies (skeletons, sorcerers, boss)
        if(other.body.collisionType === me.collision.types.ENEMY_OBJECT){
            // Temporarily filter collision detection with players
            this.body.setCollisionMask(me.collision.types.ENEMY_OBJECT);
            // Random damage based on attack of player unit
            this.curHealth -= Math.floor(Math.random() * other.attack);
            // Remove enemy unit if its health is 0
            if(this.curHealth <= 0){
                this.alive = false;
                me.game.world.removeChild(this);
            }
            // Move back a bit based on current movement
            if(this.body.vel.x > 0){
                this.pos.x -= 20;
            }
            if(this.body.vel.x < 0){
                this.pos.x += 20;
            }
            if(this.body.vel.y > 0){
                this.pos.y -= 20;
            }
            if(this.body.vel.y < 0){
                this.pos.y += 20;
            }
            this.x = this.pos.x;
            this.y = this.pos.y;
            // Remove collision filter
            this.body.setCollisionMask(me.collision.types.ALL_OBJECT);
            return false;
        }
        // Collisions with wizard magic
        if(other.body.collisionType === me.collision.types.PROJECTILE_OBJECT){
            return false;
        }
        return false;
    },
    // Draw a health bar plus the entity
    draw : function(renderer){
        // Draw health bar
        var color = renderer.getColor();
        renderer.setColor('#21b72a');
        renderer.fillRect(this.pos.x - 3, this.pos.y + 35, (this.curHealth / this.maxHealth) * 30, 3);
        renderer.setColor(color);
        // Call super so that entity is also drawn
        this._super(me.Entity, "draw", [renderer]);
    }
});