var Pokeball = function(scale, color) {
	this.canvas = document.createElement("canvas");
	this.canvas.width = 2*20*scale;
	this.canvas.height = 2*20*scale;

	var ctx = this.canvas.getContext("2d");
	ctx.translate(this.canvas.width/2, this.canvas.height/2);

	// Top
	ctx.fillStyle = color;
	ctx.beginPath();
	var angleOffset = Math.asin(3/20);
	ctx.arc(0, 0, 20*scale, -Math.PI+angleOffset, -angleOffset);
	angleOffset = Math.asin(3/7);
	ctx.arc(0, 0, 7*scale, -angleOffset, -Math.PI+angleOffset, 1);
	ctx.closePath();
	ctx.fill();

	// Center
	ctx.beginPath();
	ctx.arc(0, 0, 4*scale, 0, 2*Math.PI);
	ctx.fill();

	// Bottom
	ctx.strokeStyle = color;
	ctx.lineWidth = 2*scale;
	ctx.beginPath();
	angleOffset = Math.asin(2/20);
	ctx.arc(0, 0, 19*scale, angleOffset, Math.PI-angleOffset);
	angleOffset = Math.asin(2/8);
	ctx.arc(0, 0, 8*scale, Math.PI-angleOffset, angleOffset, 1);
	ctx.closePath();
	ctx.stroke();
}
