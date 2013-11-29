(function(root) {
  var BB = root.BB = (root.BB || {});
  
  var Paddle = BB.Paddle = function() {
    var x = ( (BB.Game.WIDTH  - BB.Brick.WIDTH) / 2); // intializes it in the middle
    var y = BB.Game.HEIGHT - 30; // keeps the board floating nicely above the bottom
    this.pos = [x, y]
    this.velocity = 0; // left is negative, right is positive
  }
  
  // make sure it's a different color than the canvas
  Paddle.color = "white";
  
  Paddle.prototype.draw = function(context) {
    context.fillStyle = Paddle.color;
    context.fillRect(
      this.pos[0], 
      this.pos[1], 
      BB.Brick.WIDTH, 
      BB.Brick.HEIGHT
    );
  };
  
  Paddle.prototype.power = function(impulse) {
    this.velocity += impulse;
  }
  
  Paddle.prototype.move = function() {
    this.pos[0] += this.velocity;
    this.velocity *= (7 / 10);  // trying to mimic real deceleration
  }
  
})(this);