var speedToStart = 1000;
var xLocation = 800;
var yLocation = 500;
var currentColor = 'green';
var gearId = 0;
var nodeId = 0;
var nodeLocations = [{x:900, y:600},{x:600,y:300},{x:1300, y:500}];
var canvas;
var circleRadius = 200;
var all_gears= [];
var all_nodes = [];
var currentAudioId=1;
var currentAudio;
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
		self.ui.animate({r:10}, self.speed, self.decreaseSize);
		//makeMove();
	}
	
	
	self.decreaseSize = decreaseSize;
	function decreaseSize() {
		self.ui.animate({r:5}, self.speed, self.increaseSize);
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
		if (self.speed < 400) {
			self.ui.animate({fill:'red'}, 100);
		} else if (self.speed < 800) {
			self.ui.animate({fill:'yellow'}, 100);
		}
	}
	
	self.estimateMove = estimateMove;
	function estimateMove() {
		var currentX = self.xPos;
		var currentY = self.yPos;
		switch (self.currentDirection) {
			case 0:
				currentY += .5;
				break;
			case 1:
				currentY += -.5;
				break;
			case 2:
				currentX += -.5;
				break;
			case 3:
				currentX += .5;
				break;
			case 4:
				currentX += -.5;
				currentY += .5;
				break;
			case 5:
				currentX += .5;
				currentY += .5;
				break;
			case 6:
				currentX += -.5;
				currentY += -.5;
				break;
			case 7:
				currentX += .5;
				currentY += -.5;
				break;
		}
		var estimateSquared = (currentX * currentX) + (currentY * currentY);
		var radiusSquared = circleRadius * circleRadius;
		var valid = estimateSquared >= radiusSquared;
		if (valid) {
			return false;
		} else {
			self.xPos = currentX;
			self.yPos = currentY;
			return true;
		}
	}
	
	self.makeMove = makeMove;
	function makeMove() {
		if (self.currentDirection == 'No direction') {
			self.currentDirection = Math.floor(Math.random() * directions.length);
		}
		if(self.estimateMove()) {
			self.ui.animate({transform: 'T'+self.xPos+','+self.yPos},10);
			
		} else {
			console.log('changing direction');
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
					var possible = [1,3,6];
					self.currentDirection = possible[Math.floor(Math.random()*possible.length)];
					break;
				case 6:
					var possible = [0,3,5];
					self.currentDirection = possible[Math.floor(Math.random()*possible.length)];
					break;
				case 7:
					var possible = [0,2,4];
					self.currentDirection = possible[Math.floor(Math.random()*possible.length)];
				break;	
			}
			if (self.estimateMove) {
				self.ui.animate({transform: 'T'+self.xPos+','+self.yPos},10);
			} else {
				console.log('Mistake made in moving');
			}			
		}		
	}
	
	self.startMoving = startMoving;
	function startMoving() {
		setInterval(function(){makeMove()}, 10);
	}
	
	this.reset = reset;
	function reset() {
		self.speed = speedToStart;
		self.ui.animate({fill:'green'}, 100);
	}
}

function createGearUI(xCenter, yCenter) {
	var gearCircle = canvas.circle(xCenter, yCenter, 5);
	gearCircle.attr({fill: currentColor});
	

	return gearCircle;
}

function addGear() {
	xLocation = xLocation + 100;
	gearId++;
	var newGear = new createNewGear(createGearUI());
	newGear.startPulse();
	newGear.startMoving();
	var oldAudio = currentAudio;
	currentAudio = new Audio("audio/RHSummit_"+currentAudioId+".wav");
	if (oldAudio != null) {
		oldAudio.mute = true;
	}
	currentAudio.loop=true;
	currentAudio.play();
	currentAudioId += 1;
	all_gears.push(newGear);
}

function createNode(UI,x ,y) {
	var self = this;
	self.ui = UI;
	self.nodes = [];
	self.xCenter = x;
	self.yCenter = y;
	
	self.addNode = addNode;
	function addNode(node) {
		self.nodes.push(node);
	}
	
	self.addGear = addGear;
	function addGear() {
		var newGear = new createNewGear(createGearUI(self.xCenter, self.yCenter));
		addNode(newGear);
		newGear.startPulse();
		newGear.startMoving();
		var oldAudio = currentAudio;
		currentAudio = new Audio("audio/RHSummit_"+currentAudioId+".wav");
		if (oldAudio != null) {
			oldAudio.mute = true;
		}
		currentAudio.loop=true;
		currentAudio.play();
		currentAudioId += 1;
		all_gears.push(newGear);
	}
}

function addNode() {
	var newNode = new createNode(canvas.circle(nodeLocations[nodeId].x, nodeLocations[nodeId].y, 200).attr({fill:'url(../images/tab-content-bg.png)', stroke:'white'}),nodeLocations[nodeId].x, nodeLocations[nodeId].y);
	var rotateImage = Raphael.animation({transform:'r360'}, 10000).repeat(Infinity);
	var gearImage = canvas.image('images/openshift.png', nodeLocations[nodeId].x- 150, nodeLocations[nodeId].y -150, 300, 300).animate(rotateImage);
	all_nodes.push(newNode);
}


window.onload=function() {


	console.log("Canvas created");
	canvas = new Raphael(document.getElementById("canvas"), 2000, 2000);
	//canvas.circle(900, 500, 400).attr({fill:'black', stroke:'white'});
	//canvas.circle(900, 500, 385).attr({fill:'black'});
	//console.log("Gear created");
	//addGear();
	
	addNode();
	all_nodes[0].addGear();
	
	
	setInterval(function() {
		for (i = 0; i <= all_gears.length-1; i++) {
			all_gears[i].increaseSpeed();
		}
		if (all_gears[0].speed <= 200) {
			if (all_nodes[nodeId].nodes.length > 3) {
				nodeId++;
				addNode();
			}
			all_nodes[nodeId].addGear();
			for (j=0; j <= all_gears.length -1; j++) {
				all_gears[j].reset();
			}
		}
	}, 8000);
}
