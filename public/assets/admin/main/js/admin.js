function getAllNotification()
{
    $.ajax({
        type: 'GET',
        url: notification_route,
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
        success: function (data) {
           if(data.success){
            if(data.notificationCounter>0){
                
                $('.badge-counter').text(data.notificationCounter);
                $('.sidebar-request-counter').text(data.notificationCounter)
                $('.sidebar-request-counter').show();
                if(data.notificationCounter>9){
                   $('.badge-counter').text('10+');
                   $('.sidebar-request-counter').text('10+');
                }
            }else{
                $('.sidebar-request-counter').hide();
            }
        //    record = data.latestNotification;
        //     notificationHtml = '';
        //     notificationIds = [];
        //    ids = data.oldNotification;
        //    id = null;
        //     $.each(record,function(index,value){
        //         do {
        //                     notificationHtml = '<a class="dropdown-item d-flex align-items-center" href="#">\
        //                     <div class="mr-3">\
        //                     <div class="icon-circle bg-primary">\
        //                         <i class="fas fa-file-alt text-white"></i>\
        //                     </div>\
        //                     </div>\
        //                     <div>\
        //                     <div class="small text-gray-500">'+value.created_at+'</div>\
        //                     <span class="font-weight-bold" data-id="'+value.id+'">'+value.requested_from+' is requested for '+value.work_type+' work!</span>\
        //                     </div>\
        //                 </a>\
        //                 <a class="dropdown-item d-flex align-items-center" href="#">\
        //                     <div class="mr-3">\
        //                     <div class="icon-circle bg-success">\
        //                         <i class="fas fa-donate text-white"></i>\
        //                     </div>\
        //                     </div>\
        //                     <div>\
        //                     <div class="small text-gray-500">'+value.created_at+'</div>\
        //                     '+value.requested_from+' is requested for '+value.work_type+' work!\
        //                     </div>\
        //                 </a>\
        //                 <a class="dropdown-item text-center small text-gray-500" href="'+all_pending_request_route+'">Show All Alerts</a>';
                        
        //                id =  $('.font-weight-bold').data('id');
        //           }
                  
        //           while (id!=null);  
                
              

        //         notificationIds.push(value.id);
               
               
        //         });

        //             $('#notification-div').append(notificationHtml);
        //             $.ajax({
        //                 type: 'POST',
        //                 url: old_notifications_route,
        //                 data: {'notification_ids':notificationIds},
        //                 headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
        //                 success: function (data) {
                            
        //                 }
        //             });
                  
        

             
         }
             
           
        }
    });
}

// setInterval(function(){
//       getAllNotification();
//     },
//  1000);