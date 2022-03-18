@extends('layouts.index')
@push('content')

    <div class="card">
        <div class="card-header">
            <div class="d-flex justify-content-between align-items-center py-1">
                <h6 class="m-0 font-weight-bold text-primary">Categories</h6>
                <div>
                    <a href="{{ url('addCategory') }}" class="btn btn-sm btn-primary"><i
                            class="fa fa-plus"></i> Add Category</a>
                    {{-- <a href="{{ url('admin/manager/suspended') }}" class="btn btn-sm btn-secondary"> View Suspended Manager</a> --}}
                </div>
            </div>
        </div>
        <div class="card-body">
            <table class="table data-table  table-hover table-bordered" id="category_table">
                <thead>
                <tr>
                    <th>Sr.No</th>
                    <th>Category</th>
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
        const category_datatable_path = "{{ route('Category') }}";
        const csrf_token = '{{ csrf_token() }}';
    </script>
    <script src="{{ asset('assets/custom/category/all.js') }}"></script>
@endpush

