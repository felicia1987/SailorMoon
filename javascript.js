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
                
                if($('#alert-id').length > 0){
                    $('#alert-id').prop('hidden', false);
                } else {
                    $('form').append('<p>Thank you</p>')
                }
                
                $('form :input').each(function(){
                    $(this).val('');
                })
            });
            posting.fail(function (response) {
                console.log(response);
            });
        });
        
