game.PlayScreen = me.ScreenObject.extend({
    // When creating/entering the game screen
    onResetEvent: function() {
        // Add our game board
        me.levelDirector.loadLevel("game_board");

        //vairables for X and Y coordinates. Previous set variables for bases were (315,50), (315,235) (315,420)

     //  Pause event occurs when user pushes letter P; saves all data so it will resume at that point when the user unpauses the game. 
        me.input.bindKey(me.input.KEY.P, "pause");
        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge){
            if(action == "pause"){

        console.log(enemies.length);
        me.save.enemySpawnLength = enemies.length;

            for(var a = 0; a < enemies.length; a++){

                me.save.enemySpawn[a] = {x : enemies[a].pos.x, y: enemies[a].pos.y, curHealth : enemies[a].curHealth, type : enemies[a].type};

                            }
        me.save.boss.curHealth = boss.curHealth;
        me.save.princess.curHealth = princess.curHealth;
        
        me.state.change(me.state.READY);
            }
        });
    
   //function to test if an entity is empty
    function isEmpty(value) {
        if(value == undefined || value == "{}"){
        return true;
        }
    }

    //declare variables for bases' coordinates; also stores capture string 
    var bx1, bx2, bx3, by1, by2, by3, c1, c2, c3;


    //console.log("inital base posistion " + JSON.stringify(me.save.baseOne));

    //generates new values if the bases are empty
    if(isEmpty(JSON.stringify(me.save.baseOne))){
        
            //for y coorindate of each of the bases
        by1 = Math.floor(Math.random() * (420 - 50)) + 50;
        by2 = Math.floor(Math.random() * (420 - 50)) + 50;
        by3 = Math.floor(Math.random() * (420 - 50)) + 50;


        //for x coordinate of each of the bases
        bx1 = Math.floor(Math.random() * (450 - 150)) + 150;
        bx2 = Math.floor(Math.random() * (450 - 150)) + 150;  
        bx3 = Math.floor(Math.random() * (450 - 150)) + 150;

        //intializes capture to neutral
        c1 = "neutral";
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

        //for the capture of each othe b
        c1 = me.save.baseOne.capture;
        c2 = me.save.baseTwo.capture;
        c3 = me.save.baseThree.capture;

    }

        var base1 = me.pool.pull("BaseSprite", bx1, by1, c1);
        me.game.world.addChild(base1);
        me.save.baseOne = {x: bx1, y: by1, capture: "neutral", z: 5};

        var base2 = me.pool.pull("BaseSprite", bx2, by2, c2);
        me.game.world.addChild(base2);
        me.save.baseTwo = {x: bx2, y: by2, capture: "neutral", z: 5};

        var base3 = me.pool.pull("BaseSprite", bx3, by3, c3);
        me.game.world.addChild(base3);
        me.save.baseThree = {x: bx3, y: by3, capture: "neutral", z: 5};

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

        var enemies = [];
  
        //declare variables for skeleton 1 
        var sx1, sy1;

        //initate values based on saved data or not 
         if(me.save.enemySpawn.length <= 1){
            console.log("queso")
            sx1 = 490; 
            sy1 = 205;
            var skeleton1 = me.pool.pull("SkeletonEntity", sx1, sy1, bx1, by1);
            enemies[0] =(skeleton1);
            me.game.world.addChild(skeleton1);
            enemies[0].goToBaseOne = true;
         } 


        //initate values based on saved data or not 
        var sx2, sy2;        

         if(me.save.enemySpawn.length <= 1){
            sx2 = 490; 
            sy2 = 240;
            var skeleton2 = me.pool.pull("SkeletonEntity", sx2, sy2, bx2, by2);
            enemies[1] =(skeleton2);
            me.game.world.addChild(skeleton2);
            enemies[1].goToBaseTwo = true;
         } 


        //declare variables for sorcer 1 based on saved data or not
        var sox1, soy1;

        if(me.save.enemySpawn.length <= 1){

            sox1 = 512; 
            soy1 = 215;

            var sorcerer1 = me.pool.pull("SorcererEntity", sox1, soy1, bx3, by3);
            enemies[2] =(sorcerer1);
            me.game.world.addChild(sorcerer1);
            enemies[2].goToBaseThree = true;
         }               
        

        var boss = me.pool.pull("BossEntity", 545, 210);
        me.game.world.addChild(boss);

        if(!isEmpty(JSON.stringify(me.save.boss))){
            boss.curHealth = me.save.boss.curHealth;
        }

        me.save.boss.curHealth = boss.curHealth;
        me.save.boss = {curHealth: boss.curHealth};

        var princess = me.pool.pull("PrincessEntity", 35, 210);
        me.game.world.addChild(princess);


        if(!isEmpty(JSON.stringify(me.save.princess))){
            princess.curHealth = me.save.princess.curHealth;
        }

        me.save.princess = princess.curHealth;

        me.save.princess = {curHealth: princess.curHealth};

        var addY;

        //this logics doesn't work yet to prevent spawining fo enemeies 
        // Adds another enemy every 20 seconds (need to add 20 seconds for one)

        if(me.save.enemySpawn.length <= 1){

            console.log(JSON.stringify(me.save.enemySpawn[1]));
    //    if(me.state.isPaused() == false){
      //      console.log("hmm");
      var i = 3;

        setInterval(function(){         
            
            if(i % 3 == 0){
                addY = 125;
            }else if(i % 3 == 1){
                addY = 237.5;
            }else{
                addY = 350;
            }
            if(Math.floor(Math.random() * 5) + 1 > 2){


                enemies[i] = me.pool.pull("SkeletonEntity", 585, addY);
         //      var saveEnemy =  {skeleton : true, x : 585, y: addY, curHealth: enemies[i].curHealth};

            }else{
                enemies[i] = me.pool.pull("SorcererEntity", 585, addY);
         //       var saveEnemy = {skeleton : false, x : 585, y: addY, curHealth: enemies[i].curHealth};
            }
         //   me.save.enemySpawn.push(saveEnemy);

          //  console.log(JSON.stringify(me.save.enemySpawn));

            me.game.world.addChild(enemies[i]);

            //random percent chance enemy will attack base instead of castle 
            var r = Math.random();

            if (r < 0.7){
                enemies[i].attackCastle = true;
            } else if( r < 0.8) {
                enemies[i].goToBaseOne = true;
            } else if( r < 0.9) {
                enemies[i].goToTwo = true;
            } else {
                enemies[i].goToBaseThree = true;
            }

            enemies[i].attackCastle = true;
            i++;

            console.log(i);
        }, 20000);

        //there is save data
    } else {

        var k = 1;

        console.log("enemy one " + JSON.stringify(me.save.enemySpawn[0]));
        console.log("base one" + JSON.stringify(me.save.baseOne));
        var length = JSON.parse(me.save.enemySpawnLength);
        //first spot always get initiated to empty brackets
        for(var a = 0; a < length; a++){
            var ex = me.save.enemySpawn[a].x;
            var ey = me.save.enemySpawn[a].y;

            console.log(JSON.stringify(me.save.enemySpawn[a].type));

            if(me.save.enemySpawn[a].type == "skeleton"){
                enemies[a] = me.pool.pull("SkeletonEntity", ex, ey);

            } else {
                enemies[a] = me.pool.pull("SorcererEntity", ex, ey);
            }
                enemies[a].curHealth = me.save.enemySpawn[a].curHealth;
                 me.game.world.addChild(enemies[a]);
           

            //random percent chance enemy will attack base instead of castle 
            var r = Math.random();

            if (r < 0.7){
                enemies[a].attackCastle = true;
            } else if( r < 0.8) {
                enemies[a].goToBaseOne = true;
            } else if( r < 0.9) {
                enemies[a].goToTwo = true;
            } else {
                enemies[a].goToBaseThree = true;
            }
            k++;
    

            }
        }
   
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
        me.input.bindKey(me.input.KEY.W, "wizard", true);
        me.input.bindKey(me.input.KEY.E, "healer", true);
        me.input.bindKey(me.input.KEY.R, "warrior", true);
        
        var baseOneLast = "neutral";
        var baseTwoLast = "neutral";
        var baseThreeLast = "neutral";

        var lastPlayerBases = 0;
        var lastEnemyBases = 0;

        this.pointerDown= me.event.subscribe("pointerdown", function (event) {
            currentUnit.x = Math.round(event.gameX);
            currentUnit.y = Math.round(event.gameY);

            if(base1.capture != baseOneLast){
                baseOneLast = base1.capture;
                if(base1.capture == "enemy"){
                    for(var y = 0; y < enemies.length; y++){
                        enemies[y].maxHealth += 25;
                        enemies[y].curHealth += 25;
                    }
                    for(var z = 0; z < units.length; z++){
                        units[z].maxHealth = units[z].defaultHealth;
                        if(units[z].curHealth > units[z].maxHealth){
                            units[z].curHealth = units[z].maxHealth;
                        }
                    }
                }
                if(base1.capture == "player"){
                    for(var y = 0; y < units.length; y++){
                        units[y].maxHealth += 25;
                        units[y].curHealth += 25;
                    }
                    for(var z = 0; z < enemies.length; z++){
                        enemies[z].maxHealth = enemies[z].defaultHealth;
                        if(enemies[z].curHealth > enemies[z].maxHealth){
                            units[z].curHealth = units[z].maxHealth;
                        }
                    }
                }
            }
            if(base2.capture != baseTwoLast){
                baseTwoLast = base2.capture;
                if(base2.capture == "enemy"){
                    for(var y = 0; y < enemies.length; y++){
                        enemies[y].maxHealth += 25;
                        enemies[y].curHealth += 25;
                    }
                    for(var z = 0; z < units.length; z++){
                        units[z].maxHealth = units[z].defaultHealth;
                        if(units[z].curHealth > units[z].maxHealth){
                            units[z].curHealth = units[z].maxHealth;
                        }
                    }
                }
                if(base2.capture == "player"){
                    for(var y = 0; y < units.length; y++){
                        units[y].maxHealth += 25;
                        units[y].curHealth += 25;
                    }
                    for(var z = 0; z < enemies.length; z++){
                        enemies[z].maxHealth = enemies[z].defaultHealth;
                        if(enemies[z].curHealth > enemies[z].maxHealth){
                            units[z].curHealth = units[z].maxHealth;
                        }
                    }
                }
            }
            if(base3.capture != baseThreeLast){
                baseThreeLast = base3.capture;
                if(base3.capture == "enemy"){
                    for(var y = 0; y < enemies.length; y++){
                        enemies[y].maxHealth += 25;
                        enemies[y].curHealth += 25;
                    }
                    for(var z = 0; z < units.length; z++){
                        units[z].maxHealth = units[z].defaultHealth;
                        if(units[z].curHealth > units[z].maxHealth){
                            units[z].curHealth = units[z].maxHealth;
                        }
                    }
                }
                if(base3.capture == "player"){
                    for(var y = 0; y < units.length; y++){
                        units[y].maxHealth += 25;
                        units[y].curHealth += 25;
                    }
                    for(var z = 0; z < enemies.length; z++){
                        enemies[z].maxHealth = enemies[z].defaultHealth;
                        if(enemies[z].curHealth > enemies[z].maxHealth){
                            units[z].curHealth = units[z].maxHealth;
                        }
                    }
                }
            }
        });

        // reset the score
        game.data.storedUnits = 0;

        // Add our HUD to the game world last so that it is on top of the rest.
        // Can also be forced by specifying a "Infinity" z value to the addChild function.
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);

        function unitsTracker() {
            game.data.storedUnits++;
        }

        var myTimer = setInterval(unitsTracker, 20000);

        //setInterval(function(){
        //    game.data.storedUnits++;
        //}, 20000);

        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge){
            if(action == "next"){
                // Go through and eliminate empty indexes from the units array
                currentUnit.isSelected = false;
                var count = 0;
                for(var i = units.length - 1; i >= 0; i--){
                    if(units[i].curHealth <= 0){
                        units.splice(i, 1);
                        if(i < unitIndex){
                            count++;
                        }
                    }
                }
                unitIndex -= count;
                if(unitIndex < units.length - 1){
                    unitIndex++;
                    currentUnit = units[unitIndex];
                }else{
                    unitIndex = 0;
                    currentUnit = units[unitIndex];
                }
                currentUnit.isSelected = true;
            }
            if(game.data.storedUnits > 0){
                if(action == "wizard"){
                    units[units.length] = me.pool.pull("WizardEntity", 50, 150);
                    me.game.world.addChild(units[units.length - 1]);
                    game.data.storedUnits--;

                }
                if(action == "healer"){
                    units[units.length] = me.pool.pull("HealerEntity", 50, 150);
                    me.game.world.addChild(units[units.length - 1]);
                    game.data.storedUnits--;
                }
                if(action == "warrior"){
                    units[units.length] = me.pool.pull("WarriorEntity", 50, 150);
                    me.game.world.addChild(units[units.length - 1]);
                    game.data.storedUnits--;
                }
            }
        });


        //will be used to remove save data when a new game needs to be started. 
  //      me.save.remove("baseOne");
    //    me.save.remove("baseTwo");
      //  me.save.remove("baseThree");

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
        me.input.unbindKey(me.input.KEY.W);
        me.input.unbindKey(me.input.KEY.E);
        me.input.unbindKey(me.input.KEY.R);
        me.input.unbindKey(me.input.KEY.I);
        // Unsubscribe from pointer event
        me.event.unsubscribe(this.pointerDown);
    }
});