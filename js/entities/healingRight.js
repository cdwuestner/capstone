game.HealingRight = me.Entity.extend({

    init : function(x, y){
        this._super(me.Entity, "init", [x, y, {width: game.HealingRight.width, height: game.HealingRight.height}]);
        this.z = 4;
        this.body.setVelocity(20, 0);
        this.body.collisionType = me.collision.types.COLLECTABLE_OBJECT;
        this.renderable = new (me.Renderable.extend({
            init : function(){
                this._super(me.Renderable, "init", [0, 0, game.HealingRight.width, game.HealingRight.height]);
            },
            destroy : function(){ },
            draw : function(renderer){
                var color = renderer.getColor();
                renderer.setColor('#1ec61b');
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

game.HealingRight.width = 7;
game.HealingRight.height = 3;