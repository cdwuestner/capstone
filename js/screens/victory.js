game.VictoryScreen = me.ScreenObject.extend({
	// When creating/entering the title screen
	onResetEvent : function(){
		var backgroundImage = new me.Sprite(0, 0, {
			image: me.loader.getImage('victory'),
		});
		// Position and scale image to fit viewport
		backgroundImage.anchorPoint.set(0, 0);
		backgroundImage.scale(me.game.viewport.width / backgroundImage.width, 
				me.game.viewport.height / backgroundImage.height);
		// Add image to the world container
		me.game.world.addChild(backgroundImage, Infinity);
	},
	// When leaving the title screen
	onDestroyEvent : function() {   }
});