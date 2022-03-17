$( document ).ready( function () {
    $('.table').css({
      'overflow-x': 'hidden',
  });
  $('#manager').select2({
    width: '100%',
    placeholder: "Select Manager",
    allowClear: true
  });
  $('#project').select2({
    width: '100%',
    placeholder: "Select Project",
    allowClear: true
  })
  $('#lab').DataTable({
    lengthMenu: [[100, 50, 25, 10, -1], [100, 50, 25, 10,  "All"]],
    scrollX: true,
    order: [[ 0, "desc" ]],
    processing: true,
    serverSide: true,
    ajax: fetchLabWorks,
    columns: [
             { data: 'date',"class" : "clickable",  },
             { data: 'first_name', "class" : "clickable title", },
             { data: 'projectNumber', "class" : "clickable title", }, 
             { data: 'projectName', "class" : "clickable title", }, 
             { data: 'project_manager', "class" : "clickable title", },
             { data: 'activity', "class" : "clickable title", },  
             { data: 'sampleType', "class" : "clickable title", },  
             { data: 'testNumber', "class" : "clickable title", },
             { data: 'remarks', "class" : "clickable title", },
             { data: 'action' }

          ]
});
//$('.clickable td').on( 'click', function () {
$('#lab tbody').on( 'click', 'td.clickable', function () {
 var html = $(this).parent();
  window.location =html.data('href');
});

  $('#lab tbody').on( 'click', '#lab-btn-delete',function(){
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
                          $('#lab').DataTable().clear().draw();
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
  var projectId = $('#project').val();
  var managerId = $('#manager').val();
  $.ajax({
      type: 'POST',
      url: filterFormRoute,
      data: {'from_range':fromDate,'to_range':toDate,'project_id':projectId,'manager_id':managerId},
      headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
      success: function (data) {
    
           $('#lab').DataTable().clear().draw();
          
           
         
      }
  });
});

let selectedProject = $('#project').val();
$('#project').on('change',function(){
  if(selectedProject){
    $('#from_range').val(''); // reset date value to null
    $('#to_range').val(''); // reset date value to null
  }
 
  selectedProject  = $(this).val();
 
});