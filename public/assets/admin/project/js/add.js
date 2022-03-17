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


$(document).ready(function() {
 
    $('.select2-dropdown').select2({
        width: '100%'
    });

    $('#tel_number').mask('(000) 000-0000');
    $('#contact_number').mask('(000) 000-0000');
    $('#cell').mask('(000) 000-0000');
});
var dateFormate  = 'yy/mm/dd';
var currentDate = new Date();
$("#start_date").datepicker({dateFormat: dateFormate});
$("#end_date").datepicker({dateFormat: dateFormate});
$("#start_date").val($.datepicker.formatDate(dateFormate, currentDate));
$("#end_date").val($.datepicker.formatDate(dateFormate, currentDate));


    document.addEventListener('DOMContentLoaded', function(e) {
    FormValidation.formValidation(
    document.getElementById('project_form'),
    {
        fields: {
            number: {
                validators: {
                    notEmpty: {
                        message: 'Project Number is required'
                    },
                    // regexp: {
                    //     regexp: /^[^a-zA-Z][a-zA-Z0-9-]*/,
                    //     message: 'Project Should not start with ET'
                    // }

                }
            },
            phase: {
                validators: {
                    stringLength: {
                        max: 2,
                        message: 'Phase should be only two characters'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z.][ a-zA-Z.]*$/,
                        message: 'Phase should be only alphabetical characters'
                    }
                   
                }
            },
            name: {
                validators: {
                    notEmpty: {
                        message: 'Project name is required'
                    },

                }
            },
            company_name: {
                validators: {
                    notEmpty: {
                        message: 'Company name is required'
                    },
                    // regexp: {
                    //     regexp: /^[a-zA-Z.][ a-zA-Z0-9.]*$/,
                    //     message: 'Company name can consist of alphabetical characters and numbers only'
                    // }

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
            technician: {
                validators: {
                    numeric: {
                        // The default separators
                        thousandsSeparator: '',
                        decimalSeparator: '.'
                    },
                    regexp: {
                        regexp: /^[0-9][0-9.]*$/,
                        // message: 'technician must be a positive number'
                    },
                    notEmpty: {
                        // message: 'technician is required'
                    },
                }
            },
            senior_technician: {
                validators: {
                    numeric: {
                        // message: 'senior technician value must be a numeric',
                        // The default separators
                        thousandsSeparator: '',
                        decimalSeparator: '.'
                    },
                    regexp: {
                        regexp: /^[0-9][0-9.]*$/,
                        // message: 'senior technician must be a positive number'
                    },
                    notEmpty: {
                        // message: 'senior technician is required'
                    },
                }
            },
            manager_of_field_services: {
                validators: {
                    numeric: {
                        // message: 'must be a numeric value',
                        // The default separators
                        thousandsSeparator: '',
                        decimalSeparator: '.'
                    },
                    regexp: {
                        regexp: /^[0-9][0-9.]*$/,
                        // message: 'must be a positive number'
                    },
                    notEmpty: {
                        // message: 'required'
                    },
                }
            },
            engineer: {
                validators: {
                    numeric: {
                        // message: 'must be a numeric value',
                        // The default separators
                        thousandsSeparator: '',
                        decimalSeparator: '.'
                    },
                    regexp: {
                        regexp: /^[0-9][0-9.]*$/,
                        // message: 'must be a positive number'
                    },
                    notEmpty: {
                        // message: 'required'
                    },
                }
            },
            senior_engineer: {
                validators: {
                    numeric: {
                        // message: 'must be a numeric value',
                        // The default separators
                        thousandsSeparator: '',
                        decimalSeparator: '.'
                    },
                    regexp: {
                        regexp: /^[0-9][0-9.]*$/,
                        // message: 'must be a positive number'
                    },
                    notEmpty: {
                        // message: 'required'
                    },
                }
            },
            principal_engineer: {
                validators: {
                    numeric: {
                        // message: 'must be a numeric value',
                        // The default separators
                        thousandsSeparator: '',
                        decimalSeparator: '.'
                    },
                    regexp: {
                        regexp: /^[0-9][0-9.]*$/,
                        // message: 'must be a positive number'
                    },
                    notEmpty: {
                        // message: 'required'
                    },
                }
            },
            mileage: {
                validators: {
                    numeric: {
                        // message: 'must be a numeric value',
                        // The default separators
                        thousandsSeparator: '',
                        decimalSeparator: '.'
                    },
                    regexp: {
                        regexp: /^[0-9][0-9.]*$/,
                        // message: 'must be a positive number'
                    },
                    notEmpty: {
                        // message: 'required'
                    },
                }
            },
            // project_picture: {
            //     validators: {
            //         notEmpty: {
            //             message: 'Project file is required'
            //         },

            //     }
            // },

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
});
