/* webcoder assignment CSS */

/////////////////////////////////////////////////////
//
// Navigation
//
//////////////////////////////////////////////////////
	// Header Scroll - Change Navigation css setup
	$(window).on('scroll', function() {
		var scroll = $(window).scrollTop();

		if (scroll >= 50) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	});


	// Page Scroll - Navigation to each section
	var sections = $('section')
		nav = $('nav[role="navigation"]');

	$(window).on('scroll', function () {
	  	var cur_pos = $(this).scrollTop();
	  	sections.each(function() {
	    	var top = $(this).offset().top - 76
	        	bottom = top + $(this).outerHeight();
	    	if (cur_pos >= top && cur_pos <= bottom) {
	      		nav.find('a').removeClass('active');
	      		nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
	    	}
	  	});
	});
	nav.find('a').on('click', function () {
	  	var $el = $(this)
	    	id = $el.attr('href');
		$('html, body').animate({
			scrollTop: $(id).offset().top - 75
		}, 500);
	  return false;
	});

	// Mobile Navigation - Toggle Menu Section
	$('.nav-toggle').on('click', function() {
		$(this).toggleClass('close-nav');
		nav.toggleClass('open');
		return false;
	});	
	nav.find('a').on('click', function() {
		$('.nav-toggle').toggleClass('close-nav');
		nav.toggleClass('open');
	});


////////////////////////////////////////////////////////////
//
// Pop Up Window
//
////////////////////////////////////////////////////////////
function openNav() {
	document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
	document.getElementById("myNav").style.width = "0%";
}


//////////////////////////////////////////////////////////////////////
//
// on submitting the form
//
/////////////////////////////////////////////////////////////////////
$('form').submit(function (event) {
    
// prevent the default action of reloading the page
event.preventDefault();

var sendData = {};
$(event.target.nodeName + ' :input').each(function(){
console.log(this.type);
if (this.type == "radio") {
    if (this.checked == true) {
        sendData[this.name] = $(this).val();
    }
} else {
    sendData[this.name] = $(this).val(); 
}
    
console.log(this);                
});

var posting = $.ajax({
type: 'POST',
url: $(event.target.nodeName).prop('action'),
data: sendData
});

posting.done(function (response) {
console.log(response);

$('form :input').each(function(){
            
    if ($(this).prop('type') != 'submit') {  // Clear the value of all input elements EXCEPT submit button & radio!
        if($(this).prop('type') != 'radio'){ 
            $(this).val('');
        }                        
    }
        else {
            $(this).prop('disabled', true);     // Set the button to disabled again since form will be empty
        }
    });

    $('#alert-id').removeClass("in").addClass("show");        
});

posting.fail(function (response) {
console.log(response);
});
});

// RESPONSE ALERT WINDOW-------------------------------------------------------------------------------
/* include the following HTML to use:
<div class="form-group">
<button type="submit" class="btn btn-default my-btn form-control" id="submit-id">submit</button>                   
<div class="alert alert-danger alert-dismissible fade in" hidden id="alert-id">
<button type="button" class="close" id="close-id"><span>&times;</span></button>
    Thank you! We will send you update whenever it's available.
</div>
</div>
*/

// on clicking the X button
$('#close-id').click(function(){
// hide the alert panel by changing the class
$('#alert-id').removeClass("show").addClass("in");

// enable the form
$('form :input').prop('disabled', false);  
});