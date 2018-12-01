// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).on('turbolinks:load', function() {

    // Create new Script
    $('#add-script-modal-submit-button').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: '/create/script',
            type: 'POST',
            dataType: 'json',
            data: {
                isoID: $('input#add-script-modal-isocode-field').val(),
                name: $('input#add-script-modal-name-field').val(),
                direction: $('select#add-script-modal-direction-field').val(),
                hascase: $('input[name="add-script-modal-case-choice"]:checked').val()
            }
        })
        .done(function(response) {
            $('#add-script-modal').modal('hide');
            window.location.assign('/scripts/' + $('input#add-script-modal-isocode-field').val());
        })
        .fail(function(res) {
            $('#add-script-modal-submit-button').attr('disabled', 'disabled');
            var response = res['responseJSON'];
            if (response['errorCode'] == 1) {
                var messages = response['messages'];
                if (messages['isoID'] != "") {
                    $('input#add-script-modal-isocode-field').addClass('invalid-input');
                    $('#add-script-modal-isocode-error').find('.error-message').text(messages['isoID']);
                    $('#add-script-modal-isocode-error').removeClass('hidden');
                }
                if (messages['name'] != "") {
                    $('input#add-script-modal-name-field').addClass('invalid-input');
                    $('#add-script-modal-name-error').find('.error-message').text(messages['name']);
                    $('#add-script-modal-name-error').removeClass('hidden');
                }
                if (messages['direction'] != "") {
                    $('select#add-script-modal-direction-field').addClass('invalid-input');
                    $('#add-script-modal-direction-error').find('.error-message').text(messages['direction']);
                    $('#add-script-modal-direction-error').removeClass('hidden');
                }
                if (messages['hascase'] != "") {
                    $('input[name="add-script-modal-case-choice"]').addClass('invalid-input');
                    $('#add-script-modal-case-error').find('.error-message').text(messages['hascase']);
                    $('#add-script-modal-case-error').removeClass('hidden');
                }
            } else if (response['errorCode'] == 2) {
                $('input#add-script-modal-isocode-field').addClass('invalid-input');
                $('#add-script-modal-isocode-error').find('.error-message').text(response['message']);
                $('#add-script-modal-isocode-error').removeClass('hidden');
            }
        });
    });

    // Create new languageUsesScript entry
    $('#script-page-add-language-uses-script-modal-submit-button').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: '/create/uses',
            type: 'POST',
            dataType: 'json',
            data: {
                langID: $('select#script-page-add-language-uses-script-modal-select-field').val(),
                scriptID: $(this).data('script-isoid'),
            }
        })
        .done(function(response) {
            $('#script-page-add-language-uses-script-modal').modal('hide');
            window.location.reload();
        })
        .fail(function(res) {
            $('#script-page-add-language-uses-script-modal-submit-button').attr('disabled', 'disabled');
            var response = res['responseJSON'];
            if (response['errorCode'] == 1) {
                if (messages['langID'] != "") {
                    alert(messages['langID']);
                    $('select#script-page-add-language-uses-script-modal-select-field').addClass('invalid-input');
                    $('#script-page-add-language-uses-script-modal-error').find('.error-message').text(messages['langID']);
                    $('#script-page-add-language-uses-script-modal-error').removeClass('hidden');
                }
                if (messages['scriptID'] != "") {
                    alert(messages['scriptID']);
                    // $('select#language-page-add-language-uses-script-modal-select-field').addClass('invalid-input');
                    // $('#language-page-add-language-uses-script-modal-error').find('.error-message').text(messages['scriptID']);
                    // $('#language-page-add-language-uses-script-modal-error').removeClass('hidden');
                }
            } else if (response['errorCode'] == 2) {
                $('select#script-page-add-language-uses-script-modal-select-field').addClass('invalid-input');
                $('#script-page-add-language-uses-script-modal-error').find('.error-message').text(response['message']);
                $('#script-page-add-language-uses-script-modal-error').removeClass('hidden');
            }
        })
        .always(function() {
            // Stop loader
        });
    });

    // Save edits
    $('#edit-script-modal-submit-button').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: '/update/script',
            type: 'POST',
            dataType: 'json',
            data: {
                isoID_old: $(this).data('script-isoid'),
                isoID_new: $('input#edit-script-modal-isocode-field').val(),
                name: $('input#edit-script-modal-name-field').val(),
                direction: $('select#edit-script-modal-direction-field').val(),
                hascase: $('input[name="edit-script-modal-case-choice"]:checked').val()
            }
        })
        .done(function(response) {
            $('#edit-script-modal').modal('hide');
            window.location.assign('/scripts/' + response['key']);
        })
        .fail(function(res) {
            $('#edit-script-modal-submit-button').attr('disabled', 'disabled');
            var response = res['responseJSON'];
            if (response['errorCode'] == 1) {
                var messages = response['messages'];
                if (messages['isoID'] != "") {
                    $('input#edit-script-modal-isocode-field').addClass('invalid-input');
                    $('#edit-script-modal-isocode-error').find('.error-message').text(messages['isoID']);
                    $('#edit-script-modal-isocode-error').removeClass('hidden');
                }
                if (messages['name'] != "") {
                    $('input#edit-script-modal-name-field').addClass('invalid-input');
                    $('#edit-script-modal-name-error').find('.error-message').text(messages['name']);
                    $('#edit-script-modal-name-error').removeClass('hidden');
                }
                if (messages['direction'] != "") {
                    $('select#edit-script-modal-direction-field').addClass('invalid-input');
                    $('#edit-script-modal-direction-error').find('.error-message').text(messages['direction']);
                    $('#edit-script-modal-direction-error').removeClass('hidden');
                }
                if (messages['hascase'] != "") {
                    $('input[name="edit-script-modal-case-choice"]').addClass('invalid-input');
                    $('#edit-script-modal-case-error').find('.error-message').text(messages['hascase']);
                    $('#edit-script-modal-case-error').removeClass('hidden');
                }
            } else if (response['errorCode'] == 2) {
                $('input#edit-language-modal-isocode-field').addClass('invalid-input');
                $('#edit-language-modal-isocode-error').find('.error-message').text(response['message']);
                $('#edit-language-modal-isocode-error').removeClass('hidden');
            }
        });
    });

    // Confirm deletion
    $('#delete-script-confirm-modal-submit-button').on('click', function(event) {
        event.preventDefault();
        $.ajax({
            url: '/delete/script',
            type: 'POST',
            dataType: 'json',
            data: {
                isoID: $(this).data('script-isoid')
            }
        })
        .done(function() {
            $('#delete-script-confirm-modal').modal('hide');
            window.location.assign('/scripts');
        });
    });

    // Value setting
    $('.script-page-delete-script-as-used-button').on('click', function () {
        var langID = $(this).data('language-isoid');
        var langName = $(this).data('language-name');
        var scriptID = $(this).data('script-isoid');
        var scriptName = $(this).data('script-name');
        $('#script-page-delete-script-as-used-confirm-modal-title').text('Deleting ' + langName + ' from list');
        $('#script-page-delete-script-as-used-confirm-modal').find('p').text('Are you sure you would like to remove ' + langName + ' from the list of languages that use ' + scriptName + ' script?');
        $('#script-page-delete-script-as-used-confirm-modal').modal('show');
        $('#script-page-delete-script-as-used-confirm-modal-submit-button').attr('data-language-isoid', langID);
        $('#script-page-delete-script-as-used-confirm-modal-submit-button').attr('data-script-name', scriptID);
    });

    // API Calls
    $('#script-page-delete-script-as-used-confirm-modal-submit-button').on('click', function (event) {
        event.preventDefault();
        var langID = $(this).data('language-isoid');
        var scriptID = $(this).data('script-isoid');
        $.ajax({
            url: '/delete/uses',
            type: 'POST',
            dataType: 'json',
            data: {
                langID: langID,
                scriptID: scriptID
            }
        })
        .done(function() {
            $('#script-page-delete-script-as-used-confirm-modal').modal('hide');
            window.location.reload();
        });
    });

    // ====================================================================================
    //                            Validation and input safety
    // ====================================================================================
    // Script creation modal
    $('#add-script-modal').ready(function() {
        var invalidValues = false;
        $('#add-script-modal .input-required').each(function() {
            if ($(this).attr('id') == 'add-script-modal-isocode-field') {
                if ($(this).val().length != 4) {
                    invalidValues = true;
                }
            } else if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#add-script-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#add-script-modal-submit-button').removeAttr('disabled');
        }
    });
    $('#add-script-modal .input-required').on('keyup keydown change', function(event) {
        if ((event.type == 'keydown' || event.type == 'change') && $(this).hasClass('invalid-input')) {
            if ($(this).attr('name') == 'add-script-modal-case-choice') {
                $('input[name="add-script-modal-case-choice"]').removeClass('invalid-input');
                $('#add-script-modal-case-error').addClass('hidden');
                $('#add-script-modal-case-error').find('.error-message').text('');
            } else {
                $(this).removeClass('invalid-input');
                $(this).next().addClass('hidden');
                $(this).next().find('.error-message').text('');
            }
        }
        var invalidValues = false;
        $('#add-script-modal .input-required').each(function() {
            if ($(this).attr('id') == 'add-script-modal-isocode-field') {
                if ($(this).val().length != 4) {
                    invalidValues = true;
                }
            } else if ($(this).val().length < 1) {
                invalidValues = true;
            }

            if (!$('input[name="add-script-modal-case-choice"]:checked').length > 0) { 
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#add-script-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#add-script-modal-submit-button').removeAttr('disabled');
        }
    });

    // Script edit modal
    $('#edit-script-modal').ready(function() {
        var invalidValues = false;
        $('#edit-script-modal .input-required').each(function() {
            if ($(this).attr('id') == 'edit-script-modal-isocode-field') {
                if ($(this).val().length != 4) {
                    invalidValues = true;
                }
            } else if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#edit-script-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#edit-script-modal-submit-button').removeAttr('disabled');
        }
    });
    $('#edit-script-modal .input-required').on('keyup keydown change', function(event) {
        if ((event.type == 'keydown' || event.type == 'change') && $(this).hasClass('invalid-input')) {
            if ($(this).attr('name') == 'edit-script-modal-case-choice') {
                $('input[name="edit-script-modal-case-choice"]').removeClass('invalid-input');
                $('#edit-script-modal-case-error').addClass('hidden');
                $('#edit-script-modal-case-error').find('.error-message').text('');
            } else {
                $(this).removeClass('invalid-input');
                $(this).next().addClass('hidden');
                $(this).next().find('.error-message').text('');
            }
        }
        var invalidValues = false;
        $('#edit-script-modal .input-required').each(function() {
            if ($(this).attr('id') == 'edit-script-modal-isocode-field') {
                if ($(this).val().length != 4) {
                    invalidValues = true;
                }
            } else if ($(this).val().length < 1) {
                invalidValues = true;
            }

            if (!$('input[name="edit-script-modal-case-choice"]:checked').length > 0) { 
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#edit-script-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#edit-script-modal-submit-button').removeAttr('disabled');
        }
    });

    // Add languages that use this script
    $('#script-page-add-language-uses-script-modal').ready(function() {
        var invalidValues = false;
        $('#script-page-add-language-uses-script-modal .input-required').each(function() {
            if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#script-page-add-language-uses-script-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#script-page-add-language-uses-script-modal-submit-button').removeAttr('disabled');
        }
    });
    $('#script-page-add-language-uses-script-modal .input-required').on('keyup keydown change', function(event) {
        if ((event.type == 'keydown' || event.type == 'change') && $(this).hasClass('invalid-input')) {
            $(this).removeClass('invalid-input');
            $(this).next().addClass('hidden');
            $(this).next().find('.error-message').text('');
        }
        var invalidValues = false;
        $('#script-page-add-language-uses-script-modal .input-required').each(function() {
            if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#script-page-add-language-uses-script-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#script-page-add-language-uses-script-modal-submit-button').removeAttr('disabled');
        }
    });

    // ====================================================================================
    //                                  Clearing modal values
    // ====================================================================================
    $('#add-script-modal').on('hidden.bs.modal', function() {
        $('input#add-script-modal-isocode-field').val('');
        $('input#add-script-modal-name-field').val('');
        $('select#add-script-modal-direction-field').val('');
        $('input[name="add-script-modal-case-choice"]:checked').prop('checked', false);
        $(this).find('.input-required').removeClass('invalid-input');
        $(this).find('.error-message-div').addClass('hidden');
        $(this).find('.error-message').text('');
        $(this).find('button[id*="submit-button"]').attr('disabled', 'disabled');
    });
    $('#script-page-add-language-uses-script-modal').on('hidden.bs.modal', function() {
        $('select#script-page-add-language-uses-script-modal-select-field').val('');
        $(this).find('.input-required').removeClass('invalid-input');
        $(this).find('.error-message-div').addClass('hidden');
        $(this).find('.error-message').text('');
        $(this).find('button[id*="submit-button"]').attr('disabled', 'disabled');
    });
});