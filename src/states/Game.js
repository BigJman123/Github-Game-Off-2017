/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    let circle = new Phaser.Circle(game.world.centerX, game.world.centerY, 725);

    var graphics = game.add.graphics(0, 0);
    graphics.lineStyle(1, 0x000000, 1);
    graphics.lineWidth = 150;
    graphics.drawCircle(circle.x, circle.y, circle.diameter);
  }

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
