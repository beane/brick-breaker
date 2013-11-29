(function(root) {
  var BB = root.BB = (root.BB || {});
  
  var Game = BB.Game = function(context) {
    this.paddle = new BB.Paddle();
    this.ball = new BB.Ball();
    this.bricks = [];
    this.context = context;
  }
  
  // change these to your heart's delight
  // the changes should automatically
  // be reflected in the rest of the game
  Game.HEIGHT = 510;
  Game.WIDTH = 510;
  Game.COLORS = [    // i have scoured the internet for only the finest colors
                  "orangered", 
                  "pink", 
                  "mediumseagreen", 
                  "greenyellow", 
                  "goldenrod", 
                  "mediumorchid", 
                  "gold", 
                  "cyan",
                  "palevioletred",
                  "tomato"
                ]
                
  Game.prototype.setup = function(numRows) {
    var maxBricks = Math.floor(Game.WIDTH / BB.Brick.WIDTH);
    var stackHeight = BB.Brick.HEIGHT + 2
    
    // fills each row with bricks
    // does this numRows times
    // the numbers 10 and 2 are hardcoded - they provide the nicest spacing
    for (var row = 0; row < numRows; row++) {
      for (var i = 0; i < maxBricks; i++) {
        
        var color = Game.COLORS[ Math.floor(Math.random() * Game.COLORS.length) ]
        var pos = [ 10 + i * (2 + BB.Brick.WIDTH), stackHeight * row + 10 ]
        
        var brick = new BB.Brick(pos, color);
        this.bricks.push(brick);
        
      }
    }
  }
  
  Game.prototype.step = function() {
    this.handleWin();
    // advance paddle
    this.paddle.move();
    this.stopPaddle();
    
    // advance ball
    this.handlePaddleBounce();
    this.ball.move();
    
    // check for bounce
    this.handleDeath();
    
    // check for brick collisions
    this.handleBrokenBricks();
    
    this.draw();
  }
  
  Game.prototype.draw = function() {
    this.context.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
    
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, Game.WIDTH, Game.HEIGHT);
    
    // draw all the objects
    this.paddle.draw(this.context);
    
    this.ball.draw(this.context)
    
    this.bricks.forEach( function(brick) {
      brick.draw(this.context);
    });
  }
  
  Game.prototype.start = function() {
    this.bindKeyHandlers();
    var game = this;
    this.intervalId = setInterval(game.step.bind(game), 1);
  }
  
  Game.prototype.stop = function() {
    window.clearInterval(this.intervalId);
  }
  
  Game.prototype.bindKeyHandlers = function() {
    var game = this;
    key('a, left', function() { game.paddle.power(-20); });
    key('d, right', function() { game.paddle.power(20); });
    
    // this ENDS the game - should probably remove it before 'deployment'
    // i would like to implement pausing and unpausing
    key('space', game.stop.bind(game));
  }
  
  Game.prototype.handleBrokenBricks = function() {
    var bricks = this.bricks;
    var ball = this.ball;
    
    bricks.forEach( function(brick) {
      if (ball.handleCollision(brick)) {
        bricks[bricks.indexOf(brick)] = null;
      }
    });
    
    this.bricks = _.compact(bricks);
  };
  
  Game.prototype.handlePaddleBounce = function() {
    this.ball.handleCollision(this.paddle);
  };
  
  Game.prototype.handleDeath = function() {
    if (this.ball.pos[1] > Game.HEIGHT) {
      this.stop();
      alert("You dead!");
    };
  };
  
  Game.prototype.handleWin = function() {
    if (this.bricks.length === 0) {
      this.stop();
      alert("You win!");
    };
  };
  
  Game.prototype.stopPaddle = function() {
    var edge = this.paddle.pos[0];
    
    if (edge <= 0) {
      this.paddle.pos[0] = 0;
      
    } else if ( (edge + BB.Brick.WIDTH) >= Game.WIDTH ) {
      this.paddle.pos[0] = Game.WIDTH - BB.Brick.WIDTH;
    }      
  }
  
})(this);