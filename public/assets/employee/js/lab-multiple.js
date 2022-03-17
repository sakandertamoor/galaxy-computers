$(document).ready(function () {

    initializeSelect2();
    populateDate();

});

function initializeSelect2() {
    $('.select2-dropdown').select2({
        width: '100%',
        placeholder: "Select an option",
        allowClear: true
    });
}

function populateDate() {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const date = new Date();

    const dateFormat = 'yy-mm-dd';
    // const currentDate = date.getDate() + '-' + monthNames[date.getMonth()] + '-' + date.getFullYear();
    const currentDate = new Date().toISOString().slice(0, 10);

    // $("#date").datepicker({dateFormat:'yy-mm-dd',minDate:weekStartDate ,maxDate:weekEndDate});
    // $('#date').val(currentDate);
    // $("#date2").datepicker({dateFormat:'yy-mm-dd',minDate:weekStartDate ,maxDate:weekEndDate});
    $('#date2').val(fixedDate);

}

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

            output.push("<li><strong>", file.name, "</strong> - ", file.size, " bytes. &nbsp; &nbsp; ", removeLink, "</li> ");

            if (escape(file.name).substr(0, 1) == 'A' || escape(file.name).substr(0, 1) == 'C' || escape(file.name).substr(0, 1) == 'G' || escape(file.name).substr(0, 1) == 'P')
            labTestNumbers.push(escape(file.name).substr(0, escape(file.name).search('%20')));

        }


        $(this).children(".fileList")
            .append(output.join(""));

        $('#lab_test_no').val(labTestNumbers.join(', '));
        $('#test_completed').val(labTestNumbers.length);

        //reset the input to null - nice little chrome bug!
        // evt.target.value = null;
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

/*************************************************************************************/


// append labwork
$('#add_more_labwork').on("click", function () {
  
    const currentDate = new Date().toISOString().slice(0, 10);
    var dt = new Date();
    var time = dt.getSeconds();
    var rowCount = $('.laboratory-work tr').length+time;
    
    // let filesToUpload1;
    // let filesToUpload = [];
    // $.ajax({
    //     type: 'GET',
    //     url: asset_path + 'getProjectAndActivities',
    //     processData: false,
    //     cache: false,
    //     contentType: false,
    //     // headers: {'X-CSRF-Token': '{{ csrf_token() }}'},
    //     success: function (data) {
    //         if (data)
    //         {
    //             projects = data.projects;
    //             labActivities = data.labActivities;
    //             testsTypes = data.testTypes;
                var projectOptions = '<option value="">Select an option</option>';
                var activityOptions = '<option value="">Select an option</option>';
                var sampleTypeOptions  = '<option value="">Select an option</option>';
                $.each(projects,function(index,value){
                    projectOptions+='<option value= '+value.id+'>'+value.number+' | '+value.name+ '</option> ';
                })
                $.each(labActivities,function(index,value){
                    activityOptions+='<option value= '+value.id+'>'+value.name+'</option> ';
                })
                $.each(testsTypes,function(index,value){
                   // sampleTypeOptions+='<option value= '+value.id+'>'+value.code+' | '+value.name+'</option> ';
                })

                fieldWorkHtml =   ' <tr>\
                            <td>\
                            <input id="date_'+rowCount+'" readOnly type="text" class="form-control" name="date[]" data-date="'+rowCount+'" required autocomplete="date" autofocus>\
                            </td>\
                            <td>\
                            <select id="project_'+rowCount+'" class="form-control select2-dropdown" name="project[]" data-project="'+rowCount+'" required autocomplete="project" autofocus>'+projectOptions+'</select>\
                            </td>\
                            <td>\
                            <select id="activity_'+rowCount+'" class="form-control select2-dropdown" name="activity[]" data-activity="'+rowCount+'" required autocomplete="activity" autofocus>'+activityOptions+'</select>\
                            </td>\
                            <td>\
                            <select id="sample_type_'+rowCount+'" class="form-control select2-dropdown" name="sample_type[]" data-sample="'+rowCount+'" required autocomplete="sample_type" autofocus>'+sampleTypeOptions+'</select>\
                            </td>\
                            <td>\
                            <input id="remarks_'+rowCount+'" type="textarea"  class="form-control" name="remarks[]" data-remarks="'+rowCount+'"  required autocomplete="remarks" autofocus>\
                            </td>\
                            <td>\
                            <div class="files'+rowCount+'" id="files'+rowCount+'">\
                            <span class="btn btn-default btn-file">\
                                <input type="file" multiple id="files1_'+rowCount+'" data-file="'+rowCount+'" required name="files1[]">\
                            </span>\
                             <ul class="fileList'+rowCount+' custom-ul"></ul>\
                            </td>\
                            <td>\
                              <input id="lab_test_no_'+rowCount+'" type="text" class="form-control" name="lab_test_no[]" data-test="'+rowCount+'" required autocomplete="lab_test_no" autofocus>\
                            </td>\
                            <td>\
                              <input id="test_completed_'+rowCount+'" type="text"  class="form-control" name="test_completed[]" data-completed="'+rowCount+'" required autocomplete="test_completed" autofocus>\
                            </td>\
                            <td><button class="btn btn-sm btn-danger remove-lab-work" type="button">X</button></td>\
                            </tr>';
                $('.laboratory-work ').append(fieldWorkHtml);
                // $("#date_"+rowCount).datepicker({dateFormat:'yy-mm-dd',minDate:weekStartDate ,maxDate:weekEndDate});
                $("#date_"+rowCount).val(fixedDate);
                initializeSelect2();
                $('#add_more_labwork').attr('disabled', 'disabled');
                $('.remove-lab-work').on("click", function () {
                    $(this).parent().parent().remove();
                    checkValidation();
                    $('#lab-btn-submit').removeAttr('disabled');
                    if($(".remove-lab-work").length){
                       
                        $('#lab-btn-submit').attr('disabled', 'disabled');
                        $('#add_more_labwork').attr('disabled', 'disabled');
                    }else{
                        $('#lab-btn-submit').removeAttr('disabled');
                        $('#add_more_labwork').removeAttr('disabled');
                    }
                    
                    lastProjectNumber = $('.laboratory-work tr:last').find('td:eq(1)').find('select').val();
                    lastActivity = $('.laboratory-work tr:last').find('td:eq(2)').find('select').val();
                    lastSampleType = $('.laboratory-work tr:last').find('td:eq(3)').find('select').val();
                    lastLabTestNumber = $('.laboratory-work tr:last').find('td:eq(6)').find('input').val(); 
                    lastTestCompleted = $('.laboratory-work tr:last').find('td:eq(7)').find('input').val();  
                    checkLastRowValidation();
                });

                function checkLastRowValidation()
                {
                    if(!isNaN(lastProjectNumber) &&  !isNaN(lastActivity) &&  !isNaN(lastSampleType) && lastLabTestNumber.length>0 && lastTestCompleted.length>0)
                    {
                        $('#lab-btn-submit,#add_more_labwork').removeAttr('disabled');
                       
                    }else{
                        $('#lab-btn-submit,#add_more_labwork').attr('disabled', 'disabled');
                    }
                }

                //###################################################//


                var fileIdCounter = 0;

                let labTestNumbers = [];
                let labTestNumbersId = [];
                var fileList =0;
                $(".files"+rowCount).change(function (evt) {
                    var output = [];
                    for (var i = 0; i < evt.target.files.length; i++) {
                        fileIdCounter++;
                        var file = evt.target.files[i];
                        var fileId = 'files'+rowCount + fileIdCounter;

                        filesToUpload.push({
                            id: fileId,
                            file: file
                        });

                        filesToUpload1 = filesToUpload;

                        if (escape(file.name).substr(0, 1) == 'A' || escape(file.name).substr(0, 1) == 'C' || escape(file.name).substr(0, 1) == 'G' || escape(file.name).substr(0, 1) == 'P')
                        {
                            labTestNumbers.push(escape(file.name).substr(0, escape(file.name).search('%20')));
                            labTestNumber = escape(file.name).substr(0, escape(file.name).search('%20'));
                        }

                        var removeLink = "<button class='removeFile btn btn-danger btn-sm' onClick=removeParent(\"" + fileId + "\",\"" + labTestNumber + "\",\"" + rowCount + "\",\"" + fileId + "\") href=\"#\" data-fileid=\"" + fileId + "\">Remove</button>";

                        output.push("<li><strong>", file.name, "</strong> - ", file.size, " bytes. &nbsp; &nbsp; ", removeLink, "</li> ");

                    }


                    $(this).children(".fileList"+rowCount)
                        .append(output.join(""));
                        fileList =  $('.fileList'+rowCount).children().length;
                        checkValidation();
                    $('#lab_test_no_'+rowCount).val(labTestNumbers.join(', '));
                    $('#test_completed_'+rowCount).val(labTestNumbers.length);

                    labTestNumbers = [];
                    labTestNumbersId = [];
                    //reset the input to null - nice little chrome bug!
                    //  evt.target.value = null;
                    //   console.log(evt.target.value);
                });

                $('#lab-btn-submit').attr('disabled', 'disabled');

                projectValue = $('#project_'+rowCount).val();
                activityValue = $('#activity_'+rowCount).val();
               // totalTimeVAlue = $('#total_time_'+rowCount).val();
                remarksValue = $('#remarks_'+rowCount).val();
                labTestNumberValue = $('#lab_test_no_'+rowCount).val();
                testCompletedValue = $('#test_completed_'+rowCount).val();
                sampleTypeValue = $('#sample_type_'+rowCount).val();

                // $('#total_time_'+rowCount).keyup(function(e){
                //     totalTimeVAlue = $('#total_time_'+rowCount).val();
                //     checkValidation();
                // });
                $('#activity_'+rowCount).change(function(e){
                    activityValue = $('#activity_'+rowCount).val();
                    checkValidation();
                    $('#sample_type_'+rowCount).html('<option value="">Select an option</option>');
                    $.ajax({
                        type: 'POST',
                        url: sample_type_route,
                        data: {'activityId':activityValue},
                        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                        success: function (data) {
                            if (data.success) {
                                sampleTypes ='<option value="">Select an option</option>';
                                $.each(data.testTypes, function( index, val ) {
                                    sampleTypes+= "<option value='"+val.id+"'>"+val.code+" | "+val.name+"</option>";
                                });
                                $('#sample_type_'+rowCount).html(sampleTypes);
                               
                            }
                            
                            
                        }
                    });
                });
                $('#project_'+rowCount).change(function(e){
                    projectValue = $('#project_'+rowCount).val();
                    checkValidation();
                });
                // $('#remarks_'+rowCount).keyup(function(e){
                //     remarksValue = $('#remarks_'+rowCount).val();
                //     checkValidation();
                // });
                $('#sample_type_'+rowCount).change(function(e){
                    sampleTypeValue = $('#sample_type_'+rowCount).val();
                    checkValidation();
                });
                $('#lab_test_no_'+rowCount).keyup(function(e){
                    labTestNumberValue = $('#lab_test_no_'+rowCount).val();
                    checkValidation();
                });
                $('#test_completed_'+rowCount).keyup(function(e){
                    testCompletedValue = $('#test_completed_'+rowCount).val();
                    checkValidation();
                });

                $('#files1_'+rowCount).change(function(e){
                    testCompletedValue = 1;
                    labTestNumberValue = 'xyz';
                    checkValidation();
                });


                function checkValidation(){
                    if(projectValue>0 && activityValue>0  && labTestNumberValue.length>0 && testCompletedValue>0 && testCompletedValue<11 && sampleTypeValue>0 && fileList>0)
                    {
                        $('#lab-btn-submit').removeAttr('disabled');
                        $('#add_more_labwork').removeAttr('disabled');
                    }else{
                        $('#lab-btn-submit').attr('disabled', 'disabled');
                        $('#add_more_labwork').attr('disabled', 'disabled');
                    }
                }
                $('#total_time_'+rowCount).on("keypress keyup blur",function (event) {
                    $(this).val($(this).val().replace(/[^0-9\.]/g,''));
                    if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
                        event.preventDefault();
                    }
                    checkValidation
                 });
                 $('#test_completed_'+rowCount).on("keypress keyup blur",function (event) {
                    $(this).val($(this).val().replace(/[^0-9\.]/g,''));
                    if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
                        event.preventDefault();
                    }
                    checkValidation
                 });

                

                //###################################################//


        //     }
        //
        // }
    // });



});

function removeParent(id,testNumber,rowCount,file)
{


    var li = $("li").find("[data-fileid='" + id + "']");
    testNumbers =  $('#lab_test_no_'+rowCount).val();

    newTestNumbers = testNumbers.replace(testNumber,'');
    finalTestNumbers = newTestNumbers.replace(/^,|,$/g,'');
    $('#lab_test_no_'+rowCount).val(finalTestNumbers);
    testcompleted = $('#test_completed_'+rowCount).val();
    $('#test_completed_'+rowCount).val(testcompleted-1);
    li.parent().remove();

    if($('.fileList'+rowCount).children().length>0)
    {
        $('#lab-btn-submit,#add_more_labwork').removeAttr('disabled');

    }else{
        $('#lab-btn-submit,#add_more_labwork').attr('disabled', 'disabled');
    }

}

// Lab Form formvalidation.io and ajax call

labfv = FormValidation.formValidation(
    document.getElementById('labForm'),
    {
        fields: {
            'date[]': {
                validators: {
                    notEmpty: {
                        message: 'Date is required'
                    },
                    date: {
                        format: 'YYYY-MM-DD',
                        min: weekStartDate,
                      //  max: weekEndDate,
                        message: 'Date format must be dd-mm-yy and should not be in previous week'
                    },
                }
            },
            'project[]': {
                validators: {
                    notEmpty: {
                        message: 'Project is required'
                    },
                }
            },
            'activity[]': {
                validators: {
                    notEmpty: {
                        message: 'Activity is required'
                    },
                }
            },
            // 'total_time[]': {
            //     validators: {
            //         notEmpty: {
            //             message: 'Total time is required'
            //         },
            //         between: {
            //             min: 1,
            //             max: 20,
            //             message: 'Total time must be between 1-20 (hrs)'
            //         },
            //         numeric: {
            //             message: 'Hrs must be in numbers'
            //         },
            //     }
            // },
            // 'remarks[]': {
            //     validators: {
            //         notEmpty: {
            //             message: 'Remarks are required'
            //         },
            //     }
            // },
            'test_completed[]': {
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
            'sample_type[]': {
                validators: {
                    notEmpty: {
                        message: 'Sample type is required'
                    },
                }
            },
            'lab_test_no[]': {
                validators: {
                    notEmpty: {
                        message: 'Lab Test No is required'
                    },
                }
            },
            'files1[]': {
                validators: {
                    notEmpty: {
                        message: 'Attachment is required'
                    },
                }
            }
        },
        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            submitButton: new FormValidation.plugins.SubmitButton(),
            defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            bootstrap: new FormValidation.plugins.Bootstrap({
                rowSelector: function(field, ele) {
                    return 'td';
                },
            }),
            icon: new FormValidation.plugins.Icon({
                valid: 'fa fa-check',
                invalid: 'fa fa-times',
                validating: 'fa fa-refresh',
            }),

        },
    }
)

$('#sample_type').on('change', function () {
    labfv.revalidateField('sample_type[]');
});

$('#activity2').on('change', function () {
    labfv.revalidateField('activity[]');

    $('#sample_type').html('<option value="">Select an option</option>');
    $.ajax({
        type: 'POST',
        url: sample_type_route,
        data: {'activityId':$(this).val()},
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
        success: function (data) {
            if (data.success) {
                sampleTypes ='<option value="">Select an option</option>';
                $.each(data.testTypes, function( index, val ) {
                    sampleTypes+= "<option value='"+val.id+"'>"+val.code+" | "+val.name+"</option>";
                });
                $('#sample_type').html(sampleTypes);
               
            }
            
            
        }
    });
});

$('#date2').on('change', function () {
    labfv.revalidateField('date[]');
});

$('#files1').on('change', function () {
    labfv.revalidateField('lab_test_no[]');
    labfv.revalidateField('test_completed[]');
});


