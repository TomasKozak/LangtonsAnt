let canvas;
let canvasContext;
var NumOfSteps = 0;
var brickNumH = 100;
var brickNumV = 100;
var brickWidth = 10;
var brickHeight = 10;
var brickGap = 2;
var brickGrid = new Array(brickNumH * brickNumV);

var ballX = 500 + brickWidth / 2;
var ballY = 500 + brickHeight / 2;
//var ballSpeedX = brickWidth;
//var ballSpeedY = 0;
var ballSpeed = brickWidth;
var ang = Math.PI / 2;
window.onload = function() {
	canvas = document.getElementById('antCanvas');
	canvasContext = canvas.getContext('2d');
	colorRect(0, 0, canvas.width, canvas.height, 'black');
	var FPS = 30;
	setInterval(function() {
		drawEverything();
		ballMove();
		console.log(NumOfSteps);
		NumOfSteps++;
	}, 1000 / FPS);
	brickReset();
};

function drawBricks() {
	for (var i = 0; i < brickNumH; i++) {
		for (var j = 0; j < brickNumV; j++) {
			var brickIndex = i + j * brickNumH;
			if (brickGrid[brickIndex]) {
				colorRect(brickWidth * i, brickHeight * j, brickWidth - brickGap, brickHeight - brickGap, 'white');
			}
		}
	}
}

function colorRect(leftX, topY, width, height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);
}

function brickReset() {
	//bricksLeft = 0;
	for (var i = 0; i < brickNumH * brickNumV; i++) {
		brickGrid[i] = true;
	}
}

function colorBall(centerX, centerY, radius, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
	canvasContext.fill();
}

function drawEverything() {
	colorRect(0, 0, canvas.width, canvas.height, 'black');
	drawBricks();
	colorBall(ballX, ballY, 4, 'red');

}

function ballMove() {
	ballX += Math.cos(ang) * ballSpeed;
	ballY += Math.sin(ang) * ballSpeed;
	ballBrickHandling();
}

function ballBrickHandling() {
	var ballbrickCol = Math.floor(ballX / brickWidth);
	var ballbrickRow = Math.floor(ballY / brickHeight);
	var brickIndexUnderBall = rowColToArrayIndex(ballbrickCol, ballbrickRow)

	if (ballbrickCol >= 0 && ballbrickCol < brickNumH && ballbrickRow >= 0 && ballbrickRow < brickNumV) {
		if (brickGrid[brickIndexUnderBall]) {
			brickGrid[brickIndexUnderBall] = false;
			ang += Math.PI / 2;
		} else if (!brickGrid[brickIndexUnderBall]) {
			brickGrid[brickIndexUnderBall] = true;
			ang -= Math.PI / 2;
		}
	}
}

function rowColToArrayIndex(Col, Row) {
	var index = brickNumH * Row + Col;
	return index;
}