var Player = require('./Player')
var Game = require('./Game')
var Constants = require('./Constants')

class EventHandler {
  constructor () {}

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
      this.emit('move', {PlayerID: MovingPlayer.getID(), x: MovingPlayer.getX(), y: MovingPlayer.getY()})
      this.broadcast.emit('move', {PlayerID: MovingPlayer.getID(), x: MovingPlayer.getX(), y: MovingPlayer.getY()})
    }
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
    Socket.on('disconnect', this.HandlePlayerDisconnect)

    Socket.broadcast.emit('newPlayer', {PlayerID: NewPlayer.getID(), x: NewPlayer.getX(), y: NewPlayer.getY()})
    Socket.emit('getConnectedPlayers', GameInstance.GetPlayersJSON())

    GameInstance.AddPlayer(NewPlayer)
  }

  RegisterListeners (IO) {
    IO.on('connection', this.HandlePlayerConnect.bind(this))
  }
}

module.exports = EventHandler
