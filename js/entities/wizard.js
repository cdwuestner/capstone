// Wizard Entity\
game.WizardEntity = me.Entity.extend({
    // Constructor
    init: function (x, y, settings) {
        // Call super (Entity) constructor
        this._super(me.Entity, "init", [x, y, {
            image: "wizard",
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

                //set collision type
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;

        this.body.setVelocity(.5, .5);

        this.isSelected = false;

        // Set some starting stats
        this.xp = 0;
        this.level = 1;
        this.maxHealth = 100;
        this.curHealth = 100;

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
            if(me.input.isKeyPressed("left")){
                me.game.world.addChild(me.pool.pull("MagicLeft", this.pos.x - game.MagicLeft.width - 12, this.pos.y - game.MagicLeft.height + 8))
            }
            if(me.input.isKeyPressed("right")){
                me.game.world.addChild(me.pool.pull("MagicRight", this.pos.x - game.MagicRight.width + 12, this.pos.y - game.MagicRight.height + 8))
            }
            if(me.input.isKeyPressed("up")){
                me.game.world.addChild(me.pool.pull("MagicUp", this.pos.x - game.MagicUp.width, this.pos.y - game.MagicUp.height - 15))
            }
            if(me.input.isKeyPressed("down")){
                me.game.world.addChild(me.pool.pull("MagicDown", this.pos.x - game.MagicDown.width, this.pos.y - game.MagicDown.height + 22))
            }
        }
        // Apply physics
        this.body.update(dt);
        
        // Only update position if entity has moved
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x != 0 ||
            this.body.vel.y != 0);
    },

    addAnimations: function () {
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

    onCollision : function(response, other){

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