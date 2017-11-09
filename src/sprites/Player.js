import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, key, frame }) {
    super(game, x, y, key, frame)
    this.anchor.setTo(0.5)
    this.scale.setTo(.4, .4)


    this.animations.add('stand right', [0])
    this.animations.add('stand left', [7])
    this.animations.add('run right', [1, 2, 3, 4, 5, 6], 12, true)
    this.animations.add('run left', [8, 9, 12, 11, 12, 13], 12, true)
    this.animations.add('jump right', [1], 12, true)
    this.animations.add('jump left', [8], 12, true)

  }

  update () {
    // this.angle += 1
    // if((game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))) {
  		// this.runRight()
  	// }
  }
}
