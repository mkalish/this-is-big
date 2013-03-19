var speedToStart = 1000;
var xLocation = 800;
var yLocation = 500;
var currentColor = 'red';
var gearId = 0;
var canvas;
var circleRadius = 350;
var all_gears= [];
var currentAudioId=1;
var animations = [Raphael.animation({transform: 't0,100'}, 1000),
		 Raphael.animation({transform: 't0,-100'}, 1000),
		 Raphael.animation({transform: 't100,0'}, 1000),
		 Raphael.animation({transform: 't-100,0'}, 1000),
		 Raphael.animation({transform: 't-100,100'}, 1000),
		 Raphael.animation({transform: 't100,100'}, 1000),
		 Raphael.animation({transform: 't-100,-100'}, 1000),
		 Raphael.animation({transform: 't100,-100'}, 1000)
		]
var directions = ['north', 'south', 'west', 'east', 'northwest', 'northeast', 'southwest', 'southeast'];
var currentPositions = [];




function createNewGear(UISet) {
	var self = this;
	self.ui = UISet;
	self.id = gearId;
	self.speed = speedToStart;
	self.xPos = 0;
	self.yPos = 0;
	self.currentDirection = 'No direction';
	
	self.increaseSize = increaseSize;
	function increaseSize() {
		self.ui.animate({r:25}, self.speed, self.decreaseSize);
		//makeMove();
	}
	
	
	self.decreaseSize = decreaseSize;
	function decreaseSize() {
		self.ui.animate({r:15}, self.speed, self.increaseSize);
		//makeMove();
	}
	
	
	self.startPulse = startPulse;
	function startPulse() {
		self.increaseSize();	
	}
	
	self.increaseSpeed = increaseSpeed;
	function increaseSpeed() {
		self.speed = this.speed - 100;
		self.ui.stop();
		self.startPulse();
	}
	
	self.makeMove = makeMove;
	function makeMove() {
		if (self.currentDirection == 'No direction') {
			self.currentDirection = Math.floor(Math.random() * directions.length);
		}
		var x2 = self.xPos*self.xPos;
		var y2 = self.yPos*self.yPos;
		var radius2 = circleRadius*circleRadius;
		if (x2+y2 > radius2) {
			switch (self.currentDirection) {
			case 0:
				var possible = [1,6,7];
				self.currentDirection = possible[Math.floor(Math.random()*possible.length)];
				break;
			case 1:
				var possible = [0,4,5];
				self.currentDirection = possible[Math.floor(Math.random()*possible.length)];
				break;
			case 2:
				var possible = [3,5,7];
				self.currentDirection = possible[Math.floor(Math.random()*possible.length)];
				break;
			case 3:
				var possible = [2,4,6];
				self.currentDirection = possible[Math.floor(Math.random()*possible.length)];
				break;
			case 4:
				var possible = [1,3,7];
				self.currentDirection = possible[Math.floor(Math.random()*possible.length)];
				break;
			case 5:
				var possible = [1,2,6];
				self.currentDirection = possible[Math.floor(Math.random()*possible.length)];
				break;
			case 6:
				var possible = [1,3,4];
				self.currentDirection = possible[Math.floor(Math.random()*possible.length)];
				break;
			case 7:
				var possible = [0,1,4];
				self.currentDirection = possible[Math.floor(Math.random()*possible.length)];
				break;
			}
		}
		switch (self.currentDirection) {
			case 0:
				self.yPos += 5;
				break;
			case 1:
				self.yPos += -5;
				break;
			case 2:
				self.xPos += -5;
				break;
			case 3:
				self.xPos += 5;
				break;
			case 4:
				self.xPos += -5;
				self.yPos += 5;
				break;
			case 5:
				self.xPos += 5;
				self.yPos += 5;
				break;
			case 6:
				self.xPos += -5;
				self.yPos += -5;
				break;
			case 7:
				self.xPos += 5;
				self.yPos += -5;
				break;
		}
		self.ui.animate({transform: 'T'+self.xPos+','+self.yPos},100);
	}
	
	self.startMoving = startMoving;
	function startMoving() {
		setInterval(function(){makeMove()}, 100);
	}
	
	this.reset = reset;
	function reset() {
		self.speed = speedToStart;		
	}
}

function createGearUI() {
	var gearCircle = canvas.circle(1000, 500, 15);
	gearCircle.attr({fill: currentColor});
	
	var gearText = canvas.text(xLocation, yLocation, gearId);
	gearText.attr({'font-size': 12});
	
	var gearUI = canvas.set();
	gearUI.push(gearCircle);
	gearUI.push(gearText);
	return gearUI;
}

function addGear() {
	xLocation = xLocation + 100;
	gearId++;
	var newGear = new createNewGear(createGearUI());
	newGear.startPulse();
	newGear.startMoving();
	var currentAudio = new Audio("audio/RHSummit_"+currentAudioId+".wav");
	currentAudio.loop=true;
	currentAudio.play();
	currentAudioId += 1;
	all_gears.push(newGear);
}


window.onload=function() {


	console.log("Canvas created");
	canvas = new Raphael(document.getElementById("canvas"), 2000, 2000);
	canvas.circle(900, 500, 400).attr({fill:'white'});
	canvas.circle(900, 500, 375).attr({fill:'black'});
	console.log("Gear created");
	addGear();
	
	
	setInterval(function() {
		for (i = 0; i <= all_gears.length-1; i++) {
			all_gears[i].increaseSpeed();
			//setInterval(all_gears[i].makeMove(), 100);
		}
		if (all_gears[0].speed <= 200) {
			addGear();
			for (j=0; j <= all_gears.length -1; j++) {
				all_gears[j].reset();
			}
		}
	}, 8000);
}
