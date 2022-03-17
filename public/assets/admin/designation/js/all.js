$( document ).ready( function () {
      $('.table').css({
        'overflow-x': 'hidden',
    });
    $('#designation').DataTable({
      lengthMenu: [[100, 50, 25, 10, -1], [100, 50, 25, 10,  "All"]],
      processing: true,
      serverSide: true,
      ajax: allDesignation,
      columns: [
               { data: 'id',"class" : "clickable",  },
               { data: 'name', "class" : "clickable title", },
               { data: 'status', "class" : "clickable title", },
               { data: 'action' }

            ]
});
//$('.clickable td').on( 'click', function () {
 $('#designation tbody').on( 'click', 'td.clickable', function () {
   var html = $(this).parent();
    window.location =html.data('href');
});

    $('#designation tbody').on( 'click', '#suspend-btn',function(){

        var action =  $(this).data('action');
        var designationTitle =  $(this).parents("tr").find('td.title').text();
        if(action=='suspend')
        {
        // var message = 'Are you sure want to suspend '+designationTitle+' designation';
        var message = 'Do you want to suspend the designation';
        }else{
        //var message = 'Are you sure want to Activate '+designationTitle+' designation';
        var message = "Do you want to re-active the designation";
        }
        var id =  $(this).data('id');
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
                        url: suspendAndActive,
                        data: {'id' : id,'action':action},
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
                          $('#designation').DataTable().clear().draw();
                        }
              });
        }
      })

    });

});