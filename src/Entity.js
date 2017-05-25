class Entity {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.width = 50 // parameterize later
    this.height = 50
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

  // axis-aligned bounding box collision detection
  collidesWith (OtherEntity) {
    if (this.x < OtherEntity.x + OtherEntity.width &&
            this.x + this.width > OtherEntity.x &&
            this.y < OtherEntity.y + OtherEntity.height &&
            this.y + this.height > OtherEntity.y) {
      // collision detected!
      return true
    }
    // no collision
    return false
  }
}

module.exports = Entity
