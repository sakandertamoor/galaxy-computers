$('#code').bind('keyup keypress', function()
{

        var codeTxt = $(this).val()
        codeTxt=codeTxt.replace(/(^\s+|[^a-zA-Z0-9 ]+|\s+$)/g," ");
        codeTxt=codeTxt.replace(/\s+/g, "-");
        $('#code').val(codeTxt);
});


document.addEventListener('DOMContentLoaded', function(e) {
  FormValidation.formValidation(
      document.getElementById('expense_activity_form'),
      {
          fields: {
              name: {
                  validators: {

                      regexp: {
                          regexp: /^[a-zA-Z][ a-zA-Z0-9]*$/,
                          message: 'Name can consist of alphabetical characters and numbers only'
                      },
                      notEmpty: {
                          message: 'Expense Name is required'
                      },

                  }
              },
              code: {
                  validators: {
                      notEmpty: {
                          message: 'Code is required'
                      },
                      regexp: {
                        regexp: /^[a-zA-Z][a-zA-Z]*$/,
                        message: 'Code can consist of alphabetical characters only'
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
