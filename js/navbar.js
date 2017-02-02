// The ID of the nav-bar loading interval.
var navBarLoadID;

// The length of each frame of animation, in milliseconds.
var frameTime = 15;
// The number of frames the animation lasts.
var duration = 20;

// The X location of each of the lines. They are subtly offset from each other.
var x1 = 0;
var x2 = 5;
var x3 = 10;

// The per-frame delta of the length of the line.
var lineDrawingDelta1;
var lineDrawingDelta2;
var lineDrawingDelta3;

// The interval used to animate the navigation bar art.
var interval;

// The canvas and rendering context.
var canvas, ctx;

// Creates an animation interval for the navbar html5 canvas.
function initNavbar()
{
	// Extract the canvas and get a rendering context.
	canvas=document.getElementById("nav_canvas");
	ctx=canvas.getContext("2d");
	
	// Compute the per frame deltas of the animation.
	lineDrawingDelta1 = ((canvas.width)/duration);
	lineDrawingDelta2 = ((canvas.width-10)/duration);
	lineDrawingDelta3 = ((canvas.width-20)/duration);
}

// Expands the navbar.
function expandNavbar(callback)
{
	// Set the rendering interval.
	interval = setInterval(function(){
		drawLines();
		if(!incrementLines())
		{
			clearInterval(interval);
			callback();
		}
	}, frameTime);
}

// Retracts the navbar.
function retractNavbar(callback)
{
	// Set the rendering interval.
	interval = setInterval(function(){
		drawLines();
		if(!decrementLines())
		{
			clearInterval(interval);
			callback();
		}
	}, frameTime);
}


// Draws the lines. What do you expect.
function drawLines()
{
	// Clear the previous frame of animation.
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	//First line.
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#ff7b00";
	ctx.moveTo(0, 5);
	ctx.lineTo(x1, 5);
	ctx.stroke();

	//Second line.
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#606060";
	ctx.moveTo(5, 10);
	ctx.lineTo(x2, 10);
	ctx.stroke();

	//Third line.
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#00d4ff";
	ctx.moveTo(10, 15);
	ctx.lineTo(x3, 15);
	ctx.stroke();
}

// Decrements the lines.
function decrementLines()
{
	// Increment length values if we haven't yet reached our target length.
	if(x1>0)
	{
		x1 = x1-lineDrawingDelta1;
		x2 = x2-lineDrawingDelta2;
		x3 = x3-lineDrawingDelta3;
		return true;
	}
	return false;
}

function incrementLines()
{
	// Increment length values if we haven't yet reached our target length.
	if(x1<canvas.width)
	{
		x1 = x1+lineDrawingDelta1;
		x2 = x2+lineDrawingDelta2;
		x3 = x3+lineDrawingDelta3;
		return true;
	}
	return false;
}