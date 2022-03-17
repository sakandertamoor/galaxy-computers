   

$(document).ready(function () {
   
    $('.select2-dropdown').select2({
        width: '100%',
        placeholder: "Select an option",
        allowClear: true
    });

    $("#date").datepicker({dateFormat:'yy-mm-dd'});

});

$('#kilometers').on("keypress keyup blur",function (event) {
     prKmRate = $('#project option:selected').data('rate');
     totalMileageAmount = $(this).val()*parseFloat(prKmRate);
     if(isNaN(totalMileageAmount))
     {
        totalMileageAmount = 0.0;
     }
     $('#mileage_amount').text('$ '+totalMileageAmount.toFixed(2));
     $('#kilometers_amount').val(totalMileageAmount.toFixed(2));
    
 });

document.addEventListener('DOMContentLoaded', function(e) {
    FormValidation.formValidation(
        document.getElementById('field_form'),
        {
            fields: {
                date: {
                    validators: {
                        notEmpty: {
                            message: 'Date is required'
                        },
                        date: {
                            format: 'YYYY-MM-DD',
                          
                        },
                    }
                },
                project: {
                    validators: {
                        notEmpty: {
                            message: 'Project is required'
                        },
                    }
                },
                activity: {
                    validators: {
                        notEmpty: {
                            message: 'Activity is required'
                        },
                    }
                },
                total_time: {
                    validators: {
                        notEmpty: {
                            message: 'Total time is required'
                        },
                        numeric: {
                            message: 'Hours can be in numbers only.'
                        },
                        between: {
                            min: 1,
                            max: 20,
                            message: 'Total time must be between 1-20 (hrs)'
                        },
                    }
                },
                expense: {
                    validators: {
                        numeric: {
                            message: 'Expense can be a numbers only.',
                            
                        },
                        greaterThan: {
                            message: 'The Expense must be greater than or equal to 0',
                            min: 0,
                        }
                       
                        
                        
                    }
                },

                kilometers: {
                    validators: {
                        greaterThan: {
                            message: 'The kilometers must be a positive number',
                            min: 0,
                        }
                    }
                },
                'image[]': {
                    validators: {
                        file: {
                            extension: 'jpeg,jpg,png,svg,gif',
                            type: 'image/jpeg,image/png,image/svg,image/gif',
                           // maxSize: 2097152,   // 2048 * 1024
                            message: 'Only jpeg,jpg,gif,svg and png file are allowed'
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