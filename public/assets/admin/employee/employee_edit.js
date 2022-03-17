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
    $('#state').select2({
        tags: true
    });
    $('#city').select2({
        tags: true
    });


});

// formvalidation.io

document.addEventListener('DOMContentLoaded', function (e) {
    const fv = FormValidation.formValidation(
        document.getElementById('employee_form'),
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
                status: {
                    validators: {
                        notEmpty: {
                            message: 'Status is required'
                        },
                    }
                },
                internal_rate: {
                    validators: {
                        /* notEmpty: {
                            message: 'Internal rate is required'
                        }, */
                        numeric: {
                            message: 'Internal rate must be in numbers'
                        },
                        between: {
                            min: 0,
                            max: 10000,
                            message: 'Internal rate must be between 0 to 10000'
                        }
                    }
                },
                charge_out_rate: {
                    validators: {
                       /*  notEmpty: {
                            message: 'Charge out rate is required'
                        }, */
                        numeric: {
                            message: 'Charge out rate must be in numbers'
                        },
                        between: {
                            min: 0,
                            max: 5000,
                            message: 'Charge out rate must be between 0 to 5000'
                        }
                    }
                },
               /*  class: {
                    validators: {
                        notEmpty: {
                            message: 'Class is required'
                        },
                    }
                }, */
                designation: {
                    validators: {
                        notEmpty: {
                            message: 'Designation is required'
                        },
                    }
                },
               /*  address: {
                    validators: {
                        notEmpty: {
                            message: 'Address is required'
                        },
                    }
                }, */
                country: {
                    validators: {
                        notEmpty: {
                            message: 'Country is required'
                        },
                    }
                },
                state: {
                    validators: {
                        notEmpty: {
                            message: 'State is required'
                        },
                    }
                },
                city: {
                    validators: {
                        notEmpty: {
                            message: 'City is required'
                        },
                    }
                },
                zip_code: {
                    validators: {
                        /* notEmpty: {
                            message: 'Zip code is required'
                        }, */
                        regexp: {
                            regexp: /^[a-zA-Z0-9]*$/,
                            message: 'Zip code can consist of alphabetical characters and numbers only'
                        },
                        stringLength: {
                            max: 6,
                            min: 3,
                            message: 'Zip code length must be between 3-6'
                        },
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
    $('#state').on('change', function () {
        fv.revalidateField('state');
    });
    $('#city').on('change', function () {
        fv.revalidateField('city');
    });
});
