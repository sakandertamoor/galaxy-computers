@extends('admin-layouts.admin_master')

@push('title')
    <title>Engtec</title>
@endpush
@push('styles')
@endpush
@push('content')

    @if (Session::has('updated'))
        <div class="alert alert-success alert-dismissible">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <div>{!! Session::get('updated') !!}</div>
        </div>
    @endif


    @if (Session::has('created'))
        <div class="alert alert-success alert-dismissible">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <div>{!! Session::get('created') !!}</div>
        </div>
    @endif

    <div class="card">
        <div class="card-header">
            <div class="d-flex justify-content-between align-items-center py-1">
                <h6 class="m-0 font-weight-bold text-primary">All Suspended Managers</h6>
                <div>
                    <a href="{{ url('admin/employees/create') }}" class="btn btn-sm btn-primary"><i
                            class="fa fa-plus"></i> Add Manager</a>
                    <a href="{{ url('admin/manager/all') }}" class="btn btn-sm btn-success"> View Active Manager</a>
                </div>
            </div>
        </div>
        <div class="card-body">
            <table class="table data-table  table-hover table-bordered" id="suspended_table">
                <thead>
                <tr>
                    <th>Sr.No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
            </table>
        </div>

    </div>


@endpush
@push('scripts')

    <script type="text/javascript">

        const asset_path = "{{ asset('') }}";
        const manager_datatable_path = "{{ route('admin.manager.suspended') }}";
        const csrf_token = '{{ csrf_token() }}';

    </script>
    <script src="{{ asset('assets/admin/manager/js/suspended.js') }}"></script>
@endpush

