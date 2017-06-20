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
	if(pos.y >=0 && pos.x >= 0 && pos.x < width && pos.y < height)
		document.getElementById("" + pos.y + pos.x).style.background = color;
}

function createBlock() {
	const FRACTION = 0.14286;
	var randomValue = Math.random();
	var positions = [];
	var block;
	
	if (randomValue >= 6 * FRACTION) { // line
		positions.push(new pos(0, 0));
		positions.push(new pos(1, 0)); 
		positions.push(new pos(2, 0));
		positions.push(new pos(3, 0));
		block = {
				positions,
				color: "rgb(100, 149, 237)",
				currentPos: new pos(3, 0)
				}

	} else if (randomValue >= 5 * FRACTION) { // square
		positions.push(new pos(0, 0));
		positions.push(new pos(1, 0)); 
		positions.push(new pos(0, 1));
		positions.push(new pos(1, 1));
		block = {
				positions,
				color: "rgb(0, 0, 255)",
				currentPos: new pos(4, 0)
				}
	} else if (randomValue >= 4 * FRACTION) { // S
		positions.push(new pos(0, 0));
		positions.push(new pos(1, 0)); 
		positions.push(new pos(0, 1));
		positions.push(new pos(-1, 1));
		block = {
				positions,
				color: "rgb(0, 255, 0)",
				currentPos: new pos(5, 0)
				}
	} else if (randomValue >= 3 * FRACTION) { // Z
		positions.push(new pos(0, 0));
		positions.push(new pos(1, 0)); 
		positions.push(new pos(1, 1));
		positions.push(new pos(2, 1));
		block = {
				positions,
				color: "rgb(255, 0, 0)",
				currentPos: new pos(4, 0)
				}
	} else if (randomValue >= 2 * FRACTION) { // T
		positions.push(new pos(0, 0));
		positions.push(new pos(-1, 1)); 
		positions.push(new pos(0, 1));
		positions.push(new pos(1, 1));
		block = {
				positions,
				color: "rgb(255, 165, 0)",
				currentPos: new pos(4, 0)
				}
	} else if (randomValue >= 1 * FRACTION) { // J
		positions.push(new pos(0, 0));
		positions.push(new pos(0, 1)); 
		positions.push(new pos(0, 2));
		positions.push(new pos(-1, 2));
		block = {
				positions,
				color: "rgb(255, 215, 0)",
				currentPos: new pos(5, 0)
				}
	} else if (randomValue >= 0) { // L
		positions.push(new pos(0, 0));
		positions.push(new pos(0, 1)); 
		positions.push(new pos(0, 2));
		positions.push(new pos(1, 2));
		block = {
				positions,
				color: "rgb(148, 0, 211)",
				currentPos: new pos(4, 0)
				}
	}
	for(var i = 0; i < positions.length; i++) {
		setColor(new pos(block.currentPos.x + block.positions[i].x, block.currentPos.y + block.positions[i].y), block.color);
	}
	return block;
}

function canMove(block){
	curPos = []
	nextPos = [];
	for(var i = 0; i < block.positions.length; i++){
		curPos.push(new pos(block.currentPos.x + block.positions[i].x, block.currentPos.y + block.positions[i].y));
		nextPos.push(new pos(block.currentPos.x + block.positions[i].x, block.currentPos.y + block.positions[i].y+1))
	}
	
	
	for(var i = 0; i < nextPos.length; i++) {
		if(grid[nextPos[i].x][nextPos[i].y] || nextPos[i].y == height){
			for(var j = 0; j < curPos.length; j++){
				grid[curPos[j].x][curPos[j].y] = true;
			}
			return false;
		}
	}
	
	console.log(curPos);
	console.log(nextPos);
	
	for(var i = 0; i < curPos.length; i++){
		setColor(curPos[i], "gray")		
	}
	
	for(var i = 0; i < curPos.length; i++){
		setColor(nextPos[i], block.color);
	}
	
	block.currentPos.y++;
	
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