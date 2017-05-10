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

        this.body.setVelocity(.5, .5);

        this.isSelected = false;

        me.input.registerPointerEvent("pointerdown", me.game.viewport, function(event){
            me.event.publish("pointerdown", [event]);
        });
    },

    update: function (dt) {
        if (this.pos.x > this.x) {
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        } else if (this.pos.x < this.x) {
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        } else {
            this.body.vel.x = 0;
        }
        if (this.pos.y > this.y) {
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        } else if (this.pos.y < this.y) {
            this.body.vel.y += this.body.accel.y * me.timer.tick;
        } else {
            this.body.vel.y = 0;
        }
        // Added a flicker to show which is selected
        if (this.isSelected) {
            this.renderable.flicker(150);
        }
        console.log(this.body.vel.x, this.body.vel.y);
        // Apply physics
        this.body.update(dt);
        // Only update position if entity has moved
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x != 0 ||
            this.body.vel.y != 0);
    },
    /*   
     update : function (dt) {
       if (me.input.isKeyPressed('left')) {
   
         // update the entity velocity
         this.body.vel.x -= this.body.accel.x * me.timer.tick;
   
         // change to the walking animation
         if (!this.renderable.isCurrentAnimation("left")) {
           this.renderable.setCurrentAnimation("left");
         }
       }
       else if (me.input.isKeyPressed('right')) {
   
         // update the entity velocity
         this.body.vel.x += this.body.accel.x * me.timer.tick;
   
         // change to the walking animation
         if (!this.renderable.isCurrentAnimation("right")) {
           this.renderable.setCurrentAnimation("right");
         }
       }
   
       else if (me.input.isKeyPressed('down')) {
   
         // update the entity velocity
         this.body.vel.y += this.body.accel.y * me.timer.tick;
   
         // change to the walking animation
         if (!this.renderable.isCurrentAnimation("down")) {
           this.renderable.setCurrentAnimation("down");
         }
       }    
       else if (me.input.isKeyPressed('up')) {
   
         // update the entity velocity
         this.body.vel.y += this.body.accel.y * me.timer.tick;
   
   
         // change to the walking animation
         if (!this.renderable.isCurrentAnimation("up")) {
           this.renderable.setCurrentAnimation("up");
         }
       }
       else {
         this.body.vel.x = 0;
   
         // change to the standing animation
         this.renderable.setCurrentAnimation("stand");
       }
   
   
       // apply physics to the body (this moves the entity)
       this.body.update(dt);
   
       // handle collisions against other shapes
       me.collision.check(this);
   
       // return true if we moved or if the renderable was updated
       return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
     },
   */
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
    }
});