
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score : 0
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(640, 480, {wrapper : "screen", scale : "auto"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
		
		// add "#debug" to the URL to enable the debug Panel
		if (me.game.HASH.debug === true) {
			window.onReady(function () {
				me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
			});
		}
		
		// Set a callback to run when loading is complete
		me.loader.onload = this.loaded.bind(this);

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources);
		
		/* // initialize melonJS, set and display loading screen
		me.state.set(me.state.LOADING, new game.LoadingScreen());
		me.state.change(me.state.LOADING); */
		
		// set gravity to 0
		me.sys.gravity = 0;
    },

    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
		
		// global transition between screens (adjust later?)
		me.state.transition("fade", "#FFFFFF", 250);

        // add our player entity in the entity pool
        me.pool.register("mainPlayer", game.PlayerEntity);
		me.pool.register("SkeletonWarriorEntity", game.SkeletonWarriorEntity);
		me.pool.register("SpiritEntity", game.SpiritEntity);
		
        // Start the game.
		me.state.change(me.state.MENU);
    }
};