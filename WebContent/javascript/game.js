const EMPTYCOLOR = "rgb(169, 169, 169)";
function pos(x,y) {
	this.x = x;
	this.y = y;
}

function getBlock(){
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
				currentPos: new pos(4, 0)
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
				currentPos: new pos(4, 0)
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
				currentPos: new pos(4, 0)
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
	return block;
}

function canMove (block, direction) {
	var canMove = true;
	var currentPositions = [];
	var nextPositions = [];
	
	for (i = 0; i < block.positions.length; i++) {
		console.log("pos: " + (block.currentPos.x + block.positions[i].x) + (block.currentPos.y + block.positions[i].y));
		currentPositions.push(document.getElementById("" + (block.currentPos.x + block.positions[i].x) + (block.currentPos.y + block.positions[i].y)));
		nextPositions.push(document.getElementById("" + (block.currentPos.x + block.positions[i].x) + (block.currentPos.y + block.positions[i].y + 1)));
		console.log("nextpos: " + (block.currentPos.x + block.positions[i].x)	 + (block.currentPos.y + block.positions[i].y + 1));
		if (!nextPositions[i].style.background === EMPTYCOLOR) {
			canMove = false;
		}
	}
	
	if (canMove) {
		for (i = 0; i < block.positions.length; i++) {
			currentPositions[i].style.background = EMPTYCOLOR;
			block.positions[i].y++;
		}
		
		for (i = 0; i < block.positions.length; i++) {
			nextPositions[i].style.background = block.color;
		}
		
		return true;
	} else {
		console.log("Can't drop");
		return false;
	}
}

var newBlock = getBlock();
var interval1 = setInterval(function() {
	if(canMove( newBlock )) {
		console.log("can move");
	}
}, 50)



//var x = 0;
//var y = 0;
//
//fall();
//setInterval(fall, 1000);
//
//
//function fall(){	
//	console.log(getBlock());
//	
//	var obj = document.getElementById("" + x + y);
//	obj.style.backgroundColor = 'rgb(255, 0, 0)';
//	console.log(obj.style.backgroundColor)
//	obj = document.getElementById("" + ++x + y);
//	obj.style.background = 'red';
//	if(x == 19) {		
//		x = 0;
//		y = 0;
//		obj.style.background = 'grey';	
//	}
//}

