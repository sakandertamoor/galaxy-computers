   
document.addEventListener('DOMContentLoaded', function(e) {
    FormValidation.formValidation(
        document.getElementById('designation_form'),
        {
            fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: 'Designation Name is required'
                        },
                        regexp: {
                            regexp: /^[a-zs ]+$/i,
                            message: 'Designation must consist of alphabetical characters and spaces only'
                        },
                        stringLength: {
                            min: 3,
                            max: 50,
                            message: 'Designation must be more than 3 and less than 50 characters long'
                        },
                        
                    },
                    status: {
                        validators: {
                            notEmpty: {
                                message: 'The status type is required'
                            }
                        }
                    }
                }
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