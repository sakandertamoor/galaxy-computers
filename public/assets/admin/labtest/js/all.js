$( document ).ready( function () {
  $('.table').css({
      'overflow-x': 'hidden',
  });
    $('#lab_tests').DataTable({
           lengthMenu: [[100, 50, 25, 10, -1], [100, 50, 25, 10,  "All"]],
           processing: true,
           serverSide: true,
           ajax: allLabTests,
           columns: [
                    { data: 'id',"class" : "clickable",  },
                    { data: 'lookup', "class" : "clickable title", },
                    { data: 'test', "class" : "clickable", },
                    { data: 'status', "class" : "clickable", },
                    { data: 'action' }
                    
                 ]
     });
     $('#lab_tests tbody').on( 'click', 'td.clickable', function () {
       var html = $(this).parent();
        window.location =html.data('href');
    });
    $('#lab_tests tbody').on( 'click', '#suspend-btn',function(){
         var action =  $(this).data('action');
         var id =  $(this).data('id');  
         var testTitle =  $(this).parents("tr").find('td.title').text();
         if(action=='suspend')
         {
          //  var message = 'Are you sure want to suspend '+testTitle+' test';
          var message = 'Do you want to suspend Lab Test';
         }else{
          //var message = 'Are you sure want to Activate '+testTitle+' test';
          var message = 'Do you want to re-active Lab Test';
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
                        $('#lab_tests').DataTable().clear().draw();
                      }
            });
        }
      })

    });

    

   });
   
