game.PlayScreen = me.ScreenObject.extend({
    // When creating/entering the game screen
    onResetEvent: function() {
        // Add our game board
        me.levelDirector.loadLevel("game_board");

        //vairables for X and Y coordinates. Previous set variables for bases were (315,50), (315,235) (315,420)
       
        //for y coorindate
        var by1 = Math.floor(Math.random() * (420 - 50)) + 50;
        var by2 = Math.floor(Math.random() * (420 - 50)) + 50;
        var by3 = Math.floor(Math.random() * (420 - 50)) + 50;

        //for x coordinate
        var bx1 = Math.floor(Math.random() * (450 - 150)) + 150;
        var bx2 = Math.floor(Math.random() * (450 - 150)) + 150;  
        var bx3 =Math.floor(Math.random() * (450 - 150)) + 150;

        // Make an array to store player units
        var units = [];
        // Add intial player and enemy units
        var warrior = me.pool.pull("WarriorEntity", 115, 215);
        me.game.world.addChild(warrior);
        units.push(warrior);

        var healer = me.pool.pull("HealerEntity", 105, 180);
        me.game.world.addChild(healer);
        units.push(healer);         

        var wizard = me.pool.pull("WizardEntity", 105, 250);
        me.game.world.addChild(wizard);
        units.push(wizard);

        var base1 = me.pool.pull("BaseSprite", bx1, by1);
        me.game.world.addChild(base1, 2);

        var base2 = me.pool.pull("BaseSprite", bx2, by2);
        me.game.world.addChild(base2, 2);

        var base3 = me.pool.pull("BaseSprite", bx3, by3);
        me.game.world.addChild(base3, 2);

        var skeleton1 = me.pool.pull("SkeletonEntity", 490, 205, bx1, by1);
        var skeleton2 = me.pool.pull("SkeletonEntity", 490, 240, bx3, by3);
        me.game.world.addChild(skeleton1);
        skeleton1.goToBaseOne = true;
        me.game.world.addChild(skeleton2);
        skeleton2.goToBaseThree = true;

        //add paramters of base it is supposed to go to for AI. In this case base 2
        var sorcerer1 = me.pool.pull("SorcererEntity", 512, 215, bx2, by2);
        me.game.world.addChild(sorcerer1);
        sorcerer1.goToBaseTwo = true;
        
        var boss = me.pool.pull("BossEntity", 545, 210);
        me.game.world.addChild(boss);

        var princess = me.pool.pull("PrincessEntity", 35, 210);
        me.game.world.addChild(princess);

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
        me.input.bindKey(me.input.KEY.SPACE, "next", true);
        // Arrow keys for magic use
        me.input.bindKey(me.input.KEY.LEFT, "left", true);
        me.input.bindKey(me.input.KEY.RIGHT, "right", true);
        me.input.bindKey(me.input.KEY.UP, "up", true);
        me.input.bindKey(me.input.KEY.DOWN, "down", true);
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
        });

        // reset the score
        game.data.score = 0;

        // Add our HUD to the game world last so that it is on top of the rest.
        // Can also be forced by specifying a "Infinity" z value to the addChild function.
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD, 0, 0);
    },

    // When leaving the game screen
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
        // Unbind spacebar when screen is destroyed
        me.input.unbindKey(me.input.KEY.SPACE);
        // Unbind arrow keys
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.unbindKey(me.input.KEY.UP);
        me.input.unbindKey(me.input.KEY.DOWN);
        // Unsubscribe from pointer event
        me.event.unsubscribe(this.pointerDown);
    }
});