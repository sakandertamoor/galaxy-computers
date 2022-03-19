@extends('layouts.index')
@push('content')

    <div class="card">
        <div class="card-header">
            <div class="d-flex justify-content-between align-items-center py-1">
                <h6 class="m-0 font-weight-bold text-primary">Clients</h6>
                <div>
                    <a href="{{ url('addClient') }}" class="btn btn-sm btn-primary"><i
                            class="fa fa-plus"></i> Add Client</a>
                </div>
            </div>
        </div>
        <div class="card-body">
            <table class="table data-table  table-hover table-bordered" id="client_table">
                <thead>
                <tr>
                    <th>Sr.No</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Remaining Payment</th>
                   
                </tr>
                </thead>
            </table>
        </div>

    </div>


@endpush
@push('scripts')
    <script type="text/javascript">
        const client_datatable_path = "{{ route('Client') }}";
        const csrf_token = '{{ csrf_token() }}';
    </script>
    <script src="{{ asset('assets/custom/client/all.js') }}"></script>
@endpush

