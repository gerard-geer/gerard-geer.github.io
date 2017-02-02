// The onclick button functionality.
function buttonOnClick(e)
{
	// If this is not the left mouse button we return without doing anything,
	// effectvely only enabling this event handler on standard clicks.
	if(event.which != 1) return;
	
	e.preventDefault();
	
	// Get the url of the link.
	var url = $(this).attr("href");
	// Retract the navbar, and upon completion navigate to the
	// link's reference.
	retractNavbar(function(){window.location.href=url;});
	// Oh we also fade out the content.
	$("body").fadeOut(duration*frameTime);
	
	// Fade out the page.
	$(window).fadeOut(duration*frameTime);
	
	// Remove button handlers from all other buttons, since we don't
	// want to screw with race conditions.
	$(".internal").on("click", function(){});
}

// Initializes button callbacks.
function initButtons()
{
	// Take each button and add a url element and set the
	// onclick function. Also add it to the button array.
	$(".internal").click(buttonOnClick);
}

// Initializes the page.
function init()
{
	// Create the button array.
	internalButtons = [];
	
	// Initialize the navbar.
	initNavbar();
	
	// Fade in the page.
	$("body").fadeIn(duration*frameTime);
	
	// Start the navbar animation, initializing the buttons upon completion.
	expandNavbar(function(){initButtons();});
}