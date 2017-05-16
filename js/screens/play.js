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

        // Make an array to store player units
        var units = [];
        // Add intial player and enemy units
        var warrior = me.pool.pull("WarriorEntity", 115, 235);
        me.game.world.addChild(warrior, 2);
        units.push(warrior);

        var healer = me.pool.pull("HealerEntity", 105, 200);
        me.game.world.addChild(healer, 2);
        units.push(healer);         

        var wizard = me.pool.pull("WizardEntity", 105, 270);
        me.game.world.addChild(wizard, 2);
        units.push(wizard);

        var base1 = me.pool.pull("BaseSprite", 315, 235);
        me.game.world.addChild(base1, 1);

        var skeleton1 = me.pool.pull("SkeletonEntity", 490, 205);
        var skeleton2 = me.pool.pull("SkeletonEntity", 490, 240);
        me.game.world.addChild(skeleton1);
        skeleton1.goToBaseOne = true;
        me.game.world.addChild(skeleton2);
        skeleton2.goToBaseThree = true;

        var sorcerer1 = me.pool.pull("SorcererEntity", 512, 215);
        me.game.world.addChild(sorcerer1);
        sorcerer1.goToBaseTwo = true;
        
        var boss = me.pool.pull("BossEntity", 545, 197);
        me.game.world.addChild(boss);

        var enemies = [];
        var i = 0;
        var addY;
        // Adds another enemy every 20 seconds (need to add 20 seconds for one)
        setInterval(function(){
            if(i % 2){
                addY = 125;
            }else{
                addY = 350;
            }
            if(Math.floor(Math.random() * 5) + 1 > 2){
                enemies[i] = me.pool.pull("SkeletonEntity", 585, addY);
            }else{
                enemies[i] = me.pool.pull("SorcererEntity", 585, addY);
            }
            me.game.world.addChild(enemies[i]);
            enemies[i].attackCastle = true;
            i++;
        }, 20000);
        // Keep track of which unit is selected
        var unitIndex = 0;
        var currentUnit = units[unitIndex];
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
            currentUnit.x = Math.round(event.gameX);
            currentUnit.y = Math.round(event.gameY);
            console.log(event.gameY);
            console.log(" " + event.gameX);
        });

    },

    // When leaving the game screen
    onDestroyEvent: function() {
        /* // remove the HUD from the game world
        me.game.world.removeChild(this.HUD); */
        
        // Unbind spacebar when screen is destroyed
        me.input.unbindKey(me.input.KEY.SPACE);
        // Unsubscribe from pointer event
        me.event.unsubscribe(this.pointerDown);
    }

});