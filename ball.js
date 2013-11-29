(function(root) {
  var BB = root.BB = (root.BB || {});
  
  var Ball = BB.Ball = function() {
    this.pos = new BB.Paddle().pos;
    this.pos[0] += BB.Brick.WIDTH / 2; // brings it to the middle of the board
    this.pos[1] -= 10; // it floats above the board on intitialize
    this.velocity = [-1, -1];
  }
  
  Ball.RADIUS = 7;
  Ball.COLOR = "yellow";
  
  Ball.prototype.draw = function(context) {
    context.fillStyle = Ball.COLOR;
    context.beginPath(); // don't forget this line!
    
    context.arc(
      this.pos[0],
      this.pos[1],
      Ball.RADIUS,
      0,
      2 * Math.PI,
      false
    )
    
    context.fill();
  };
  
  Ball.prototype.move = function() {
    // controlls bouncing off the walls, but not the floor
    if (this.pos[0] - Ball.RADIUS <= 0) { this.velocity[0] *= -1 };
    if (this.pos[0] + Ball.RADIUS >= BB.Game.WIDTH) { this.velocity[0] *= -1 };
    this.pos[0] += this.velocity[0];
    
    if (this.pos[1] - Ball.RADIUS <= 0) { this.velocity[1] *= -1 };
    this.pos[1] += this.velocity[1];
  }
  
  
  /* THERE IS A WACKY BUG HERE
  The ball has a hard time figuring out when it hits the side of the paddle
  */
  
  // this takes either a block or a brick
  // they have the same relevant properties
  Ball.prototype.handleCollision = function(block) {
    var x = this.pos[0];
    var y = this.pos[1];
    var radius = Ball.RADIUS;
    
    // remember that [0,0] is the top left corner.
    // as always, x is horizontal and y is vertical.
        
    // the following describes the ball's edge
    // in relation to the block.
    // this is for checking collision
    var top = block.pos[1];
    var bottom = block.pos[1] + BB.Brick.HEIGHT;
    var left = block.pos[0];
    var right = block.pos[0] + BB.Brick.WIDTH;
    
    var betweenHorizontal = (x + radius >= left) && (x - radius <= right);
    var betweenVertical = (y + radius >= top) && (y - radius <= bottom);
    var collision = betweenHorizontal && betweenVertical;

    // describes the ball's center relative to the brick.
    // this is for checking the direction the ball came from
    // so that we can change the velocity accordingly.
    // notice that it is possible for the ball to be
    // neither under nor over the brick (when it is in
    // the middle) etc.
    var underBrick = y > bottom;
    var overBrick = y < top;
    // var leftOfBrick = x < left;
    // var rightOfBrick = x > right;
    
    if (collision) {
      if (underBrick || overBrick) {
        this.velocity[1] *= -1;
      } else {
        this.velocity[0] *= 1;
      }
      
      return true;
      
    } else {
      return false;
    }
  };
  
})(this)