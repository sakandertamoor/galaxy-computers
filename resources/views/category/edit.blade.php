@extends('admin-layouts.admin_master')
@push('title')
    <title>Engtec</title>
@endpush
@push('styles')

    <link href="{{asset('/assets/formvalidation/dist/css/formValidation.css')}}" rel="stylesheet">
    <link href="{{asset('/assets/formvalidation/dist/css/formValidation.min.css')}}" rel="stylesheet">

    <!-- International Telephone numbers JS -->
    <link href="{{asset('/assets/intltelinput/css/intlTelInput.min.css')}}" rel="stylesheet">

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
                    <h6 class="m-0 font-weight-bold text-primary">Edit Manager</h6>
                    <div class="dropdown no-arrow">

                    </div>
                </div>
                <!-- Card Body -->
                <div class="card-body">

                    <form method="POST" enctype="multipart/form-data" id="manager_form"
                          action="{{url('admin/manager/'.$manager->id)}}">
                        @csrf
                        @method('put')

                        <div class="form-group">
                            <label class="control-label">{{ __('First Name') }}</label>
                            <div class="">
                                <input id="first_name" type="text"
                                       class="form-control @error('first_name') is-invalid @enderror" name="first_name"
                                       value="{{ old('first_name') ?? $manager->first_name }}"  autocomplete="first_name" 
                                       placeholder="First Name">

                                @error('first_name')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group">
                            <label>{{ __('Middle Name') }}</label>
                            <div class="">
                                <input id="middle_name" type="text"
                                       class="form-control @error('middle_name') is-invalid @enderror"
                                       name="middle_name"
                                       value="{{ old('middle_name') ?? $manager->middle_name }}" autocomplete="middle_name" autofocus
                                       placeholder="Middle Name">

                                @error('middle_name')
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
                                       value="{{ old('last_name') ?? $manager->last_name  }}" autocomplete="last_name" 
                                       placeholder="Last Name">

                                @error('last_name')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label">{{ __('Email') }}</label>
                            <div class="">
                                <input id="email" type="email"
                                       class="form-control @error('email') is-invalid @enderror" name="email"
                                       value="{{ old('email') ?? $manager->email }}"  autocomplete="email" autofocus
                                       placeholder="Email">

                                @error('email')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label">{{ __('Password') }}</label>
                            <div class="">
                                <input id="original_password" type="original_password"
                                       class="form-control @error('original_password') is-invalid @enderror" name="original_password"
                                       value="{{ old('original_password') ?? $manager->original_password }}" required autocomplete="original_password"
                                       autofocus
                                       placeholder="Password">

                                @error('original_password')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label">{{ __('Phone') }}</label>
                            <div class="">
                                <input id="phone" type="tel" style="width: 100%"
                                       class="form-control @error('phone') is-invalid @enderror" name="phone"
                                       value="{{old('phone') ?? @$manager->userDetail->phone}}"  autocomplete="phone" autofocus
                                       placeholder="" maxlength="13">

                                @error('phone')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="">{{ __('Gender') }}</label>
                            <div class="">
                                <select id="gender" type="text"
                                        class="form-control @error('gender') is-invalid @enderror" name="gender"
                                        value="{{ old('gender') }}" required autocomplete="gender" autofocus>
                                    <option value="" selected>Select an option</option>
                                    <option value="male" @if(@$manager->userDetail->gender=='male') selected   @endif>Male</option>
                                    <option value="female" @if(@$manager->userDetail->gender=='female') selected   @endif>Female</option>
                                </select>

                                @error('gender')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>


                        <div class="form-group">
                            <label class="">{{ __('Date of Birth') }}</label>
                            <div class="input-group">
                                <input id="dob" type="text"
                                       class="form-control @error('dob') is-invalid @enderror" name="dob"
                                       value="{{ old('dob') ?? @$manager->userDetail->date_of_birth }}" required autocomplete="dob" autofocus
                                       placeholder="yyyy-mm-dd">

                                <div class="input-group-append">
                                    <span class="input-group-text"> <i class="fa fa-calendar"></i></span>
                                </div>

                                @error('dob')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror

                            </div>
                        </div>
                       
                        <label class="">Image</label><br/>
                        <div class="form-group custom-file mb-3">
                            <input type="file" class="custom-file-input" onchange="readURL(this)" id="customFile"
                                   name="image" accept="image/*">
                            <label class="custom-file-label" for="image">Choose file</label>

                            @error('image')
                            <strong class="fv-help-block"><span>Image must be PNG/JPG</span></strong>
                            @enderror
                        </div>

                        <div>
                            <img src="@if(@$manager->userDetail->image != NULL){{asset('storage/uploads/managers/images/'.$manager->userDetail->image)}}@else{{asset('assets/image_not_found.png')}}@endif"
                                 id="blah" class="w-100 pb-2 ml-0"
                                 style="max-width: 100px">
                        </div>

                        <button type="submit" style="float: right" class="btn btn-primary ">Update</button>

                    </form>
                </div>
            </div>
        </div>
    </div>

@endpush
@push('scripts')

    <link href="{{ asset('/assets/datepicker/css/jquery-ui.css') }}" rel="stylesheet" type="text/css">

    <script src="{{ asset('assets/datepicker/js/jquery-ui.js') }}"></script>
    <script src="{{ asset('/assets/js/country.js')}}"></script>
    <script src="{{ asset('/assets/js/jquery.mask.min.js')}}"></script>

    <!-- formvalidation.io -->

    <script src="{{asset('/assets/formvalidation/dist/js/FormValidation.js')}}"></script>
    <script src="{{asset('/assets/formvalidation/dist/js/FormValidation.min.js')}}"></script>
    <script src="{{asset('/assets/formvalidation/dist/js/plugins/Bootstrap.min.js')}}"></script>

    <!-- International Telephone numbers JS -->
    <script src="{{asset('/assets/intltelinput/js/intlTelInput-jquery.min.js')}}"></script>
    <script>
        var utilPathForPhone = '{{ asset('/assets/intltelinput/js/utils.js') }}';
   </script>
   <script src="{{asset('/assets/admin/manager/js/edit.js')}}"></script>

@endpush

