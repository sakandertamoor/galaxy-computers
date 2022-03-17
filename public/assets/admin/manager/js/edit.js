// Add the following code if you want the name of the file appear on select

$(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

// Phone Number with country code

$("#phone").intlTelInput({
    autoHideDialCode: false,
    nationalMode: false,
});

$(document).ready(function () {


    // $('#phone').mask('(000) 000-0000');

    $("#dob").datepicker({dateFormat: 'yy-mm-dd'});

    $('.select2-dropdown').select2({
        width: '100%'
    });

});

// formvalidation.io

document.addEventListener('DOMContentLoaded', function (e) {
    const fv = FormValidation.formValidation(
        document.getElementById('manager_form'),
        {
            fields: {
                first_name: {
                    validators: {
                        notEmpty: {
                            message: 'First name is required'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z ]*$/,
                            message: 'Name can consist of alphabetical characters and spaces only'
                        }
                    }
                },
                middle_name: {
                    validators: {
                        regexp: {
                            regexp: /^[a-zA-Z ]*$/,
                            message: 'Name can consist of alphabetical characters and spaces only'
                        }
                    }
                },
                last_name: {
                    validators: {
                        notEmpty: {
                            message: 'Last name is required'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z ]*$/,
                            message: 'Name can consist of alphabetical characters and spaces only'
                        }
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: 'Email is required'
                        },
                        emailAddress: {
                            message: 'The value is not a valid email address'
                        }
                    }
                },
                original_password: {
                    validators: {
                        notEmpty: {
                            message: 'Password  is required'
                        },
                        stringLength: {
                            min: 3,
                            max: 50,
                            message: 'The password must be more than 3 and less than 50 characters long'
                        },
                    }
                },
                phone: {
                    validators: {
                        notEmpty: {
                            message: 'Phone is required'
                        },
                        stringLength: {
                            min: 10,
                            max: 13,
                            message: 'Phone  must be of 10 - 13 digits'
                        },
                        regexp: {
                            regexp: /^[0-9 +]*$/,
                            message: 'Phone must be in numbers only'
                        }
                    }
                },
                dob: {
                    validators: {
                        date: {
                            format: 'YYYY-MM-DD',
                            message: 'The value is not a valid date',
                        }
                    }
                },
              
                image: {
                    validators: {
                        file: {
                            extension: 'jpeg,jpg,png',
                            type: 'image/jpeg,image/png',
                            message: 'Image must be PNG/JPG'
                        }
                    },
                },

            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap: new FormValidation.plugins.Bootstrap(),
                submitButton: new FormValidation.plugins.SubmitButton(),
                defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
                icon: new FormValidation.plugins.Icon({
                    valid: 'fa fa-check',
                    invalid: 'fa fa-times',
                    validating: 'fa fa-refresh',
                }),

            },
        }
    );

    $('#dob').on('change', function () {
        fv.revalidateField('dob');
    });
   
});
