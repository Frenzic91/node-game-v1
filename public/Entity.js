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