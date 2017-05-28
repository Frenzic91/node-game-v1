var Player = require('./Player')
var Game = require('./Game')
var Constants = require('./Constants')

let EventHandlerInstance = null

class EventHandler {
  constructor (IO) {
    if (! EventHandlerInstance) {
      this.IO = IO
      EventHandlerInstance = this
    }

    return EventHandlerInstance
  }

  HandlePlayerMove (MoveData) {
    var GameInstance = new Game()  // get singleton
    var MovingPlayer = GameInstance.FindPlayerByID(MoveData.PlayerID, false)

    // used to revert changes to player position in case of a collision
    var moveAxis, oldValue

    switch (MoveData.KeyPress) {
      case (Constants.W):
        oldValue = MovingPlayer.setY(MovingPlayer.getY() - Constants.MoveDistanceInPixels)
        moveAxis = 'y'
        break

      case (Constants.A):
        oldValue = MovingPlayer.setX(MovingPlayer.getX() - Constants.MoveDistanceInPixels)
        moveAxis = 'x'
        break

      case (Constants.S):
        oldValue = MovingPlayer.setY(MovingPlayer.getY() + Constants.MoveDistanceInPixels)
        moveAxis = 'y'
        break

      case (Constants.D):
        oldValue = MovingPlayer.setX(MovingPlayer.getX() + Constants.MoveDistanceInPixels)
        moveAxis = 'x'
        break
    }

    if (GameInstance.detectCollisionWith(MovingPlayer)) {
      // revert position change
      if (moveAxis === 'x') {
        MovingPlayer.setX(oldValue)
      } else {
        MovingPlayer.setY(oldValue)
      }
    } else {
      // no collision, player moved successfully
      //console.log(this)
      this.emit('move', {PlayerID: MovingPlayer.getID(), x: MovingPlayer.getX(), y: MovingPlayer.getY()})
      this.broadcast.emit('move', {PlayerID: MovingPlayer.getID(), x: MovingPlayer.getX(), y: MovingPlayer.getY()})
    }
  }

  HandlePlayerShoot (ShootData) {
    var GameInstance = new Game()

    // get the player that shot (for their position)
    var ShootingPlayer = GameInstance.FindPlayerByID(ShootData.PlayerID, false)

    // calculate the moveVector for the bullet
    var tx = ShootData.MouseX - ShootingPlayer.x
    var ty = ShootData.MouseY - ShootingPlayer.y
    //console.log('tx: ' + tx)
    //console.log('ty: ' + ty)

    var THypotenuse = Math.sqrt(tx * tx + ty * ty)

    var dx = (tx / THypotenuse)
    var dy = (ty / THypotenuse)

    var BulletID = GameInstance.AddBullet(ShootingPlayer.getX(), ShootingPlayer.getY(), dx, dy)

    this.IO.emit('addBullet', {BulletID: BulletID, x: ShootingPlayer.getX(), y: ShootingPlayer.getY()})
  }

  HandlePlayerDisconnect () {
    console.log('a user has disconnected')

    var GameInstance = new Game() // get singleton
    GameInstance.RemovePlayer(this.id)

    this.broadcast.emit('removePlayer', {PlayerID: this.id})
  }

  HandlePlayerConnect (Socket) {
    console.log('a user has connected')

    var GameInstance = new Game()  // get singleton
    var NewPlayer = new Player(Socket.id, Constants.PlayerStartPositionX, Constants.PlayerStartPositionY)

    Socket.on('move', this.HandlePlayerMove)
    Socket.on('shoot', this.HandlePlayerShoot.bind(this))
    Socket.on('disconnect', this.HandlePlayerDisconnect)

    Socket.broadcast.emit('newPlayer', {PlayerID: NewPlayer.getID(), x: NewPlayer.getX(), y: NewPlayer.getY()})
    Socket.emit('getConnectedPlayers', GameInstance.GetPlayersJSON())

    GameInstance.AddPlayer(NewPlayer)
  }

  SendBulletsUpdate(BulletsJSON) {
    //console.log('sending bullet update to clients')
    this.IO.emit('updateBullets', BulletsJSON)
  }

  RegisterListeners () {
    this.IO.on('connection', this.HandlePlayerConnect.bind(this))
  }
}

module.exports = EventHandler
