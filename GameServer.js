var port = process.env.PORT || 3000

var express = require('express')
var app = express()
var server = app.listen(port, function () {
  console.log('Server is running on port ' + port + '...')
})
var io = require('socket.io').listen(server)

var Game = require('./src/Game.js')
var Player = require('./src/Player.js')
var Map = require('./src/Map.js')
var Entity = require('./src/Entity.js')
var Bullet = require('./src/Bullet.js')
var EventHandler = require('./src/EventHandler.js')

app.set('view engine', 'ejs')

app.use('/public', express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.render('index')
})

var GameInstance = new Game()
var EventHandlerInstance = new EventHandler()

EventHandlerInstance.RegisterListeners(io)

// run server game loop
