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

        // Array to store units
        var units = [];

        var skeleton1 = me.pool.pull("SkeletonEntity", 490, 205);
        var skeleton2 = me.pool.pull("SkeletonEntity", 490, 240);
        me.game.world.addChild(skeleton1, 2);
        units.push(skeleton1);
        me.game.world.addChild(skeleton2, 2);
        units.push(skeleton2);

        var sorcerer1 = me.pool.pull("SorcererEntity", 512, 215);
        me.game.world.addChild(sorcerer1, 2);
        units.push(sorcerer1);

        var boss = me.pool.pull("BossEntity", 545, 197);
        me.game.world.addChild(boss, 2);

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

        var unitIndex = 0;
        var currentUnit = units[0];
        currentUnit.isSelected = true;
        // Spacebar hotkey to cycle between units
        me.input.bindKey(me.input.KEY.SPACE, "next");
        // Remember to eliminate empty indexes from array after units are killed
        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge){
        	if(action == "next"){
                currentUnit.isSelected = false;
                if(unitIndex < units.length - 1){
                    unitIndex++;
                    currentUnit = units[unitIndex];
                }else{
                    unitIndex = 0;
                    currentUnit = units[unitIndex];
                }
                currentUnit.isSelected = true;
            }
        });


        this.pointerDown= me.event.subscribe("pointerdown", function (event) {
            console.log(event.pointerId, event.gameX, event.gameY); // etc ...
            currentUnit.x = Math.round(event.gameX);
            currentUnit.y = Math.round(event.gameY);
        });

    },

    // When leaving the game screen
    onDestroyEvent: function() {
        /* // remove the HUD from the game world
        me.game.world.removeChild(this.HUD); */

        me.input.unbindKey(me.input.KEY.SPACE);
        me.event.unsubscribe(this.pointerDown);
    }

});