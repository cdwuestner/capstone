game.HealingUp = me.Entity.extend({

    init : function(x, y){
        this._super(me.Entity, "init", [x, y, {width: game.HealingUp.width, height: game.HealingUp.height}]);
        this.z = 5;
        this.body.setVelocity(0, 5);
        this.body.collisionType = me.collision.types.COLLECTABLE_OBJECT;
        this.renderable = new (me.Renderable.extend({
            init : function(){
                this._super(me.Renderable, "init", [0, 0, game.HealingUp.width, game.HealingUp.height]);
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
        this.startingY = this.pos.y;
    },

    update : function(time){
        this.body.vel.y -= this.body.accel.y * time / 1000;
        if(this.pos.y + this.height <= 0 || this.pos.y + this.height <= this.startingY - 75){
            me.game.world.removeChild(this);
        }

        this.body.update();
        me.collision.check(this);

        return true;
    },

    onCollision : function(response, other){
        if(other.body.collisionType === me.collision.types.PLAYER_OBJECT){
            me.game.world.removeChild(this);
            return false;
        }
        if(other.body.collisionType === me.collision.types.ENEMY_OBJECT){
            return false;
        }
        if(other.body.collisionType === me.collision.types.WORLD_SHAPE){
            return false;
        }
    }

});

game.HealingUp.width = 3;
game.HealingUp.height = 7;