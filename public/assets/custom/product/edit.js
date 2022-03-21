// Add the following code if you want the name of the file appear on select

$(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#viewimage')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
$(document).ready(function () {
    $('.select2-dropdown').select2({
        width: '100%',
    });
});

// formvalidation.io

document.addEventListener('DOMContentLoaded', function (e) {
    const fv = FormValidation.formValidation(
        document.getElementById('Product_form'),
        {
            fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z ]*$/,
                            message: 'Name can consist of alphabetical characters and spaces only'
                        }
                    }
                },
                quantity: {
                    validators: {
                        notEmpty: {
                            message: 'Quantity is required'
                        },
                        numeric: {
                            message: 'Quantity must be in numbers'
                        },
                        between: {
                            min: 0,
                            max: 10000,
                            message: 'Quantity must be between 0 to 10000'
                        }
                    }
                },
                price: {
                    validators: {
                        notEmpty: {
                            message: 'Price is required'
                        },
                        numeric: {
                            message: 'Price must be in numbers'
                        }
                    }
                },
                category: {
                    validators: {
                        notEmpty: {
                            message: 'Cateogry is required'
                        },
                    }
                },
                image: {
                    validators: {
                        file: {
                            extension: 'jpeg,jpg,png',
                            type: 'image/jpeg,image/png,image/jpg',
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

    
});
