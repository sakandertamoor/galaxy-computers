// Add the following code if you want the name of the file appear on select
// formvalidation.io
document.addEventListener('DOMContentLoaded', function (e) {
    const fv = FormValidation.formValidation(
        document.getElementById('client_form'),
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
                address: {
                    validators: {
                        notEmpty: {
                            message: 'Address is required'
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
