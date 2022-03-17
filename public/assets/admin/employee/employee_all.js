$(function () {

    var table = $('#users-table').DataTable({
        processing: true,
        serverSide: true,
        ajax: employee_datatable_path,
        columns: [
            {data: 'DT_RowIndex', orderable: false, searchable: false},
            {data: 'name', name: 'first_name', 'class': 'clickable'},
            {data: 'email', 'class': 'clickable'},
            {data: 'phone', name: 'user_details.phone', 'class': 'clickable'},
            {data: 'designation', name: 'designations.name', 'class': 'clickable'},
            {data: 'active', 'class': 'clickable'},
            {data: 'action', orderable: false, searchable: false},
        ],
        order: [[0, 'desc']],
        "pageLength": 100
    });


    $('tbody').on('click', '#suspend-btn', function () {
        let id = $(this).data('id');

        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to suspend the employee",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: 'POST',
                    url: asset_path + '/admin/employees/suspend',
                    data: {'id': id},
                    headers: {'X-CSRF-Token': csrf_token},
                    success: function (data) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Employee is suspended successfully',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        $('#users-table').DataTable().clear().draw();
                    }
                });
            }
        });


    });

    $('tbody').on('click', 'td.clickable', function () {
        window.location = $(this).parent().data('href');

    });

    $('tbody').on('click', '#active-btn', function () {
        let id = $(this).data('id');

        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to active the employee",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: 'POST',
                    url: asset_path + '/admin/employees/active',
                    data: {'id': id},
                    headers: {'X-CSRF-Token': csrf_token},
                    success: function (data) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Employee is activated successfully',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        $('#users-table').DataTable().clear().draw();
                    }
                });
            }
        });


    });


    $('tbody').on('click', '#delete-btn', function () {
        let id = $(this).data('id');

        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to permanently delete the employee",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: 'POST',
                    url: asset_path + '/admin/employees/delete',
                    data: {'id': id},
                    headers: {'X-CSRF-Token': csrf_token},
                    success: function (data) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Employee is deleted successfully',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        $('#users-table').DataTable().clear().draw();
                    }
                });
            }
        });


    });

});

$(".alert").fadeTo(5000, 5000).slideUp(800, function () {
    $(".alert").alert('close');
});
