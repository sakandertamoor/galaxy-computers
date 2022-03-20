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
                    <h6 class="m-0 font-weight-bold text-primary">Edit Client</h6>
                    <div class="dropdown no-arrow">

                    </div>
                </div>
                <!-- Card Body -->
                <div class="card-body">

                    <form method="POST" enctype="multipart/form-data" id="client_form"
                          action="{{url('updateClient/'.$client->id)}}">
                          @method('put')
                          @csrf
                        

                        <div class="form-group">
                            <label class="control-label">{{ __('Frist Name') }}</label>
                            <div class="">
                                <input id="first_name" type="text"
                                       class="form-control @error('first_name') is-invalid @enderror" name="first_name"
                                       value="{{ old('first_name') ?? $client->first_name }}"  autocomplete="first_name" 
                                       placeholder="Frist Name" >

                                @error('first_name')
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
                                       value="{{ old('last_name') ?? $client->last_name  }}" autocomplete="last_name"
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
                                       value="{{ old('email') ?? $client->email }}"  autocomplete="email" autofocus
                                       placeholder="Email">

                                @error('email')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Address</label>
                            <textarea type="text" rows="5" class="form-control @error('address') is-invalid @enderror"   name="address"><?php echo $client->address ?></textarea>
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

