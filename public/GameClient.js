var socket = io()
var GameClient = new Game()
var canvas = document.getElementById('gameCanvas')
var ctx = canvas.getContext('2d')

canvas.addEventListener('keydown', GameClient.HandleInput, true)


// register socket event listeners for the client
socket.on('connect', function () {
  GameClient.Player = new Player(socket.id, Constants.PlayerStartPositionX, Constants.PlayerStartPositionY)
})

socket.on('newPlayer', function (NewPlayerData) {
  var newPlayer = new Player(NewPlayerData.PlayerID, NewPlayerData.x, NewPlayerData.y)

  GameClient.AddPlayer(newPlayer)
})

socket.on('removePlayer', function (RemovedPlayerData) {
  GameClient.RemovePlayer(RemovedPlayerData.PlayerID)
})

socket.on('getConnectedPlayers', function (ConnectedPlayersData) {
  for (var PlayerData in ConnectedPlayersData) {
    var ConnectedPlayer = new Player(ConnectedPlayersData[PlayerData].PlayerID, ConnectedPlayersData[PlayerData].x,
                                     ConnectedPlayersData[PlayerData].y)
    GameClient.AddPlayer(ConnectedPlayer)
  }
})

socket.on('move', function (MoveData) {
  if (MoveData.PlayerID === GameClient.Player.ID) {
    GameClient.Player.x = MoveData.x
    GameClient.Player.y = MoveData.y

  } else {
    var MovedPlayer = GameClient.FindPlayerByID(MoveData.PlayerID, false)

    MovedPlayer.x = MoveData.x
    MovedPlayer.y = MoveData.y
  }
})

// draw the game
function DrawGame () {
  ctx.clearRect(0, 0, Constants.ViewWidth, Constants.ViewHeight)

  // draw self
  ctx.fillStyle = '#000000'
  ctx.fillRect(GameClient.Player.x, GameClient.Player.y, Constants.PlayerWidth, Constants.PlayerHeight)

  // draw others
  ctx.fillStyle = '#ff6dea'
  GameClient.remotePlayers.forEach(function (PlayerElement, Index, Array) {
    ctx.fillRect(PlayerElement.x, PlayerElement.y, Constants.PlayerWidth, Constants.PlayerHeight)
  })
}

// run client game loop (100 fps)
setInterval(DrawGame, 10)