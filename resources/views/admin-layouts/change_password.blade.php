<!-- Logout Modal-->
<div class="modal fade" id="changePasswordModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Change Password</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <form  id="change_pass_form" >
                @csrf
            <div class="modal-body" id="form_body">
                <div class="card-body">
                    
                        
                        <div class="form-group" id="div_old_password">
                            <label>Old Password</label>
                            <input type="password" class="form-control" placeholder="Old Password" name="old_password"
                                   id="old_password">
                        </div>
                        <div class="form-group" id="div_new_password">
                            <label>New Password</label>
                            <input type="password" class="form-control" placeholder="New Password" name="new_password"
                                   id="new_password">
                        </div>
                        <div class="form-group">
                            <label>Confirm Password</label>
                            <input type="password" class="form-control" placeholder="Confirm Password" name="c_password"
                                   id="confirm_password">
                        </div>
                   
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary" id="btn_change_password">Submit</button>
            </div>
        </form>
        </div>
    </div>
</div>
<!-- / end of Logout Modal-->
