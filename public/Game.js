class Game {
  constructor () {
    this.players = []
  }

  handleInput (e) {
        // figure out which key was pressed
    switch (e.keyCode) {
      case (W):
        console.log('W')
        break
      case (A):
        console.log('A')
        break
      case (S):
        console.log('S')
        break
      case (D):
        console.log('D')
        break
    }
  }
}

var game = new Game()

var canvas = document.getElementById('gameCanvas')
canvas.addEventListener('keydown', game.handleInput, true)
