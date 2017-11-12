/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import config from '../config'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
	this.camera.flash('#000000');

  	this.game.world.setBounds(-300, -300, 600, 600)

    this.physics.arcade.gravity.y = 800

    // game.input.keyboard.addKey(Phaser.Keyboard.UP)
    // game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    // game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    // game.input.keyboard.addKey(Phaser.Keyboard.LEFT)

    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)

    let circle = new Phaser.Circle(game.world.centerX, game.world.centerY, 725) 

    let cir = Math.round(circle.circumference())

    let graphics = game.add.graphics(0, 0)
    graphics.lineStyle(1, 0x000000, 1)
    graphics.lineWidth = 150
    graphics.drawCircle(circle.x, circle.y, circle.diameter)

    // PLAYER
    // instantiate new player from Player.js
    this.player = new Player({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY + 270,
      key: 'box'
    })

    // add player to game
    this.game.add.existing(this.player)

    // enable physics on player
    this.game.physics.arcade.enable(this.player)
    this.player.body.velocity.y = 100
    // this.player.body.immovable = true

    // BLOCK
    this.block = new Phaser.Sprite(this.game, config.block.x - 280, config.block.y, 'block')
    this.block.anchor.setTo(.5)

    // add block to the game
    this.game.add.existing(this.block)

    // enable physics on block
    this.game.physics.arcade.enable(this.block)

    // additional properties for block
    this.block.body.allowGravity = false
    this.block.body.immovable = true


    // GROUND
    // create invisible ground under the player
	this.ground = new Phaser.Sprite(
    this.game, this.game.world.centerX, this.game.world.centerY + 308, 'ground'
    )

    // add ground to the game
    this.game.add.existing(this.ground)

    // enable physics on ground
    this.game.physics.arcade.enable(this.ground)

    // additional properties for ground
    this.ground.anchor.setTo(.5)
    this.ground.body.allowGravity = false
    this.ground.body.immovable = true

  }

  playerIsOnGround() {
    return this.player.body.touching.down && hitPlatform
  }

  update() {
    // update method in config file
    config.update()

    this.block.angle = config.block.rotate
    // this.block.x = -275
    // this.block.y = 0
    this.block.x = config.block.x
    this.block.y = config.block.y


    // handle player direction
    if ((game.input.keyboard.isDown(Phaser.Keyboard.LEFT))) {
        config.player.direction = -1
    }
    else if ((game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))) {
        config.player.direction = 1
    }

    // reset velocity
    this.player.velocity = 0
    
    // player ground collision
    let hitPlatform = this.game.physics.arcade.collide(this.player, this.ground)

    let hitBlock = this.game.physics.arcade.collide(this.player, this.block)

    // right, left input
    if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.player.play('run right')
      if (hitBlock && this.player.x < this.block.x) {
      	// console.log('nope')	
      } else {
      	config.player.position += 5
      }
    } 
    else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && config.press) {
      this.player.play('run left')
      if (hitBlock && this.player.x > this.block.x) {
      	// console.log('nope')
      } else {
      	config.player.position -= 5
      }
    }
    else {
      this.player.animations.stop()

      if(this.playerIsOnGround && config.player.direction == 1) {
        this.player.play('stand right')
      }
      else {
        this.player.play('stand left')
      }
    }

    // jump input
    if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && hitPlatform) {
    	this.player.body.velocity.y = -250
    }

    if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && hitBlock) {
    	this.player.body.velocity.y = -250
    }

    // determins player direction
    if (! hitPlatform) {
     if(config.player.direction == 1) {
      this.player.frame = 1
     }
     else {
      this.player.frame = 8
     }
    }

    // stops player from moving if config.window.min = 0
    if(config.window.min <= 1) {
        config.press = false
      }
    else if(config.window.min > 1) {
      config.press = true
    }

  }

  render() {
    if (__DEV__) {
      this.game.debug.text('Player.position: ' + JSON.stringify(config.player.position), 32, 32)
      this.game.debug.text('Window.min: ' + JSON.stringify(config.window.min), 32, 47)
      this.game.debug.text('Window.max: ' + JSON.stringify(config.window.max), 32, 62)

      this.game.debug.text('Block.position: ' + JSON.stringify(config.block.position), 382, 32)
      this.game.debug.text('Block.angle: ' + JSON.stringify(config.block.angle), 382, 47)
      this.game.debug.text('Block.x: ' + JSON.stringify(config.block.x), 382, 62)
      this.game.debug.text('Block.y: ' + JSON.stringify(config.block.y), 382, 77)

      this.game.debug.text('CameraX: ' + JSON.stringify(this.game.camera.x, ))
    }
  }
}
