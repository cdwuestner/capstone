game.EntityManager = me.Container.extend({

  init : function(){
      this._super(me.Container, "init", [0, 0, 640, 480]);
  },

  onActivateEvent : function(){
      me.input.registerPointerEvent('pointerdown', this, this.pointerDown.bind(this));
  },

  pointerDown : function(event){
      console.log(event.pointerId, event.gameX, event.gameY);
      return false;
  }

});

// Skeleton Entity
game.SkeletonEntity = me.Sprite.extend({
    // Constructor
    init : function(_x, _y, _settings){
        // Call super (Entity) constructor
        this._super(me.Sprite, "init", [_x, _y, {
            image: "skeleton",
            framewidth: 25.6,
            frameheight: 31.2
        }]);
        // Add walking and idle animations
        this.addAnimations();
        this.setCurrentAnimation("left");

        me.input.registerPointerEvent("pointerdown", this, this.onMouseDown.bind(this));
        // this.body.setVelocity(0, 0);
        me.input.register
    },
    
    update : function(_dt){
        this._super(me.Sprite, "update", [_dt]);
        //this.renderable.setCurrentAnimation("stand");
        return true;
    },

    addAnimations : function(){
        this.addAnimation("idle", [65]);
        this.addAnimation("left", [39, 40, 41, 42, 43, 44, 45, 46],
                300);
        this.addAnimation("right", [52, 53, 54, 55, 56, 57, 58, 59],
                300);
        this.addAnimation("up", [26, 27, 28, 29, 30, 31, 32, 33], 
                300);
        this.addAnimation("down", [13, 14, 15, 16, 17, 18, 19, 20], 
                300);
    },

    onMouseDown : function(){
        this.flipX(true);
        return false;
    }
});

game.StartingSkeletons = me.Entity.extend({

    init : function(){
        this.skeletons = [];
        var settings = {};
        settings.width = 640;
        settings.height = 480;

        this._super(me.Entity, "init", [0, 0, settings]);

        this.skeleton1 = new game.SkeletonEntity(490, 240);
        me.game.world.addChild(this.skeleton1, 5);

        this.skeleton2 = new game.SkeletonEntity(490, 205);
        me.game.world.addChild(this.skeleton2, 5);
    }
});