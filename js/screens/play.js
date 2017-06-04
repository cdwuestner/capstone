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
        //vairables for X and Y coordinates. Previous set variables for bases were (315,50), (315,235) (315,420)
       

     //  if(me.save.baseOne){console.log("saved data exists")};

   //function to test if an entity is empty
    function isEmpty(value) {
        if(value == undefined || value == "{}"){
        return true;
        }
    }

    //declare variables for bases' coordinates; also stores capture string 
    var bx1, bx2, bx3, by1, by2, by3, c1, c2, c3;


    console.log("inital base posistion " + JSON.stringify(me.save));

    if(isEmpty(JSON.stringify(me.save.baseOne))){
            //for y coorindate of each of the bases
        by1 = Math.floor(Math.random() * (420 - 50)) + 50;
        by2 = Math.floor(Math.random() * (420 - 50)) + 50;
        by3 = Math.floor(Math.random() * (420 - 50)) + 50;


        //for x coordinate of each of the bases
        bx1 = Math.floor(Math.random() * (450 - 150)) + 150;
        bx2 = Math.floor(Math.random() * (450 - 150)) + 150;  
        bx3 =Math.floor(Math.random() * (450 - 150)) + 150;

        //intializes capture to neutral
        c1 = "enemy";
        c2 = "neutral";
        c3 = "neutral";

    } else {

        //for y coorindate of each of the bases from saved data
        by1 = me.save.baseOne.y;
        by2 = me.save.baseTwo.y;
        by3 = me.save.baseThree.y;



        //for x coordinate of each of the bases
        bx1 = me.save.baseOne.x;
        bx2 = me.save.baseTwo.x;
        bx3 = me.save.baseThree.x;


        c1 = me.save.baseOne.capture;
        c2 = me.save.baseTwo.capture;
        c3 = me.save.baseThree.capture;
    }


       // me.save.add({ baseOne : {} });
        me.save.baseOne = {x: bx1, y: by1, capture: "enemy"};

      //  me.save.add({ baseTwo : {} });
        me.save.baseTwo = {x: bx2, y: by2, capture: "neutral"};

     //   me.save.add({ baseThree : {} });
        me.save.baseThree = {x: bx3, y: by3, capture: "neutral"};

        console.log(JSON.stringify(me.save.baseOne.x));
       

       // me.save.add({basex : bx1, basey : by1});
        

   //     console.log(JSON.stringify(me.save));

        // Make an array to store player units
        var units = [];
        // Add intial player and enemy units
        var warrior = me.pool.pull("WarriorEntity", 115, 215);
        me.game.world.addChild(warrior, 2);
        units.push(warrior);

        var healer = me.pool.pull("HealerEntity", 105, 180);
        me.game.world.addChild(healer, 2);
        units.push(healer);         

        var wizard = me.pool.pull("WizardEntity", 105, 250);
        me.game.world.addChild(wizard, 2);
        units.push(wizard);

        var base1 = me.pool.pull("BaseSprite", bx1, by1, c1);
        me.game.world.addChild(base1, 1);

        var base2 = me.pool.pull("BaseSprite", bx2, by2, c2);
        me.game.world.addChild(base2, 1);

        var base3 = me.pool.pull("BaseSprite", bx3, by3, c3);
        me.game.world.addChild(base3, 1);


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
        
        var boss = me.pool.pull("BossEntity", 545, 197);
        me.game.world.addChild(boss);

        var princess = me.pool.pull("PrincessEntity", 55, 220);
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

        me.save.baseOne.capture = base1.capture;
        me.save.baseOne.capture = base2.capture;
        me.save.baseOne.capture = base3.capture;
      
        console.log(base1.capture);
        console.log(base2.capture)


        me.save.add({ complexObject : {} });
        me.save.complexObject = { a : "b", c : [ 1, 2, 3, "d" ], e : { f : [{}] } };
        me.save.complexObject.c = "foo"; 
        me.save.complexObject = me.save.complexObject; 
        console.log(JSON.stringify(me.save.complexObject));

        //will be used to remove save data when a new game needs to be started. 
  //      me.save.remove("baseOne");
    //    me.save.remove("baseTwo");
      //  me.save.remove("baseThree");

    },

    // When leaving the game screen
    onDestroyEvent: function() {
        /* // remove the HUD from the game world
        me.game.world.removeChild(this.HUD); */
        
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