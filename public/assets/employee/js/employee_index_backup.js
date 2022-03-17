let filesToUpload1;
let filesToUpload = [];

$.fn.fileUploader = function (filesToUpload, sectionIdentifier) {
    var fileIdCounter = 0;

    let labTestNumbers = [];
    let labTestNumbersId = [];

    this.closest(".files").change(function (evt) {
        var output = [];

        for (var i = 0; i < evt.target.files.length; i++) {
            fileIdCounter++;
            var file = evt.target.files[i];
            var fileId = sectionIdentifier + fileIdCounter;

            filesToUpload.push({
                id: fileId,
                file: file
            });

            filesToUpload1 = filesToUpload;

            var removeLink = "<a class=\"removeFile\" href=\"#\" data-fileid=\"" + fileId + "\">Remove</a>";

            output.push("<li><strong>", escape(file.name), "</strong> - ", file.size, " bytes. &nbsp; &nbsp; ", removeLink, "</li> ");

            if (escape(file.name).substr(0, 1) == 'G' || escape(file.name).substr(0, 1) == 'C')
                labTestNumbers.push(escape(file.name).substr(0, 6));
            else
                labTestNumbers.push(escape(file.name).substr(0, 7));

        }


        $(this).children(".fileList")
            .append(output.join(""));

        $('#lab_test_no').val(labTestNumbers.join(','));
        $('#test_completed').val(labTestNumbers.length);

        //reset the input to null - nice little chrome bug!
        evt.target.value = null;
    });

    $(this).on("click", ".removeFile", function (e) {
        e.preventDefault();

        var fileId = $(this).parent().children("a").data("fileid");

        // loop through the files array and check if the name of that file matches FileName
        // and get the index of the match
        for (var i = 0; i < filesToUpload.length; ++i) {
            if (filesToUpload[i].id === fileId) {
                filesToUpload.splice(i, 1);
                labTestNumbers.splice(i, 1);
                filesToUpload1 = filesToUpload;
            }

        }

        $('#lab_test_no').val(labTestNumbers.join(','));
        $('#test_completed').val(labTestNumbers.length);
        $(this).parent().remove();
    });

    this.clear = function () {
        for (var i = 0; i < filesToUpload.length; ++i) {
            if (filesToUpload[i].id.indexOf(sectionIdentifier) >= 0) {
                filesToUpload.splice(i, 1);
                filesToUpload1 = filesToUpload;
            }
        }

        $(this).children(".fileList").empty();
    };

    return this;
};

(function () {


    let files1Uploader = $("#files1").fileUploader(filesToUpload, "files1");


    // $("#uploadBtn").click(function (e) {
    //     e.preventDefault();
    //
    //     var formData = new FormData();
    //
    //     for (var i = 0, len = filesToUpload.length; i < len; i++) {
    //         formData.append("files", filesToUpload[i].file);
    //     }
    //
    //     $.ajax({
    //         url: "http://requestb.in/1k0dxvs1",
    //         data: formData,
    //         processData: false,
    //         contentType: false,
    //         type: "POST",
    //         success: function (data) {
    //             alert("DONE");
    //
    //             files1Uploader.clear();
    //             files2Uploader.clear();
    //             files3Uploader.clear();
    //         },
    //         error: function (data) {
    //             alert("ERROR - " + data.responseText);
    //         }
    //     });
    // });
})();

// updateList = function() {
//     var input = document.getElementById('files');
//     var output = document.getElementById('fileList');
//     var children = "";
//     for (var i = 0; i < input.files.length; ++i) {
//         children += '<li>' + input.files.item(i).name + '</li>';
//     }
//     output.innerHTML = '<ul>'+children+'</ul>';
// }

// Display Project Datatables

$(function () {

    var table = $('#project-datatable').DataTable({
        processing: true,
        serverSide: true,
        ajax: project_datatables_path,
        columns: [
            {data: 'number'},
            {data: 'name'},
            {data: 'company_name'},
            {data: 'action'},
        ]
    });

});

var globalCurrentDate = new Date().toISOString().slice(0, 10);

function populateDate() {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const date = new Date();

    const dateFormat = 'yy-mm-dd';
    // const currentDate = date.getDate() + '-' + monthNames[date.getMonth()] + '-' + date.getFullYear();
    const currentDate = new Date().toISOString().slice(0, 10);


    $("#date").datepicker({dateFormat: dateFormat, maxDate: new Date});
    $("#date2").datepicker({dateFormat: dateFormat, maxDate: new Date});
    $("#date3").datepicker({dateFormat: dateFormat, maxDate: new Date});

    $('#date').val(currentDate);
    $('#date2').val(currentDate);
    $('#date3').val(currentDate);

}

function initializeSelect2() {
    $('.select2-dropdown').select2({
        width: '100%',
        placeholder: "Select an option",
        allowClear: true
    });
}

$(document).ready(function () {

    initializeSelect2();
    populateDate();

    $('input[type=radio][name=truck]').change(function () {
        if (this.value == 'yes') {
            $('#kilometers').prop('readonly', false);
            if ($('#kilometers').val() == '0') {
                $('#kilometers').val('');
            }
        } else if (this.value == 'no') {
            // $('#kilometers').val('0');
            // $('#kilometers').prop('readonly', true);
        }
    });


});


// It will select the project in the modal against which the Add Field/Lab/Expense button is clicked

function populateProjectDropdown(btn) {
    $('#project').css('pointer-events', 'none');
    $('#project option[value="' + $(btn).data("id") + '"]').prop('selected', true);

    $('#project2').css('pointer-events', 'none');
    $('#project2 option[value="' + $(btn).data("id") + '"]').prop('selected', true);

    $('#project3').css('pointer-events', 'none');
    $('#project3 option[value="' + $(btn).data("id") + '"]').prop('selected', true);

}

// formvalidation.io

var fieldfv;
var labfv;
var expensefv;

document.addEventListener('DOMContentLoaded', function (e) {

    // Field Form formvalidation.io and ajax call

    fieldfv = FormValidation.formValidation(
        document.getElementById('fieldForm'),
        {
            fields: {
                date: {
                    validators: {
                        notEmpty: {
                            message: 'Date is required'
                        },
                        date: {
                            format: 'YYYY-MM-DD',
                            min: '2020-01-01',
                            max: globalCurrentDate,
                            message: 'Date format must be dd-mm-yy & date cannot be future date.'
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
                remarks: {
                    validators: {
                        notEmpty: {
                            message: 'Remarks are required'
                        },
                    }
                },
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap: new FormValidation.plugins.Bootstrap(),
                submitButton: new FormValidation.plugins.SubmitButton(),
                // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
                icon: new FormValidation.plugins.Icon({
                    valid: 'fa fa-check',
                    invalid: 'fa fa-times',
                    validating: 'fa fa-refresh',
                }),

            },
        }
    ).on('core.form.valid', function () {
        // Send the form data to back-end
        // You need to grab the form data and create an Ajax request to send them

        $('#field-btn-submit').attr('disabled', 'disabled');

        $.ajax({
            type: 'POST',
            url: asset_path + 'employee/field/create',
            data: new FormData(document.getElementById('fieldForm')),
            processData: false,
            cache: false,
            contentType: false,
            // headers: {'X-CSRF-Token': '{{ csrf_token() }}'},
            success: function (data) {
                if (data.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Field work hours has been saved.',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#field-btn-submit').removeAttr('disabled');
                    $('#fieldModal').modal('toggle');
                }
                if (data.errors) {

                }
            }
        });
    });

    $('#activity1').on('change', function () {
        fieldfv.revalidateField('activity');
    });

    $('#date').on('change', function () {
        fieldfv.revalidateField('date');
    });


    // Lab Form formvalidation.io and ajax call

    labfv = FormValidation.formValidation(
        document.getElementById('labForm'),
        {
            fields: {
                date: {
                    validators: {
                        notEmpty: {
                            message: 'Date is required'
                        },
                        date: {
                            format: 'YYYY-MM-DD',
                            min: '2020-01-01',
                            max: globalCurrentDate,
                            message: 'Date format must be dd-mm-yy & date cannot be future date.'
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
                        between: {
                            min: 1,
                            max: 20,
                            message: 'Total time must be between 1-20 (hrs)'
                        },
                        numeric: {
                            message: 'Hrs must be in numbers'
                        },
                    }
                },
                remarks: {
                    validators: {
                        notEmpty: {
                            message: 'Remarks are required'
                        },
                    }
                },
                test_completed: {
                    validators: {
                        notEmpty: {
                            message: 'Test completed is required'
                        },
                        between: {
                            min: 1,
                            max: 10,
                            message: 'Test completed must be between 1-10'
                        },
                        numeric: {
                            message: 'Test completed must be in numbers'
                        }
                    }
                },
                sample_type: {
                    validators: {
                        notEmpty: {
                            message: 'Sample type is required'
                        },
                    }
                },
                // files1: {
                //     validators: {
                //         notEmpty: {
                //             message: 'Attachment is required'
                //         },
                //     }
                // },
                lab_test_no: {
                    validators: {
                        notEmpty: {
                            message: 'Lab Test No is required'
                        },
                    }
                },
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap: new FormValidation.plugins.Bootstrap(),
                submitButton: new FormValidation.plugins.SubmitButton(),
                // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
                icon: new FormValidation.plugins.Icon({
                    valid: 'fa fa-check',
                    invalid: 'fa fa-times',
                    validating: 'fa fa-refresh',
                }),

            },
        }
    ).on('core.form.valid', function () {
        // Send the form data to back-end
        // You need to grab the form data and create an Ajax request to send them

        // $('#lab-btn-submit').attr('disabled', 'disabled');

        let formData = new FormData(document.getElementById('labForm'));

        console.log(filesToUpload);

        for (let i = 0, len = filesToUpload.length; i < len; i++) {
            formData.append("files1[]", filesToUpload[i].file);
        }

        $.ajax({
            type: 'POST',
            url: asset_path + 'employee/lab/create',
            data: formData,
            processData: false,
            cache: false,
            contentType: false,
            // headers: {'X-CSRF-Token': '{{ csrf_token() }}'},
            success: function (data) {
                if (data.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Lab work hours has been saved.',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#lab-btn-submit').removeAttr('disabled');
                    $('#labModal').modal('toggle');
                }
                if (data.errors) {

                }
            }
        });
    });

    $('#sample_type').on('change', function () {
        labfv.revalidateField('sample_type');
    });

    $('#activity2').on('change', function () {
        labfv.revalidateField('activity');
    });

    $('#date2').on('change', function () {
        labfv.revalidateField('date');
    });


    // Expense Form formvalidation.io and ajax call

    expensefv = FormValidation.formValidation(
        document.getElementById('expenseForm'),
        {

            fields: {
                date: {
                    validators: {
                        notEmpty: {
                            message: 'Date is required'
                        },
                        date: {
                            format: 'YYYY-MM-DD',
                            min: '2020-01-01',
                            max: globalCurrentDate,
                            message: 'Date format must be dd-mm-yy & date cannot be future date.'
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
                kilometers: {
                    validators: {
                        notEmpty: {
                            message: 'Kilometers are required'
                        },
                        numeric: {
                            message: 'Kilometers must be in numbers'
                        },
                        between: {
                            min: 0,
                            max: 1000,
                            message: 'Kilometers must be between 0-1000'
                        },
                    }
                },
                remarks: {
                    validators: {
                        notEmpty: {
                            message: 'Remarks are required'
                        },
                    }
                },
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap: new FormValidation.plugins.Bootstrap(),
                submitButton: new FormValidation.plugins.SubmitButton(),
                // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
                icon: new FormValidation.plugins.Icon({
                    valid: 'fa fa-check',
                    invalid: 'fa fa-times',
                    validating: 'fa fa-refresh',
                }),

            },
        }
    ).on('core.form.valid', function () {
        // Send the form data to back-end
        // You need to grab the form data and create an Ajax request to send them

        $('#expense-btn-submit').attr('disabled', 'disabled');

        $.ajax({
            type: 'POST',
            url: asset_path + 'employee/expense/create',
            data: new FormData(document.getElementById('expenseForm')),
            processData: false,
            cache: false,
            contentType: false,
            // headers: {'X-CSRF-Token': '{{ csrf_token() }}'},
            success: function (data) {
                if (data.success) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Expense work hours has been saved.',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#expense-btn-submit').removeAttr('disabled');
                    $('#expenseModal').modal('toggle');
                }
                if (data.errors) {

                }
            }
        });
    });

    $('#activity3').on('change', function () {
        expensefv.revalidateField('activity');
    });

    $('#date3').on('change', function () {
        expensefv.revalidateField('date');
    });


});

// On modal close, reset form

$('#fieldModal').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset();
    $('#blah').attr('src', '');
    $('.custom-file-label').text('Choose File');
    initializeSelect2();
    // $('.select2-dropdown').val('').trigger('change');
    fieldfv.resetForm(true);
    fieldfv.resetField('activity');
    populateDate();
    $('#field-btn-submit').removeAttr('disabled');
});

$('#labModal').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset();
    $('#blah').attr('src', '');
    initializeSelect2();
    $('.custom-file-label').text('Choose File');
    labfv.resetForm(true);
    populateDate();
    $('#lab-btn-submit').removeAttr('disabled');
});

$('#expenseModal').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset();
    $('#blah').attr('src', '');
    initializeSelect2();
    $('.custom-file-label').text('Choose File');
    expensefv.resetForm(true);
    populateDate();
    $('#expense-btn-submit').removeAttr('disabled');
});
