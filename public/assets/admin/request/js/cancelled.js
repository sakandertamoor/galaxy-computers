$( document ).ready( function () {
    $('.table').css({
      'overflow-x': 'hidden',
  });
  $('#request_table').DataTable({
    lengthMenu: [[100, 50, 25, 10, -1], [100, 50, 25, 10,  "All"]],
    processing: true,
    serverSide: true,
    ajax: cancelledRequestsRoute,
    columns: [
             { data: 'id' },
             { data: 'requested_from' },
             { data: 'work_type'},
             { data: 'from_date'},
             { data: 'action' },
             { data: 'adminAction'}
             

          ]
});


    $('#request_table tbody').on( 'click', '.admin-action',function(){

      var action =  $(this).data('action');
      var id = $(this).data('id');
      var requestInfo = $(this).data('info');
      if(action=='Approved')
      {
        var message = 'Do you want to approve the request';
      }else{
        var message = "Do you want to cancel the request";
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
                      url: actonOnRequestRoute,
                      data: {'id' : id,'action':action,'requestInfo':requestInfo},
                      //headers: {'X-CSRF-Token': csrfToken},
                      headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                      success: function(data)
                      {
                        //Swal.fire('',data,'success')
                        Swal.fire({
                          position: 'center',
                          icon: 'success',
                          title: data,
                          showConfirmButton: false,
                          timer: 1500
                        })
                        $('#request_table').DataTable().clear().draw();
                      }
            });
      }
    })

  });

});