var centered = true;

var clicked = false;

var animTime = 250;

var currentContent;


function removeContent(content, callback)
{
	content.fadeOut(animTime, callback);
}

function addContent(content, callback)
{
	content.fadeIn(animTime, callback);
}

function onInternalClick()
{
	if(clicked) return;
	clicked = true;
	
	// Get the ID of the content being pointed to by the button.
	var targetID = $(this).attr('id');
	
	console.log(this);
	
	// Get the relevant content container for the content.
	var contentContainer = $(this).closest('.button_container').next('.content_container');
	
	// Get the target content.
	var targetContent = contentContainer.children('#'+targetID).first();
	
	// If the nav bar is still centered as when first visiting, 
	// we have to do that animation. On the plus side, we can know
	// that there is no content that we yet need to remove.
	if(centered)
	{
		var centerer = $('#vertical_centerer');
		centerer.animate({height: '10%'}, animTime, function(){
			centered = false;
			addContent($('#top_content_container'), function(){
				addContent(targetContent, function(){clicked = false;});
				currentContent = targetContent;
			});
		});
	}
	// Otherwise we just remove the content and add the new.
	else
	{
		removeContent(targetContent.siblings('#'+currentContent.attr('id')), function()
		{
			addContent(targetContent, function(){clicked = false;});
			currentContent = targetContent;
		});
	}	
}

function onProjectClick()
{
	console.log("project");
	
}

function onExternalClick()
{
	window.open($(this).attr('target'), '_blank');
}

function init()
{
	
	loadNavbar(function(){
		$('button').fadeTo(animTime, 1.0, function(){
			$('button.internal').click(onInternalClick);
		});
		$('a').fadeTo(animTime, 1.0);
		$('#title').fadeTo(animTime, 1.0);
	});
}