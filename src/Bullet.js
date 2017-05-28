var Entity = require('./Entity')

class Bullet extends Entity {
  constructor (BulletID, x, y, dx, dy) {
    super(x, y)

    this.BulletID = BulletID
    this.dx = dx
    this.dy = dy
  }

  getBulletID() {
    return this.BulletID
  }

  Update (FrameTime) {
    this.x += this.dx
    this.y += this.dy

    //console.log('Bullet ' + '(X: ' + this.x + ' Y: ' + this.y + ')')

    // check for collisions with players and respond accordingly
  }
}

module.exports = Bullet