$( document ).ready( function () {
    $('.table').css({
        'overflow-x': 'hidden',
    });
      $('#suspended_projects').DataTable({
             lengthMenu: [[100, 50, 25, 10, -1], [100, 50, 25, 10,  "All"]],
             processing: true,
             serverSide: true,
             ajax: suspendedProjectsRoute,
             order: [[ 1, 'desc' ]],
             columns: [
  
                      { data: 'number'},
                      { data: 'name'},
                      { data: 'company_name'},
                      { data: 'email'},
                      { data: 'status'},
                      { data: 'action' }
  
                   ]
       });
      
 $('#suspended_projects tbody').on( 'click', '#delete-btn',function(){
           var action =  $(this).data('action');
           var id =  $(this).data('id');
           
           Swal.fire({
            title:'Are you sure?',
            text:'Do you want to permanently delete this project',
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
                    url: deleteProjectRoute,
                    data: {'id' : id},
                    headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
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
                          });
                          $('#suspended_projects').DataTable().clear().draw();
                      }else{
                            Swal.fire({
                                position: 'center',
                                icon: 'warning',
                                title: data.message,
                                showConfirmButton: false,
                                timer: 1500
                            });
                            $('#suspended_projects').DataTable().clear().draw();
                      }
                       
                    }
               });
  
            }
          })
       });

       $('#suspended_projects tbody').on( 'click', '#restore-btn',function(){
        var id =  $(this).data('id');
        Swal.fire({
         title:'Are you sure?',
         text:'Do you want to restore this project.',
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
                 url: restoreProjectRoute,
                 data: {'id' : id},
                 headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
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
                          });
                          $('#suspended_projects').DataTable().clear().draw();
                      }else{
                            Swal.fire({
                                position: 'center',
                                icon: 'warning',
                                title: data.message,
                                showConfirmButton: false,
                                timer: 1500
                            });
                            $('#suspended_projects').DataTable().clear().draw();
                      }
                 }
            });

         }
       })






   });

    
});
  