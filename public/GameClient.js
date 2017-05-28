var socket = io()
var GameClient = new Game()
var canvas = document.getElementById('gameCanvas')
var ctx = canvas.getContext('2d')

canvas.addEventListener('keydown', GameClient.HandleInput, true)
canvas.addEventListener('mousedown', GameClient.HandleInput, true)

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

socket.on('addBullet', function (BulletData) {
  var NewBullet = new Bullet(BulletData.BulletID, BulletData.x, BulletData.y)

  GameClient.AddBullet(NewBullet)
})

socket.on('updateBullets', function (BulletsData) {
  for (var BulletData in BulletsData) {
    var Bullet = GameClient.FindBulletByID(BulletsData[BulletData].BulletID)

    if (Bullet) {
      Bullet.setX(BulletsData[BulletData].x)
      Bullet.setY(BulletsData[BulletData].y)
    }
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
  //console.log(GameClient.Bullets)

  ctx.clearRect(0, 0, Constants.ViewWidth, Constants.ViewHeight)

  // draw self
  ctx.fillStyle = '#000000'
  ctx.fillRect(GameClient.Player.x, GameClient.Player.y, Constants.PlayerWidth, Constants.PlayerHeight)

  // draw others
  ctx.fillStyle = '#ff6dea'
  GameClient.RemotePlayers.forEach(function (PlayerElement, Index, Array) {
    ctx.fillRect(PlayerElement.x, PlayerElement.y, Constants.PlayerWidth, Constants.PlayerHeight)
  })

  // draw bullets
  GameClient.Bullets.forEach(function (BulletElement, Index, Array) {
    ctx.fillRect(BulletElement.x, BulletElement.y, 5, 5)
  })
}

// run client game loop (100 fps)
setInterval(DrawGame, 10)