import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.spritesheet('box', 'assets/images/box.png', 85, 95)
    this.load.image('ground', 'assets/images/ground.png', 160, 40)
    this.load.image('ground2', 'assets/images/ground2.png', 160, 40)
    this.load.image('block', 'assets/images/block.png', 15, 25)
    this.load.image('logo', 'assets/images/circuitlogo.png', 390, 80)
    this.load.image('space', 'assets/images/space.png', 385, 60)
  }

  create () {
    this.state.start('Title')
  }
}
