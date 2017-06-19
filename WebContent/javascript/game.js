function createBlock(){
	var obj = document.getElementById("00");
	obj.style.background = 'red';
}

var x = 0;
var y = 0;

createBlock();
fall();
setInterval(fall, 25);


function fall(){	
	var obj = document.getElementById("" + x + y);	
	obj.style.background = 'grey';
	obj = document.getElementById("" + ++x + y);
	obj.style.background = 'red';
	if(x == 19) {		
		x = 0;
		y = 0;
		obj.style.background = 'grey';
		createBlock();		
	}
}

