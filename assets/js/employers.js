$(document).ready(function(){
    
    (function($) {
        "use strict";

    
    jQuery.validator.addMethod('answercheck', function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value)
    }, "Invalid Answer");

    // validate contactForm form
    $(function() {
        $('#contactForm').validate({
            rules: {
                title: {
                    required: true,
                    minlength: 2
                },
                company: {
                    required: true,
                    minlength: 4
                },
                number: {
                    required: true,
                    minlength: 5
                },
                email: {
                    required: true,
                    email: true
                },
                description: {
                    required: true,
                    minlength: 20
                },
                location: {
                    required: false,
                },
                website: {
                    required: false,
                },
                socials: {
                    required: false,
                },
            },
            messages: {
                title: {
                    required: "Please enter your job title.",
                    minlength: "your name must consist of at least 2 characters"
                },
                company: {
                    required: "Please enter company name.",
                    minlength: "your subject must consist of at least 4 characters"
                },
                number: {
                    required: "Please enter a valid phone number.",
                    minlength: "your number must consist of at least 5 characters"
                },
                email: {
                    required: "Please enter valid email."
                },
                description: {
                    required: "Please enter a job description.",
                }
            },
            submitHandler: function(form) {
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"contact_process.php",
                    success: function() {
                        $('#contactForm :input').attr('disabled', 'disabled');
                        $('#contactForm').fadeTo( "slow", 1, function() {
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).find('label').css('cursor','default');
                            $('#success').fadeIn()
                            $('.modal').modal('hide');
		                	$('#success').modal('show');
                        })
                    },
                    error: function() {
                        $('#contactForm').fadeTo( "slow", 1, function() {
                            $('#error').fadeIn()
                            $('.modal').modal('hide');
		                	$('#error').modal('show');
                        })
                    }
                })
            }
        })
    })
        
 })(jQuery)
})