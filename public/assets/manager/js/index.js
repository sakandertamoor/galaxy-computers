$(function() {
    $('#search-employee').select2({
    placeholder: "Select Employee",
    });
    $('#search-project').select2({
    placeholder: "Select Employee",
    // maximumSelectionLength: 1,
    // allowClear: true
    });
  });

  //var workType  = 'field_work';
  $( document ).ready( function () {
    $('.table').css({
      'overflow-x': 'hidden',
    });
    $.ajax({
            type: 'GET',
            url: employeesAndProjectList,
            //headers: {'X-CSRF-Token': '{{ csrf_token() }}'},
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            success: function(data)
            {
              var employees = data.employees;
              var projects = data.projects;
              var managers = data.managers;
              var projectOptions = '<option value="null">Select Project</option>';
              var employeeOptions = '<option value="null">Select Employee</option>';
              var managerOptions = '<option value="null">Select Manager</option>';
              $.each(projects,function(index,value){
                projectOptions+='<option value= '+value.id+'>'+value.number+' + '+value.name+'</option> ';
              })
              $.each(employees,function(index,value){
                employeeOptions+='<option value= '+value.id+'>'+value.first_name+' '+value.last_name+'</option> ';
              })
              $.each(managers,function(index,value){
                managerOptions+='<option value= '+value.id+'>'+value.first_name+' '+value.last_name+'</option> ';
              })

              $('#search-project').append(projectOptions);
              $('#search-employee').append(employeeOptions);
              $('#search-manager').append(managerOptions);

            }
          });



    // $('.table tbody').on('click','tr',function(){
    //   window.open($(this).data("href"),'_blank');
    // })


});


    $('#filter_btn').on('click',function(){
      var projectId = $('#search-project').val();
      var employeeId = $('#search-employee').val();
      var managerId = $('#search-manager').val();
      var workType = $('#search-worktype').val();
      var startDate =  $('#start-date').val();
      var endDate =  $('#end-date').val();

      $('#project').dataTable().fnDestroy();
      $('#project-all').dataTable().fnDestroy();
      $('#employee').dataTable().fnDestroy();
      $('#employee-all').dataTable().fnDestroy();
      $('#employee-project').dataTable().fnDestroy();
      $('#employee-project-all').dataTable().fnDestroy();
      $('#all-worktype').dataTable().fnDestroy();
      $('#worktype').dataTable().fnDestroy();
      $('#manager').dataTable().fnDestroy();
      $('#manager-all').dataTable().fnDestroy();
      $('#manager-project').dataTable().fnDestroy();
      $('#manager-project-all').dataTable().fnDestroy();
      $('#manager-employee').dataTable().fnDestroy();
      $('#manager-employee-all').dataTable().fnDestroy(); 
      $('#manager-employee-project').dataTable().fnDestroy();
      $('#manager-employee-project-all').dataTable().fnDestroy();
      
      if(workType=='lab_work'){
         $('#project thead tr:first' ).find('th:eq( 3 )').html('Test completed');
         $('#employee thead tr:first' ).find('th:eq( 2 )').html('Test completed');
         $('#employee-project thead tr:first' ).find('th:eq( 4 )').html('Test completed'); 
         $('#all-worktype thead tr:first' ).find('th:eq( 1 )').html('Test completed');
         $('#manager thead tr:first' ).find('th:eq( 2 )').html('Test completed');
         $('#manager-project thead tr:first' ).find('th:eq( 2 )').html('Test completed');
         $('#manager-employee thead tr:first' ).find('th:eq( 2 )').html('Test completed');
         $('#manager-employee-project thead tr:first' ).find('th:eq( 3 )').html('Test completed');
       }else{
        $('#project thead tr:first' ).find('th:eq( 3 )').html('Hours Logged');
        $('#employee thead tr:first' ).find('th:eq( 2 )').html('Hours Logged');
        $('#employee-project thead tr:first' ).find('th:eq( 4 )').html('Hours Logged'); 
        $('#all-worktype thead tr:first' ).find('th:eq( 1 )').html('Hours Logged');
        $('#manager thead tr:first' ).find('th:eq( 2 )').html('Hours Logged');
        $('#manager-project thead tr:first' ).find('th:eq( 2 )').html('Hours Logged');
        $('#manager-employee thead tr:first' ).find('th:eq( 2 )').html('Hours Logged');
        $('#manager-employee-project thead tr:first' ).find('th:eq( 3 )').html('Hours Logged');
      }
     
      
      $('#div_project').hide();
      $('#div_project_all').hide();
      $('#div_employee').hide();
      $('#div_employee_all').hide();
      $('#div_emp_project').hide();
      $('#div_emp_project_all').hide(); 
      $('#div_all_worktype').hide();
      $('#div_worktype').hide();
      $('#div_manager').hide();
      $('#div_manager_all').hide();
      $('#div_manager_project').hide();
      $('#div_manager_project_all').hide();
      $('#div_manager_employee').hide();
      $('#div_manager_employee_all').hide();
      $('#div_manager_employee_project').hide();
      $('#div_manager_employee_project-all').hide();
      

      $.ajax({
            type: 'POST',
            url: filterFormValue,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            data:'projectId=' + projectId + '&employeeId=' + employeeId + '&managerId=' +managerId+ '&startDate=' + startDate + '&endDate=' + endDate + '&workType=' + workType,
            success: function(data)
            {
              if(projectId!='null' && employeeId=='null' && managerId=='null')
              {


                if(workType=='All')
                {


                    $('#div_project_all').show();
                    $('#project-all').DataTable({
                      processing: true,
                      serverSide: true,
                      ajax: projectHrsLogged,
                      columns: [
                                { data: 'number',  },
                                { data: 'name',  },
                                { data: 'project_manager',  },
                                { data: 'field_work',render: $.fn.dataTable.render.number( ',', '.', 2, '' )  },
                                { data: 'lab_work',  },
                                // { data: 'expenses',  },
                                { data: 'action' }

                            ]
                    });
                }
                else
                {

                    $('#div_project').show();
                    $('#project').DataTable({
                      processing: true,
                      serverSide: true,
                      ajax: projectHrsLogged,
                      columns: [
                                { data: 'number',  },
                                { data: 'name',  },
                                { data: 'project_manager',  },
                                { data: 'hrs_logged',render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
                                { data: 'action' }

                            ]
                     });
                }

              }
              if(employeeId!='null' && projectId=='null' && managerId=='null')
              {


                if(workType=='All')
                {

                    $('#div_employee_all').show();
                    $('#employee-all').DataTable({
                      processing: true,
                      serverSide: true,
                      ajax: employeeHrsLogged,
                      columns: [
                                { data: 'id',  },
                                { data: 'first_name',  },
                                { data: 'field_work',  render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
                                { data: 'lab_work',  },
                                // { data: 'expenses',  },
                                { data: 'action' }

                            ]
                    });
                }
                else
                {

                    $('#div_employee').show();
                    $('#employee').DataTable({
                      processing: true,
                      serverSide: true,
                      ajax: employeeHrsLogged,
                      columns: [
                                { data: 'id',  },
                                { data: 'first_name',  },
                                { data: 'field_work',  render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
                                { data: 'action' }

                            ]
                    });
                }

              }
              if(projectId!='null' && employeeId!='null' && managerId=='null')
              {
               //$('#employee-project').DataTable().clear().draw();
                if(workType=='All')
                {
                    $('#div_emp_project_all').show();
                    $('#employee-project-all').DataTable({
                      processing: true,
                      serverSide: true,
                      responsive: true,
                      ajax: empAndProjectHrsLogged,
                      columns: [
                                { data: 'project_number',  },
                                { data: 'project_name',  },
                                { data: 'project_manager',  },
                                { data: 'employee_first_name',  },
                                { data: 'field_work',  render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
                                { data: 'lab_work',  },
                                // { data: 'expense_work',  },
                                { data: 'action' }

                            ],

                    });

                }
                else
                {
                    $('#div_emp_project').show();
                    $('#employee-project').DataTable({
                      processing: true,
                      serverSide: true,
                      responsive: true,
                      ajax: empAndProjectHrsLogged,
                      columns: [
                                { data: 'number',  },
                                { data: 'name',  },
                                { data: 'project_manager',  },
                                { data: 'first_name',  },
                                { data: 'time',  render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
                                { data: 'action' }

                            ],

                    });
                }


              }

              if(managerId!='null' && projectId=='null' && employeeId=='null')
              {
                if(workType=='All')
                {
                  $('#div_manager_all').show();
                  $('#manager-all').DataTable({
                    processing: true,
                    serverSide: true,
                    responsive: true,
                    ajax: manager,
                    columns: [
                              { data: 'first_name',  },
                              { data: 'assigned_projects',  },
                              { data: 'field_work',  render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
                              { data: 'lab_work',  render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
                              { data: 'action' }

                          ],

                  });
                  
                }
                else{
                    $('#div_manager').show();
                    $('#manager').DataTable({
                      processing: true,
                      serverSide: true,
                      responsive: true,
                      ajax: manager,
                      columns: [
                                { data: 'first_name',  },
                                { data: 'assigned_projects',  },
                                { data: 'work_type',  render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
                                { data: 'action' }

                            ],

                    });
                }
                    
              }

              if(managerId!='null' && projectId!='null' && employeeId=='null')
              {
                if(workType=='All')
                {
                  $('#div_manager_project_all').show();
                   $('#manager-project-all').DataTable({
                    processing: true,
                    serverSide: true,
                    responsive: true,
                    ajax: managerProject,
                    columns: [
                              { data: 'first_name',  },
                              { data: 'project_number',  },
                              { data: 'field_work',  render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
                              { data: 'lab_work',  render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
                              { data: 'action' }

                          ],

                  });

                }
                else{
                   $('#div_manager_project').show();
                   $('#manager-project').DataTable({
                    processing: true,
                    serverSide: true,
                    responsive: true,
                    ajax: managerProject,
                    columns: [
                              { data: 'first_name',  },
                              { data: 'project_number',  },
                              { data: 'work_type',  render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
                              { data: 'action' }

                          ],

                  });
                }
              }

              if(managerId!='null' && employeeId!='null' && projectId=='null')
              {
                if(workType=='All')
                {
                  $('#div_manager_employee_all').show();
                  $('#manager-employee-all').DataTable({
                    processing: true,
                    serverSide: true,
                    responsive: true,
                    ajax: managerEmployee,
                    columns: [
                              { data: 'project_manager',  },
                              { data: 'employee_name',  },
                              { data: 'field_work',  render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
                              { data: 'lab_work',  render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
                              { data: 'action' }

                          ],

                  });
                }
                else{
                    $('#div_manager_employee').show();
                    $('#manager-employee').DataTable({
                      processing: true,
                      serverSide: true,
                      responsive: true,
                      ajax: managerEmployee,
                      columns: [
                                { data: 'project_manager',  },
                                { data: 'employee_name',  },
                                { data: 'work_type',  render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
                                { data: 'action' }

                            ],

                    });
                }
              }

              if(managerId!='null' && employeeId!='null' && projectId!='null')
              {
                if(workType=='All')
                {
                  $('#div_manager_employee_project_all').show();
                  $('#manager-employee-project-all').DataTable({
                   processing: true,
                   serverSide: true,
                   responsive: true,
                   ajax: managerEmployeeProject,
                   columns: [
                             { data: 'number',  },
                             { data: 'employee_name',  },
                             { data: 'manager_name',  },
                             { data: 'field_work',  render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
                             { data: 'lab_work',  render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
                             { data: 'action' }

                         ],
                      

                  });
                }
                else{
                     $('#div_manager_employee_project').show();
                     $('#manager-employee-project').DataTable({
                      processing: true,
                      serverSide: true,
                      responsive: true,
                      ajax: managerEmployeeProject,
                      columns: [
                                { data: 'number',  },
                                { data: 'employee_name',  },
                                { data: 'manager_name',  },
                                { data: 'work_type',  render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
                                { data: 'action' }

                            ],
                         

                    });
                }
                
              }

              if(projectId=='null' && employeeId=='null' && managerId=='null')
              {
                if(workType=='All')
                {
                  $('#div_worktype').show();
                  $('#worktype').DataTable({
                    processing: true,
                    serverSide: true,
                    responsive: true,
                    ajax: allProject,
                    columns: [
                              { data: 'all',  },
                              { data: 'field',  render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
                              { data: 'lab',  render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
                              { data: 'action' }

                          ],

                  });

                }
                else 
                {
                  $('#div_all_worktype').show();
                    $('#all-worktype').DataTable({
                      processing: true,
                      serverSide: true,
                      responsive: true,
                      ajax: allProject,
                      columns: [
                                { data: 'all',  },
                                { data: 'time',  render: $.fn.dataTable.render.number( ',', '.', 2, '' )},
                                { data: 'action' }

                            ],

                    });
                }
              }




            }
          });
    }) ;



 $( "#start-date" ).datepicker({ dateFormat: 'yy/mm/dd' });
 $( "#end-date" ).datepicker({ dateFormat: 'yy/mm/dd' });
