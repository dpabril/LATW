// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).on('turbolinks:load', function() {

    // Create new Language Family
    $('#add-language-family-modal-submit-button').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: '/create/family',
            type: 'POST',
            dataType: 'json',
            data: {
                name: $('input#add-language-family-modal-name-field').val(),
                subgroupcount: $('input#add-language-family-modal-subgroup-count-field').val(),
                info: $('textarea#add-language-family-modal-description-field').val()
            }
        })
        .done(function(response) {
            $('#add-language-family-modal').modal('hide');
            window.location.assign('/families/' + response['key']);
        })
        .fail(function(res) {
            $('#add-language-family-modal-submit-button').attr('disabled', 'disabled');
            var response = res['responseJSON'];
            if (response['errorCode'] == 1) {
                var messages = response['messages'];
                if (messages['name'] != "") {
                    $('input#add-language-family-modal-name-field').addClass('invalid-input');
                    $('#add-language-family-modal-name-error').find('.error-message').text(messages['name']);
                    $('#add-language-family-modal-name-error').removeClass('hidden');
                }
                if (messages['subgroupcount'] != "" ) {
                    $('input#add-language-family-modal-subgroup-count-field').addClass('invalid-input');
                    $('#add-language-family-modal-subgroup-count-error').find('.error-message').text(messages['subgroupcount']);
                    $('#add-language-family-modal-subgroup-count-error').removeClass('hidden');
                }
            } else if (response['errorCode'] == 2) {
                $('input#add-language-family-modal-name-field').addClass('invalid-input');
                $('#add-language-family-modal-name-error').find('.error-message').text(response['message']);
                $('#add-language-family-modal-name-error').removeClass('hidden');
            }
        })
        .always(function() {
            // Stop loader
        });
    });

    // Create new languageBelongsTo entry
    $('#add-language-to-family-modal-submit-button').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: '/create/belongsto',
            type: 'POST',
            dataType: 'json',
            data: {
                langID: $('select#add-language-to-family-modal-select-field').val(),
                name: $(this).data('lfam-name')
            }
        })
        .done(function(response) {
            $('#add-language-to-family-modal').modal('hide');
            window.location.reload();
        })
        .fail(function(res) {
            $('#add-language-to-family-modal-submit-button').attr('disabled', 'disabled');
            var response = res['responseJSON'];
            if (response['errorCode'] == 1) {
                var messages = response['messages'];
                if (messages['langID'] != "") {
                    $('select#add-language-to-family-modal-select-field').addClass('invalid-input');
                    $('#add-language-to-family-modal-error').find('.error-message').text(messages['langID']);
                    $('#add-language-to-family-modal-error').removeClass('hidden');
                }
                if (messages['lfamID'] != "" ) {
                    alert(messages['lfamID']);
                    // $('input#add-language-family-modal-subgroup-count-field').addClass('invalid-input');
                    // $('#add-language-family-modal-subgroup-count-error').find('.error-message').text(messages['offiname']);
                    // $('#add-language-family-modal-subgroup-count-error').removeClass('hidden');
                }
            } else if (response['errorCode'] == 2) {
                $('select#add-language-to-family-modal-select-field').addClass('invalid-input');
                $('#add-language-to-family-modal-error').find('.error-message').text(response['message']);
                $('#add-language-to-family-modal-error').removeClass('hidden');
            }
        })
        .always(function() {
            // Stop loader
        });
    });

    // Save edits
    $('#edit-language-family-modal-submit-button').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: '/update/family',
            type: 'POST',
            dataType: 'json',
            data: {
                name_old: $(this).data('lfam-name'),
                name_new: $('input#edit-language-family-modal-name-field').val(),
                subgroupcount: $('input#edit-language-family-modal-subgroup-count-field').val(),
                info: $('textarea#edit-language-family-modal-description-field').val()
            }
        })
        .done(function(response) {
            $('#edit-language-family-modal').modal('hide');
            window.location.assign('/families/' + response['key']);
        })
        .fail(function(res) {
            $('#edit-language-family-modal-submit-button').attr('disabled', 'disabled');
            var response = res['responseJSON'];
            if (response['errorCode'] == 1) {
                var messages = response['messages'];
                if (messages['name'] != "") {
                    $('input#edit-language-family-modal-name-field').addClass('invalid-input');
                    $('#edit-language-family-modal-name-error').find('.error-message').text(messages['name']);
                    $('#edit-language-family-modal-name-error').removeClass('hidden');
                }
                if (messages['subgroupcount'] != "" ) {
                    $('input#edit-language-family-modal-subgroup-count-field').addClass('invalid-input');
                    $('#edit-language-family-modal-subgroup-count-error').find('.error-message').text(messages['subgroupcount']);
                    $('#edit-language-family-modal-subgroup-count-error').removeClass('hidden');
                }
            } else if (response['errorCode'] == 2) {
                $('input#edit-language-family-modal-name-field').addClass('invalid-input');
                $('#edit-language-family-modal-name-error').find('.error-message').text(response['message']);
                $('#edit-language-family-modal-name-error').removeClass('hidden');
            }
        });
    });

    // Confirm deletion
    $('#delete-language-family-confirm-modal-submit-button').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: '/delete/family',
            type: 'POST',
            dataType: 'json',
            data: {
                name: $(this).data('lfam-name')
            }
        })
        .done(function(response) {
            $('#delete-language-family-confirm-modal').modal('hide');
            window.location.assign('/families');
        });
    });

    // Value setting
    $('.delete-language-from-family-button').on('click', function () {
        var langID = $(this).data('language-isoid');
        var langName = $(this).data('language-name');
        var lfamName = $(this).data('lfam-name');
        $('#delete-language-from-family-confirm-modal-title').text('Deleting ' + langName + ' from list');
        $('#delete-language-from-family-confirm-modal').find('p').text('Are you sure you would like to remove ' + langName + ' from the list of ' + lfamName + ' languages?');
        $('#delete-language-from-family-confirm-modal').modal('show');
        $('#delete-language-from-family-confirm-modal-submit-button').attr('data-language-isoid', langID);
    });

    // API Calls
    $('#delete-language-from-family-confirm-modal-submit-button').on('click', function (event) {
        event.preventDefault();
        var langID = $(this).data('language-isoid');
        $.ajax({
            url: '/delete/belongsto',
            type: 'POST',
            dataType: 'json',
            data: {
                langID: langID
            }
        })
        .done(function(response) {
            $('#delete-language-from-family-confirm-modal').modal('hide');
            window.location.reload();
        });
    });

    // ====================================================================================
    //                            Validation and input safety
    // ====================================================================================
    // Language family creation modal
    $('#add-language-family-modal').ready(function() {
        var invalidValues = false;
        $('#add-language-family-modal .input-required').each(function() {
            if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#add-language-family-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#add-language-family-modal-submit-button').removeAttr('disabled');
        }
    });
    $('#add-language-family-modal .input-required').on('keyup keydown change', function(event) {
        if ((event.type == 'keydown' || event.type == 'change') && $(this).hasClass('invalid-input')) {
            $(this).removeClass('invalid-input');
            $(this).next().addClass('hidden');
            $(this).next().find('.error-message').text('');
        }
        var invalidValues = false;
        $('#add-language-family-modal .input-required').each(function() {
            if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#add-language-family-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#add-language-family-modal-submit-button').removeAttr('disabled');
        }
    });

    // Language family edit modal
    $('#edit-language-family-modal').ready(function() {
        var invalidValues = false;
        $('#edit-language-family-modal .input-required').each(function() {
            if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#edit-language-family-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#edit-language-family-modal-submit-button').removeAttr('disabled');
        }
    });
    $('#edit-language-family-modal .input-required').on('keyup keydown change', function(event) {
        if ((event.type == 'keydown' || event.type == 'change') && $(this).hasClass('invalid-input')) {
            $(this).removeClass('invalid-input');
            $(this).next().addClass('hidden');
            $(this).next().find('.error-message').text('');
        }
        var invalidValues = false;
        $('#edit-language-family-modal .input-required').each(function() {
            if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#edit-language-family-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#edit-language-family-modal-submit-button').removeAttr('disabled');
        }
    });

    // ====================================================================================
    //                                  Clearing modal values
    // ====================================================================================
    $('#add-language-family-modal').on('hidden.bs.modal', function() {
        $('input#add-language-family-modal-name-field').val('');
        $('input#add-language-family-modal-subgroup-count-field').val('');
        $('textarea#add-language-family-modal-description-field').val('');
        $(this).find('.input-required').removeClass('invalid-input');
        $(this).find('.error-message-div').addClass('hidden');
        $(this).find('.error-message').text('');
        $(this).find('button[id*="submit-button"]').attr('disabled', 'disabled');
    });
    $('#add-language-to-family-modal').on('hidden.bs.modal', function() {
        $('select#add-language-to-family-modal-select-field').val()
        $(this).find('.input-required').removeClass('invalid-input');
        $(this).find('.error-message-div').addClass('hidden');
        $(this).find('.error-message').text('');
        $(this).find('button[id*="submit-button"]').attr('disabled', 'disabled');
    });

});