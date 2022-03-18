$(function () {

    var table = $('#category_table').DataTable({
        processing: true,
        serverSide: true,
        ajax: category_datatable_path,
        columns: [
            {data: 'id', 'class': 'clickable'}, // for serial Number
            {data: 'category_name', 'class': 'clickable'},
            {data: 'status', 'class': 'clickable'},
            {data: 'action', orderable: false, searchable: false},
        ],
        order: [[0, 'desc']],
        "pageLength": 100
    });
    table.on('order.dt search.dt', function () {
        table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();


    // $('tbody').on('click', '#suspend-btn', function () {
    //     let id = $(this).data('id');

    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "Do you want to suspend the manager",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes',
    //         cancelButtonText: 'No'
    //     }).then((result) => {
    //         if (result.value) {
    //             $.ajax({
    //                 type: 'POST',
    //                 url: asset_path + '/admin/manager/suspend',
    //                 data: {'id': id},
    //                 headers: {'X-CSRF-Token': csrf_token},
    //                 success: function (data) {
    //                     Swal.fire({
    //                         position: 'center',
    //                         icon: 'success',
    //                         title: 'Manager is suspended successfully',
    //                         showConfirmButton: false,
    //                         timer: 2000
    //                     });
    //                     $('#manager_table').DataTable().clear().draw();
    //                 }
    //             });
    //         }
    //     });


    // });

    $('tbody').on('click', 'td.clickable', function () {
        window.location = $(this).parent().data('href');

    });



    // $('tbody').on('click', '#delete-btn', function () {
    //     let id = $(this).data('id');

    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "Do you want to permanently delete the employee",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes',
    //         cancelButtonText: 'No'
    //     }).then((result) => {
    //         if (result.value) {
    //             $.ajax({
    //                 type: 'POST',
    //                 url: asset_path + '/admin/employees/delete',
    //                 data: {'id': id},
    //                 headers: {'X-CSRF-Token': csrf_token},
    //                 success: function (data) {
    //                     Swal.fire({
    //                         position: 'center',
    //                         icon: 'success',
    //                         title: 'Employee is deleted successfully',
    //                         showConfirmButton: false,
    //                         timer: 2000
    //                     });
    //                     $('#users-table').DataTable().clear().draw();
    //                 }
    //             });
    //         }
    //     });


    // });

});


