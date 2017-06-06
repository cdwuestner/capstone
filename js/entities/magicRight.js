game.MagicRight = me.Entity.extend({

    init : function(x, y){
        this._super(me.Entity, "init", [x, y, {width: game.MagicRight.width, height: game.MagicRight.height}]);
        this.z = 4;
        this.body.setVelocity(5, 0);
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
        this.renderable = new (me.Renderable.extend({
            init : function(){
                this._super(me.Renderable, "init", [0, 0, game.MagicRight.width, game.MagicRight.height]);
            },
            destroy : function(){ },
            draw : function(renderer){
                var color = renderer.getColor();
                renderer.setColor('#d80d06');
                renderer.fillRect(0, 0, this.width, this.height);
                renderer.setColor(color);
            }
        }));
        this.alwaysUpdate = true;
        this.startingX = this.pos.x;
    },

    update : function(time){
        this.body.vel.x += this.body.accel.x * time / 1000;
        if(this.pos.x + this.width >= 640 || this.pos.x + this.width >= this.startingX + 75){
            me.game.world.removeChild(this);
        }

        this.body.update();
        me.collision.check(this);

        return true;
    },

    onCollision : function(response, other){
        if(other.body.collisionType === me.collision.types.ENEMY_OBJECT){
            me.game.world.removeChild(this);
            return false;
        }
        if(other.body.collisionType === me.collision.types.PLAYER_OBJECT){
            return false;
        }
        if(other.body.collisionType === me.collision.types.WORLD_SHAPE){
            return false;
        }
    }

});

game.MagicRight.width = 7;
game.MagicRight.height = 3;