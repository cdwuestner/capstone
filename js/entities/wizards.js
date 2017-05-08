// Wizard Entity
game.WizardEntity = me.Entity.extend({
    // Constructor
    init : function(x, y, settings){
        // Call super (Entity) constructor
        this._super(me.Entity, "init", [x, y, {
            image: "wizard",
            width: 32,
            height: 32
        }]);
        // Add idle, transform, and fly animations
        this.addAnimations();
        this.renderable.setCurrentAnimation("idle");
        // this.renderable.flipX(true);

        // Temporary key bindings
        me.input.bindKey(me.input.KEY.A, "lWiz");
        me.input.bindKey(me.input.KEY.D, "rWiz");
        me.input.bindKey(me.input.KEY.W, "uWiz");
        me.input.bindKey(me.input.KEY.X, "dWiz");
        
        this.body.setVelocity(.5, .5);
        // Add some sort of ranged advantage or boost to other units
        this.xp = 0;
        this.level = 1;
        this.health = 50;
        this.attack = 50;
        
        this.alwaysUpdate = true;
    },
    
    update : function(dt){
       if (me.input.isKeyPressed("lWiz")) {
           this.renderable.flipX(false);
            this.renderable.setCurrentAnimation("move");
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed("rWiz")) {
            this.renderable.flipX(true);
            this.renderable.setCurrentAnimation("move");
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        } else {
            this.body.vel.x = 0;
        }
        
        if (me.input.isKeyPressed("uWiz")) {
            if(!(me.input.isKeyPressed("lWiz") || me.input.isKeyPressed("rWiz")))
                this.renderable.setCurrentAnimation("move");
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        } else if (me.input.isKeyPressed("dWiz")) {
            if(!(me.input.isKeyPressed("lWiz") || me.input.isKeyPressed("rWiz")))
                this.renderable.setCurrentAnimation("move");
            this.body.vel.y += this.body.accel.y * me.timer.tick;
        } else {
            this.body.vel.y = 0;
        }

        if(this.body.vel.y == 0 && this.body.vel.x == 0){
            this.renderable.setCurrentAnimation("idle");
        }

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        //me.collision.check(this);

        // check if we moved (an "idle" animation would definitely be cleaner)
        if (this.body.vel.x !== 0 || this.body.vel.y !== 0) {
            this._super(me.Entity, "update", [dt]);
            return true;
        }
    },

    addAnimations : function(){
        this.renderable.addAnimation("idle", [0, 1, 2, 0, 1, 2, 0, 1, 2, 3, 4,
                5], 250);
        this.renderable.addAnimation("move", [15, 16, 17], 200);
    },

    levelUp : function(){
        this.level++;
        this.updateStats(this.level);
        this.xp = 0;
    },

    updateStats : function(level){
        this.health = level * 50;
        this.attack = level * 50;
    }
});