let GameInstance = null

class Game {
  constructor () {
    if (!GameInstance) {
      GameInstance = this
    }

    this.Players = []

    return GameInstance
  }

  AddPlayer (Player) {
    this.Players.push(Player)
  }

  RemovePlayer (PlayerID) {
    var PlayerIndex = this.FindPlayerByID(PlayerID, true)

    this.Players.splice(PlayerIndex, 1)
  }

  FindPlayerByID (ID, ReturnIndex) {
    var ReturnValue

    this.Players.forEach(function (Player, PlayerIndex, Array) {
      if (Player.getID() === ID) {
        if (ReturnIndex) {
          ReturnValue = PlayerIndex
        } else {
          ReturnValue = Player
        }
      }
    })

    return ReturnValue
  }

  GetPlayersJSON () {
    var PlayersJSON = []

    this.Players.forEach(function (PlayerElement, Index, Array) {
      PlayersJSON.push({ID: PlayerElement.getID(), x: PlayerElement.getX(), y: PlayerElement.getY()})
    })

    return PlayersJSON
  }

  detectCollisionWith (Player) {
    var collisionDetected = false

    this.Players.forEach(function (PlayerElement, Index, Array) {
      if (Player.ID !== PlayerElement.ID &&
          Player.collidesWith(PlayerElement)) {
        collisionDetected = true
      }
    })

    return collisionDetected
  }
}

module.exports = Game
