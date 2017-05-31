game.HealingLeft = me.Entity.extend({

    init : function(x, y){
        this._super(me.Entity, "init", [x, y, {width: game.HealingLeft.width, height: game.HealingLeft.height}]);
        this.z = 5;
        this.body.setVelocity(5, 0);
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
        this.renderable = new (me.Renderable.extend({
            init : function(){
                this._super(me.Renderable, "init", [0, 0, game.HealingLeft.width, game.HealingLeft.height]);
            },
            destroy : function(){ },
            draw : function(renderer){
                var color = renderer.getColor();
                renderer.setColor('#21b72a');
                renderer.fillRect(0, 0, this.width, this.height);
                renderer.setColor(color);
            }
        }));
        this.alwaysUpdate = true;
        this.startingX = this.pos.x;
    },

    update : function(time){
        this.body.vel.x -= this.body.accel.x * time / 1000;
        if(this.pos.x + this.width <= 0 || this.pos.x + this.width <= this.startingX - 75){
            me.game.world.removeChild(this);
        }

        this.body.update();
        me.collision.check(this);

        return true;
    }

});

game.HealingLeft.width = 7;
game.HealingLeft.height = 3;