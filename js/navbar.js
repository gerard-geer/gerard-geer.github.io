// The ID of the nav-bar loading interval.
var navBarLoadID;

// The length of each frame of animation, in milliseconds.
var frameTime = 15;
// The number of frames the animation lasts.
var duration = 20;

// The X location of each of the lines. They are subtly offset from each other.
var x = 0;
var x2 = 5;
var x3 = 10;

// The per-frame delta of the length of the line.
var lineDrawingDelta;

// The interval used to animate the navigation bar art.
var interval;

// The canvas and rendering context.
var canvas, ctx;

// Creates an animation interval for the navbar html5 canvas.
function initNavbar()
{
	// Extract the canvas and get a rendering context.
	canvas=document.getElementById("nav_canvas");
	if(canvas === null) return;
	ctx=canvas.getContext("2d");
	
	// Compute the per frame deltas of the animation.
	lineDrawingDelta = ((canvas.width)/duration);
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
	if(!ctx) return;	
	// Clear the previous frame of animation.
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	// Draw the line.
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#606060";
	ctx.moveTo(0, 5);
	ctx.lineTo(x, 5);
	ctx.stroke();
}

// Decrements the lines.
function decrementLines()
{
	if(!ctx) return;	
	// Increment length values if we haven't yet reached our target length.
	if(x>0)
	{
		x = x-lineDrawingDelta;
		return true;
	}
	return false;
}

function incrementLines()
{
	if(!ctx) return;	
	// Increment length values if we haven't yet reached our target length.
	if(x<canvas.width)
	{
		x = x+lineDrawingDelta;
		return true;
	}
	return false;
}