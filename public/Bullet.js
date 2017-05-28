// should inherit from Entity as does the server code

class Bullet {
  constructor(BulletID, x, y) {
    this.BulletID = BulletID
    this.x = x
    this.y = y
  }

  getX () {
    return this.x
  }

  getY () {
    return this.y
  }

  setX (x) {
    var oldX = this.x
    this.x = x

    return oldX
  }

  setY (y) {
    var oldY = this.y
    this.y = y

    return oldY
  }
}