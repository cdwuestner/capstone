game.LoadingScreen = me.ScreenObject.extend({
	
	onResetEvent : function() {
		
		// loading screen
		var loadingImage = new me.Sprite(0, 0, {
			image: me.loader.getImage('temp_loader'),
		});
		// position and scale to fit with viewport size
		loadingImage.anchorPoint.set(0, 0);
		loadingImage.scale(me.game.viewport.width / loadingImage.width, 
				me.game.viewport.height / loadingImage.height);
		// add to the world container
		me.game.world.addChild(loadingImage, 1);
	},
	
	onDestroyEvent : function() {
		;
	}
});