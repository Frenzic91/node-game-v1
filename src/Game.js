class Game {
  constructor () {
    this.players = []
  }

  registerEventListeners (io) {
    io.on('connection', function (socket) {
        console.log('a user has connected')
        socket.on('disconnect', function () {
            console.log('a user has disconnected')
        })
    })
  }
}

module.exports = Game
