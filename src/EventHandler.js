var Player = require('./Player')
var Game = require('./Game')
var Constants = require('./Constants')

class EventHandler {
  constructor () {

  }

  HandlePlayerMove (Data) {
    var GameInstance = new Game()  // get singleton
    var Player = GameInstance.FindPlayerByID(Data.Sock, false)

    switch (Data.Key) {
      case (Constants.W):
        Player.setY(Player.getY() - 10)
        break

      case (Constants.A):
        Player.setX(Player.getX() - 10)
        break

      case (Constants.S):
        Player.setY(Player.getY() + 10)
        break

      case (Constants.D):
        Player.setX(Player.getX() + 10)
        break
    }

    this.broadcast.emit('move', {SockID: Data.Sock, x: Player.getX(), y: Player.getY()})
  }

  HandlePlayerDisconnect () {
    console.log('a user has disconnected')

    var GameInstance = new Game() // get singleton
    GameInstance.RemovePlayer(this.id)

    this.broadcast.emit('removePlayer', {ID: this.id})
  }

  HandlePlayerConnect (Socket) {
    console.log('a user has connected')

    var GameInstance = new Game()  // get singleton
    var NewPlayer = new Player(Socket.id, 400, 300)

    Socket.on('move', this.HandlePlayerMove)
    Socket.on('disconnect', this.HandlePlayerDisconnect)

    Socket.broadcast.emit('newPlayer', {ID: Socket.id, x: 400, y: 300})
    Socket.emit('getConnectedPlayers', GameInstance.GetPlayersJSON())

    GameInstance.AddPlayer(NewPlayer)
  }

  RegisterListeners (IO) {
    IO.on('connection', this.HandlePlayerConnect.bind(this))
  }
}

module.exports = EventHandler
