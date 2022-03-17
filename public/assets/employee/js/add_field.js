
let totalMileageAmount = 0.0;
let totalKilometers = 0.0;
let projectMileage = 0.0;
$(document).ready(function () {

    initializeSelect2();

});

function initializeSelect2() {
    $('.select2-dropdown').select2({
        width: '100%',
        placeholder: "Select an option",
        allowClear: true
    });
}

$('#customFile').change(function(e){
    var fileNames = [];
    for (var i = 0; i < $(this).get(0).files.length; ++i) {
        fileNames.push($(this).get(0).files[i].name);
    }
    $('#file_distinction').val(fileNames);
});


$('#add_more_fieldwork').on("click", function () {
    $('.select2-dropdown').css("position", "inherit");
    var dt = new Date();
    var time = dt.getSeconds();
    var rowCount = $('.fieldWork tr').length+time;
    let mileage = 0.0;
    let km = 0.0;
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
               fieldActivities = data.fieldActivities;
               var projectOptions = '<option value="">Select an option</option>';
               var activityOptions = '<option value="">Select an option</option>';
               $.each(projects,function(index,value){
                 projectOptions+='<option value= '+value.id+' data-mileage='+value.mileage+'>'+value.number+' | '+value.name+ '</option> ';
              })
              $.each(fieldActivities,function(index,value){
                activityOptions+='<option value= '+value.id+'>'+value.name+'</option> ';
             })
            
            fieldWorkHtml =   ' <tr>\
                            <td>\
                            <input id="date_2'+rowCount+'" readOnly type="text" class="form-control" name="date[]"  required autocomplete="date" autofocus>\
                            <input id="file_distinction_'+rowCount+'" type="hidden" name="file_distinction[]">\
                            </td>\
                            <td>\
                            <select id="project_2'+rowCount+'" class="form-control select2-dropdown" name="project[]" required autocomplete="project" autofocus>'+projectOptions+'</select>\
                            </td>\
                            <td>\
                            <select id="activity_2'+rowCount+'" class="form-control select2-dropdown" name="activity[]" required autocomplete="activity" autofocus>'+activityOptions+'</select>\
                            </td>\
                            <td>\
                            <input id="total_time_2'+rowCount+'" type="text"  class="form-control" name="total_time[]" required autocomplete="total_time" autofocus>\
                            </td>\
                            <td>\
                            <input id="field_expense_2'+rowCount+'" type="text"  class="form-control" name="field_expense[]" required autocomplete="field_expense" autofocus>\
                            </td>\
                            <td>\
                            <div class="input-group mb-3">\
                             <input id="kilometers_2'+rowCount+'" type="text"   class="form-control" name="kilometers[]" required autocomplete="kilometers" autofocus>\
                              <div class="input-group-append">\
                               <span class="input-group-text mileage" id="mileage_'+rowCount+'">$ 0.00</span>\
                               <input type="hidden" name="kilometers_amount[]" id="kilometers_amount_'+rowCount+'" value="0">\
                             </div>\
                            </div>\
                            </td>\
                            <td>\
                            <input id="remarks_2'+rowCount+'" type="textarea"  class="form-control" name="remarks[]"  required autocomplete="remarks" autofocus>\
                            </td>\
                            <td>\
                            <input type="file" class="form-control" id="customFile_2'+rowCount+'" multiple name="image[]">\
                            </td>\
                            <td><button class="btn btn-sm btn-danger remove-field-work" type="button">X</button></td>\
                            </tr>';
                            $('.fieldWork ').append(fieldWorkHtml);
                            
                            initializeSelect2();
                            fileFlag = 0;
                           
                            $('#customFile_2'+rowCount).change(function(e){
                                var fileNames = [];
                                
                                for (var i = 0; i < $(this).get(0).files.length; ++i) {
                                    fileNames.push($(this).get(0).files[i].name);
                                 //   fileExtension =  $(this).substring($(this).lastIndexOf('.') + 1);
                                    fileExtension  = $(this).get(0).files[i].name.split('.').pop();
                                    allExtension = 'png,PNG,jpg,JPG,jpeg,JPEG,svg,gif'
                                    var check = allExtension.includes(fileExtension);  
                                   
                                    //if(fileExtension=='png' || fileExtension=='jpg' || fileExtension=='jpeg' || fileExtension=='svg' || fileExtension=='gif')
                                    if(check)
                                    {
                                        fileFlag = 1;
                                    }else{
                                        fileFlag = null;
                                    }
                                    checkFieldValidation();
                                }
                                $('#file_distinction_'+rowCount).val(fileNames);
                            });
                            
                           
                            $('.remove-field-work').on("click", function () {
                               $(this).parent().parent().remove();
                               checkFieldValidation();
                              
                               lastActivity = $('.fieldWork tr:last').find('td:eq(2)').find('select').val();
                               lastProjectNumber = $('.fieldWork tr:last').find('td:eq(1)').find('select').val();
                               lastHrs = $('.fieldWork tr:last').find('td:eq(3)').find('input').val();   
                               checkLastRowValidation();
                              
                               
                            });
                            $("#date_2"+rowCount).val($('#date').val());
                            activityValue = $('#activity_2'+rowCount).val();
                            projectValue = $('#project_2'+rowCount).val();
                            totalTimeValue = $('#total_time_2'+rowCount).val();
                            remarksValue = $('#remarks_2'+rowCount).val();

                            
                            checkFieldValidation();
                            $('#activity_2'+rowCount).change(function(e){
                                activityValue = $('#activity_2'+rowCount).val();
                                checkFieldValidation();
                             });
                            
                             $('#project_2'+rowCount).change(function(e){
                                projectValue = $('#project_2'+rowCount).val();
                                mileage = $('#project_2'+rowCount+' option:selected').data('mileage');
                                calculateMileage();
                                checkFieldValidation();
                             });
                             
                             $('#total_time_2'+rowCount).keyup(function(e){
                                totalTimeValue = $('#total_time_2'+rowCount).val();
                                console.log('total time is '+totalTimeValue);
                                checkFieldValidation();
                              
                             });
                            //  $('#remarks_2'+rowCount).keyup(function(e){
                            //     remarksValue = $('#remarks_2'+rowCount).val();
                            //     checkFieldValidation();
                            //  });
                            
                             function checkFieldValidation()
                             {
                               
                                 if(activityValue>0 && projectValue>0 && parseFloat(totalTimeValue)>=0 && parseFloat(totalTimeValue)<21 && fileFlag!=null){
                                    $('#field-btn-save,#add_more_fieldwork').removeAttr('disabled');
                                    
                                 }else{
                                    $('#field-btn-save,#add_more_fieldwork').attr('disabled', 'disabled');
                                    
                                 }
                                 
                             }

                             $('#total_time_2'+rowCount).on("keypress keyup blur",function (event) {
                                $(this).val($(this).val().replace(/[^0-9\.]/g,''));
                                if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
                                    event.preventDefault();
                                }
                                checkFieldValidation
                             });
                             $('#field_expense_2'+rowCount).on("keypress keyup blur",function (event) {
                                $(this).val($(this).val().replace(/[^0-9\.]/g,''));
                                if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
                                    event.preventDefault();
                                }
                                checkFieldValidation
                             });
                             $('#kilometers_2'+rowCount).on("keypress keyup blur",function (event) {
                                $(this).val($(this).val().replace(/[^0-9\.]/g,''));
                                if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
                                    event.preventDefault();
                                   km = $(this).val();
                                   calculateMileage();
                                    
                                     
                                }
                                checkFieldValidation
                             });

                             function calculateMileage()
                             {
                                 totalVal = parseFloat(mileage)*parseFloat(km);
                                 if(isNaN(totalVal)){
                                    totalVal = 0.0;
                                 }
                                $('#mileage_'+rowCount).text('$ '+totalVal.toFixed(2))
                                $('#kilometers_amount_'+rowCount).val(totalVal.toFixed(2));
                             }

                             function checkLastRowValidation()
                             {
                                 if(!isNaN(lastActivity) &&  !isNaN(lastProjectNumber) && lastHrs>0)
                                 {
                                    $('#field-btn-save,#add_more_fieldwork').removeAttr('disabled');
                                 }else{
                                    $('#field-btn-save,#add_more_fieldwork').attr('disabled', 'disabled');
                                 }
                             }
                           
            }
            
        }
    });   
 
    

});

$('#kilometers').on("keypress keyup blur",function (event) {
    $(this).val($(this).val().replace(/[^0-9\.]/g,''));
    if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
        event.preventDefault();
        totalKilometers = $(this).val();
        totalMileageAmount = parseFloat(projectMileage)*parseFloat(totalKilometers);
        if(isNaN(totalMileageAmount)){
            totalMileageAmount = 0.0;
        }
        $('#mileage').text('$ '+totalMileageAmount.toFixed(2));
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
    fv =  FormValidation.formValidation(
        document.getElementById('fieldForm'),
        {
            fields: {
                'date[]': {
                    validators: {
                        notEmpty: {
                            message: 'Date is required'
                        },
                        // date: {
                        //     format: 'YYYY-MM-DD',
                        //     min: startWeekDay,
                        //     max: endWeekDay,
                        //     message: 'Date format must be yy-mm-dd & date cannot be future date.'
                        // },
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
                'total_time[]': {
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
                'field_expense[]': {
                    validators: {
                        greaterThan: {
                            message: 'The Expense must be a positive number',
                            min: 0,
                        }
                    }
                },
                
                'kilometers[]': {
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
                // 'remarks[]': {
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
               // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
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
                    console.log('success');
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Field work hours has been saved.',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    window.location = employee_mainpage_route;
                    // $('#field-btn-submit').removeAttr('disabled');
                    // $('#fieldModal').modal('toggle');
                }
                if (data.errors) {

                }
            }
        });
    });

    $('#total_time').on('change', function () {
        fv.revalidateField('total_time[]');
    });
    $('#project').on('change', function () {
        fv.revalidateField('project[]');
        projectMileage = $('#project option:selected').data('mileage');
        totalMileageAmount = parseFloat(projectMileage)*parseFloat(totalKilometers);
        if(isNaN(totalMileageAmount)){
            totalMileageAmount = 0.0;
        }
        $('#mileage').text('$ '+totalMileageAmount.toFixed(2));
        $('#kilometers_amount').val(totalMileageAmount.toFixed(2));
    });
    $('#activity1').on('change', function () {
        fv.revalidateField('activity[]');
    });
    $('#remarks').on('change', function () {
        fv.revalidateField('remarks[]');
    });
});

//*************************************************************************** */


