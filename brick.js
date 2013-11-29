(function(root) {
  var BB = root.BB = (root.BB || {});
  
  var Brick = BB.Brick = function(pos, color) {
    this.pos = pos;
    this.color = color;
  };
  
  Brick.WIDTH = 80;
  Brick.HEIGHT = 20;
  
  Brick.prototype.draw = function(ctx) {
    var x = this.pos[0];
    var y = this.pos[1];
    
    ctx.fillStyle = this.color;
    ctx.fillRect(x, y, Brick.WIDTH, Brick.HEIGHT);
  };
  
})(this)