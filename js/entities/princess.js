// Princess Entity
game.PrincessEntity = me.Entity.extend({
    // Constructor
    init : function(x, y, settings){
        // Call super (Entity) constructor
        this._super(me.Entity, "init", [x, y, {
            image: "princess",
            width: 19,
            height: 36
        }]);
        // make her bigger
        this.renderable.scale(1.7, 1.7);

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
        this.attack =100;  // Probably too high
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
        renderer.setColor('#d60a29');
        renderer.fillRect(this.pos.x - 15, this.pos.y + 75, (this.curHealth / this.maxHealth) * 100, 3);
        renderer.setColor(color);
        // Call super so that sprite is also drawn
        this._super(me.Entity, "draw", [renderer]);
    }

});