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
                          action="{{ route('storeProduct') }}">
                        @csrf

                        <div class="form-group">
                            <label class="control-label">{{ __(' Product Name') }}</label>
                            <div class="">
                                <input id="name" type="text"
                                       class="form-control @error('name') is-invalid @enderror" name="name"
                                       value="{{ old('name') }}"  autocomplete="name" autofocus
                                       placeholder="Name" >

                                @error('name')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label">{{ __('Stock Quantity') }}</label>
                            <div class="">
                                <input id="quantity" type="text"
                                       class="form-control @error('quantity') is-invalid @enderror" name="quantity"
                                       value="{{ old('quantity')  }}" autocomplete="quantity" 
                                       placeholder="Quantity">

                                @error('quantity')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label">{{ __('Price') }}</label>
                            <div class="">
                                <input id="price" type="text"
                                       class="form-control @error('price') is-invalid @enderror" name="price"
                                       value="{{ old('price')  }}" autocomplete="price" 
                                       placeholder="Price">

                                @error('price')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label">{{ __('Category') }}</label>
                            <div class="">
                                <select id="category" type="text"
                                        class="form-control select2-dropdown @error('category') is-invalid @enderror"
                                        name="category"
                                        value="{{ old('category') }}" required autocomplete="category" autofocus>

                                        @foreach($categories as $category)
                                        <option value="{{$category->id}}"> {{$category->category_name}} </option>
                                        @endforeach
                                </select>

                                @error('category')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        
                        <label class="">Product Image</label><br/>
                        <div class="form-group custom-file mb-3">
                            <input type="file" class="custom-file-input" onchange="readURL(this)" id="customFile"
                                   name="image" accept="image/*">
                            <label class="custom-file-label" for="image">Choose file</label>

                            @error('image')
                            <strong class="fv-help-block"><span>Image must be PNG/JPG</span></strong>
                            @enderror
                        </div>
                       
                        <div>
                            <img src="" id="viewimage" class="w-100 pb-2 ml-0" style="max-width: 100px">
                        </div>

                        <button type="submit" name="submitButton" style="float: right" class="btn btn-primary ">Save</button>

                    </form>
                </div>
            </div>
        </div>
    </div>

@endpush
@push('scripts')

<script src="{{asset('/assets/select2/select2.min.js')}}"></script>  
<script src="{{asset('/assets/custom/product/add.js')}}"></script>
@endpush

