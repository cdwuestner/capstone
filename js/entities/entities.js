/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);
    },

    /**
     * update the entity
     */
    update : function (dt) {
		
		/* if (me.input.isKeyPressed("pause")) {
			console.log("it is paused?");
			me.state.pause();
		} */

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
        // Make all other objects solid
        return true;
    }
});


game.SkeletonWarriorEntity = me.Entity.extend({
	init : function (x, y, settings) {
		// define skeleton sprite used
		this._super(me.Entity, 'init', [x, y, settings]);
		
		this.body.setVelocity(3, 15);
		
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		
		this.alwaysUpdate = true;
		
		this.renderable.addAnimation("stand", [0]);
		
		// Flip for now (delete later!)
		this.renderable.flipX(true);
	},
	
	update : function (dt) {
		this.body.vel.x = 0;
		
		this.renderable.setCurrentAnimation("stand");
		
		return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);

	}
});

game.SpiritEntity = me.Entity.extend({
	init : function (x, y, settings) {
				this._super(me.Entity, 'init', [x, y, settings]);
		
		this.body.setVelocity(3, 15);
		
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		
		this.alwaysUpdate = true;
		
		this.renderable.addAnimation("stand", [0]);
		
		// Flip for now (delete later!)
		this.renderable.flipX(true);		
	},
	
	update : function (dt) {
		this.body.vel.x = 0;
		
		this.renderable.setCurrentAnimation("stand");
		
		return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);

	}
})