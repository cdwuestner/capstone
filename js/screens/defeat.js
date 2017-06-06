game.DefeatScreen = me.ScreenObject.extend({
	// When creating/entering the title screen
	onResetEvent : function(){
    	// Change to play state when Enter pressed
        me.input.bindKey(me.input.KEY.ENTER, "enter");
        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge){
        	if(action == "enter"){
            	me.state.change(me.state.PLAY);
            }
        });
		var backgroundImage = new me.Sprite(0, 0, {
			image: me.loader.getImage('defeat'),
		});
		// Position and scale image to fit viewport
		backgroundImage.anchorPoint.set(0, 0);
		backgroundImage.scale(me.game.viewport.width / backgroundImage.width, 
				me.game.viewport.height / backgroundImage.height);
		// Add image to the world container
		me.game.world.addChild(backgroundImage, Infinity);
	},
	// When leaving the title screen
	onDestroyEvent : function() {
		me.input.unbindKey(me.input.KEY.ENTER);
		me.event.unsubscribe(this.handler);
	}
});