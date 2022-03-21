@extends('layouts.index')

@push('content')
    <div class="row mb-3">



    </div>

    <div class="row">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-baseline pb-1"><h5>Latest Employees</h5><a
                        href="">View all</a>
                </div>
                <div class="card-body list-body pt-1">
                    <table class="table table-hover">
                        <tbody>
                        @foreach($employees as $emp)
                            <tr>
                                <td class="border-top-0 border-bottom-info p-1"><img width="40px" height="40px" class="img-rounded" src="@if($emp->userDetail->image != ""){{asset('storage/uploads/employees/images/'.$emp->userDetail->image)}}@else{{asset('assets/image_not_found.png')}}@endif"><span class="pl-2">{{ $emp->first_name.' '.$emp->middle_name.' '.$emp->last_name }}</span></td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
    
                </div>
            </div>
        </div>
       
    </div>

   

@endpush
