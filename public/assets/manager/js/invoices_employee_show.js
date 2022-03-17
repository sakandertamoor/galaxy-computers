$(document).ready(function () {

    calculateTotalPay();

});


function removeRow(btn) {
    $(btn).parent().parent().remove();

    let totalHrs = 0;

    $('table > tbody  > tr').each(function (index, tr) {
        if (index != 0 && index != $('table > tbody > tr').length - 1) {
            totalHrs += parseFloat($(tr).find('#hrs').text());
            // console.log($(tr).find('#hrs').text());
        }
    });

    $('#totalHrs').text(totalHrs);
    calculateTotalPay();
}


function calculateTotalPay() {

    let totalHrs = $('#totalHrs').text();
    let chargeOutRate = $('#chargeOutRate').val();
    let totalPay = $('#totalPay');

    totalPay.text((totalHrs * chargeOutRate).toFixed(2));

    $('#chargeOutRate').on('change', function () {
        let totalHrs = $('#totalHrs').text();
        let chargeOutRate = $('#chargeOutRate').val();
        let totalPay = $('#totalPay');

        totalPay.text((totalHrs * chargeOutRate).toFixed(2));
    });

}

// Make Payment

$('#makePayment').on('click', function (e) {

    $('#makePayment').prop("disabled", true);

    let timerInterval;
    Swal.fire({
        title: 'Generating Invoice!',
        html: 'Please wait, while we generate Employee Invoice.',
        timer: 60000,
        timerProgressBar: true,
        onBeforeOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
                const content = Swal.getContent();
                if (content) {
                    const b = content.querySelector('b');
                    if (b) {
                        b.textContent = Swal.getTimerLeft()
                    }
                }
            }, 100)
        },
        onClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        // window.location.replace(url_path + '/invoices/mix-designs/all');

    });

    let idArray = [];

    $('table > tbody  > tr').each(function (index, tr) {
        if (index != 0 && index != $('table > tbody > tr').length - 1) {
            idArray[--index] = $(tr).attr('id');
        }
    });


    e.preventDefault();

    let totalHrs = $('#totalHrs').text();
    let totalPay = $('#totalPay').text();

    let charge_out_rate_value = $('#chargeOutRate').val();


    $.ajax({

        headers: {
            'X-CSRF-TOKEN': csrf
        },

        data: {
            charge_out_rate: charge_out_rate_value,
            total_hrs: totalHrs,
            total_pay: totalPay,
            workArray: idArray,
            user_id: userId,
            work_type: workType,
            start_date: startDate,
            end_date: endDate,
        },
        url: action,
        type: "POST",
        async: false,

        success: function (result) {

            if (result.stored == 1) {
                $.ajax({
                    url: url_path + '/pdf/invoices/employees', success: function () {
                        window.location.replace(url_path + '/timesheets/' + userId);
                    }
                })
            }

        }

    });

});
