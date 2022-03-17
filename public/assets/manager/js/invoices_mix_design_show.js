function removeRow(btn) {
    $(btn).parent().parent().remove();
    calculateTotal();
}

function calculateFee() {
    let total = 0;

    $('table > tbody > tr').each(function (index, tr) {
        if ($(tr).prop('id')) {
            total += parseFloat($(tr).find('#subtotal').text());
        }
    });
    $('#fee').text(total);

}

function calculateTotal() {
    calculateFee();

    let fee = parseFloat($('#fee').text());
    let hst = parseFloat($('#hst').val());
    let total = $('#total').text(fee + (fee * hst/100));
}


$(document).ready(function () {
    $('#hst').val('13');
    calculateTotal();

    $('#hst').on('change', function () {
        calculateTotal();
    });
});

function calculateSampleRate(input) {
    let total_sample = $(input).parent().find('#total_sample').text();
    let sample_rate = $(input).val();

    let subtotal = $(input).parent().parent().find('#subtotal').text(parseFloat(total_sample) * parseFloat(sample_rate));

    calculateTotal();

}

$('#makePayment').on('click', function (e) {

    $('#makePayment').prop("disabled", true);

    let timerInterval;
    Swal.fire({
        title: 'Generating Invoice!',
        html: 'Please wait, while we generate Mix Design Invoice.',
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
    let subTotalArray = [];
    let arrayCount = 0;

    $('table > tbody  > tr').each(function (index, tr) {
        if ($(tr).prop('id')) {
            idArray[arrayCount] = $(tr).attr('id');
            subTotalArray[arrayCount++] = $(tr).find('#subtotal').text();
        }
    });


    e.preventDefault();

    let fee = parseFloat($('#fee').text());
    let hst = parseFloat($('#hst').val());
    let total = parseFloat($('#total').text());

    let attentionInput = $('#attention').val();


    $.ajax({

        headers: {
            'X-CSRF-TOKEN': csrf
        },

        data: {
            total_amount: total,
            hst: hst,
            fee: fee,
            type: 'mix_design',
            project_id: projectId,
            id_array: idArray,
            subtotal_array: subTotalArray,
            attention: attentionInput
        },
        url: action,
        type: "POST",
        async: false,

        success: function (result) {


            if (result.stored == 1) {


                $.ajax({
                    url: url_path + '/pdf/invoices/mix-designs', success: function () {
                        window.location.replace(url_path + '/invoices/mix-designs/all');
                    }
                });
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'OOPS...',
                    text: 'Something went wrong!',
                });
            }

        }


    });

});


