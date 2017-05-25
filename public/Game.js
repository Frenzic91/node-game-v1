let GameInstance = null

class Game {
  constructor () {
    if (!GameInstance) {
      GameInstance = this
    }

    this.Player
    this.remotePlayers = []

    return GameInstance
  }

  AddPlayer (Player) {
    this.remotePlayers.push(Player)
  }

  RemovePlayer (PlayerID) {
    var PlayerIndex = this.FindPlayerByID(PlayerID, true)
    console.log('PlayerIndex: ' + PlayerIndex)

    this.remotePlayers.splice(PlayerIndex, 1)
  }

  FindPlayerByID (ID, ReturnIndex) {
    var ReturnValue

    this.remotePlayers.forEach(function (PlayerEntry, PlayerIndex, Array) {
      if (PlayerEntry.ID === ID) {
        if (ReturnIndex) {
          ReturnValue = PlayerIndex
        } else {
          ReturnValue = PlayerEntry
        }
      }
    })

    return ReturnValue
  }

  HandleInput (e) {
          // figure out which key was pressed
    switch (e.keyCode) {
      case (Constants.W):
        //game.Player.y -= 10
        socket.emit('move', {PlayerID: socket.id, KeyPress: e.keyCode})
        break
      case (Constants.A):
        //game.Player.x -= 10
        socket.emit('move', {PlayerID: socket.id, KeyPress: e.keyCode})
        break
      case (Constants.S):
        //game.Player.y += 10
        socket.emit('move', {PlayerID: socket.id, KeyPress: e.keyCode})
        break
      case (Constants.D):
        socket.emit('move', {PlayerID: socket.id, KeyPress: e.keyCode})
        break
    }
  }
}
