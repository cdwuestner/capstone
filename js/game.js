
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        
    },

    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(960, 640, {wrapper : "screen", scale : "auto"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
		
		// add "#debug" to the URL to enable the debug Panel
		if (me.game.HASH.debug === true) {
			window.onReady(function () {
				me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
			});
		}

        // Initialize the audio.
        //me.audio.init("mp3,ogg");

        // Set a callback to run when loading is completed
        me.loader.onload = this.loaded.bind(this);

        // set and load game resources.
        me.loader.preload(game.resources);

        me.sys.gravity = 0;
    },

// Run on game resources loaded.
"loaded" : function () {
      //    console.log(me.loader.getJSON("bases"));
      //   console.log(me.loader.getImage("bases")); 

// load the texture atlas file for bases
game.texture = new me.video.renderer.Texture(
    me.loader.getJSON("bases"),
    me.loader.getImage("bases")
);




        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.set(me.state.READY, new game.PauseScreen());
        me.state.set(me.state.GAME_END, new game.VictoryScreen());
        me.state.set(me.state.GAMEOVER, new game.DefeatScreen());

        // Global black transition/background screen
		me.state.transition("fade", "#000000", 250);


        // Entities
        me.pool.register("BossEntity", game.BossEntity);
        me.pool.register("PrincessEntity", game.PrincessEntity);
        me.pool.register("HealerEntity", game.HealerEntity);
        me.pool.register("SkeletonEntity", game.SkeletonEntity);
        me.pool.register("SorcererEntity",  game.SorcererEntity);
        me.pool.register("WizardEntity", game.WizardEntity);
        me.pool.register("WarriorEntity", game.WarriorEntity);

       me.pool.register("BaseSprite", game.BaseSprite);
       // Magic
       me.pool.register("MagicLeft", game.MagicLeft);
       me.pool.register("MagicRight", game.MagicRight);
       me.pool.register("MagicUp", game.MagicUp);
       me.pool.register("MagicDown", game.MagicDown);
       // Healing
       me.pool.register("HealingLeft", game.HealingLeft);
       me.pool.register("HealingRight", game.HealingRight);
       me.pool.register("HealingUp", game.HealingUp);
       me.pool.register("HealingDown", game.HealingDown);

        // Display game menu
        me.state.change(me.state.MENU);

        //pause control
      //  me.state.change(me.state.READY);


        //for easy or hard mode
        me.save.add({ hard: {} }); 

        //new game or not
        me.save.add({ newGame: {} }); 

        //add objects to be saved.
        me.save.add({ baseOne : {} });
        me.save.add({ baseTwo : {} });
        me.save.add({ baseThree : {} });

        me.save.add({ enemySpawn: {} });        
        me.save.enemySpawn = [{}];

        me.save.add({ playerSpawn: {} });        
        me.save.playerSpawn = [{}];

        
        me.save.add({boss: {} });
        me.save.add( {princess : {} });
        
        me.save.add( { availableUnits: {} });




  





    }
};
