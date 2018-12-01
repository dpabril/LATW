// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).on('turbolinks:load', function () {

    // Create new Country
    $('#add-country-modal-submit-button').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: '/create/country',
            type: 'POST',
            dataType: 'json',
            data: {
                isoID: $('input#add-country-modal-isocode-field').val(),
                name: $('input#add-country-modal-name-field').val(),
                offiname: $('input#add-country-modal-offiname-field').val(),
                population: $('input#add-country-modal-population-field').val()
            },
        })
        .done(function(response) {
            $('#add-country-modal').modal('hide');
            window.location.assign('/countries/' + response['key']);
        })
        .fail(function(res) {
            $('#add-country-modal-submit-button').attr('disabled', 'disabled');
            var response = res['responseJSON'];
            if (response['errorCode'] == 1) {
                var messages = response['messages'];
                if (messages['isoID'] != "") {
                    $('input#add-country-modal-isocode-field').addClass('invalid-input');
                    $('#add-country-modal-isocode-error').find('.error-message').text(messages['isoID']);
                    $('#add-country-modal-isocode-error').removeClass('hidden');
                }
                if (messages['name'] != "") {
                    $('input#add-country-modal-name-field').addClass('invalid-input');
                    $('#add-country-modal-name-error').find('.error-message').text(messages['name']);
                    $('#add-country-modal-name-error').removeClass('hidden');
                }
                if (messages['offiname'] != "" ) {
                    $('input#add-country-modal-offiname-field').addClass('invalid-input');
                    $('#add-country-modal-offiname-error').find('.error-message').text(messages['offiname']);
                    $('#add-country-modal-offiname-error').removeClass('hidden');
                }
                if (messages['population'] != "") {
                    $('input#add-country-modal-population-field').addClass('invalid-input');
                    $('#add-country-modal-population-error').find('.error-message').text(messages['population']);
                    $('#add-country-modal-population-error').removeClass('hidden');
                }
            } else if (response['errorCode'] == 2) {
                $('input#add-country-modal-isocode-field').addClass('invalid-input');
                $('#add-country-modal-isocode-error').find('.error-message').text(response['message']);
                $('#add-country-modal-isocode-error').removeClass('hidden');
            }
        })
        .always(function() {
            // console.log("complete");
        });
    });

    // Create new isANationalLanguageOf entry
    $('#country-page-add-language-as-national-modal-submit-button').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: '/create/isanationallanguageof',
            type: 'POST',
            dataType: 'json',
            data: {
                langID: $('select#country-page-add-language-as-national-modal-select-field').val(),
                countryID: $(this).data('country-isoid')
            }
        })
        .done(function(response) {
            $('#country-page-add-language-as-national-modal').modal('hide');
            window.location.reload();
        })
        .fail(function(res) {
            $('#country-page-add-language-as-national-modal-submit-button').attr('disabled', 'disabled');
            var response = res['responseJSON'];
            if (response['errorCode'] == 1) {
                var messages = response['messages'];
                if (messages['langID'] != "") {
                    $('select#country-page-add-language-as-national-modal-select-field').addClass('invalid-input');
                    $('#country-page-add-language-as-national-modal-select-field').find('.error-message').text(messages['langID']);
                    $('#country-page-add-language-as-national-modal-select-field').removeClass('hidden');
                }
                if (messages['countryID'] != "") {
                    alert(messages['countryID']);
                    // $('input#add-country-modal-submit-button').addClass('invalid-input');
                    // $('#add-country-modal-name-error').find('.error-message').text(messages['name']);
                    // $('#add-country-modal-name-error').removeClass('hidden');
                }
            } else if (response['errorCode'] == 2) {
                $('select#country-page-add-language-as-national-modal-select-field').addClass('invalid-input');
                $('#country-page-add-language-as-national-modal-select-field').find('.error-message').text(response['message']);
                $('#country-page-add-language-as-national-modal-select-field').removeClass('hidden');
            }
        })
        .always(function() {
            // Stop loader
        });
    });

    // Create new isSpokenIn entry
    $('#country-page-add-language-as-spoken-modal-submit-button').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: '/create/isspokenin',
            type: 'POST',
            dataType: 'json',
            data: {
                langID: $('select#country-page-add-language-as-spoken-modal-select-field').val(),
                countryID: $(this).data('country-isoid')
            }
        })
        .done(function(response) {
            $('#country-page-add-language-as-spoken-modal').modal('hide');
            window.location.reload();
        })
        .fail(function(res) {
            $('#country-page-add-language-as-spoken-modal-submit-button').attr('disabled', 'disabled');
            var response = res['responseJSON']
            if (response['errorCode'] == 1) {
                var messages = response['messages'];
                if (messages['langID'] != "") {
                    $('select#country-page-add-language-as-spoken-modal-select-field').addClass('invalid-input');
                    $('#country-page-add-language-as-spoken-modal-select-field').find('.error-message').text(messages['langID']);
                    $('#country-page-add-language-as-spoken-modal-select-field').removeClass('hidden');
                }
                if (messages['countryID'] != "") {
                    alert(messages['countryID']);
                    // $('input#add-country-modal-submit-button').addClass('invalid-input');
                    // $('#add-country-modal-name-error').find('.error-message').text(messages['name']);
                    // $('#add-country-modal-name-error').removeClass('hidden');
                }
            } else if (response['errorCode'] == 2) {
                $('select#country-page-add-language-as-spoken-modal-select-field').addClass('invalid-input');
                $('#country-page-add-language-as-spoken-modal-select-field').find('.error-message').text(response['message']);
                $('#country-page-add-language-as-spoken-modal-select-field').removeClass('hidden');
            }
        })
        .always(function() {
            console.log("complete");
        });
        
    });

    // Save edits
    $('#edit-country-modal-submit-button').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: '/update/country',
            type: 'POST',
            dataType: 'json',
            data: {
                isoID_old: $(this).data('country-isoid'),
                isoID_new: $('input#edit-country-modal-isocode-field').val(),
                name: $('input#edit-country-modal-name-field').val(),
                offiname: $('input#edit-country-modal-offiname-field').val(),
                population: $('input#edit-country-modal-population-field').val()
            }
        })
        .done(function(response) {
            $('#edit-country-modal').modal('hide');
            window.location.assign('/countries/' + response['key']);
        })
        .fail(function(res) {
            $('#edit-country-modal-submit-button').attr('disabled', 'disabled');
            var response = res['responseJSON'];
            if (response['errorCode'] == 1) {
                var messages = response['messages'];
                if (messages['isoID'] != "") {
                    $('input#edit-country-modal-isocode-field').addClass('invalid-input');
                    $('#edit-country-modal-isocode-error').find('.error-message').text(messages['isoID']);
                    $('#edit-country-modal-isocode-error').removeClass('hidden');
                }
                if (messages['name'] != "") {
                    $('input#edit-country-modal-name-field').addClass('invalid-input');
                    $('#edit-country-modal-name-error').find('.error-message').text(messages['name']);
                    $('#edit-country-modal-name-error').removeClass('hidden');
                }
                if (messages['offiname'] != "" ) {
                    $('input#edit-country-modal-offiname-field').addClass('invalid-input');
                    $('#edit-country-modal-offiname-error').find('.error-message').text(messages['offiname']);
                    $('#edit-country-modal-offiname-error').removeClass('hidden');
                }
                if (messages['population'] != "") {
                    $('input#edit-country-modal-population-field').addClass('invalid-input');
                    $('#edit-country-modal-population-error').find('.error-message').text(messages['population']);
                    $('#edit-country-modal-population-error').removeClass('hidden');
                }
            } else if (response['errorCode'] == 2) {
                $('input#edit-country-modal-isocode-field').addClass('invalid-input');
                $('#edit-country-modal-isocode-error').find('.error-message').text(response['message']);
                $('#edit-country-modal-isocode-error').removeClass('hidden');
            }
        })
        .always(function() {
            // Stop loader
        });
    });

    // Confirm Country deletion
    $('#delete-country-confirm-modal-submit-button').on('click', function(event) {
        event.preventDefault();
        $.ajax({
            url: '/delete/country',
            type: 'POST',
            dataType: 'json',
            data: {
                isoID: $(this).data('country-isoid')
            }
        })
        .done(function() {
            $('#delete-country-confirm-modal').modal('hide');
            window.location.assign('/countries');
        });
    });

    // Setters for relationship deletions
    $('.country-page-delete-language-as-national-button').on('click', function () {
        var langID = $(this).data('language-isoid');
        var langName = $(this).data('language-name');
        var countryID = $(this).data('country-isoid');
        var countryName = $(this).data('country-name');
        $('#country-page-delete-language-as-national-confirm-modal-title').text('Deleting ' + countryName + ' from list');
        $('#country-page-delete-language-as-national-confirm-modal').find('p').text('Are you sure you would like to remove ' + countryName + ' from the list of countries that recognize ' + langName + ' as a national language?');
        $('#country-page-delete-language-as-national-confirm-modal').modal('show');
        $('#country-page-delete-language-as-national-confirm-modal-submit-button').attr('data-language-isoid', langID);
        $('#country-page-delete-language-as-national-confirm-modal-submit-button').attr('data-country-isoid', countryID);
    });

    $('.country-page-delete-language-as-spoken-button').on('click', function () {
        var langID = $(this).data('language-isoid');
        var langName = $(this).data('language-name');
        var countryID = $(this).data('country-isoid');
        var countryName = $(this).data('country-name');
        $('#country-page-delete-language-as-spoken-confirm-modal-title').text('Deleting ' + countryName + ' from list');
        $('#country-page-delete-language-as-spoken-confirm-modal').find('p').text('Are you sure you would like to remove ' + countryName + ' from the list of countries that speak ' + langName + '?  Note that if this is a national language of ' + countryName + ', the corresponding entry in the list above will also be removed.');
        $('#country-page-delete-language-as-spoken-confirm-modal').modal('show');
        $('#country-page-delete-language-as-spoken-confirm-modal-submit-button').attr('data-language-isoid', langID);
        $('#country-page-delete-language-as-spoken-confirm-modal-submit-button').attr('data-country-isoid', countryID);
    });

    // API Calls
    $('#country-page-delete-language-as-national-confirm-modal-submit-button').on('click', function (event) {
        event.preventDefault();
        var langID = $(this).data('language-isoid');
        var countryID = $(this).data('country-isoid');
        $.ajax({
            url: '/delete/isanationallanguageof',
            type: 'POST',
            dataType: 'json',
            data: {
                langID: langID,
                countryID: countryID
            }
        })
        .done(function() {
            $('#country-page-delete-language-as-national-confirm-modal').modal('hide');
            window.location.reload();
        });
    });

    $('#country-page-delete-language-as-spoken-confirm-modal-submit-button').on('click', function (event) {
        event.preventDefault();
        var langID = $(this).data('language-isoid');
        var countryID = $(this).data('country-isoid');
        $.ajax({
            url: '/delete/isspokenin',
            type: 'POST',
            dataType: 'json',
            data: {
                langID: langID,
                countryID: countryID
            }
        })
        .done(function() {
            $('#country-page-delete-language-as-spoken-confirm-modal').modal('hide');
            window.location.reload();
        });
    });

    // ====================================================================================
    //                            Input Validation and Safety
    // ====================================================================================
    // Country creation modal
    $('#add-country-modal').ready(function() {
        var invalidValues = false;
        $('#add-country-modal .input-required').each(function() {
            if ($(this).attr('id') == 'add-country-modal-isocode-field') {
                if ($(this).val().length != 2) {
                    invalidValues = true;
                }
            } else if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#add-country-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#add-country-modal-submit-button').removeAttr('disabled');
        }
    });
    $('#add-country-modal .input-required').on('keyup keydown change', function(event) {
        if ((event.type == 'keydown' || event.type == 'change') && $(this).hasClass('invalid-input')) {
            $(this).removeClass('invalid-input');
            $(this).next().addClass('hidden');
            $(this).next().find('.error-message').text('');
        }
        var invalidValues = false;
        $('#add-country-modal .input-required').each(function() {
            if ($(this).attr('id') == 'add-country-modal-isocode-field') {
                if ($(this).val().length != 2) {
                    invalidValues = true;
                }
            } else if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#add-country-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#add-country-modal-submit-button').removeAttr('disabled');
        }
    });

    // Country edit modal
    $('#edit-country-modal').ready(function() {
        var invalidValues = false;
        $('#edit-country-modal .input-required').each(function() {
            if ($(this).attr('id') == 'edit-country-modal-isocode-field') {
                if ($(this).val().length != 2) {
                    invalidValues = true;
                }
            } else if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#edit-country-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#edit-country-modal-submit-button').removeAttr('disabled');
        }
    });
    $('#edit-country-modal .input-required').on('keyup keydown change', function(event) {
        if ((event.type == 'keydown' || event.type == 'change') && $(this).hasClass('invalid-input')) {
            $(this).removeClass('invalid-input');
            $(this).next().addClass('hidden');
            $(this).next().find('.error-message').text('');
        }
        var invalidValues = false;
        $('#edit-country-modal .input-required').each(function() {
            if ($(this).attr('id') == 'edit-country-modal-isocode-field') {
                if ($(this).val().length != 2) {
                    invalidValues = true;
                }
            } else if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#edit-country-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#edit-country-modal-submit-button').removeAttr('disabled');
        }
    });

    // Add language as national modal
    $('#country-page-add-language-as-national-modal').ready(function() {
        var invalidValues = false;
        $('#country-page-add-language-as-national-modal .input-required').each(function() {
            if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#country-page-add-language-as-national-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#country-page-add-language-as-national-modal-submit-button').removeAttr('disabled');
        }
    });
    $('#country-page-add-language-as-national-modal .input-required').on('keyup keydown change', function(event) {
        if ((event.type == 'keydown' || event.type == 'change') && $(this).hasClass('invalid-input')) {
            $(this).removeClass('invalid-input');
            $(this).next().addClass('hidden');
            $(this).next().find('.error-message').text('');
        }
        var invalidValues = false;
        $('#country-page-add-language-as-national-modal .input-required').each(function() {
            if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#country-page-add-language-as-national-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#country-page-add-language-as-national-modal-submit-button').removeAttr('disabled');
        }
    });

    // Add spoken language modal
    $('#country-page-add-language-as-spoken-modal').ready(function() {
        var invalidValues = false;
        $('#country-page-add-language-as-spoken-modal .input-required').each(function() {
            if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#country-page-add-language-as-spoken-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#country-page-add-language-as-spoken-modal-submit-button').removeAttr('disabled');
        }
    });
    $('#country-page-add-language-as-spoken-modal .input-required').on('keyup keydown change', function(event) {
        if ((event.type == 'keydown' || event.type == 'change') && $(this).hasClass('invalid-input')) {
            $(this).removeClass('invalid-input');
            $(this).next().addClass('hidden');
            $(this).next().find('.error-message').text('');
        }
        var invalidValues = false;
        $('#country-page-add-language-as-spoken-modal .input-required').each(function() {
            if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#country-page-add-language-as-spoken-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#country-page-add-language-as-spoken-modal-submit-button').removeAttr('disabled');
        }
    });

    // ====================================================================================
    //                                  Clearing modal values
    // ====================================================================================
    $('#add-country-modal').on('hidden.bs.modal', function() {
        $('input#add-country-modal-isocode-field').val('');
        $('input#add-country-modal-name-field').val('');
        $('input#add-country-modal-offiname-field').val('');
        $('input#add-country-modal-population-field').val('');
        $(this).find('.input-required').removeClass('invalid-input');
        $(this).find('.error-message-div').addClass('hidden');
        $(this).find('.error-message').text('');
        $(this).find('button[id*="submit-button"]').attr('disabled', 'disabled');
    });
    $('#country-page-add-language-as-national-modal').on('hidden.bs.modal', function() {
        $('select#country-page-add-language-as-national-modal-select-field').val('')
        $(this).find('.input-required').removeClass('invalid-input');
        $(this).find('.error-message-div').addClass('hidden');
        $(this).find('.error-message').text('');
        $(this).find('button[id*="submit-button"]').attr('disabled', 'disabled');
    });
    $('#country-page-add-language-as-spoken-modal').on('hidden.bs.modal', function() {
        $('select#country-page-add-language-as-spoken-modal-select-field').val('')
        $(this).find('.input-required').removeClass('invalid-input');
        $(this).find('.error-message-div').addClass('hidden');
        $(this).find('.error-message').text('');
        $(this).find('button[id*="submit-button"]').attr('disabled', 'disabled');
    });
});