// Warrior Entity

game.WarriorEntity = me.Entity.extend({
    // Constructor
    init: function (x, y, settings) {
        // Call super (Entity) constructor
        this._super(me.Entity, "init", [x, y, {
            image: "warrior",
            width: 1,
            height: 1,
            framewidth: 64,
            frameheight: 64

        }]);
        //shrink players to gameboardsize
        this.renderable.scale(.6, .6);
        // Update even outside viewport
        this.alwaysUpdate = true;
        // Add walking and idle animations
        this.addAnimations();

        this.renderable.setCurrentAnimation("stand");

        this.body.setVelocity(.5, .5);
        // Set collision type
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;

        this.isSelected = false;
        this.inBattle = false;

        // Set some starting stats
        this.xp = 0;
        this.level = 1;
        this.maxHealth = 100;
        this.curHealth = 100;
        this.attack = 55;

        //in castle
        this.enemyCastle = false;

        me.input.registerPointerEvent("pointerdown", me.game.viewport, function(event){
            me.event.publish("pointerdown", [event]);
        });
    },

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
        // Added a flicker to show which is selected
        if (this.isSelected) {
            this.renderable.flicker(150);
        }

        // Update if in castle or not
        if (this.pos.x > 515 && this.pos.x < 630 && this.pos.y > 210 && this.pos.y < 280){
            this.enemyCastle = true;
            console.log("In Enemy Castle");
        }


        // Apply physics
        this.body.update(dt);

        me.collision.check(this);

        // Only update position if entity has moved
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x != 0 ||
            this.body.vel.y != 0);
    },


    addAnimations: function (x,y) {
        this.renderable.addAnimation("stand", [19]);


        this.renderable.addAnimation("left", [10, 11, 12, 13, 14, 15, 16, 17, 18],
            300);
        this.renderable.addAnimation("down", [19, 20, 21, 22, 23, 24, 25, 26, 27],
            300);
        this.renderable.addAnimation("up", [1, 2, 3, 4, 5, 6, 7, 8, 9],
            300);
        this.renderable.addAnimation("right", [28, 29, 30, 31, 32, 33, 34, 35],
            300);
    },

    levelUp : function(){
        this.level++;
        this.updateStats(this.level);
        this.xp = 0;
    },

    updateStats : function(level){
        this.maxHealth = level * 100;
        this.curHealth = this.maxHealth;
        this.attack = level * 55;
    },

    onCollision : function(response, other){
        if(other.body.collisionType === me.collision.types.ENEMY_OBJECT){
            // Filter collision detection with enemies
            this.body.setCollisionMask(me.collision.types.ENEMY_OBJECT);
            // Battle
            this.inBattle = true;
            // Random damage based on attack of other
            this.curHealth -= Math.floor(Math.random() * other.attack);
            if(this.curHealth <= 0){
                this.alive = false;
                me.game.world.removeChild(this);
            }
            console.log("warrior curHealth:" + this.curHealth);
            this.xp += 25;
            if(this.xp % 100 == 0){
                this.levelUp();
            }
            this.y = this.pos.y;
            this.pos.x = this.pos.x - 10;
            this.x = this.pos.x;
            this.inBattle = false;
            // Disable collision filter
            this.body.setCollisionMask(me.collision.types.ALL_OBJECT);
        }
        return false;
    },

    draw : function(renderer){
        // Draw health bar
        var color = renderer.getColor();
        renderer.setColor('#21b72a');
        renderer.fillRect(this.pos.x - 15, this.pos.y + 20, (this.curHealth / this.maxHealth) * 30, 3);
        renderer.setColor(color);
        // Call super so that sprite is also drawn
        this._super(me.Entity, "draw", [renderer]);
    }

});