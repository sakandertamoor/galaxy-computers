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
                    <h6 class="m-0 font-weight-bold text-primary">Edit Category</h6>
                    <div class="dropdown no-arrow">

                    </div>
                </div>
                <!-- Card Body -->
                <div class="card-body">

                    <form method="POST" enctype="multipart/form-data" id="category_form"
                          action="{{url('editCategory/'.$category->id)}}">
                        @csrf
                        @method('put')

                        <div class="form-group">
                            <label class="control-label">{{ __('Name') }}</label>
                            <div class="">
                                <input id="category_name" type="text"
                                class="form-control @error('category_name') is-invalid @enderror" name="category_name"
                                       value="{{ old('category_name') ?? $category->category_name }}"  autocomplete="category_name" 
                                       placeholder="Category Name">

                                @error('category_name')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <button type="submit" style="float: right" class="btn btn-primary ">Update</button>

                    </form>
                </div>
            </div>
        </div>
    </div>

@endpush
@push('scripts')
   <script src="{{asset('assets/custom/category/edit.js')}}"></script>
@endpush

