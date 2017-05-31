
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
    console.log("hello");
    console.log(me.loader.getJSON("bases"));
    console.log(me.loader.getImage("bases")); 

// load the texture atlas file
game.texture = new me.video.renderer.Texture(
    me.loader.getJSON("bases"),
    me.loader.getImage("bases")
);


        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // Global black transition/background screen
		me.state.transition("fade", "#000000", 250);

        // Entities
        me.pool.register("BossEntity", game.BossEntity);
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
    }
};
