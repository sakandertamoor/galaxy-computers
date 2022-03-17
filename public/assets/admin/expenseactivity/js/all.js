$( document ).ready( function () {
  $('.table').css({
      'overflow-x': 'hidden',
  });
    $('#activities').DataTable({
           lengthMenu: [[100, 50, 25, 10, -1], [100, 50, 25, 10,  "All"]],
           processing: true,
           serverSide: true,
           ajax: allExpenseActivity,
           columns: [
                    { data: 'id',"class" : "clickable",  },
                    { data: 'name', "class" : "clickable title", },
                    { data: 'code', "class" : "clickable", },
                    { data: 'status', "class" : "clickable", },
                    { data: 'action' }
                    
                 ]
     });
     $('#activities tbody').on( 'click', 'td.clickable', function () {
       var html = $(this).parent();
        window.location =html.data('href');
    });
    $('#activities tbody').on( 'click', '#suspend-btn',function(){
         var action =  $(this).data('action');
         var id =  $(this).data('id');  
         var activityTitle =  $(this).parents("tr").find('td.title').text();
         if(action=='suspend')
         {
          //  var message = 'Are you sure want to suspend '+activityTitle+' activity';
          var message = 'Do you want to suspend Expense Activity';
         }else{
         // var message = 'Are you sure want to Activate '+activityTitle+' activity';
          var message = 'Do you want to re-active Expense Activity';
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
          if (result.value) {
            $.ajax({
                      type: 'POST',
                      url: activeSuspend,
                      data: {'id' : id,'action':action},
                      headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                      success: function(data)
                      {
                        //swal('',data,'success');
                        Swal.fire({
                              position: 'center',
                              icon: 'success',
                              title: data,
                              showConfirmButton: false,
                              timer: 1500
                            })
                        $('#activities').DataTable().clear().draw();
                      }
            });
        }
      })

    });
    
   });
   