function Character(){
  this.position = new point();
  this.size = 0;
};

Character.prototype.init = function(size){
  this.size = size;
}
