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
        this.healer = me.pool.pull("HealerEntity", 48, 150);
        me.game.world.addChild(this.healer, 5);

        this.wizzardplayer = me.pool.pull("WizzardPlayerEntity", 48, 150);
        me.game.world.addChild(this.wizzardplayer, 5);

        this.warrior = me.pool.pull("WarriorEntity", 48, 300);
        me.game.world.addChild(this.warrior, 5);
       // me.game.world.addChild(new game.square(100, 100, {width: 50, height: 50}), 1);

        this.skeleton1 = me.pool.pull("SkeletonEntity", 490, 240);
        this.skeleton2 = me.pool.pull("SkeletonEntity", 490, 205);
        me.game.world.addChild(this.skeleton1, 5);
        me.game.world.addChild(this.skeleton2, 5);

        this.wizard = me.pool.pull("WizardEntity", 512, 215);
        me.game.world.addChild(this.wizard, 5);

        // Add zoom effect (https://github.com/melonjs/melonJS/issues/399)
        var viewport = me.game.viewport;
        viewport.currentTransform.translate(
            viewport.width * viewport.anchorPoint.x,
            viewport.height * viewport.anchorPoint.y
        );
        viewport.currentTransform.scale(1.5);
        viewport.currentTransform.translate(
            -viewport.width * viewport.anchorPoint.x,
            -viewport.height * viewport.anchorPoint.y
        );
    },

    // When leaving the game screen
    onDestroyEvent: function() {
        /* // remove the HUD from the game world
        me.game.world.removeChild(this.HUD); */
    }

});