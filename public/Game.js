var socket = io()

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

    this.remotePlayers.forEach(function (Player, PlayerIndex, Array) {
      if (Player.ID === ID) {
        if (ReturnIndex) {
          ReturnValue = PlayerIndex
        } else {
          ReturnValue = Player
        }
      }
    })

    return ReturnValue
  }

  HandleInput (e) {
          // figure out which key was pressed
    switch (e.keyCode) {
      case (Constants.W):
        game.Player.y -= 10
        socket.emit('move', {Sock: socket.id, Key: e.keyCode})
        break
      case (Constants.A):
        game.Player.x -= 10
        socket.emit('move', {Sock: socket.id, Key: e.keyCode})
        break
      case (Constants.S):
        game.Player.y += 10
        socket.emit('move', {Sock: socket.id, Key: e.keyCode})
        break
      case (Constants.D):
        game.Player.x += 10
        socket.emit('move', {Sock: socket.id, Key: e.keyCode})
        break
    }
  }
}

var game = new Game()

var canvas = document.getElementById('gameCanvas')
canvas.addEventListener('keydown', game.HandleInput, true)
var ctx = canvas.getContext('2d')

// what client should do upon connecting
socket.on('connect', function () {
  game.Player = new Player(socket.id, 400, 300)
})

socket.on('newPlayer', function (Data) {
  var newPlayer = new Player(Data.ID, Data.x, Data.y)

  game.AddPlayer(newPlayer)
})

socket.on('removePlayer', function (Data) {
  game.RemovePlayer(Data.ID)
})

socket.on('getConnectedPlayers', function (Data) {
  for (var key in Data) {
    var connectedPlayer = new Player(Data[key].ID, Data[key].x, Data[key].y)
    game.AddPlayer(connectedPlayer)
  }
})

// how client should respond to other players moving
socket.on('move', function (Data) {
  var movedPlayer = game.FindPlayerByID(Data.SockID, false)

  movedPlayer.x = Data.x
  movedPlayer.y = Data.y
})

function draw () {
  ctx.clearRect(0, 0, 800, 600)

  // draw self
  ctx.fillStyle = '#000000'
  ctx.fillRect(game.Player.x, game.Player.y, 20, 20)

  // draw others
  ctx.fillStyle = '#ff6dea'
  game.remotePlayers.forEach(function (PlayerElement, Index, Array) {
    ctx.fillRect(PlayerElement.x, PlayerElement.y, 20, 20)
  })
}

// run client game loop
setInterval(draw, 10)
