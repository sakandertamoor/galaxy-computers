$(function () {

    var table = $('#client_table').DataTable({
        processing: true,
        serverSide: true,
        ajax: client_datatable_path,
        columns: [
            {data: 'id', 'class': 'clickable'}, // for serial Number
            {data: 'full_name', 'class': 'clickable'},
            {data: 'email', 'class': 'clickable'},
            {data: 'address', 'class': 'clickable'},
            {data: 'payment', 'class': 'clickable'},
            // {data: 'action', orderable: false, searchable: false},
        ],
        order: [[0, 'desc']],
        "pageLength": 100
    });
    table.on('order.dt search.dt', function () {
        table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();

    $('tbody').on('click', 'td.clickable', function () {
        window.location = $(this).parent().data('href');

    });

});


