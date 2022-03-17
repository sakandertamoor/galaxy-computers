document.addEventListener('DOMContentLoaded', function(e) {
    FormValidation.formValidation(
        document.getElementById('lab_test_form'),
        {
            fields: {
                test: {
                    validators: {
                        regexp: {
                            regexp: /^[a-zs ]+$/i,
                            message: 'Test Name must consist of alphabetical characters and spaces only'
                        },
                        notEmpty: {
                            message: 'Test Name is required'
                        },
                        
                    }
                },
                lookup: {
                    validators: {
                        regexp: {
                            regexp: /^[a-zs]+$/i,
                            message: 'Lookup must consist of alphabetical characters only'
                        },
                        notEmpty: {
                            message: 'Lookup is required'
                        },
                        
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