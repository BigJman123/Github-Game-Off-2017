import Phaser from 'phaser'

export default class {
	constructor (game) {

		this.game = game;

		this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
	}

	startGameOnButtonPress () {
		if (this.space.justPressed()){
			setTimeout(() => this.game.state.start('Game'), 1000)
			this.game.camera.fade();
		}
	}
}