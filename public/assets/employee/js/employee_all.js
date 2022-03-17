// const { parseJSON } = require("jquery");

let filesToUpload1;
let filesToUpload = [];

$.fn.fileUploader = function (filesToUpload, sectionIdentifier) {
    var fileIdCounter = 0;

    let labTestNumbers = [];
    let labTestNumbersId = [];
    $('#lab_test_no').val(' ');
    $('#test_completed').val(' ');
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

            labTestNumbers.push(escape(file.name).substr(0, escape(file.name).search('%20')));

        }


        $(this).children(".fileList")
            .append(output.join(""));

        $('#lab_test_no').val(labTestNumbers.join(','));
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
$("#date").datepicker({dateFormat:'yy-mm-dd'});
$("#date2").datepicker({dateFormat:'yy-mm-dd'});


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
                            // min: startWeekDay,
                            // max: endWeekDay,
                            min:'2000-01-01',
                          // max:globalCurrentDate,
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
                kilometers: {
                    validators: {
                        numeric: {
                            message: 'kilometers must be  numbers only.'
                        },
                       
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
            url: asset_path + 'employee/field/update',
            data: new FormData(document.getElementById('fieldForm')),
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

                }
                if (data.errors) {
                    $('#field-btn-submit').removeAttr('disabled');
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
                           // min: startWeekDay,
                            //max: endWeekDay,
                            message: 'Date format must be dd-mm-yy'
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
                // total_time: {
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
                // remarks: {
                //     validators: {
                //         notEmpty: {
                //             message: 'Remarks are required'
                //         },
                //     }
                // },
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
            url: asset_path + 'employee/lab/update',
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
                        text: 'Lab work hours has been updated.',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $('#lab-table').DataTable().clear().draw();
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
    $('#files1').on('change', function () {
        labfv.revalidateField('test_completed');
        labfv.revalidateField('lab_test_no');
    });

    requestForm =  FormValidation.formValidation(
        document.getElementById('requesForm'),
        {
            fields: {
                work_type: {
                    validators: {
                        notEmpty: {
                            message: 'Work Type is required'
                        },
                        
                    }
                },
                entry_for: {
                    validators: {
                        notEmpty: {
                            message: 'Checkbox is required'
                        },
                        
                    }
                },
                from_date: {
                    validators: {
                        notEmpty: {
                            message: 'From date is required'
                        },
                        date: {
                            format: 'YYYY-MM-DD',
                            min: '2000-01-01',
                            max: '2050-01-01',
                            message: 'Date format must be yy-mm-dd & From date cannot be future date.'
                        },
                    }
                },
                to_date: {
                    validators: {
                        notEmpty: {
                            message: 'To date is required'
                        },
                        date: {
                            format: 'YYYY-MM-DD',
                            min: '2000-01-01',
                            max: '2050-01-01',
                            message: 'Date format must be yy-mm-dd & From date cannot be future date.'
                        },
                    }
                },
            },
               plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                submitButton: new FormValidation.plugins.SubmitButton(),
               // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
                bootstrap: new FormValidation.plugins.Bootstrap(),
                icon: new FormValidation.plugins.Icon({
                    valid: 'fa fa-check',
                    invalid: 'fa fa-times',
                    validating: 'fa fa-refresh',
                }),
                startEndDate: new FormValidation.plugins.StartEndDate({
                    format: 'YYYY-MM-DD',
                    startDate: {
                        field: 'from_date',
                        message: 'The start date must be ealier than the end date',
                    },
                    endDate: {
                        field: 'to_date',
                        message: 'The end date must be later than the start date',
                    },
                }),
            },
        }
    ).on('core.form.valid', function () {
          
       
        $.ajax({
            type: 'POST',
            url: request_store_route,
            data: new FormData(document.getElementById('requesForm')),
            processData: false,
            cache: false,
            contentType: false,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            success: function(data)
            {
                if(data.success)
                {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: data.message,
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $("#requesForm").trigger("reset");
                    $('#requestModal').modal('toggle');
                }
                else
                {
                   
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        text: data.message,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                
              
            }
        });
    });

    $('#work_type').on('change', function () {
        requestForm.revalidateField('work_type');
    });
    $('#from_date').on('change', function () {
        requestForm.revalidateField('from_date');
    });
    $('#to_date').on('change', function () {
        requestForm.revalidateField('to_date');
    });
    

});
$(document).on('click','.field-edit',function(e) {
    document.getElementById("fieldForm").reset();
    initializeSelect2();
     fieldId = $(this).data('id');
    $('.file-container').empty();

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
                  $('#date').val(field.date);
                  $('#remarks').val(field.remarks);
                  $('#total_time').val(field.time);
                  $('#field_expense').val(field.expense);
                  $('#kilometers').val(field.kilometers);
                  $('#kilometers').attr('data-mileage',data.projectMileage);
                  $('#mileage').text('$ '+field.kilometers_amount);
                  $('#kilometers_amount').val(field.kilometers_amount);
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
                    $('.file-container').append(list);
                }
                // $('#blah_img').attr('src',' ');
                // $('#blah').attr('href', ' ');
                // $('#blah').text(' ');
                // if(fileExtension=='png' || fileExtension=='jpg' || fileExtension=='jpeg')
                // {
                //     $('#blah_img').attr('src', field_file_path+'/'+field.attachment);
                // }else{
                //     $('#blah').attr('href', field_file_path+'/'+field.attachment);
                //     $('#blah').text(field.attachment)
                // }
                  $('#project').html(projectOptions);
                  $('#activity1').html(activityOptions);
                  Swal.close();
                   $('#fieldModal').modal('toggle');
              }
    
            }
       })

   
    
});

// delete field work
$(document).on('click','.field-delete',function(e) {
     fieldId = $(this).data('id');
     Swal.fire({
        title: 'Are you sure?',
        text:'Do you want to permenantly delete this record',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText:'No',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
        $.ajax({
            type: 'POST',
            url: delete_field_work,
            data: {'id' : fieldId},
            //headers: {'X-CSRF-Token': csrfToken},
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            success: function(data)
            {
              if(data.success)
              {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                  })
                  $('#field-table').DataTable().clear().draw();
              }else{
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: data.message,
                    showConfirmButton: true,
                  })
              } 
    
            }
       })
    }
  })
   
    
});

$('#kilometers').on("keypress keyup blur",function (event) {
     projectRate = $(this).data('mileage');
     totalMileageAmount = parseFloat(projectRate)*parseFloat($(this).val());
     if(isNaN(totalMileageAmount)){
        totalMileageAmount = 0.0;
     }
     $('#mileage').text('$ '+totalMileageAmount.toFixed(2));
     $('#kilometers_amount').val(totalMileageAmount.toFixed(2));
 });

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}



$(document).on('click','.lab-edit',function(e) {
    document.getElementById("labForm").reset();
    initializeSelect2();
     labId = $(this).data('id');
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
        url: edit_lab_work,
        data: {'id' : labId},
        //headers: {'X-CSRF-Token': csrfToken},
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
        success: function(data)
        {
          if(data.success)
          {
              lab = data.labWork;
              $('#edit_lab_id').val(lab.id);
              $('#date2').val(lab.date);
              $('#remarks2').val(lab.remarks);
              $('#total_time2').val(lab.time);
              $('#test_completed').val(lab.test_completed);
              $('#lab_test_no').val(labTestFormat(lab.lab_test_no));
             
              projectOptions = '';
              selected = '';

              $.each(data.projects, function( index, value ) {
                  if(lab.project_id == value.id)
                  {
                      selected = 'selected="selected"';

                  }
                  projectOptions+= "<option value='"+value.id+"' "+selected+">"+value.number+" | "+value.name+"</option>";
                  selected = '';
              });
              activityOptions = '';
              activitySelected = '';
              $.each(data.labActivities, function( index, val ) {
                if(lab.lab_work_activity_id == val.id)
                {
                    $('#activity2').css('pointer-events', 'none');
                    activitySelected = 'selected';

                }
                activityOptions+= "<option value='"+val.id+"' "+activitySelected+">"+val.name+"</option>";
                activitySelected = '';
            });
              testOptions = '';
              testSelected = '';
              $.each(data.testTypes, function( index, row ) {
                if(lab.lab_work_test_type_id == row.id)
                {
                    $('#sample_type').css('pointer-events', 'none');
                    testSelected = 'selected';

                }
                testOptions+= "<option value='"+row.id+"' "+testSelected+">"+row.code+" | "+row.name+"</option>";
                testSelected = '';
            });
              $('.fileList').empty();
               attachment = lab.attachment;
               result = isValidJSONString(attachment);
              if(result==true)
              {
                allAttachemts = '';
                $.each($.parseJSON(attachment), function( index, row ) {
                  allAttachemts+= "<li><a href='"+lab_file_path+"/"+row+" '>"+row+"</a><li>";
                });
                //$('.fileList').append(allAttachemts);
              }




              $('#project2').html(projectOptions);
              $('#activity2').html(activityOptions);
              $('#sample_type').html(testOptions);
              Swal.close();
              $('#labModal').modal('toggle');
          }

        }
   })
});

// delete lab work
$(document).on('click','.lab-delete',function(e) {
    labId = $(this).data('id');
    console.log(labId);
    Swal.fire({
       title: 'Are you sure?',
       text:'Do you want to permenantly delete this record',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       cancelButtonText:'No',
       confirmButtonText: 'Yes'
     }).then((result) => {
       if (result.value) {
       $.ajax({
           type: 'POST',
           url: delete_lab_work,
           data: {'id' : labId},
           //headers: {'X-CSRF-Token': csrfToken},
           headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
           success: function(data)
           {
             if(data.success)
             {
               Swal.fire({
                   position: 'center',
                   icon: 'success',
                   title: data.message,
                   showConfirmButton: false,
                   timer: 1500
                 })
                 $('#lab-table').DataTable().clear().draw();
             }else{
               Swal.fire({
                   position: 'center',
                   icon: 'warning',
                   title: data.message,
                   showConfirmButton: true,
                 })
             } 
   
           }
      })
   }
 })
  
   
});

function isValidJSONString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
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


    $("#date").datepicker({dateFormat: dateFormat, maxDate: new Date});
    $("#date2").datepicker({dateFormat: dateFormat, maxDate: new Date});
    $("#date3").datepicker({dateFormat: dateFormat, maxDate: new Date});

    $('#date').val(currentDate);
    $('#date2').val(currentDate);
    $('#date3').val(currentDate);

   

}

$(function () {

     table = $('#field-table').DataTable({
        "footerCallback": function ( row, data, start, end, display ) {
            var api = this.api();
            nb_cols = api.columns().nodes().length;
            var j = 4;
            while(j < nb_cols){
                var pageTotal = api
            .column( j, { page: 'current'} )
            .data()
            .reduce( function (a, b) {
                if(j >= 4 && j <=6){
                    var total =  Number(a) + Number(b);
                    return total.toFixed(2);
                  }else{
                    return '';
                  }
            }, 0 );
            // Update footer
            $( api.column( j ).footer() ).html(pageTotal);
                        j++;
                    } 
                },



        processing: true,
        serverSide: true,
        ajax: field_datatable_path,
        columns: [
            {data: 'date', 'class': 'clickable'},
            {data: 'projectNumber', 'class': 'clickable'},
            {data: 'projectName', 'class': 'clickable'},
            {data: 'activity', 'class': 'clickable'},
            {data: 'time', 'class': 'hrsLogged',render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
            {data: 'expense', 'class': 'clickable',render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
            {data: 'kilometers', 'class': 'clickable',render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
            {data: 'files', 'class': 'clickable'},
            {data: 'action', 'class': 'clickable'},

        ],
        order: [[0, 'desc']],
        "pageLength": 100
    });
    



    var table2 = $('#lab-table').DataTable({
        processing: true,
        serverSide: true,
        ajax: lab_datatable_path,
        columns: [
            {data: 'date', 'class': 'clickable'},
            {data: 'projectNumber', 'class': 'clickable'},
            {data: 'projectName', 'class': 'clickable'},
            {data: 'activity', 'class': 'clickable'},
            {data: 'sampleType', 'class': 'clickable'},
            {data: 'testNumber', 'class': 'clickable'},
            {data: 'test_completed', 'class': 'clickable'}, 
            {data: 'action', 'class': 'clickable'},

        ],
        order: [[0, 'desc']],
        "pageLength": 100
    });

    // var table3 = $('#expense-table').DataTable({
    //     processing: true,
    //     serverSide: true,
    //     ajax: expense_datatable_path,
    //     columns: [
    //         {data: 'date', 'class': 'clickable'},
    //         {data: 'projectNumber', 'class': 'clickable'},
    //         {data: 'projectName', 'class': 'clickable'},
    //         {data: 'activity', 'class': 'clickable'}
    //     ],
    //     order: [[0, 'desc']],
    //     "pageLength": 100
    // });
    
    var submittedFieldTable = $('#submitted-field-table').DataTable({
        processing: true,
        serverSide: true,
        ajax: field_submitted_datatable_path,
        columns: [
            {data: 'date', 'class': 'clickable'},
            {data: 'projectNumber', 'class': 'clickable'},
            {data: 'projectName', 'class': 'clickable'},
            {data: 'activity', 'class': 'clickable'},
            {data: 'time', 'class': 'clickable'},
            {data: 'remarks', 'class': 'clickable'}, 
            {data: 'expense', 'class': 'clickable'},
            {data: 'kilometers', 'class': 'clickable'},
            {data: 'attachment', 'class': 'clickable'}
            

        ],
        order: [[0, 'desc']],
        "pageLength": 100
    });

    var submittedLabTable = $('#submitted-lab-table').DataTable({
        processing: true,
        serverSide: true,
        ajax: lab_submitted_datatable_path,
        columns: [
            {data: 'date', 'class': 'clickable'},
            {data: 'projectNumber', 'class': 'clickable'},
            {data: 'projectName', 'class': 'clickable'},
            {data: 'activity', 'class': 'clickable'}, 
            {data: 'sampleType', 'class': 'clickable'},
            {data: 'testNumber', 'class': 'clickable'}, 
            {data: 'test_completed', 'class': 'clickable'}, 
           
        ],
        order: [[0, 'desc']],
        "pageLength": 100
    });


});


// It will select the project in the modal against which the Add Field/Lab/Expense button is clicked




$("#from_date").datepicker({dateFormat: 'yy-mm-dd'});
$("#to_date").datepicker({dateFormat: 'yy-mm-dd'});
$("#from_range").datepicker({dateFormat:'yy-mm-dd'});
$("#to_range").datepicker({dateFormat:'yy-mm-dd'});
$(document).ready(function () {


    initializeSelect2();
  //  populateDate();

  
     if(employee_role){
         $('#btn-submit').attr('data-id', 'lab');
     }else{
        $('#btn-submit').attr('data-id', 'field');
     }


});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        fileExtension =  input.files[0].name.substring(input.files[0].name.lastIndexOf('.') + 1);
        $('#blah_img').attr('src',' ');
        $('#blah').text(' ');
        reader.onload = function (e) {
          if(fileExtension=='jpg' || fileExtension=='png' || fileExtension=='jpeg')
          {
                $('#blah_img')
                .attr('src', e.target.result);

          }else{
                $('#blah')
                .attr('href', e.target.result);
                $('#blah').text( input.files[0].name)
          }

        };

        reader.readAsDataURL(input.files[0]);
    }
}

// On modal close, reset form

$('#fieldModal').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset();
    $('#blah').attr('src', '');
    $('.custom-file-label').text('Choose File');
    initializeSelect2();
    // $('.select2-dropdown').val('').trigger('change');
    fieldfv.resetForm(true);
    fieldfv.resetField('activity');

    $('#field-btn-submit').removeAttr('disabled');
});

$('#labModal').on('hidden.bs.modal', function () {

    $(this).find('form')[0].reset();
    $('#blah').attr('src', '');
    initializeSelect2();
    $('.custom-file-label').text('Choose File');
    labfv.resetForm(true);
    $('#lab-btn-submit').removeAttr('disabled');
    $('.fileList').empty();
    $('#files1').val('');
    $('#lab_test_no').val(' ');
    $('#test_completed').val(' ');
    filesToUpload1 = [];
    filesToUpload = [];
});

// Post A request

$('#post_request').on('click', function () {
  $('#requestModal').modal('toggle');
    $('#work_type').on('change', function () {
        workType = $(this).val();
        $.ajax({
            type: 'POST',
            url: request_route,
            data: {'workType' : workType},
            //headers: {'X-CSRF-Token': csrfToken},
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            success: function(data)
            {
            
            //   dateOptions="<option value=''>Select an option</option>";
            //   $.each(data.requested_data, function( index, value ) {
            //     dateOptions+="<option value="+value.date+">"+value.date+"</option>";
            //   });
              //$('#require_date').html(dateOptions);
            }
        });
    });
});



$('.lab-tab').on('click', function () {
    $('#btn-submit').show();
    $('#btn-submit').attr('data-id', 'lab');
});
$('.field-tab').on('click',function(){
    $('#btn-submit').show();
    $('#btn-submit').removeAttr('disabled');
    $('#btn-submit').attr('data-id', 'field');
});

$('.submitted-field-tab').on('click',function(){
    $('#btn-submit').hide();
    $('#btn-submit').attr('data-id', 'Submitted');
});
$('.submitted-lab-tab').on('click',function(){
    $('#btn-submit').hide();
    $('#btn-submit').attr('data-id', 'Submitted');
});

//console.log(fieldIds);
$('#btn-submit').on('click',function(){
    let type = $('#btn-submit').attr('data-id');
    let workIds = [];
    if(type=='field')
    {
        var message = 'Do you want to submit your Field Work ?';
        $('.field-edit').each(function(){
            workIds.push($(this).attr('data-id'));
        });
    }else{
        var message = 'Do you want to submit your Lab Work ?';
        $('.lab-edit').each(function(){
            workIds.push($(this).attr('data-id'));
        });
    }
    Swal.fire({
        title: 'Are you sure?',
        text:message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText:'No',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value)
         {
                    $.ajax({
                        type: 'POST',
                        url: submit_work_route,
                        data: {'workType':type,'workIds':workIds},
                        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                        success: function(data)
                        {
                        if(data.success)
                        {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                text: data.message,
                                showConfirmButton: false,
                                timer: 2000
                            });
                            if(type=='field')
                            {
                                $('#field-table').DataTable().clear().draw();
                                $('#submitted-field-table').DataTable().clear().draw();
                            }else{
                                $('#lab-table').DataTable().clear().draw(); 
                                $('#submitted-lab-table').DataTable().clear().draw();
                            }

                        }else{
                            Swal.fire({
                                position: 'center',
                                icon: 'warning',
                                text: data.message,
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                        }
                    });
           };
         });
  });

  
// for search form i.e frome date and To date

$('#filter_record, .field-tab, .submitted-field-tab, .lab-tab, .submitted-lab-tab' ).click(function(){
    var fromDate = $('#from_range').val();
    var toDate = $('#to_range').val();
    var targetRecord =  $('#btn-submit').attr('data-id');
    $.ajax({
        type: 'POST',
        url: log_history_filter_route,
        data: {'from_range':fromDate,'to_range':toDate,'target_record':targetRecord},
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
        success: function (data) {
      
             $('#field-table').DataTable().clear().draw();
             $('#submitted-field-table').DataTable().clear().draw();
             $('#lab-table').DataTable().clear().draw();
             $('#submitted-lab-table').DataTable().clear().draw();
             
           
        }
    });
});


  