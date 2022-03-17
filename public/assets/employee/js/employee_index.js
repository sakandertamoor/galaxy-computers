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





var globalCurrentDate = new Date().toISOString().slice(0, 10);

function populateDate() {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const date = new Date();

    const dateFormat = 'yy-mm-dd';
    // const currentDate = date.getDate() + '-' + monthNames[date.getMonth()] + '-' + date.getFullYear();
    const currentDate = new Date().toISOString().slice(0, 10);

    //return [false, "notav", 'Not Available'];
   // $("#date").datepicker({dateFormat:'yy-mm-dd',minDate:startWeekDay ,maxDate:endWeekDay});
    $("#date").datepicker({
        dateFormat:'yy-mm-dd',
       // minDate:startWeekDay,
       beforeShowDay: function(date){
            var string = $.datepicker.formatDate('yy-mm-dd', date);
            var prevWeekStartDate = moment(new Date(startWeekDay), "YYYY-MM-DD").subtract(7, 'days').format('YYYY-MM-DD');
            if(missingDays.includes(string)){
                return [true, "av", "available"]
            }if(string==currentDate || string > currentDate){
                return [true, "av", "available"]
            }if(string < startWeekDay){
                if(currentHour < 9 && today =='Monday'){ // date won't be disable  till 9:00am on monday
                    if(string <  prevWeekStartDate ){ // this check will disable previous to previous/ older dates,if we remove this it will enable all dates older than previous week
                        return [false, "notav", 'Not Available']
                    }else{
                        return [true, "av", "available"]
                    }
                    
                }else{
                    return [false, "notav", 'Not Available']
                }
            }if(string <= endWeekDay){
                return [true, "av", "available"]
            }
             
        } 
    });
    $('#date').val('Select date');
    $("#date2").datepicker({
        dateFormat:'yy-mm-dd',
        // minDate:startWeekDay,
        beforeShowDay: function(date){
            var string = $.datepicker.formatDate('yy-mm-dd', date);
            var prevWeekStartDate = moment(new Date(startWeekDay), "YYYY-MM-DD").subtract(7, 'days').format('YYYY-MM-DD');
            if(missingDays.includes(string)){
                return [true, "av", "available"]
            }if(string==currentDate || string > currentDate){
                return [true, "av", "available"]
            }if(string < startWeekDay){
                if(currentHour < 9 && today =='Monday'){ // date won't be disable  till 9:00am on monday
                    if(string <  prevWeekStartDate ){ 
                        return [false, "notav", 'Not Available']
                    }else{
                        return [true, "av", "available"]
                    }
                    
                }else{
                    return [false, "notav", 'Not Available']
                }
            }if(string <= endWeekDay){
                return [true, "av", "available"]
            }
             
        }
    });
    $('#date2').val('Select date');
    $('#multiple_entries_field').prop('disabled',true);
    $('#multipleLabEntriesBtn').attr('disabled','disabled');
    

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




});


let btnStatus= 'Saved';
$('#field-btn-submit').on("click", function () {
    btnStatus= 'Submitted';
});
// append labwork
$('#add_more_labwork').on("click", function () {
    var rowCount = $('.laboratory-work tr').length;
    const currentDate = new Date().toISOString().slice(0, 10);

    let filesToUpload1;
    let filesToUpload = [];
    $.ajax({
        type: 'GET',
        url: asset_path + 'getProjectAndActivities',
        processData: false,
        cache: false,
        contentType: false,
        // headers: {'X-CSRF-Token': '{{ csrf_token() }}'},
        success: function (data) {
            if (data)
             {
               projects = data.projects;
               labActivities = data.labActivities;
               testsTypes = data.testTypes;
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
                sampleTypeOptions+='<option value= '+value.id+'>'+value.code+' | '+value.name+'</option> ';
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
                            <input id="total_time_'+rowCount+'" type="number" max="20" min="1"  class="form-control" name="total_time[]" data-time="'+rowCount+'" required autocomplete="total_time" autofocus>\
                            </td>\
                            <td>\
                            <input id="remarks_'+rowCount+'" type="textarea"  class="form-control" name="remarks[]" data-remarks="'+rowCount+'"  required autocomplete="remarks" autofocus>\
                            </td>\
                            <td>\
                            <select id="sample_type_'+rowCount+'" class="form-control select2-dropdown" name="sample_type[]" data-sample="'+rowCount+'" required autocomplete="sample_type" autofocus>'+sampleTypeOptions+'</select>\
                            </td>\
                            <td>\
                            <div class="mb-3 row files'+rowCount+'" id="files'+rowCount+'">\
                            <span class="btn btn-default btn-file">\
                                <input type="file" multiple id="files1_'+rowCount+'" data-file="'+rowCount+'" required name="files1[]">\
                            </span>\
                             <ul class="fileList'+rowCount+' custom-ul"></ul>\
                            </td>\
                            <td>\
                              <input id="lab_test_no_'+rowCount+'" type="text" class="form-control" name="lab_test_no[]" data-test="'+rowCount+'" required autocomplete="lab_test_no" autofocus>\
                            </td>\
                            <td>\
                              <input id="test_completed_'+rowCount+'" type="number" max="10" min="1" class="form-control" name="test_completed[]" data-completed="'+rowCount+'" required autocomplete="test_completed" autofocus>\
                            </td>\
                            <td><button class="btn btn-sm btn-danger remove-lab-work" type="button">X</button></td>\
                            </tr>';
                            $('.laboratory-work ').append(fieldWorkHtml);
                            $("#date_"+rowCount).datepicker({dateFormat:'yy-mm-dd',minDate:startWeekDay ,maxDate:endWeekDay});
                            $("#date_"+rowCount).val(currentDate);
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
                            });
                           //###################################################//


                            var fileIdCounter = 0;

                            let labTestNumbers = [];
                            let labTestNumbersId = [];

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

                                    if (escape(file.name).substr(0, 1) == 'G' || escape(file.name).substr(0, 1) == 'C')
                                        {
                                            labTestNumbers.push(escape(file.name).substr(0, 6));
                                            labTestNumber = escape(file.name).substr(0, 6);
                                        }
                                    else{
                                          labTestNumbers.push(escape(file.name).substr(0, 7));
                                          labTestNumber = escape(file.name).substr(0, 7);
                                       }

                                        var removeLink = "<button class='removeFile btn btn-danger btn-sm' onClick=removeParent(\"" + fileId + "\",\"" + labTestNumber + "\",\"" + rowCount + "\",\"" + fileId + "\") href=\"#\" data-fileid=\"" + fileId + "\">Remove</button>";

                                        output.push("<li><strong>", file.name, "</strong> - ", file.size, " bytes. &nbsp; &nbsp; ", removeLink, "</li> ");

                                }

                                console.log(filesToUpload1);
                                $(this).children(".fileList"+rowCount)
                                    .append(output.join(""));

                                $('#lab_test_no_'+rowCount).val(labTestNumbers.join(','));
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
                            totalTimeVAlue = $('#total_time_'+rowCount).val();
                            remarksValue = $('#remarks_'+rowCount).val();
                            labTestNumberValue = $('#lab_test_no_'+rowCount).val();
                             testCompletedValue = $('#test_completed_'+rowCount).val();
                            sampleTypeValue = $('#sample_type_'+rowCount).val();
                             $('#total_time_'+rowCount).keyup(function(e){
                                 totalTimeVAlue = $('#total_time_'+rowCount).val();
                                 checkValidation();
                            });
                            $('#activity_'+rowCount).change(function(e){
                              activityValue = $('#activity_'+rowCount).val();
                              checkValidation();
                            });
                            $('#project_'+rowCount).change(function(e){
                             projectValue = $('#project_'+rowCount).val();
                             checkValidation();
                           });
                           $('#remarks_'+rowCount).keyup(function(e){
                             remarksValue = $('#remarks_'+rowCount).val();
                             checkValidation();
                           });
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
                            if(projectValue>0 && activityValue>0 && totalTimeVAlue>0 && totalTimeVAlue<21 && remarksValue.length>0 && labTestNumberValue.length>0 && testCompletedValue>0 && testCompletedValue<11 && sampleTypeValue>0)
                            {
                                $('#lab-btn-submit').removeAttr('disabled');
                                $('#add_more_labwork').removeAttr('disabled');
                            }else{
                                $('#lab-btn-submit').attr('disabled', 'disabled');
                                $('#add_more_labwork').attr('disabled', 'disabled');
                            }
                         }

                           //###################################################//


            }

        }
    });



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
                       // min: startWeekDay,
                        //max: endWeekDay,
                        message: 'Date format must be dd-mm-yy.'
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
    $('#multipleLabEntriesBtn').prop('disabled',false);
        var  labSelectedDate = $('#date2').val();
        $(".appended-lab-row").remove();
        $.ajax({
            type: 'POST',
            url: change_lab_Date_route,
            data: {'selectedDate':labSelectedDate},
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            success: function (data) {
               if(data.success){
                   receivedData = data.labByDate;
                   
                   $.each(receivedData,function(index,value){
                       if(value.remarks==null){
                           remarks ='';
                       }else{
                           remarks = value.remarks;
                       }
                        savedWorkHtml = ' <tr class="appended-lab-row">\
                                    <td>'+value.date+'</td>\
                                    <td>'+value.project_id+'</td>\
                                    <td>'+value.lab_work_activity_id+'</td>\
                                    <td>'+value.lab_work_test_type_id+'</td>\
                                    <td>'+remarks+'</td>\
                                    <td></td>\
                                    <td class="total-expense">'+value.lab_test_no+'</td>\
                                    <td class="total-km">'+value.test_completed+'</td>\
                                    <td></td>\
                                    </tr>';
                        $('.laboratory-work').append(savedWorkHtml);
                       
                   });
                   
               }
            }
        });
   
});

$('#files1').on('change', function () {
    labfv.revalidateField('lab_test_no[]');
    labfv.revalidateField('test_completed[]');
});



$('#kilometers').on("keypress keyup blur",function (event) {
    projectMileage = $('#project option:selected').data('mileage');
    $(this).val($(this).val().replace(/[^0-9\.]/g,''));
    if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
        totalMileageAmount = $(this).val()*parseFloat(projectMileage);
        event.preventDefault();
        $('.mileage').text('$ '+totalMileageAmount.toFixed(2));
        $('#kilometers_amount').val(totalMileageAmount.toFixed(2));
    }
 });
 $('#field_expense').on("keypress keyup blur",function (event) {
    $(this).val($(this).val().replace(/[^0-9\.]/g,''));
    if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }
 });
 $('#total_time').on("keypress keyup blur",function (event) {
    $(this).val($(this).val().replace(/[^0-9\.]/g,''));
    if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }
 });



//field form validation
document.addEventListener('DOMContentLoaded', function(e) {
   fv =   FormValidation.formValidation(
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
                           //  min: startWeekDay,
                           // max: endWeekDay,
                            message: 'Date format must be yy-mm-dd'
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
                            min: 0,
                            max: 20,
                            message: 'Total time must be between 0-20 (hrs)'
                        },
                    }
                },
                field_expense: {
                    validators: {
                        greaterThan: {
                            message: 'The Expense must be a positive number',
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

                // remarks: {
                //     validators: {
                //         notEmpty: {
                //             message: 'Remarks are required'
                //         },
                //     }
                // },
            },
               plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                submitButton: new FormValidation.plugins.SubmitButton(),
              //  defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
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
    ).on('core.form.valid', function () {

        $('#store_status').val(btnStatus);
        $.ajax({
            type: 'POST',
            url: asset_path + 'employee/field/save',
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
                    location.reload();

                }
                if (data.errors) {

                }
            }
        });
    });

    $('#total_time').on('change', function () {
        fv.revalidateField('total_time');
    });
    $('#activity1').on('change', function () {
        fv.revalidateField('activity');
    });
    // $('#remarks').on('change', function () {
    //     fv.revalidateField('remarks');
    // });
    $('#field_expense').on('change', function () {
        fv.revalidateField('field_expense');
    });

    $('#date').on('change', function () {
        $('#multiple_entries_field').prop('disabled',false);
        var  fieldSelectedDate = $('#date').val();
        $(".appended-row").remove();
        $.ajax({
            type: 'POST',
            url: change_field_Date_route,
            data: {'selectedDate':fieldSelectedDate},
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            success: function (data) {
                runningTotal();
               if(data.success){
                   receivedData = data.fieldByDate;
                   
                   $.each(receivedData,function(index,value){
                       if(value.remarks==null){
                           remarks ='';
                       }else{
                           remarks = value.remarks;
                       }if(value.expense==null){
                           expense = '';
                       }else{
                           expense = value.expense
                       }if(value.kilometers==null){
                        kilometers = '';
                        }else{
                            kilometers = value.kilometers
                        }
                        testJson = isJson(value.attachment);
                        var fileList = '';
                        if(testJson)
                        { 
                            let  counter = 0;
                            $.each($.parseJSON(value.attachment), function( index, row ) {
                                counter++;
                            fileList+='<a href="'+field_file_path+'/'+row+'" target="_blank" class="btn btn-sm btn-light">File '+counter+'</a>';
                            });
                           // $('.file-container').append(fileList);
                        }
                        savedWorkHtml = ' <tr class="appended-row">\
                                    <td>'+value.date+'</td>\
                                    <td>'+value.project_id+'</td>\
                                    <td>'+value.field_work_activity_id+'</td>\
                                    <td class="total-time">'+value.time+'</td>\
                                    <td class="total-expense">'+expense+'</td>\
                                    <td class="total-km">'+kilometers+'</td>\
                                    <td>'+remarks+'</td>\
                                    <td>'+fileList+'</td>\
                                    <td><a class="btn btn-info btn-sm field-edit"   data-id='+value.id+'><i class="fa fa-edit fa-xs"></i></a></td>\
                                    </tr>';
                        $('.fieldWork').append(savedWorkHtml);
                        runningTotal();
                   });
                   
               }
            }
        });
    });



// Field  Edit form validation.io and ajax call

fieldfvEdit = FormValidation.formValidation(
    document.getElementById('fieldFormModal'),
    {
        fields: {
            date_modal: {
                validators: {
                    notEmpty: {
                        message: 'Date is required'
                    },
                    date: {
                        format: 'YYYY-MM-DD',
                        // min: startWeekDay,
                        // max: endWeekDay,
                        min:'2000-01-01',
                      // max:globalCurrentDate,
                        message: 'Date format must be dd-mm-yy.'
                    },
                }
            },
            project_modal: {
                validators: {
                    notEmpty: {
                        message: 'Project is required'
                    },
                }
            },
            activity_modal: {
                validators: {
                    notEmpty: {
                        message: 'Activity is required'
                    },
                }
            },
            total_time_modal: {
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
            kilometers_modal: {
                validators: {
                    numeric: {
                        message: 'kilometers must be  numbers only.'
                    },
                   
                }
            },
            'image_modal[]': {
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
        url: asset_path + 'employee/field/update2',
        data: new FormData(document.getElementById('fieldFormModal')),
        processData: false,
        cache: false,
        contentType: false,
        // headers: {'X-CSRF-Token': '{{ csrf_token() }}'},
        success: function (data) {
            if (data.success) {
                $('#field-btn-submit').removeAttr('disabled');
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    text: 'Field work hours has been updated.',
                    showConfirmButton: false,
                    timer: 2000
                });
                $('#field-table').DataTable().clear().draw();
                $('#fieldModal').modal('toggle');
                location.reload();

            }
            if (data.errors) {
                $('#field-btn-submit').removeAttr('disabled');
            }
        }
    });
});

$('#activity1_modal').on('change', function () {
 //   fieldfvEdit.revalidateField('activity1_modal');
});

$('#date_modal').on('change', function () {
    fieldfvEdit.revalidateField('date_modal');
});

});

$('#kilometers_modal').on("keypress keyup blur",function (event) {
    projectRate = $(this).data('mileage');
    totalMileageAmount = parseFloat(projectRate)*parseFloat($(this).val());
    if(isNaN(totalMileageAmount)){
       totalMileageAmount = 0.0;
    }
    $('#mileage_modal').text('$ '+totalMileageAmount.toFixed(2));
    $('#kilometers_amount_modal').val(totalMileageAmount.toFixed(2));
});

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

// edit save record
$(document).on('click','.field-edit',function(e) {
    document.getElementById("fieldFormModal").reset();
    initializeSelect2();
     fieldId = $(this).data('id');
    $('.file-container-modal').empty();

            Swal.fire({
                title: 'Loading!',
                html: 'Please wait, while we are loading data',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                },
            
            });
   
    
        $.ajax({
            type: 'POST',
            url: edit_field_work,
            data: {'id' : fieldId},
            //headers: {'X-CSRF-Token': csrfToken},
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            success: function(data)
            {
              if(data.success)
              {
               
                  field = data.fieldWork;
                  $('#edit_field_id').val(field.id);
                  $('#date_modal').val(field.date);
                  $('#remarks_modal').val(field.remarks);
                  $('#total_time_modal').val(field.time);
                  $('#field_expense_modal').val(field.expense);
                  $('#kilometers_modal').val(field.kilometers);
                  $('#kilometers_modal').attr('data-mileage',data.projectMileage);
                  $('#mileage_modal').text('$ '+field.kilometers_amount);
                  $('#kilometers_amount_modal').val(field.kilometers_amount);
                  projectOptions = '';
                  selected = '';
    
                  $.each(data.projects, function( index, value ) {
                      if(field.project_id == value.id)
                      {
                          selected = 'selected="selected"';
                      }
                      projectOptions+= "<option value='"+value.id+"' "+selected+">"+value.number+" | "+value.name+"</option>";
                      selected = '';
                  });
                  activityOptions = '';
                  activitySelected = '';
                  $.each(data.fieldActivities, function( index, val ) {
                    if(field.field_work_activity_id == val.id)
                    {
                        activitySelected = 'selected="selected"';
                    }
                    activityOptions+= "<option value='"+val.id+"' "+activitySelected+">"+val.name+"</option>";
                    activitySelected = '';
    
                });
                fileExtension =  field.attachment.substring(field.attachment.lastIndexOf('.') + 1);
                
                testJson = isJson(field.attachment);
                if(testJson)
                {
                    var list = '';
                    let  counter = 0;
                    $.each($.parseJSON(field.attachment), function( index, row ) {
                        counter++;
                       list+='<a href="'+field_file_path+'/'+row+'" class="btn btn-sm btn-light">File '+counter+'</a>';
                    });
                    $('.file-container-modal').append(list);
                }
               
                  $('#project_modal').html(projectOptions);
                  $('#activity1_modal').html(activityOptions);
                  Swal.close();
                   $('#fieldModal').modal('toggle');
              }
    
            }
       })

   
    
});


//*************************************************************************** */




$('#multiple_entries_field').on("click", function () {
    var  selectedDate = $('#date').val();
    $('#multiple_entries_field').attr('disabled', 'disabled');
    $.ajax({
        type: 'POST',
        url: field_date_route,
        data: {'fieldDate':selectedDate},
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
        success: function (data) {
           if(data.success){
             $('#multiple_entries_field').removeAttr('disabled');
               //window.open(multiple_field_route, '_blank');
              // window.open(multiple_field_route);
               window.location = multiple_field_route;
           }
        }
    });
});

// Multiple Lab Button
    
$('#multipleLabEntriesBtn').on('click', function () {
    window.location.replace( lab_multiple_route + '?d=' + $('#date2').val());
});

function runningTotal()
{
    let totalTime = 0;
    $(".total-time").each(function(){
        totalTime += parseFloat($(this).text());
    });
    $('.running-total-time').text(totalTime.toFixed(2));
    let totalExpense = 0;
    $(".total-expense").each(function(){
        if(!isNaN(parseFloat($(this).text()))){
         totalExpense += parseFloat($(this).text());
        }
    });
     $('.running-total-expense').text(totalExpense.toFixed(2));
    
    
    let totalKilometers = 0;
    $(".total-km").each(function(){
        if(!isNaN(parseFloat($(this).text()))){
            totalKilometers += parseFloat($(this).text());
        }
    });
    $('.running-total-km').text(totalKilometers.toFixed(2));
    
    
    
}


