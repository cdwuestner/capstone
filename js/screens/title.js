game.TitleScreen = me.ScreenObject.extend({
	// When creating/entering the title screen
	onResetEvent : function(){
    	// Change to play state when Enter pressed
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge){
        	if(action == "enter"){
            	me.state.change(me.state.PLAY);
            }
        });
		// Load title screen image (https://www.liabeny.es/files/avila.jpg)
		var backgroundImage = new me.Sprite(0, 0, {
			image: me.loader.getImage('title'),
		});
		// Position and scale image to fit viewport
		backgroundImage.anchorPoint.set(0, 0);
		backgroundImage.scale(me.game.viewport.width / backgroundImage.width, 
				me.game.viewport.height / backgroundImage.height);
		// Add image to the world container
		me.game.world.addChild(backgroundImage, 1);
		// Add text to the title screen
		me.game.world.addChild(new (me.Renderable.extend({
			// Constructor
			init : function(){
				this._super(me.Renderable, "init", [0, 0, me.game.viewport.width, 
						me.game.viewport.height]);
				// Text will be white
				this.color = me.pool.pull("me.Color", 255, 255, 255);
			},
			// Render title
			draw : function(renderer){
				// Choose font characteristics
				this.font = new me.Font("Arial", 32, this.color);
				this.font.textAlign = "center"

				this.font.draw(renderer, "This Game Needs a Title", 
						me.game.viewport.width / 2, me.game.viewport.height * (.45));

				this.font = new me.Font("Arial", 24, this.color);
				this.font.textAlign = "center";

				this.font.draw(renderer, "Press Enter to Begin", me.game.viewport.width / 2,
						me.game.viewport.height * (.55));
			},
			// Render 'Press Enter'
			drawEnter : function(renderer){
				// Choose font characteristics
				this.font = new me.Font("Arial", 24, this.color);

				this.font.draw(renderer, "Press Enter to Begin", (me.game.viewport.width / 3),
						me.game.viewport.height * (.55));
			}
		})))
	},
	// When leaving the title screen
	onDestroyEvent : function() {
		me.input.unbindKey(me.input.KEY.ENTER);
		me.event.unsubscribe(this.handler);
	}
});