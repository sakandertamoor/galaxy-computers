   

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

            var removeLink = "<a class='removeFile btn btn-danger btn-sm' href=\"#\" data-fileid=\"" + fileId + "\">Remove</a>";

            output.push("<li><strong>", file.name, "</strong> - ", file.size, " bytes. &nbsp; &nbsp; ", removeLink, "</li>&nbsp; ");

            if (escape(file.name).substr(0, 1) == 'A' || escape(file.name).substr(0, 1) == 'C' || escape(file.name).substr(0, 1) == 'G' || escape(file.name).substr(0, 1) == 'P')
            labTestNumbers.push(escape(file.name).substr(0, escape(file.name).search('%20')));

        }


        $(this).children(".fileList")
            .append(output.join(""));

        $('#lab_test_no').val(labTestNumbers.join(', '));
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

})();



$(document).ready(function () {
   
    $('.select2-dropdown').select2({
        width: '100%',
        placeholder: "Select an option",
        allowClear: true
    });

    $("#date").datepicker({dateFormat:'yy-mm-dd'});

});



   // Lab Form formvalidation.io and ajax call
document.addEventListener('DOMContentLoaded', function(e) {
  

    labfv = FormValidation.formValidation(
        document.getElementById('lab_form'),
        {
            fields: {
                date: {
                    validators: {
                        notEmpty: {
                            message: 'Date is required'
                        },
                        date: {
                            format: 'YYYY-MM-DD',
                            message: 'Date format must be dd-mm-yy.'
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
                lab_test_no: {
                    validators: {
                        notEmpty: {
                            message: 'Lab Test No is required'
                        },
                    }
                },
                // 'files1[]': {
                //     validators: {
                //         notEmpty: {
                //             message: 'Attachment is required'
                //         },
                //     }
                // }
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
    )
    
    $('#sample_type').on('change', function () {
        labfv.revalidateField('sample_type');
    });
    
    $('#activity').on('change', function () {
        labfv.revalidateField('activity');
    });
    
    $('#date').on('change', function () {
        labfv.revalidateField('date');
    });
    
    $('#files1').on('change', function () {
        labfv.revalidateField('lab_test_no');
        labfv.revalidateField('test_completed');
    });
    
});