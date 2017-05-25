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

    this.Players.forEach(function (PlayerEntry, PlayerIndex, Array) {
      if (PlayerEntry.getID() === ID) {
        if (ReturnIndex) {
          ReturnValue = PlayerIndex
        } else {
          ReturnValue = PlayerEntry
        }
      }
    })

    return ReturnValue
  }

  GetPlayersJSON () {
    var PlayersJSON = []

    this.Players.forEach(function (PlayerEntry, PlayerIndex, Array) {
      PlayersJSON.push({PlayerID: PlayerEntry.getID(), x: PlayerEntry.getX(), y: PlayerEntry.getY()})
    })

    return PlayersJSON
  }

  detectCollisionWith (Player) {
    var collisionDetected = false

    this.Players.forEach(function (PlayerEntry, PlayerIndex, Array) {
      if (Player.ID !== PlayerEntry.ID &&
          Player.collidesWith(PlayerEntry)) {
        collisionDetected = true
      }
    })

    return collisionDetected
  }
}

module.exports = Game
