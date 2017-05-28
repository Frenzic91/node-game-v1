var Bullet = require('./Bullet')
//var EventHandler = require('./EventHandler')

let GameInstance = null

class Game {
  constructor () {
    if (!GameInstance) {
      GameInstance = this
    }

    this.Players = []
    this.Bullets = []

    this.BulletCount = 0

    this.TimeStart = 0
    this.TimeEnd = 0
    this.FrameTime = 0

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

  GetBulletsJSON() {
    var BulletsJSON = []

    this.Bullets.forEach(function (BulletEntry, BulletIndex, Array) {
      BulletsJSON.push({BulletID: BulletEntry.getBulletID(), x: BulletEntry.getX(), y: BulletEntry.getY()})
    })

    return BulletsJSON
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

  UpdateBullets(FrameTime) {
    this.Bullets.forEach(function (BulletElement, Index, Array) {
      BulletElement.Update(FrameTime)
    })
  }

  AddBullet(x, y, dx, dy) {
    var BulletID = (this.BulletCount += 1) % 1000
    var NewBullet = new Bullet(BulletID, x, y, dx, dy)

    this.Bullets.push(NewBullet)

    return BulletID
  }

  SendBullets() {
    var EventHandler = require('./EventHandler') // temporary solution

    var EventHandlerInstance = new EventHandler()
    EventHandlerInstance.SendBulletsUpdate(this.GetBulletsJSON())
  }

  Run () {
    // calculate time to complete 1 frame, including external OS operations
    var TimerTuple = process.hrtime()
    this.TimeEnd = TimerTuple[0] * 1e9 + TimerTuple[1]

    this.FrameTime = Math.round((this.TimeEnd - this.TimeStart) / 1e9)
    //console.log(this.FrameTime + " milliseconds")

    this.TimeStart = this.TimeEnd

    // do stuff
    this.UpdateBullets(this.FrameTime)
    this.SendBullets()
  }
}

module.exports = Game
