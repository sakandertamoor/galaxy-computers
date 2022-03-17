$('#all_inspection_invoices').on( 'click', '#delete-invoice',function(){
  var inspectionId = $(this).data('id');
  Swal.fire({
    title: 'Are you sure?',
    text:'Do you want to permenantly delete this invoice!',
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
            url: delete_invoice_route,
            data: {'id' : inspectionId},
            //headers: {'X-CSRF-Token': csrfToken},
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            success: function(data)
            {
             if(data.success){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Invoice is deleted successfully!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  location.reload();
                 // $('#all_inspection_invoices').DataTable().clear().draw();
             }else{
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'OOPS! error occoured!',
                    showConfirmButton: false,
                    timer: 1500
                  })
             }
              
            }
  });

    }
 });

});