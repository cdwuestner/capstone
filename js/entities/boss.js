// Boss Entity
game.BossEntity = me.Entity.extend({
    // Constructor
    init : function(x, y, settings){
        // Call super (Entity) constructor
        this._super(me.Entity, "init", [x, y, {
            image: "boss",
            width: 64,
            height: 78
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
        renderer.fillRect(this.pos.x - 15, this.pos.y + 75, (this.curHealth / this.maxHealth) * 100, 3);
        renderer.setColor(color);
        // Call super so that sprite is also drawn
        this._super(me.Entity, "draw", [renderer]);
    }

});