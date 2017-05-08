game.EnemyManager = me.Container.extend({

  init : function () {
    this._super(me.Container, "init", [
      0, 0, 640, 480
    ]);

  },

  createInitialEnemies : function(){
    // Add initial enemies
    var skeleton1 = me.pool.pull("SkeletonEntity", 490, 205);
    this.addChild(skeleton1);

    var skeleton2 = me.pool.pull("SkeletonEntity", 490, 240);
    this.addChild(skeleton2);

    this.addChild(me.pool.pull("WizardEntity", 512, 215));
    this.addChild(me.pool.pull("BossEntity", 545, 197));

    this.updateChildBounds();
    this.createdInitialEnemies = true;
  }

});