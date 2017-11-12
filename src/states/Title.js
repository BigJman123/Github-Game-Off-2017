/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Controls from '../sprites/Controls'
import config from '../config'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {

  	this.game.world.setBounds(-300, -300, 600, 600)

    this.physics.arcade.gravity.y = 800

    let circle = new Phaser.Circle(game.world.centerX, game.world.centerY, 725) 

    let cir = Math.round(circle.circumference())

    let graphics = game.add.graphics(0, 0)
    graphics.lineStyle(1, 0x000000, 1)
    graphics.lineWidth = 150
    graphics.drawCircle(circle.x, circle.y, circle.diameter)

    this.logo = new Phaser.Image(this.game, 0, 0, 'logo')
    this.logo.anchor.setTo(.5)
    this.logo.scale.setTo(0, 0)

    this.game.add.existing(this.logo)

    game.add.tween(this.logo.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Bounce.Out, true, 0, 0, false)

    this.start = new Phaser.Image(this.game, 0, 0 + 150, 'space')
    this.start.anchor.setTo(.5)
    this.start.scale.setTo(.5, .5)
    this.start.alpha = 0

    this.game.add.existing(this.start)

    setTimeout(() => game.add.tween(this.start).to({ alpha: 1 }, 750, Phaser.Easing.Linear.None, true, 0, -1, true), 1250)

    this.controls = new Controls(this.game);

  }

  update() {
    if (config.state === 'Title') {
      this.controls.startGameOnButtonPress();
    }
  }

}
