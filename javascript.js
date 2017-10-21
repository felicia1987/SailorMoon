/* webcoder assignment JavaScript */

// Header Scroll
$(window).on('scroll', function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 50) {
        $('.navbar-default').addClass('modifyTemp');
        $('#header').addClass('modifyTemp');
    } else {
        $('.navbar-default').removeClass('modifyTemp');
        $('#header').removeClass('modifyTemp');
    }
});

// on submitting the form
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