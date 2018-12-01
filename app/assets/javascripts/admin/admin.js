// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).on('turbolinks:load', function() {
    $('#signin-modal-submit-button').on('click', function(event) {
        event.preventDefault();
        $.ajax({
            url: '/signin',
            type: 'POST',
            dataType: 'json',
            data: {
                username: $('input#username-field').val(),
                password: $('input#password-field').val()
            },
        })
        .done(function() {
            $('#signin-modal').modal('hide');
            location.reload();
        })
        .fail(function(res) {
            var response = res['responseJSON'];
            $('#signin-modal-error').find('.error-message').text(response['message']);
            $('#signin-modal-error').removeClass('hidden');
            $('#signin-modal-submit-button').attr('disabled', 'disabled');
        })
        .always(function() {
            // console.log("complete");
        });
    });

    $('#signout-link').on('click', function(event) {
        event.preventDefault();
        $.ajax({
            url: '/signout',
            type: 'GET'
        })
        .done(function() {
            location.reload();
        });
    });

    // ====================================================================================
    //                            Input Validation and Safety
    // ====================================================================================

    $('#signin-modal').ready(function() {
        var invalidValues = false;
        $('#signin-modal .input-required').each(function() {
            if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#signin-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#signin-modal-submit-button').removeAttr('disabled');
        }
    });
    $('#signin-modal .input-required').on('keyup keydown change', function(event) {
        if (event.type == 'keydown' || event.type == 'change') {
            $('#signin-modal-error').addClass('hidden');
            $('#signin-modal-error').find('.error-message').text('');
        }
        var invalidValues = false;
        $('#signin-modal .input-required').each(function() {
            if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#signin-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#signin-modal-submit-button').removeAttr('disabled');
        }
    });

    // ====================================================================================
    //                                  Clearing modal values
    // ====================================================================================

    $('#signin-modal').on('hidden.bs.modal', function() {
        $('input#username-field').val('');
        $('input#password-field').val('');
        $(this).find('.error-message-div').addClass('hidden');
        $(this).find('.error-message').text('');
        $(this).find('#signin-modal-submit-button').attr('disabled', 'disabled');
    });
});