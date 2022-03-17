$('#code').bind('keyup keypress', function()
{

       var codeTxt = $(this).val()
       codeTxt=codeTxt.replace(/(^\s+|[^a-zA-Z0-9 ]+|\s+$)/g," ");
       codeTxt=codeTxt.replace(/\s+/g, "-");
       $('#code').val(codeTxt);
});


$(document).ready(function () {
    $('.select2-dropdown').select2({
        width: '100%'
    });
});

document.addEventListener('DOMContentLoaded', function(e) {
  const fv = FormValidation.formValidation(
      document.getElementById('lab_test_type_form'),
      {
          fields: {
            lab_work_activity_id: {
                  validators: {
                      notEmpty: {
                          message: 'Test type is required'
                      },

                  }
              },
              name: {
                  validators: {
                      notEmpty: {
                          message: 'Name is required'
                      },
                      regexp: {
                          regexp: /^[a-zA-Z][ a-zA-Z0-9.,/?'";:{}+-_)(*&^%$#@!µ]*$/,
                          message: 'Name must start with alphabets and can consist of alphanumeric characters only'
                      }

                  }
              },
              code: {
                  validators: {
                      notEmpty: {
                          message: 'Code is required'
                      },
                      regexp: {
                        regexp: /^[a-zA-Z][a-zA-Z0-9]*$/,
                        message: 'Code can consist of alphabetical characters and numbers only'
                    },

                  }
              },
              rate: {
                  validators: {
                      numeric: {
                          message: 'Rate must be a numeric value',
                          // The default separators
                          thousandsSeparator: '',
                          decimalSeparator: '.'
                      },
                      regexp: {
                        regexp: /^[0-9][0-9.]*$/,
                        message: 'Rate must be a positive number'
                    },
                      notEmpty: {
                          message: 'Rate is required'
                      },
                  }
              },
              unit: {
                  validators: {
                      notEmpty: {
                          message: 'Unit is required'
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

    $('#lab_work_activity_id').on('change', function () {
        fv.revalidateField('lab_work_activity_id');
    });
});
