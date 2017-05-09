
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
    },

    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
     
          // register our player entity in the object pool
            me.pool.register("warrior", game.PlayerEntity);

    // enable the keyboard


        // Global black transition/background screen
		me.state.transition("fade", "#000000", 250);
        me.pool.register("HealerEntity", game.HealerEntity);

        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP,  "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");

        
        // add entities here
        me.pool.register("SkeletonEntity", game.SkeletonEntity);
        me.pool.register("WizardEntity",  game.WizardEntity);
        me.pool.register("WizzardPlayerEntity", game.WizardPlayerEntity)
         me.pool.register("WarriorEntity", game.WarriorEntity)

        // Display game menu
        me.state.change(me.state.MENU);
           me.state.change(me.state.PLAY);

        me.sys.gravity = 0;
    }
};
