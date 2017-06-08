game.TitleScreen = me.ScreenObject.extend({
	// When creating/entering the title screen
	onResetEvent : function(){
        //press e to play a new game in easy mode. 
        me.input.bindKey(me.input.KEY.E, "easy");
        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge){
        	if(action == "easy"){
        		//clear all saved data
        		me.save.baseOne = {};
        		me.save.baseTwo = {}; 
        		me.save.baseThree = {};        		
				me.save.enemySpawn = [{}];
        		me.save.enemySpawnLength = {};
        		me.save.boss = {};
        		me.save.princess = {};
        		me.save.playerSpawn = [{}];

				me.save.hard = false;
				me.save.newGame = true;
            	me.state.change(me.state.PLAY);
            }
        });

        //User presses H instead of enter for hard mode
        me.input.bindKey(me.input.KEY.H, "hard");
        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge){
        	if(action == "hard"){
        		//clear all saved data
        		me.save.baseOne = {};
        		me.save.baseTwo = {}; 
        		me.save.baseThree = {};
       		
				me.save.enemySpawn = [{}];
        		me.save.enemySpawnLength = {};
        		me.save.boss = {};
        		me.save.princess = {};
				me.save.playerSpawn = [{}];

        		me.save.hard = true;
        		me.save.newGame = true;
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

				this.font.draw(renderer, "Press 'E' for easy mode, Press 'H' for hard mode", me.game.viewport.width / 2,
						me.game.viewport.height * (.55));
			},

			// Render 'Press Enter' (I am not sure if the code below does anything; since the instructiosn are  renedered above)
			drawEnter : function(renderer){
				// Choose font characteristics
				this.font = new me.Font("Arial", 24, this.color);

				this.font.draw(renderer, "Press Enter to Begin; Press 'H' for hard mode", (me.game.viewport.width / 3),
						me.game.viewport.height * (.55));
			}
		})))
	},
	// When leaving the title screen
	onDestroyEvent : function() {
		me.event.unsubscribe(this.handler);
	}
});