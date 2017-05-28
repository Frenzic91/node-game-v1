var Entity = require('./Entity')

class Player extends Entity {
  constructor (ID, x, y) {
    super(x, y)

    this.ID = ID
  }

  getID () {
    return this.ID
  }

  setID (ID) {
    this.ID = ID
  }
}

module.exports = Player
