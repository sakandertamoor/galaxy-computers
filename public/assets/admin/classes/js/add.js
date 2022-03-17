document.addEventListener('DOMContentLoaded', function (e) {
    FormValidation.formValidation(
        document.getElementById('class_form'),
        {
            fields: {
                class: {
                    validators: {
                        notEmpty: {
                            message: 'Class name is required'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z ]*$/,
                            message: 'Class name can consist of alphabetical characters only and spaces only'
                        }
                    }
                },
                charges: {
                    validators: {
                        notEmpty: {
                            message: 'Rate is required'
                        },
                        numeric: {
                            message: 'Rate must be a numeric value',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.',
                        },
                        greaterThan: {
                            message: 'Rate must be greater than or equal to 0',
                            min: 0,
                        }
                    }
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
});
