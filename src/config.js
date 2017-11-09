export default {

	player: {
		direction: 1,
		position: 432
	},

	// window: {
	// 	cir: 2278,
	// 	rad: 363,
	// 	min: 0,
	// 	max: 2278
	// },
	window: {
		cir: 1728,
		rad: 275,
		min: 0,
		max: 1728
	},

	block: {
		position: 1728,
		angle: 90,
		rotate: 90,
		x: 0,
		y: 0
	},

	gameWidth: 600,
	gameHeight: 600,
	localStorageName: 'phaseres6webpack',
	press: true,


	update() {
		this.window.min = Math.floor(this.player.position - (this.window.cir * .25));
    	this.window.max = Math.floor(this.player.position + (this.window.cir * .75));

    	this.block.angle = Math.floor((((this.block.position - this.window.min)/this.window.cir) * 360) - 180) * -1
    	this.block.rotate = this.block.angle + 270
		this.block.x = this.window.rad * Math.cos(this.block.angle * Math.PI / 180)
		this.block.y = this.window.rad * Math.sin(this.block.angle * Math.PI / 180)
	}
}
