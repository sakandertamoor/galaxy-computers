$(document).ready(function () {
    
    

    totalFee = $('#total_fee').text();
    onlyFeeNumber = totalFee.replace(/[^0-9a-zA-Z.]/g, '');
    totalHst = $('#span_hst').text();
    onlyHstNumber = totalHst.replace(/[^0-9a-zA-Z.]/g, '');
    totalPaid = parseFloat(onlyFeeNumber) + parseFloat(onlyHstNumber / 100) * parseFloat(onlyFeeNumber);
    $('#span_hst').text((parseFloat(onlyHstNumber / 100) * parseFloat(onlyFeeNumber)).toFixed(2));
    $('#td_total').text('$' + totalPaid.toFixed(2));

    $('#field_ids_for_invoice').val(fieldWorksIdArray);
    
});
$(".field-value").keyup(function () {
    hrsLogged = $(this).attr('hrsLogged');
    changedRate = $(this).val();
    $(this).attr('rate', changedRate);
    total = hrsLogged * changedRate;
    $(this).closest('td').next().text('$' + total.toFixed(2));
    calculateTotalFee();

});

$(".lab-value").keyup(function () {
    testCompleted = $(this).attr('testCompleted');
    changedRate = $(this).val();
    $(this).attr('rate', changedRate);
    total = testCompleted * changedRate;
    $(this).closest('td').next().text('$' + total.toFixed(2));
    calculateTotalFee();
});
$(".expense-value").keyup(function () {
    kilometers = $('#kilometersEntered').val();
    changedRate = changedRate = $(this).val();
    $(this).attr('perkm', changedRate);
    total = kilometers * changedRate;
    $(this).closest('td').next().text('$' + total.toFixed(2));
    calculateTotalFee();
});
$("#kilometersEntered").keyup(function () {
    kilometers = $('.expense-value').val();
    changedRate = changedRate = $(this).val();
    $(this).attr('perkm', changedRate);
    total = kilometers * changedRate;
    $(this).closest('td').next().text('$' + total.toFixed(2));
    calculateTotalFee();
});

$(".field-expense").keyup(function () {
    total = parseFloat($(this).val());
    if(isNaN(total)){
        total = 0;
    }
    $(this).closest('td').next().text('$' + total)
    calculateTotalFee();
});
$(".manager-value").keyup(function () {
    total = $(this).val() * $('#projectManagerHrs').val();
    if(total==''){
        total = 0;
    }
    $(this).closest('td').next().text('$' + total.toFixed(2));
    calculateTotalFee();
});
$('#expenseAmount').keyup(function () {
    total = $(this).val();
    if(total==''){
        total = 0;
    }
    $('#expenseTotal').text('$' + parseFloat(total).toFixed(2));
    calculateTotalFee();
});
$('#projectManagerHrs').keyup(function () {
    total = $(this).val() * $('.manager-value').val();
    if(total==''){
        total = 0;
    }
    $('#projectManagerTotal').text('$' + total.toFixed(2));
    calculateTotalFee();
});



function calculateTotalFee() {


    let totalFee = 0;
    $('td.tdTotal').each(function (index, tr) {

        var lastTd = $(this).text();
        myString = lastTd.replace(/[^0-9a-zA-Z.]/g, '');
        newValue = parseFloat(myString);
        totalFee += parseFloat(newValue);
    });
    $('#total_fee').text("$" + totalFee.toFixed(2));
    totalHst = $("#span_hst").text();
    hstNumber = totalHst.replace(/[^0-9a-zA-Z.]/g, '');
    console.log(hstNumber);
    hstNumeric = parseFloat(hstNumber);
    $("#span_hst").text(($('#hst').val()/100 * totalFee).toFixed(2));
    totalAmout = ($('#hst').val()/100 * totalFee) + totalFee;
    $("#td_total").text("$" + totalAmout.toFixed(2));

}

$("#hst").keyup(function () {
    totalFee = $('#total_fee').text();
    onlyNumber = totalFee.replace(/[^0-9a-zA-Z.]/g, '');
    changedHst = $(this).val();
    if (!changedHst) {
        changedHst = 0;
    }
    $("#span_hst").text((parseFloat(changedHst / 100) * parseFloat(onlyNumber)).toFixed(2));
    total = parseFloat(changedHst / 100) * parseFloat(onlyNumber) + parseFloat(onlyNumber);
    $("#td_total").text("$" + total.toFixed(2));

});


$('#generate_inovice').on('click', function () {

    $('#generate_inovice').prop("disabled", true);

    let timerInterval;
    Swal.fire({
        title: 'Inspection Testing Invoice!',
        html: 'Please wait, while we generate Inspection Testing Invoice.',
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
         window.location.replace(url_path + '/invoices/mix-designs/all');

    });

    var ProjectId = $('#project_id').val();
    var totalPaidString = $('#td_total').text();
    var totalPaid = totalPaidString.replace(/[^0-9a-zA-Z.]/g, '');
    console.log(totalPaid);
    fee = $('#total_fee').text();
    totalFee = fee.replace(/[^0-9a-zA-Z.]/g, '');
    hst = $('#span_hst').text();
    totalHst = hst.replace(/[^0-9a-zA-Z.]/g, '');
    var fieldWork = [];

    $(".field-value").each(function (index, key) {
        obj = {};
        obj['designation_id'] = $(this).attr('designation_id');
        obj['designation_name'] = $(this).attr('designation');
        obj['field_text'] = $(this).parent().parent().find('#field_text').val();
        obj['field_visit'] = $(this).parent().parent().find('#field_visit').val();
        obj['rate'] = $(this).attr('rate');
        obj['hrsLogged'] = $(this).attr('hrsLogged');
        fieldWork.push(obj);
    });

    var labWork = [];
    $(".lab-value").each(function (index, key) {

        obj = {};
        obj['lab_text'] = $(this).parent().parent().find('#lab_text').val();
        obj['sample_id'] = $(this).attr('sample_id');
        obj['test_name'] = $(this).attr('testName');
        obj['rate'] = $(this).attr('rate');
        obj['lab_test_no'] = $(this).parent().parent().find('.lab_test_no').text();
        obj['test_completed'] = $(this).attr('testCompleted');
        labWork.push(obj);

    });
    var perKmRate = 0;
    // var expenseWork = [];
    $(".expense-value").each(function (index, key) {
        //obj = {};
        //obj['kilometers'] = $(this).attr('kilometers');
        // obj['rate'] = $(this).attr('perKm');
        perKmRate = $(this).attr('perKm');
        // expenseWork.push(obj);

    });


    var expenseWork = [];
    $(".expense-activity-id").each(function (index, key) {
        obj = {};
        obj['per_activity_km'] = $(this).attr('perActivityKm');
        obj['rate'] = perKmRate;
        obj['activity_id'] = $(this).attr('activityId');
        expenseWork.push(obj);
    });
    var field_expenses = [];

        managerCost = $('#projectManager').val();
       
    $.ajax({
        type: 'POST',
        url: inspectionTesting,
        //headers: {'X-CSRF-Token': '{{ csrf_token() }}'},
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
        data: {
            'invoiceNumber': $('#invoice_number').val(),
            'invoiceDate':$('#invoice_date').val(),
            'fieldWork': fieldWork,
            'labWork': labWork,
            'expenseWork': expenseWork,
            'managerWork':managerCost,
            'ProjectId': ProjectId,
            'totalPaid': totalPaid,
            'totalFee': totalFee,
            'totalHst': totalHst,
            'fieldWorksIdArray': fieldWorksIdArray,
            'labWorksIdArray': labWorksIdArray,
            'expenseWorksIdArray': expenseWorksIdArray,
            'attention': $('#attention').val(),
            'heading': $('#heading').val(),
            'projectManagerText': $('#projectManagerText').val(),
            'projectManagerHrs': $('#projectManagerHrs').val(),
            'projectManagerTotal': $('#projectManagerTotal').text(),
            'kilometerTotal': $('#kilometersTotal').text(),
            'kilometerEntered': $('#kilometersEntered').val(),
            'kilometerRate': $('.expense-value').val(),
            'expenseTotal': $('#expenseTotal').text(),
        },
        success: function (data) {
            var status = data.status;
            if (status) {

                $.ajax({
                    url: base_url + 'inspectionTestingPDF', success: function () {
                        window.location.replace(base_url + 'allInspectionInoices');
                    }
                });

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'OOPS...',
                    text: 'Something went wrong!',
                });
            }


        }
    });


});

function removeRow(btn,type) {
   if(type=='field')
   {
        var fieldIds = $(btn).parent().parent().attr('field_work_ids');
    
        fieldIds = fieldIds.slice(1,-1);
        fieldIds = fieldIds.split(',');
        var fieldIdsForInvoice  =[];
        fieldIdsForInvoice.push($('#field_ids_for_invoice').val());
        
        $.each(fieldIds,function(i,v){
            $.each(fieldWorksIdArray[0],function(index,value){
            if(value==v){
                    console.log('remove value info Index:'+index+' value: '+v);
                    fieldWorksIdArray[0].splice(index, 1);
                }
            });
        });
        console.log(fieldWorksIdArray);
   }else if(type=='lab'){
            var labIds = $(btn).parent().parent().attr('lab_work_ids');
            
            labIds = labIds.slice(1,-1);
            labIds = labIds.split(',');
            $.each(labIds,function(i,v){
                $.each(labWorksIdArray[0],function(index,value){
                if(value==v){
                        console.log('remove value info Index:'+index+' value: '+v);
                        labWorksIdArray[0].splice(index, 1);
                    }
                });
            });
    
            console.log(labWorksIdArray);
   }

   $(btn).parent().parent().remove();
   calculateTotalFee();
}
$( "#invoice_date" ).datepicker({ dateFormat: 'd MM yy',
//monthNames: [ "Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "October", "November", "December" ]


});