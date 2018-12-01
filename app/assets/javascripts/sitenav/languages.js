// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).on('turbolinks:load', function () {

    // Create new Language
    $('#add-language-modal-submit-button').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: '/create/language',
            type: 'POST',
            dataType: 'json',
            data: {
                isoID: $('input#add-language-modal-isocode-field').val(),
                name: $('input#add-language-modal-name-field').val(),
                population: $('input#add-language-modal-population-field').val()
            },
        })
        .done(function(response) {
            $('#add-language-modal').modal('hide');
            window.location.assign('/languages/' + response['key']);
        })
        .fail(function(res) {
            $('#add-language-modal-submit-button').attr('disabled', 'disabled');
            var response = res['responseJSON'];
            if (response['errorCode'] == 1) {
                var messages = response['messages'];
                if (messages['isoID'] != "") {
                    $('input#add-language-modal-isocode-field').addClass('invalid-input');
                    $('#add-language-modal-isocode-error').find('.error-message').text(messages['isoID']);
                    $('#add-language-modal-isocode-error').removeClass('hidden');
                }
                if (messages['name'] != "") {
                    $('input#add-language-modal-name-field').addClass('invalid-input');
                    $('#add-language-modal-name-error').find('.error-message').text(messages['name']);
                    $('#add-language-modal-name-error').removeClass('hidden');
                }
                if (messages['population'] != "") {
                    $('input#add-language-modal-population-field').addClass('invalid-input');
                    $('#add-language-modal-population-error').find('.error-message').text(messages['population']);
                    $('#add-language-modal-population-error').removeClass('hidden');
                }
            } else if (response['errorCode'] == 2) {
                $('input#add-language-modal-isocode-field').addClass('invalid-input');
                $('#add-language-modal-isocode-error').find('.error-message').text(response['message']);
                $('#add-language-modal-isocode-error').removeClass('hidden');
            }
        })
        .always(function() {
            // console.log("complete");
        });
    });

    // Create new Dialect
    $('#add-dialect-modal-submit-button').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: '/create/dialect',
            type: 'POST',
            dataType: 'json',
            data: {
                isoID: $(this).data('language-isoid'),
                name: $('input#add-dialect-modal-name-field').val()
            }
        })
        .done(function(response) {
            $('#add-dialect-modal').modal('hide');
            window.location.reload();
        })
        .fail(function(res) {
            $('#add-dialect-modal-submit-button').attr('disabled', 'disabled');
            var response = res['responseJSON'];
            if (response['errorCode'] == 1) {
                var messages = response['messages'];
                if (messages['isoID'] != "") {
                    alert(messages['isoID']);
                    // $('input#add-language-modal-isocode-field').addClass('invalid-input');
                    // $('#add-language-modal-isocode-error').find('.error-message').text(messages['isoID']);
                    // $('#add-language-modal-isocode-error').removeClass('hidden');
                }
                if (messages['name'] != "") {
                    $('input#add-dialect-modal-name-field').addClass('invalid-input');
                    $('#add-dialect-modal-name-error').find('.error-message').text(messages['name']);
                    $('#add-dialect-modal-name-error').removeClass('hidden');
                }
            } else if (response['errorCode'] == 2) {
                $('input#add-dialect-modal-name-field').addClass('invalid-input');
                $('#add-dialect-modal-name-error').find('.error-message').text(response['message']);
                $('#add-dialect-modal-name-error').removeClass('hidden');
            }
        })
        .always(function() {
            // console.log("complete");
        });
    });

    // Create new isANationalLanguageOf entry
    $('#language-page-add-language-as-national-modal-submit-button').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: '/create/isanationallanguageof',
            type: 'POST',
            dataType: 'json',
            data: {
                langID: $(this).data('language-isoid'),
                countryID: $('select#language-page-add-language-as-national-modal-select-field').val()
            }
        })
        .done(function(response) {
            $('#language-page-add-language-as-national-modal').modal('hide');
            window.location.reload();
        })
        .fail(function(res) {
            $('#language-page-add-language-as-national-modal-submit-button').attr('disabled', 'disabled');
            var response = res['responseJSON'];
            if (response['errorCode'] == 1) {
                var messages = response['messages'];
                if (messages['langID'] != "") {
                    alert(messages['langID']);
                    // $('select#country-page-add-language-as-national-modal-select-field').addClass('invalid-input');
                    // $('#country-page-add-language-as-national-modal-select-field').find('.error-message').text(messages['langID']);
                    // $('#country-page-add-language-as-national-modal-select-field').removeClass('hidden');
                }
                if (messages['countryID'] != "") {
                    alert(messages['countryID']);
                    $('select#language-page-add-language-as-national-modal-select-field').addClass('invalid-input');
                    $('#language-page-add-language-as-national-modal-select-field').find('.error-message').text(messages['countryID']);
                    $('#language-page-add-language-as-national-modal-select-field').removeClass('hidden');
                }
            } else if (response['errorCode'] == 2) {
                $('select#language-page-add-language-as-national-modal-select-field').addClass('invalid-input');
                $('#language-page-add-language-as-national-modal-error').find('.error-message').text(response['message']);
                $('#language-page-add-language-as-national-modal-error').removeClass('hidden');
            }
        })
        .always(function() {
            // Stop loader
        });
    });

    // Create new isSpokenIn entry
    $('#language-page-add-language-as-spoken-modal-submit-button').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: '/create/isspokenin',
            type: 'POST',
            dataType: 'json',
            data: {
                langID: $(this).data('language-isoid'),
                countryID: $('select#language-page-add-language-as-spoken-modal-select-field').val()
            }
        })
        .done(function(response) {
            $('#language-page-add-language-as-spoken-modal').modal('hide');
            window.location.reload();
        })
        .fail(function(res) {
            $('#language-page-add-language-as-spoken-modal-submit-button').attr('disabled', 'disabled');
            var response = res['responseJSON'];
            if (response['errorCode'] == 1) {
                var messages = response['messages'];
                if (messages['langID'] != "") {
                    alert(messages['langID']);
                    // $('select#country-page-add-language-as-national-modal-select-field').addClass('invalid-input');
                    // $('#country-page-add-language-as-national-modal-select-field').find('.error-message').text(messages['langID']);
                    // $('#country-page-add-language-as-national-modal-select-field').removeClass('hidden');
                }
                if (messages['countryID'] != "") {
                    alert(messages['countryID']);
                    $('select#language-page-add-language-as-spoken-modal-select-field').addClass('invalid-input');
                    $('#language-page-add-language-as-spoken-modal-select-field').find('.error-message').text(messages['countryID']);
                    $('#language-page-add-language-as-spoken-modal-select-field').removeClass('hidden');
                }
            } else if (response['errorCode'] == 2) {
                $('select#language-page-add-language-as-spoken-modal-select-field').addClass('invalid-input');
                $('#language-page-add-language-as-spoken-modal-error').find('.error-message').text(response['message']);
                $('#language-page-add-language-as-spoken-modal-error').removeClass('hidden');
            }
        })
        .always(function() {
            console.log("complete");
        });
    });

    // Create new languageUsesScript entry
    $('#language-page-add-language-uses-script-modal-submit-button').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: '/create/uses',
            type: 'POST',
            dataType: 'json',
            data: {
                langID: $(this).data('language-isoid'),
                scriptID: $('select#language-page-add-language-uses-script-modal-select-field').val()
            }
        })
        .done(function(response) {
            $('#language-page-add-language-uses-script-modal').modal('hide');
            window.location.reload();
        })
        .fail(function(res) {
            $('#language-page-add-language-uses-script-modal-submit-button').attr('disabled', 'disabled');
            var response = res['responseJSON'];
            if (response['errorCode'] == 1) {
                var messages = response['messages'];
                if (messages['langID'] != "") {
                    alert(messages['langID']);
                    // $('select#country-page-add-language-as-national-modal-select-field').addClass('invalid-input');
                    // $('#country-page-add-language-as-national-modal-select-field').find('.error-message').text(messages['langID']);
                    // $('#country-page-add-language-as-national-modal-select-field').removeClass('hidden');
                }
                if (messages['scriptID'] != "") {
                    alert(messages['countryID']);
                    $('select#language-page-add-language-uses-script-modal-select-field').addClass('invalid-input');
                    $('#language-page-add-language-uses-script-modal-error').find('.error-message').text(messages['scriptID']);
                    $('#language-page-add-language-uses-script-modal-error').removeClass('hidden');
                }
            } else if (response['errorCode'] == 2) {
                $('select#language-page-add-language-uses-script-modal-select-field').addClass('invalid-input');
                $('#language-page-add-language-uses-script-modal-error').find('.error-message').text(response['message']);
                $('#language-page-add-language-uses-script-modal-error').removeClass('hidden');
            }
        })
        .always(function() {
            // Stop loader
        });
    });

    // Save edits
    $('#edit-language-modal-submit-button').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: '/update/language',
            type: 'POST',
            dataType: 'json',
            data: {
                isoID_old: $(this).data('language-isoid'),
                isoID_new: $('input#edit-language-modal-isocode-field').val(),
                name: $('input#edit-language-modal-name-field').val(),
                population: $('input#edit-language-modal-population-field').val()
            }
        })
        .done(function(response) {
            $('#edit-language-modal').modal('hide');
            window.location.assign('/languages/' + response['key']);
        })
        .fail(function(res) {
            $('#edit-language-modal-submit-button').attr('disabled', 'disabled');
            var response = res['responseJSON'];
            if (response['errorCode'] == 1) {
                var messages = response['messages'];
                if (messages['isoID'] != "") {
                    $('input#edit-language-modal-isocode-field').addClass('invalid-input');
                    $('#edit-language-modal-isocode-error').find('.error-message').text(messages['isoID']);
                    $('#edit-language-modal-isocode-error').removeClass('hidden');
                }
                if (messages['name'] != "") {
                    $('input#edit-language-modal-name-field').addClass('invalid-input');
                    $('#edit-language-modal-name-error').find('.error-message').text(messages['name']);
                    $('#edit-language-modal-name-error').removeClass('hidden');
                }
                if (messages['population'] != "") {
                    $('input#edit-language-modal-population-field').addClass('invalid-input');
                    $('#edit-language-modal-population-error').find('.error-message').text(messages['population']);
                    $('#edit-language-modal-population-error').removeClass('hidden');
                }
            } else if (response['errorCode'] == 2) {
                $('input#edit-language-modal-isocode-field').addClass('invalid-input');
                $('#edit-language-modal-isocode-error').find('.error-message').text(response['message']);
                $('#edit-language-modal-isocode-error').removeClass('hidden');
            }
        });
    });

    // Confirm deletion
    $('#delete-language-confirm-modal-submit-button').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: '/delete/language',
            type: 'POST',
            dataType: 'json',
            data: {
                isoID: $(this).data('language-isoid')
            }
        })
        .done(function(response) {
            $('#delete-language-confirm-modal').modal('hide');
            window.location.assign('/languages');
        });
    });


    // Value setting
    $('.delete-dialect-button').on('click', function () {
        var langID = $(this).data('language-isoid');
        var langName = $(this).data('language-name');
        var dialectName = $(this).data('dialect-name');
        $('#delete-dialect-confirm-modal-title').text('Deleting ' + dialectName + ' from dialects');
        $('#delete-dialect-confirm-modal').find('p').text('Are you sure you would like to remove ' + dialectName + ' from the dialects of ' + langName + '?');
        $('#delete-dialect-confirm-modal').modal('show');
        $('#delete-dialect-confirm-modal-submit-button').attr('data-language-isoid', langID);
        $('#delete-dialect-confirm-modal-submit-button').attr('data-dialect-name', dialectName);

    });

    $('.language-page-delete-language-as-national-button').on('click', function () {
        var langID = $(this).data('language-isoid');
        var langName = $(this).data('language-name');
        var countryID = $(this).data('country-isoid');
        var countryName = $(this).data('country-name');
        $('#language-page-delete-language-as-national-confirm-modal-title').text('Deleting ' + countryName + ' from list of countries using this as a national language');
        $('#language-page-delete-language-as-national-confirm-modal').find('p').text('Are you sure you would like to remove ' + countryName + ' from the list of countries that recognize ' + langName + ' as a national language?');
        $('#language-page-delete-language-as-national-confirm-modal').modal('show');
        $('#language-page-delete-language-as-national-confirm-modal-submit-button').attr('data-language-isoid', langID);
        $('#language-page-delete-language-as-national-confirm-modal-submit-button').attr('data-country-isoid', countryID);
    });

    $('.language-page-delete-language-as-spoken-button').on('click', function () {
        var langID = $(this).data('language-isoid');
        var langName = $(this).data('language-name');
        var countryID = $(this).data('country-isoid');
        var countryName = $(this).data('country-name');
        $('#language-page-delete-language-as-spoken-confirm-modal-title').text('Deleting ' + countryName + ' from list of countries using this language');
        $('#language-page-delete-language-as-spoken-confirm-modal').find('p').text('Are you sure you would like to remove ' + countryName + ' from the list of countries that speak ' + langName + '? Note that if this is a national language of ' + countryName + ', the corresponding entry in the list above will also be removed.');
        $('#language-page-delete-language-as-spoken-confirm-modal').modal('show');
        $('#language-page-delete-language-as-spoken-confirm-modal-submit-button').attr('data-language-isoid', langID);
        $('#language-page-delete-language-as-spoken-confirm-modal-submit-button').attr('data-country-isoid', countryID);
    });

    $('.language-page-delete-script-as-used-button').on('click', function () {
        var langID = $(this).data('language-isoid');
        var langName = $(this).data('language-name');
        var scriptID = $(this).data('script-isoid');
        var scriptName = $(this).data('script-name');
        $('#language-page-delete-script-as-used-confirm-modal-title').text('Deleting ' + scriptName + ' from list of scripts');
        $('#language-page-delete-script-as-used-confirm-modal').find('p').text('Are you sure you would like to remove ' + scriptName + ' from the list of scripts used to write ' + langName + '?');
        $('#language-page-delete-script-as-used-confirm-modal').modal('show');
        $('#language-page-delete-script-as-used-confirm-modal-submit-button').attr('data-language-isoid', langID);
        $('#language-page-delete-script-as-used-confirm-modal-submit-button').attr('data-script-isoid', scriptID);
    });

    // API Calls
    $('#delete-dialect-confirm-modal-submit-button').on('click', function (event) {
        event.preventDefault();
        var langID = $(this).data('language-isoid');
        var dialectName = $(this).data('dialect-name');
        $.ajax({
            url: '/delete/dialect',
            type: 'POST',
            dataType: 'json',
            data: {
                langID: langID,
                name: dialectName
            }
        })
        .done(function(response) {
            $('#delete-dialect-confirm-modal').modal('hide');
            location.reload();
        });
    });

    $('#language-page-delete-language-as-national-confirm-modal-submit-button').on('click', function (event) {
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
        .done(function(response) {
            $('#language-page-delete-language-as-national-confirm-modal').modal('hide');
            location.reload();
        });
    });

    $('#language-page-delete-language-as-spoken-confirm-modal-submit-button').on('click', function (event) {
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
        .done(function(response) {
            $('#language-page-delete-language-as-spoken-confirm-modal').modal('hide');
            location.reload();
        });
    });

    $('#language-page-delete-script-as-used-confirm-modal-submit-button').on('click', function (event) {
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
        .done(function(response) {
            $('#language-page-delete-script-as-used-confirm-modal').modal('hide');
            location.reload();
        });
    });

    // ====================================================================================
    //                            Validation and input safety
    // ====================================================================================
    // Language creation modal
    $('#add-language-modal').ready(function() {
        var invalidValues = false;
        $('#add-language-modal .input-required').each(function() {
            if ($(this).attr('id') == 'add-language-modal-isocode-field') {
                if ($(this).val().length != 3) {
                    invalidValues = true;
                }
            } else if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#add-language-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#add-language-modal-submit-button').removeAttr('disabled');
        }
    });
    $('#add-language-modal .input-required').on('keyup keydown change', function(event) {
        if ((event.type == 'keydown' || event.type == 'change') && $(this).hasClass('invalid-input')) {
            $(this).removeClass('invalid-input');
            $(this).next().addClass('hidden');
            $(this).next().find('.error-message').text('');
        }
        var invalidValues = false;
        $('#add-language-modal .input-required').each(function() {
            if ($(this).attr('id') == 'add-language-modal-isocode-field') {
                if ($(this).val().length != 3) {
                    invalidValues = true;
                }
            } else if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#add-language-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#add-language-modal-submit-button').removeAttr('disabled');
        }
    });

    // Language edit modal
    $('#edit-language-modal').ready(function() {
        var invalidValues = false;
        $('#edit-language-modal .input-required').each(function() {
            if ($(this).attr('id') == 'edit-language-modal-isocode-field') {
                if ($(this).val().length != 3) {
                    invalidValues = true;
                }
            } else if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#edit-language-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#edit-language-modal-submit-button').removeAttr('disabled');
        }
    });
    $('#edit-language-modal .input-required').on('keyup keydown change', function(event) {
        if ((event.type == 'keydown' || event.type == 'change') && $(this).hasClass('invalid-input')) {
            $(this).removeClass('invalid-input');
            $(this).next().addClass('hidden');
            $(this).next().find('.error-message').text('');
        }
        var invalidValues = false;
        $('#edit-language-modal .input-required').each(function() {
            if ($(this).attr('id') == 'edit-language-modal-isocode-field') {
                if ($(this).val().length != 3) {
                    invalidValues = true;
                }
            } else if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#edit-language-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#edit-language-modal-submit-button').removeAttr('disabled');
        }
    });

    // Add dialect
    $('#add-dialect-modal').ready(function() {
        var invalidValues = false;
        $('#add-dialect-modal .input-required').each(function() {
            if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#add-dialect-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#add-dialect-modal-submit-button').removeAttr('disabled');
        }
    });
    $('#add-dialect-modal .input-required').on('keyup keydown change', function(event) {
        if ((event.type == 'keydown' || event.type == 'change') && $(this).hasClass('invalid-input')) {
            $(this).removeClass('invalid-input');
            $(this).next().addClass('hidden');
            $(this).next().find('.error-message').text('');
        }
        var invalidValues = false;
        $('#add-dialect-modal .input-required').each(function() {
            if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#add-dialect-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#add-dialect-modal-submit-button').removeAttr('disabled');
        }
    });

    // Add country for national languages modal
    $('#language-page-add-language-as-national-modal').ready(function() {
        var invalidValues = false;
        $('#language-page-add-language-as-national-modal .input-required').each(function() {
            if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#language-page-add-language-as-national-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#language-page-add-language-as-national-modal-submit-button').removeAttr('disabled');
        }
    });
    $('#language-page-add-language-as-national-modal .input-required').on('keyup keydown change', function(event) {
        if ((event.type == 'keydown' || event.type == 'change') && $(this).hasClass('invalid-input')) {
            $(this).removeClass('invalid-input');
            $(this).next().addClass('hidden');
            $(this).next().find('.error-message').text('');
        }
        var invalidValues = false;
        $('#language-page-add-language-as-national-modal .input-required').each(function() {
            if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#language-page-add-language-as-national-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#language-page-add-language-as-national-modal-submit-button').removeAttr('disabled');
        }
    });

    // Add countries that speak the language modal
    $('#language-page-add-language-as-spoken-modal').ready(function() {
        var invalidValues = false;
        $('#language-page-add-language-as-spoken-modal .input-required').each(function() {
            if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#language-page-add-language-as-spoken-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#language-page-add-language-as-spoken-modal-submit-button').removeAttr('disabled');
        }
    });
    $('#language-page-add-language-as-spoken-modal .input-required').on('keyup keydown change', function(event) {
        if ((event.type == 'keydown' || event.type == 'change') && $(this).hasClass('invalid-input')) {
            $(this).removeClass('invalid-input');
            $(this).next().addClass('hidden');
            $(this).next().find('.error-message').text('');
        }
        var invalidValues = false;
        $('#language-page-add-language-as-spoken-modal .input-required').each(function() {
            if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#language-page-add-language-as-spoken-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#language-page-add-language-as-spoken-modal-submit-button').removeAttr('disabled');
        }
    });

    // Add scripts used for this language
    $('#language-page-add-language-uses-script-modal').ready(function() {
        var invalidValues = false;
        $('#language-page-add-language-uses-script-modal .input-required').each(function() {
            if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#language-page-add-language-uses-script-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#language-page-add-language-uses-script-modal-submit-button').removeAttr('disabled');
        }
    });
    $('#language-page-add-language-uses-script-modal .input-required').on('keyup keydown change', function(event) {
        if ((event.type == 'keydown' || event.type == 'change') && $(this).hasClass('invalid-input')) {
            $(this).removeClass('invalid-input');
            $(this).next().addClass('hidden');
            $(this).next().find('.error-message').text('');
        }
        var invalidValues = false;
        $('#language-page-add-language-uses-script-modal .input-required').each(function() {
            if ($(this).val().length < 1) {
                invalidValues = true;
            }
        });
        if (invalidValues) {
            $('#language-page-add-language-uses-script-modal-submit-button').attr('disabled', 'disabled');
        } else {
            $('#language-page-add-language-uses-script-modal-submit-button').removeAttr('disabled');
        }
    });

    // ====================================================================================
    //                                  Clearing modal values
    // ====================================================================================
    $('#add-language-modal').on('hidden.bs.modal', function() {
        $('input#add-language-modal-isocode-field').val('');
        $('input#add-language-modal-name-field').val('');
        $('input#add-language-modal-population-field').val('');
        $(this).find('.input-required').removeClass('invalid-input');
        $(this).find('.error-message-div').addClass('hidden');
        $(this).find('.error-message').text('');
        $(this).find('button[id*="submit-button"]').attr('disabled', 'disabled');
    });
    $('#add-dialect-modal').on('hidden.bs.modal', function() {
        $('input#add-dialect-modal-name-field').val('');
        $(this).find('.input-required').removeClass('invalid-input');
        $(this).find('.error-message-div').addClass('hidden');
        $(this).find('.error-message').text('');
        $(this).find('button[id*="submit-button"]').attr('disabled', 'disabled');
    });
    $('#language-page-add-language-as-national-modal').on('hidden.bs.modal', function() {
        $('select#language-page-add-language-as-national-modal-select-field').val('');
        $(this).find('.input-required').removeClass('invalid-input');
        $(this).find('.error-message-div').addClass('hidden');
        $(this).find('.error-message').text('');
        $(this).find('button[id*="submit-button"]').attr('disabled', 'disabled');
    });
    $('#language-page-add-language-as-spoken-modal').on('hidden.bs.modal', function() {
        $('select#language-page-add-language-as-spoken-modal-select-field').val('');
        $(this).find('.input-required').removeClass('invalid-input');
        $(this).find('.error-message-div').addClass('hidden');
        $(this).find('.error-message').text('');
        $(this).find('button[id*="submit-button"]').attr('disabled', 'disabled');
    });
    $('#language-page-add-language-uses-script-modal').on('hidden.bs.modal', function() {
        $('select#language-page-add-language-uses-script-modal-select-field').val('');
        $(this).find('.input-required').removeClass('invalid-input');
        $(this).find('.error-message-div').addClass('hidden');
        $(this).find('.error-message').text('');
        $(this).find('button[id*="submit-button"]').attr('disabled', 'disabled');
    });
});