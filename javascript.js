/* webcoder assignment JavaScript */

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
                alert('Thank you for your question or feedback!');   
             
                $('form :input').each(function(){
                    
                    if ($(this).prop('type') != 'submit') {  // Clear the value of all input elements EXCEPT submit button!
                        if($(this).prop('type') != 'radio'){
                            $(this).val('');
                        }    
                    }
                    else {
                        $(this).prop('disabled', false);        // Set the button to disabled again since form will be empty
                    }
                });
            });
            posting.fail(function (response) {
                console.log(response);
                alert('Error. Please resubmit your request. Sorry for the inconvenience caused.');
            });
        });
        
