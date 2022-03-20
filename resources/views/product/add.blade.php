@extends('layouts.index')

@push('styles')
    <style>
        .iti {
            width: 100%;
        }
    </style>
@endpush
@push('content')
    <div class="row">
        <!-- Area Chart -->
        <div class="col-xl-12 col-lg-12">
            <div class="card shadow mb-4">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Add Product</h6>
                    <div class="dropdown no-arrow">

                    </div>
                </div>
                <!-- Card Body -->
                <div class="card-body">
                    <form method="POST" enctype="multipart/form-data" id="Product_form"
                          action="">
                        @csrf

                        <div class="form-group">
                            <label class="control-label">{{ __('Name') }}</label>
                            <div class="">
                                <input id="product_name" type="text"
                                       class="form-control @error('product_name') is-invalid @enderror" name="product_name"
                                       value="{{ old('product_name') }}"  autocomplete="product_name" autofocus
                                       placeholder="Frist Name" >

                                @error('product_name')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label">{{ __('Last Name') }}</label>
                            <div class="">
                                <input id="last_name" type="text"
                                       class="form-control @error('last_name') is-invalid @enderror" name="last_name"
                                       value="{{ old('last_name')  }}" autocomplete="last_name" 
                                       placeholder="Last Name">

                                @error('last_name')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                       
                        <div>
                            <img src="" id="blah" class="w-100 pb-2 ml-0" style="max-width: 100px">
                        </div>

                        <button type="submit" name="submitButton" style="float: right" class="btn btn-primary ">Save</button>

                    </form>
                </div>
            </div>
        </div>
    </div>

@endpush
@push('scripts')
<script src="{{asset('/assets/custom/client/add.js')}}"></script>
@endpush

