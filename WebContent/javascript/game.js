var grid = [];
var width = 10;
var height = 20;

init();

function init() {
	createGrid();
	dropBlock();
}

function createGrid(){
	for(var i = 0; i < height; i++) {
		var row = [];
		for(var j = 0; j < width; j++) {
			row.push(false);
		}
		grid.push(row);
	}
	console.log(grid);
}

function pos(x, y) {
	this.x = x;
	this.y = y;
}

function setColor(pos, color){
	document.getElementById("" + pos.y + pos.x).style.background = color;
}

function createBlock() {
	var position = new pos(4, 0);	
	var block = {
			position,
			color: "red"
	}
	setColor(position, block.color);
	return block;
}

function canMove(block){
	curPos = block.position;
	nextPos = new pos(curPos.x, curPos.y +1);
	
	
	
	
	if(grid[nextPos.x][nextPos.y] || nextPos.y == height){
		grid[curPos.x][curPos.y] = true;
		return false;
	}
	
	setColor(curPos, "gray")
	setColor(nextPos, "red");
	
	block.position.y++;
	
	return true;
}

function dropBlock() {
	this.block = createBlock();
	this.interval = setInterval(function() {
		if(!canMove(block)) {
			clearInterval(interval);
			dropBlock();
		}
	}, 50)
}