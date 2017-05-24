class Player {
  constructor (ID, x, y) {
    this.ID = ID
    this.x = x
    this.y = y
  }

  getID () {
    return this.ID
  }

  getX () {
    return this.x
  }

  getY () {
    return this.y
  }

  setID (ID) {
    this.ID = ID
  }

  setX (x) {
    this.x = x
  }

  setY (y) {
    this.y = y
  }
}

module.exports = Player
