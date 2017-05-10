game.PlayScreen = me.ScreenObject.extend({
    // When creating/entering the game screen
    onResetEvent: function() {
        // Add our game board
        me.levelDirector.loadLevel("game_board");
        /* // reset the score
        game.data.score = 0; */

        /* // Add our HUD to the game world, add it last so that this is on top of the rest.
        // Can also be forced by specifying a "Infinity" z value to the addChild function.
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD); */
        // Add intial player and enemy units
        var healer = me.pool.pull("HealerEntity", 105, 200);
        me.game.world.addChild(healer, 2);

        var wizard1 = me.pool.pull("WizardEntity", 105, 270);
        me.game.world.addChild(wizard1, 2);

        // Adding a second wizard until warrior can be added
        var wizard2 = me.pool.pull("WizardEntity", 115, 235);
        me.game.world.addChild(wizard2, 2);

        var skeleton1 = me.pool.pull("SkeletonEntity", 490, 205);
        var skeleton2 = me.pool.pull("SkeletonEntity", 490, 240);
        me.game.world.addChild(skeleton1, 2);
        me.game.world.addChild(skeleton2, 2);

        var sorcerer1 = me.pool.pull("SorcererEntity", 512, 215);
        me.game.world.addChild(sorcerer1, 2);

        var boss = me.pool.pull("BossEntity", 545, 197);
        me.game.world.addChild(boss, 2);

        //this.enemyManager = new game.EnemyManager();
	    //this.enemyManager.createInitialEnemies();
	    //me.game.world.addChild(this.enemyManager, 2);

        // Add zoom effect (https://github.com/melonjs/melonJS/issues/399)
        /*var viewport = me.game.viewport;
        viewport.currentTransform.translate(
            viewport.width * viewport.anchorPoint.x,
            viewport.height * viewport.anchorPoint.y
        );
        viewport.currentTransform.scale(1.5);
        viewport.currentTransform.translate(
            -viewport.width * viewport.anchorPoint.x,
            -viewport.height * viewport.anchorPoint.y
        );*/

        /*this.pointerDown= me.event.subscribe("pointerdown", function (event) {
            console.log(event.pointerId, event.gameX, event.gameY);
            console.log(skeleton1.getLevel());
        });*/

    },

    // When leaving the game screen
    onDestroyEvent: function() {
        /* // remove the HUD from the game world
        me.game.world.removeChild(this.HUD); */
        // me.event.unsubscribe(this.pointerDown);
    }

});