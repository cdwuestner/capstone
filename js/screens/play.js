game.PlayScreen = me.ScreenObject.extend({
    // When creating/entering the game screen
    onResetEvent: function() {
        // Add our game board
        me.levelDirector.loadLevel("game_board");
        game.data.spawn = true;

        // reset the score if new game
        if(me.save.newGame == true){
            game.data.storedUnits = 0;
        }else{
            game.data.storedUnits = me.save.storedUnits;
        }

        
        //vairables for X and Y coordinates. Previous set variables for bases were (315,50), (315,235) (315,420)

     //  Pause event occurs when user pushes letter P; saves all data so it will resume at that point when the user unpauses the game. 
        me.input.bindKey(me.input.KEY.P, "pause");
        this.handle = me.event.subscribe(me.event.KEYDOWN, function(action){
            if(action == "pause"){


                var test = 0;
                console.log("test" + test);
                test++;
                game.data.spawn = false;
                me.save.newGame = false;

                console.log(enemies);
                // Remove dead enemies from enemies array
                for(var e = enemies.length; e--;){
                    if(enemies[e].curHealth <= 0){
                        enemies.splice(e, 1);
                    }
                }
                
        //save the base capture information
        me.save.baseOne.capture = base1.capture;
        me.save.baseTwo.capture = base2.capture;
        me.save.baseThree.capture = base3.capture;

        //clear save arrays
        me.save.enemySpawn = [{}];
        me.save.playerSpawn = [{}];


        console.log(enemies[0].pos.x);
        //save the enemy information 
        me.save.enemySpawnLength = enemies.length;

            for(var a = 0; a < enemies.length; a++){


                me.save.enemySpawn[a] = {x : enemies[a].pos.x, y: enemies[a].pos.y, curHealth : enemies[a].curHealth, type : enemies[a].type};

                            }
          //save player information and available units                  
          for(var b = 0; b < units.length; b++){


                me.save.playerSpawn[b] = {x : units[b].pos.x, y: units[b].pos.y, curHealth : units[b].curHealth, type : units[b].type};

                            }

        //clear game arrays
     //   enemies = [];
     //   units = [];
                            

        me.save.availableUnits = game.data.storedUnits;

        console.log(JSON.stringify(me.save.availableUnits));

        me.save.boss = {curHealth: boss.curHealth};
        me.save.princess = {curHealth: princess.curHealth};

        me.save.storedUnits = game.data.storedUnits;
        
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
    if(me.save.newGame == true){
        
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
        me.save.baseOne = {x: bx1, y: by1, capture: "neutral", z: 2};
   

        var base2 = me.pool.pull("BaseSprite", bx2, by2, c2);
        me.game.world.addChild(base2);
        me.save.baseTwo = {x: bx2, y: by2, capture: "neutral", z: 2};

        var base3 = me.pool.pull("BaseSprite", bx3, by3, c3);
        me.game.world.addChild(base3);
        me.save.baseThree = {x: bx3, y: by3, capture: "neutral", z: 2};




        // Make an array to store player units
        var units = [];
        //create intiatl spectrum of players if game is new.
    if(me.save.newGame == true){  
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
    }

        var enemies = [];

        if(me.save.newGame == false){
            console.log("zhu");
        }
  
        //declare variables for inital enemies 
        var sx1, sy1, sx2, sy2, sox1, sox2;

        //initate values based on saved data or not 
         if(me.save.newGame == true){
           
            sx1 = 490; 
            sy1 = 205;
            var skeleton1 = me.pool.pull("SkeletonEntity", sx1, sy1, bx1, by1);
            enemies[0] =(skeleton1);
            me.game.world.addChild(skeleton1);
            enemies[0].goToBaseOne = true;

            sx2 = 490; 
            sy2 = 240;
            var skeleton2 = me.pool.pull("SkeletonEntity", sx2, sy2, bx2, by2);
            enemies[1] =(skeleton2);
            me.game.world.addChild(skeleton2);
            enemies[1].goToBaseTwo = true;
  

            sox1 = 512; 
            soy1 = 215;

            var sorcerer1 = me.pool.pull("SorcererEntity", sox1, soy1, bx3, by3);
            enemies[2] =(sorcerer1);
            me.game.world.addChild(sorcerer1);
            enemies[2].goToBaseThree = true;
         }               
        

        var boss = me.pool.pull("BossEntity", 545, 210);
        me.game.world.addChild(boss);

        if(me.save.newGame == false){
            boss.curHealth = me.save.boss.curHealth;
        }

        
        var princess = me.pool.pull("PrincessEntity", 35, 210);
        me.game.world.addChild(princess);


        if(me.save.newGame == false){
            princess.curHealth = me.save.princess.curHealth;
        }


        var addY;

        //this logics doesn't work yet to prevent spawining fo enemeies 

        if(me.save.newGame == true){

            console.log(JSON.stringify(me.save.enemySpawn[1]));
    //    if(me.state.isPaused() == false){
      //      console.log("hmm");


        setInterval(function(){   
            // Place at end of array, wherever that is
            if(game.data.spawn == true){

                game.data.storedUnits++;
                var bx, by;

                var i = enemies.length;
                
                if(i % 3 == 0){
                    addY = 125;
                }else if(i % 3 == 1){
                    addY = 237.5;
                }else{
                    addY = 350;
                }

                //random percent chance enemy will attack base instead of castle 
                var r = Math.random();
                var toAttack;

                if (r < 0.7){
                    toAttack = "castle";
                } else if( r < 0.8) {
                    toAttack = "one";
                    bx = bx1;
                    by = by1;
                } else if( r < 0.9) {
                    toAttack = "two";
                    bx = bx2;
                    by = by2;
                } else {
                    toAttack = "three";
                    bx = bx3;
                    by = by3;

                }
                if(Math.floor(Math.random() * 5) + 1 > 2){

                    if(toAttack == "castle"){
                        enemies[i] = me.pool.pull("SkeletonEntity", 585, addY);
                        enemies[i].attackCastle = true;
                    } else if (toAttack == "one"){
                         enemies[i] = me.pool.pull("SkeletonEntity", 585, addY, bx, by);
                         enemies[i].goToBaseOne = true;
                }   else if (toAttack == "two"){
                         enemies[i] = me.pool.pull("SkeletonEntity", 585, addY, bx, by);
                         enemies[i].goToBaseTwo = true;
                    

                    } else {
                         enemies[i] = me.pool.pull("SkeletonEntity", 585, addY, bx, by);
                         enemies[i].goToBaseThree = true;
                    }

                }else{
                    if(toAttack == "castle"){
                        enemies[i] = me.pool.pull("SorcererEntity", 585, addY);
                        enemies[i].attackCastle = true;
                    }else if (toAttack == "one"){
                         enemies[i] = me.pool.pull("SorcererEntity", 585, addY, bx, by);
                         enemies[i].goToBaseOne = true;
                }   else if (toAttack == "two"){
                         enemies[i] = me.pool.pull("SorcererEntity", 585, addY, bx, by);
                         enemies[i].goToBaseTwo = true;


                    } else {
                         enemies[i] = me.pool.pull("SorcererEntity", 585, addY, bx, by);
                         enemies[i].goToBaseThree = true;
                    }
                }
            //   me.save.enemySpawn.push(saveEnemy);

            //  console.log(JSON.stringify(me.save.enemySpawn));
                if(bases == "enemies"){
                    enemies[i].maxHealth += 75;
                    enemies[i].curHealth += 75;
                }
                me.game.world.addChild(enemies[i]);



                //enemies[i].attackCastle = true;

                console.log(i);
            }
        }, 20000);

        //there is save data
    } else {



        var length = JSON.parse(me.save.enemySpawnLength);
        //first spot always get initiated to empty brackets
        for(var a = 0; a < me.save.enemySpawn.length; a++){
            var ex = me.save.enemySpawn[a].x;
            var ey = me.save.enemySpawn[a].y;
                        //random percent chance enemy will attack base instead of castle 
            var r = Math.random();

                var toAttack;

                if (r < 0.7){
                    toAttack = "castle";
                } else if( r < 0.8) {
                    toAttack = "one";
                    bx = bx1;
                    by = by1;
                } else if( r < 0.9) {
                    toAttack = "two";
                    bx = bx2;
                    by = by2;
                } else {
                    toAttack = "three";
                    bx = bx3;
                    by = by3;

                }

            console.log(JSON.stringify(me.save.enemySpawn[a].type));



            if(me.save.enemySpawn[a].type == "skeleton"){

                    if(toAttack == "castle"){
                        enemies[a] = me.pool.pull("SkeletonEntity", ex, ey);
                        enemies[a].attackCastle = true;
                    }else if (toAttack == "one"){
                         enemies[a] = me.pool.pull("SkeletonEntity", ex, ey, bx, by);
                         enemies[a].goToBaseOne = true;
                }   else if (toAttack == "two"){
                         enemies[a] = me.pool.pull("SkeletonEntity", ex, ey, bx, by);
                         enemies[a].goToBaseTwo = true;
                     

                    } else {
                         enemies[a] = me.pool.pull("SkeletonEntity", ex, ey, bx, by);
                         enemies[a].goToBaseThree = true;
                    }

                }else{
                    if(toAttack == "castle"){
                        enemies[a] = me.pool.pull("SorcererEntity", ex, ey);
                        enemies[a].attackCastle = true;
                    }else if (toAttack == "one"){
                         enemies[a] = me.pool.pull("SorcererEntity", ex, ey, bx, by);
                         enemies[a].goToBaseOne = true;
                }   else if (toAttack == "two"){
                         enemies[a] = me.pool.pull("SorcererEntity", ex, ey, bx, by);
                         enemies[a].goToBaseTwo = true;
                

                    } else {
                         enemies[a] = me.pool.pull("SorcererEntity", ex, ey, bx, by);
                         enemies[a].goToBaseThree = true;
                    }
                }


                enemies[a].curHealth = me.save.enemySpawn[a].curHealth;
                if(bases == "enemies"){
                    enemies[a].maxHealth = enemies[a].defaultHealth;
                    enemies[a].curHealth = enemies[a].curHealth -= 75;
                }



                 me.game.world.addChild(enemies[a]);

            
    }
            me.game.storedUnits = me.save.availableUnits;
            console.log(JSON.stringify(me.save.availableUnits));
                     console.log(me.game.storedUnits);

            for(var b = 0; b < me.save.playerSpawn.length; b++){
                var px = me.save.playerSpawn[b].x;
                var py = me.save.playerSpawn[b].y;

            if(me.save.playerSpawn[b].type == "warrior"){
                units[b] = me.pool.pull("WarriorEntity", px, py);

            } else if (me.save.playerSpawn[b].type == "wizard") {
                units[b] = me.pool.pull("WizardEntity", px, py);
            } else {
                units[b] = me.pool.pull("HealerEntity", px, py);
            }

                units[b].curHealth = me.save.playerSpawn[b].curHealth;

                if(bases == "players"){
                    units[b].maxHealth = units[b].defaultHealth;
                    units[b].curHealth = units[b].defaultHealth;
                }

                 me.game.world.addChild(units[b]);
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

        var bases = "neutral";

        // var lastPlayerBases = 0;
        // var lastEnemyBases = 0;

        this.pointerDown= me.event.subscribe("pointerdown", function (event) {
            //console.log(enemies[0].curHealth + ", " + enemies[0].maxHealth);
            //console.log("Player: " + units[0].curHealth + ", " + units[0].maxHealth);
            for(var i = 0; i < units.length; i++){
                console.log(units[i].curHealth + " " + units[i].maxHealth);
            }
            currentUnit.x = Math.round(event.gameX);
            currentUnit.y = Math.round(event.gameY);

            playerBases = 0;
            enemyBases = 0;

            if(base1.capture == "player"){
                playerBases++;
            }
            if(base1.capture == "enemy"){
                enemyBases++;
            }
            if(base2.capture == "player"){
                playerBases++;
            }
            if(base2.capture == "enemy"){
                enemyBases++;
            }
            if(base3.capture == "player"){
                playerBases++;
            }
            if(base3.capture == "enemy"){
                enemyBases++;
            }

            if(playerBases == 3){
                if(bases == "neutral"){
                    for(var z = 0; z < units.length; z++){
                        units[z].maxHealth += 75;
                        units[z].curHealth += 75;
                    }
                }
                if(bases == "enemies"){
                    for(var z = 0; z < units.length; z++){
                        units[z].maxHealth += 75;
                        units[z].curHealth += 75;
                    }
                    for(var z = 0; z < enemies.length; z++){
                        enemies[z].maxHealth -= 75;
                        if(enemies[z].curHealth > enemies[z].maxHealth){
                            enemies[z].curHealth = enemies[z].maxHealth;
                        }
                    }
                }
                bases = "players";
            }else if(enemyBases == 3){
                if(bases == "neutral"){
                    for(var z = 0; z < enemies.length; z++){
                        enemies[z].maxHealth += 75;
                        enemies[z].curHealth += 75;
                    }
                }
                if(bases == "players"){
                    for(var z = 0; z < enemies.length; z++){
                        enemies[z].maxHealth += 75;
                        enemies[z].curHealth += 75;
                    }
                    for(var z = 0; z < units.length; z++){
                        units[z].maxHealth -= 75;
                        if(units[z].curHealth > units[z].maxHealth){
                            units[z].curHealth = units[z].maxHealth;
                        }
                    }
                }
                bases = "enemies";
            }else{
                bases == "neutral";
                for(var z = 0; z < units.length; z++){
                    units[z].maxHealth = units[z].defaultHealth;
                    if(units[z].curHealth > units[z].maxHealth){
                        units[z].curHealth = units[z].maxHealth;
                    }
                }
                for(var z = 0; z < enemies.length; z++){
                    enemies[z].maxHealth = enemies[z].defaultHealth;
                    if(enemies[z].curHealth > enemies[z].maxHealth){
                        enemies[z].curHealth = enemies[z].maxHealth;
                    }
                }
            }
        });

        // Add our HUD to the game world last so that it is on top of the rest.
        // Can also be forced by specifying a "Infinity" z value to the addChild function.
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);

        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge){
            // Remove dead enemies from enemies array(again to be sure)
            for(var e = enemies.length; e--;){
                if(enemies[e].curHealth <= 0){
                    enemies.splice(e, 1);
                }
            }
            if(action == "next"){
                // Go through and eliminate dead units from the units array
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
                    if(bases == "players"){
                        units[units.length - 1].maxHealth += 75;
                        units[units.length - 1].curHealth += 75;
                    }
                    me.game.world.addChild(units[units.length - 1]);
                    game.data.storedUnits--;

                }
                if(action == "healer"){
                    units[units.length] = me.pool.pull("HealerEntity", 50, 150);
                    if(bases == "players"){
                        units[units.length - 1].maxHealth += 75;
                        units[units.length - 1].curHealth += 75;
                    }
                    me.game.world.addChild(units[units.length - 1]);
                    game.data.storedUnits--;
                }
                if(action == "warrior"){
                    units[units.length] = me.pool.pull("WarriorEntity", 50, 150);
                    if(bases == "players"){
                        units[units.length - 1].maxHealth += 75;
                        units[units.length - 1].curHealth += 75;
                    }
                    me.game.world.addChild(units[units.length - 1]);
                    game.data.storedUnits--;
                }
            }
        });



    },

    // When leaving the game screen
    onDestroyEvent: function() {
        me.event.unsubscribe(this.handle);

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
        me.input.unbindKey(me.input.KEY.P);
        me.input.unbindKey(me.input.KEY.I);
        // Unsubscribe from pointer event
        me.event.unsubscribe(this.pointerDown);
    }
});