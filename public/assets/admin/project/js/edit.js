$(document).ready(function() {
    $('.select2-dropdown').select2({
        width: '100%'
    });
     $('#tel_number').mask('(000) 000-0000');
    $('#contact_number').mask('(000) 000-0000');
    $('#cell').mask('(000) 000-0000');
});
 function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
var dateFormate  = 'yy/mm/dd';
// $('#upload-inventory').imageReader();
$( "#start_date" ).datepicker({ dateFormat: dateFormate });
$( "#end_date" ).datepicker({ dateFormat: dateFormate });




/* New project model */
$('#copy_project').on( 'click',function(){
    $('#new_project_number').val('');
    $('#new_phase').val('');
    $('#phase_msg_block').css('display','none');
    $('#project_number_msg_block').css('display','none');
    $('#save_new_project').attr('disabled','disabled');
    $('#projectNumberModal').modal('show');
    var newProjectNumber = '';
    $("#new_project_number").on('keypress',function(event) {
        // avoid spaces
        if(event.keyCode==32){
            event.preventDefault();
        }
        $("#new_project_number").on('keyup',function() {
             newProjectNumber = $('#new_project_number').val();
            var firstTwoWord = newProjectNumber.substring(0,2);
        if(firstTwoWord.toUpperCase()=='ET'){
                $('#project_number_msg_block').css('display','block');
                $('#save_new_project').attr('disabled','disabled');
            }else{
                $('#project_number_msg_block').css('display','none');
                $('#save_new_project').removeAttr('disabled');

            }
            // to avoid zero length 
            if(newProjectNumber.length==0){
                $('#save_new_project').attr('disabled','disabled');
            }
            
            
        });
    });
    $("#new_project_number").on('change',function() {
        newProjectNumber = $('#new_project_number').val();
        var firstTwoWord = newProjectNumber.substring(0,2);
    if(firstTwoWord.toUpperCase()=='ET'){
            $('#project_number_msg_block').css('display','block');
            $('#save_new_project').attr('disabled','disabled');
        }else{
            $('#project_number_msg_block').css('display','none');
            $('#save_new_project').removeAttr('disabled');

        }
    });
    $( "#new_phase").on('change',function() {
           var newPhase = $('#new_phase').val();
           var reg = new RegExp("^[a-zA-Z]*$");
           if (!reg.test(newPhase))
             {
               $('#phase_msg_block').css('display','block');
               $('#save_new_project').attr('disabled','disabled');
            }else{
                $('#phase_msg_block').css('display','none');
                $('#save_new_project').removeAttr('disabled');

            }
           
   });
  
     $('#save_new_project').on('click',function(){
        $.ajax({
          type: 'POST',
          url: newProjectRoute,
          data: {'project_id' : $('#project_id').val(),'project_number':$('#new_project_number').val(),'phase':$('#new_phase').val()},
          headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
          success: function(response)
          {
            
            if(response.success){
                $('#projectNumberModal').modal('hide');
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: response.message,
                  showConfirmButton: false,
                  timer: 1500
                });
            }else{
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
           
          }
        });
     })
   
});

document.addEventListener('DOMContentLoaded', function(e) {
FormValidation.formValidation(
  document.getElementById('project_form'),
  {
      fields: {
          name: {
              validators: {
                  notEmpty: {
                      message: 'Project name is required'
                  },

              }
          },
          number: {
            validators: {
                notEmpty: {
                    message: 'Project number is required'
                },

            }
        },
          company_name: {
              validators: {
                  notEmpty: {
                      message: 'Company name is required'
                  },
                //   regexp: {
                //       regexp: /^[a-zA-Z.][ a-zA-Z0-9.]*$/,
                //       message: 'Company name can consist of alphabetical characters and numbers only'
                //   }

              }
          },
          email: {
            validators: {
                notEmpty: {
                    message: 'Email is required'
                },
                emailAddress: {
                    message: 'The value is not a valid email address'
                }
            }
        },
        technician: {
            validators: {
                numeric: {
                    // The default separators
                    thousandsSeparator: '',
                    decimalSeparator: '.'
                },
                regexp: {
                    regexp: /^[0-9][0-9.]*$/,
                    // message: 'technician must be a positive number'
                },
                notEmpty: {
                    // message: 'technician is required'
                },
            }
        },
        senior_technician: {
            validators: {
                numeric: {
                    // message: 'senior technician value must be a numeric',
                    // The default separators
                    thousandsSeparator: '',
                    decimalSeparator: '.'
                },
                regexp: {
                    regexp: /^[0-9][0-9.]*$/,
                    // message: 'senior technician must be a positive number'
                },
                notEmpty: {
                    // message: 'senior technician is required'
                },
            }
        },
        manager_of_field_services: {
            validators: {
                numeric: {
                    // message: 'must be a numeric value',
                    // The default separators
                    thousandsSeparator: '',
                    decimalSeparator: '.'
                },
                regexp: {
                    regexp: /^[0-9][0-9.]*$/,
                    // message: 'must be a positive number'
                },
                notEmpty: {
                    // message: 'required'
                },
            }
        },
        engineer: {
            validators: {
                numeric: {
                    // message: 'must be a numeric value',
                    // The default separators
                    thousandsSeparator: '',
                    decimalSeparator: '.'
                },
                regexp: {
                    regexp: /^[0-9][0-9.]*$/,
                    // message: 'must be a positive number'
                },
                notEmpty: {
                    // message: 'required'
                },
            }
        },
        senior_engineer: {
            validators: {
                numeric: {
                    // message: 'must be a numeric value',
                    // The default separators
                    thousandsSeparator: '',
                    decimalSeparator: '.'
                },
                regexp: {
                    regexp: /^[0-9][0-9.]*$/,
                    // message: 'must be a positive number'
                },
                notEmpty: {
                    // message: 'required'
                },
            }
        },
        principal_engineer: {
            validators: {
                numeric: {
                    // message: 'must be a numeric value',
                    // The default separators
                    thousandsSeparator: '',
                    decimalSeparator: '.'
                },
                regexp: {
                    regexp: /^[0-9][0-9.]*$/,
                    // message: 'must be a positive number'
                },
                notEmpty: {
                    // message: 'required'
                },
            }
        },
        mileage: {
            validators: {
                numeric: {
                    // message: 'must be a numeric value',
                    // The default separators
                    thousandsSeparator: '',
                    decimalSeparator: '.'
                },
                regexp: {
                    regexp: /^[0-9][0-9.]*$/,
                    // message: 'must be a positive number'
                },
                notEmpty: {
                    // message: 'required'
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
