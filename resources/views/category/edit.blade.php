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
                          action="{{url('updateCategory')}}">
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
                        <div class="form-group">
                            <label class="">{{ __('Status') }}</label>
                            <div class="">
                                <select id="status" type="text"
                                        class="form-control @error('status') is-invalid @enderror" name="status"
                                        value="{{ old('status') }}" required autocomplete="status" autofocus>
                                    <option value="1" @if(@$category->status==true) selected   @endif>Active</option>
                                    <option value="0" @if(@$category->status==false) selected   @endif>Inactive</option>
                                </select>

                                @error('status')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <input type="hidden" name="id" id="id" value="{{$category->id}}">
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

