$( document ).ready( function () {
  $('.table').css({
      'overflow-x': 'hidden',
  });
  
  $('.select2-dropdown').select2({
      width: '100%'
  });
    $('#projects').DataTable({
        "rowCallback" : function(row, data, index,full){
          col = this.api().column(6).index('visible');
          console.log(data.project_manager );
          if (data.project_manager!=' '){
             $('td', row).eq(col).find('.assign').text('Manager Assigned');
            }
           },
           lengthMenu: [[100, 50, 25, 10, -1], [100, 50, 25, 10,  "All"]],
           scrollX: true,
           processing: true,
           serverSide: true,
           ajax: allProject,
           order: [[ 1, 'desc' ]],
           columns: [

                    { data: 'number',"class" : "clickable",  },
                    { data: 'name', "class" : "clickable title", },
                    { data: 'company_name', "class" : "clickable", },
                    { data: 'email', "class" : "clickable", },
                    { data: 'project_manager', "class" : "clickable title", },
                    { data: 'status', "class" : "clickable", },
                    { data: 'action' }

                 ]
     });
     $('#projects tbody').on( 'click', 'td.clickable', function () {
       var html = $(this).parent();
        window.location =html.data('href');
    });
    $('#projects tbody').on( 'click', '#suspend-btn',function(){
         var action =  $(this).data('action');
         var id =  $(this).data('id');
         var projectTitle =  $(this).parents("tr").find('td.title').text();
         if(action=='suspend')
         {
          //  var message = 'Are you sure want to suspend '+projectTitle+' project';
          var message = 'Do you want to suspend the project';
         }else{
          //var message = 'Are you sure want to Activate '+projectTitle+' project';
          var message = 'Do you want to re-active the project';
         }
         Swal.fire({
          title:'Are you sure?',
          text:message,
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
                  url: activeSuspend,
                  data: {'id' : id,'action':action},
                  headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                  success: function(data)
                  {
                     //Swal.fire('Suspended!',data,'success')
                     Swal.fire({
                              position: 'center',
                              icon: 'success',
                              title: data,
                              showConfirmButton: false,
                              timer: 1500
                            });
                     $('#projects').DataTable().clear().draw();
                  }
             });

          }
        })

    });

    $('#projects tbody').on( 'click', '#assign-btn',function(){
      $('#project_id').val($(this).data('id'));
      getManagers($(this).data('id'));
      $('#assignProjectModal').modal('show');
        $('#manager_name').on( 'change',function(){
          var manager = $('#manager_name').val();
           if(manager!='' && manager!=null){
              $('#assign_project_btn').prop('disabled',false);
           }else{
             $('#assign_project_btn').prop('disabled',true);
           }
        });
     
    });

   function getManagers(project_id)
   {
      var namesHtml = '';
      $('.assigned-managers').css('display','none');
      $('.span-container').each(function(){
        $(this).remove();
      })
      $('#manager_name').val(null).trigger('change');
      $.ajax({
        type: 'POST',
        url: managersByProjectId,
        data: {'project_id' : project_id},
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
        success: function(response)
        {
          if(response.success){
           $('#manager_name').val(response.manager_id[0]).trigger('change');
           /* $.each(response.managers,function(index,val){
               namesHtml+='<span class="badge badge-success">'+val+'</span>&nbsp;';
            });
            $('.assigned-managers').css('display','block');
            $('.assigned-managers').append('<div class="span-container">'+namesHtml+'</div><br>');*/
          }
        }
      });
   }

   $(document).on( 'click', '#assign_project_btn',function(){
    $.ajax({
        type: 'POST',
        url: assignManagerRoute,
        data: {'project_id' : $('#project_id').val(),'manager_id':$('#manager_name').val()},
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
        success: function(data)
        {
           if(data.success){
            $('#assignProjectModal').modal('hide');
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: data.message,
                showConfirmButton: false,
                timer: 1500
              });
           }else{
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: data.message,
                showConfirmButton: false,
                timer: 1500
              });
           }

          
        }
     });
  });

   });
