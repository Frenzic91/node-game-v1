let GameInstance = null

class Game {
  constructor () {
    if (!GameInstance) {
      GameInstance = this
    }

    this.Player
    this.RemotePlayers = []
    this.Bullets = []

    return GameInstance
  }

  AddPlayer (Player) {
    this.RemotePlayers.push(Player)
  }

  RemovePlayer (PlayerID) {
    var PlayerIndex = this.FindPlayerByID(PlayerID, true)
    this.RemotePlayers.splice(PlayerIndex, 1)
  }

  AddBullet(Bullet) {
    this.Bullets.push(Bullet)
  }

  RemoveBullet(BulletID) {
    // remove the bullet, typically used on collision with a player
  }

  FindPlayerByID (ID, ReturnIndex) {
    var ReturnValue

    this.RemotePlayers.forEach(function (PlayerEntry, PlayerIndex, Array) {
      if (PlayerEntry.ID === ID) {
        if (ReturnIndex) {
          ReturnValue = PlayerIndex
        } else {
          ReturnValue = PlayerEntry
        }
      }
    })

    if (ReturnValue) {
      return ReturnValue
    }
  }

  FindBulletByID (ID) {
    console.log(ID)
    var ReturnValue

    this.Bullets.forEach(function (BulletEntry, BulletIndex, Array) {
      if (BulletEntry.BulletID === ID) {
        ReturnValue = BulletEntry
      }
    })

    if (ReturnValue) {
      return ReturnValue
    }
  }

  HandleInput (e) {
    if (e.pageX || e.pageY) {
      socket.emit('shoot', {PlayerID: socket.id, MouseX: e.pageX, MouseY: e.pageY})
    }
    if (e.keyCode) {
      socket.emit('move', {PlayerID: socket.id, KeyPress: e.keyCode})
    }
  }
}
