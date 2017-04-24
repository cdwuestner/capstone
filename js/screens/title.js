game.TitleScreen = me.ScreenObject.extend({
	
	onResetEvent : function() {
		
		// title screen
		var backgroundImage = new me.Sprite(0, 0, {
			// src: https://www.liabeny.es/files/avila.jpg
			image: me.loader.getImage('temp_title'),
		});
		// position and scale to fit with viewport size
		backgroundImage.anchorPoint.set(0, 0);
		backgroundImage.scale(me.game.viewport.width / backgroundImage.width, 
				me.game.viewport.height / backgroundImage.height);
		// add to the world container
		me.game.world.addChild(backgroundImage, 1);
		
		// add rendered text saying 'PRESS START'
		me.game.world.addChild(new (me.Renderable.extend({
			
			// constructor
			init : function() {
				this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
				// font for text
				this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'));
/*				// tween to animate arrow
				this.scrollertween = new me.Tween(this).to({ scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
				this.scroller = "NOT BEING USED";
				this.scrollerpos = 600; */
			},
			
			/* scrollover : function() {
				this.scrollerpos = 640;
				this.scrollertween.to({scrollerpos : -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
			}, */
			
			/* update : function(dt) {
				return true;
			},*/
			
			draw : function (renderer) {
				this.font.draw(renderer, "PRESS ENTER TO PLAY", 110, me.game.viewport.height * (2/3));
			},
			
		})), 2);
		
		// change to play state on Enter
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);
		this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
			if (action == "enter") {
				me.state.change(me.state.PLAY);
			}
		});
	},
	
	onDestroyEvent : function() {
		me.input.unbindKey(me.input.KEY.ENTER);
		me.event.unsubscribe(this.handler);
	}
});