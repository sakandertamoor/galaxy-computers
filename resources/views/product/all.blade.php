@extends('layouts.index')
@push('content')

    <div class="card">
        <div class="card-header">
            <div class="d-flex justify-content-between align-items-center py-1">
                <h6 class="m-0 font-weight-bold text-primary">Products</h6>
                <div>
                    <a href="{{ url('addProduct') }}" class="btn btn-sm btn-primary"><i
                            class="fa fa-plus"></i> Add Product</a>
                </div>
            </div>
        </div>
        <div class="card-body">
            <table class="table data-table  table-hover table-bordered" id="product_table">
                <thead>
                <tr>
                    <th>Sr.No</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Status</th>
                </tr>
                </thead>
            </table>
        </div>

    </div>


@endpush
@push('scripts')
    <script type="text/javascript">
        const product_datatable_path = "{{ route('Product') }}";
        const csrf_token = '{{ csrf_token() }}';
    </script>
    <script src="{{ asset('assets/custom/product/all.js') }}"></script>
@endpush

