$( document ).ready( function () {
    $('.table').css({
      'overflow-x': 'hidden',
    });
    $('#manager').select2({
      width: '100%',
      placeholder: "Select Manager",
      allowClear: true
    });
    $('#employee').select2({
      width: '100%',
      placeholder: "Select Employee",
      allowClear: true
    });
  
  $('#field').DataTable({
    "footerCallback": function ( row, data, start, end, display ) {
      var api = this.api();
      nb_cols = api.columns().nodes().length;
      var j = 6;
      while(j < nb_cols){
          var pageTotal = api
      .column( j, { page: 'current'} )
      .data()
      .reduce( function (a, b) {
         if(j >= 6 && j <=8){
            var total =  Number(a) + Number(b);
            return total.toFixed(2);
          }else{
            return '';
          }
          
      }, 0 );
      // Update footer
      $( api.column( j ).footer() ).html(pageTotal);
                  j++;
              } 
          },
    lengthMenu: [[100, 50, 25, 10, -1], [100, 50, 25, 10,  "All"]],
    scrollX: true,
    order: [[ 0, "desc" ]],
    processing: true,
    serverSide: true,
    ajax: fetchFieldWorks,
    columns: [
             
             { data: 'date',"class" : "clickable",  },
             { data: 'first_name', "class" : "clickable title", },
             { data: 'projectNumber', "class" : "clickable title", }, 
             { data: 'projectName', "class" : "clickable title", }, 
             { data: 'project_manager', "class" : "clickable title", },  
             { data: 'activity', "class" : "clickable title", },  
             { data: 'time', "class" : "clickable title", render: $.fn.dataTable.render.number( ',', '.', 2, '' ) },
             { data: 'expense', "class" : "clickable title", render: $.fn.dataTable.render.number( ',', '.', 2, '' ) },
             { data: 'kilometers', "class" : "clickable title", render: $.fn.dataTable.render.number( ',', '.', 2, '' ) },
             { data: 'remarks', "class" : "clickable title", },
             { data: 'files', "class" : "clickable title", },
             { data: 'action' }
             

          ]
});
//$('.clickable td').on( 'click', function () {
$('#field tbody').on( 'click', 'td.clickable', function () {
 var html = $(this).parent();
  window.location =html.data('href');
});

  $('#field tbody').on( 'click', '#field-btn-delete',function(){

      
      var id =  $(this).data('id');
      Swal.fire({
      title: 'Are you sure?',
      text:'Do you want to permenantly delete this record!',
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
                      url: deleteRoute,
                      data: {'id' : id},
                      //headers: {'X-CSRF-Token': csrfToken},
                      headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
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
                          })
                          $('#field').DataTable().clear().draw();
                        }else{
                            Swal.fire({
                              position: 'center',
                              icon: 'warning',
                              title: 'OOPS Error!',
                              showConfirmButton: true,
                              timer: 1500
                          })
                        }
                        
                      }
            });
      }
    })

  });

});

$("#from_range").datepicker({dateFormat:'yy-mm-dd'});
$("#to_range").datepicker({dateFormat:'yy-mm-dd'});
// for search form i.e frome date and To date

$('#filter_record').click(function(){
  var fromDate = $('#from_range').val();
  var toDate = $('#to_range').val();
  var employeeId = $('#employee').val();
  var managerId = $('#manager').val();
  $.ajax({
      type: 'POST',
      url: filterFormRoute,
      data: {'from_range':fromDate,'to_range':toDate,'employee_id':employeeId,'manager_id':managerId},
      headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
      success: function (data) {
    
           $('#field').DataTable().clear().draw();
          
           
         
      }
  });
});

let selectedEmployee = $('#employee').val();
$('#employee').on('change',function(){
  if(selectedEmployee){
    $('#from_range').val(''); // reset date value to null
    $('#to_range').val(''); // reset date value to null
  }
 
  selectedEmployee  = $(this).val();
 
});