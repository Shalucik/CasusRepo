var grid = [];
var width = 10;
var height = 20;

init();

function init() {
	createGrid();
	dropBlock();
}

function pos(x, y) {
	this.x = x;
	this.y = y;
}

function createGrid(){
	grid = [];
	for(var i = 0; i < height; i++) {
		var row = [];
		for(var j = 0; j < width; j++) {
			setColor(new pos(j,i), "gray");
			row.push(false);
		}
		grid.push(row);
	}	
}



function setColor(pos, color){	
	if(pos.y >=0 && pos.x >= 0 && pos.x < width && pos.y < height)
		document.getElementById("" + pos.y + pos.x).style.background = color;
}

function makeOrientation(pos1, pos2, pos3, pos4) {
	var orientation = [];
	orientation.push(pos1);
	orientation.push(pos2);
	orientation.push(pos3);
	orientation.push(pos4);
	return orientation;
}

function createBlock() {
	const FRACTION = 0.14286;
	var randomValue = Math.random();
	var orientations = [];
	var positions = [];
	var block;
	
	if (randomValue >= 6 * FRACTION) { // line
		orientations.push(makeOrientation(new pos(0, 0), new pos(1, 0), new pos(2, 0), new pos(3, 0)));
		orientations.push(makeOrientation(new pos(1, 0), new pos(1, 1), new pos(1, 2), new pos(1, 3)));
		block = {
				orientations,
				orientation: Math.floor(Math.random() * orientations.length),
				color: "rgb(100, 149, 237)",
				currentPos: new pos(3, 0)
				}

	} else if (randomValue >= 5 * FRACTION) { // square
		orientations.push(makeOrientation(new pos(0, 0), new pos(1, 0), new pos(0, 1), new pos(1, 1)));
		block = {
				orientations,
				orientation: Math.floor(Math.random() * orientations.length),
				color: "rgb(0, 0, 255)",
				currentPos: new pos(4, 0)
				}
	} else if (randomValue >= 4 * FRACTION) { // S
		orientations.push(makeOrientation(new pos(0, 0), new pos(1, 0), new pos(0, 1), new pos(-1, 1)));
		orientations.push(makeOrientation(new pos(-1, 0), new pos(-1, -1), new pos(0, 0), new pos(0, 1)));
		block = {
				orientations,
				orientation: Math.floor(Math.random() * orientations.length),
				color: "rgb(0, 255, 0)",
				currentPos: new pos(5, 0)
				}
	} else if (randomValue >= 3 * FRACTION) { // Z
		orientations.push(makeOrientation(new pos(-1, 0), new pos(0, 0), new pos(0, 1), new pos(1, 1)));
		orientations.push(makeOrientation(new pos(1, 0), new pos(1, 1), new pos(0, 1), new pos(0, 2)));
		block = {
				orientations,
				orientation: Math.floor(Math.random() * orientations.length),
				color: "rgb(255, 0, 0)",
				currentPos: new pos(4, 0)
				}
	} else if (randomValue >= 2 * FRACTION) { // T
		orientations.push(makeOrientation(new pos(0, -1), new pos(-1, 0), new pos(0, 0), new pos(1, 0)));
		orientations.push(makeOrientation(new pos(0, -1), new pos(0, 0), new pos(1, 0), new pos(0, 1)));
		orientations.push(makeOrientation(new pos(-1, 0), new pos(0, 0), new pos(1, 0), new pos(0, 1)));
		orientations.push(makeOrientation(new pos(0, -1), new pos(0, 0), new pos(-1, 0), new pos(0, 1)));
		block = {
				orientations,
				orientation: Math.floor(Math.random() * orientations.length),
				color: "rgb(255, 165, 0)",
				currentPos: new pos(4, 1)
				}
	} else if (randomValue >= 1 * FRACTION) { // J
		orientations.push(makeOrientation(new pos(0, 0), new pos(0, -1), new pos(0, 1), new pos(-1, 1)));
		orientations.push(makeOrientation(new pos(1, 0), new pos(0, 0), new pos(-1, 0), new pos(-1, -1)));
		orientations.push(makeOrientation(new pos(-1, 0), new pos(-1, -1), new pos(0, -1), new pos(-1, 1)));
		orientations.push(makeOrientation(new pos(-1, 0), new pos(0, 0), new pos(1, 0), new pos(1, 1)));
		block = {
				orientations,
				orientation: Math.floor(Math.random() * orientations.length),
				color: "rgb(255, 215, 0)",
				currentPos: new pos(5, 1)
				}
	} else if (randomValue >= 0) { // L
		orientations.push(makeOrientation(new pos(0, 0), new pos(0, -1), new pos(0, 1), new pos(1, 1)));
		orientations.push(makeOrientation(new pos(1, 0), new pos(0, 0), new pos(-1, 0), new pos(-1, 1)));
		orientations.push(makeOrientation(new pos(-1, -1), new pos(0, -1), new pos(0, 0), new pos(0, 1)));
		orientations.push(makeOrientation(new pos(-1, 0), new pos(0, 0), new pos(1, 0), new pos(1, -1)));
		block = {
				orientations,
				orientation: Math.floor(Math.random() * orientations.length),
				color: "rgb(148, 0, 211)",
				currentPos: new pos(4, 1)
				}
	}
	
	for(var i = 0; i < block.orientations[block.orientation].length; i++) {
		var position = new pos(block.currentPos.x + block.orientations[block.orientation][i].x, block.currentPos.y + block.orientations[block.orientation][i].y);
		if(grid[position.x][position.y]) {
			return null;
		}
		setColor(position, block.color);
	}
	return block;
}

function canMove(block){
	curPos = []
	nextPos = [];
	for(var i = 0; i < block.orientations[block.orientation].length; i++){
		curPos.push(new pos(block.currentPos.x + block.orientations[block.orientation][i].x, block.currentPos.y + block.orientations[block.orientation][i].y));
		nextPos.push(new pos(block.currentPos.x + block.orientations[block.orientation][i].x, block.currentPos.y + block.orientations[block.orientation][i].y+1));
	}
	
	
	for(var i = 0; i < nextPos.length; i++) {
		if(grid[nextPos[i].x][nextPos[i].y] || nextPos[i].y == height){
			for(var j = 0; j < curPos.length; j++){
				grid[curPos[j].x][curPos[j].y] = true;
			}
			return false;
		}
	}
	
	for(var i = 0; i < curPos.length; i++){
		setColor(curPos[i], "gray");		
	}
	
	for(var i = 0; i < curPos.length; i++){
		setColor(nextPos[i], block.color);
	}
	
	block.currentPos.y++;
	
	return true;
}

// Movement
document.onkeydown = function(e) {
	if (e.keyCode == 37) {
		move_left = true;
		move_right = false;
	} else if (e.keyCode == 39) {
		move_right = true;
		move_left = false;
	} else if (e.keyCode == 38) {
		rotate_right = true;
	}
}
const SPEED = 15;
var frame = 0;
var move_left = false;
var move_right = false;
var rotate_left = false;
var rotate_right = false;
function dropBlock() {
	this.block = createBlock();
	
	if(block != null){ 
		this.interval = setInterval(function() {
			if (move_left) moveBlock(false);
			else if (move_right) moveBlock(true);
			
			if (rotate_right) rotateBlock(true);
			else if (rotate_left) rotateBlock(false);
			
			
			if (frame < SPEED) {
				frame++;
				return;
			} else {
				frame = 0;
			}
			
			if(!canMove(block)) {
				clearInterval(interval);
				dropBlock();
			}
		}, 1);	
	} else {
		init();
	}
}

function moveBlock() {
	
}

function rotateBlock() {
	
}

